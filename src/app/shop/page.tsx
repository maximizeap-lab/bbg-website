"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { SHOP_PRODUCTS } from "@/lib/constants";
import { formatCents } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function ShopPage() {
  const { addItem, toggleCart, totalItems } = useCartStore();

  function handleAddToCart(product: (typeof SHOP_PRODUCTS)[number]) {
    addItem({
      id: product.id,
      name: product.name,
      price_cents: product.price_cents,
      image_url: product.image_url,
      variant: product.variant,
    });
    toggleCart();
  }

  return (
    <div className="min-h-screen bg-navy">
      {/* Floating Cart Button */}
      <button
        onClick={toggleCart}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-gold px-5 py-3 font-accent text-sm uppercase tracking-wider text-navy shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
        aria-label="Open cart"
      >
        <ShoppingBag className="h-5 w-5" />
        {totalItems() > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-navy text-xs text-white">
            {totalItems()}
          </span>
        )}
      </button>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-12 pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(245,166,35,0.08),transparent_50%)]" />
        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <h1 className="mb-3 font-display text-6xl text-white md:text-7xl lg:text-8xl">
            Rep The Movement
          </h1>
          <p className="mx-auto max-w-md font-body text-lg text-white/50">
            BBG x Baseballism — Official Collab
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {SHOP_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-xl bg-white transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Product image placeholder */}
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-cream to-white">
                <div className="flex h-full w-full items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <div className="text-center">
                    <p className="font-display text-4xl text-navy/10">BBG</p>
                    <p className="font-accent text-[10px] uppercase tracking-[0.2em] text-navy/20">
                      {product.variant}
                    </p>
                  </div>
                </div>
              </div>

              {/* Product info */}
              <div className="p-4">
                <h3 className="mb-1 font-body text-sm font-medium text-navy">
                  {product.name}
                </h3>
                <p className="mb-4 font-accent text-lg text-navy">
                  {formatCents(product.price_cents)}
                </p>
                <Button
                  variant="navy"
                  size="sm"
                  className="w-full"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
