import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const metadata = {
  title: "About Us — ZAYRA Editorial Storefront",
  description: "Our story, multi-brand curation standard, and AI-assisted discovery.",
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      <div className="space-y-4 border-b border-[var(--color-border)] pb-8">
        <Badge variant="primary">Editorial & Curation</Badge>
        <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-header)] text-[var(--color-text)]">
          Connecting Contemporary Labels With Everyday Discovery
        </h1>
        <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed max-w-3xl font-[family-name:var(--font-content)]">
          ZAYRA brings together emerging studios, heritage textile houses, and seasonal capsule drops under one streamlined discovery experience—combining clean editorial presentation with AI-assisted styling guidance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] space-y-2">
          <h2 className="text-lg font-bold font-[family-name:var(--font-header)]">Verified Labels</h2>
          <p className="text-sm text-[var(--color-text-muted)] font-[family-name:var(--font-content)]">
            Every collection is curated for fabric quality, finishing consistency, and transparent sizing.
          </p>
        </div>

        <div className="p-6 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] space-y-2">
          <h2 className="text-lg font-bold font-[family-name:var(--font-header)]">Guided Styling</h2>
          <p className="text-sm text-[var(--color-text-muted)] font-[family-name:var(--font-content)]">
            Describe an occasion, color palette, or budget to surface relevant silhouettes faster.
          </p>
        </div>

        <div className="p-6 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] space-y-2">
          <h2 className="text-lg font-bold font-[family-name:var(--font-header)]">Flexible Checkout</h2>
          <p className="text-sm text-[var(--color-text-muted)] font-[family-name:var(--font-content)]">
            Multiple payment options including cash on delivery, cards, and mobile wallets.
          </p>
        </div>
      </div>

      <div className="p-8 rounded-[var(--radius-lg)] bg-[var(--color-header-bg)] border border-[var(--color-header-line)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold font-[family-name:var(--font-header)] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[var(--color-primary)]" />
            <span>Ready to explore the latest edits?</span>
          </h3>
          <p className="text-sm text-[var(--color-text-muted)] font-[family-name:var(--font-content)]">
            Browse unstitched suits, ready-to-wear sets, and festive formals.
          </p>
        </div>

        <Link href="/shop">
          <Button variant="primary" size="md" className="gap-2">
            <span>Go to Storefront</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}