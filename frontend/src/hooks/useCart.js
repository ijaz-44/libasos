"use client";

import { useCartStore } from "@/store/useCartStore";
import { useUiStore } from "@/store/useUiStore";

export function useCart() {
  const items = useCartStore((state) => state.items);
  const addItemStore = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const openCart = useUiStore((state) => state.openCart);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const addToCart = (product, quantity = 1, variant = "") => {
    addItemStore(product, quantity, variant);
    openCart();
  };

  return {
    items,
    totalItems,
    subtotal,
    isEmpty: items.length === 0,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
  };
}