import { create } from "zustand";

export const useFilterStore = create((set) => ({
  filters: {
    category: "",
    stores: [],
    brands: [],
    sizes: [],
    sort: "",
    discountOnly: false,
    minPrice: "",
    maxPrice: "",
  },

  setFilters: (newFilters) =>
    set({ filters: newFilters }),

  resetFilters: () =>
    set({
      filters: {
        category: "",
        stores: [],
        brands: [],
        sizes: [],
        sort: "",
        discountOnly: false,
        minPrice: "",
        maxPrice: "",
      },
    }),
}));
