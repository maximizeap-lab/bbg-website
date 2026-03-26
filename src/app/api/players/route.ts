import { NextRequest, NextResponse } from "next/server";
import { createServiceSupabase } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const status = searchParams.get("status");
    const position = searchParams.get("position");
    const graduationYear = searchParams.get("graduation_year");
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    // If Supabase is not configured, return empty array
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      return NextResponse.json([]);
    }

    const supabase = createServiceSupabase();

    let query = supabase.from("players").select("*", { count: "exact" });

    if (status) {
      query = query.eq("status", status);
    }

    if (position) {
      query = query.eq("position", position);
    }

    if (graduationYear) {
      query = query.eq("graduation_year", parseInt(graduationYear, 10));
    }

    if (search) {
      query = query.or(
        `name.ilike.%${search}%,school.ilike.%${search}%,hometown.ilike.%${search}%`
      );
    }

    query = query
      .order("is_featured", { ascending: false })
      .order("name", { ascending: true })
      .range(offset, offset + limit - 1);

    const { data: players, error, count } = await query;

    if (error) {
      console.error("[Players API] Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch players" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      players: players || [],
      total: count ?? 0,
      limit,
      offset,
    });
  } catch (error) {
    console.error("[Players API] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch players" },
      { status: 500 }
    );
  }
}
