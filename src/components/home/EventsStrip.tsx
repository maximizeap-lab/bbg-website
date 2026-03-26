"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { SEED_EVENTS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: d.getDate(),
    year: d.getFullYear(),
  };
}

function isPast(dateStr: string) {
  return new Date(dateStr) < new Date();
}

export default function EventsStrip() {
  const events = SEED_EVENTS;
  const upcomingEvents = events.filter((e) => e.event_date && !isPast(e.event_date));
  const displayEvents = upcomingEvents.length > 0 ? upcomingEvents : events;
  const showingPast = upcomingEvents.length === 0;

  return (
    <section className="bg-navy py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="font-accent text-gold text-sm uppercase tracking-[0.3em] mb-3">
              Mark Your Calendar
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white">
              UPCOMING EVENTS
            </h2>
          </div>
          <Button asChild variant="outline-gold" size="sm" className="hidden sm:inline-flex">
            <Link href="/events">View All</Link>
          </Button>
        </motion.div>
      </div>

      {/* Horizontal scroll container */}
      <div className="pl-6 sm:pl-12 lg:pl-[calc((100vw-1280px)/2+48px)]">
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide pr-6">
          {displayEvents.map((event, i) => {
            const date = event.event_date ? formatDate(event.event_date) : null;
            const past = event.event_date ? isPast(event.event_date) : false;

            return (
              <motion.div
                key={event.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex-shrink-0 w-[320px] md:w-[380px] group"
              >
                <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden h-full flex flex-col hover:bg-white/10 hover:border-gold/30 transition-all duration-300">
                  {/* Event image */}
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src="/images/events/allstar-game.webp"
                      alt={event.name ?? "BBG Event"}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                  {/* Date badge + past label */}
                  <div className="flex items-start justify-between mb-5">
                    {date && (
                      <div className="bg-bbg-red rounded-md px-4 py-3 text-center min-w-[70px]">
                        <span className="block font-accent text-white/80 text-xs tracking-wider">
                          {date.month}
                        </span>
                        <span className="block font-display text-white text-3xl leading-none">
                          {date.day}
                        </span>
                        <span className="block font-accent text-white/60 text-xs mt-0.5">
                          {date.year}
                        </span>
                      </div>
                    )}
                    {showingPast && past && (
                      <span className="font-accent text-xs uppercase tracking-wider text-white/40 bg-white/10 px-3 py-1 rounded-full">
                        Past Event
                      </span>
                    )}
                  </div>

                  {/* Event info */}
                  <h3 className="font-display text-2xl text-white mb-2 group-hover:text-gold transition-colors">
                    {event.name ?? "BBG Event"}
                  </h3>
                  {event.location_name && (
                    <p className="font-body text-white/50 text-sm mb-2 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location_name}
                    </p>
                  )}
                  {event.description && (
                    <p className="font-body text-white/40 text-sm leading-relaxed mt-auto pt-4 line-clamp-2">
                      {event.description}
                    </p>
                  )}

                  <div className="mt-6">
                    <Button asChild variant="ghost" size="sm" className="px-0 text-gold hover:bg-transparent hover:text-gold/80">
                      <Link href={`/events/${event.slug}`}>
                        View Details
                        <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </Button>
                  </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 text-center sm:hidden px-6">
        <Button asChild variant="outline-gold" size="default">
          <Link href="/events">View All Events</Link>
        </Button>
      </div>
    </section>
  );
}
