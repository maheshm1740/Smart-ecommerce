import axiosClient from "./axiosApiClient";

export const addToCart = async (productId, quantity = 1) => {
  const response = await axiosClient.post(`/cart/add?productId=${productId}&quantity=${quantity}`);
  return response.data;
};

export const getCart = async () => {
  const response = await axiosClient.get("/cart");
  return response.data;
};

export const updateCartItem = async (productId, quantity) => {
  const response = await axiosClient.put("/cart/update", { productId, quantity });
  return response.data;
};

export const removeFromCart = async (productId) => {
  const response = await axiosClient.delete(`/cart/remove/${productId}`);
  return response.data;
};

export const clearCart = async () => {
  const response = await axiosClient.delete("/cart/clear");
  return response.data;
};