import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const roles = JSON.parse(localStorage.getItem("roles")) || [];

  if (!token) return <Navigate to="/login" replace />;

  const hasRole = roles.some(role => allowedRoles.includes(role));
  if (!hasRole) return <Navigate to="/unauthorized" replace />;

  return children;
};

export default ProtectedRoute;