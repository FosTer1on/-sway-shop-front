import { create } from "zustand";
import {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
} from "@/api/favorites/favorites";

export const useFavoritesStore = create((set, get) => ({
  favorites: [],        // string[]
  isLoaded: false,

  /* ===== Загрузка избранного ===== */
  fetchFavorites: async () => {
    try {
      const res = await getFavorites();

      // API -> нормализуем в slug[]
      const slugs = res.data.map((item) => item.product.slug);

      set({
        favorites: slugs,
        isLoaded: true,
      });
    } catch (err) {
      console.error("FETCH FAVORITES ERROR:", err);
      set({ isLoaded: true });
    }
  },

  /* ===== Проверка ===== */
  isFavorite: (slug) => {
    if (!slug) return false;
    return get().favorites.includes(slug);
  },

  /* ===== Добавить ===== */
  addFavorite: async (slug) => {
    if (!slug) return;

    const { favorites } = get();

    // защита от повторного add
    if (favorites.includes(slug)) return;

    try {
      await addToFavorites(slug);

      set({
        favorites: [...favorites, slug],
      });
    } catch (err) {
      console.error("ADD FAVORITE ERROR:", err);
    }
  },

  /* ===== Удалить ===== */
  removeFavorite: async (slug) => {
    if (!slug) return;

    const { favorites } = get();

    try {
      await removeFromFavorites(slug);

      set({
        favorites: favorites.filter((s) => s !== slug),
      });
    } catch (err) {
      console.error("REMOVE FAVORITE ERROR:", err);
    }
  },

  /* ===== Сброс (logout) ===== */
  resetFavorites: () =>
    set({
      favorites: [],
      isLoaded: false,
    }),
}));
