"use client";

import React, { useState, use } from "react";
import { ShoppingBag, Truck, ShieldCheck, Heart, Sparkles } from "lucide-react";
import { useProduct } from "@/hooks/useProducts";
import { useCartStore } from "@/store/useCartStore";
import { useUiStore } from "@/store/useUiStore";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";

const SIZES = ["XS", "S", "M", "L", "XL"];

export default function ProductDetailPage({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const { product, isLoading } = useProduct(slug);

  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  const addItem = useCartStore((state) => state.addItem);
  const { openCart, openAi } = useUiStore();

  const currentProduct = product || {
    id: "p-detail",
    slug,
    title: "Embroidered Raw Silk Kurta Edit",
    brand: "Atelier Zayra",
    price: 18500,
    description:
      "Meticulously tailored from 100% pure raw silk featuring fine metallic tilla embroidery around the collar and cuffs. Ideal for festive family gatherings and formal evening affairs.",
    image: "/images/placeholder-product.jpg",
  };

  const handleAddToCart = () => {
    addItem(currentProduct, quantity, selectedSize);
    openCart();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Product Image */}
        <div className="aspect-[3/4] bg-[var(--color-surface-muted)] rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden">
          <img
            src={currentProduct.image}
            alt={currentProduct.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Product Details & Actions */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <Badge variant="primary" className="mb-2">
                Authentic Brand Edit
              </Badge>
              <p className="text-xs uppercase tracking-widest font-bold text-[var(--color-text-muted)] font-[family-name:var(--font-ui)]">
                {currentProduct.brand}
              </p>
              <h1 className="text-3xl font-bold tracking-tight font-[family-name:var(--font-header)] text-[var(--color-text)] mt-1">
                {currentProduct.title}
              </h1>
            </div>

            <p className="text-2xl font-bold text-[var(--color-text)] font-[family-name:var(--font-ui)]">
              {formatCurrency(currentProduct.price)}
            </p>

            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed font-[family-name:var(--font-content)]">
              {currentProduct.description}
            </p>

            {/* Size Selector */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text)] font-[family-name:var(--font-ui)]">
                Select Size: {selectedSize}
              </label>
              <div className="flex gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`h-10 w-12 rounded-[var(--radius-sm)] border text-xs font-bold font-[family-name:var(--font-ui)] transition-colors cursor-pointer ${
                      selectedSize === size
                        ? "border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                        : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-border-strong)]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Counter */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text)] font-[family-name:var(--font-ui)]">
                Quantity
              </label>
              <div className="inline-flex items-center border border-[var(--color-border)] rounded-[var(--radius-md)]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-sm hover:bg-[var(--color-surface-muted)] cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 text-sm font-bold font-[family-name:var(--font-ui)]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-sm hover:bg-[var(--color-surface-muted)] cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-3 pt-6 border-t border-[var(--color-border)]">
            <Button
              variant="primary"
              size="lg"
              onClick={handleAddToCart}
              className="w-full gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Add To Shopping Bag • {formatCurrency(currentProduct.price * quantity)}</span>
            </Button>

            <Button variant="soft" size="md" onClick={openAi} className="w-full gap-2">
              <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />
              <span>Ask AI Stylist how to pair this silhouette</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}