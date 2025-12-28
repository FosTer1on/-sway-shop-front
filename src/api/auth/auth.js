import api from "@/api/base/client";

/**
 * Login
 */
export const login = (data) => {
  return api.post("/user/login/", data);
};

/**
 * Register
 */
export const register = (data) => {
  return api.post("/user/register/", data);
};

/**
 * Verify phone number
 */
export const verifyPhone = (data) => {
  return api.post("/user/verify/", data);
};

