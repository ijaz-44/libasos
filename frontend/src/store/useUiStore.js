import { create } from "zustand";

export const useUiStore = create((set) => ({
  isCartOpen: false,
  isMobileMenuOpen: false,
  isSearchOpen: false,
  isAiOpen: false,

  openCart: () => set({ isCartOpen: true, isMobileMenuOpen: false }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  openMobileMenu: () => set({ isMobileMenuOpen: true, isCartOpen: false }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),

  openAi: () => set({ isAiOpen: true }),
  closeAi: () => set({ isAiOpen: false }),

  closeAllDrawers: () =>
    set({
      isCartOpen: false,
      isMobileMenuOpen: false,
      isSearchOpen: false,
      isAiOpen: false,
    }),
}));