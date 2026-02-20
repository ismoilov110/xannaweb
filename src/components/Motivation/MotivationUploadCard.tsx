import React, { useRef } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../Store";

interface MotivationUploadCardProps {
    onUpload: (file: File) => void;
    disabled?: boolean;
    lastUploadTime?: number;
}

const MotivationUploadCard: React.FC<MotivationUploadCardProps> = ({ onUpload, disabled,}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { userData } = useSelector((state: RootState) => state.profile);

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
        <div className="flex flex-col items-center gap-4">
            <div
                onClick={handleCardClick}
                className={`
                    relative group transition-all duration-300
                    ${disabled ? "cursor-not-allowed" : "cursor-pointer hover:scale-105 active:scale-95"}
                `}
            >
                {/* Avatar Circle */}
                <div className={`
                    w-32 h-32 md:w-40 md:h-40 rounded-full p-1
                    bg-gradient-to-tr from-[#F98CA1] to-[#FFD1DC]
                    shadow-[0_10px_25px_-5px_rgba(249,140,161,0.4)]
                    transition-all duration-300
                    ${disabled ? "grayscale opacity-80" : "group-hover:shadow-[0_15px_30px_-5px_rgba(249,140,161,0.5)]"}
                `}>
                    <div className="w-full h-full rounded-full overflow-hidden bg-white border-2 border-white">
                        {userData?.avatar ? (
                            <img
                                src={userData.avatar}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-[#FFF0F5] text-4xl">
                                👩‍🦰
                            </div>
                        )}
                        {/* Overlay when disabled */}
                        {disabled && (
                            <div className="absolute inset-0 bg-black/10 flex items-center justify-center backdrop-blur-[1px]">
                                <span className="text-2xl">🔒</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Plus Button Overlay */}
                <div className={`
                    absolute bottom-1 right-1 md:bottom-2 md:right-2
                    w-10 h-10 md:w-12 md:h-12 rounded-full 
                    flex items-center justify-center text-white shadow-lg border-4 border-white
                    transition-all duration-300
                    ${disabled
                        ? "bg-gray-400 cursor-not-allowed scale-90"
                        : "bg-[#F98CA1] group-hover:bg-[#ff7b94] group-hover:rotate-90"}
                `}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                    </svg>
                </div>

                {/* Hidden Input */}
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={disabled}
                />
            </div>

            {/* Status Text */}
            <div className="text-center max-w-[200px]">
                {disabled ? (
                    <p className="text-[#9A7F85] text-sm font-medium animate-pulse">
                        Bugun limit tugadi, ertaga yana yuklaysiz 🌸
                    </p>
                ) : (
                    <p className="text-[#8B5E5E] text-sm font-medium">
                        Rasm yuklang va motivatsiya oling ✨
                    </p>
                )}
            </div>
        </div>
    );
};

export default MotivationUploadCard;
