import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Clock,
  Share2,
  Twitter,
  Facebook,
  ImageIcon,
  Map,
} from "lucide-react";
import { SEED_EVENTS, SITE_NAME } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function findEvent(slug: string) {
  return SEED_EVENTS.find((e) => e.slug === slug) ?? null;
}

export function generateStaticParams() {
  return SEED_EVENTS.map((e) => ({ slug: e.slug! }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = findEvent(slug);
  if (!event) {
    return { title: `Event Not Found | ${SITE_NAME}` };
  }
  return {
    title: `${event.name ?? "Event"} | ${SITE_NAME}`,
    description: event.description ?? `${event.name ?? "Event"} — a Baseball Generations event.`,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = findEvent(slug);

  if (!event) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-navy px-6 text-center">
        <h1 className="mb-4 font-display text-5xl text-white">
          Event Not Found
        </h1>
        <p className="mb-8 font-body text-lg text-white/50">
          The event you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Button asChild>
          <Link href="/events">Back to Events</Link>
        </Button>
      </div>
    );
  }

  const eventTime = event.event_date
    ? new Date(event.event_date).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short",
      })
    : null;

  return (
    <div className="min-h-screen bg-navy">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/events/allstar-game.webp"
            alt={event.name ?? "BBG Event"}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-navy/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
        <div className="relative z-10 mx-auto max-w-5xl px-6 pb-16 pt-36">
          {/* Status badge */}
          <div
            className={`mb-6 inline-block rounded-full px-4 py-1.5 font-accent text-xs uppercase tracking-wider ${
              event.status === "upcoming"
                ? "bg-gold text-navy"
                : event.status === "past"
                  ? "bg-white/20 text-white/60"
                  : "bg-gold text-white"
            }`}
          >
            {event.status}
          </div>

          <h1 className="mb-6 font-display text-5xl text-white md:text-6xl lg:text-7xl">
            {event.name ?? "BBG Event"}
          </h1>

          {/* Quick info bar */}
          <div className="flex flex-wrap gap-6">
            {event.event_date && (
              <div className="flex items-center gap-2 font-body text-white/70">
                <Calendar className="h-5 w-5 text-gold" />
                {formatDate(event.event_date)}
              </div>
            )}
            {eventTime && (
              <div className="flex items-center gap-2 font-body text-white/70">
                <Clock className="h-5 w-5 text-gold" />
                {eventTime}
              </div>
            )}
            {event.location_name && (
              <div className="flex items-center gap-2 font-body text-white/70">
                <MapPin className="h-5 w-5 text-gold" />
                {event.location_name}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main column */}
            <div className="lg:col-span-2">
              {/* Description */}
              {event.description && (
                <div className="mb-12">
                  <h2 className="mb-4 font-display text-3xl text-white">
                    About This Event
                  </h2>
                  <p className="font-body leading-relaxed text-white/60">
                    {event.description}
                  </p>
                </div>
              )}

              {/* Google Maps Placeholder */}
              {event.location_address && (
                <div className="mb-12">
                  <h2 className="mb-4 font-display text-3xl text-white">
                    Location
                  </h2>
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
                    <div className="flex aspect-[16/9] flex-col items-center justify-center bg-gradient-to-br from-white/5 to-white/[0.02]">
                      <Map className="mb-3 h-10 w-10 text-white/20" />
                      <p className="font-body text-sm text-white/40">
                        Google Maps Integration
                      </p>
                    </div>
                    <div className="border-t border-white/10 px-6 py-4">
                      <p className="font-body text-sm font-medium text-white">
                        {event.location_name}
                      </p>
                      <p className="font-body text-sm text-white/50">
                        {event.location_address}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Photo Gallery */}
              <div className="mb-12">
                <h2 className="mb-4 font-display text-3xl text-white">
                  Photos
                </h2>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {[
                    "/images/events/allstar-01.jpg",
                    "/images/events/allstar-10.jpg",
                    "/images/events/allstar-20.jpg",
                    "/images/events/allstar-30.jpg",
                    "/images/events/allstar-40.jpg",
                    "/images/events/allstar-50.jpg",
                  ].map((src, i) => (
                    <div
                      key={i}
                      className="relative aspect-square overflow-hidden rounded-lg border border-white/5"
                    >
                      <Image
                        src={src}
                        alt={`${event.name ?? "BBG Event"} photo ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Registration CTA */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="mb-2 font-display text-2xl text-white">
                  {event.status === "upcoming"
                    ? "Register Now"
                    : "Interested in Future Events?"}
                </h3>
                <p className="mb-5 font-body text-sm text-white/50">
                  {event.status === "upcoming"
                    ? "Secure your spot at this event."
                    : "Check out our upcoming camps and events."}
                </p>
                <Button size="lg" className="w-full" asChild>
                  <Link href="/camps">
                    {event.status === "upcoming"
                      ? "Register Now"
                      : "View Camps"}
                  </Link>
                </Button>
              </div>

              {/* Event Details Card */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="mb-4 font-display text-xl text-white">
                  Event Details
                </h3>
                <dl className="space-y-4">
                  {event.event_date && (
                    <div>
                      <dt className="font-accent text-xs uppercase tracking-wider text-white/30">
                        Date
                      </dt>
                      <dd className="font-body text-sm text-white/70">
                        {formatDate(event.event_date)}
                      </dd>
                    </div>
                  )}
                  {eventTime && (
                    <div>
                      <dt className="font-accent text-xs uppercase tracking-wider text-white/30">
                        Time
                      </dt>
                      <dd className="font-body text-sm text-white/70">
                        {eventTime}
                      </dd>
                    </div>
                  )}
                  {event.location_name && (
                    <div>
                      <dt className="font-accent text-xs uppercase tracking-wider text-white/30">
                        Venue
                      </dt>
                      <dd className="font-body text-sm text-white/70">
                        {event.location_name}
                      </dd>
                    </div>
                  )}
                  {event.location_address && (
                    <div>
                      <dt className="font-accent text-xs uppercase tracking-wider text-white/30">
                        Address
                      </dt>
                      <dd className="font-body text-sm text-white/70">
                        {event.location_address}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="font-accent text-xs uppercase tracking-wider text-white/30">
                      Price
                    </dt>
                    <dd className="font-body text-sm text-white/70">
                      {event.is_free ? "Free" : "See registration"}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Social Share Placeholder */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="mb-4 font-display text-xl text-white">
                  Share This Event
                </h3>
                <div className="flex gap-3">
                  {[
                    { icon: Twitter, label: "Twitter" },
                    { icon: Facebook, label: "Facebook" },
                    { icon: Share2, label: "Copy Link" },
                  ].map(({ icon: Icon, label }) => (
                    <button
                      key={label}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/40 transition-colors hover:border-white/20 hover:bg-white/5 hover:text-white"
                      aria-label={`Share on ${label}`}
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
