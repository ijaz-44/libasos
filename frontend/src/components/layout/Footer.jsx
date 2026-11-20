"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async () => {
    setSubscribed(true);
    reset();
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="site-footer mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Summary */}
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-block text-2xl tracking-[0.14em] uppercase font-[family-name:var(--font-header)] text-[var(--color-footer-text)]"
            >
              ZAYRA<span className="text-[var(--color-primary)]">.</span>
            </Link>
            <p className="text-sm leading-relaxed text-[var(--color-footer-muted)] font-[family-name:var(--font-content)]">
              Curated contemporary fashion, artisanal house edits, and AI-assisted styling tailored for everyday elegance.
            </p>
          </div>

          {/* Shop & Discovery */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-footer-text)] font-[family-name:var(--font-ui)] mb-4">
              Discover
            </h4>
            <ul className="space-y-2.5 text-sm text-[var(--color-footer-muted)] font-[family-name:var(--font-content)]">
              <li>
                <Link href="/shop" className="hover:text-[var(--color-primary)] transition-colors">
                  All Collections
                </Link>
              </li>
              <li>
                <Link href="/shop?tag=new" className="hover:text-[var(--color-primary)] transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[var(--color-primary)] transition-colors">
                  Our Story & Ethics
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[var(--color-primary)] transition-colors">
                  Merchant & Member Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Care */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-footer-text)] font-[family-name:var(--font-ui)] mb-4">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-sm text-[var(--color-footer-muted)] font-[family-name:var(--font-content)]">
              <li>
                <Link href="/cart" className="hover:text-[var(--color-primary)] transition-colors">
                  Shopping Bag
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-[var(--color-primary)] transition-colors">
                  Checkout & Payments
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[var(--color-primary)] transition-colors">
                  Sign In / OAuth
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[var(--color-primary)] transition-colors">
                  Terms & Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-footer-text)] font-[family-name:var(--font-ui)] mb-4">
              Private Drops
            </h4>
            <p className="text-sm text-[var(--color-footer-muted)] mb-3 font-[family-name:var(--font-content)]">
              Early access to capsule releases and seasonal edits.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className="flex-1 h-10 px-3.5 text-sm bg-white/80 text-[var(--color-text)] border border-[var(--color-footer-line)] rounded-[var(--radius-sm)] focus:outline-none focus:border-[var(--color-primary)]"
                />
                <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting} className="h-10">
                  Join
                </Button>
              </div>
              {errors.email && (
                <p className="text-xs text-[var(--color-danger)]">{errors.email.message}</p>
              )}
              {subscribed && (
                <p className="text-xs text-[var(--color-success)] font-medium">
                  Subscribed to private edit alerts.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-[var(--color-footer-line)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-footer-muted)] font-[family-name:var(--font-ui)]">
          <p>© {new Date().getFullYear()} ZAYRA Storefront. All rights reserved.</p>
          <p>Built with Next.js • Tailwind v4 • TanStack Query • Zustand</p>
        </div>
      </div>
    </footer>
  );
}