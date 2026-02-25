
import { useState, useRef, useEffect } from "react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SubscriptionCard() {
    const [isPaymentVisible] = useState(false);

    const paymentSectionRef = useRef<HTMLDivElement>(null);
    const [paymentHeight, setPaymentHeight] = useState("0px");
    const navigate = useNavigate();

    const [Loading] = useState(false);

    const features = [
        "Barcha kategoriyalarga kirish",
        "XANNA bilan cheksiz suhbat",
        "Shaxsiy maslahatlar",
        "Kunlik motivatsiya",
    ];

    useEffect(() => {
        if (paymentSectionRef.current) {
            setPaymentHeight(
                isPaymentVisible ? `${paymentSectionRef.current.scrollHeight}px` : "0px"
            );
        }
    }, [isPaymentVisible]);


    return (
        <div className="w-full relative">
            <div className="bg-white rounded-[32px] p-8 shadow-[0_4px_20px_rgba(200,200,200,0.15)] border border-white/50 w-full text-center transition-all duration-300 hover:shadow-[0_8px_30px_rgba(200,200,200,0.25)]">

                <h3 className="text-[#4A4A4A] font-serif text-2xl mb-2">3 Oylik</h3>
                <div className="flex items-end justify-center gap-1 mb-8">
                    <span className="text-[#2D2D2D] text-5xl font-bold">47,000</span>
                    <div className="flex flex-col items-start mb-2">
                        <span className="text-[#8A8A8A] text-sm font-medium">so'm</span>
                        <span className="text-[#8A8A8A] text-xs">/oyiga</span>
                    </div>
                </div>

                <div className="space-y-4 mb-8 text-left pl-4">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-[#FFF0F3] flex items-center justify-center shrink-0">
                                <Check className="w-3.5 h-3.5 text-[#FF8FA3]" strokeWidth={3} />
                            </div>
                            <span className="text-[#555555] font-medium">{feature}</span>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => {
                        navigate("/obuna-success");
                    }}
                    disabled={Loading}
                    className="w-full py-4 cursor-pointer rounded-2xl bg-[#FFE5E5] text-[#8B5E5E] font-semibold text-lg hover:bg-[#FFD6D6] active:scale-[0.98] transition-all duration-200"
                >
                    {Loading ? "Yuklanmoqda..." : "Obuna sotib olish"}
                </button>

                <div
                    className="overflow-hidden transition-all duration-500 ease-in-out"
                    style={{ height: paymentHeight, opacity: isPaymentVisible ? 1 : 0 }}
                >
                    <div ref={paymentSectionRef} className="pt-6 pb-2">
                        <div className="flex justify-between gap-3">
                            <button className="flex-1 bg-[#F8FAFC] rounded-2xl p-3 border border-[#E2E8F0] hover:border-[#38B2AC] hover:bg-[#E6FFFA] transition-all duration-200 group flex flex-col items-center gap-2 cursor-pointer">
                                <div className="w-10 h-8 bg-[#38B2AC] rounded flex items-center justify-center text-white font-bold text-xs">
                                    PM
                                </div>
                                <span className="text-[#4A5568] text-xs font-medium group-hover:text-[#2C7A7B]">Payme</span>
                            </button>

                            <button className="flex-1 bg-[#F8FAFC] rounded-2xl p-3 border border-[#E2E8F0] hover:border-[#3182CE] hover:bg-[#EBF8FF] transition-all duration-200 group flex flex-col items-center gap-2 cursor-pointer">
                                <div className="w-10 h-8 bg-[#3182CE] rounded flex items-center justify-center text-white font-bold text-xs">
                                    CL
                                </div>
                                <span className="text-[#4A5568] text-xs font-medium group-hover:text-[#2B6CB0]">Click</span>
                            </button>

                            <div className="flex-1 relative bg-[#F8FAFC] rounded-2xl p-3 border border-[#E2E8F0] opacity-50 grayscale cursor-not-allowed flex flex-col items-center gap-2">
                                <div className="absolute -top-2 -right-1 bg-[#F1F5F9] text-[#94A3B8] text-[0.6rem] px-2 py-0.5 rounded-full border border-[#E2E8F0]">
                                    Tez kunda
                                </div>
                                <div className="w-10 h-8 bg-[#ECC94B] rounded flex items-center justify-center text-white font-bold text-xs">
                                    PN
                                </div>
                                <span className="text-[#94A3B8] text-xs font-medium">Paynet</span>
                            </div>
                        </div>
                    </div>
                </div>
            <p className="font-sans text-xl text-center text-[#8C6F76] mt-4">avtomobil va uy yutib olish imkoniyati</p>
            </div>
        </div>
    );
}
