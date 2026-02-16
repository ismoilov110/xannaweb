import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/Store";
// import { openEdit } from "@/Reducer/ProfileSlice";
import { logout } from "@/features/Auth/Auth.Slice";
import { Mail, Sparkles, CalendarHeart } from "lucide-react";
import ProfileHeader from "./ProfileHeader";
import ProfileInfoCard from "./ProfileInfoCard";
import ProfileActions from "./ProfileActions";
import { useEffect } from "react";
import { getMeThunk } from "@/features/User/User.thunks";


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

    useEffect(() => {
        dispatch(getMeThunk() as any);

    }, [dispatch])

    return (
        <div className="bg-[#FFF6F8] min-h-screen flex justify-center py-10 px-4">
            <div className="w-full mt-25 max-w-md">

                <ProfileHeader
                    name={userData.name}
                    avatar={userData.avatar || ""}
                    isPremium={userData.isPremium}
                />

                <div className="flex flex-col gap-2">
                    <ProfileInfoCard
                        icon={<Mail className="w-6 h-6" />}
                        label="Number"
                        value={userData.number} // This field is missing in the slice, hardcoded for now or should be added to slice
                    />

                    <ProfileInfoCard
                        icon={<Sparkles className="w-6 h-6" />}
                        label="Obuna holati"
                        value={userData.isPremium}
                        rightElement={
                            <div className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
                        }
                    />

                    <ProfileInfoCard
                        icon={<CalendarHeart className="w-6 h-6" />}
                        label="A'zo bo'lgan vaqt"
                        value={userData.memberSince}
                    />
                </div>

                <ProfileActions
                    onLogout={handleLogout}
                />


            </div>
        </div>
    );
}
