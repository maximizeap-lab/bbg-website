"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { POSITIONS } from "@/lib/constants";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

type PlayerStatus = "active" | "committed" | "pro" | "alumni";

interface Player {
  slug: string;
  first_name: string;
  last_name: string;
  jersey_number: number;
  position: string;
  graduation_year: number;
  school: string;
  status: PlayerStatus;
  image_url: string | null;
}

/* -------------------------------------------------------------------------- */
/*  Sample Data                                                               */
/* -------------------------------------------------------------------------- */

const PLAYERS: Player[] = [
  {
    slug: "marcus-johnson",
    first_name: "Marcus",
    last_name: "Johnson",
    jersey_number: 7,
    position: "SS",
    graduation_year: 2025,
    school: "Kansas State",
    status: "committed",
    image_url: null,
  },
  {
    slug: "jaylen-carter",
    first_name: "Jaylen",
    last_name: "Carter",
    jersey_number: 24,
    position: "CF",
    graduation_year: 2026,
    school: "Serra High School",
    status: "active",
    image_url: null,
  },
  {
    slug: "deandre-williams",
    first_name: "DeAndre",
    last_name: "Williams",
    jersey_number: 11,
    position: "P",
    graduation_year: 2024,
    school: "UC Riverside",
    status: "committed",
    image_url: null,
  },
  {
    slug: "isaiah-brooks",
    first_name: "Isaiah",
    last_name: "Brooks",
    jersey_number: 3,
    position: "2B",
    graduation_year: 2027,
    school: "Crenshaw High School",
    status: "active",
    image_url: null,
  },
  {
    slug: "xavier-thomas",
    first_name: "Xavier",
    last_name: "Thomas",
    jersey_number: 44,
    position: "1B",
    graduation_year: 2023,
    school: "Atlanta Braves Organization",
    status: "pro",
    image_url: null,
  },
  {
    slug: "cameron-davis",
    first_name: "Cameron",
    last_name: "Davis",
    jersey_number: 15,
    position: "C",
    graduation_year: 2024,
    school: "Long Beach State",
    status: "alumni",
    image_url: null,
  },
];

const GRADUATION_YEARS = [2024, 2025, 2026, 2027, 2028, 2029, 2030];

const STATUS_OPTIONS: { value: PlayerStatus | ""; label: string }[] = [
  { value: "", label: "All Statuses" },
  { value: "active", label: "Active" },
  { value: "committed", label: "Committed" },
  { value: "pro", label: "Pro" },
  { value: "alumni", label: "Alumni" },
];

const STATUS_VARIANT: Record<PlayerStatus, "default" | "success" | "destructive" | "secondary"> = {
  active: "success",
  committed: "default",
  pro: "destructive",
  alumni: "secondary",
};

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export default function PlayersPage() {
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("");
  const [positionFilter, setPositionFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const filtered = useMemo(() => {
    return PLAYERS.filter((p) => {
      const matchesSearch =
        search === "" ||
        `${p.first_name} ${p.last_name}`
          .toLowerCase()
          .includes(search.toLowerCase());
      const matchesYear =
        yearFilter === "" || p.graduation_year === Number(yearFilter);
      const matchesPosition =
        positionFilter === "" || p.position === positionFilter;
      const matchesStatus = statusFilter === "" || p.status === statusFilter;
      return matchesSearch && matchesYear && matchesPosition && matchesStatus;
    });
  }, [search, yearFilter, positionFilter, statusFilter]);

  return (
    <main className="min-h-screen bg-navy">
      {/* ------------------------------------------------------------------ */}
      {/*  Hero                                                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden py-28 text-center">
        {/* decorative diamond pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #F5A623 0, #F5A623 1px, transparent 0, transparent 50%)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-5xl px-6">
          <h1 className="font-display text-6xl tracking-tight text-white sm:text-7xl lg:text-8xl">
            THE ROSTER
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-white/60">
            Meet the players who make up Baseball Generations. From future
            college commits to professional athletes — this is our family.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*  Filters                                                           */}
      {/* ------------------------------------------------------------------ */}
      <section className="sticky top-0 z-30 border-b border-white/10 bg-navy/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-6 py-4">
          {/* Search */}
          <div className="min-w-[200px] flex-1">
            <Input
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5"
            />
          </div>

          {/* Graduation Year */}
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="h-11 rounded-md border border-white/20 bg-white/5 px-4 text-sm text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <option value="" className="bg-navy">
              All Years
            </option>
            {GRADUATION_YEARS.map((y) => (
              <option key={y} value={y} className="bg-navy">
                Class of {y}
              </option>
            ))}
          </select>

          {/* Position */}
          <select
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
            className="h-11 rounded-md border border-white/20 bg-white/5 px-4 text-sm text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <option value="" className="bg-navy">
              All Positions
            </option>
            {POSITIONS.map((pos) => (
              <option key={pos} value={pos} className="bg-navy">
                {pos}
              </option>
            ))}
          </select>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 rounded-md border border-white/20 bg-white/5 px-4 text-sm text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s.value} value={s.value} className="bg-navy">
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*  Player Grid                                                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="mb-4 text-6xl text-white/10">0</div>
            <p className="font-body text-xl text-white/50">
              No players match your filters.
            </p>
            <Button
              variant="outline-gold"
              size="sm"
              className="mt-6"
              onClick={() => {
                setSearch("");
                setYearFilter("");
                setPositionFilter("");
                setStatusFilter("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((player) => (
              <article
                key={player.slug}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_0_30px_rgba(245,166,35,0.08)]"
              >
                {/* Card body */}
                <div className="flex flex-col items-center px-6 pb-6 pt-10">
                  {/* Circular placeholder image */}
                  <div className="relative mb-5">
                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-gold/30 to-gold/20 ring-2 ring-white/10 transition-all duration-300 group-hover:ring-gold/40">
                      <span className="font-accent text-3xl text-white/30">
                        {player.first_name[0]}
                        {player.last_name[0]}
                      </span>
                    </div>
                    {/* Jersey number badge */}
                    <div className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full bg-gold shadow-lg">
                      <span className="font-accent text-lg leading-none text-white">
                        {player.jersey_number}
                      </span>
                    </div>
                  </div>

                  {/* Name */}
                  <h3 className="font-display text-2xl tracking-tight text-white">
                    {player.first_name} {player.last_name}
                  </h3>

                  {/* Position + Year */}
                  <p className="mt-1 font-body text-sm text-white/50">
                    {player.position} &middot; Class of{" "}
                    {player.graduation_year}
                  </p>

                  {/* School */}
                  <p className="mt-2 font-body text-sm text-gold/80">
                    {player.school}
                  </p>

                  {/* Status badge */}
                  <Badge
                    variant={STATUS_VARIANT[player.status]}
                    className="mt-4 capitalize"
                  >
                    {player.status}
                  </Badge>

                  {/* CTA */}
                  <Link
                    href={`/players/${player.slug}`}
                    className="mt-6 w-full"
                  >
                    <Button
                      variant="outline-gold"
                      size="sm"
                      className="w-full"
                    >
                      View Profile
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
