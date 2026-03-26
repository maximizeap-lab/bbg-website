"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Newspaper, Clock, Filter } from "lucide-react";

interface Article {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  searchTerm: string;
}

const FILTER_OPTIONS = [
  "All",
  "Druw Jones",
  "Termarr Johnson",
  "Justin Crawford",
  "Mikey Romero",
  "Malcolm Moore",
  "J.P. Crawford",
  "Dominic Smith",
  "Cam Caminiti",
  "Ralphy Velazquez",
  "BBG",
] as const;

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

export default function FeedPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const fetchNews = useCallback(async () => {
    try {
      const res = await fetch("/api/news");
      const data = await res.json();
      if (data.articles && data.articles.length > 0) {
        setArticles(data.articles);
      } else {
        setArticles(FALLBACK_ARTICLES);
      }
    } catch {
      setArticles(FALLBACK_ARTICLES);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchNews]);

  const filtered =
    activeFilter === "All"
      ? articles
      : articles.filter((a) => {
          const tag = tagFromSearchTerm(a.searchTerm).toLowerCase();
          const filter = activeFilter.toLowerCase();
          return (
            tag.includes(filter) ||
            a.searchTerm.toLowerCase().includes(filter) ||
            a.title.toLowerCase().includes(filter)
          );
        });

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6">
        <div className="mx-auto max-w-6xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-7xl md:text-9xl leading-[0.9] text-[#F5A623] mb-4"
          >
            LIVE NEWS FEED
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-body text-white/60 text-base md:text-lg max-w-2xl mx-auto"
          >
            Real-time coverage of BBG players, coaches, and alumni across major sports media
          </motion.p>
        </div>
      </section>

      {/* Filter pills */}
      <section className="sticky top-0 z-30 bg-black/90 backdrop-blur-md border-b border-white/10 py-4 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            <Filter className="w-4 h-4 text-white/40 shrink-0" />
            {FILTER_OPTIONS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 font-accent text-xs uppercase tracking-wider transition-colors ${
                  activeFilter === f
                    ? "bg-[#F5A623] text-black"
                    : "bg-white/5 text-white/50 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <p className="font-body text-xs text-white/40 mb-6">
            {loading ? "Loading..." : `Showing ${filtered.length} articles`}
          </p>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-lg bg-white/[0.03] p-6 animate-pulse">
                  <div className="h-3 bg-white/10 rounded w-1/4 mb-4" />
                  <div className="h-5 bg-white/10 rounded w-full mb-2" />
                  <div className="h-5 bg-white/10 rounded w-3/4 mb-4" />
                  <div className="h-3 bg-white/5 rounded w-1/3" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((article, i) => (
                <motion.a
                  key={i}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  className="group rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-[#F5A623]/30 p-6 transition-all duration-300"
                >
                  {/* Tag */}
                  <span className="inline-block rounded-full bg-[#F5A623]/15 px-2.5 py-0.5 font-accent text-[11px] uppercase tracking-wider text-[#F5A623] mb-3">
                    {tagFromSearchTerm(article.searchTerm)}
                  </span>

                  {/* Headline */}
                  <h3 className="font-display text-xl md:text-2xl text-white group-hover:text-[#F5A623] transition-colors leading-tight mb-4">
                    {article.title}
                  </h3>

                  {/* Meta */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
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
                    <span className="flex items-center gap-1.5 font-accent text-xs uppercase tracking-wider text-white/30 group-hover:text-[#F5A623] transition-colors">
                      Read Article
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.a>
              ))}

              {filtered.length === 0 && (
                <div className="col-span-full text-center py-16">
                  <Newspaper className="w-10 h-10 text-white/20 mx-auto mb-4" />
                  <p className="font-body text-white/40">No articles match this filter.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
