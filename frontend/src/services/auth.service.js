import { api, handleApiError } from "@/lib/api";
import { tokenManager } from "@/auth/tokenManager";

export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      if (response.data.accessToken) {
        tokenManager.setAccessToken(response.data.accessToken);
      }
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);
      if (response.data.accessToken) {
        tokenManager.setAccessToken(response.data.accessToken);
      }
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
      tokenManager.clearTokens();
    } catch (error) {
      tokenManager.clearTokens();
    }
  },

  getMe: async () => {
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};