import React, { useEffect, useRef, useState } from 'react';
import { gsap } from "gsap";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/Store';
import { getDailyMotivationThunk } from '@/Reducer/MotivationSlice';
import { Instagram, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

const HeaderBanner: React.FC = () => {
    const comp = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();

    // Redux store'dan motivation gaplarini olamiz
    const { messages, status } = useSelector((state: RootState) => state.motivation);


    // Agar backenddan gaplar kelmagan bo'lsa, default gaplar
    const defaultMessages = [
        "Bugun o'zingni tanla ✨",
        "Bugun sen juda nafis ko'rinyapsan 💕",
        "Bugun D vitaminini ichishni unutmang ☀️",
        "Bugun o'zingga vaqt ajrat 🌸",
        "Sen kuchli va go'zalsan 💪",
        "Bugun yangi narsalar o'rgan 📚",
    ];

    const STORAGE_KEY = "daily_motivation_time";


    const displayMessages = messages.length > 0 ? messages : defaultMessages;

    // API dan ma'lumotlarni olish
    useEffect(() => {
        // Agar allaqachon yuklangan bo'lsa (hatto bo'sh bo'lsa ham) yoki yuklanayotgan bo'lsa, qayta so'rov yubormaymiz
        if (status !== "idle") return;

        const token = localStorage.getItem("access_token");
        if (!token) {
            console.log("DAILY MOTIVATION: Token topilmadi");
            return;
        }

        console.log("DAILY MOTIVATION: Fetching...");
        dispatch(getDailyMotivationThunk())
            .unwrap()
            .then((data) => {
                console.log("DAILY MOTIVATION SUCCESS (Normalized):", data);
                localStorage.setItem(STORAGE_KEY, String(Date.now()));
            })
            .catch((e) => {
                console.error("DAILY MOTIVATION ERROR:", e);
            });
    }, [dispatch, status]);

    // messages uzunligi o‘zgarsa index 0 ga qaytsin
    useEffect(() => {
        setCurrentIndex(0);
    }, [displayMessages.length]);

    // Aylanib turishi
    useEffect(() => {
        if (displayMessages.length <= 1) return;

        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % displayMessages.length);
                setIsAnimating(false);
            }, 500);
        }, 8000);

        return () => clearInterval(interval);
    }, [displayMessages.length]);


    useEffect(() => {
        // Scope animations to this component only
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.from('.header-badge', {
                y: -30,
                opacity: 0,
                duration: 0.8,
            })
                .from('.header-heading', {
                    y: 60,
                    opacity: 0,
                    duration: 0.8,
                }, '-=0.6')
                .from('.header-card', {
                    scale: 0.95,
                    opacity: 0,
                    duration: 0.8,
                }, '-=0.6')
                .from('.header-btn', {
                    y: 20,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.6,
                }, '-=0.4')
                .from('.header-stats', {
                    opacity: 0,
                    duration: 1,
                }, '-=0.2');

        }, comp);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={comp}
            className="relative w-full min-h-screen bg-gradient-to-b from-[#FFF1F2] to-[#FDE2E8] flex flex-col items-center justify-center px-4 py-12 text-[#3F2A2A]  font-sans overflow-hidden"
        >
            {/* Badge */}
            <div className="header-badge mb-8 z-10 inline-flex mt-20 items-center gap-2 bg-white/60 backdrop-blur-sm px-6 py-2 rounded-full border  border-white/50 shadow-sm">
                <span className="text-[#F43F5E]">✨</span>
                <span className="text-sm font-medium text-[#3F2A2A]/80">XANNA bilan shaxsiy maslahatchi</span>
            </div>

            {/* Heading */}
            <h1 className="header-heading mt-2 text-4xl md:text-6xl lg:text-7xl font-serif text-center leading-[1.1] mb-12 max-w-4xl tracking-tight">
                Ayollar uchun <span className="text-[#FDA4AF] italic">shaxsiy XANNA</span> <br className="hidden md:block" />
                maslahatchingiz
            </h1>

            {/* Card */}
            <div className="header-card w-full max-w-2xl bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_40px_-15px_rgba(244,63,94,0.15)] mb-12 text-center relative z-10 mx-auto">
                <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FDA4AF]"></div>
                    <span className="uppercase text-xs font-bold tracking-widest text-[#FDA4AF]">Bugungi Maslahat</span>
                </div>
                <p className={`text-2xl md:text-4xl font-serif text-[#3F2A2A] transition-all duration-500 ${isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}

                >
                    {displayMessages[currentIndex]}
                </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full justify-center">
                <button onClick={() => navigate("/motivation")} className="header-btn cursor-pointer w-full sm:w-auto px-8 py-4 bg-[#F43F5E] text-white rounded-full font-medium hover:bg-[#e11d48] transition-colors shadow-lg shadow-[#F43F5E]/25 text-lg min-w-[160px]">
                    Kunlik motivatsiya
                </button>
                <button onClick={() => navigate("/kontentlar")} className="header-btn cursor-pointer w-full sm:w-auto px-8 py-4 bg-white text-[#3F2A2A] rounded-full font-medium hover:bg-gray-50 transition-colors shadow-sm text-lg border border-transparent hover:border-gray-200 min-w-[160px]">
                    Kontentlarni ko'rish
                </button>
            </div>

            {/* Stats */}
            <div className="header-stats flex items-center gap-8 md:gap-12 opacity-80">
                <div className="text-center flex space-x-2">
                    <Link className="flex items-center justify-center w-12 h-12 rounded-full bg-[#FFFFFF] shodow-md border border-border/50 text-[#8C6F76] hover:text-[#F28BA8] hover:shadow-md hover:-translate-y-1 transition-all durtion-300" to={"https://www.instagram.com/lookmebyxanna?igsh=amVocHY4YmVzYmdx"}>
                        <Instagram className={cn("h-5 w-5")} />
                    </Link>
                    <div className="w-px h-8 bg-[#3F2A2A]/10"></div>
                    <Link className="flex items-center justify-center w-12 h-12 rounded-full bg-[#FFFFFF] shodow-md border border-border/50 text-[#8C6F76] hover:text-[#F28BA8] hover:shadow-md hover:-translate-y-1 transition-all durtion-300" to={"https://t.me/lookmebyxanna"}>
                        <Send className={cn("h-5 w-5")} />
                    </Link>
                </div>

            </div>
            <div className='mt-4 text-center'>
                <p className='text-sm md:text-md  font-serif text-[#3F2A2A]'>obuna bo'lish majburiy</p>
            </div>
        </div>
    );
};

export default HeaderBanner;
