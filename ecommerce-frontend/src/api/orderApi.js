import axiosClient from "./axiosApiClient";

export const placeOrder = async (userId) => {
  const response= await axiosClient.post(`order/place`, null, { params: { userId } });

  return response.data;
};

export const getUserOrders = async (userId) => {
  const response = await axiosClient.get(`/order/${userId}`);
  return response.data;
};
