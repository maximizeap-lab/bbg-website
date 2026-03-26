"use client";

import React, { useState } from "react";
import { Plus, Pencil, Trash2, LayoutGrid, List, MapPin, CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEED_EVENTS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

interface DashboardEvent {
  slug: string;
  name: string;
  description: string | null;
  event_date: string;
  location_name: string | null;
  status: "upcoming" | "past" | "cancelled";
  registered_count: number;
  capacity: number | null;
}

const EVENTS: DashboardEvent[] = [
  ...SEED_EVENTS.map((e) => ({
    slug: e.slug!,
    name: e.name!,
    description: e.description ?? null,
    event_date: e.event_date!,
    location_name: e.location_name ?? null,
    status: e.status as "upcoming" | "past" | "cancelled",
    registered_count: 42,
    capacity: 60,
  })),
  {
    slug: "spring-showcase-2026",
    name: "Spring Showcase 2026",
    description: "Annual spring showcase for top high school prospects.",
    event_date: "2026-04-15T10:00:00-07:00",
    location_name: "Blair Field",
    status: "upcoming",
    registered_count: 28,
    capacity: 50,
  },
  {
    slug: "summer-camp-week-1-2026",
    name: "Summer Camp Week 1",
    description: "Intensive week-long camp for players ages 10-14.",
    event_date: "2026-06-15T09:00:00-07:00",
    location_name: "Rancho Cienega Park",
    status: "upcoming",
    registered_count: 15,
    capacity: 40,
  },
  {
    slug: "bbg-7th-all-star-game",
    name: "BBG 7th All-Star Game",
    description: "The annual showcase of the best young talent in Southern California.",
    event_date: "2026-11-08T13:00:00-08:00",
    location_name: "Blair Field",
    status: "upcoming",
    registered_count: 8,
    capacity: 60,
  },
];

const STATUS_BADGE: Record<string, { variant: "success" | "default" | "destructive"; label: string }> = {
  upcoming: { variant: "success", label: "Upcoming" },
  past: { variant: "default", label: "Past" },
  cancelled: { variant: "destructive", label: "Cancelled" },
};

export default function EventsPage() {
  const [view, setView] = useState<"table" | "cards">("table");

  const getProgress = (registered: number, capacity: number | null) => {
    if (!capacity) return 0;
    return Math.min((registered / capacity) * 100, 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold text-white">Events</h2>
          <p className="mt-1 text-white/50">{EVENTS.length} total events</p>
        </div>
        <div className="flex gap-3">
          <div className="flex rounded-lg border border-white/10 p-0.5">
            <button
              onClick={() => setView("table")}
              className={`rounded-md p-2 transition-colors ${
                view === "table" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"
              }`}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("cards")}
              className={`rounded-md p-2 transition-colors ${
                view === "cards" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        </div>
      </div>

      {view === "table" ? (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-white/40">
                    <th className="px-6 py-4 font-medium">Event Name</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Location</th>
                    <th className="px-6 py-4 font-medium">Registered / Capacity</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {EVENTS.map((event) => {
                    const progress = getProgress(event.registered_count, event.capacity);
                    const badge = STATUS_BADGE[event.status];
                    return (
                      <tr key={event.slug} className="text-white/80 hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-medium text-white">{event.name}</td>
                        <td className="px-6 py-4 text-white/50">{formatDate(event.event_date)}</td>
                        <td className="px-6 py-4 text-white/50">{event.location_name ?? "TBD"}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="text-white/80">
                              {event.registered_count} / {event.capacity ?? "--"}
                            </span>
                            {event.capacity && (
                              <div className="h-2 w-20 overflow-hidden rounded-full bg-white/10">
                                <div
                                  className="h-full rounded-full bg-[#F5A623] transition-all"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={badge.variant}>{badge.label}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="rounded-md p-1.5 text-white/40 hover:bg-white/10 hover:text-white transition-colors">
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button className="rounded-md p-1.5 text-white/40 hover:bg-red-500/20 hover:text-red-400 transition-colors">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {EVENTS.map((event) => {
            const progress = getProgress(event.registered_count, event.capacity);
            const badge = STATUS_BADGE[event.status];
            return (
              <Card key={event.slug} className="hover:border-white/20 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base">{event.name}</CardTitle>
                    <Badge variant={badge.variant}>{badge.label}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-white/50">
                    <CalendarDays className="h-4 w-4" />
                    {formatDate(event.event_date)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/50">
                    <MapPin className="h-4 w-4" />
                    {event.location_name ?? "TBD"}
                  </div>
                  {event.capacity && (
                    <div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/50">Registrations</span>
                        <span className="text-white font-medium">
                          {event.registered_count} / {event.capacity}
                        </span>
                      </div>
                      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-[#F5A623] transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex justify-end gap-2 pt-2 border-t border-white/5">
                    <button className="rounded-md p-1.5 text-white/40 hover:bg-white/10 hover:text-white transition-colors">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button className="rounded-md p-1.5 text-white/40 hover:bg-red-500/20 hover:text-red-400 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
