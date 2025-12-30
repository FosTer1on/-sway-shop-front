import api from "@/api/base/client";

/**
 * Login
 */
export const loginAPI = (data) => {
  return api.post("/user/login/", data);
};

/**
 * Register
 */
export const registerAPI = (data) => {
  return api.post("/user/register/", data);
};

/**
 * Verify phone number
 */
export const verifyPhoneAPI = (data) => {
  return api.post("/user/verify/", data);
};

