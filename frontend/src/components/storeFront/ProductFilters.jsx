"use client";

import React from "react";
import { Search, RotateCcw } from "lucide-react";
import { useFilterStore } from "@/store/useFilterStore";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

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

export default function ProductFilters() {
  const { search, category, sort, setSearch, setCategory, setSort, resetFilters } =
    useFilterStore();

  const hasActiveFilters = Boolean(search || category || sort !== "newest");

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[var(--color-surface)] p-4 rounded-[var(--radius-md)] border border-[var(--color-border)]">
      <div className="flex-1 max-w-md">
        <Input
          placeholder="Search silhouettes, fabrics, or brands..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search className="w-4 h-4" />}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Select
          options={CATEGORY_OPTIONS}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-44"
        />

        <Select
          options={SORT_OPTIONS}
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-44"
        />

        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="gap-1.5 text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </Button>
        )}
      </div>
    </div>
  );
}