"use client";

import React from "react";
import {
  Users,
  ClipboardList,
  Heart,
  Calendar,
  TrendingUp,
  TrendingDown,
  Plus,
  UserPlus,
  Download,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCents } from "@/lib/utils";

const STATS = [
  {
    label: "Total Players",
    value: "127",
    trend: "+12",
    trendUp: true,
    icon: Users,
    color: "bg-[#F5A623]",
  },
  {
    label: "Total Registrations",
    value: "384",
    trend: "+28",
    trendUp: true,
    icon: ClipboardList,
    color: "bg-[#C8102E]",
  },
  {
    label: "Total Donations (MTD)",
    value: formatCents(1247500),
    trend: "-8%",
    trendUp: false,
    icon: Heart,
    color: "bg-emerald-500",
  },
  {
    label: "Upcoming Events",
    value: "5",
    trend: "+2",
    trendUp: true,
    icon: Calendar,
    color: "bg-blue-500",
  },
];

const RECENT_REGISTRATIONS = [
  { name: "Marcus Johnson", event: "BBG 7th All-Star Game", date: "Mar 24, 2026", status: "paid" as const },
  { name: "DeAndre Williams", event: "Spring Showcase 2026", date: "Mar 23, 2026", status: "pending" as const },
  { name: "Jaylen Carter", event: "BBG 7th All-Star Game", date: "Mar 22, 2026", status: "scholarship" as const },
  { name: "Tyler Robinson", event: "Summer Camp Week 1", date: "Mar 21, 2026", status: "paid" as const },
  { name: "Chris Martinez", event: "Spring Showcase 2026", date: "Mar 20, 2026", status: "free" as const },
];

const RECENT_DONATIONS = [
  { name: "Sarah Mitchell", amount: 25000, type: "One-Time", date: "Mar 25, 2026" },
  { name: "Anonymous", amount: 10000, type: "Recurring", date: "Mar 24, 2026" },
  { name: "James Parker", amount: 5000, type: "One-Time", date: "Mar 23, 2026" },
  { name: "Nike Foundation", amount: 100000, type: "One-Time", date: "Mar 22, 2026" },
  { name: "Maria Rodriguez", amount: 2500, type: "Recurring", date: "Mar 21, 2026" },
];

const STATUS_STYLES: Record<string, string> = {
  paid: "bg-emerald-500/20 text-emerald-400",
  pending: "bg-yellow-500/20 text-yellow-400",
  scholarship: "bg-blue-500/20 text-blue-400",
  free: "bg-white/10 text-white/50",
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-3xl font-bold text-white">Dashboard</h2>
        <p className="mt-1 text-white/50">Welcome back. Here is what is happening today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`rounded-lg p-2.5 ${stat.color}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span
                    className={`flex items-center gap-1 text-xs font-medium ${
                      stat.trendUp ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {stat.trendUp ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {stat.trend}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-white/50">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tables */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Recent registrations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-white/40">
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Event</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {RECENT_REGISTRATIONS.map((reg, i) => (
                    <tr key={i} className="text-white/80">
                      <td className="py-3 font-medium text-white">{reg.name}</td>
                      <td className="py-3">{reg.event}</td>
                      <td className="py-3 text-white/50">{reg.date}</td>
                      <td className="py-3">
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLES[reg.status]}`}
                        >
                          {reg.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recent donations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-white/40">
                    <th className="pb-3 font-medium">Donor</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {RECENT_DONATIONS.map((don, i) => (
                    <tr key={i} className="text-white/80">
                      <td className="py-3 font-medium text-white">{don.name}</td>
                      <td className="py-3 text-[#F5A623] font-semibold">
                        {formatCents(don.amount)}
                      </td>
                      <td className="py-3">
                        <Badge variant={don.type === "Recurring" ? "success" : "outline"}>
                          {don.type}
                        </Badge>
                      </td>
                      <td className="py-3 text-white/50">{don.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="default" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
            <Button variant="outline" size="sm">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Player
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
