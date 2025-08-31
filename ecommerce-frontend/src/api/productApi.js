import axiosClient from "./axiosApiClient"

export const getProduct=async()=>{
  const response=await(axiosClient.get("/product"));
  return response.data;
}

export const recomendationApi=async(userId)=>{
  const response=await(axiosClient.get(`/recommendation/${userId}`));
  return response.data;
}