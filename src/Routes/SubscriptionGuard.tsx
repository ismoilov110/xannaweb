import SubscriptionCard from "@/components/Subscribe/SubscriptionCard";
import type { RootState } from "@/Store";
import { useSelector } from "react-redux";

interface SubscriptionGuardProps {
    children: React.ReactNode;
}

export default function SubscriptionGuard({ children }: SubscriptionGuardProps) {
    const { isAuth } = useSelector((state: RootState) => state.auth);
    // Redux store'dan foydalanuvchi ma'lumotlarini olamiz
    const { userData, isLoading } = useSelector((state: RootState) => state.profile);

    // Foydalanuvchi obuna bo'lganmi yoki yo'qligini tekshiramiz
    const isPremium = userData.isPremium;

    // Agar ma'lumotlar yuklanayotgan bo'lsa, loading ko'rsatamiz
    if (isLoading) {
        return (
            <div className="fixed inset-0 z-50 bg-[#FDECEF] flex items-center justify-center p-4">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#F98CA1] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[#9A7F85] font-medium">Ma'lumotlar yuklanmoqda...</p>
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
