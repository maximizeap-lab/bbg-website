"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Heart,
  Calendar,
  Image,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Players", href: "/dashboard/players", icon: Users },
  { label: "Registrations", href: "/dashboard/registrations", icon: ClipboardList },
  { label: "Donations", href: "/dashboard/donations", icon: Heart },
  { label: "Events", href: "/dashboard/events", icon: Calendar },
  { label: "Media", href: "/dashboard/media", icon: Image },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <nav className="flex flex-col gap-1 px-3 py-4">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setSidebarOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-[#F5A623] text-black shadow-md"
                : "text-white/60 hover:bg-white/10 hover:text-white"
            )}
          >
            <Icon className="h-5 w-5 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex h-screen bg-[#000000]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col border-r border-white/10">
        <div className="flex h-16 items-center gap-2 border-b border-white/10 px-6">
          <div className="h-8 w-8 rounded-md bg-[#F5A623] flex items-center justify-center">
            <span className="text-xs font-bold text-black">BBG</span>
          </div>
          <span className="font-display text-lg font-bold text-white">Admin</span>
        </div>
        <div className="flex-1 overflow-y-auto">{sidebarContent}</div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative z-50 flex h-full w-64 flex-col bg-[#000000] border-r border-white/10">
            <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-md bg-[#F5A623] flex items-center justify-center">
                  <span className="text-xs font-bold text-white">BBG</span>
                </div>
                <span className="font-display text-lg font-bold text-white">Admin</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-white/60 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{sidebarContent}</div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 items-center justify-between border-b border-white/10 bg-[#000000] px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-white/60 hover:text-white lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold text-white">
              BBG Admin
            </h1>
          </div>
          <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/10 hover:text-white">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
