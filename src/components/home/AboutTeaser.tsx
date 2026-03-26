"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function AboutTeaser() {
  return (
    <section className="bg-navy py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-lg overflow-hidden relative">
              <Image
                src="/images/founders/founders-group.webp"
                alt="BBG Founders"
                fill
                className="object-cover"
              />
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="h-1 w-16 bg-gold rounded-full mb-3" />
                <p className="font-accent text-white/40 text-sm uppercase tracking-wider">
                  South Los Angeles, California
                </p>
              </div>
            </div>
            {/* Gold accent corner */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-gold/30 rounded-lg -z-0" />
          </motion.div>

          {/* Right — Text content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <p className="font-accent text-gold text-sm uppercase tracking-[0.3em] mb-4">
              Our Story
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[0.95] mb-8">
              BORN ON THE
              <br />
              FIELDS OF{" "}
              <span className="text-gold">SOUTH LA</span>
            </h2>

            <div className="space-y-5 font-body text-white/70 text-base md:text-lg leading-relaxed">
              <p>
                Baseball Generations started the way most great things do in South LA — with a
                group of guys who refused to forget where they came from. Dom Smith, Ron Miller,
                and Tim Ravare grew up on these fields, and they made it out through baseball.
              </p>
              <p>
                But making it out was never the point. Coming back was. BBG exists to give every
                kid in the community access to world-class baseball development, mentorship, and
                a real path forward — completely free.
              </p>
              <p>
                From weekend clinics at Rancho Cienega to All-Star showcases at LMU, BBG has
                become the heartbeat of youth baseball in Los Angeles.
              </p>
            </div>

            {/* Quote pullout */}
            <blockquote className="mt-10 border-l-4 border-gold pl-6 py-2">
              <p className="font-body text-white italic text-lg md:text-xl leading-relaxed">
                &ldquo;I came from these same streets. If I can make it, they can make it. We
                just gotta show them the way.&rdquo;
              </p>
              <cite className="mt-3 block font-accent text-gold text-sm uppercase tracking-wider not-italic">
                — Dominic Smith, Co-Founder
              </cite>
            </blockquote>

            <div className="mt-10">
              <Button asChild variant="outline-gold" size="lg">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
