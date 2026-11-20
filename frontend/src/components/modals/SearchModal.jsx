"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";
import { useUiStore } from "@/store/useUiStore";
import { useDebounce } from "@/hooks/useDebounce";
import { useProducts } from "@/hooks/useProducts";
import { formatCurrency } from "@/lib/utils";

const QUICK_SEARCHES = ["Velvet", "Silk Kurta", "Linen Co-Ord", "Dupatta", "Festive"];

export default function SearchModal() {
  const { isSearchOpen, closeSearch } = useUiStore();
  const [term, setTerm] = useState("");
  const debouncedTerm = useDebounce(term, 300);

  const { products, isFetching } = useProducts({ search: debouncedTerm });

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeSearch();
    };
    if (isSearchOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  const fallbackMatches = [
    {
      id: "s-1",
      slug: "embroidered-raw-silk-kurta",
      title: "Embroidered Raw Silk Kurta",
      brand: "Atelier Zayra",
      price: 18500,
      image: "/images/placeholder-product.jpg",
    },
    {
      id: "s-2",
      slug: "velvet-draped-dupatta-set",
      title: "Velvet Draped Dupatta Set",
      brand: "Luxe Couture",
      price: 26500,
      image: "/images/placeholder-product.jpg",
    },
  ].filter(
    (item) =>
      !debouncedTerm.trim() ||
      item.title.toLowerCase().includes(debouncedTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(debouncedTerm.toLowerCase())
  );

  const results = products.length > 0 ? products : fallbackMatches;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
      <div className="fixed inset-0 bg-black/45 backdrop-blur-xs" onClick={closeSearch} />

      <div className="relative z-10 w-full max-w-2xl bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-popover)] overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--color-border)] flex items-center gap-3 bg-[var(--color-header-bg)]">
          <Search className="w-5 h-5 text-[var(--color-primary)] shrink-0" />
          <input
            type="text"
            autoFocus
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search outfits, fabrics, or labels..."
            className="w-full bg-transparent text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none font-[family-name:var(--font-ui)]"
          />
          <button
            type="button"
            onClick={closeSearch}
            aria-label="Close Search"
            className="p-1.5 rounded-[var(--radius-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5 max-h-[65vh] overflow-y-auto">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] font-[family-name:var(--font-ui)]">
              Popular:
            </span>
            {QUICK_SEARCHES.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setTerm(tag)}
                className="text-xs px-3 py-1 rounded-full bg-[var(--color-surface-muted)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors cursor-pointer font-[family-name:var(--font-ui)]"
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-ui)]">
              <span>{isFetching ? "Searching..." : `Matches (${results.length})`}</span>
              <Link
                href={term ? `/shop?search=${encodeURIComponent(term)}` : "/shop"}
                onClick={closeSearch}
                className="inline-flex items-center gap-1 font-semibold text-[var(--color-primary)] hover:underline"
              >
                <span>View all in Shop</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-[var(--color-border)]">
              {results.map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.slug || item.id}`}
                  onClick={closeSearch}
                  className="py-3 flex items-center justify-between gap-4 hover:bg-[var(--color-surface-muted)]/60 px-2 rounded-[var(--radius-sm)] transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.image || "/images/placeholder-product.jpg"}
                      alt={item.title}
                      className="w-12 h-14 object-cover rounded-[var(--radius-sm)] border border-[var(--color-border)] shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase font-bold text-[var(--color-text-muted)] font-[family-name:var(--font-ui)]">
                        {item.brand}
                      </p>
                      <p className="text-sm font-semibold text-[var(--color-text)] truncate font-[family-name:var(--font-ui)]">
                        {item.title}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-[var(--color-text)] shrink-0 font-[family-name:var(--font-ui)]">
                    {formatCurrency(item.price)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}