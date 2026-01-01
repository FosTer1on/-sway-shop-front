import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function PrivateRoute() {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
