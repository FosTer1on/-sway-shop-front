import { create } from "zustand";
import {
  fetchCartRequest,
  updateCartItemRequest,
  deleteCartItemRequest,
  addToCartRequest,
} from "@/api/cart/cart";
import toast from "react-hot-toast";
import i18n from "@/i18n";

export const useCartStore = create((set, get) => ({
  items: [],
  summary: {
    items_total_price: "0",
    items_total_quantity: "0",
    total_with_service: "0",
  },
  loading: false,

  fetchCart: async () => {
    set({ loading: true });

    const { data } = await fetchCartRequest();

    set({
      items: data.items || [],
      summary: {
        items_total_price: data.items_total_price,
        items_total_quantity: data.items_total_quantity,
        total_with_service: data.total_with_service,
      },
      loading: false,
    });
  },

  addToCart: async ({ product, size }) => {
    await addToCartRequest({
      product,
      size,
      quantity: 1, // 👈 всегда 1
    });

    // после добавления — ПЕРЕЗАГРУЖАЕМ корзину
    await get().fetchCart();
  },

  updateItemQuantity: async (itemId, quantity) => {
    try {
      await updateCartItemRequest(itemId, quantity);
  
      toast.success(i18n.t("change_amount"));
  
      // перезапрашиваем корзину
      const { data } = await fetchCartRequest();
  
      set({
        items: data.items || [],
        summary: {
          items_total_price: data.items_total_price,
          items_total_quantity: data.items_total_quantity,
          total_with_service: data.total_with_service,
        },
      });
    } catch (err) {
      // 400 — показываем текст от сервера
      const status = err?.response?.status;
  
      if (status === 400) {
        const msg =
          err?.response?.data?.detail || i18n.t("max_amount_reached");
        toast.error(msg);
        return;
      }
  
      // остальные ошибки
      toast.error(i18n.t("something_went_wrong"));
      throw err; // чтобы не скрывать баги
    }
  },

  removeItem: async (itemId) => {
    await deleteCartItemRequest(itemId);

    const { data } = await fetchCartRequest();

    set({
      items: data.items || [],
      summary: {
        items_total_price: data.items_total_price,
        items_total_quantity: data.items_total_quantity,
        total_with_service: data.total_with_service,
      },
    });
  },

  isInCart: (productSlug, sizeId) => {
    return get().items.some(
      (item) =>
        item.product.slug === productSlug &&
        item.size_id === sizeId
    );
  },  
}));
