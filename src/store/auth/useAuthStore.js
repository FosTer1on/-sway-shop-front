import { create } from "zustand";

export const useAuthStore = create((set) => ({
  accessToken: localStorage.getItem("access_token"),
  isAuth: !!localStorage.getItem("access_token"),

  login: (token) => {
    localStorage.setItem("access_token", token);
    set({
      accessToken: token,
      isAuth: true,
    });
  },

  logout: () => {
    localStorage.removeItem("access_token");
    set({
      accessToken: null,
      isAuth: false,
    });
  },
}));
