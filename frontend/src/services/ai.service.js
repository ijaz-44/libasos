import { api, handleApiError } from "@/lib/api";

export const aiService = {
  getOutfitRecommendations: async (promptPayload) => {
    try {
      const response = await api.post("/ai/recommendations", promptPayload);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};