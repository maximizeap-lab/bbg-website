"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heart, Shield, Users, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DONATION_AMOUNTS,
  SPONSOR_TIERS,
  EIN,
  INSTAGRAM_HANDLE,
} from "@/lib/constants";
import { donationSchema, type DonationFormData } from "@/lib/validations";
import { formatCents, getImpactCopy } from "@/lib/utils";

const RECENT_DONORS = [
  "Sarah from Los Angeles donated $50",
  "Marcus from Long Beach donated $100",
  "The Johnson Family donated $250",
  "Anonymous donated $25",
  "Coach Williams from Compton donated $50",
  "David from Inglewood donated $10/mo",
] as const;

export default function DonatePage() {
  const [donationType, setDonationType] = useState<"once" | "monthly">(
    "monthly"
  );
  const [selectedAmount, setSelectedAmount] = useState<number>(2500);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);

  const activeCents = isCustom
    ? Math.round((parseFloat(customAmount) || 0) * 100)
    : selectedAmount;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      is_recurring: true,
      is_anonymous: false,
      covered_fees: false,
      amount_cents: 2500,
    },
  });

  const coveredFees = watch("covered_fees");
  const displayTotal = coveredFees
    ? Math.round(activeCents * 1.03)
    : activeCents;

  function handleAmountSelect(cents: number) {
    setSelectedAmount(cents);
    setIsCustom(false);
    setCustomAmount("");
    setValue("amount_cents", cents);
  }

  function handleCustomAmountChange(value: string) {
    setCustomAmount(value);
    setIsCustom(true);
    const cents = Math.round((parseFloat(value) || 0) * 100);
    setValue("amount_cents", cents);
  }

  function handleDonationTypeToggle(type: "once" | "monthly") {
    setDonationType(type);
    setValue("is_recurring", type === "monthly");
  }

  async function onSubmit(data: DonationFormData) {
    const payload = {
      ...data,
      amount_cents: displayTotal,
      is_recurring: donationType === "monthly",
    };
    // TODO: Integrate Stripe checkout
    console.log("Donation submitted:", payload);
  }

  // Rotate donor ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % RECENT_DONORS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-navy">
      {/* ───────── ABOVE THE FOLD: Split Screen ───────── */}
      <section className="relative grid min-h-[90vh] lg:grid-cols-2">
        {/* Left — Emotional Appeal */}
        <div className="relative flex flex-col justify-center bg-gradient-to-br from-navy via-[#0A0A0A] to-navy px-8 py-20 lg:px-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(245,166,35,0.12),transparent_60%)]" />
          <div className="relative z-10 max-w-xl">
            <p className="mb-4 font-accent text-sm uppercase tracking-[0.25em] text-gold">
              {INSTAGRAM_HANDLE}
            </p>

            <h1 className="mb-6 font-display text-5xl leading-[1.05] text-gold md:text-6xl lg:text-7xl">
              Change A Kid&apos;s Life
              <br />
              For $10 A Month
            </h1>

            <p className="mb-8 max-w-md font-body text-lg leading-relaxed text-white/70">
              Every dollar goes directly to equipment, field time, coaching, and
              travel for kids in South LA who otherwise couldn&apos;t afford to
              play. Baseball Generations is 100% free for every player.
            </p>

            <div className="mb-10 flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-5 py-4">
              <Shield className="h-5 w-5 shrink-0 text-gold" />
              <p className="font-body text-sm text-white/60">
                501(c)(3) Tax-Deductible&nbsp;&nbsp;|&nbsp;&nbsp;EIN:&nbsp;
                <span className="font-semibold text-white">{EIN}</span>
              </p>
            </div>

            {/* Impact stat strip */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { num: "500+", label: "Players Served" },
                { num: "100%", label: "Free Programs" },
                { num: "6", label: "All-Star Games" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl text-white">
                    {stat.num}
                  </p>
                  <p className="font-body text-xs uppercase tracking-wider text-white/40">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Donation Form */}
        <div className="flex items-center justify-center bg-gradient-to-b from-[#0A0A0A] to-navy px-6 py-16 lg:px-12">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-6"
          >
            {/* Donation Type Toggle */}
            <div className="flex overflow-hidden rounded-lg border border-white/10">
              <button
                type="button"
                onClick={() => handleDonationTypeToggle("once")}
                className={`flex-1 py-3 font-accent text-sm uppercase tracking-wider transition-all ${
                  donationType === "once"
                    ? "bg-gold text-navy"
                    : "bg-white/5 text-white/60 hover:bg-white/10"
                }`}
              >
                Give Once
              </button>
              <button
                type="button"
                onClick={() => handleDonationTypeToggle("monthly")}
                className={`relative flex-1 py-3 font-accent text-sm uppercase tracking-wider transition-all ${
                  donationType === "monthly"
                    ? "bg-gold text-navy"
                    : "bg-white/5 text-white/60 hover:bg-white/10"
                }`}
              >
                Give Monthly
                <span className="absolute -top-2 right-2 rounded-full bg-gold px-2 py-0.5 font-body text-[10px] font-bold text-white">
                  Recommended
                </span>
              </button>
            </div>

            {/* Amount Selector Pills */}
            <div>
              <p className="mb-3 font-body text-sm text-white/50">
                Select amount
              </p>
              <div className="grid grid-cols-3 gap-2">
                {DONATION_AMOUNTS.map((cents) => (
                  <button
                    key={cents}
                    type="button"
                    onClick={() => handleAmountSelect(cents)}
                    className={`rounded-lg border py-3 font-accent text-lg transition-all ${
                      !isCustom && selectedAmount === cents
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-white/10 text-white/70 hover:border-white/30"
                    }`}
                  >
                    {formatCents(cents)}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setIsCustom(true)}
                  className={`rounded-lg border py-3 font-accent text-lg transition-all ${
                    isCustom
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-white/10 text-white/70 hover:border-white/30"
                  }`}
                >
                  Other
                </button>
              </div>
              {isCustom && (
                <div className="relative mt-3">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-body text-white/40">
                    $
                  </span>
                  <Input
                    type="number"
                    min="1"
                    step="0.01"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className="pl-8"
                    autoFocus
                  />
                </div>
              )}
            </div>

            {/* Dynamic Impact Copy */}
            {activeCents > 0 && (
              <div className="rounded-lg border border-gold/20 bg-gold/5 px-4 py-3">
                <p className="font-body text-sm text-gold">
                  <Star className="mr-1.5 inline-block h-4 w-4" />
                  {getImpactCopy(activeCents)}
                </p>
              </div>
            )}

            {/* Donor Info Fields */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Input
                    placeholder="First Name *"
                    {...register("first_name")}
                  />
                  {errors.first_name && (
                    <p className="mt-1 font-body text-xs text-gold">
                      {errors.first_name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    placeholder="Last Name *"
                    {...register("last_name")}
                  />
                  {errors.last_name && (
                    <p className="mt-1 font-body text-xs text-gold">
                      {errors.last_name.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email Address *"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1 font-body text-xs text-gold">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <Input
                type="tel"
                placeholder="Phone (optional)"
                {...register("phone")}
              />
              <Input
                placeholder="Donate in honor of (optional)"
                {...register("in_honor_of")}
              />
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  {...register("covered_fees")}
                  className="h-4 w-4 rounded border-white/20 bg-white/5 text-gold accent-gold"
                />
                <span className="font-body text-sm text-white/70">
                  Cover transaction fees (~3%) so 100% goes to the kids
                  {activeCents > 0 && (
                    <span className="ml-1 text-white/40">
                      (+{formatCents(Math.round(activeCents * 0.03))})
                    </span>
                  )}
                </span>
              </label>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  {...register("is_anonymous")}
                  className="h-4 w-4 rounded border-white/20 bg-white/5 text-gold accent-gold"
                />
                <span className="font-body text-sm text-white/70">
                  Make my donation anonymous
                </span>
              </label>
            </div>

            {/* Total & Submit */}
            {activeCents > 0 && (
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <p className="font-body text-sm text-white/50">
                  {donationType === "monthly" ? "Monthly total" : "Total"}
                </p>
                <p className="font-display text-2xl text-white">
                  {formatCents(displayTotal)}
                  {donationType === "monthly" && (
                    <span className="ml-1 font-body text-sm text-white/40">
                      /mo
                    </span>
                  )}
                </p>
              </div>
            )}

            <Button
              type="submit"
              size="xl"
              className="w-full"
              disabled={isSubmitting || activeCents === 0}
            >
              {isSubmitting ? "Processing..." : "Make An Impact"}
              <Heart className="ml-2 h-5 w-5" />
            </Button>

            <p className="text-center font-body text-xs text-white/30">
              Secure payment processed by Stripe&nbsp;&nbsp;|&nbsp;&nbsp;EIN:{" "}
              {EIN}
            </p>

            {errors.amount_cents && (
              <p className="text-center font-body text-xs text-gold">
                {errors.amount_cents.message}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* ───────── TRUST BUILDERS ───────── */}
      <section className="border-t border-white/5 bg-[#0A0A0A] px-6 py-20">
        <div className="mx-auto max-w-5xl">
          {/* Join count + ticker */}
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-5 py-2">
              <Users className="h-4 w-4 text-gold" />
              <span className="font-accent text-sm uppercase tracking-wider text-gold">
                Join 500+ Supporters
              </span>
            </div>
            <div className="mt-6 h-8 overflow-hidden">
              {RECENT_DONORS.map((donor, i) => (
                <p
                  key={donor}
                  className={`font-body text-sm text-white/50 transition-all duration-500 ${
                    i === tickerIndex
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{ display: i === tickerIndex ? "block" : "none" }}
                >
                  {donor}
                </p>
              ))}
            </div>
          </div>

          {/* Press logos placeholder */}
          <div className="mb-16">
            <p className="mb-6 text-center font-body text-xs uppercase tracking-[0.2em] text-white/30">
              As Featured In
            </p>
            <div className="flex flex-wrap items-center justify-center gap-10">
              {["ESPN", "MLB Network", "LA Times", "Fox Sports"].map(
                (outlet) => (
                  <div
                    key={outlet}
                    className="rounded-md bg-white/5 px-6 py-3 font-accent text-sm uppercase tracking-wider text-white/20"
                  >
                    {outlet}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Player quote */}
          <div className="mx-auto max-w-2xl rounded-xl border border-white/5 bg-white/[0.02] px-8 py-8 text-center">
            <p className="mb-4 font-body text-lg italic leading-relaxed text-white/70">
              &ldquo;BBG gave me a chance when nobody else would. Coach Ron
              believed in me before I believed in myself.&rdquo;
            </p>
            <p className="font-accent text-sm uppercase tracking-wider text-gold">
              Marcus — Full Scholarship, Kansas State
            </p>
          </div>
        </div>
      </section>

      {/* ───────── CORPORATE / SPONSOR TIERS ───────── */}
      <section className="border-t border-white/5 bg-navy px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 font-display text-4xl text-white md:text-5xl">
              Corporate Partnerships
            </h2>
            <p className="mx-auto max-w-xl font-body text-white/50">
              Align your brand with the next generation. Sponsor BBG and get
              visibility at our events, across our social channels, and on our
              website.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {SPONSOR_TIERS.map((tier, idx) => (
              <div
                key={tier.name}
                className={`relative rounded-xl border p-8 transition-all hover:-translate-y-1 ${
                  idx === 2
                    ? "border-gold/30 bg-gold/5"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                {idx === 2 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 font-accent text-xs uppercase tracking-wider text-navy">
                    Most Popular
                  </div>
                )}
                <div className="mb-4 text-3xl">{tier.emoji}</div>
                <h3 className="mb-1 font-display text-2xl text-white">
                  {tier.name}
                </h3>
                <p className="mb-6 font-accent text-xl text-gold">
                  {tier.price}
                </p>
                <ul className="space-y-2">
                  {tier.perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-start gap-2 font-body text-sm text-white/60"
                    >
                      <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={idx === 2 ? "default" : "outline-gold"}
                  className="mt-8 w-full"
                  asChild
                >
                  <a href={`mailto:Generationalbaseball@gmail.com?subject=${encodeURIComponent(tier.name + " Inquiry")}`}>
                    Become a Sponsor
                  </a>
                </Button>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center font-body text-xs text-white/30">
            Baseball Generations is a registered 501(c)(3) nonprofit
            organization.&nbsp;&nbsp;EIN: {EIN}
          </p>
        </div>
      </section>
    </div>
  );
}
