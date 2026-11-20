"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useUiStore } from "@/store/useUiStore";

export default function HeroBanner({
  badge = "Autumn Festive Collection 2026",
  title = "Modern Craftsmanship Meets Multi-Brand Elegance",
  subtitle = "Discover curated luxury pret, artisanal unstitched edits, and AI-assisted personalized outfit recommendations across verified ateliers.",
  image = "/images/placeholder-product.jpg",
}) {
  const openAi = useUiStore((state) => state.openAi);

  return (
    <section className="relative bg-[var(--color-header-bg)] border-b border-[var(--color-header-line)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-22 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <Badge variant="primary" className="px-3 py-1 text-xs">
            {badge}
          </Badge>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.15] text-[var(--color-text)] font-[family-name:var(--font-header)]">
            {title}
          </h1>

          <p className="text-base text-[var(--color-text-muted)] max-w-lg font-[family-name:var(--font-content)] leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/shop">
              <Button variant="primary" size="lg" className="gap-2">
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button variant="soft" size="lg" onClick={openAi} className="gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Ask AI Stylist</span>
            </Button>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="w-full max-w-md aspect-[4/5] rounded-[var(--radius-lg)] bg-[var(--color-surface-muted)] border border-[var(--color-border-strong)] shadow-[var(--shadow-card)] overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-6 left-6 right-6 z-20 text-white space-y-1">
              <p className="text-xs uppercase tracking-widest font-semibold font-[family-name:var(--font-ui)] opacity-90">
                Featured Label
              </p>
              <h3 className="text-xl font-bold font-[family-name:var(--font-header)]">
                The Velvet Capsule Edit
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}