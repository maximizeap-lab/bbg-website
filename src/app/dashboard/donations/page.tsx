"use client";

import React, { useState } from "react";
import { DollarSign, TrendingUp, Repeat, Zap, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCents } from "@/lib/utils";

const SUMMARY = [
  { label: "Total Donated", value: 4875000, icon: DollarSign, color: "bg-emerald-500" },
  { label: "Monthly Recurring", value: 875000, icon: Repeat, color: "bg-blue-500" },
  { label: "One-Time", value: 4000000, icon: Zap, color: "bg-[#F5A623]" },
  { label: "Average Donation", value: 8125, icon: TrendingUp, color: "bg-[#C8102E]" },
];

interface SampleDonation {
  id: string;
  name: string;
  email: string;
  amount: number;
  type: "one-time" | "recurring";
  date: string;
  status: "succeeded" | "pending" | "failed";
}

const SAMPLE_DONATIONS: SampleDonation[] = [
  { id: "1", name: "Sarah Mitchell", email: "sarah@email.com", amount: 25000, type: "one-time", date: "2026-03-25", status: "succeeded" },
  { id: "2", name: "Anonymous", email: "anon@email.com", amount: 10000, type: "recurring", date: "2026-03-24", status: "succeeded" },
  { id: "3", name: "James Parker", email: "james@email.com", amount: 5000, type: "one-time", date: "2026-03-23", status: "succeeded" },
  { id: "4", name: "Nike Foundation", email: "giving@nike.com", amount: 100000, type: "one-time", date: "2026-03-22", status: "succeeded" },
  { id: "5", name: "Maria Rodriguez", email: "maria@email.com", amount: 2500, type: "recurring", date: "2026-03-21", status: "pending" },
  { id: "6", name: "Robert Chen", email: "robert.c@email.com", amount: 5000, type: "one-time", date: "2026-03-20", status: "failed" },
];

const STATUS_STYLES: Record<string, string> = {
  succeeded: "bg-emerald-500/20 text-emerald-400",
  pending: "bg-yellow-500/20 text-yellow-400",
  failed: "bg-red-500/20 text-red-400",
};

export default function DonationsPage() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const filtered = SAMPLE_DONATIONS.filter((d) => {
    const matchesType = typeFilter === "all" || d.type === typeFilter;
    const matchesFrom = !dateFrom || d.date >= dateFrom;
    const matchesTo = !dateTo || d.date <= dateTo;
    return matchesType && matchesFrom && matchesTo;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold text-white">Donations</h2>
          <p className="mt-1 text-white/50">Manage and track all donations</p>
        </div>
        <Button variant="ghost" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {SUMMARY.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg p-2.5 ${stat.color}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{formatCents(stat.value)}</p>
                    <p className="text-sm text-white/50">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-11 rounded-md border border-white/20 bg-white/5 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
            >
              <option value="all">All Types</option>
              <option value="one-time">One-Time</option>
              <option value="recurring">Recurring</option>
            </select>
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/40">From</span>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="h-11 rounded-md border border-white/20 bg-white/5 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
              />
              <span className="text-sm text-white/40">To</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="h-11 rounded-md border border-white/20 bg-white/5 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
              />
            </div>
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
                  <th className="px-6 py-4 font-medium">Donor Name</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((donation) => (
                  <tr key={donation.id} className="text-white/80 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{donation.name}</td>
                    <td className="px-6 py-4 text-white/50">{donation.email}</td>
                    <td className="px-6 py-4 font-semibold text-[#F5A623]">
                      {formatCents(donation.amount)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={donation.type === "recurring" ? "success" : "outline"}>
                        {donation.type}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-white/50">
                      {new Date(donation.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLES[donation.status]}`}
                      >
                        {donation.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-white/40">
                      No donations found matching your filters.
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
