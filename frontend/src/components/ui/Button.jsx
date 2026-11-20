import React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = {
  primary:
    "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary-hover)] active:scale-[0.98] shadow-sm",
  secondary:
    "bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] hover:bg-[var(--color-secondary-hover)] active:scale-[0.98]",
  soft: "bg-[var(--color-primary-soft)] text-[var(--color-primary-hover)] hover:bg-[var(--color-primary)] hover:text-white",
  outline:
    "border border-[var(--color-border-strong)] bg-transparent text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]",
  ghost:
    "bg-transparent text-[var(--color-text)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-primary)]",
  danger:
    "bg-[var(--color-danger)] text-white hover:opacity-90 active:scale-[0.98]",
};

const buttonSizes = {
  sm: "h-9 px-3.5 text-xs font-semibold rounded-[var(--radius-sm)]",
  md: "h-11 px-5 text-sm font-semibold rounded-[var(--radius-md)]",
  lg: "h-13 px-7 text-base font-semibold rounded-[var(--radius-lg)]",
  icon: "h-10 w-10 p-0 flex items-center justify-center rounded-[var(--radius-md)]",
};

export const Button = React.forwardRef(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled = false,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        type={type}
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none font-[family-name:var(--font-ui)] tracking-wide",
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 currentColor"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";