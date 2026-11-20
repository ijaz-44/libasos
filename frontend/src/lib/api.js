import axios from "axios";
import { tokenManager } from "@/auth/tokenManager";
import { getErrorMessage } from "@/lib/getErrorMessage";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export function handleApiError(error, fallbackMessage = "Something went wrong.") {
  throw new Error(getErrorMessage(error, fallbackMessage));
}

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    const token = tokenManager.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (
      error?.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/login") &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshRes = await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const nextToken =
          refreshRes?.data?.accessToken || refreshRes?.data?.data?.accessToken;

        if (!nextToken) {
          throw new Error("Session expired. Please sign in again.");
        }

        tokenManager.setAccessToken(nextToken);
        processQueue(null, nextToken);

        originalRequest.headers.Authorization = `Bearer ${nextToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        tokenManager.clearAccessToken();
        return Promise.reject(new Error(getErrorMessage(refreshError, "Session expired.")));
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(new Error(getErrorMessage(error)));
  }
);

export default api;