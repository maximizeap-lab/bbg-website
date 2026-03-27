"use client";

import { motion } from "framer-motion";
import { MLB_TEAMS, DRAFTED_PLAYERS } from "@/lib/constants";

const PARTNERS = ["Baseballism", "MLB", "Roc Nation Sports"];

export default function Partners() {
  // Count players per team
  const teamCounts: Record<string, number> = {};
  for (const player of DRAFTED_PLAYERS) {
    teamCounts[player.team] = (teamCounts[player.team] || 0) + 1;
  }

  // Get unique teams sorted by count descending
  const uniqueTeams = Object.entries(teamCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([team, count]) => ({
      name: team,
      count,
      ...MLB_TEAMS[team],
    }))
    .filter((t) => t.abbr);

  return (
    <section className="relative bg-black py-24 overflow-hidden">
      {/* Subtle gold gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5A623]/[0.03] via-transparent to-[#F5A623]/[0.03]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="font-accent text-sm uppercase tracking-[0.3em] text-gold">
            MLB Draft Representation
          </p>
          <h2 className="mt-3 font-display text-5xl uppercase leading-none text-white md:text-6xl lg:text-7xl">
            Where Our Players Play
          </h2>
          <div className="mt-6 h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent" />
        </motion.div>

        {/* MLB Centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-12 flex items-center justify-center"
        >
          <span className="font-display text-4xl md:text-5xl uppercase tracking-widest text-[#F5A623]">
            MLB
          </span>
        </motion.div>

        {/* Team Logo Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 justify-items-center"
        >
          {uniqueTeams.map((team) => (
            <div
              key={team.abbr}
              className="group flex flex-col items-center gap-2 transition-transform duration-300 hover:scale-110"
            >
              <div className="flex items-center justify-center w-20 h-20 rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-[#F5A623]/30 transition-colors">
                <img
                  src={`https://www.mlbstatic.com/team-logos/${team.teamId}.svg`}
                  alt={team.name}
                  className="h-10 w-10 object-contain"
                />
              </div>
              <span className="font-accent text-[10px] uppercase tracking-wider text-white/60 text-center leading-tight">
                {team.name}
              </span>
              <span className="inline-flex items-center justify-center rounded-full bg-[#F5A623]/10 px-2 py-0.5 font-accent text-[10px] text-[#F5A623]">
                {team.count} {team.count === 1 ? "player" : "players"}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Affiliated With */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 text-center"
        >
          <p className="font-accent text-xs uppercase tracking-[0.3em] text-white/30">
            Affiliated With
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-12">
            {PARTNERS.map((partner) => (
              <span
                key={partner}
                className="font-display text-2xl uppercase text-white/40 transition-all duration-300 hover:text-white hover:scale-105 cursor-default md:text-3xl"
              >
                {partner}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
