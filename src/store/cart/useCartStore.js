import { create } from "zustand";
import {
  fetchCartRequest,
  updateCartItemRequest,
  deleteCartItemRequest,
  addToCartRequest,
} from "@/api/cart/cart";

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
    await updateCartItemRequest(itemId, quantity);

    // 🔥 ВСЕГДА перезапрашиваем корзину
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
