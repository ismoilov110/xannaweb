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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMeThunk } from "./features/User/User.thunks";
import type { RootState } from "./Store";

export default function App() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state: RootState) => state.auth);

  // Dastur yuklanganda, agar foydalanuvchi tizimga kirgan bo'lsa,
  // uning profil ma'lumotlarini (obuna holatini ham) yuklaymiz
  useEffect(() => {
    if (isAuth) {
      dispatch(getMeThunk() as any);
    }
  }, [isAuth, dispatch]);

  return (
    <Routes>
      {/* PUBLIC / GUEST */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<GuestHome />} />
      </Route>
      <Route path="/login" element={<LogIn />} />
      <Route path="/register" element={<Register />} />

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
          <Route path="/chat/:category" element={<ChatCategory />} />
          <Route path="/profilepage" element={<ProfilePage />} />
          <Route path="/motivation" element={<Motivation />} />
        </Route>
      </Route>
    </Routes>
  );
}
