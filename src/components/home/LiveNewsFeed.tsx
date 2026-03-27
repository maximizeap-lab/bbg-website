"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight, Newspaper } from "lucide-react";

interface Article {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  searchTerm: string;
}

function relativeTime(dateStr: string): string {
  if (!dateStr) return "";
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} minute${mins === 1 ? "" : "s"} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function tagFromSearchTerm(term: string): string {
  if (term.includes("Baseball Generations")) return "BBG";
  const parts = term.split(" ");
  if (parts.length >= 2) return `${parts[0]} ${parts[1]}`;
  return term;
}

const FALLBACK_ARTICLES: Article[] = [
  {
    title: "Druw Jones continues to impress in Arizona Diamondbacks system",
    link: "#",
    pubDate: new Date().toISOString(),
    source: "MLB.com",
    searchTerm: "Druw Jones",
  },
  {
    title: "BBG Alumni Making Waves Across Professional Baseball",
    link: "#",
    pubDate: new Date().toISOString(),
    source: "Baseball America",
    searchTerm: "Baseball Generations BBG",
  },
  {
    title: "Justin Crawford proving himself as top Phillies prospect",
    link: "#",
    pubDate: new Date().toISOString(),
    source: "NBC Sports",
    searchTerm: "Justin Crawford phillies",
  },
  {
    title: "Termarr Johnson shines in Pittsburgh Pirates spring training",
    link: "#",
    pubDate: new Date().toISOString(),
    source: "ESPN",
    searchTerm: "Termarr Johnson",
  },
  {
    title: "South LA baseball program produces another wave of MLB talent",
    link: "#",
    pubDate: new Date().toISOString(),
    source: "Los Angeles Times",
    searchTerm: "Baseball Generations BBG",
  },
  {
    title: "Mikey Romero continues development with Boston Red Sox organization",
    link: "#",
    pubDate: new Date().toISOString(),
    source: "NESN",
    searchTerm: "Mikey Romero",
  },
];

export default function LiveNewsFeed() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const fetchNews = useCallback(async () => {
    try {
      const res = await fetch("/api/news");
      const data = await res.json();
      if (data.articles && data.articles.length > 0) {
        setArticles(data.articles);
        setError(false);
      } else {
        setArticles(FALLBACK_ARTICLES);
        setError(true);
      }
    } catch {
      setArticles(FALLBACK_ARTICLES);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchNews]);

  // Auto-cycle every 4 seconds, pause on hover
  useEffect(() => {
    if (isPaused || loading || articles.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % articles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, loading, articles.length]);

  const goTo = useCallback(
    (index: number) => {
      if (articles.length === 0) return;
      setActiveIndex(((index % articles.length) + articles.length) % articles.length);
    },
    [articles.length]
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [goTo, activeIndex]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [goTo, activeIndex]);

  const activeArticle = articles[activeIndex];

  // Thumbnail articles: next 5 after active
  const thumbnails = articles.length > 1
    ? Array.from({ length: Math.min(5, articles.length - 1) }, (_, i) => {
        const idx = (activeIndex + 1 + i) % articles.length;
        return { article: articles[idx], index: idx };
      })
    : [];

  return (
    <section className="bg-black py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-display text-5xl md:text-7xl leading-[0.9] text-[#F5A623] mb-3">
            LATEST NEWS
          </h2>
          <p className="font-body text-white/60 text-base md:text-lg max-w-2xl">
            Live coverage across major sports media
          </p>
        </motion.div>

        {/* Carousel */}
        {loading ? (
          /* Loading skeleton */
          <div className="space-y-6">
            <div className="rounded-lg bg-white/[0.03] border-l-4 border-white/10 p-8 animate-pulse">
              <div className="h-3 bg-white/10 rounded w-24 mb-4" />
              <div className="h-8 bg-white/10 rounded w-3/4 mb-3" />
              <div className="h-8 bg-white/10 rounded w-1/2 mb-6" />
              <div className="h-3 bg-white/5 rounded w-1/4" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="rounded-lg bg-white/[0.03] p-4 animate-pulse">
                  <div className="h-4 bg-white/10 rounded w-full mb-2" />
                  <div className="h-3 bg-white/5 rounded w-1/2" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Active Article Card */}
            <div className="relative">
              <AnimatePresence mode="wait">
                {activeArticle && (
                  <motion.a
                    key={activeIndex}
                    href={activeArticle.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="block w-full rounded-lg bg-black border border-white/10 border-l-4 border-l-[#F5A623] p-8 md:p-10 group"
                  >
                    {/* Tag */}
                    <span className="inline-block rounded-full bg-[#F5A623]/10 px-3 py-1 font-accent text-[11px] uppercase tracking-wider text-[#F5A623] mb-4">
                      {tagFromSearchTerm(activeArticle.searchTerm)}
                    </span>

                    {/* Source */}
                    <p className="font-accent text-[#F5A623] text-sm uppercase tracking-wider mb-2">
                      {activeArticle.source}
                    </p>

                    {/* Headline */}
                    <h3 className="font-display text-3xl md:text-4xl text-white leading-tight mb-4 group-hover:text-[#F5A623] transition-colors">
                      {activeArticle.title}
                    </h3>

                    {/* Meta row */}
                    <div className="flex items-center gap-4">
                      <span className="font-body text-white/40 text-sm">
                        {relativeTime(activeArticle.pubDate)}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-accent text-sm uppercase tracking-wider text-[#F5A623] group-hover:underline">
                        Read Article
                        <ExternalLink className="w-4 h-4" />
                      </span>
                    </div>
                  </motion.a>
                )}
              </AnimatePresence>

              {/* Navigation Arrows */}
              {articles.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.preventDefault(); goPrev(); }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/80 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#F5A623] hover:border-[#F5A623]/40 transition-colors"
                    aria-label="Previous article"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); goNext(); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/80 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#F5A623] hover:border-[#F5A623]/40 transition-colors"
                    aria-label="Next article"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Dot Indicators */}
            {articles.length > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                {articles.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? "bg-[#F5A623] scale-110"
                        : "bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to article ${i + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Thumbnail Preview Cards */}
            {thumbnails.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
                {thumbnails.map(({ article, index }) => (
                  <button
                    key={index}
                    onClick={() => goTo(index)}
                    className="text-left rounded-lg bg-white/[0.03] border border-white/5 hover:border-[#F5A623]/30 hover:bg-white/[0.06] p-4 transition-all duration-300"
                  >
                    <p className="font-display text-sm text-white leading-tight truncate mb-2">
                      {article.title}
                    </p>
                    <span className="font-accent text-[#F5A623] text-[10px] uppercase tracking-wider">
                      {article.source}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {error && (
          <p className="mt-4 text-center font-body text-white/30 text-xs">
            Showing cached articles. Live feed will refresh shortly.
          </p>
        )}
      </div>
    </section>
  );
}
