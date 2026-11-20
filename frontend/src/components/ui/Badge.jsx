import React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = {
  primary: "bg-[var(--color-primary-soft)] text-[var(--color-primary)] border border-[var(--color-primary)]/20",
  secondary: "bg-[var(--color-secondary-soft)] text-[var(--color-secondary)]",
  outline: "border border-[var(--color-border-strong)] text-[var(--color-text)]",
  success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border border-amber-200",
  sale: "bg-[var(--color-primary)] text-white font-bold tracking-widest uppercase",
};

export function Badge({ className, variant = "primary", children, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full font-[family-name:var(--font-ui)] select-none",
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}