import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/Store";
// import { openEdit } from "@/Reducer/ProfileSlice";
import { logout } from "@/Reducer/AuthSlice";
import { Mail, Sparkles, CalendarHeart, Users2 } from "lucide-react";
import ProfileHeader from "./ProfileHeader";
import ProfileInfoCard from "./ProfileInfoCard";
import ProfileActions from "./ProfileActions";
import { cn } from "@/lib/utils";


export default function Profile() {
    const dispatch = useDispatch();
    // Selecting data directly from the Redux store
    const userData = useSelector((state: RootState) => state.profile.userData);

    // const handleEdit = () => {
    //     dispatch(openEdit());
    //     // Note: You'll need to implement the Edit Modal/Drawer logic separately
    //     // depending on where you want it to appear (e.g., in a portal or conditioned here)
    //     console.log("Edit requested");
    // };

    const handleLogout = () => {
        dispatch(logout());
        // Redirect to guest home logic is handled by auth state change usually, 
        // but explicit navigation can be added if needed.
        window.location.href = "/";
    };


    return (
        <div className="bg-[#FFF6F8] min-h-screen flex justify-center py-10 px-4">
            <div className="w-full mt-25 max-w-md">

                <ProfileHeader
                    isPremium={userData.isPremium}
                />

                <div className="flex flex-col gap-2">
                    <ProfileInfoCard
                        icon={<Sparkles className="w-6 h-6" />}
                        label="Tug'ilgan sana"
                        value={userData.birth_date || "Kiritilmagan"}
                    />

                    <ProfileInfoCard
                        icon={<Mail className="w-6 h-6" />}
                        label="Telefon raqam"
                        value={userData.number || "Raqam kiritilmagan"}
                    />

                    <ProfileInfoCard
                        icon={<Users2 className="w-6 h-6" />}
                        label="Jins"
                        value={userData.gender === "male" ? "Erkak" : userData.gender === "female" ? "Ayol" : "Kiritilmagan"}
                    />

                    <ProfileInfoCard
                        icon={<Sparkles className="w-6 h-6" />}
                        label="Obuna holati"
                        value={userData.isPremium ? "Faol" : "Faol emas"} // Boolean qiymatni matnga aylantiramiz
                        rightElement={
                            <div className={cn(
                                "w-3 h-3 rounded-full shadow-lg",
                                userData.isPremium ? "bg-green-400 shadow-green-200" : "bg-red-400 shadow-red-200"
                            )}></div>
                        }
                    />

                    <ProfileInfoCard
                        icon={<CalendarHeart className="w-6 h-6" />}
                        label="A'zo bo'lgan vaqt"
                        value={userData.memberSince}
                    />

                    <ProfileInfoCard
                        icon={<Sparkles className="w-6 h-6" />}
                        label="Amal qilish muddati"
                        value={userData.daysRemaining !== null
                            ? `${userData.daysRemaining} kun qoldi`
                            : userData.expired_at}
                    />
                </div>

                <ProfileActions
                    onLogout={handleLogout}
                />


            </div>
        </div>
    );
}
