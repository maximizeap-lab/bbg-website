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

        {/* Team Badges Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-4"
        >
          {uniqueTeams.map((team) => (
            <div
              key={team.abbr}
              className="group flex flex-col items-center gap-1.5"
            >
              <div
                className="flex items-center justify-center rounded-xl px-5 py-3 font-display text-lg uppercase text-white transition-transform duration-300 hover:scale-110"
                style={{ backgroundColor: team.color }}
              >
                {team.abbr}
              </div>
              <span className="font-accent text-[10px] uppercase tracking-wider text-white/50">
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
