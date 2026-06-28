import { create } from "zustand";
import {
  getProductById,
  getProducts,
  getOutfits,
  getOutfitBySlug,
} from "@/api/product/product";

const initialFilters = {
  category: "",
  region: "",
  gender: "",
  search: "",
  // stores: [],
  brands: [],
  sizes: [],
  sort: "",
  discountOnly: false,
  minPrice: "",
  maxPrice: "",
};

const useProductStore = create((set, get) => ({
  products: [],
  product: null,

  loading: false,
  error: null,

  page: 1,
  hasMore: false,

  filters: initialFilters,
  filtersInitialized: false,

  activeCatalog: "products",

  catalogSeed: crypto.randomUUID(),

  outfits: [],
  outfit: null,

  fetchProducts: async ({ reset = false, overrideFilters = {} } = {}) => {
    const currentPage = reset ? 1 : get().page;

    const filters = {
      ...get().filters,
      ...overrideFilters,
    };

    set({ loading: true, error: null });

    try {
      const isSearching = Boolean(filters.search?.trim());

      const params = {
        page: currentPage,
        seed: get().catalogSeed,
        ...filters,
        ...(isSearching && {
          search: filters.search.trim(),
          category: "",
          region: "",
          brands: [],
          sizes: [],
          minPrice: "",
          maxPrice: "",
          discountOnly: false,
          sort: "",
        }),
      };

      const response = await getProducts(params);
      const newProducts = response.data.results || [];

      set((state) => ({
        products: reset ? newProducts : [...state.products, ...newProducts],
        page: currentPage + 1,
        hasMore: Boolean(response.data.next),
        loading: false,
      }));
    } catch (err) {
      set({
        error: err?.response?.data?.detail || "Ошибка загрузки товаров",
        loading: false,
      });
    }
  },

  fetchProductBySlug: async (slug) => {
    set({ loading: true, error: null });

    try {
      const response = await getProductById(slug);

      set({
        product: response.data,
        loading: false,
      });
    } catch (err) {
      set({
        error: "Товар не найден",
        loading: false,
      });
    }
  },

  fetchOutfits: async ({ reset = false, overrideFilters = {} } = {}) => {
    const currentPage = reset ? 1 : get().page;

    const filters = {
      ...get().filters,
      ...overrideFilters,
    };

    set({ loading: true, error: null });

    try {
      const params = {
        page: currentPage,
        ...filters,
      };

      const response = await getOutfits(params);
      const newOutfits = response.data.results || [];

      set((state) => ({
        outfits: reset ? newOutfits : [...state.outfits, ...newOutfits],
        page: currentPage + 1,
        hasMore: Boolean(response.data.next),
        loading: false,
      }));
    } catch (err) {
      set({
        error: err?.response?.data?.detail || "Ошибка загрузки луков",
        loading: false,
      });
    }
  },

  fetchOutfitBySlug: async (slug) => {
    set({ loading: true, error: null });

    try {
      const response = await getOutfitBySlug(slug);

      set({
        outfit: response.data,
        loading: false,
      });
    } catch (err) {
      set({
        error: "Лук не найден",
        loading: false,
      });
    }
  },

  setFilters: (newFilters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
    })),

  initFiltersFromUrl: (searchParams) => {
    const tabFromUrl = searchParams.get("tab");
    const genderFromUrl = searchParams.get("gender") || "";

    const filtersFromUrl = {
      region: tabFromUrl === "outfits" ? "" : searchParams.get("region") || "",
      gender: genderFromUrl,
      search: searchParams.get("search") || "",
      category: searchParams.get("category") || "",
      // stores: searchParams.getAll("store"),
      brands: searchParams.getAll("brand"),
      sizes: searchParams.getAll("size"),
      sort: searchParams.get("sort") || "",
      discountOnly: searchParams.get("discount") === "true",
      minPrice: searchParams.get("min_price") || "",
      maxPrice: searchParams.get("max_price") || "",
    };

    set({
      filters: filtersFromUrl,
      activeCatalog: tabFromUrl === "outfits" ? "outfits" : "products",
      filtersInitialized: true,
    });
  },

  setActiveCatalog: (catalog) =>
    set({
      activeCatalog: catalog,
    }),

  resetFilters: () =>
    set({
      filters: { ...initialFilters },
    }),

  resetProducts: () =>
    set({
      products: [],
      outfits: [],
      page: 1,
      hasMore: true,
      catalogSeed: crypto.randomUUID(),
    }),
}));

export default useProductStore;
