import React, { useRef } from "react";

interface MotivationUploadCardProps {
    onUpload: (file: File) => void;
    disabled?: boolean;
}

const MotivationUploadCard: React.FC<MotivationUploadCardProps> = ({ onUpload, disabled }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleCardClick = () => {
        if (!disabled && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onUpload(file);
        }
    };

    return (
        <div
            onClick={handleCardClick}
            className={`
        relative w-full max-w-md mx-auto
        flex items-center gap-4 p-4
        bg-gradient-to-br from-white to-[#FFF0F5]
        rounded-2xl shadow-[0_10px_30px_-5px_rgba(253,164,175,0.3)]
        border border-white/50
        transition-all duration-300
        ${disabled ? "opacity-70 cursor-not-allowed grayscale-[0.3]" : "cursor-pointer hover:shadow-[0_15px_35px_-5px_rgba(253,164,175,0.4)] hover:scale-[1.02] active:scale-[0.98]"}
      `}
        >
            {/* Hidden Input */}
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                disabled={disabled}
            />

            {/* Circle Upload Area */}
            <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-inner border border-[#FAD1DC]">
                    <span className="text-3xl filter drop-shadow-sm">📷</span>
                </div>

                {/* Floating Badge */}
                {!disabled && (
                    <div className="absolute bottom-0 right-0 w-7 h-7 bg-[#F98CA1] rounded-full flex items-center justify-center text-white shadow-md border-2 border-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Text Content */}
            <div className="flex-1 text-left">
                <h3 className="text-[#8B5E5E] font-semibold text-sm sm:text-base leading-tight">
                    Bugungi rasmimgizni yuklang va motivatsiya oling 🌸
                </h3>
                <p className="text-[#9A7F85] text-xs mt-1">
                    {disabled ? "Bugun uchun limit tugadi" : "Kuniga faqat 1 ta rasm yuklanadi"}
                </p>
            </div>
        </div>
    );
};

export default MotivationUploadCard;
