// import { useSelector } from "react-redux";
// import type { RootState } from "@/Store";
import SubscriptionCard from "@/components/Subscribe/SubscriptionCard";
import type { RootState } from "@/Store";
import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

interface SubscriptionGuardProps {
    children: React.ReactNode;
}

export default function SubscriptionGuard({ children }: SubscriptionGuardProps) {
    const { isAuth } = useSelector((state: RootState) => state.auth);
    // TODO: Connect to real user profile 'isPremium' or similar field
    // For MVP/Demo: we can use a mock or local storage flag if backend isn't ready
    // const { userData } = useSelector((state: RootState) => state.profile);
    const isPremium = false; // Mock: Force false to test blocking behavior

    //  if (children) return <>{children}</>;
    // if (!isAuth) {
    //     return <Navigate to="/login" replace />;
    // }

    if (!isPremium) {
        return (
            <div className="fixed inset-0 z-50 bg-[#FDECEF] flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <SubscriptionCard />
                    {/* Note: SubscriptionCard needs to be self-contained or have a prop to handle "Purchase" */}
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
