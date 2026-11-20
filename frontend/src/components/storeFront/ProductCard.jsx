"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-[var(--color-surface)] rounded-[var(--radius-md)] border border-[var(--color-border)] overflow-hidden flex flex-col justify-between hover:shadow-[var(--shadow-card)] transition-all duration-300">
      <div>
        <div className="relative aspect-[3/4] bg-[var(--color-surface-muted)] overflow-hidden">
          {product.tag && (
            <Badge variant="sale" className="absolute top-3 left-3 z-10">
              {product.tag}
            </Badge>
          )}
          <Link href={`/product/${product.slug || product.id}`} className="block w-full h-full">
            <img
              src={product.image || "/images/placeholder-product.jpg"}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Link>
        </div>

        <div className="p-4 space-y-1">
          <p className="text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] font-semibold font-[family-name:var(--font-ui)]">
            {product.brand || "Editorial Atelier"}
          </p>
          <Link
            href={`/product/${product.slug || product.id}`}
            className="block text-sm font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] line-clamp-1 font-[family-name:var(--font-ui)]"
          >
            {product.title}
          </Link>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-sm font-bold text-[var(--color-text)] font-[family-name:var(--font-ui)]">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[var(--color-text-muted)] line-through font-[family-name:var(--font-ui)]">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 pt-0">
        <Button
          variant="outline"
          size="sm"
          onClick={() => addToCart(product, 1)}
          className="w-full text-xs gap-1.5"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Quick Add</span>
        </Button>
      </div>
    </div>
  );
}