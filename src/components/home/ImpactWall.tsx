"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SAMPLE_IMPACT_STORIES, INSTAGRAM_HANDLE } from "@/lib/constants";
import { Button } from "@/components/ui/button";

const GRID_IMAGES = [
  "/images/events/allstar-01.jpg",
  "/images/events/allstar-03.jpg",
  "/images/events/allstar-04.jpg",
  "/images/events/allstar-06.jpg",
  "/images/events/allstar-07.jpg",
  "/images/events/allstar-09.jpg",
  "/images/events/allstar-10.jpg",
  "/images/events/allstar-11.jpg",
  "/images/events/allstar-20.jpg",
  "/images/events/allstar-25.jpg",
  "/images/events/allstar-30.jpg",
  "/images/events/allstar-39.jpg",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ImpactWall() {
  const allItems = GRID_IMAGES.map((src) => ({ type: "image" as const, src }));
  const [visiblePosts, setVisiblePosts] = useState(6);

  return (
    <section className="bg-navy py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-accent text-gold text-sm uppercase tracking-[0.3em] mb-3">
            {INSTAGRAM_HANDLE}
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[0.95] mb-4">
            THE PROOF IS ON THE <span className="text-gold">FIELD</span>
          </h2>
          <p className="font-body text-white/50 text-base md:text-lg max-w-xl mx-auto">
            40,000+ followers watching these kids change their lives.
          </p>
        </motion.div>

        {/* Featured impact stories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16"
        >
          {SAMPLE_IMPACT_STORIES.map((story) => (
            <motion.div
              key={story.player_name}
              variants={cardVariants}
              className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-[#1a2d4a] to-[#1a1a1a] border border-white/10 hover:border-gold/30 transition-all duration-300"
            >
              {/* Gradient placeholder image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-navy via-[#1a2d4a] to-[#1a1a1a] relative">
                <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent" />
              </div>

              {/* Content overlay */}
              <div className="p-6 -mt-16 relative z-10">
                {/* Outcome badge */}
                <span className="inline-block font-accent text-[11px] uppercase tracking-wider bg-gold text-navy px-3 py-1.5 rounded-full font-bold mb-4">
                  {story.outcome}
                </span>

                <h3 className="font-display text-2xl text-white mb-3 group-hover:text-gold transition-colors">
                  {story.headline}
                </h3>

                <blockquote className="font-body text-white/60 text-sm italic leading-relaxed mb-4">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gold/20 flex items-center justify-center">
                    <span className="font-accent text-gold text-xs font-bold">
                      {story.player_name[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-body text-white text-sm font-semibold">{story.player_name}</p>
                    <p className="font-body text-white/40 text-xs">Since {story.year_joined}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Instagram-style masonry grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
        >
          {allItems.slice(0, visiblePosts).map((item, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="group cursor-pointer"
            >
              <div
                className="aspect-square rounded-md relative overflow-hidden border border-white/5 hover:border-gold/30 transition-all duration-300"
              >
                <Image
                  src={item.src}
                  alt="BBG event photo"
                  fill
                  className="object-cover"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </div>

                {/* All items are real images now */}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        {visiblePosts < allItems.length && (
          <div className="mt-10 text-center">
            <Button
              variant="outline-gold"
              size="default"
              onClick={() => setVisiblePosts(allItems.length)}
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
