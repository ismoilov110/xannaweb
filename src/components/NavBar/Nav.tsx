import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavLink } from "@/constants/Data";
import { styles } from "@/Styles/Styles";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import Logo from "../Logo/Logo";
import { useSelector } from "react-redux";
import type { RootState } from "@/Store";
import AvatarDropdown from "./AvatarDropdown";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuth } = useSelector((state: RootState) => state.auth);

  return (
    <nav className="fixed top-0 left-0 right-0 z-20 bg-[#FFFFFF] backdrop-blur-md border-b border-[#F3D3DA]">
      <div className={styles.container}>
        <div className="flex h-16 items-center justify-between">


          {/* Logo */}
          <Link to="/home" className="flex items-center">
            <Logo />
          </Link>


          {/* Desktop Navigation */}
          <ul className="hidden md:flex  items-center space-x-2">
            {NavLink.map(({ id, title, href }) => (
              <li key={id}>
                <Link
                  to={href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${location.pathname === href
                    ? "bg-[#FDE6EC] text-[#F28BA8]"
                    : "text-[#8C6F76] hover:text-[#3A2B2F] hover:bg-[#FDE6EC]"
                    }`}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side */}
          <div className="flex items-center space-x-3">

            {isAuth ? (
              <AvatarDropdown />
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Button variant="ghost" asChild className="rounded-full text-[#3A2B2F]">
                  <Link to="/login">Kirish</Link>
                </Button>

                <Button
                  asChild
                  className="rounded-full bg-[#F28BA8] text-white hover:bg-[#F7A1B5]"
                >
                  <Link to="/register">Ro'yxatdan o'tish</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <ul className="md:hidden mt-3 flex flex-col gap-2 pb-4">
            {NavLink.map(({ id, title, href }) => (
              <li key={id}>
                <Link
                  to={href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 rounded-full text-sm font-medium transition-all ${location.pathname === href
                    ? "bg-[#FDE6EC] text-[#F28BA8]"
                    : "text-[#8C6F76] hover:text-[#3A2B2F] hover:bg-[#FDE6EC]"
                    }`}
                >
                  {title}
                </Link>
              </li>
            ))}

            {/* Mobile Auth Buttons */}
            {!isAuth && (
              <div className="flex flex-col gap-2 mt-2 px-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2 rounded-full text-[#3A2B2F] bg-gray-50 border border-gray-100"
                >
                  Kirish
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2 rounded-full bg-[#F28BA8] text-white"
                >
                  Ro'yxatdan o'tish
                </Link>
              </div>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
}
