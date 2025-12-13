import api from "../base/client";

export const getProducts = (params) =>
  api.get("/catalog/products/", { params });

export const getProductById = (slug) =>
  api.get(`/catalog/products/${slug}/`);
