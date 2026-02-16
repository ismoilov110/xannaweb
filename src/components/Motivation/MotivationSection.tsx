import React, { useEffect, useState } from "react";
import MotivationUploadCard from "./MotivationUploadCard";
import MotivationResult from "./MotivationResult";

// Types
interface Advice {
    appearance: string;
    health: string;
    vitamin: string;
    activity: string;
}

interface HistoryItem {
    date: string;
    image: string; // base64
    advice: Advice;
}

// Mock Advice Generator
const MOCK_ADVICES: Advice[] = [
    {
        appearance: "Bugun yuzingiz tiniq, lekin ko‘zlaringizda biroz charchoq bor.",
        health: "Ko‘proq suv iching va ekran qarshisida kamroq o‘tiring.",
        vitamin: "Vitamin C va Magniy (kechki payt)",
        activity: "15 daqiqa toza havoda sayr qilish tavsiya etiladi."
    },
    {
        appearance: "Kayfiyatingiz a’lo, tabassumingiz ham buni tasdiqlayapti!",
        health: "Immunitetni mustahkamlash uchun mevalar yeng.",
        vitamin: "Vitamin D3 (ertalab)",
        activity: "Yoga yoki yengil cho‘zish mashqlari."
    },
    {
        appearance: "Kiyinish uslubingiz bugun juda yarashibdi.",
        health: "Uyqu rejimini joyiga qo‘yishga harakat qiling.",
        vitamin: "Omega-3 (tushlik payti)",
        activity: "5000 qadam yurish."
    }
];

const getRandomAdvice = () => MOCK_ADVICES[Math.floor(Math.random() * MOCK_ADVICES.length)];

const MotivationSection: React.FC = () => {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [todayItem, setTodayItem] = useState<HistoryItem | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Load from localStorage
        const stored = localStorage.getItem("motivation_history");
        if (stored) {
            try {
                const parsed: HistoryItem[] = JSON.parse(stored);
                setHistory(parsed);

                // Check for today's upload
                const todayStr = new Date().toISOString().split("T")[0];
                const today = parsed.find((item) => item.date === todayStr);
                if (today) {
                    setTodayItem(today);
                }
            } catch (e) {
                console.error("Failed to parse history", e);
            }
        }
    }, []);

    const handleUpload = (file: File) => {
        setLoading(true);

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;

            // Simulate API delay
            setTimeout(() => {
                const advice = getRandomAdvice();
                const todayStr = new Date().toISOString().split("T")[0];

                const newItem: HistoryItem = {
                    date: todayStr,
                    image: base64,
                    advice,
                };

                const newHistory = [newItem, ...history];
                setHistory(newHistory);
                setTodayItem(newItem);
                localStorage.setItem("motivation_history", JSON.stringify(newHistory));
                setLoading(false);
            }, 1500);
        };
        reader.readAsDataURL(file);
    };

    return (
        <section className="relative py-20 px-4 md:px-8 max-w-5xl mx-auto min-h-screen flex flex-col items-center">
            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-serif text-[#8B5E5E] text-center mb-8 drop-shadow-sm">
                ✨ Kunlik motivatsiya
            </h2>

            {/* Main Action Area */}
            <div className="w-full mb-12">
                {!todayItem ? (
                    <>
                        <MotivationUploadCard onUpload={handleUpload} disabled={loading} />
                        {loading && (
                            <div className="mt-4 text-center text-[#F98CA1] animate-pulse">
                                Rasm tahlil qilinmoqda... 🌸
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center animate-fade-in">
                        <MotivationUploadCard onUpload={() => { }} disabled={true} />
                        <div className="mt-6">
                            <p className="text-[#8B5E5E] bg-white/50 inline-block px-4 py-2 rounded-full border border-pink-100 shadow-sm">
                                Bugun rasm yuklangan ✅ Ertaga yana yuklashingiz mumkin
                            </p>
                            <MotivationResult imageSrc={todayItem.image} advice={todayItem.advice} />
                        </div>
                    </div>
                )}
            </div>

            {/* History Section - Carousel/Scroll style */}
            <div className="w-full mt-10">
                <h3 className="text-xl font-medium text-[#8B5E5E] mb-6 pl-2 border-l-4 border-[#F98CA1]">
                    Motivatsiya tarixi
                </h3>

                {history.length === 0 ? (
                    <p className="text-center text-gray-400 italic py-10 bg-white/30 rounded-xl border border-dashed border-gray-300">
                        Hozircha tarix yo‘q. Bugungi rasmingizni yuklang!
                    </p>
                ) : (
                    <div className="flex gap-4 overflow-x-auto pb-6 px-2 snap-x scrollbar-hide">
                        {history.map((item, idx) => (
                            <div
                                key={idx}
                                className="snap-center shrink-0 w-64 bg-white/70 backdrop-blur-sm p-3 rounded-2xl shadow-sm border border-white hover:shadow-md transition-all"
                            >
                                <div className="h-40 rounded-xl overflow-hidden mb-3 bg-gray-100">
                                    <img src={item.image} alt={item.date} className="w-full h-full object-cover" />
                                </div>
                                <div className="text-xs text-[#9A7F85] font-medium mb-1">
                                    📅 {item.date}
                                </div>
                                <p className="text-sm text-[#5D4E50] line-clamp-3 leading-snug">
                                    {item.advice.appearance}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default MotivationSection;
