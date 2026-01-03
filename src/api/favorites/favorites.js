import api from "@/api/base/client";

/**
 * Добавить товар в избранное
 * @param {string} slug
 */
export const addToFavorites = (slug) => {
  return api.post(`/favorites/add/${slug}/`);
};

/**
 * Получить все избранные товары
 */
export const getFavorites = () => {
  return api.get("/favorites/");
};

/**
 * Удалить товар из избранного
 * @param {string} slug
 */
export const removeFromFavorites = (slug) => {
  return api.delete(`/favorites/remove/${slug}/`);
};
