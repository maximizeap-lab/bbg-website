"use client";

import React, { useState } from "react";
import { Download, CheckCircle2, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SampleRegistration {
  id: string;
  playerName: string;
  event: string;
  email: string;
  paymentStatus: "paid" | "pending" | "scholarship" | "free";
  date: string;
  checkedIn: boolean;
}

const SAMPLE_REGISTRATIONS: SampleRegistration[] = [
  { id: "1", playerName: "Marcus Johnson", event: "BBG 7th All-Star Game", email: "marcus.j@email.com", paymentStatus: "paid", date: "2026-03-24", checkedIn: true },
  { id: "2", playerName: "DeAndre Williams", event: "Spring Showcase 2026", email: "deandre.w@email.com", paymentStatus: "pending", date: "2026-03-23", checkedIn: false },
  { id: "3", playerName: "Jaylen Carter", event: "BBG 7th All-Star Game", email: "jaylen.c@email.com", paymentStatus: "scholarship", date: "2026-03-22", checkedIn: false },
  { id: "4", playerName: "Tyler Robinson", event: "Summer Camp Week 1", email: "tyler.r@email.com", paymentStatus: "paid", date: "2026-03-21", checkedIn: true },
  { id: "5", playerName: "Chris Martinez", event: "Spring Showcase 2026", email: "chris.m@email.com", paymentStatus: "free", date: "2026-03-20", checkedIn: false },
  { id: "6", playerName: "Jordan Davis", event: "BBG 7th All-Star Game", email: "jordan.d@email.com", paymentStatus: "paid", date: "2026-03-19", checkedIn: true },
  { id: "7", playerName: "Andre Thomas", event: "Summer Camp Week 1", email: "andre.t@email.com", paymentStatus: "pending", date: "2026-03-18", checkedIn: false },
  { id: "8", playerName: "Isaiah Brown", event: "Spring Showcase 2026", email: "isaiah.b@email.com", paymentStatus: "scholarship", date: "2026-03-17", checkedIn: false },
];

const EVENTS = ["All Events", "BBG 7th All-Star Game", "Spring Showcase 2026", "Summer Camp Week 1"];

const STATUS_STYLES: Record<string, string> = {
  paid: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  scholarship: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  free: "bg-white/10 text-white/50 border-white/20",
};

export default function RegistrationsPage() {
  const [eventFilter, setEventFilter] = useState("All Events");
  const [checkins, setCheckins] = useState<Record<string, boolean>>(
    Object.fromEntries(SAMPLE_REGISTRATIONS.map((r) => [r.id, r.checkedIn]))
  );

  const toggleCheckin = (id: string) => {
    setCheckins((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filtered = SAMPLE_REGISTRATIONS.filter(
    (r) => eventFilter === "All Events" || r.event === eventFilter
  );

  const statusCounts = SAMPLE_REGISTRATIONS.reduce(
    (acc, r) => {
      acc[r.paymentStatus] = (acc[r.paymentStatus] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold text-white">Registrations</h2>
          <p className="mt-1 text-white/50">{SAMPLE_REGISTRATIONS.length} total registrations</p>
        </div>
        <Button variant="ghost" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Status summary pills */}
      <div className="flex flex-wrap gap-3">
        {(["paid", "pending", "scholarship", "free"] as const).map((status) => (
          <div
            key={status}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium ${STATUS_STYLES[status]}`}
          >
            <span className="capitalize">{status}</span>
            <span className="font-bold">{statusCounts[status] || 0}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className="h-11 rounded-md border border-white/20 bg-white/5 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
            >
              {EVENTS.map((ev) => (
                <option key={ev} value={ev}>
                  {ev}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-white/40">
                  <th className="px-6 py-4 font-medium">Check-in</th>
                  <th className="px-6 py-4 font-medium">Player Name</th>
                  <th className="px-6 py-4 font-medium">Event</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Payment Status</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((reg) => (
                  <tr key={reg.id} className="text-white/80 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleCheckin(reg.id)}
                        className="transition-colors"
                      >
                        {checkins[reg.id] ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        ) : (
                          <Circle className="h-5 w-5 text-white/20 hover:text-white/40" />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 font-medium text-white">{reg.playerName}</td>
                    <td className="px-6 py-4">{reg.event}</td>
                    <td className="px-6 py-4 text-white/50">{reg.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLES[reg.paymentStatus]}`}
                      >
                        {reg.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white/50">
                      {new Date(reg.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-white/40">
                      No registrations found for this event.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
