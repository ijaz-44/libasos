import React from "react";
import { Badge } from "@/components/ui/Badge";

export const metadata = {
  title: "Terms & Policies — ZAYRA Storefront",
  description: "Shipping timelines, exchange window, and account security terms.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8 font-[family-name:var(--font-content)]">
      <div className="space-y-3 border-b border-[var(--color-border)] pb-6">
        <Badge variant="secondary">Policies & Terms</Badge>
        <h1 className="text-3xl font-bold font-[family-name:var(--font-header)] text-[var(--color-text)]">
          Terms, Shipping & Exchange Guidelines
        </h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          Clear terms covering order processing, delivery, exchanges, and account sessions.
        </p>
      </div>

      <section className="space-y-2">
        <h2 className="text-xl font-bold font-[family-name:var(--font-header)] text-[var(--color-text)]">
          1. Shipping & Delivery
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
          Orders over PKR 15,000 qualify for complimentary standard delivery. Dispatch timelines vary by brand and item availability, with tracking updates provided upon shipment.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-bold font-[family-name:var(--font-header)] text-[var(--color-text)]">
          2. Size & Item Exchanges
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
          Eligible unworn items with original tags intact may be requested for size or item exchange within 7 days of delivery, subject to stock availability.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-bold font-[family-name:var(--font-header)] text-[var(--color-text)]">
          3. Account Sessions & Security
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
          Authenticated sessions use short-lived access tokens paired with cookie-backed refresh rotation and OAuth provider verification when connected to the backend auth service.
        </p>
      </section>
    </div>
  );
}