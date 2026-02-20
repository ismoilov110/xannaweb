import React, { useState } from "react";
import MotivationUploadCard from "./MotivationUploadCard";
import MotivationResult from "./MotivationResult";
import MotivationHistorySidebar from "./MotivationHistorySidebar";

// Types
interface Advice {
    appearance: string;
    health: string;
    vitamin: string;
    activity: string;
}

interface HistoryItem {
    date: string;
    timestamp: number;
    image: string; // base64
    advice: Advice;
}

// Mock Advice Generator
const MOCK_ADVICES: Advice[] = [
    {
        appearance: "Ko‘zlariningiz porlab turibdi, bugun juda energiyaga to‘lasiz!",
        health: "Iliq suv va limon bilan boshlangan tong sizga yanada kuch beradi.",
        vitamin: "D3 vitamini (quyosh nuri yetishmasa)",
        activity: "Yengil 20 daqiqalik gimnastika."
    },
    {
        appearance: "Yuzingizda tabassum — bu sizning eng chiroyli bezagingiz!",
        health: "Yashil choy va quritilgan mevalar bilan tanovul qiling.",
        vitamin: "Magniy B6 (tinchlanish uchun)",
        activity: "Kechki payt 30 daqiqa sayr qilish."
    },
    {
        appearance: "Bugun kiyinishingiz juda nafis, bu sizga bo‘lgan ishonchni oshiradi.",
        health: "Meva va sabzavotlarga boy parhez sizni yanada tiniqlashtiradi.",
        vitamin: "Omega-3 (sog‘lom soch va teri uchun)",
        activity: "8000 qadam masofani bosib o‘tish."
    }
];

const getRandomAdvice = () => MOCK_ADVICES[Math.floor(Math.random() * MOCK_ADVICES.length)];

const MotivationSection: React.FC = () => {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
    const [isTodayDone, setIsTodayDone] = useState(false);



    const handleUpload = (file: File) => {
        if (isTodayDone) return;
        setLoading(true);

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;

            setTimeout(() => {
                const advice = getRandomAdvice();
                const now = new Date();
                const dateStr = now.toLocaleDateString("uz-UZ", { day: 'numeric', month: 'long' });

                const newItem: HistoryItem = {
                    date: dateStr,
                    timestamp: Date.now(),
                    image: base64,
                    advice,
                };

                const newHistory = [newItem, ...history];
                setHistory(newHistory);
                setSelectedItem(newItem);
                setIsTodayDone(true);
                localStorage.setItem("motivation_history", JSON.stringify(newHistory));
                setLoading(false);
            }, 2000);
        };
        reader.readAsDataURL(file);
    };

    return (
        <section className="min-h-screen bg-linear-to-br from-[#FFF5F7] via-[#FFF0F2] to-[#FDE7EB] pb-20 px-4">
            <div className="max-w-7xl mx-auto pt-10">
                {/* Header */}
                <header className="text-center mb-16 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-serif text-[#8B5E5E] mb-4">
                        ✨ Kunlik Motivatsiya
                    </h2>
                    <p className="text-[#9A7F85] max-w-md mx-auto">
                        Har kuni bir dona rasm yuklang va AI tomonidan taqdim etilgan maxsus maslahatlarni qabul qiling.
                    </p>
                </header>

                <div className="flex flex-col md:flex-row gap-10 items-start">
                    {/* Sidebar: History */}
                    <MotivationHistorySidebar
                        onSelect={(item: HistoryItem ) => setSelectedItem(item)}

                        history={history}
                        activeDate={selectedItem?.date || null}
                    />

                    {/* Main Content */}
                    <main className="flex-1 w-full">
                        {!isTodayDone && !selectedItem && (
                            <div className="h-100 flex flex-col items-center justify-center bg-white/30 backdrop-blur-md rounded-[2.5rem] border border-white/50 shadow-inner">
                                <MotivationUploadCard onUpload={handleUpload} disabled={loading} />
                                {loading && (
                                    <div className="mt-8 flex flex-col items-center gap-3">
                                        <div className="w-12 h-12 border-4 border-[#F98CA1]/30 border-t-[#F98CA1] rounded-full animate-spin"></div>
                                        <p className="text-[#F98CA1] font-medium animate-pulse text-sm">
                                            Rasm tahlil qilinmoqda... 🌸
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {selectedItem && (
                            <div className="animate-fade-in space-y-8">
                                <MotivationResult
                                    imageSrc={selectedItem.image}
                                    advice={selectedItem.advice}
                                    date={selectedItem.date}
                                />

                                {isTodayDone && (
                                    <div className="flex justify-center">
                                        <div className="bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full border border-pink-100 shadow-sm flex items-center gap-3">
                                            <span className="text-pink-400">✅</span>
                                            <p className="text-[#8B5E5E] text-sm font-medium">
                                                Bugungi limit tugadi, ertaga yana yuklaysiz
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* If viewing history but haven't uploaded today yet */}
                        {!isTodayDone && selectedItem && (
                            <div className="mt-12 p-8 bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 text-center">
                                <h4 className="text-[#8B5E5E] font-serif text-xl mb-4">Bugungi rasmingizni hali yuklamadingiz</h4>
                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="bg-[#F98CA1] text-white px-8 py-3 rounded-full hover:bg-[#ff7b94] transition-all shadow-lg hover:scale-105"
                                >
                                    Hozir yuklash 📸
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </section>
    );
};

export default MotivationSection;
