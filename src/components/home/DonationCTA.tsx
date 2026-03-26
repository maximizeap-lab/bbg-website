"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const AMOUNTS = [10, 25, 50] as const;

export default function DonationCTA() {
  const [selected, setSelected] = useState<number | "custom">(25);
  const [customValue, setCustomValue] = useState("");

  const donationAmount = selected === "custom" ? customValue : String(selected);

  return (
    <section className="bg-black py-20 md:py-28 relative overflow-hidden border-y border-gold/20">
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[0.95] mb-6">
            NO KID SHOULD HAVE TO TAPE
            <br />
            PENNIES TO A BAT TO GET BETTER.
          </h2>

          <p className="font-body text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Our founders grew up in South LA. They know what it&apos;s like to dream big with
            nothing. Your donation puts real gear, real coaching, and real opportunity in the
            hands of kids who deserve a shot.
          </p>

          {/* Monthly donation pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {AMOUNTS.map((amount) => (
              <button
                key={amount}
                onClick={() => setSelected(amount)}
                className={`font-accent text-lg uppercase tracking-wider px-8 py-3 rounded-full border-2 transition-all duration-200 ${
                  selected === amount
                    ? "bg-white text-gold border-white shadow-lg scale-105"
                    : "bg-transparent text-white border-white/40 hover:border-white hover:bg-white/10"
                }`}
              >
                ${amount}/mo
              </button>
            ))}
            <button
              onClick={() => setSelected("custom")}
              className={`font-accent text-lg uppercase tracking-wider px-8 py-3 rounded-full border-2 transition-all duration-200 ${
                selected === "custom"
                  ? "bg-white text-gold border-white shadow-lg scale-105"
                  : "bg-transparent text-white border-white/40 hover:border-white hover:bg-white/10"
              }`}
            >
              Custom
            </button>
          </div>

          {/* Custom amount input */}
          {selected === "custom" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-8"
            >
              <div className="inline-flex items-center bg-white/10 border-2 border-white/30 rounded-full px-6 py-3">
                <span className="font-accent text-white text-xl mr-1">$</span>
                <input
                  type="number"
                  min="1"
                  placeholder="Enter amount"
                  value={customValue}
                  onChange={(e) => setCustomValue(e.target.value)}
                  className="bg-transparent text-white font-accent text-xl w-32 outline-none placeholder:text-white/40"
                />
                <span className="font-accent text-white/60 text-lg ml-1">/mo</span>
              </div>
            </motion.div>
          )}

          <Button asChild size="xl" variant="default">
            <Link href={`/donate${donationAmount ? `?amount=${donationAmount}` : ""}`}>
              GIVE NOW
            </Link>
          </Button>

          <p className="mt-6 font-body text-white/50 text-sm">
            Baseball Generations is a 501(c)(3) nonprofit. EIN: 85-3342897.
            <br />
            All donations are tax-deductible.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
