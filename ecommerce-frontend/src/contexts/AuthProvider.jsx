import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { loginApi, getCurrentUserApi } from "../api/authApi";

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: null });

  const login = async (email, password) => {
    const { token } = await loginApi(email, password);
    localStorage.setItem("token", token);

    const user = await getCurrentUserApi();
    setAuth({ user, token });
  };

  const logout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getCurrentUserApi()
        .then((user) => setAuth({ user, token }))
        .catch(() => logout());
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
