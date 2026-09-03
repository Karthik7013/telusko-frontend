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

    const { data: studentRole } = await supabase.schema("identity").from("roles").select("id").eq("name", "student").single();
    if (!studentRole) {
      return new Response(JSON.stringify({ error: { code: "NOT_FOUND", message: "Student role not found" } }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { data: existingRole, error: checkError } = await supabase
      .schema("identity").from("user_roles")
      .select("role_id, status")
      .eq("user_id", user.id)
      .eq("role_id", studentRole.id)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      return new Response(JSON.stringify({ error: { code: "INTERNAL_ERROR", message: checkError.message } }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (existingRole?.status === "active") {
      return new Response(JSON.stringify({ data: { roleStatus: "active", message: "Already an active instructor" } }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { data: instructorRole, error: roleError } = await supabase.schema("identity").from("roles").select("id").eq("name", "instructor").single();
    if (roleError || !instructorRole) {
      return new Response(JSON.stringify({ error: { code: "NOT_FOUND", message: "Instructor role not found" } }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { data, error } = await supabase
      .schema("identity").from("user_roles")
      .upsert({
        user_id: user.id,
        role_id: instructorRole.id,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: { code: "INTERNAL_ERROR", message: error.message } }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ data: { roleStatus: data.status, message: "Instructor application submitted" } }), {
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