import React from "react";
import { cn } from "@/lib/utils";

export const Select = React.forwardRef(
  ({ className, label, error, options = [], children, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] font-[family-name:var(--font-ui)]">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "w-full h-11 px-4 pr-10 text-sm bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] rounded-[var(--radius-md)] appearance-none transition-colors focus:outline-none focus:border-[var(--color-primary)] font-[family-name:var(--font-ui)] cursor-pointer",
              error && "border-[var(--color-danger)]",
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            {children}
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-text-muted)]">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && (
          <span className="text-xs text-[var(--color-danger)] font-[family-name:var(--font-content)]">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";