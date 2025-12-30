import { useAuthStore } from "@/store/auth/useAuthStore";

export const useAuth = () => {
  const { isAuth, login, logout, accessToken } = useAuthStore();

  return {
    isAuth,
    login,
    logout,
    accessToken,
  };
};
