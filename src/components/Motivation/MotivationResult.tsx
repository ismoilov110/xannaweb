import React from "react";

interface MotivationResultProps {
    imageSrc: string;
    advice: {
        appearance: string;
        health: string;
        vitamin: string;
        activity: string;
    };
}

const MotivationResult: React.FC<MotivationResultProps> = ({ imageSrc, advice }) => {
    return (
        <div className="w-full max-w-2xl mx-auto mt-8 flex flex-col md:flex-row gap-6 items-start md:items-center animate-fade-in-up">
            {/* Avatar Image */}
            <div className="relative shrink-0 mx-auto md:mx-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full p-1 bg-white shadow-lg border-2 border-[#F98CA1]/30">
                    <img
                        src={imageSrc}
                        alt="User upload"
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white px-3 py-1 rounded-full shadow-md text-xs font-medium text-[#8B5E5E] border border-pink-100">
                    Siz ✨
                </div>
            </div>

            {/* Speech Bubble / Card */}
            <div className="relative flex-1 bg-white/80 backdrop-blur-md p-6 rounded-2xl rounded-tl-none md:rounded-tl-2xl md:rounded-l-none shadow-[0_4px_20px_-2px_rgba(249,140,161,0.15)] border border-[#FDECEF]">
                <div className="space-y-3">
                    <div className="flex items-start gap-3">
                        <span className="text-xl shrink-0">💖</span>
                        <p className="text-sm text-[#5D4E50] leading-relaxed">
                            <span className="font-semibold text-[#8B5E5E]">Ko‘rinish:</span> {advice.appearance}
                        </p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-xl shrink-0">🌿</span>
                        <p className="text-sm text-[#5D4E50] leading-relaxed">
                            <span className="font-semibold text-[#8B5E5E]">Salomatlik:</span> {advice.health}
                        </p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-xl shrink-0">💊</span>
                        <p className="text-sm text-[#5D4E50] leading-relaxed">
                            <span className="font-semibold text-[#8B5E5E]">Vitamin:</span> {advice.vitamin}
                        </p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-xl shrink-0">🚶</span>
                        <p className="text-sm text-[#5D4E50] leading-relaxed">
                            <span className="font-semibold text-[#8B5E5E]">Faoliyat:</span> {advice.activity}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MotivationResult;
