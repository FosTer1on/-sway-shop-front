import { create } from "zustand";
import { getProductById, getProducts } from "@/api/product/product";

const initialFilters = {
  category: "",
  region: "",
  stores: [],
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
  hasMore: true,

  filters: initialFilters,

  fetchProducts: async ({ reset = false, overrideFilters = {} } = {}) => {
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

  setFilters: (newFilters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
    })),

  resetFilters: () =>
    set({
      filters: { ...initialFilters },
    }),

  resetProducts: () =>
    set({
      products: [],
      page: 1,
      hasMore: true,
    }),
}));

export default useProductStore;
