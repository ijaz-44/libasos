import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount, currency = "PKR") {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
}