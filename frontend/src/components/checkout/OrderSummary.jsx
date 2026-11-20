"use client";

import React from "react";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export default function OrderSummary({ items, subtotal, shippingFee, grandTotal, isSubmitting }) {
  return (
    <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--color-surface-muted)] border border-[var(--color-border)] h-fit space-y-4 font-[family-name:var(--font-ui)]">
      <h3 className="text-lg font-bold font-[family-name:var(--font-header)] border-b border-[var(--color-border)] pb-3 text-[var(--color-text)]">
        Order Summary ({items.reduce((acc, i) => acc + i.quantity, 0)} items)
      </h3>

      <div className="divide-y divide-[var(--color-border)] max-h-60 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.key} className="py-2.5 flex items-center justify-between text-sm">
            <div className="pr-2">
              <p className="font-semibold text-[var(--color-text)] line-clamp-1">
                {item.title}
              </p>
              <p className="text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-content)]">
                Qty: {item.quantity} {item.variant ? `(${item.variant})` : ""}
              </p>
            </div>
            <span className="font-bold text-[var(--color-text)] shrink-0">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-[var(--color-border)] pt-4 space-y-2 text-sm">
        <div className="flex justify-between text-[var(--color-text-muted)]">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-[var(--color-text-muted)]">
          <span>Delivery Fee</span>
          <span>{shippingFee === 0 ? "FREE" : formatCurrency(shippingFee)}</span>
        </div>
        <div className="flex justify-between text-base font-bold text-[var(--color-text)] pt-2 border-t border-[var(--color-border)]">
          <span>Grand Total</span>
          <span className="text-[var(--color-primary)]">{formatCurrency(grandTotal)}</span>
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full mt-4"
        isLoading={isSubmitting}
      >
        Confirm & Place Order
      </Button>
    </div>
  );
}