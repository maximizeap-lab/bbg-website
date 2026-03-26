"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  FOUNDERS,
  STAFF,
  IMPACT_STATS,
  SAMPLE_IMPACT_STORIES,
  EIN,
  SITE_NAME,
} from "@/lib/constants";
import { useCountUp } from "@/hooks/useCountUp";
import { Button } from "@/components/ui/button";

const PROBLEM_STATS = [
  {
    number: "$5K-$15K",
    label: "Cost of Travel Baseball Per Year",
    description:
      "Families in South LA simply cannot afford this. The pay-to-play model locks out the most talented kids in the country.",
  },
  {
    number: "<7%",
    label: "African Americans in MLB",
    description:
      "Down from 18% in the 1980s. The pipeline is broken, and it starts at the youth level where access is gatekept by income.",
  },
  {
    number: "0",
    label: "Proper Coaching Facilities in South LA",
    description:
      "No professional-grade training centers. No full-time coaches. Kids are left to figure it out on their own.",
  },
];

const ALLOCATION = [
  { label: "Programs & Player Development", percent: 70, color: "bg-gold" },
  { label: "Operations & Events", percent: 20, color: "bg-gold" },
  { label: "Administration", percent: 10, color: "bg-white/40" },
];

function ImpactCounter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const { count, ref } = useCountUp(value, 2000);
  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-5xl text-gold md:text-6xl">
        {count}
        {suffix}
      </p>
      <p className="mt-2 font-accent text-xs uppercase tracking-[0.2em] text-white/60">
        {label}
      </p>
    </div>
  );
}

export default function FoundationPage() {
  const [activeStory, setActiveStory] = useState(0);

  return (
    <div className="bg-navy min-h-screen">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-24">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-main.webp"
            alt="BBG youth baseball"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/95 to-navy" />
          <div className="absolute inset-0 opacity-[0.03]">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-0 h-[200%] w-px rotate-[25deg] bg-gold"
                style={{ left: `${i * 14}%` }}
              />
            ))}
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-gold/30 bg-gold/10 px-5 py-2">
            <span className="font-accent text-xs uppercase tracking-[0.3em] text-gold">
              501(c)(3) Nonprofit
            </span>
            <span className="h-4 w-px bg-gold/30" />
            <span className="font-body text-xs text-gold/80">
              EIN: {EIN}
            </span>
          </div>

          <h1 className="mt-8 font-display text-5xl uppercase leading-none text-white md:text-7xl lg:text-8xl">
            Baseball Is A Tool.
            <br />
            <span className="text-gold">We&apos;re Building Lives.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-white/70">
            The Baseball Generations Foundation exists to break down the
            financial and geographic barriers that keep talented young athletes
            from reaching their potential.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link href="/donate">Support the Mission</Link>
            </Button>
            <Button asChild variant="outline-gold" size="lg">
              <a href="#transparency">See Where It Goes</a>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== THE PROBLEM ===== */}
      <section className="relative bg-[#0A0A0A] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="font-accent text-sm uppercase tracking-[0.25em] text-gold">
              Why This Matters
            </p>
            <h2 className="mt-3 font-display text-5xl uppercase text-white md:text-6xl">
              The Problem
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {PROBLEM_STATS.map((stat) => (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gold/10 via-transparent to-transparent p-8 transition-all duration-500 hover:border-gold/30"
              >
                <p className="font-accent text-5xl font-bold text-gold md:text-6xl">
                  {stat.number}
                </p>
                <p className="mt-4 font-display text-lg uppercase text-white">
                  {stat.label}
                </p>
                <p className="mt-3 font-body text-sm leading-relaxed text-white/50">
                  {stat.description}
                </p>
                {/* Corner accent */}
                <div className="absolute right-0 top-0 h-20 w-1 bg-gradient-to-b from-gold/50 to-transparent" />
                <div className="absolute right-0 top-0 h-1 w-20 bg-gradient-to-l from-gold/50 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OUR SOLUTION ===== */}
      <section className="relative bg-navy py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="font-accent text-sm uppercase tracking-[0.25em] text-gold">
              How We Fix It
            </p>
            <h2 className="mt-3 font-display text-5xl uppercase text-white md:text-6xl">
              Our Solution
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Access",
                desc: "Free camps, clinics, and showcases for underserved communities. No kid gets turned away because of money.",
                icon: (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                ),
              },
              {
                title: "Development",
                desc: "Professional coaching from former MLB and MiLB players. Skills training, academic mentorship, and character building.",
                icon: (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                  </svg>
                ),
              },
              {
                title: "Exposure",
                desc: "All-Star Games and All-American showcases in front of D1 coaches and MLB scouts. Real opportunities, not promises.",
                icon: (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                ),
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center transition-all duration-500 hover:border-gold/20 hover:bg-white/[0.06]"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
                  {pillar.icon}
                </div>
                <h3 className="mt-6 font-display text-3xl uppercase text-white">
                  {pillar.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-white/60">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== IMPACT NUMBERS ===== */}
      <section className="relative bg-[#0A0A0A] py-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {IMPACT_STATS.map((stat) => (
              <ImpactCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== PLAYER SUCCESS STORIES ===== */}
      <section className="relative bg-navy py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="font-accent text-sm uppercase tracking-[0.25em] text-gold">
              Real Results
            </p>
            <h2 className="mt-3 font-display text-5xl uppercase text-white md:text-6xl">
              Player Stories
            </h2>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {SAMPLE_IMPACT_STORIES.map((story, i) => (
              <div
                key={story.player_name}
                className={`group relative overflow-hidden rounded-2xl border p-8 transition-all duration-500 ${
                  activeStory === i
                    ? "border-gold/40 bg-gold/[0.06] scale-[1.02]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20"
                }`}
                onMouseEnter={() => setActiveStory(i)}
              >
                {/* Player photo placeholder */}
                <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full border-2 border-gold/30 bg-white/5">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy to-[#0A0A0A]">
                    <span className="font-display text-2xl text-gold/50">
                      {story.player_name[0]}
                    </span>
                  </div>
                  <Image
                    src={story.photo_url}
                    alt={story.player_name}
                    fill
                    className="relative z-10 object-cover"
                    sizes="80px"
                  />
                </div>

                <div className="mt-6 text-center">
                  <p className="font-display text-xl uppercase text-white">
                    {story.player_name}
                  </p>
                  <p className="mt-1 font-accent text-xs uppercase tracking-[0.15em] text-gold">
                    {story.outcome}
                  </p>
                </div>

                <h3 className="mt-4 font-display text-lg uppercase text-white/90">
                  {story.headline}
                </h3>

                <blockquote className="mt-4 border-l-2 border-gold/30 pl-4">
                  <p className="font-body text-sm italic leading-relaxed text-white/60">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </blockquote>

                <p className="mt-4 font-body text-xs text-white/30">
                  BBG since {story.year_joined}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOUNDATION TEAM ===== */}
      <section className="relative bg-[#0A0A0A] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="font-accent text-sm uppercase tracking-[0.25em] text-gold">
              The Team
            </p>
            <h2 className="mt-3 font-display text-5xl uppercase text-white md:text-6xl">
              Foundation Leadership
            </h2>
          </div>

          {/* Founders */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {FOUNDERS.map((founder) => (
              <div
                key={founder.name}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center transition-all duration-300 hover:border-gold/20"
              >
                <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full border-2 border-gold/20 bg-white/5">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy to-[#0A0A0A]">
                    <span className="font-display text-2xl text-gold/60">
                      {founder.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                </div>
                <h3 className="mt-4 font-display text-xl uppercase text-white">
                  {founder.name}
                </h3>
                <p className="mt-1 font-accent text-xs uppercase tracking-[0.15em] text-gold">
                  {founder.role}
                </p>
              </div>
            ))}
          </div>

          {/* Staff */}
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
            {STAFF.map((member) => (
              <div
                key={member.name}
                className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center transition-all duration-300 hover:border-white/10"
              >
                <div className="mx-auto h-14 w-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
                  <span className="font-display text-sm text-white/40">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <p className="mt-3 font-body text-sm font-semibold text-white/80">
                  {member.name}
                </p>
                <p className="mt-0.5 font-body text-xs text-white/40">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRANSPARENCY ===== */}
      <section id="transparency" className="relative bg-navy py-24 scroll-mt-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <p className="font-accent text-sm uppercase tracking-[0.25em] text-gold">
              Full Transparency
            </p>
            <h2 className="mt-3 font-display text-5xl uppercase text-white md:text-6xl">
              Where Your Money Goes
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-body text-white/60">
              We believe in radical transparency. Here&apos;s exactly how every
              dollar is allocated.
            </p>
          </div>

          <div className="mt-16 space-y-8">
            {ALLOCATION.map((item) => (
              <div key={item.label}>
                <div className="flex items-baseline justify-between">
                  <p className="font-body text-sm font-semibold text-white">
                    {item.label}
                  </p>
                  <p className="font-display text-2xl text-white">
                    {item.percent}%
                  </p>
                </div>
                <div className="mt-3 h-4 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all duration-1000`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Download + EIN */}
          <div className="mt-16 flex flex-col items-center gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="font-display text-xl uppercase text-white">
                Annual Report
              </p>
              <p className="mt-1 font-body text-sm text-white/50">
                Download our latest annual report for full financials and impact
                data.
              </p>
            </div>
            <Button variant="outline-gold" size="lg" className="shrink-0">
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download PDF
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="font-body text-sm text-white/40">
              Baseball Generations Foundation is a registered 501(c)(3) nonprofit
              organization.
            </p>
            <p className="mt-1 font-accent text-sm uppercase tracking-[0.2em] text-gold/60">
              EIN: {EIN}
            </p>
          </div>
        </div>
      </section>

      {/* ===== DONATION CTA ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A0A0A] to-navy py-24">
        <div className="absolute inset-0 opacity-[0.03]">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 h-[200%] w-px rotate-[25deg] bg-gold"
              style={{ left: `${i * 25}%` }}
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-5xl uppercase text-white md:text-6xl">
            Invest In{" "}
            <span className="text-gold">The Next Generation</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-white/60">
            Your tax-deductible donation directly funds free camps, coaching,
            equipment, and exposure events for underserved youth in South LA.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="xl">
              <Link href="/donate">Donate Now</Link>
            </Button>
            <Button asChild variant="outline-gold" size="lg">
              <Link href="/contact">Become a Sponsor</Link>
            </Button>
          </div>
          <p className="mt-6 font-body text-xs text-white/30">
            All donations are tax-deductible. EIN: {EIN}
          </p>
        </div>
      </section>
    </div>
  );
}
