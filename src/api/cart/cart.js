import api from "@/api/base/client";


// Получить всю корзину
export const fetchCartRequest = () => {
  return api.get("/cart/");
};

// Добавить товар в корзину
export const addToCartRequest = ({ product, size, quantity }) => {
  console.log({
    product,
    size,
    quantity,
  });
  return api.post("/cart/add/", {
    product,
    size,
    quantity,
  });
};

// Обновить количество
export const updateCartItemRequest = (itemId, quantity) => {
  return api.post("/cart/item/update/", {
    item_id: itemId,
    quantity,
  });
};

// Удалить товар
export const deleteCartItemRequest = (itemId) => {
  return api.delete(`/cart/item/delete/${itemId}/`);
};
