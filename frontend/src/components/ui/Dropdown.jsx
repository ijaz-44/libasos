"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Dropdown({ trigger, items = [], align = "left", className }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={() => setIsOpen((prev) => !prev)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-2 w-48 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-popover)] py-1.5 focus:outline-none animate-in fade-in zoom-in-95 duration-150 font-[family-name:var(--font-ui)]",
            align === "right" ? "right-0" : "left-0",
            className
          )}
        >
          {items.map((item, index) => {
            if (item.divider) {
              return <div key={index} className="my-1 border-t border-[var(--color-border)]" />;
            }

            return (
              <button
                key={index}
                type="button"
                onClick={() => {
                  if (item.onClick) item.onClick();
                  setIsOpen(false);
                }}
                disabled={item.disabled}
                className={cn(
                  "w-full text-left px-4 py-2 text-xs font-semibold text-[var(--color-text)] hover:bg-[var(--color-primary-soft)] hover:text-[var(--color-primary)] flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed",
                  item.danger && "text-[var(--color-danger)] hover:bg-red-50 hover:text-[var(--color-danger)]"
                )}
              >
                {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}