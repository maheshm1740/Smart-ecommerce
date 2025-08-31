import axios from "axios";
import { jwtDecode } from "jwt-decode";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp && decoded.exp < now) {
        // token expired
        localStorage.removeItem("token");
        localStorage.removeItem("roles");
        // ⚠️ don’t redirect here, just reject
        return Promise.reject("Token expired");
      }

      config.headers.Authorization = `Bearer ${token}`;
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
      localStorage.removeItem("roles");
      return Promise.reject("Invalid token");
    }
  }

  return config;
});

export default axiosClient;
