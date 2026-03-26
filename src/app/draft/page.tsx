"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { DRAFTED_PLAYERS, MLB_TEAMS } from "@/lib/constants";

function PlayerHeadshot({ player, size = 40 }: { player: typeof DRAFTED_PLAYERS[number]; size?: number }) {
  const initials = player.name.split(" ").map((n) => n[0]).join("");
  if (player.headshot) {
    return (
      <Image
        src={player.headshot}
        alt={player.name}
        width={size}
        height={size}
        className="rounded-full object-cover shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className="inline-flex items-center justify-center rounded-full bg-[#F5A623] text-black font-accent text-xs font-bold shrink-0"
      style={{ width: size, height: size }}
    >
      {initials}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Filter helpers                                                     */
/* ------------------------------------------------------------------ */

const ROUND_FILTERS = [
  "All",
  "1st Round",
  "2nd Round",
  "3rd Round",
  "4th+ Round",
  "Signed/Int'l",
] as const;

const POSITION_FILTERS = ["All", "P", "C", "INF", "OF"] as const;

type RoundFilter = (typeof ROUND_FILTERS)[number];
type PosFilter = (typeof POSITION_FILTERS)[number];

const INF_POSITIONS = new Set(["INF", "SS", "1B", "2B", "3B"]);
const OF_POSITIONS = new Set(["OF", "LF", "CF", "RF"]);

function matchesRound(round: string, filter: RoundFilter): boolean {
  if (filter === "All") return true;
  if (filter === "4th+ Round") {
    return (
      round !== "1st Round" &&
      round !== "2nd Round" &&
      round !== "3rd Round" &&
      round !== "Signed" &&
      round !== "Int'l Signing"
    );
  }
  if (filter === "Signed/Int'l") {
    return round === "Signed" || round === "Int'l Signing";
  }
  return round === filter;
}

function matchesPosition(pos: string, filter: PosFilter): boolean {
  if (filter === "All") return true;
  if (filter === "INF") return INF_POSITIONS.has(pos);
  if (filter === "OF") return OF_POSITIONS.has(pos);
  return pos === filter;
}

/* ------------------------------------------------------------------ */
/*  Tiny components                                                    */
/* ------------------------------------------------------------------ */

function TeamBadge({ team }: { team: string }) {
  const info = MLB_TEAMS[team];
  if (!info) return null;
  return (
    <span
      className="inline-flex items-center rounded px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white"
      style={{ backgroundColor: info.color }}
    >
      {info.abbr}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Stagger animation                                                  */
/* ------------------------------------------------------------------ */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const row = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function DraftPage() {
  const [roundFilter, setRoundFilter] = useState<RoundFilter>("All");
  const [posFilter, setPosFilter] = useState<PosFilter>("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return DRAFTED_PLAYERS.filter((p) => {
      if (!matchesRound(p.round, roundFilter)) return false;
      if (!matchesPosition(p.position, posFilter)) return false;
      if (q && !p.name.toLowerCase().includes(q) && !p.team.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [roundFilter, posFilter, search]);

  const firstRoundCount = DRAFTED_PLAYERS.filter(
    (p) => p.round === "1st Round"
  ).length;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* ---------- Hero ---------- */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6">
        <div className="mx-auto max-w-6xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-7xl md:text-9xl leading-[0.9] text-[#F5A623] mb-4"
          >
            THE BBG DRAFT BOARD
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-body text-white/60 text-base md:text-lg max-w-2xl mx-auto mb-8"
          >
            44+ Players Drafted Into Professional Baseball
          </motion.p>

          {/* Stat bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-3 font-accent text-sm uppercase tracking-widest text-white/50"
          >
            <span className="text-[#F5A623] font-bold">{firstRoundCount} First-Round Picks</span>
            <span className="text-white/20">|</span>
            <span className="text-[#F5A623] font-bold">{DRAFTED_PLAYERS.length} Total Selections</span>
          </motion.div>
        </div>
      </section>

      {/* ---------- Filters ---------- */}
      <section className="sticky top-0 z-30 bg-black/90 backdrop-blur-md border-b border-white/10 py-4 px-6">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row md:items-center gap-4">
          {/* Search */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search player or team..."
            className="w-full md:w-64 rounded-md bg-white/5 border border-white/10 px-4 py-2 font-body text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#F5A623]/60"
          />

          {/* Round filter */}
          <div className="flex flex-wrap gap-2">
            {ROUND_FILTERS.map((r) => (
              <button
                key={r}
                onClick={() => setRoundFilter(r)}
                className={`rounded-full px-3 py-1 font-accent text-xs uppercase tracking-wider transition-colors ${
                  roundFilter === r
                    ? "bg-[#F5A623] text-black"
                    : "bg-white/5 text-white/50 hover:text-white"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Position filter */}
          <div className="flex gap-2">
            {POSITION_FILTERS.map((p) => (
              <button
                key={p}
                onClick={() => setPosFilter(p)}
                className={`rounded-full px-3 py-1 font-accent text-xs uppercase tracking-wider transition-colors ${
                  posFilter === p
                    ? "bg-[#F5A623] text-black"
                    : "bg-white/5 text-white/50 hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Draft Board ---------- */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          {/* Desktop header row */}
          <div className="hidden md:grid md:grid-cols-[48px_1fr_200px_140px_80px] gap-4 px-5 pb-3 border-b border-white/10 font-accent text-[11px] uppercase tracking-widest text-white/40">
            <span></span>
            <span>Player</span>
            <span>Team</span>
            <span>Round</span>
            <span>Pos</span>
          </div>

          {/* Results count */}
          <p className="mt-4 mb-6 font-body text-xs text-white/40">
            Showing {filtered.length} of {DRAFTED_PLAYERS.length} players
          </p>

          {/* Rows */}
          <motion.div
            key={`${roundFilter}-${posFilter}-${search}`}
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-2"
          >
            {filtered.map((player) => {
              const info = MLB_TEAMS[player.team];
              return (
                <motion.div
                  key={player.name}
                  variants={row}
                  className="group rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors duration-200"
                >
                  {/* Desktop */}
                  <div className="hidden md:grid md:grid-cols-[48px_1fr_200px_140px_80px] gap-4 items-center px-5 py-4">
                    <PlayerHeadshot player={player} size={40} />
                    <h3 className="font-display text-lg text-white group-hover:text-[#F5A623] transition-colors">
                      {player.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      {info && <TeamBadge team={player.team} />}
                      <span className="font-accent text-[#F5A623] text-sm uppercase tracking-wider truncate">
                        {player.team}
                      </span>
                    </div>
                    <span className="font-body text-white/50 text-sm">
                      {player.round}
                    </span>
                    <span className="rounded-full border border-white/20 text-center px-2 py-0.5 font-accent text-[11px] uppercase tracking-wider text-white/60">
                      {player.position}
                    </span>
                  </div>

                  {/* Mobile */}
                  <div className="flex md:hidden items-center justify-between px-4 py-3">
                    <div className="shrink-0 mr-3">
                      <PlayerHeadshot player={player} size={36} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-base text-white truncate group-hover:text-[#F5A623] transition-colors">
                        {player.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {info && <TeamBadge team={player.team} />}
                        <span className="font-accent text-[#F5A623] text-xs uppercase tracking-wider truncate">
                          {player.team}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0 ml-3">
                      <span className="font-body text-white/50 text-xs">
                        {player.round}
                      </span>
                      <span className="rounded-full border border-white/20 px-2 py-0.5 font-accent text-[10px] uppercase tracking-wider text-white/60">
                        {player.position}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {filtered.length === 0 && (
              <p className="text-center font-body text-white/40 py-16">
                No players match your filters.
              </p>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
