import Footer from "@/components/Footer/Footer";
import Nav from "@/components/NavBar/Nav";
import GlobalBackground from "@/components/Layout/GlobalBackground";
import { Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
  const location = useLocation();

  const isChatPage = location.pathname.startsWith("/chat");
  const isGuestHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col relative text-slate-800">
      <GlobalBackground />

      {/* Nav chiqmasin GuestHome’da */}
      {!isGuestHome && <Nav />}

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer GuestHome’da chiqsin, lekin Chat’da chiqmasin */}
      {!isChatPage && <Footer />}

    </div>
  );
}
