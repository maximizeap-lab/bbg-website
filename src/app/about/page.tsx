import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FOUNDERS, SITE_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Baseball Generations was founded in 2017 by Dom Smith, Ron Miller, and Tim Ravare — three South LA natives on a mission to give every kid a fair shot at the game.",
  openGraph: {
    title: `Our Story | ${SITE_NAME}`,
    description:
      "Baseball Generations was founded in 2017 by Dom Smith, Ron Miller, and Tim Ravare — three South LA natives on a mission to give every kid a fair shot at the game.",
  },
};

const PILLARS = [
  {
    title: "Access",
    description:
      "We remove the financial barriers that keep talented kids out of competitive baseball. Every camp, clinic, and showcase we run is free or heavily subsidized for low-income families in South LA.",
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
  },
  {
    title: "Development",
    description:
      "Our coaches are former professionals who know what it takes to get to the next level. We develop the whole player — skills, mindset, academics, and character — because the game demands all of it.",
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    title: "Exposure",
    description:
      "Talent means nothing if nobody sees it. Through our All-Star Games, showcases, and All-American events, we put our players in front of college coaches and MLB scouts who can change their lives.",
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className="bg-navy min-h-screen">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-24">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/founders/founders-group.webp"
            alt="BBG Founders"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-navy/85" />
        </div>
        {/* Diagonal accent line */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute -left-20 top-0 h-[200%] w-px rotate-[25deg] bg-gold" />
          <div className="absolute left-1/3 top-0 h-[200%] w-px rotate-[25deg] bg-gold" />
          <div className="absolute right-1/4 top-0 h-[200%] w-px rotate-[25deg] bg-gold" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <p className="font-accent text-sm uppercase tracking-[0.3em] text-gold">
            Est. 2017 &mdash; South Los Angeles
          </p>
          <h1 className="mt-4 font-display text-7xl uppercase leading-none text-white md:text-8xl lg:text-9xl">
            Our Story
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-white/70">
            Three South LA natives. One mission. Give every kid with a glove and
            a dream the same shot at the game — regardless of their zip code or
            bank account.
          </p>
          <div className="mt-6 h-1 w-24 mx-auto bg-gradient-to-r from-gold via-gold to-gold" />
        </div>
      </section>

      {/* ===== ORIGIN STORY ===== */}
      <section className="relative bg-[#0A0A0A] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/images/founders/founders-group.webp"
                alt="BBG Founders in South LA"
                fill
                className="object-cover"
              />
              {/* Gold corner accents */}
              <div className="absolute left-0 top-0 h-16 w-1 bg-gold" />
              <div className="absolute left-0 top-0 h-1 w-16 bg-gold" />
              <div className="absolute bottom-0 right-0 h-16 w-1 bg-gold" />
              <div className="absolute bottom-0 right-0 h-1 w-16 bg-gold" />
            </div>

            {/* Narrative */}
            <div>
              <p className="font-accent text-sm uppercase tracking-[0.25em] text-gold">
                Where It Started
              </p>
              <h2 className="mt-3 font-display text-5xl uppercase leading-none text-white md:text-6xl">
                Born From<br />
                <span className="text-gold">The Struggle</span>
              </h2>
              <div className="mt-8 space-y-5 font-body text-base leading-relaxed text-white/70">
                <p>
                  In 2017, Dominic Smith was in his first year with the New York
                  Mets. But he never forgot where he came from — the fields of
                  South Los Angeles, where talent was everywhere but opportunity
                  was not.
                </p>
                <p>
                  He linked up with two childhood friends, Ron Miller and Tim
                  Ravare, who&apos;d walked the same path: Serra High School,
                  college ball, professional baseball. All three knew the ugly
                  truth — travel baseball had become a pay-to-play system that
                  priced out the kids who needed it most.
                </p>
                <p>
                  The numbers told the story. Travel ball costs families
                  $5,000&ndash;$15,000 a year. African American representation
                  in MLB had dropped below 7%. Entire neighborhoods full of
                  athletes were being left behind — not because they lacked
                  talent, but because they lacked access.
                </p>
                <p>
                  So they built Baseball Generations. Not a travel team. Not a
                  club. A <span className="text-white font-semibold">movement</span>.
                  Free camps. Professional-level coaching. Showcases in front of
                  college coaches and MLB scouts. A real pipeline from South LA
                  sandlots to scholarship offers and draft boards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOUNDERS ===== */}
      <section className="relative bg-navy py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="font-accent text-sm uppercase tracking-[0.25em] text-gold">
              The People Behind the Mission
            </p>
            <h2 className="mt-3 font-display text-5xl uppercase text-white md:text-6xl">
              Meet The Founders
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {FOUNDERS.map((founder) => (
              <div
                key={founder.name}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-sm transition-all duration-500 hover:border-gold/30 hover:bg-white/[0.06]"
              >
                {/* Gold top bar on hover */}
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Photo placeholder */}
                <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border-2 border-white/10 bg-white/5 transition-all duration-500 group-hover:border-gold/40">
                  {/* Initials fallback — shown behind the image */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy to-[#0A0A0A]">
                    <span className="font-display text-3xl text-gold/60">
                      {founder.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    className="relative z-10 object-cover"
                    sizes="128px"
                  />
                </div>

                <h3 className="mt-6 font-display text-2xl uppercase text-white">
                  {founder.name}
                </h3>
                <p className="mt-1 font-accent text-xs uppercase tracking-[0.2em] text-gold">
                  {founder.role}
                </p>
                <p className="mt-4 font-body text-sm leading-relaxed text-white/60">
                  {founder.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MISSION / VALUES ===== */}
      <section className="relative bg-[#0A0A0A] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="font-accent text-sm uppercase tracking-[0.25em] text-gold">
              What We Stand For
            </p>
            <h2 className="mt-3 font-display text-5xl uppercase text-white md:text-6xl">
              Three Pillars
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-body text-white/60">
              Everything we do falls under three pillars. If it doesn&apos;t
              serve one of these, we don&apos;t do it.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-10 transition-all duration-500 hover:border-gold/20"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors duration-500 group-hover:bg-gold/20">
                  {pillar.icon}
                </div>
                <h3 className="mt-6 font-display text-3xl uppercase text-white">
                  {pillar.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-white/60">
                  {pillar.description}
                </p>
                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gold transition-all duration-700 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE BBG WAY QUOTE ===== */}
      <section className="relative overflow-hidden bg-navy py-24">
        {/* Background texture */}
        <div className="absolute inset-0 bg-[url('/images/texture-dark.png')] opacity-5" />
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="inline-block rounded-full border border-gold/30 bg-gold/10 px-5 py-1.5">
            <p className="font-accent text-xs uppercase tracking-[0.3em] text-gold">
              The BBG Way
            </p>
          </div>

          <blockquote className="mt-10">
            <div className="mx-auto h-1 w-16 bg-gold" />
            <p className="mt-8 font-display text-4xl uppercase leading-tight text-white md:text-5xl lg:text-6xl">
              &ldquo;We&apos;re not building a travel team.{" "}
              <span className="text-gold">
                We&apos;re building the next generation
              </span>{" "}
              of players, leaders, and men.&rdquo;
            </p>
            <footer className="mt-8">
              <p className="font-body text-sm text-white/50">
                &mdash; Dominic Smith, Co-Founder
              </p>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ===== IN THE NEWS PREVIEW ===== */}
      <section className="relative bg-navy py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="font-accent text-sm uppercase tracking-[0.25em] text-gold">
              Press Coverage
            </p>
            <h2 className="mt-3 font-display text-5xl uppercase text-white md:text-6xl">
              In The News
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                image: "/images/events/allstar-03.jpg",
                headline: "BBG Produces 14 First-Round Draft Picks",
                source: "Yahoo Sports",
              },
              {
                image: "/images/events/allstar-07.jpg",
                headline: "Dominic Smith's Baseball Generations Changes Lives in South LA",
                source: "Baseball America",
              },
              {
                image: "/images/events/allstar-11.jpg",
                headline: "Druw Jones to J.P. Crawford: The BBG Pipeline",
                source: "ESPN",
              },
            ].map((article) => (
              <Link
                key={article.headline}
                href="/news"
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-500 hover:border-gold/20 hover:bg-white/[0.06]"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.headline}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="font-accent text-[10px] uppercase tracking-wider text-gold/70">
                    {article.source}
                  </span>
                  <h3 className="mt-2 font-display text-lg uppercase leading-tight text-white transition-colors duration-300 group-hover:text-gold">
                    {article.headline}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-2 font-accent text-xs uppercase tracking-[0.2em] text-gold">
                    Read More
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative bg-gradient-to-b from-[#0A0A0A] to-navy py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-5xl uppercase text-white md:text-6xl">
            Be Part Of <span className="text-gold">The Story</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-white/60">
            Every dollar goes directly to keeping our programs free for the kids
            who need them most. No middlemen. No overhead bloat. Just impact.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link href="/donate">Donate Now</Link>
            </Button>
            <Button asChild variant="outline-gold" size="lg">
              <Link href="/contact">Get Involved</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
