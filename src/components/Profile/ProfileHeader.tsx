import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateAvatar } from "@/Reducer/ProfileSlice";
import type { RootState } from "@/Store";
import { Crown } from "lucide-react";
import type React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../ui/input";

interface ProfileHeaderProps {
    name: string;
    avatar: string;
    isPremium: boolean;
}

export default function ProfileHeader({ name, avatar, isPremium }: ProfileHeaderProps) {
    const dispatch = useDispatch()
    const { userData } = useSelector((state: RootState) => state.profile);


    const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            dispatch(updateAvatar(reader.result as string));
        }
        reader.readAsDataURL(file)
    }
    return (
        <div className="flex flex-col items-center mb-8">
            {/* Avatar with gradient border */}
            <div className="relative mb-4">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#6366F1] via-[#EC4899] to-[#6366F1] rounded-full opacity-75 blur-sm animate-pulse"></div>
                <div className="relative p-1 bg-white rounded-full">
                    <Avatar className="w-32 h-32 border-4 border-white">
                        <AvatarImage src={userData.avatar || avatar} alt={userData.name || name} className="object-cover" />
                        <AvatarFallback className="text-4xl text-[#F48894]">
                            {userData.name.charAt(0)}
                        </AvatarFallback>
                        <Input
                            type="file"
                            accept="image/"
                            onChange={handleChangeAvatar}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
                        />
                    </Avatar>
                </div>
            </div>

            {/* Name */}
            <h2 className="text-3xl font-serif text-[#382E31] mb-1">{userData.name}</h2>

            {/* Subtitle */}
            <p className="text-[#F48894] mb-3 text-sm">❤️ Shaxsiy kabinet</p>

            {/* Premium Badge */}
            {isPremium && (
                <div className="flex items-center gap-2 bg-[#F48894] text-white px-4 py-1.5 rounded-full shadow-lg transform hover:scale-105 transition-transform cursor-default">
                    <Crown className="w-4 h-4" fill="currentColor" />
                    <span className="text-sm font-medium">Premium a'zo</span>
                </div>
            )}
        </div>
    );
}
1