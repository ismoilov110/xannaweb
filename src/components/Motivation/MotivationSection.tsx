import React, { useEffect, useState } from "react";
import MotivationUploadCard from "./MotivationUploadCard";
import MotivationResult from "./MotivationResult";
import MotivationHistorySidebar from "./MotivationHistorySidebar";

import {
    getActiveStory,
    getStoryHistory,
    uploadStoryImage,
    type StoryPrompt,
} from "@/Services/Story/Story.services";


import { parseAIResponse, type Advice } from "@/utils/storyParser";

interface HistoryItem {
    date: string;
    timestamp: number;
    image: string; // URL
    advice: Advice;
    time_remaining_hours?: number;
}

const toHistoryItem = (s: StoryPrompt): HistoryItem => ({
    date: new Date(s.created_at).toLocaleDateString("uz-UZ", { day: "2-digit", month: "long" }),
    timestamp: new Date(s.created_at).getTime(),
    image: s.image,
    advice: parseAIResponse(s.ai_response),
    time_remaining_hours: s.time_remaining_hours,
});

const MotivationSection: React.FC = () => {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
    const [isTodayDone, setIsTodayDone] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [timeRemainingHours, setTimeRemainingHours] = useState<number | null>(null);

    const fetchAll = async () => {
        setLoading(true);
        setError(null);
        try {
            const [activeRes, histRes] = await Promise.all([
                getActiveStory(),
                getStoryHistory(),
            ]);

            // history
            const mappedHistory = (histRes.stories || []).map(toHistoryItem);
            setHistory(mappedHistory);

            // active story
            if (activeRes.has_story && activeRes.story) {
                const activeItem = toHistoryItem(activeRes.story);
                setSelectedItem(activeItem);
                setIsTodayDone(true);
                setTimeRemainingHours(activeRes.story.time_remaining_hours);
            } else {
                setIsTodayDone(false);
                setTimeRemainingHours(null);
            }
        } catch (e: any) {
            const msg =
                e?.response?.data?.error?.image?.[0] ||
                e?.response?.data?.message ||
                "Storylarni olishda xatolik bo‘ldi";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAll();
    }, []);

    const handleUpload = async (file: File) => {
        if (isTodayDone) return;

        // frontend validation
        if (file.size > 5 * 1024 * 1024) {
            setError("❌ Rasm hajmi 5MB dan oshmasligi kerak!");
            return;
        }
        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
            setError("❌ Faqat JPG, PNG, WEBP qabul qilinadi!");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const res = await uploadStoryImage(file);

            if (res.success && res.story) {
                const item = toHistoryItem(res.story);
                setSelectedItem(item);
                setIsTodayDone(true);
                setTimeRemainingHours(res.story.time_remaining_hours);

                // Re-fetch history to update sidebar
                const histRes = await getStoryHistory();
                setHistory((histRes.stories || []).map(toHistoryItem));
            } else {
                const msg =
                    res?.error?.image?.[0] ||
                    res?.message ||
                    "Uploadda xatolik yuz berdi";
                setError(msg);
            }
        } catch (e: any) {
            const msg =
                e?.response?.data?.error?.image?.[0] ||
                e?.response?.data?.message ||
                "Xatolik yuz berdi";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };


    return (
        <section className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FFF0F2] to-[#FDE7EB] pb-20 px-4">
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
                        history={history}
                        onSelect={(item) => setSelectedItem(item)}
                        activeDate={selectedItem?.date || null}
                    />

                    {/* Main Content */}
                    <main className="flex-1 w-full">
                        {!isTodayDone && !selectedItem && (
                            <div className="h-[400px] flex flex-col items-center justify-center bg-white/30 backdrop-blur-md rounded-[2.5rem] border border-white/50 shadow-inner">
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
                                                Bugungi limit tugadi
                                                {timeRemainingHours != null ? `, ${timeRemainingHours.toFixed(1)} soat qoldi` : ""} 🌸
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* If viewing history but haven't uploaded today yet */}
                        {!isTodayDone && selectedItem && (
                            <div className="mt-12 p-8 bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 text-center">
                                <h4 className="text-[#8B5E5E] font-serif text-xl mb-4">
                                    Bugungi rasmingizni hali yuklamadingiz
                                </h4>
                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="bg-[#F98CA1] text-white px-8 py-3 rounded-full hover:bg-[#ff7b94] transition-all shadow-lg hover:scale-105"
                                >
                                    Hozir yuklash 📸
                                </button>
                            </div>
                        )}

                        {error && (
                            <div className="mt-6 text-center text-sm text-red-600">
                                {error}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </section>
    );
};

export default MotivationSection;