"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  const testimonial = TESTIMONIALS[activeIndex];

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(245,166,35,0.06) 0%, rgba(0,0,0,1) 70%)",
      }}
    >
      <div className="mx-auto max-w-5xl px-6 sm:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[0.95] mb-4">
            HEAR IT FROM THEM
          </h2>
          <p className="font-body text-white/50 text-base md:text-lg max-w-xl mx-auto">
            Real words from real players, parents, and coaches.
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <div className="relative min-h-[320px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex flex-col items-center text-center"
            >
              {/* Photo */}
              <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-gold mb-8">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Quote */}
              <blockquote className="font-body italic text-white text-xl md:text-2xl leading-relaxed max-w-3xl mb-8">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <p className="font-display text-gold text-lg md:text-xl">
                {testimonial.name}
              </p>
              <p className="font-body text-white/60 text-sm mt-1">
                {testimonial.role}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full border border-white/20 hover:border-gold/50 text-white/60 hover:text-gold transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full border border-white/20 hover:border-gold/50 text-white/60 hover:text-gold transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex items-center justify-center gap-3 mt-10">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-8 bg-gold"
                  : "w-2.5 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
