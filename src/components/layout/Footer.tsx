"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, Twitter, Youtube, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NAV_LINKS,
  SITE_NAME,
  CONTACT_EMAIL,
  EIN,
  INSTAGRAM_URL,
} from "@/lib/constants";

const SOCIAL_LINKS = [
  { label: "Instagram", href: INSTAGRAM_URL, icon: Instagram },
  { label: "Twitter / X", href: "https://twitter.com/baseballgens", icon: Twitter },
  { label: "YouTube", href: "https://youtube.com/@baseballgenerations", icon: Youtube },
] as const;

const FOOTER_SECTIONS = [
  {
    title: "Organization",
    links: NAV_LINKS.filter((l) =>
      ["About", "Foundation", "News", "Contact"].includes(l.label)
    ),
  },
  {
    title: "Programs",
    links: NAV_LINKS.filter((l) =>
      ["Players", "Events", "Camps"].includes(l.label)
    ),
  },
  {
    title: "Support",
    links: [
      { label: "Shop", href: "/shop" },
      { label: "Donate", href: "/donate" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      // Newsletter signup — extend with your API route
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubscribed(true);
      setEmail("");
    } catch {
      // Silently handle — the form stays visible to retry
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative bg-[#000000] text-[#FFFFFF]">
      {/* Stitching divider */}
      <div className="stitching-divider" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block">
              <span className="font-bebas text-3xl tracking-wider">
                BASEBALL{" "}
                <span className="text-[#F5A623]">GENERATIONS</span>
              </span>
            </Link>
            <p className="mt-3 font-oswald text-lg uppercase tracking-wide text-[#F5A623]/80">
              From South LA to the Big Leagues
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#FFFFFF]/60">
              {SITE_NAME} is a 501(c)(3) nonprofit building the next generation
              of players, leaders, and men through baseball.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FFFFFF]/15 text-[#FFFFFF]/60 transition-all hover:border-[#F5A623] hover:text-[#F5A623]"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Links Grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-4">
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title}>
                <h3 className="font-oswald text-xs uppercase tracking-[0.2em] text-[#F5A623]">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-[#FFFFFF]/60 transition-colors hover:text-[#FFFFFF]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4">
            <h3 className="font-oswald text-xs uppercase tracking-[0.2em] text-[#F5A623]">
              Stay in the Game
            </h3>
            <p className="mt-3 text-sm text-[#FFFFFF]/60">
              Get updates on events, player stories, and ways to support South
              LA baseball.
            </p>

            {subscribed ? (
              <div className="mt-4 rounded-md border border-[#F5A623]/30 bg-[#F5A623]/10 px-4 py-3">
                <p className="font-oswald text-sm uppercase tracking-wide text-[#F5A623]">
                  You&apos;re on the roster.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 rounded-md border border-[#FFFFFF]/15 bg-[#FFFFFF]/5 px-4 py-2.5 text-sm text-[#FFFFFF] placeholder:text-[#FFFFFF]/30 focus:border-[#F5A623] focus:outline-none focus:ring-1 focus:ring-[#F5A623]"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#F5A623] px-4 text-[#000000] hover:bg-[#F5A623]/90 disabled:opacity-50"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            )}

            {/* Contact Info */}
            <div className="mt-8 space-y-2 text-xs text-[#FFFFFF]/40">
              <p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="transition-colors hover:text-[#FFFFFF]/70"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
              <p>EIN: {EIN}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[#FFFFFF]/10 pt-8 sm:flex-row">
          <p className="text-xs text-[#FFFFFF]/30">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-[#FFFFFF]/30">
            A 501(c)(3) nonprofit organization &middot; EIN {EIN}
          </p>
        </div>
      </div>
    </footer>
  );
}
