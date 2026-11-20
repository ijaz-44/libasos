import { create } from "zustand";

const INITIAL_FILTERS = {
  search: "",
  category: "",
  tag: "",
  sort: "newest",
};

export const useFilterStore = create((set) => ({
  ...INITIAL_FILTERS,

  setSearch: (search) => set({ search }),
  setCategory: (category) => set({ category }),
  setTag: (tag) => set({ tag }),
  setSort: (sort) => set({ sort }),

  setFilters: (partial) => set((state) => ({ ...state, ...partial })),

  resetFilters: () => set({ ...INITIAL_FILTERS }),
}));