
import axiosClient from "./axiosApiClient";

export const loginApi = async (email, password) => {
  const response = await axiosClient.post("/auth/login", { email, password });
  return response.data; // { user, token }
};

export const registerApi = async (name, email, password) => {
  const response = await axiosClient.post("/auth/signup", { name, email, password });
  return response.data;
};

export const getCurrentUserApi = async () => {
  const response = await axiosClient.get("/auth/me");
  return response.data; // user object
};

export const logoutApi = async () => {
  const response = await axiosClient.post("/auth/logout");
  return response.data;
};
