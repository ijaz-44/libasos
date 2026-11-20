import { api, handleApiError } from "@/lib/api";

export const orderService = {
  createOrder: async (orderPayload) => {
    try {
      const response = await api.post("/orders", orderPayload);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getOrderDetails: async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};