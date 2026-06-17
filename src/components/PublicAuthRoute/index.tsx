import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store";

export const PublicAuthRoute = () => {
  const { isAuth, user } = useAuthStore();

  if (!isAuth) return null;
  if (user) return <Navigate replace to="/dashboard" />;

  return <Outlet />;
};
