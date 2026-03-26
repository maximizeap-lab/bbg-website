import { NextRequest, NextResponse } from "next/server";
import { createServiceSupabase } from "@/lib/supabase/server";
import { SEED_EVENTS } from "@/lib/constants";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const status = searchParams.get("status"); // "upcoming" | "past"
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    // If Supabase is not configured, return seed data
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      let events = [...SEED_EVENTS];

      if (status) {
        events = events.filter((e) => e.status === status);
      }

      events.sort((a, b) => {
        const dateA = new Date(a.event_date || "").getTime();
        const dateB = new Date(b.event_date || "").getTime();
        return status === "past" ? dateB - dateA : dateA - dateB;
      });

      return NextResponse.json(events.slice(0, limit));
    }

    const supabase = createServiceSupabase();

    let query = supabase.from("events").select("*");

    if (status === "upcoming") {
      query = query.eq("status", "upcoming").order("event_date", { ascending: true });
    } else if (status === "past") {
      query = query.eq("status", "past").order("event_date", { ascending: false });
    } else {
      query = query.order("event_date", { ascending: false });
    }

    query = query.limit(limit);

    const { data: events, error } = await query;

    if (error) {
      console.error("[Events API] Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch events" },
        { status: 500 }
      );
    }

    return NextResponse.json(events);
  } catch (error) {
    console.error("[Events API] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
