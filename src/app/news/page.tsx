import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "News & Press",
  description:
    "The latest news, press coverage, and stories from Baseball Generations. Featured in Yahoo Sports, Baseball America, and more.",
  openGraph: {
    title: `News & Press | ${SITE_NAME}`,
    description:
      "The latest news, press coverage, and stories from Baseball Generations.",
  },
};

/*
 * NOTE: This page currently uses placeholder data.
 * It will eventually pull from Sanity CMS once the content
 * management integration is complete.
 */

const NEWS_ITEMS = [
  {
    id: "1",
    date: "2024-11-15",
    category: "Press",
    headline: "Yahoo Sports: How Baseball Generations Is Changing the Game for South LA Youth",
    excerpt:
      "A deep dive into how Dom Smith, Ron Miller, and Tim Ravare are tackling baseball's access problem — one free camp at a time. Yahoo Sports profiles the movement reshaping youth baseball in South Los Angeles.",
    source: "Yahoo Sports",
    slug: "#",
  },
  {
    id: "2",
    date: "2024-10-22",
    category: "Event Recap",
    headline: "BBG 6th Annual All-Star Game Draws Record Crowd at Blair Field",
    excerpt:
      "Over 50 top high school players competed in front of college coaches and MLB scouts at Long Beach's historic Blair Field. Multiple players received offers on the spot.",
    source: "Baseball Generations",
    slug: "#",
  },
  {
    id: "3",
    date: "2024-09-30",
    category: "Press",
    headline: "Baseball America Highlights BBG's All-American Game at LMU",
    excerpt:
      "Baseball America spotlights the BBG All-American Game at Loyola Marymount University, calling it 'one of the most important grassroots events in Southern California baseball.'",
    source: "Baseball America",
    slug: "#",
  },
  {
    id: "4",
    date: "2024-08-12",
    category: "Player Spotlight",
    headline: "Marcus Commits to Kansas State on Full Baseball Scholarship",
    excerpt:
      "BBG alum Marcus — who first came to a free BBG camp in 2019 from Compton — has officially signed with Kansas State. 'BBG gave me a chance when nobody else would,' he said.",
    source: "Baseball Generations",
    slug: "#",
  },
  {
    id: "5",
    date: "2024-07-05",
    category: "Community",
    headline: "BBG Partners with LA Unified to Bring Free Clinics to 12 Schools",
    excerpt:
      "In a landmark partnership, Baseball Generations will run free baseball clinics at 12 LAUSD campuses across South LA during the 2024-2025 school year, reaching an estimated 500 new players.",
    source: "Baseball Generations",
    slug: "#",
  },
  {
    id: "6",
    date: "2024-05-18",
    category: "Press",
    headline: "Dom Smith on ESPN: 'I Play for the Kids Who Can't Afford Travel Ball'",
    excerpt:
      "In an emotional ESPN interview, Mets-turned-Braves first baseman Dominic Smith opens up about his South LA roots and why he co-founded Baseball Generations with childhood friends Ron Miller and Tim Ravare.",
    source: "ESPN",
    slug: "#",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Press: "bg-bbg-red/20 text-bbg-red border-bbg-red/30",
  "Event Recap": "bg-gold/20 text-gold border-gold/30",
  "Player Spotlight": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Community: "bg-sky-500/20 text-sky-400 border-sky-500/30",
};

function formatNewsDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function NewsPage() {
  return (
    <div className="bg-navy min-h-screen">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-20">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute left-1/4 top-0 h-[200%] w-px rotate-[25deg] bg-gold" />
          <div className="absolute left-2/3 top-0 h-[200%] w-px rotate-[25deg] bg-gold" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <p className="font-accent text-sm uppercase tracking-[0.3em] text-gold">
            Press & Updates
          </p>
          <h1 className="mt-4 font-display text-7xl uppercase leading-none text-white md:text-8xl lg:text-9xl">
            In The News
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-body text-lg text-white/60">
            Coverage, recaps, and stories from the BBG movement. The world is
            starting to pay attention.
          </p>
          <div className="mt-6 h-1 w-24 mx-auto bg-gradient-to-r from-bbg-red via-gold to-bbg-red" />
        </div>
      </section>

      {/* ===== NEWS GRID ===== */}
      <section className="relative bg-navy pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {NEWS_ITEMS.map((item) => (
              <article
                key={item.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-500 hover:border-gold/20 hover:bg-white/[0.06]"
              >
                {/* Image placeholder */}
                <div className="relative h-48 w-full bg-gradient-to-br from-white/[0.06] to-white/[0.02]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="h-12 w-12 text-white/10"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5"
                      />
                    </svg>
                  </div>
                  {/* Category badge */}
                  <div className="absolute left-4 top-4">
                    <span
                      className={`inline-block rounded-full border px-3 py-1 font-accent text-[10px] uppercase tracking-[0.15em] ${
                        CATEGORY_COLORS[item.category] ||
                        "bg-white/10 text-white/60 border-white/20"
                      }`}
                    >
                      {item.category}
                    </span>
                  </div>
                  {/* Gold top-right corner on hover */}
                  <div className="absolute right-0 top-0 h-0 w-0 border-t-[40px] border-r-0 border-t-transparent transition-all duration-500 group-hover:border-r-[40px] group-hover:border-t-gold/20 group-hover:border-r-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  {/* Date & Source */}
                  <div className="flex items-center gap-3">
                    <time className="font-body text-xs text-white/40">
                      {formatNewsDate(item.date)}
                    </time>
                    {item.source !== "Baseball Generations" && (
                      <>
                        <span className="h-3 w-px bg-white/20" />
                        <span className="font-accent text-[10px] uppercase tracking-wider text-gold/70">
                          {item.source}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Headline */}
                  <h2 className="mt-3 font-display text-xl uppercase leading-tight text-white transition-colors duration-300 group-hover:text-gold">
                    {item.headline}
                  </h2>

                  {/* Excerpt */}
                  <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-white/50">
                    {item.excerpt}
                  </p>

                  {/* Read More */}
                  <Link
                    href={item.slug}
                    className="mt-6 inline-flex items-center gap-2 font-accent text-xs uppercase tracking-[0.2em] text-gold transition-all duration-300 group-hover:gap-3"
                  >
                    Read More
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Load More placeholder */}
          <div className="mt-16 text-center">
            <p className="font-body text-sm text-white/30">
              More stories coming soon. Content will be managed via Sanity CMS.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
