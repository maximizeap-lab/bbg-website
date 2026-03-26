import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCents(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateShort(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function getImpactCopy(amountCents: number): string {
  if (amountCents <= 1000) return "Covers the cost of one player's equipment for a month";
  if (amountCents <= 2500) return "Sponsors a kid's camp day";
  if (amountCents <= 5000) return "Helps fund travel to a regional showcase";
  if (amountCents <= 10000) return "Subsidizes one full scholarship registration";
  return "Funds an entire team's practice session";
}
