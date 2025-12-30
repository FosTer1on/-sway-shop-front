import { create } from "zustand";

export const useAuthStore = create((set) => ({
  accessToken: null,
  isAuth: !!localStorage.getItem("refresh_token"),

  login: (token) => {
    // localStorage.setItem("access_token", token);
    set({
      accessToken: token,
      isAuth: true,
    });
  },

  logout: () => {
    localStorage.removeItem("refresh_token");
    set({
      accessToken: null,
      isAuth: false,
    });
  },
}));
