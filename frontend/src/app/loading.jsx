import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 space-y-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-[var(--color-primary-soft)]" />
        <div className="absolute inset-0 rounded-full border-2 border-[var(--color-primary)] border-t-transparent animate-spin" />
      </div>
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)] font-[family-name:var(--font-ui)]">
        Curating Catalog...
      </p>
    </div>
  );
}