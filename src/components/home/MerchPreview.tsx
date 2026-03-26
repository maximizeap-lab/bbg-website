"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SHOP_PRODUCTS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(0)}`;
}

export default function MerchPreview() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-accent text-bbg-red text-sm uppercase tracking-[0.3em] mb-3">
            Official Gear
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-navy">
            REP THE MOVEMENT
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {SHOP_PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/shop/${product.id}`} className="group block">
                {/* Product image placeholder */}
                <div className="aspect-square rounded-lg bg-gradient-to-br from-navy/10 via-navy/5 to-bbg-red/5 mb-4 overflow-hidden relative border border-navy/10">
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-navy/20 group-hover:text-navy/30 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  {/* Variant badge */}
                  <span className="absolute top-3 left-3 font-accent text-[10px] uppercase tracking-wider bg-white/90 text-navy px-2.5 py-1 rounded-full">
                    {product.variant}
                  </span>
                </div>

                {/* Product info */}
                <h3 className="font-body text-navy font-semibold text-sm md:text-base leading-snug group-hover:text-bbg-red transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <p className="font-accent text-navy/60 text-base mt-1">
                  {formatPrice(product.price_cents)}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Button asChild variant="navy" size="lg">
            <Link href="/shop">Shop All</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
