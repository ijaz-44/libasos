"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Search,
  Heart,
  User,
  ShoppingBag,
  Sparkles,
  X,
  ChevronRight,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useUiStore } from "@/store/useUiStore";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalItems = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const { openCart, openSearch, openAi } = useUiStore();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const showSolidBar = !isHome || isScrolled;

  return (
    <>
      <header
        className={cn(
          "site-header fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300",
          showSolidBar
            ? "bg-[var(--color-surface)] text-[var(--color-text)] border-b border-[var(--color-border)] shadow-[var(--shadow-card)]"
            : "bg-transparent text-white border-b border-white/15"
        )}
      >
        {/* Slim Top Sales & Offers Strip */}
        <div className="w-full bg-[var(--color-text)] text-[var(--color-surface)] py-1.5 px-4 text-center text-[11px] uppercase tracking-[0.2em] font-semibold font-[family-name:var(--font-ui)]">
          Sales &amp; Offers — Complimentary Delivery Above PKR 15,000
        </div>

        {/* 1.5x Height Main Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-[84px] md:h-[96px] flex items-center justify-between gap-3">
          {/* Left: Hamburger + Search + Country Flag */}
          <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-start">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open Menu"
              className="p-2 rounded-[2px] hover:bg-black/10 transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              type="button"
              onClick={openSearch}
              aria-label="Search Catalog"
              className="p-2 rounded-[2px] hover:bg-black/10 transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            <div
              title="Pakistan (PKR)"
              className="hidden sm:flex items-center gap-1.5 pl-3 border-l border-current/20 text-xs font-semibold uppercase tracking-wider font-[family-name:var(--font-ui)] select-none"
            >
              <span className="text-base leading-none" aria-hidden="true">
                🇵🇰
              </span>
              <span>PKR</span>
            </div>
          </div>

          {/* Center: Brand Logo */}
          <div className="text-center shrink-0 px-2">
            <Link href="/" className="inline-block group">
              <span className="block text-[10px] sm:text-[11px] uppercase tracking-[0.28em] opacity-80 font-[family-name:var(--font-ui)]">
                Royal Libas Online Store
              </span>
              <span className="block text-lg sm:text-2xl tracking-[0.18em] uppercase font-[family-name:var(--font-header)] group-hover:text-[var(--color-primary)] transition-colors">
                ROYALLIBASOS
              </span>
            </Link>
          </div>

          {/* Right: Heart (Wishlist) + User/Auth + Shopping Bag */}
          <div className="flex items-center gap-1 sm:gap-3 flex-1 justify-end">
            <Link
              href="/wishlist"
              aria-label="Saved Items"
              className="p-2 rounded-[2px] hover:bg-black/10 transition-colors"
            >
              <Heart className="w-5 h-5" />
            </Link>

            <Link
              href={isAuthenticated ? "/dashboard" : "/login"}
              aria-label="Account"
              className="relative p-2 rounded-[2px] hover:bg-black/10 transition-colors"
            >
              <User className="w-5 h-5" />
              {isAuthenticated && (
                <span className="w-2 h-2 bg-[var(--color-primary)] rounded-none absolute top-1.5 right-1.5" />
              )}
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label="Shopping Bag"
              className="relative p-2 rounded-[2px] hover:bg-black/10 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="min-w-[18px] h-[18px] px-1 bg-[var(--color-primary)] text-white text-[10px] font-bold flex items-center justify-center rounded-[2px] absolute -top-1 -right-1 font-[family-name:var(--font-ui)]">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Menu Drawer (Navigation + Contact Us -> About Us) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMenuOpen(false)}
          />

          <aside className="relative z-10 w-full max-w-sm bg-[var(--color-surface)] text-[var(--color-text)] h-full border-r border-[var(--color-border)] shadow-[var(--shadow-popover)] flex flex-col font-[family-name:var(--font-ui)]">
            <div className="px-6 py-5 border-b border-[var(--color-border)] bg-[var(--color-surface-muted)] flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--color-primary)]">
                  Royal Libas Online Store
                </p>
                <h2 className="text-lg uppercase tracking-wider font-[family-name:var(--font-header)] mt-0.5">
                  Menu
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close Menu"
                className="p-2 rounded-[2px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-primary-soft)] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-7">
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-text-muted)] px-2">
                  Collections
                </p>
                <nav className="space-y-1 text-sm font-semibold">
                  <Link
                    href="/"
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-[2px] transition-colors",
                      pathname === "/"
                        ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                        : "hover:bg-[var(--color-surface-muted)]"
                    )}
                  >
                    <span>Home</span>
                    <ChevronRight className="w-4 h-4 opacity-60" />
                  </Link>
                  <Link
                    href="/shop"
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-[2px] transition-colors",
                      pathname === "/shop"
                        ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                        : "hover:bg-[var(--color-surface-muted)]"
                    )}
                  >
                    <span>Shop All</span>
                    <ChevronRight className="w-4 h-4 opacity-60" />
                  </Link>
                  <Link
                    href="/shop?tag=new"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-[2px] hover:bg-[var(--color-surface-muted)] transition-colors"
                  >
                    <span>New Arrivals</span>
                    <ChevronRight className="w-4 h-4 opacity-60" />
                  </Link>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-[2px] transition-colors",
                      pathname === "/dashboard"
                        ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                        : "hover:bg-[var(--color-surface-muted)]"
                    )}
                  >
                    <span>Dashboard</span>
                    <ChevronRight className="w-4 h-4 opacity-60" />
                  </Link>
                </nav>
              </div>

              <div className="space-y-2 pt-5 border-t border-[var(--color-border)]">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-text-muted)] px-2">
                  Information &amp; Support
                </p>
                <nav className="space-y-1 text-sm font-semibold">
                  <Link
                    href="/contact"
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-[2px] transition-colors",
                      pathname === "/contact"
                        ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                        : "hover:bg-[var(--color-surface-muted)]"
                    )}
                  >
                    <span>Contact Us</span>
                    <ChevronRight className="w-4 h-4 opacity-60" />
                  </Link>

                  <Link
                    href="/about"
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between pl-7 pr-3 py-2 rounded-[2px] text-xs transition-colors",
                      pathname === "/about"
                        ? "text-[var(--color-primary)] font-bold"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-muted)]"
                    )}
                  >
                    <span>About Us</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </Link>

                  <Link
                    href="/terms"
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-[2px] transition-colors",
                      pathname === "/terms"
                        ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                        : "hover:bg-[var(--color-surface-muted)]"
                    )}
                  >
                    <span>Terms &amp; Policies</span>
                    <ChevronRight className="w-4 h-4 opacity-60" />
                  </Link>
                </nav>
              </div>
            </div>

            <div className="p-6 border-t border-[var(--color-border)] bg-[var(--color-surface-muted)]">
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  openAi();
                }}
                className="w-full py-3 px-4 rounded-[2px] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold uppercase tracking-[0.14em] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>AI Stylist</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}