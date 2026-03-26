import { NextResponse } from "next/server";

// Aggregates news from multiple sources about BBG players, founders, coaches
// Uses Google News RSS feed as a proxy (publicly accessible, no API key needed)

export async function GET() {
  // Build search queries for all BBG-related people
  const searchTerms = [
    "Baseball Generations BBG",
    "Dominic Smith baseball",
    "Druw Jones",
    "Termarr Johnson",
    "Justin Crawford phillies",
    "Mikey Romero red sox",
    "Malcolm Moore rangers",
    "J.P. Crawford mariners",
    "Cam Caminiti braves",
    "Ralphy Velazquez guardians",
    "Seth Hernandez pirates",
    "Billy Carlson white sox",
    "Brady Ebel brewers",
    "Kayson Cunningham diamondbacks",
    "Tate Southisene braves",
    "Kruz Schoolcraft padres",
    "Ron Miller baseball generations",
    "Tim Ravare baseball generations",
  ];

  try {
    // Fetch from Google News RSS for each term (limit to first 8 terms to avoid rate limits)
    const articles: any[] = [];

    for (const term of searchTerms.slice(0, 8)) {
      const encoded = encodeURIComponent(term);
      const url = `https://news.google.com/rss/search?q=${encoded}&hl=en-US&gl=US&ceid=US:en`;

      try {
        const res = await fetch(url, { next: { revalidate: 3600 } }); // Cache 1 hour
        const xml = await res.text();

        // Parse RSS XML — extract title, link, pubDate, source
        const items = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];

        for (const item of items.slice(0, 3)) { // Top 3 per term
          const title = item.match(/<title>(.*?)<\/title>/)?.[1]?.replace(/<!\[CDATA\[(.*?)\]\]>/, '$1') || "";
          const link = item.match(/<link>(.*?)<\/link>/)?.[1] || item.match(/<link\/>(.*?)(?=<)/)?.[1] || "";
          const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || "";
          const source = item.match(/<source.*?>(.*?)<\/source>/)?.[1]?.replace(/<!\[CDATA\[(.*?)\]\]>/, '$1') || "";

          if (title && link) {
            articles.push({
              title: title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&quot;/g, '"'),
              link,
              pubDate,
              source: source.replace(/&amp;/g, '&'),
              searchTerm: term,
            });
          }
        }
      } catch {
        // Skip failed searches
      }
    }

    // Deduplicate by title
    const seen = new Set<string>();
    const unique = articles.filter(a => {
      const key = a.title.toLowerCase().slice(0, 50);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // Sort by date (newest first)
    unique.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    return NextResponse.json({ articles: unique.slice(0, 30) });
  } catch (error) {
    return NextResponse.json({ articles: [], error: "Failed to fetch news" }, { status: 500 });
  }
}
