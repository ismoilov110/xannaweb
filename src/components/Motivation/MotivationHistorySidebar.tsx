import React from "react";

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

interface MotivationHistorySidebarProps {
    history: HistoryItem[];
    onSelect: (item: HistoryItem) => void;
    activeDate: string | null;
}

const MotivationHistorySidebar: React.FC<MotivationHistorySidebarProps> = ({ history, onSelect, activeDate }) => {
    return (
        <aside className="w-full md:w-80 h-full flex flex-col gap-6 md:sticky md:top-24">
            <h3 className="text-xl font-serif text-[#8B5E5E] flex items-center gap-2">
                <span>📚</span> Motivatsiya tarixi
            </h3>

            {history.length === 0 ? (
                <div className="bg-white/40 backdrop-blur-md rounded-2xl p-8 text-center border border-white/50">
                    <p className="text-[#9A7F85] text-sm italic">
                        Hozircha tarix yo‘q. Bugun birinchi qadamingizni qo‘ying! ✨
                    </p>
                </div>
            ) : (
                <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto pb-4 md:pb-0 scrollbar-hide">
                    {history.map((item, idx) => (
                        <div
                            key={idx}
                            onClick={() => onSelect(item)}
                            className={`
                                shrink-0 w-64 md:w-full bg-white/60 backdrop-blur-sm p-3 rounded-2xl 
                                border transition-all duration-300 cursor-pointer
                                flex items-center gap-3
                                ${activeDate === item.date
                                    ? "border-[#F98CA1] shadow-md ring-1 ring-[#F98CA1]/30 bg-white/80"
                                    : "border-white/50 hover:bg-white/80 hover:shadow-sm"}
                            `}
                        >
                            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-pink-50">
                                <img src={item.image} alt={item.date} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs text-[#F98CA1] font-bold mb-0.5">
                                    {item.date}
                                </div>
                                <p className="text-xs text-[#5D4E50] line-clamp-1 italic">
                                    {item.advice.appearance}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </aside>
    );
};

export default MotivationHistorySidebar;
