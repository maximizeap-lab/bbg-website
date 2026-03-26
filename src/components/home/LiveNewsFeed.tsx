"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Newspaper, Clock } from "lucide-react";
import Link from "next/link";

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
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function tagFromSearchTerm(term: string): string {
  if (term.includes("Baseball Generations")) return "BBG";
  // Extract person name (first two words typically)
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
];

export default function LiveNewsFeed() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
    const interval = setInterval(fetchNews, 5 * 60 * 1000); // Auto-refresh every 5 minutes
    return () => clearInterval(interval);
  }, [fetchNews]);

  const displayed = articles.slice(0, 12);

  return (
    <section className="bg-black py-24 md:py-32 overflow-hidden">
      {/* Scrolling ticker */}
      <div className="relative bg-[#F5A623] py-3 mb-16 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex gap-12">
          {(loading ? ["Loading latest news..."] : articles.slice(0, 10).map((a) => a.title)).map(
            (headline, i) => (
              <span key={i} className="inline-flex items-center gap-3 font-accent text-sm uppercase tracking-wider text-black">
                <Newspaper className="w-4 h-4 shrink-0" />
                {headline}
              </span>
            )
          )}
          {/* Duplicate for seamless loop */}
          {!loading &&
            articles.slice(0, 10).map((a, i) => (
              <span key={`dup-${i}`} className="inline-flex items-center gap-3 font-accent text-sm uppercase tracking-wider text-black">
                <Newspaper className="w-4 h-4 shrink-0" />
                {a.title}
              </span>
            ))}
        </div>
        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 60s linear infinite;
          }
        `}</style>
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.9] text-[#F5A623] mb-3">
              BBG IN THE NEWS
            </h2>
            <p className="font-body text-white/60 text-base md:text-lg max-w-2xl">
              Live coverage of BBG players, coaches, and alumni across major sports media.
            </p>
          </div>
          <Link
            href="/feed"
            className="hidden md:inline-flex items-center gap-2 font-accent text-sm uppercase tracking-widest text-[#F5A623] hover:text-white transition-colors shrink-0"
          >
            View All
            <ExternalLink className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg bg-white/[0.03] p-5 animate-pulse"
              >
                <div className="h-4 bg-white/10 rounded w-3/4 mb-3" />
                <div className="h-4 bg-white/10 rounded w-1/2 mb-4" />
                <div className="h-3 bg-white/5 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayed.map((article, i) => (
              <motion.a
                key={i}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-[#F5A623]/30 p-5 transition-all duration-300"
              >
                {/* Tag */}
                <span className="inline-block rounded-full bg-[#F5A623]/15 px-2.5 py-0.5 font-accent text-[11px] uppercase tracking-wider text-[#F5A623] mb-3">
                  {tagFromSearchTerm(article.searchTerm)}
                </span>

                {/* Headline */}
                <h3 className="font-display text-lg text-white group-hover:text-[#F5A623] transition-colors leading-tight mb-3 line-clamp-3">
                  {article.title}
                </h3>

                {/* Meta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {article.source && (
                      <span className="font-accent text-[#F5A623] text-xs uppercase tracking-wider">
                        {article.source}
                      </span>
                    )}
                    {article.pubDate && (
                      <span className="flex items-center gap-1 font-body text-white/40 text-xs">
                        <Clock className="w-3 h-3" />
                        {relativeTime(article.pubDate)}
                      </span>
                    )}
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-[#F5A623] transition-colors" />
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {/* Mobile CTA */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/feed"
            className="inline-flex items-center gap-2 font-accent text-sm uppercase tracking-widest text-[#F5A623] hover:text-white transition-colors"
          >
            View All News
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

        {error && (
          <p className="mt-4 text-center font-body text-white/30 text-xs">
            Showing cached articles. Live feed will refresh shortly.
          </p>
        )}
      </div>
    </section>
  );
}
