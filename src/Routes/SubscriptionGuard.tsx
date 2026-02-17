import SubscriptionCard from "@/components/Subscribe/SubscriptionCard";
import type { RootState } from "@/Store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface SubscriptionGuardProps {
    children: React.ReactNode;
}

export default function SubscriptionGuard({ children }: SubscriptionGuardProps) {
    const { isAuth } = useSelector((state: RootState) => state.auth);
    const { userData, isLoading } = useSelector((state: RootState) => state.profile);
    const [showTimeoutError, setShowTimeoutError] = useState(false);

    const isPremium = userData.isPremium;

    useEffect(() => {
        let timer: any;
        if (isLoading) {
            timer = setTimeout(() => {
                setShowTimeoutError(true);
            }, 8000);
        } else {
            setShowTimeoutError(false);
        }
        return () => clearTimeout(timer);
    }, [isLoading]);

    const handleRetry = () => {
        window.location.reload();
    };

    // Faqat birinchi marta yuklanayotgan bo'lsa va hali ma'lumot yo'q bo'lsa loader ko'rsatamiz
    // Agar userData.name bo'lsa, demak bizda ma'lumot bor, backgroundda yangilanishi mumkin
    if (isLoading && !userData.name) {
        return (
            <div className="fixed inset-0 z-50 bg-[#FDECEF] flex items-center justify-center p-4">
                <div className="flex flex-col items-center gap-4 text-center">
                    {!showTimeoutError ? (
                        <>
                            <div className="w-12 h-12 border-4 border-[#F98CA1] border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-[#9A7F85] font-medium">Ma'lumotlar yuklanmoqda...</p>
                        </>
                    ) : (
                        <>
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-500 mb-2 font-bold text-2xl">
                                !
                            </div>
                            <p className="text-[#9A7F85] font-medium">Ma'lumotlarni yuklashda kechikish bo'lyapti</p>
                            <button
                                onClick={handleRetry}
                                className="mt-2 px-6 py-2 bg-[#F98CA1] text-white rounded-xl font-medium hover:bg-[#F8758F] transition-colors cursor-pointer"
                            >
                                Qayta urinish
                            </button>
                        </>
                    )}
                </div>
            </div>
        );
    }

    // Agar foydalanuvchi avtorizatsiyadan o'tgan bo'lsa-yu, lekin obunasi bo'lmasa
    // unga obuna bo'lish sahifasini (overlay ko'rinishida) ko'rsatamiz
    if (isAuth && !isPremium) {
        return (
            <div className="fixed inset-0 z-50 bg-[#FDECEF] flex items-center justify-center p-4 overflow-y-auto">
                <div className="w-full max-w-md my-8">
                    <SubscriptionCard />
                </div>
            </div>
        );
    }

    // Agar obuna bo'lsa, sahifani odatdagidek ko'rsatamiz
    return <>{children}</>;
}
