import api from "./axios";

export const createOrder = (amount, token) => {
  return api.post(
    "/payment/order",
    { amount },
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    },
  );
};

export const verifyPayment = (paymentData, token) => {
  return api.post(
    "/payment/verify",
    paymentData,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    },
  );
};
