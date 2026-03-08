import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const contentType = req.headers.get("content-type") || "";
    let type = "";
    let params: Record<string, any> = {};
    let pdfBase64: string | null = null;
    let pdfMimeType: string | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      type = formData.get("type") as string;
      const file = formData.get("file") as File | null;
      
      // Parse other params from JSON string
      const paramsStr = formData.get("params") as string;
      if (paramsStr) params = JSON.parse(paramsStr);

      if (file) {
        const arrayBuffer = await file.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        // base64 encode
        let binary = "";
        for (let i = 0; i < bytes.length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        pdfBase64 = btoa(binary);
        pdfMimeType = file.type || "application/pdf";
      }
    } else {
      const json = await req.json();
      type = json.type;
      const { type: _, ...rest } = json;
      params = rest;
    }

    let systemPrompt = "";
    let userPrompt = "";

    if (type === "study-plan") {
      const { subject, examDate, hoursPerDay } = params;
      systemPrompt =
        "You are an expert study planner. Create a clear, actionable daily study plan. Use markdown formatting with headers, bullet points, and bold text. Be specific about what to study each day.";
      userPrompt = `Create a daily study plan for the subject "${subject}". The exam is on ${examDate} and the student can study ${hoursPerDay} hours per day. Include specific topics to cover each day, revision days, and practice test days. Format it clearly with day-by-day breakdown.`;
    } else if (type === "summarize") {
      const { notes } = params;
      systemPrompt =
        "You are an expert at summarizing study material. Extract the most important concepts and present them clearly using markdown. Use headers, bullet points, and bold for key terms.";
      if (pdfBase64) {
        userPrompt = "Summarize the contents of this PDF document into key points and important concepts. Extract all major topics, definitions, and critical information.";
      } else {
        userPrompt = `Summarize the following study notes into key points and important concepts:\n\n${notes}`;
      }
    } else if (type === "productivity") {
      const authHeader = req.headers.get("Authorization");
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!,
        { global: { headers: { Authorization: authHeader! } } }
      );

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const [tasksRes, sessionsRes] = await Promise.all([
        supabase.from("tasks").select("*").eq("user_id", user.id),
        supabase.from("study_sessions").select("*").eq("user_id", user.id),
      ]);

      const tasks = tasksRes.data || [];
      const sessions = sessionsRes.data || [];
      const totalTasks = tasks.length;
      const completed = tasks.filter((t: any) => t.completed).length;
      const pending = tasks.filter((t: any) => !t.completed).length;
      const overdue = tasks.filter(
        (t: any) => !t.completed && t.deadline && new Date(t.deadline) < new Date()
      ).length;
      const totalStudyMinutes = sessions.reduce((sum: number, s: any) => sum + s.duration_minutes, 0);

      systemPrompt =
        "You are a productivity coach for students. Analyze their data and give specific, actionable advice to improve study habits. Use markdown formatting.";
      userPrompt = `Analyze this student's productivity data and provide advice:\n- Total tasks: ${totalTasks}\n- Completed: ${completed}\n- Pending: ${pending}\n- Overdue: ${overdue}\n- Total study time: ${totalStudyMinutes} minutes across ${sessions.length} sessions\n\nGive 4-5 specific suggestions to improve study consistency and productivity.`;
    } else {
      throw new Error("Invalid type");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("ai-study-tools error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
