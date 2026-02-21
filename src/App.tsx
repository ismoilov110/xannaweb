import { Route, Routes } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import ProtectedRoute from "@/Routes/ProtectedRoute";

// PAGES
import GuestHome from "@/Pages/GuestHome/GuestHome"; // statik landing
import Home from "./Pages/Home/Home";           // auth user home

import Subscribe from "./Pages/Subscribe/Subscribe";
import Contack from "./Pages/Contack/Contack";
import Blog from "./Pages/Blog/Blog";
import Chat from "./Pages/Chat/Chat";
import ChatCategory from "./components/Chat/ChatCategory";
import ProfilePage from "./Pages/Profile/ProfilePage";
import PaymentPage from "./Pages/Subscription/PaymentPage";
import Motivation from "./Pages/Motivation/Motivation";

import LogIn from "./Pages/Auth/LogIn";
import Register from "./Pages/Auth/Register";
import SubscriptionGuard from "./Routes/SubscriptionGuard";
import GuestGuard from "./Routes/GuestGuard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMeThunk } from "./features/User/User.thunks";
import type { RootState } from "./Store";
import { useLocation, useNavigate } from "react-router-dom";

export default function App() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  // Dastur yuklanganda foydalanuvchi ma'lumotlarini yuklaymiz
  useEffect(() => {
    // Agar foydalanuvchi isAuth bo'lsa va ism bo'sh bo'lsa (yoki har doim kirganda yangilash kerak bo'lsa)
    if (isAuth) {
      console.log("App.tsx: User is authenticated, fetching profile data...");
      dispatch(getMeThunk() as any);
    }
  }, [isAuth, dispatch]);

  // To'lovdan qaytgandagi URL parametrlarini tekshirish va tozalash
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentStatus = params.get("payment_status");
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (paymentStatus === "success" && accessToken && refreshToken) {
      console.log("App.tsx: Payment success detected, saving tokens...");
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);

      // Clean URL and reload to initialize Auth state
      window.history.replaceState({}, '', '/');
      window.location.reload();
      return;
    }

    if (params.get("payment_status") || params.get("token")) {
      console.log("App.tsx: Payment return detected, clearing params...");
      // Agar to'lovdan qaytgan bo'lsa, ma'lumotlarni qayta yuklash kerak bo'lishi mumkin
      if (isAuth) {
        dispatch(getMeThunk() as any);
      }
      navigate(location.pathname, { replace: true });
    }
  }, [location.search, isAuth, dispatch, navigate, location.pathname]);

  return (
    <Routes>
      {/* PUBLIC / GUEST */}
      <Route element={<GuestGuard />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<GuestHome />} />
        </Route>
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* PROTECTED */}
      <Route element={<ProtectedRoute />}>
        <Route path="/obuna-success" element={<PaymentPage />} />
        <Route
          element={
            <SubscriptionGuard>
              <MainLayout />
            </SubscriptionGuard>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/obuna" element={<Subscribe />} />
          <Route path="/kontentlar" element={<Contack />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:categoryId" element={<ChatCategory />} />
          <Route path="/profilepage" element={<ProfilePage />} />
          <Route path="/motivation" element={<Motivation />} />
        </Route>
      </Route>
    </Routes>
  );
}
