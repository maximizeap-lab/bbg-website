import { NextRequest, NextResponse } from "next/server";
import { createServiceSupabase } from "@/lib/supabase/server";
import { InstagramPost } from "@/types";

const CACHE_DURATION_MS = 6 * 60 * 60 * 1000; // 6 hours

const SAMPLE_POSTS: InstagramPost[] = [
  {
    id: "sample-1",
    media_url: "/images/instagram/placeholder-1.jpg",
    caption:
      "Game day in South LA. These kids showed up ready. #BBG #BaseballGenerations",
    permalink: "https://instagram.com/baseballgenerations",
    media_type: "IMAGE",
    timestamp: new Date().toISOString(),
  },
  {
    id: "sample-2",
    media_url: "/images/instagram/placeholder-2.jpg",
    caption:
      "From the sandlots to the showcase. Proud of every single one of these young men.",
    permalink: "https://instagram.com/baseballgenerations",
    media_type: "IMAGE",
    timestamp: new Date().toISOString(),
  },
  {
    id: "sample-3",
    media_url: "/images/instagram/placeholder-3.jpg",
    caption: "BBG All-Star Game 2024. Blair Field. The energy was unreal.",
    permalink: "https://instagram.com/baseballgenerations",
    media_type: "IMAGE",
    timestamp: new Date().toISOString(),
  },
  {
    id: "sample-4",
    media_url: "/images/instagram/placeholder-4.jpg",
    caption:
      "Another one committed. Hard work pays off. #BBGFamily",
    permalink: "https://instagram.com/baseballgenerations",
    media_type: "IMAGE",
    timestamp: new Date().toISOString(),
  },
  {
    id: "sample-5",
    media_url: "/images/instagram/placeholder-5.jpg",
    caption: "Practice doesn't make perfect. Perfect practice makes perfect.",
    permalink: "https://instagram.com/baseballgenerations",
    media_type: "IMAGE",
    timestamp: new Date().toISOString(),
  },
  {
    id: "sample-6",
    media_url: "/images/instagram/placeholder-6.jpg",
    caption:
      "Building the next generation of players, leaders, and men. That's what BBG is about.",
    permalink: "https://instagram.com/baseballgenerations",
    media_type: "IMAGE",
    timestamp: new Date().toISOString(),
  },
];

export async function GET(_request: NextRequest) {
  try {
    const instagramToken = process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!instagramToken) {
      return NextResponse.json(SAMPLE_POSTS);
    }

    // Check Supabase cache first
    const supabase = createServiceSupabase();
    const { data: cached } = await supabase
      .from("instagram_cache")
      .select("posts, cached_at")
      .order("cached_at", { ascending: false })
      .limit(1)
      .single();

    if (cached) {
      const cachedAt = new Date(cached.cached_at).getTime();
      const now = Date.now();

      if (now - cachedAt < CACHE_DURATION_MS) {
        return NextResponse.json(cached.posts);
      }
    }

    // Fetch fresh posts from Instagram Basic Display API
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,media_url,caption,permalink,media_type,timestamp,like_count&limit=12&access_token=${instagramToken}`,
      { next: { revalidate: 0 } }
    );

    if (!response.ok) {
      console.error(
        "[Instagram] API error:",
        response.status,
        await response.text()
      );
      // Fall back to cached data or samples
      if (cached) {
        return NextResponse.json(cached.posts);
      }
      return NextResponse.json(SAMPLE_POSTS);
    }

    const data = await response.json();
    const posts: InstagramPost[] = (data.data || []).map((post: any) => ({
      id: post.id,
      media_url: post.media_url,
      caption: post.caption || null,
      permalink: post.permalink,
      media_type: post.media_type,
      timestamp: post.timestamp,
      like_count: post.like_count,
    }));

    // Cache to Supabase
    await supabase
      .from("instagram_cache")
      .upsert(
        { id: "latest", posts, cached_at: new Date().toISOString() },
        { onConflict: "id" }
      )
      .then(({ error }) => {
        if (error) {
          console.error("[Instagram] Cache write error:", error);
        }
      });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("[Instagram Feed] Error:", error);
    return NextResponse.json(SAMPLE_POSTS);
  }
}
