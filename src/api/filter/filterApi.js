import api from "@/api/base/client";

export const getStores = () => api.get("/catalog/stores/");
export const getBrands = () => api.get("/catalog/brands/");
export const getCategories = () => api.get("/catalog/categories/");
export const getSizesByCategory = (slug) =>
  api.get(`/catalog/categories/${slug}/sizes/`);
