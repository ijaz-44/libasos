import { api, handleApiError } from "@/lib/api";

export const catalogService = {
  getProducts: async (params = {}) => {
    try {
      const response = await api.get("/products", { params });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getProductBySlug: async (slug) => {
    try {
      const response = await api.get(`/products/${slug}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getCategories: async () => {
    try {
      const response = await api.get("/categories");
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};