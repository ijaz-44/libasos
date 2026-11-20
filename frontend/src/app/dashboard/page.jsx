"use client";

import React from "react";
import Link from "next/link";
import { Package, Sparkles, ShoppingBag, LogOut, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTokenRefresh } from "@/hooks/useTokenRefresh";
import { useCart } from "@/hooks/useCart";
import { useUiStore } from "@/store/useUiStore";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";

const SAMPLE_ORDERS = [
  {
    id: "ORD-9042",
    date: "14 Nov 2026",
    itemsCount: 2,
    total: 30500,
    status: "Delivered",
  },
  {
    id: "ORD-9118",
    date: "18 Nov 2026",
    itemsCount: 1,
    total: 18500,
    status: "In Transit",
  },
];

export default function DashboardPage() {
  useTokenRefresh();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { totalItems, subtotal } = useCart();
  const openAi = useUiStore((state) => state.openAi);

  const displayName = user?.name || user?.fullName || "Guest Member";
  const displayEmail = user?.email || "Not signed in — preview mode";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-border)] pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-header)] text-[var(--color-text)]">
              Account & Storefront Overview
            </h1>
            <Badge variant={isAuthenticated ? "success" : "secondary"}>
              {isLoading ? "Checking..." : isAuthenticated ? "Authenticated" : "Preview"}
            </Badge>
          </div>
          <p className="text-sm text-[var(--color-text-muted)] font-[family-name:var(--font-content)]">
            {displayName} • {displayEmail}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="soft" size="sm" onClick={openAi} className="gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>AI Stylist</span>
          </Button>

          {isAuthenticated ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => logout()}
              className="gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </Button>
          ) : (
            <Link href="/login">
              <Button variant="primary" size="sm">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-card)] space-y-2">
          <div className="flex items-center justify-between text-[var(--color-text-muted)]">
            <span className="text-xs font-semibold uppercase tracking-wider font-[family-name:var(--font-ui)]">
              Active Bag
            </span>
            <ShoppingBag className="w-4 h-4 text-[var(--color-primary)]" />
          </div>
          <p className="text-2xl font-bold font-[family-name:var(--font-ui)]">
            {totalItems} {totalItems === 1 ? "Item" : "Items"}
          </p>
          <p className="text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-content)]">
            Subtotal: {formatCurrency(subtotal)}
          </p>
        </div>

        <div className="p-5 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-card)] space-y-2">
          <div className="flex items-center justify-between text-[var(--color-text-muted)]">
            <span className="text-xs font-semibold uppercase tracking-wider font-[family-name:var(--font-ui)]">
              Recent Orders
            </span>
            <Package className="w-4 h-4 text-[var(--color-primary)]" />
          </div>
          <p className="text-2xl font-bold font-[family-name:var(--font-ui)]">
            {SAMPLE_ORDERS.length} Orders
          </p>
          <p className="text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-content)]">
            Express tracking enabled
          </p>
        </div>

        <div className="p-5 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-card)] flex flex-col justify-between space-y-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] font-[family-name:var(--font-ui)]">
              Catalog Discovery
            </span>
            <p className="text-sm text-[var(--color-text)] mt-1 font-[family-name:var(--font-content)]">
              Browse new silhouettes or proceed to checkout.
            </p>
          </div>
          <Link href="/shop" className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] hover:underline font-[family-name:var(--font-ui)]">
            <span>Go to Shop</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--color-border)]">
          <h2 className="text-lg font-bold font-[family-name:var(--font-header)]">
            Order History
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm font-[family-name:var(--font-ui)]">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-muted)] text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
                <th className="py-3 px-6">Order ID</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Items</th>
                <th className="py-3 px-6">Total</th>
                <th className="py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {SAMPLE_ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-[var(--color-surface-muted)]/50">
                  <td className="py-3.5 px-6 font-semibold">{order.id}</td>
                  <td className="py-3.5 px-6 text-[var(--color-text-muted)] font-[family-name:var(--font-content)]">
                    {order.date}
                  </td>
                  <td className="py-3.5 px-6">{order.itemsCount}</td>
                  <td className="py-3.5 px-6 font-bold">{formatCurrency(order.total)}</td>
                  <td className="py-3.5 px-6">
                    <Badge variant={order.status === "Delivered" ? "success" : "warning"}>
                      {order.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}