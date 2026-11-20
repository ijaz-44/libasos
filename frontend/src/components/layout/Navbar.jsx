"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Sparkles } from "lucide-react";
import { useUiStore } from "@/store/useUiStore";
import { cn } from "@/lib/utils";

const DEFAULT_ITEMS = [
  { label: "All Edits", href: "/shop" },
  { label: "Unstitched", href: "/shop?category=unstitched" },
  { label: "Ready To Wear", href: "/shop?category=ready-to-wear" },
  { label: "Luxury Formals", href: "/shop?category=formals" },
  { label: "Minimal Pret", href: "/shop?category=pret" },
];

export default function Navbar({ items = DEFAULT_ITEMS, className }) {
  const pathname = usePathname();
  const { openSearch, openAi } = useUiStore();

  return (
    <nav
      aria-label="Storefront Categories"
      className={cn(
        "w-full bg-[var(--color-surface)] border-b border-[var(--color-border)] font-[family-name:var(--font-ui)]",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-11 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-6 shrink-0">
          {items.map((item) => {
            const basePath = item.href.split("?")[0];
            const isActive = pathname === basePath && !item.href.includes("?");

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "text-xs font-semibold uppercase tracking-[0.12em] py-2 transition-colors whitespace-nowrap",
                  isActive
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden sm:flex items-center gap-4 shrink-0 text-xs">
          <button
            type="button"
            onClick={openSearch}
            className="inline-flex items-center gap-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] font-semibold cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Quick Search</span>
          </button>

          <button
            type="button"
            onClick={openAi}
            className="inline-flex items-center gap-1 text-[var(--color-primary)] font-semibold hover:underline cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Style Assistant</span>
          </button>
        </div>
      </div>
    </nav>
  );
}