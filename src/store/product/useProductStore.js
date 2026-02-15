import { create } from "zustand";
import { getProductById, getProducts } from "@/api/product/product";

const useProductStore = create((set, get) => ({
  /* =====================
     STATE
  ===================== */
  products: [],
  product: null,

  loading: false,
  error: null,

  page: 1,
  hasMore: true,

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

  /* =====================
     ACTIONS
  ===================== */

  // Получить список товаров
  fetchProducts: async ({ reset = false } = {}) => {
    const currentPage = reset ? 1 : get().page;
    const filters = get().filters;
    const products = get().products;
  
    set({ loading: true, error: null });
    try {
      const params = {
        page: currentPage,
        ...filters,
      };
      console.log(params);
      const response = await getProducts(params);
      const newProducts = response.data.results;
  
      set((state) => ({
        products: reset
          ? newProducts
          : [...state.products, ...newProducts],
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
  

  // Получить один товар
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

  /* =====================
     FILTERS
  ===================== */

  setFilters: (newFilters) => set({ filters: newFilters }),

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

  /* =====================
     RESET
  ===================== */

  resetProducts: () =>
    set({
      products: [],
      page: 1,
      hasMore: true,
    }),
}));

export default useProductStore;
