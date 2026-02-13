import { create } from "zustand";
import { createOrderRequest } from "@/api/order/order";

export const useOrderStore = create((set) => ({
  loading: false,
  error: null,

  createOrder: async (data) => {
    try {
      set({ loading: true, error: null });

      const response = await createOrderRequest(data);

      set({ loading: false });

      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data || "Ошибка создания заказа",
      });
      throw error;
    }
  },
}));
