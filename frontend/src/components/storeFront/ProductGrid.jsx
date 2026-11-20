"use client";

import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [], isLoading = false }) {
  if (isLoading) {
    return (
      <div className="py-20 text-center text-xs uppercase tracking-widest text-[var(--color-text-muted)] font-[family-name:var(--font-ui)]">
        Loading catalog items...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-16 text-center rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] space-y-2">
        <p className="text-base font-bold font-[family-name:var(--font-header)] text-[var(--color-text)]">
          No matching silhouettes found
        </p>
        <p className="text-sm text-[var(--color-text-muted)] font-[family-name:var(--font-content)]">
          Try adjusting your search keywords or category filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id || product.slug} product={product} />
      ))}
    </div>
  );
}