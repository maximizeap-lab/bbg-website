"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const PLAYER_ACHIEVEMENTS = [
  "Marcus — Full Scholarship to Kansas State",
  "Jaylen — Committed to UC Riverside",
  "DeAndre — MLB Draft Selection",
  "BBG 6th All-Star Game — 200+ Athletes",
  "500+ Players Served Across South LA",
  "J.P. Crawford — MLB All-Star & BBG Coach",
  "Dom Smith — From Serra HS to the Big Leagues",
  "40K+ Instagram Followers Strong",
  "6 All-Star Games and Counting",
  "100% Free Programming for Low-Income Kids",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
        src="/videos/hero.mp4"
      />

      {/* Gradient fallback (visible when video hasn't loaded) */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-navy via-[#0f2140] to-[#1a0a12] transition-opacity duration-1000 ${
          videoLoaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Navy-to-transparent gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/30 to-transparent" />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-accent text-gold text-sm md:text-base uppercase tracking-[0.3em] mb-4"
          >
            Baseball Generations
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-display text-6xl md:text-8xl lg:text-9xl text-white leading-[0.9] mb-6"
          >
            FROM SOUTH LA
            <br />
            TO THE{" "}
            <span className="text-gold">BIG LEAGUES</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-body text-white/80 text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
          >
            Building the next generation of players, leaders, and men.
            Free world-class baseball development for the kids who need it most.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4"
          >
            <Button asChild size="lg" variant="default">
              <Link href="/camps">REGISTER A PLAYER</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/donate">DONATE NOW</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scrolling ticker */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-navy/90 backdrop-blur-sm border-t border-white/10">
        <div className="overflow-hidden py-3">
          <div className="animate-ticker flex whitespace-nowrap">
            {[...PLAYER_ACHIEVEMENTS, ...PLAYER_ACHIEVEMENTS].map((achievement, i) => (
              <span
                key={i}
                className="mx-8 inline-flex items-center font-accent text-sm uppercase tracking-wider text-white/70"
              >
                <span className="mr-3 h-1.5 w-1.5 rounded-full bg-gold inline-block flex-shrink-0" />
                {achievement}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
