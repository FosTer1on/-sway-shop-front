import { create } from "zustand";
import { useFavoritesStore } from "@/store/favorites/useFavoritesStore";

export const useAuthStore = create((set) => ({
  accessToken: localStorage.getItem("access_token"),
  isAuth: !!localStorage.getItem("refresh_token"),

  login: (token) => {
    localStorage.setItem("access_token", token);

    set({
      accessToken: token,
      isAuth: true,
    });

    // лучше после set, чтобы interceptor уже видел токен
    useFavoritesStore.getState().fetchFavorites();
  },

  logout: () => {
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_token");

    useFavoritesStore.getState().resetFavorites();

    set({
      accessToken: null,
      isAuth: false,
    });
  },
}));