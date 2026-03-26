"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());
  const toggleCart = useCartStore((s) => s.toggleCart);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0A1628]/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="font-bebas text-2xl tracking-wider text-[#F5F0E8] md:text-3xl">
                BASEBALL{" "}
                <span className="text-[#F5A623]">GENERATIONS</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2 font-oswald text-sm uppercase tracking-wide text-[#F5F0E8]/80 transition-colors hover:text-[#F5A623]"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden items-center gap-3 lg:flex">
              <Link href="/donate">
                <Button className="bg-[#F5A623] font-oswald text-sm uppercase tracking-wider text-[#0A1628] hover:bg-[#F5A623]/90">
                  Donate
                </Button>
              </Link>

              <button
                onClick={toggleCart}
                className="relative rounded-md p-2 text-[#F5F0E8]/80 transition-colors hover:text-[#F5A623]"
                aria-label="Open cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#C8102E] font-oswald text-[10px] font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile: Cart + Hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={toggleCart}
                className="relative rounded-md p-2 text-[#F5F0E8]/80 transition-colors hover:text-[#F5A623]"
                aria-label="Open cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#C8102E] font-oswald text-[10px] font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileOpen(true)}
                className="rounded-md p-2 text-[#F5F0E8] transition-colors hover:text-[#F5A623]"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed right-0 top-0 z-[70] flex h-full w-[300px] max-w-[85vw] flex-col bg-[#0A1628] shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#F5F0E8]/10 px-6 py-5">
          <span className="font-bebas text-xl tracking-wider text-[#F5F0E8]">
            MENU
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-md p-1 text-[#F5F0E8]/70 transition-colors hover:text-[#F5A623]"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Drawer Links */}
        <nav className="flex-1 overflow-y-auto px-6 py-6">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-3 py-3 font-oswald text-lg uppercase tracking-wide text-[#F5F0E8]/80 transition-colors hover:bg-[#F5F0E8]/5 hover:text-[#F5A623]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Drawer Footer */}
        <div className="border-t border-[#F5F0E8]/10 px-6 py-6">
          <Link href="/donate" onClick={() => setMobileOpen(false)}>
            <Button className="w-full bg-[#F5A623] font-oswald text-base uppercase tracking-wider text-[#0A1628] hover:bg-[#F5A623]/90">
              Donate
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
