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
    },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });


export const getProductById = (slug) => api.get(`/catalog/products/${slug}/`);
