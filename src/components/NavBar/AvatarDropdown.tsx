import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/Store';
import { logout } from '@/Reducer/AuthSlice';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, LogOut } from 'lucide-react';
import gsap from 'gsap';

export default function AvatarDropdown() {
    const dispatch = useDispatch();
    const { userData } = useSelector((state: RootState) => state.profile);
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const handleLogout = () => {
        dispatch(logout());
        closeDropdown();
        // Redirect logic should be handled by the parent or router protection, 
        // but for now we just clear state.
        window.location.reload(); // Simple reload to clear state effectively for now
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                closeDropdown();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isOpen && contentRef.current) {
            gsap.fromTo(contentRef.current,
                { opacity: 0, scale: 0.95, y: -10 },
                { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power2.out' }
            );
        }
    }, [isOpen]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="relative cursor-pointer h-10 w-10 rounded-full focus:outline-none transition-transform active:scale-95"
            >
                <Avatar className="h-10 w-10 border border-[#F3D3DA]">
                    <AvatarImage src={userData?.avatar} alt={userData?.name || "User"} className="object-cover" />
                    <AvatarFallback className="bg-[#FDE6EC] text-[#F28BA8] font-medium">
                        {userData?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                </Avatar>
            </button>

            {isOpen && (
                <div
                    ref={contentRef}
                    className="absolute right-0 mt-2 w-48 bg-white border border-[#F3D3DA] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] py-1 z-50 origin-top-right overflow-hidden"
                >
                    <Link
                        to="/profilepage"
                        onClick={closeDropdown}
                        className="flex items-center px-4 py-3 text-sm text-[#2E2E2E] hover:bg-[#FFF0F3] transition-colors"
                    >
                        <User className="mr-3 h-4 w-4 text-[#F98CA1]" />
                        Profil
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-3 text-sm text-[#E11D48] hover:bg-[#FFF0F3] transition-colors text-left"
                    >
                        <LogOut className="mr-3 h-4 w-4" />
                        Chiqish
                    </button>
                </div>
            )}
        </div>
    );
}
