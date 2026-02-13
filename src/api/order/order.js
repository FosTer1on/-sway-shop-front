import api from "@/api/base/client";

export const createOrderRequest = async ({
  full_name,
  phone_number,
  telegram_username,
}) => {
  return api.post("/order/create/", {
    payment_method: "cash",
    address: telegram_username, // вместо адреса
    full_name,
    phone_number,
  });
};
