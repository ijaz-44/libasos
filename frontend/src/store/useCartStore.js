import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const buildItemKey = (id, variant = "") => `${id}::${variant || "default"}`;

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1, variant = "") => {
        const key = buildItemKey(product.id, variant);
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex((item) => item.key === key);

        if (existingIndex > -1) {
          const updated = [...currentItems];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
          };
          set({ items: updated });
        } else {
          set({
            items: [
              ...currentItems,
              {
                key,
                id: product.id,
                slug: product.slug,
                title: product.title,
                brand: product.brand || "Editorial Atelier",
                price: Number(product.price) || 0,
                image: product.image || "/images/placeholder-product.jpg",
                variant,
                quantity,
              },
            ],
          });
        }
      },

      updateQuantity: (key, quantity) => {
        if (quantity <= 0) {
          get().removeItem(key);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.key === key ? { ...item, quantity } : item
          ),
        });
      },

      removeItem: (key) => {
        set({
          items: get().items.filter((item) => item.key !== key),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      getSubtotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: "editorial-cart-storage",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? window.localStorage : undefined
      ),
      partialize: (state) => ({ items: state.items }),
    }
  )
);