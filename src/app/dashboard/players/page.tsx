"use client";

import React, { useState } from "react";
import { Search, Plus, Download, Pencil, Trash2, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { POSITIONS } from "@/lib/constants";

interface SamplePlayer {
  id: string;
  name: string;
  position: string;
  year: number;
  school: string;
  status: "active" | "committed" | "pro" | "alumni";
}

const SAMPLE_PLAYERS: SamplePlayer[] = [
  { id: "1", name: "Marcus Johnson", position: "SS", year: 2026, school: "Serra High School", status: "active" },
  { id: "2", name: "DeAndre Williams", position: "CF", year: 2025, school: "Crenshaw High School", status: "committed" },
  { id: "3", name: "Jaylen Carter", position: "P", year: 2024, school: "Kansas State", status: "pro" },
  { id: "4", name: "Tyler Robinson", position: "C", year: 2027, school: "Loyola High School", status: "active" },
  { id: "5", name: "Chris Martinez", position: "3B", year: 2025, school: "Long Beach Poly", status: "active" },
  { id: "6", name: "Jordan Davis", position: "RF", year: 2023, school: "UC Riverside", status: "alumni" },
];

const STATUS_STYLES: Record<string, string> = {
  active: "bg-emerald-500/20 text-emerald-400",
  committed: "bg-blue-500/20 text-blue-400",
  pro: "bg-[#F5A623]/20 text-[#F5A623]",
  alumni: "bg-white/10 text-white/50",
};

export default function PlayersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [positionFilter, setPositionFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<SamplePlayer | null>(null);

  const filtered = SAMPLE_PLAYERS.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    const matchesPosition = positionFilter === "all" || p.position === positionFilter;
    return matchesSearch && matchesStatus && matchesPosition;
  });

  const openAdd = () => {
    setEditingPlayer(null);
    setModalOpen(true);
  };

  const openEdit = (player: SamplePlayer) => {
    setEditingPlayer(player);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold text-white">Players</h2>
          <p className="mt-1 text-white/50">{SAMPLE_PLAYERS.length} total players</p>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button size="sm" onClick={openAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add Player
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <Input
                placeholder="Search players..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-11 rounded-md border border-white/20 bg-white/5 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="committed">Committed</option>
              <option value="pro">Pro</option>
              <option value="alumni">Alumni</option>
            </select>
            <select
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
              className="h-11 rounded-md border border-white/20 bg-white/5 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
            >
              <option value="all">All Positions</option>
              {POSITIONS.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
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
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Position</th>
                  <th className="px-6 py-4 font-medium">Year</th>
                  <th className="px-6 py-4 font-medium">School</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((player) => (
                  <tr key={player.id} className="text-white/80 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{player.name}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline">{player.position}</Badge>
                    </td>
                    <td className="px-6 py-4">{player.year}</td>
                    <td className="px-6 py-4">{player.school}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLES[player.status]}`}
                      >
                        {player.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(player)}
                          className="rounded-md p-1.5 text-white/40 hover:bg-white/10 hover:text-white transition-colors"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button className="rounded-md p-1.5 text-white/40 hover:bg-red-500/20 hover:text-red-400 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-white/40">
                      No players found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-xl border border-white/10 bg-[#000000] p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl font-bold text-white">
                {editingPlayer ? "Edit Player" : "Add Player"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-md p-1 text-white/40 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-white/60">Name</label>
                <Input placeholder="Player name" defaultValue={editingPlayer?.name ?? ""} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/60">Position</label>
                  <select
                    defaultValue={editingPlayer?.position ?? ""}
                    className="h-11 w-full rounded-md border border-white/20 bg-white/5 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                  >
                    <option value="">Select</option>
                    {POSITIONS.map((pos) => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/60">Grad Year</label>
                  <Input
                    type="number"
                    placeholder="2026"
                    defaultValue={editingPlayer?.year ?? ""}
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-white/60">School</label>
                <Input placeholder="School name" defaultValue={editingPlayer?.school ?? ""} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-white/60">Status</label>
                <select
                  defaultValue={editingPlayer?.status ?? "active"}
                  className="h-11 w-full rounded-md border border-white/20 bg-white/5 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                >
                  <option value="active">Active</option>
                  <option value="committed">Committed</option>
                  <option value="pro">Pro</option>
                  <option value="alumni">Alumni</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={() => setModalOpen(false)}>
                {editingPlayer ? "Save Changes" : "Add Player"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
