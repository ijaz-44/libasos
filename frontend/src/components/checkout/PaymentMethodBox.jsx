"use client";

import React from "react";
import { Banknote, CreditCard, Wallet, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const PAYMENT_OPTIONS = [
  {
    id: "cod",
    title: "Cash on Delivery",
    description: "Pay with cash upon doorstep package delivery",
    icon: Banknote,
  },
  {
    id: "card",
    title: "Credit / Debit Card",
    description: "Secure online payment via Visa, Mastercard, or UnionPay",
    icon: CreditCard,
  },
  {
    id: "wallet",
    title: "Mobile Wallet (JazzCash / EasyPaisa)",
    description: "Instant checkout transfer using registered mobile account",
    icon: Wallet,
  },
];

export default function PaymentMethodBox({ value, onChange, error }) {
  return (
    <div className="space-y-3 font-[family-name:var(--font-ui)]">
      <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text)]">
        Select Payment Method
      </label>

      <div className="grid grid-cols-1 gap-3">
        {PAYMENT_OPTIONS.map((method) => {
          const IconComponent = method.icon;
          const isSelected = value === method.id;

          return (
            <div
              key={method.id}
              onClick={() => onChange(method.id)}
              className={cn(
                "p-4 rounded-[var(--radius-md)] border transition-all duration-200 cursor-pointer flex items-center justify-between",
                isSelected
                  ? "border-[var(--color-primary)] bg-[var(--color-primary-soft)] shadow-xs"
                  : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)]"
              )}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={cn(
                    "p-2.5 rounded-full transition-colors",
                    isSelected
                      ? "bg-[var(--color-primary)] text-white"
                      : "bg-[var(--color-surface-muted)] text-[var(--color-text-muted)]"
                  )}
                >
                  <IconComponent className="w-5 h-5" />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[var(--color-text)]">
                    {method.title}
                  </h4>
                  <p className="text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-content)]">
                    {method.description}
                  </p>
                </div>
              </div>

              {isSelected && (
                <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)] shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      {error && (
        <p className="text-xs text-[var(--color-danger)] font-[family-name:var(--font-content)]">
          {error}
        </p>
      )}
    </div>
  );
}