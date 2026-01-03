import { create } from "zustand";
import { useFavoritesStore } from "@/store/favorites/useFavoritesStore";

export const useAuthStore = create((set) => ({
  accessToken: null,
  isAuth: !!localStorage.getItem("refresh_token"),

  login: (token) => {
    // localStorage.setItem("access_token", token);
    useFavoritesStore.getState().fetchFavorites();

    set({
      accessToken: token,
      isAuth: true,
    });
  },

  logout: () => {
    localStorage.removeItem("refresh_token");

    useFavoritesStore.getState().resetFavorites();

    set({
      accessToken: null,
      isAuth: false,
    });
  },
}));
