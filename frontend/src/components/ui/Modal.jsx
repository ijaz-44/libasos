"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";

export function Modal({ isOpen, onClose, title, children, className }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Box */}
      <div
        className={cn(
          "relative z-10 w-full max-w-lg bg-[var(--color-surface)] rounded-[var(--radius-lg)] shadow-[var(--shadow-popover)] border border-[var(--color-border)] p-6 overflow-hidden animate-in fade-in zoom-in-95 duration-200",
          className
        )}
      >
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--color-border)]">
          <h3 className="text-lg font-semibold tracking-wide font-[family-name:var(--font-header)] text-[var(--color-text)]">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-muted)] transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="font-[family-name:var(--font-content)]">{children}</div>
      </div>
    </div>
  );
}