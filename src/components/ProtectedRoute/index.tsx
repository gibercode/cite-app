import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store";

export const ProtectedRoute = () => {
  const location = useLocation();
  const { isAuth, user } = useAuthStore();

  if (!isAuth) return null;

  if (!user) {
    return <Navigate replace state={{ from: location }} to="/login" />;
  }

  return <Outlet />;
};
