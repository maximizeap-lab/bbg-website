import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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

const NEWS_ITEMS = [
  {
    id: "1",
    date: "2025-01-20",
    category: "Press",
    headline: "BBG Produces 14 First-Round Draft Picks",
    excerpt:
      "Yahoo Sports profiles how Baseball Generations has quietly become one of the most prolific pipelines in amateur baseball, producing 14 first-round MLB Draft picks from its free showcases and development programs in South LA.",
    source: "Yahoo Sports",
    slug: "#",
    image: "/images/events/allstar-03.jpg",
  },
  {
    id: "2",
    date: "2024-11-15",
    category: "Press",
    headline: "Dominic Smith's Baseball Generations Changes Lives in South LA",
    excerpt:
      "Baseball America goes inside the movement co-founded by Mets first baseman Dominic Smith, exploring how BBG's free camps and showcases are reshaping the landscape of youth baseball access in underserved communities.",
    source: "Baseball America",
    slug: "#",
    image: "/images/events/allstar-07.jpg",
  },
  {
    id: "3",
    date: "2024-10-22",
    category: "Player Spotlight",
    headline: "Druw Jones to J.P. Crawford: The BBG Pipeline",
    excerpt:
      "ESPN traces the remarkable pipeline from BBG showcases to professional baseball, from #2 overall pick Druw Jones to Mariners shortstop J.P. Crawford, who now coaches at the same events that shaped his career.",
    source: "ESPN",
    slug: "#",
    image: "/images/events/allstar-11.jpg",
  },
  {
    id: "4",
    date: "2024-09-30",
    category: "Event Recap",
    headline: "BBG 6th All-Star Game Draws Top Talent to Long Beach",
    excerpt:
      "The562.org covers the 6th Annual BBG All-Star Game at Blair Field in Long Beach, where over 50 top high school players competed in front of college coaches and MLB scouts. Multiple players received offers on the spot.",
    source: "The562.org",
    slug: "#",
    image: "/images/events/allstar-13.jpg",
  },
  {
    id: "5",
    date: "2024-08-12",
    category: "Press",
    headline: "From Compton Fields to Pro Diamonds: Inside BBG",
    excerpt:
      "The LA Times profiles the grassroots baseball revolution happening in South Los Angeles, where three Serra High School alumni are proving that talent has no zip code — and that free programs can outperform pay-to-play travel ball.",
    source: "LA Times",
    slug: "#",
    image: "/images/events/allstar-17.jpg",
  },
  {
    id: "6",
    date: "2024-07-05",
    category: "Press",
    headline: "44 Players Drafted: How BBG Became MLB's Best-Kept Secret",
    excerpt:
      "MLB.com dives deep into Baseball Generations' unprecedented track record — 44 players drafted, 14 first-rounders, and counting — examining how a free nonprofit in South LA outpaces elite travel ball organizations.",
    source: "MLB.com",
    slug: "#",
    image: "/images/events/allstar-21.jpg",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Press: "bg-gold/20 text-gold border-gold/30",
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
          <div className="mt-6 h-1 w-24 mx-auto bg-gradient-to-r from-gold via-gold to-gold" />
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
                {/* Image thumbnail */}
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.headline}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
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
