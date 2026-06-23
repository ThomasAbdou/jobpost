import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(req: NextRequest) {
  try {
    const { visitorId, step, email, country } = await req.json();

    if (!visitorId || typeof step !== "number") {
      return NextResponse.json(
        { error: "visitorId and numeric step required" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    // Read existing furthest_step so we only ever raise it.
    const { data: existing } = await supabase
      .from("visitors")
      .select("furthest_step")
      .eq("visitor_id", visitorId)
      .maybeSingle();

    const furthestStep = Math.max(existing?.furthest_step ?? 0, step);

    const { error } = await supabase.from("visitors").upsert(
      {
        visitor_id: visitorId,
        last_step: step,
        furthest_step: furthestStep,
        ...(email ? { email } : {}),
        ...(country ? { country } : {}),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "visitor_id" }
    );

    if (error) {
      console.error("track error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
