import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosApiClient";

const useAxiosInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const resInterceptor = axiosClient.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error.response?.status;

        if (status === 401) {
          console.warn("Unauthorized: Token might be invalid or expired");
          localStorage.removeItem("token");
          localStorage.removeItem("roles");
          navigate("/login", { replace: true });
        } else if (status === 403) {
          console.warn("Forbidden: Insufficient role permissions");
          navigate("/unauthorized");
        } else {
          console.error("API Error:", error.response || error.message);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosClient.interceptors.response.eject(resInterceptor);
    };
  }, [navigate]);
};

export default useAxiosInterceptor;
