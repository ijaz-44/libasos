import React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef(
  ({ className, label, error, leftIcon, rightIcon, type = "text", ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] font-[family-name:var(--font-ui)]">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-[var(--color-text-muted)] pointer-events-none flex items-center">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            ref={ref}
            className={cn(
              "w-full h-11 px-4 text-sm bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] rounded-[var(--radius-md)] transition-colors placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] font-[family-name:var(--font-ui)]",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-[var(--color-danger)] focus:border-[var(--color-danger)]",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 text-[var(--color-text-muted)] flex items-center">
              {rightIcon}
            </div>
          )}
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

Input.displayName = "Input";