import { useAuthStore } from "@/store/auth/useAuthStore";

export const useAuth = () => {
  const { isAuth, login, logout } = useAuthStore();

  return {
    isAuth,
    login,
    logout,
  };
};
