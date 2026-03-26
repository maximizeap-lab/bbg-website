"use client";

import { useEffect } from "react";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { formatCents } from "@/lib/utils";

export default function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, totalCents } =
    useCartStore();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) toggleCart();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, toggleCart]);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={toggleCart}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-navy shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-gold" />
            <h2 className="font-display text-2xl text-white">Your Cart</h2>
            {items.length > 0 && (
              <span className="rounded-full bg-gold px-2.5 py-0.5 font-accent text-xs text-navy">
                {items.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={toggleCart}
            className="rounded-lg p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart contents */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <ShoppingBag className="mb-4 h-12 w-12 text-white/15" />
              <p className="mb-2 font-display text-xl text-white/50">
                Your cart is empty
              </p>
              <p className="font-body text-sm text-white/30">
                Rep the movement — add some gear.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-white/5 px-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-5">
                  {/* Product image placeholder */}
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-white/10 to-white/5">
                    <div className="flex h-full w-full items-center justify-center font-accent text-[10px] uppercase tracking-wider text-white/30">
                      BBG
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="font-body text-sm font-medium text-white">
                        {item.name}
                      </p>
                      {item.variant && (
                        <p className="font-body text-xs text-white/40">
                          {item.variant}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      {/* Quantity controls */}
                      <div className="flex items-center overflow-hidden rounded-md border border-white/10">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2 py-1 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-[2rem] px-1 text-center font-body text-sm text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 py-1 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-white/30 transition-colors hover:text-gold"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <p className="shrink-0 font-accent text-sm text-white">
                    {formatCents(item.price_cents * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/10 px-6 py-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-body text-sm text-white/50">Subtotal</p>
              <p className="font-display text-2xl text-white">
                {formatCents(totalCents())}
              </p>
            </div>
            <Button size="lg" className="w-full">
              Checkout
            </Button>
            <button
              onClick={toggleCart}
              className="mt-3 w-full py-2 text-center font-body text-sm text-white/40 transition-colors hover:text-white/70"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
