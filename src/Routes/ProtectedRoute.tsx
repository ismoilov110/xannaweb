import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/Store";

export default function ProtectedRoute() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const token = localStorage.getItem("access_token");

  if (!token || !isAuth) {
    return <Navigate to="/register" replace />;
  }

  return <Outlet />;
}
