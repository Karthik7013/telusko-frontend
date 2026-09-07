import { serve } from "https://deno.land/std@0.170.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: { code: "UNAUTHORIZED", message: "Missing or invalid token" } }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    if (userError || !user) {
      return new Response(JSON.stringify({ error: { code: "UNAUTHORIZED", message: "Invalid token" } }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { courseId } = await req.json();

    if (!courseId) {
      return new Response(JSON.stringify({ error: { code: "VALIDATION_ERROR", message: "courseId is required" } }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { data: courseData, error: courseError } = await supabase
      .schema("catalog").from("courses")
      .select("id, price, status, instructor_id")
      .eq("id", courseId)
      .single();

    if (courseError || !courseData) {
      return new Response(JSON.stringify({ error: { code: "NOT_FOUND", message: "Course not found" } }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (courseData.status !== "published") {
      return new Response(JSON.stringify({ error: { code: "INVALID_STATE", message: "Course is not published" } }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { data: existingEnrollment } = await supabase
      .schema("sales").from("enrollments")
      .select("id")
      .eq("user_id", user.id)
      .eq("course_id", courseId)
      .single();

    if (existingEnrollment) {
      return new Response(JSON.stringify({ error: { code: "ALREADY_ENROLLED", message: "You are already enrolled in this course" } }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    const enrollmentId = crypto.randomUUID();
    const transactionId = crypto.randomUUID();
    const amount = courseData.price;
    const gatewayTxnId = amount > 0 ? `mock_tx_${crypto.randomUUID()}` : null;

    const { error: enrollmentError } = await supabase
      .schema("sales").from("enrollments")
      .insert({ id: enrollmentId, user_id: user.id, course_id: courseId, status: "enrolled" })
      .select()
      .single();

    if (enrollmentError) {
      return new Response(JSON.stringify({ error: { code: "INTERNAL_ERROR", message: enrollmentError.message } }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { error: txnError } = await supabase
      .schema("sales").from("transactions")
      .insert({
        id: transactionId,
        user_id: user.id,
        course_id: courseId,
        amount: amount,
        payment_status: "completed",
        gateway_txn_id: gatewayTxnId,
      })
      .select()
      .single();

    if (txnError) {
      await supabase.schema("sales").from("enrollments").delete().eq("id", enrollmentId);
      return new Response(JSON.stringify({ error: { code: "INTERNAL_ERROR", message: txnError.message } }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ data: { enrollmentId, status: "enrolled", transactionId, amount }, error: null }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: { code: "INTERNAL_ERROR", message: err.message } }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});