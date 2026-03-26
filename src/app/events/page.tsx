"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { SEED_EVENTS, INSTAGRAM_HANDLE } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type TabValue = "upcoming" | "past";

export default function EventsPage() {
  const hasUpcoming = SEED_EVENTS.some((e) => e.status === "upcoming");
  const [activeTab, setActiveTab] = useState<TabValue>(hasUpcoming ? "upcoming" : "past");

  const filteredEvents = SEED_EVENTS.filter(
    (event) => event.status === activeTab
  );

  return (
    <div className="min-h-screen bg-navy">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-12 pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(200,16,46,0.1),transparent_50%)]" />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <h1 className="mb-4 font-display text-6xl text-white md:text-7xl lg:text-8xl">
            Events
          </h1>
          <p className="mx-auto max-w-lg font-body text-lg text-white/50">
            Showcases, All-Star Games, and community events that put South LA
            talent on the map.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex justify-center gap-2">
            {(["upcoming", "past"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-6 py-2.5 font-accent text-sm uppercase tracking-wider transition-all ${
                  activeTab === tab
                    ? "bg-gold text-navy"
                    : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Event Cards */}
          {filteredEvents.length === 0 ? (
            <div className="py-20 text-center">
              <p className="mb-3 font-display text-2xl text-white/40">
                {activeTab === "upcoming"
                  ? "Stay tuned for upcoming events."
                  : "No past events to display."}
              </p>
              {activeTab === "upcoming" && (
                <p className="font-body text-sm text-white/30">
                  Follow{" "}
                  <span className="text-gold">{INSTAGRAM_HANDLE}</span> for
                  announcements.
                </p>
              )}
            </div>
          ) : (
            <div className="grid gap-6 pb-24 md:grid-cols-2">
              {filteredEvents.map((event) => (
                <div
                  key={event.slug}
                  className="group overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] transition-all hover:border-white/10 hover:bg-white/[0.04]"
                >
                  {/* Image placeholder */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-bbg-red/20 via-navy to-gold/10">
                    <div className="flex h-full w-full items-center justify-center">
                      <p className="font-display text-3xl text-white/10">
                        BBG
                      </p>
                    </div>
                    {/* Status badge */}
                    <div
                      className={`absolute right-4 top-4 rounded-full px-3 py-1 font-accent text-xs uppercase tracking-wider ${
                        event.status === "upcoming"
                          ? "bg-gold text-navy"
                          : event.status === "past"
                            ? "bg-white/20 text-white/60"
                            : "bg-bbg-red text-white"
                      }`}
                    >
                      {event.status}
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6">
                    <h3 className="mb-3 font-display text-2xl text-white transition-colors group-hover:text-gold">
                      {event.name}
                    </h3>

                    <div className="mb-4 space-y-2">
                      {event.event_date && (
                        <div className="flex items-center gap-2 font-body text-sm text-white/50">
                          <Calendar className="h-4 w-4 text-gold/60" />
                          {formatDate(event.event_date)}
                        </div>
                      )}
                      {event.location_name && (
                        <div className="flex items-center gap-2 font-body text-sm text-white/50">
                          <MapPin className="h-4 w-4 text-gold/60" />
                          {event.location_name}
                        </div>
                      )}
                    </div>

                    {event.description && (
                      <p className="mb-5 line-clamp-2 font-body text-sm text-white/40">
                        {event.description}
                      </p>
                    )}

                    <Button variant="outline-gold" size="sm" asChild>
                      <Link href={`/events/${event.slug}`}>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
