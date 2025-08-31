import axiosClient from "./axiosApiClient";

export const getUserAddresses = async(userId)=>{
  const response=axiosClient.get(`/address/${userId}`);
  return response.data;
}

export const addUserAddress = async(userId, addressData)=>{
  const response = axiosClient.post(`/address/${userId}`, addressData);
  return response.data;
}

export const deleteUserAddress = async(userId, addressid)=>{
  const response = axiosClient.post(`/address/${userId}/${addressid}`);
  return response.data;
}