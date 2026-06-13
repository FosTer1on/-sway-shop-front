import i18n from "@/i18n";
import { useAuthStore } from "@/store/auth/useAuthStore";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const requestId = crypto.randomUUID();

    config.headers["X-Request-ID"] = requestId;
    config.metadata = {
      startTime: performance.now(),
      requestId,
    };

    const { accessToken } = useAuthStore.getState();

    const token = accessToken || localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) promise.reject(error);
    else promise.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => {
    const duration = Math.round(
      performance.now() - response.config.metadata.startTime
    );

    const requestId = response.config.metadata.requestId;

    if (import.meta.env.DEV) {
      console.log("[api_success]", {
        request_id: requestId,
        method: response.config.method?.toUpperCase(),
        url: response.config.url,
        status: response.status,
        duration_ms: duration,
        duration_sec: `${(duration / 1000).toFixed(2)}s`,
      });
    }

    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    const duration = originalRequest?.metadata?.startTime
      ? Math.round(performance.now() - originalRequest.metadata.startTime)
      : null;

    if (import.meta.env.DEV) {
      console.error("[api_error]", {
        method: originalRequest?.method?.toUpperCase(),
        url: originalRequest?.url,
        status: error.response?.status,
        duration_ms: duration,
        duration_sec: duration ? `${(duration / 1000).toFixed(2)}s` : null,
        message: error.message,
      });
    }

    if (!error.response) return Promise.reject(error);

    if (error.response.status === 401 && !originalRequest._retry) {
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
        localStorage.removeItem("access_token");
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
