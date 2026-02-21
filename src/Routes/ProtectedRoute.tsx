import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("access_token");

  // Agar Reduxda isAuth false bo'lsa, lekin tokenda bor bo'lsa, 
  // bu reload paytida bo'lishi mumkin. redundant isAuth check.
  if (!token) {
    return <Navigate to="/register" replace />;
  }

  return <Outlet />;
}
