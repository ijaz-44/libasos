"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useCartStore } from "@/store/useCartStore";
import { useUiStore } from "@/store/useUiStore";
import { formatCurrency } from "@/lib/utils";

const MOCK_FEATURED_PRODUCTS = [
  {
    id: "prod-1",
    slug: "embroidered-raw-silk-kurta",
    title: "Embroidered Raw Silk Kurta",
    brand: "Atelier Zayra",
    price: 18500,
    originalPrice: 22000,
    image: "/images/placeholder-product.jpg",
    tag: "Best Seller",
  },
  {
    id: "prod-2",
    slug: "velvet-draped-dupatta-set",
    title: "Velvet Draped Dupatta Set",
    brand: "Luxe Couture",
    price: 26500,
    image: "/images/placeholder-product.jpg",
    tag: "New Drop",
  },
  {
    id: "prod-3",
    slug: "structured-linen-blazer",
    title: "Structured Linen Blazer",
    brand: "Urban Edition",
    price: 14200,
    originalPrice: 16500,
    image: "/images/placeholder-product.jpg",
    tag: "Sale",
  },
  {
    id: "prod-4",
    slug: "handwoven-chiffon-saree",
    title: "Handwoven Chiffon Saree",
    brand: "Heritage Weaves",
    price: 32000,
    image: "/images/placeholder-product.jpg",
    tag: "Editorial Pick",
  },
];

const CATEGORIES = [
  { name: "Unstitched Suits", count: "140+ Styles", href: "/shop?category=unstitched" },
  { name: "Ready To Wear", count: "95+ Styles", href: "/shop?category=ready-to-wear" },
  { name: "Luxury Formals", count: "60+ Styles", href: "/shop?category=formals" },
  { name: "Minimal Pret", count: "80+ Styles", href: "/shop?category=pret" },
];

export default function HomePage() {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useUiStore((state) => state.openCart);
  const openAi = useUiStore((state) => state.openAi);

  const handleQuickAdd = (product) => {
    addItem(product, 1);
    openCart();
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner Section */}
      <section className="relative bg-[var(--color-header-bg)] border-b border-[var(--color-header-line)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <Badge variant="primary" className="px-3 py-1 text-xs">
              Autumn Festive Collection 2026
            </Badge>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.15] text-[var(--color-text)] font-[family-name:var(--font-header)]">
              Modern Craftsmanship Meets Multi-Brand Elegance
            </h1>

            <p className="text-base text-[var(--color-text-muted)] max-w-lg font-[family-name:var(--font-content)] leading-relaxed">
              Discover curated luxury pret, artisanal unstitched edits, and AI-assisted personalized outfit recommendations across Pakistan's finest ateliers.
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
                src="/images/placeholder-product.jpg"
                alt="Editorial Festive Drop"
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

      {/* Value Propositions Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 px-8 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-[family-name:var(--font-ui)]">Complimentary Express Shipping</h4>
              <p className="text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-content)]">On orders over PKR 15,000</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-[family-name:var(--font-ui)]">100% Guaranteed Authentic</h4>
              <p className="text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-content)]">Sourced directly from verified brands</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-[family-name:var(--font-ui)]">Hassle-Free Exchanges</h4>
              <p className="text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-content)]">7-day doorstep replacement window</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Discovery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-end justify-between border-b border-[var(--color-border)] pb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] font-semibold text-[var(--color-primary)] font-[family-name:var(--font-ui)]">
              Curated Edits
            </p>
            <h2 className="text-2xl md:text-3xl tracking-tight font-[family-name:var(--font-header)]">
              Shop By Category
            </h2>
          </div>
          <Link href="/shop" className="text-xs uppercase tracking-wider font-semibold text-[var(--color-primary)] hover:underline font-[family-name:var(--font-ui)]">
            View All Categories →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group relative p-6 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all duration-300 shadow-xs hover:shadow-[var(--shadow-card)] flex flex-col justify-between h-40"
            >
              <div>
                <h3 className="text-lg font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors font-[family-name:var(--font-ui)]">
                  {cat.name}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)] mt-1 font-[family-name:var(--font-content)]">
                  {cat.count}
                </p>
              </div>
              <span className="text-xs font-semibold text-[var(--color-primary)] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-[family-name:var(--font-ui)]">
                Explore Edit <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Carousel/Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-end justify-between border-b border-[var(--color-border)] pb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] font-semibold text-[var(--color-primary)] font-[family-name:var(--font-ui)]">
              New In Store
            </p>
            <h2 className="text-2xl md:text-3xl tracking-tight font-[family-name:var(--font-header)]">
              Trending Silhouettes
            </h2>
          </div>
          <Link href="/shop" className="text-xs uppercase tracking-wider font-semibold text-[var(--color-primary)] hover:underline font-[family-name:var(--font-ui)]">
            See Full Collection →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_FEATURED_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="group bg-[var(--color-surface)] rounded-[var(--radius-md)] border border-[var(--color-border)] overflow-hidden flex flex-col justify-between hover:shadow-[var(--shadow-card)] transition-all duration-300"
            >
              <div>
                <div className="relative aspect-[3/4] bg-[var(--color-surface-muted)] overflow-hidden">
                  <Badge variant="sale" className="absolute top-3 left-3 z-10">
                    {prod.tag}
                  </Badge>
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-4 space-y-1">
                  <p className="text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] font-semibold font-[family-name:var(--font-ui)]">
                    {prod.brand}
                  </p>
                  <Link
                    href={`/product/${prod.slug}`}
                    className="block text-sm font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] line-clamp-1 font-[family-name:var(--font-ui)]"
                  >
                    {prod.title}
                  </Link>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-sm font-bold text-[var(--color-text)] font-[family-name:var(--font-ui)]">
                      {formatCurrency(prod.price)}
                    </span>
                    {prod.originalPrice && (
                      <span className="text-xs text-[var(--color-text-muted)] line-through font-[family-name:var(--font-ui)]">
                        {formatCurrency(prod.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAdd(prod)}
                  className="w-full text-xs"
                >
                  Quick Add To Bag
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}