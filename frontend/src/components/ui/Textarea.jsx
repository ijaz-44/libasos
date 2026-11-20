import React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef(
  ({ className, label, error, rows = 4, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] font-[family-name:var(--font-ui)]">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={cn(
            "w-full p-4 text-sm bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] rounded-[var(--radius-md)] transition-colors placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] font-[family-name:var(--font-content)] resize-y",
            error && "border-[var(--color-danger)]",
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-xs text-[var(--color-danger)] font-[family-name:var(--font-content)]">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";