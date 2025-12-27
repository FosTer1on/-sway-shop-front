import api from "@/api/base/client";

/**
 * Login
 * @param {Object} data
 * @param {string} data.phone_number
 * @param {string} data.password
 */
export const login = (data) => {
  return api.post("/user/login/", data);
};
