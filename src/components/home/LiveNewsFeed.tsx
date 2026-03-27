"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MLB_TEAMS } from "@/lib/constants";

interface HighlightEntry {
  playerName: string;
  headline: string;
  source: string;
  link: string;
  headshot: string;
  team: string;
}

const HIGHLIGHTS: HighlightEntry[] = [
  {
    playerName: "Druw Jones",
    headline: "Druw Jones 2026 Season Highlights",
    source: "MLB.com",
    link: "https://www.mlb.com/player/druw-jones-702258",
    headshot: "/images/headshots/druw-jones.png",
    team: "Arizona Diamondbacks",
  },
  {
    playerName: "Termarr Johnson",
    headline: "Termarr Johnson Rising Through Pirates System",
    source: "MiLB.com",
    link: "https://www.milb.com/player/termarr-johnson-702261",
    headshot: "/images/headshots/termarr-johnson.png",
    team: "Pittsburgh Pirates",
  },
  {
    playerName: "Justin Crawford",
    headline: "Justin Crawford Making Waves in Phillies Organization",
    source: "MiLB.com",
    link: "https://www.milb.com/player/justin-crawford-702222",
    headshot: "/images/headshots/justin-crawford.png",
    team: "Philadelphia Phillies",
  },
  {
    playerName: "J.P. Crawford",
    headline: "J.P. Crawford: Gold Glove Shortstop",
    source: "MLB.com",
    link: "https://www.mlb.com/player/j-p-crawford-641487",
    headshot: "/images/headshots/jp-crawford.png",
    team: "Seattle Mariners",
  },
  {
    playerName: "Mikey Romero",
    headline: "Mikey Romero: Red Sox Top Prospect",
    source: "MiLB.com",
    link: "https://www.milb.com/player/mikey-romero-702540",
    headshot: "/images/headshots/mikey-romero.png",
    team: "Boston Red Sox",
  },
  {
    playerName: "Dominic Smith",
    headline: "Dominic Smith: From South LA to the Big Leagues",
    source: "MLB.com",
    link: "https://www.mlb.com/player/dominic-smith-642086",
    headshot: "/images/headshots/dominic-smith.png",
    team: "Atlanta Braves",
  },
  {
    playerName: "Malcolm Moore",
    headline: "Malcolm Moore Climbing Rangers Ranks",
    source: "MiLB.com",
    link: "https://www.milb.com/player/malcolm-moore-702270",
    headshot: "/images/headshots/malcolm-moore.png",
    team: "Texas Rangers",
  },
  {
    playerName: "Cam Caminiti",
    headline: "Cam Caminiti: Braves First-Round Selection",
    source: "MiLB.com",
    link: "https://www.milb.com/player/cam-caminiti-807284",
    headshot: "/images/headshots/cam-caminiti.png",
    team: "Atlanta Braves",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function LiveNewsFeed() {
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
            BBG PLAYERS IN THE SPOTLIGHT
          </h2>
          <p className="font-body text-white/60 text-base md:text-lg max-w-2xl">
            Watch our alumni making headlines across professional baseball
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {HIGHLIGHTS.map((entry) => {
            const teamData = MLB_TEAMS[entry.team];
            const teamLogoUrl = teamData
              ? `https://www.mlbstatic.com/team-logos/${teamData.teamId}.svg`
              : undefined;

            return (
              <motion.a
                key={entry.playerName}
                variants={cardVariants}
                href={entry.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-lg bg-black border border-white/5 hover:border-[#F5A623]/30 p-5 transition-all duration-300 group"
              >
                {/* Left: headshot with team logo */}
                <div className="relative flex-shrink-0 w-12 h-12">
                  <Image
                    src={entry.headshot}
                    alt={entry.playerName}
                    width={48}
                    height={48}
                    className="rounded-full object-cover w-12 h-12 bg-white/10"
                  />
                  {teamLogoUrl && (
                    <img
                      src={teamLogoUrl}
                      alt={entry.team}
                      width={20}
                      height={20}
                      className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-black border border-white/10"
                    />
                  )}
                </div>

                {/* Right: content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg text-white leading-tight mb-1 group-hover:text-[#F5A623] transition-colors">
                    {entry.headline}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="inline-block rounded-full bg-[#F5A623]/10 px-2.5 py-0.5 font-accent text-xs uppercase tracking-wider text-[#F5A623]">
                      {entry.source}
                    </span>
                    <span className="font-accent text-sm text-[#F5A623] group-hover:underline">
                      View Profile &rarr;
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
