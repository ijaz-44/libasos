"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useUiStore } from "@/store/useUiStore";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD = 15000;

export default function CartDrawer() {
  const { isCartOpen, closeCart } = useUiStore();
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeCart();
    };
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      {/* Slide-Over Panel */}
      <aside className="relative z-10 w-full max-w-md bg-[var(--color-surface)] h-full shadow-[var(--shadow-popover)] border-l border-[var(--color-border)] flex flex-col">
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between bg-[var(--color-header-bg)]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[var(--color-primary)]" />
            <h3 className="text-lg tracking-wide font-[family-name:var(--font-header)] text-[var(--color-text)]">
              Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>

          <button
            type="button"
            onClick={closeCart}
            aria-label="Close Cart Drawer"
            className="p-1.5 rounded-[var(--radius-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-primary-soft)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Strip */}
        <div className="px-6 py-3 bg-[var(--color-primary-soft)] border-b border-[var(--color-border)]">
          <p className="text-xs font-medium text-[var(--color-text)] font-[family-name:var(--font-ui)] mb-1.5">
            {remainingForFreeShipping === 0
              ? "Unlocked Complimentary Express Delivery"
              : `Add ${formatCurrency(remainingForFreeShipping)} more for Complimentary Delivery`}
          </p>
          <div className="w-full h-1.5 bg-white/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-primary)] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[var(--color-border)]">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <ShoppingBag className="w-12 h-12 text-[var(--color-border-strong)] mb-3" />
              <p className="text-base font-semibold text-[var(--color-text)] font-[family-name:var(--font-ui)]">
                Your bag is currently empty
              </p>
              <p className="text-sm text-[var(--color-text-muted)] mt-1 mb-6 max-w-xs font-[family-name:var(--font-content)]">
                Explore curated silhouettes, festive edits, and statement pieces from partner labels.
              </p>
              <Link href="/shop" onClick={closeCart}>
                <Button variant="primary" size="md">
                  Explore Storefront
                </Button>
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.key} className="py-4 flex gap-4">
                <div className="w-20 h-24 rounded-[var(--radius-sm)] bg-[var(--color-surface-muted)] border border-[var(--color-border)] overflow-hidden shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] font-semibold font-[family-name:var(--font-ui)]">
                        {item.brand}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeItem(item.key)}
                        aria-label={`Remove ${item.title}`}
                        className="text-[var(--color-text-muted)] hover:text-[var(--color-danger)] transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <Link
                      href={`/product/${item.slug || item.id}`}
                      onClick={closeCart}
                      className="text-sm font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] line-clamp-1 font-[family-name:var(--font-ui)]"
                    >
                      {item.title}
                    </Link>

                    {item.variant && (
                      <p className="text-xs text-[var(--color-text-muted)] mt-0.5 font-[family-name:var(--font-content)]">
                        Option: {item.variant}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="inline-flex items-center border border-[var(--color-border)] rounded-[var(--radius-sm)]">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.key, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="p-1.5 text-[var(--color-text)] hover:bg-[var(--color-surface-muted)] cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-semibold font-[family-name:var(--font-ui)]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.key, item.quantity + 1)}
                        aria-label="Increase quantity"
                        className="p-1.5 text-[var(--color-text)] hover:bg-[var(--color-surface-muted)] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-sm font-bold text-[var(--color-text)] font-[family-name:var(--font-ui)]">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[var(--color-border)] bg-[var(--color-surface-muted)] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-text-muted)] font-[family-name:var(--font-content)]">
                Subtotal (excl. shipping)
              </span>
              <span className="text-lg font-bold text-[var(--color-text)] font-[family-name:var(--font-ui)]">
                {formatCurrency(subtotal)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link href="/cart" onClick={closeCart} className="w-full">
                <Button variant="outline" size="md" className="w-full">
                  View Bag
                </Button>
              </Link>
              <Link href="/checkout" onClick={closeCart} className="w-full">
                <Button variant="primary" size="md" className="w-full gap-1.5">
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <button
              type="button"
              onClick={clearCart}
              className="w-full text-center text-xs text-[var(--color-text-muted)] hover:text-[var(--color-danger)] underline cursor-pointer font-[family-name:var(--font-ui)]"
            >
              Clear Shopping Bag
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}