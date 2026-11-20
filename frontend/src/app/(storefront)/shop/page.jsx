"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ShoppingBag } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useDebounce } from "@/hooks/useDebounce";
import { useCartStore } from "@/store/useCartStore";
import { useUiStore } from "@/store/useUiStore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";

const CATEGORY_OPTIONS = [
  { label: "All Categories", value: "" },
  { label: "Unstitched Suits", value: "unstitched" },
  { label: "Ready To Wear", value: "ready-to-wear" },
  { label: "Luxury Formals", value: "formals" },
  { label: "Minimal Pret", value: "pret" },
];

const SORT_OPTIONS = [
  { label: "Featured & Latest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const debouncedSearch = useDebounce(searchQuery, 400);

  const { products, isLoading } = useProducts({
    search: debouncedSearch,
    category: selectedCategory,
    sort: sortBy,
  });

  const addItem = useCartStore((state) => state.addItem);
  const openCart = useUiStore((state) => state.openCart);

  const displayProducts =
    products.length > 0
      ? products
      : [
          {
            id: "p-101",
            slug: "silk-chanderi-suit",
            title: "Silk Chanderi Embroidered Suit",
            brand: "Heritage Collection",
            price: 19500,
            image: "/images/placeholder-product.jpg",
            category: "unstitched",
            tag: "Best Seller",
          },
          {
            id: "p-102",
            slug: "organza-festive-dupatta",
            title: "Organza Festive Dupatta Edition",
            brand: "Atelier Zayra",
            price: 12000,
            image: "/images/placeholder-product.jpg",
            category: "formals",
            tag: "New Drop",
          },
          {
            id: "p-103",
            slug: "linen-pret-co-ord",
            title: "Minimalist Linen Pret Co-Ord Set",
            brand: "Urban Edition",
            price: 15800,
            image: "/images/placeholder-product.jpg",
            category: "ready-to-wear",
            tag: "Editor's Pick",
          },
          {
            id: "p-104",
            slug: "raw-silk-trousers",
            title: "Tailored Raw Silk Trousers",
            brand: "Luxe Basics",
            price: 8500,
            image: "/images/placeholder-product.jpg",
            category: "pret",
            tag: "Essential",
          },
        ];

  const handleQuickAdd = (product) => {
    addItem(product, 1);
    openCart();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="border-b border-[var(--color-border)] pb-6 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-[family-name:var(--font-header)]">
          The Full Atelier Storefront
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] font-[family-name:var(--font-content)] max-w-xl">
          Browse luxury pret, festive formals, and handpicked unstitched edits from premier fashion houses.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[var(--color-surface)] p-4 rounded-[var(--radius-md)] border border-[var(--color-border)]">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search silhouettes, fabrics, or brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>

        <div className="flex items-center gap-3">
          <Select
            options={CATEGORY_OPTIONS}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-44"
          />

          <Select
            options={SORT_OPTIONS}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-44"
          />
        </div>
      </div>

      {/* Catalog Grid */}
      {isLoading ? (
        <div className="py-20 text-center text-xs uppercase tracking-widest text-[var(--color-text-muted)] font-[family-name:var(--font-ui)]">
          Loading catalog items...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-[var(--color-surface)] rounded-[var(--radius-md)] border border-[var(--color-border)] overflow-hidden flex flex-col justify-between hover:shadow-[var(--shadow-card)] transition-all duration-300"
            >
              <div>
                <div className="relative aspect-[3/4] bg-[var(--color-surface-muted)] overflow-hidden">
                  {product.tag && (
                    <Badge variant="sale" className="absolute top-3 left-3 z-10">
                      {product.tag}
                    </Badge>
                  )}
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-4 space-y-1">
                  <p className="text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] font-semibold font-[family-name:var(--font-ui)]">
                    {product.brand}
                  </p>
                  <Link
                    href={`/product/${product.slug}`}
                    className="block text-sm font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] line-clamp-1 font-[family-name:var(--font-ui)]"
                  >
                    {product.title}
                  </Link>
                  <p className="text-sm font-bold text-[var(--color-text)] font-[family-name:var(--font-ui)] pt-1">
                    {formatCurrency(product.price)}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAdd(product)}
                  className="w-full text-xs gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Quick Add</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}