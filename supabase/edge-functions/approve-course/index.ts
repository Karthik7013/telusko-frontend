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

    const { data: myRoles, error: rolesError } = await supabase
      .schema("identity").from("user_roles")
      .select("role_id")
      .eq("user_id", user.id)
      .eq("status", "active");

    if (rolesError) {
      return new Response(JSON.stringify({ error: { code: "INTERNAL_ERROR", message: rolesError.message } }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { data: roles } = await supabase.schema("identity").from("roles").select("id, name");
    const adminRole = roles?.find((r) => r.name === "admin");
    const isAdminUser = !!adminRole && (myRoles || []).some((r) => r.role_id === adminRole.id);

    if (!isAdminUser) {
      return new Response(JSON.stringify({ error: { code: "FORBIDDEN", message: "Admin access required" } }), {
        status: 403,
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
      .select("id, status, instructor_id")
      .eq("id", courseId)
      .single();

    if (courseError || !courseData) {
      return new Response(JSON.stringify({ error: { code: "NOT_FOUND", message: "Course not found" } }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (courseData.status !== "pending_review") {
      return new Response(JSON.stringify({ error: { code: "INVALID_STATE", message: "Course is not in pending_review state" } }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const approvalVersion = Date.now();
    const { data: profileData } = await supabase
      .schema("identity").from("profiles")
      .select("display_name")
      .eq("id", user.id)
      .single();

    const { error: upsertError } = await supabase
      .schema("sales").from("course_approvals")
      .upsert({
        course_id: courseId,
        approved_by: user.id,
        is_active: true,
        version_meta: {
          approvedAt: new Date().toISOString(),
          instructorId: courseData.instructor_id,
          approvalVersion: approvalVersion,
          approvedByName: profileData?.display_name || null,
        },
      })
      .select()
      .single();

    if (upsertError) {
      return new Response(JSON.stringify({ error: { code: "INTERNAL_ERROR", message: upsertError.message } }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { error: updateError } = await supabase
      .schema("catalog").from("courses")
      .update({ status: "published" })
      .eq("id", courseId);

    if (updateError) {
      return new Response(JSON.stringify({ error: { code: "INTERNAL_ERROR", message: updateError.message } }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ data: { approvedAt: new Date().toISOString(), courseId, isActive: true }, error: null }), {
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