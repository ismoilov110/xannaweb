import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/Store";

/**
 * GuestGuard - Avtorizatsiyadan o'tgan foydalanuvchilarni 
 * login/register sahifalaridan /home ga yo'naltiradi.
 */
export default function GuestGuard() {
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const token = localStorage.getItem("access_token");

    // Agar foydalanuvchi tizimga kirgan bo'lsa (token bor va isAuth true), 
    // uni asosiy dashboardga (/home) yo'naltiramiz.
    if (token || isAuth) {
        return <Navigate to="/home" replace />;
    }

    // Aks holda (mehmon bo'lsa), so'ralgan sahifani ko'rsatamiz.
    return <Outlet />;
}
