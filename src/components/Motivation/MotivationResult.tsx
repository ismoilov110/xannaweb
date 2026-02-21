import React from "react";

interface MotivationResultProps {
    imageSrc: string;
    advice: {
        appearance: string;
        health: string;
        vitamin: string;
        activity: string;
    };
    date?: string;
}

const MotivationResult: React.FC<MotivationResultProps> = ({ imageSrc, advice, date }) => {
    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 animate-fade-in-up">
            {/* Today's Highlight */}
            <div className="bg-white/40 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] border border-white/60 shadow-xl shadow-pink-200/20">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                    {/* User Image */}
                    <div className="relative shrink-0">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1.5 bg-gradient-to-tr from-[#F98CA1] to-white shadow-lg">
                            <img
                                src={imageSrc}
                                alt="Daily progress"
                                className="w-full h-full rounded-full object-cover border-4 border-white"
                            />
                        </div>
                        <div className="absolute -bottom-2 right-4 bg-[#F98CA1] text-white px-4 py-1 rounded-full text-xs font-bold shadow-md">
                            {date || "Bugun"} ✨
                        </div>
                    </div>

                    {/* Quick Motivation */}
                    <div className="flex-1">
                        <h3 className="text-2xl font-serif text-[#8B5E5E] mb-3">AI Motivatsiya</h3>
                        <p className="text-[#5D4E50] text-lg leading-relaxed italic">
                            "{advice.appearance}"
                        </p>
                    </div>
                </div>

                {/* Detailed Advice Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                    {/* Health */}
                    <div className="bg-white/60 p-4 rounded-2xl border border-white/50 flex items-start gap-4 hover:shadow-sm transition-all">
                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0 border border-green-100">
                            <span className="text-xl">🌿</span>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-[#8B5E5E] uppercase tracking-wider mb-1">Salomatlik</h4>
                            <p className="text-sm text-[#5D4E50]">{advice.health}</p>
                        </div>
                    </div>

                    {/* Vitamin */}
                    <div className="bg-white/60 p-4 rounded-2xl border border-white/50 flex items-start gap-4 hover:shadow-sm transition-all">
                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100">
                            <span className="text-xl">💊</span>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-[#8B5E5E] uppercase tracking-wider mb-1">Vitamin</h4>
                            <p className="text-sm text-[#5D4E50]">{advice.vitamin}</p>
                        </div>
                    </div>

                    {/* Activity */}
                    <div className="bg-white/60 p-4 rounded-2xl border border-white/50 flex items-start gap-4 hover:shadow-sm transition-all">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                            <span className="text-xl">🚶</span>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-[#8B5E5E] uppercase tracking-wider mb-1">Faoliyat</h4>
                            <p className="text-sm text-[#5D4E50]">{advice.activity}</p>
                        </div>
                    </div>

                    {/* Advice / Tip */}
                    <div className="bg-white/60 p-4 rounded-2xl border border-white/50 flex items-start gap-4 hover:shadow-sm transition-all">
                        <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center shrink-0 border border-pink-100">
                            <span className="text-xl">❤️</span>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-[#8B5E5E] uppercase tracking-wider mb-1">Maslahat</h4>
                            <p className="text-sm text-[#5D4E50]">{advice.health || advice.activity}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MotivationResult;
