"use client";

import React from "react";
import Link from "next/link";
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD = 15000;

export default function CartPage() {
  const { items, totalItems, subtotal, isEmpty, updateQuantity, removeItem, clearCart } =
    useCart();

  const shippingFee = isEmpty || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 500;
  const grandTotal = subtotal + shippingFee;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  if (isEmpty) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-5">
        <div className="w-14 h-14 mx-auto rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)] flex items-center justify-center">
          <ShoppingBag className="w-7 h-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-header)] text-[var(--color-text)]">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] max-w-md mx-auto font-[family-name:var(--font-content)]">
          Explore curated silhouettes, ready-to-wear sets, and festive edits from partner labels.
        </p>
        <div className="pt-2">
          <Link href="/shop">
            <Button variant="primary" size="lg" className="gap-2">
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-border)] pb-5">
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-header)] text-[var(--color-text)]">
            Shopping Bag ({totalItems})
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1 font-[family-name:var(--font-content)]">
            {remainingForFreeShipping === 0
              ? "Complimentary express delivery unlocked on your order."
              : `Add ${formatCurrency(remainingForFreeShipping)} more to unlock complimentary express delivery.`}
          </p>
        </div>

        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)] hover:underline font-[family-name:var(--font-ui)]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Browsing</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Bag Line Items */}
        <div className="lg:col-span-2 divide-y divide-[var(--color-border)] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] px-6">
          {items.map((item) => (
            <div key={item.key} className="py-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
              <div className="flex gap-4 items-center min-w-0">
                <div className="w-20 h-24 rounded-[var(--radius-sm)] bg-[var(--color-surface-muted)] border border-[var(--color-border)] overflow-hidden shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="min-w-0 space-y-1">
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-[var(--color-text-muted)] font-[family-name:var(--font-ui)]">
                    {item.brand}
                  </p>
                  <Link
                    href={`/product/${item.slug || item.id}`}
                    className="block text-sm sm:text-base font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] truncate font-[family-name:var(--font-ui)]"
                  >
                    {item.title}
                  </Link>
                  {item.variant && (
                    <p className="text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-content)]">
                      Size / Variant: {item.variant}
                    </p>
                  )}
                  <p className="text-xs font-semibold text-[var(--color-text-muted)] font-[family-name:var(--font-ui)]">
                    Unit Price: {formatCurrency(item.price)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto">
                <div className="inline-flex items-center border border-[var(--color-border)] rounded-[var(--radius-sm)] font-[family-name:var(--font-ui)]">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.key, item.quantity - 1)}
                    aria-label="Decrease quantity"
                    className="p-2 text-[var(--color-text)] hover:bg-[var(--color-surface-muted)] cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.key, item.quantity + 1)}
                    aria-label="Increase quantity"
                    className="p-2 text-[var(--color-text)] hover:bg-[var(--color-surface-muted)] cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <span className="text-sm font-bold text-[var(--color-text)] min-w-[84px] text-right font-[family-name:var(--font-ui)]">
                  {formatCurrency(item.price * item.quantity)}
                </span>

                <button
                  type="button"
                  onClick={() => removeItem(item.key)}
                  aria-label={`Remove ${item.title}`}
                  className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-danger)] transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--color-surface-muted)] border border-[var(--color-border)] h-fit space-y-4 font-[family-name:var(--font-ui)]">
          <h2 className="text-lg font-bold font-[family-name:var(--font-header)] border-b border-[var(--color-border)] pb-3">
            Bag Summary
          </h2>

          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between text-[var(--color-text-muted)]">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-[var(--color-text-muted)]">
              <span>Estimated Delivery</span>
              <span>{shippingFee === 0 ? "FREE" : formatCurrency(shippingFee)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-[var(--color-text)] pt-3 border-t border-[var(--color-border)]">
              <span>Total</span>
              <span className="text-[var(--color-primary)]">{formatCurrency(grandTotal)}</span>
            </div>
          </div>

          <Link href="/checkout" className="block pt-2">
            <Button variant="primary" size="lg" className="w-full gap-2">
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <button
            type="button"
            onClick={clearCart}
            className="w-full text-center text-xs text-[var(--color-text-muted)] hover:text-[var(--color-danger)] underline cursor-pointer pt-1"
          >
            Clear Entire Bag
          </button>
        </div>
      </div>
    </div>
  );
}