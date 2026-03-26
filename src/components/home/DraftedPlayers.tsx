"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { DRAFTED_PLAYERS, MLB_TEAMS } from "@/lib/constants";

const firstRounders = DRAFTED_PLAYERS.filter((p) => p.round === "1st Round");
const remaining = DRAFTED_PLAYERS.filter((p) => p.round !== "1st Round");

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function TeamBadge({ team }: { team: string }) {
  const info = MLB_TEAMS[team];
  if (!info) return null;
  return (
    <span
      className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white"
      style={{ backgroundColor: info.color }}
    >
      {info.abbr}
    </span>
  );
}

function PositionBadge({ position }: { position: string }) {
  return (
    <span className="rounded-full border border-white/20 px-2.5 py-0.5 font-accent text-[11px] uppercase tracking-wider text-white/70">
      {position}
    </span>
  );
}

function RoundBadge({ round }: { round: string }) {
  const isFirst = round === "1st Round";
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 font-accent text-[11px] uppercase tracking-wider ${
        isFirst
          ? "bg-[#F5A623]/20 text-[#F5A623]"
          : "bg-white/5 text-white/50"
      }`}
    >
      {round}
    </span>
  );
}

export default function DraftedPlayersSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="bg-black py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        {/* ---------- Header ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-7xl md:text-9xl leading-[0.9] text-[#F5A623] mb-4">
            44 PLAYERS DRAFTED
          </h2>
          <p className="font-body text-white/60 text-base md:text-lg max-w-3xl mx-auto">
            14 First-Round Picks. From South LA to Every Corner of Professional
            Baseball.
          </p>
        </motion.div>

        {/* ---------- 1st-Round Grid ---------- */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12"
        >
          {firstRounders.map((player) => {
            const info = MLB_TEAMS[player.team];
            return (
              <motion.div
                key={player.name}
                variants={cardUp}
                className="group relative flex items-center gap-4 rounded-lg border-l-4 border-[#F5A623] bg-white/[0.03] px-5 py-5 hover:bg-white/[0.06] transition-colors duration-300"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-2xl text-white leading-tight group-hover:text-[#F5A623] transition-colors">
                    {player.name}
                  </h3>
                  <p className="font-accent text-[#F5A623] text-sm uppercase tracking-wider mt-0.5">
                    {player.team}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {info && <TeamBadge team={player.team} />}
                  <RoundBadge round={player.round} />
                  <PositionBadge position={player.position} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ---------- Divider ---------- */}
        <div className="mx-auto max-w-xl h-px bg-gradient-to-r from-transparent via-[#F5A623]/30 to-transparent mb-10" />

        {/* ---------- Expand Toggle ---------- */}
        <div className="text-center mb-8">
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 font-accent text-sm uppercase tracking-widest text-white/70 hover:text-[#F5A623] transition-colors"
          >
            <span>{expanded ? "HIDE" : "ALL DRAFTED PLAYERS"}</span>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path d="m6 9 6 6 6-6" />
            </motion.svg>
          </button>
        </div>

        {/* ---------- Remaining Players ---------- */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-12"
              >
                {remaining.map((player) => (
                  <motion.div
                    key={player.name}
                    variants={cardUp}
                    className="flex items-center justify-between rounded-md bg-white/[0.03] px-4 py-3 hover:bg-white/[0.06] transition-colors duration-200"
                  >
                    <div className="min-w-0">
                      <p className="font-display text-base text-white truncate">
                        {player.name}
                      </p>
                      <p className="font-accent text-[#F5A623] text-sm uppercase tracking-wider truncate">
                        {player.team}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <TeamBadge team={player.team} />
                      <span className="text-white/50 font-body text-xs">
                        {player.round}
                      </span>
                      <PositionBadge position={player.position} />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---------- CTA ---------- */}
        <div className="text-center mt-4">
          <Link
            href="/draft"
            className="inline-block font-accent text-sm uppercase tracking-widest text-black bg-[#F5A623] hover:bg-[#d4900e] px-8 py-3 rounded-md transition-colors duration-200"
          >
            View Full Draft Board
          </Link>
        </div>
      </div>
    </section>
  );
}
