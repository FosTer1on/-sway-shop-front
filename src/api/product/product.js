import api from "../base/client";

import qs from "qs";

export const getProducts = (params) =>
  api.get("/catalog/products/", {
    params: {
      page: params.page,
      category: params.category || undefined,

      store: params.stores.length ? params.stores : undefined,
      brand: params.brands.length ? params.brands : undefined,
      size: params.sizes.length ? params.sizes : undefined,

      min_price: params.minPrice || undefined,
      max_price: params.maxPrice || undefined,
      discount: params.discountOnly ? "true" : undefined,

      order_by: params.sort || undefined,
      region: params.region || undefined,
      gender: params.gender || undefined,
    },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });

export const getProductById = (slug) => api.get(`/catalog/products/${slug}/`);

export const getOutfits = (params) =>
  api.get("/catalog/outfits/", {
    params: {
      page: params.page,
      min_price: params.minPrice || undefined,
      max_price: params.maxPrice || undefined,
      discount: params.discountOnly ? "true" : undefined,
      order_by: params.sort || undefined,
      gender: params.gender || undefined,
    },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });

export const getOutfitBySlug = (slug) => api.get(`/catalog/outfits/${slug}/`);
