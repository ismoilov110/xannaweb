import React from "react";

const GlobalBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
            {/* Base Background */}
            <div className="absolute inset-0 bg-[#FDECEF]" />

            {/* Shapes / Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#FAD1DC] rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-blob" />
            <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#F98CA1] rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-blob animation-delay-2000" />
            <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-[#FAD1DC] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob animation-delay-4000" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#EBC7D0] rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-blob animation-delay-6000" />

            {/* Grain / Noise Texture (Optional for premium feel) */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
};

export default GlobalBackground;
