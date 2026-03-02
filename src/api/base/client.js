import i18n from "@/i18n";
import { useAuthStore } from "@/store/auth/useAuthStore";
import axios from "axios";

const API_URL =  import.meta.env.VITE_API_URL;

/* =======================
   Основной axios instance
======================= */
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =======================
   Request interceptor
======================= */
api.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    const currentLang = i18n.language;

    config.params = {
      ...config.params,
      lang: currentLang,
    };

    return config;
  },
  (error) => Promise.reject(error)
);

/* =======================
   Refresh logic helpers
======================= */
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

/* =======================
   Response interceptor
======================= */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // если нет ответа (например, сеть)
    if (!error.response) {
      return Promise.reject(error);
    }

    // access token протух
    if (error.response.status === 401 && !originalRequest._retry) {
      // если уже идет refresh — ставим запрос в очередь
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("refresh_token");

      // если refresh вообще нет
      if (!refreshToken) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${API_URL}/user/token/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = response.data.access;

        useAuthStore.getState().login(newAccessToken);

        api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem("refresh_token");
        useAuthStore.getState().logout();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
