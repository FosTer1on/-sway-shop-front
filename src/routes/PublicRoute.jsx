// src/routes/PublicRoute.jsx
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const isAuth = !!localStorage.getItem("access_token");

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
}
