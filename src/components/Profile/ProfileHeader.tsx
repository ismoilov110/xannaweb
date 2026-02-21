import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateUserImageThunk, deleteUserImageThunk } from "@/features/User/User.thunks";
import type { RootState, AppDispatch } from "@/Store";
import { Crown } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface ProfileHeaderProps {
    isPremium: boolean;
}

export default function ProfileHeader({ isPremium }: ProfileHeaderProps) {
    const dispatch = useDispatch<AppDispatch>()
    const { userData } = useSelector((state: RootState) => state.profile);
    const [preview, setPreview] = React.useState<string | null>(null)
    const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
    const longPressTimer = React.useRef<any>(null);

    const handleStartPress = () => {
        // Faqat rasm bo'lsa o'chirish imkonini beramiz
        if (!userData.avatar && !preview) return;

        longPressTimer.current = setTimeout(() => {
            setShowDeleteDialog(true);
        }, 700);
    };

    const handleEndPress = () => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
            longPressTimer.current = null;
        }
    };

    const handleDeletePhoto = async () => {
        await dispatch(deleteUserImageThunk());
        setPreview(null);
        setShowDeleteDialog(false);
    };

    const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return;

        // Local preview yaratamiz
        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        dispatch(updateUserImageThunk(file));
    }
    return (
        <div className="flex flex-col items-center mb-8">
            {/* Avatar with gradient border */}
            <div className="relative mb-4 group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#6366F1] via-[#EC4899] to-[#6366F1] rounded-full opacity-75 blur-sm animate-pulse group-hover:opacity-100 transition-opacity"></div>
                <div
                    className="relative p-1 bg-white rounded-full cursor-pointer"
                    onMouseDown={handleStartPress}
                    onMouseUp={handleEndPress}
                    onMouseLeave={handleEndPress}
                    onTouchStart={handleStartPress}
                    onTouchEnd={handleEndPress}
                >
                    <Avatar className="w-32 h-32 border-4 border-white overflow-hidden">
                        <AvatarImage src={preview || userData.avatar} alt={userData.name} className="object-cover" />
                        <AvatarFallback className="text-4xl text-[#F48894] font-bold">
                            {userData.name ? userData.name.charAt(0).toUpperCase() : "X"}
                        </AvatarFallback>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleChangeAvatar}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full z-10"
                        />
                    </Avatar>

                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent className="sm:max-w-[425px] rounded-3xl">
                    <DialogHeader>
                        <DialogTitle>Rasmni o'chirish</DialogTitle>
                        <DialogDescription>
                            Haqiqatan ham profil rasmini o'chirishni xohlaysizmi?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex gap-2 sm:gap-0">
                        <Button variant="ghost" onClick={() => setShowDeleteDialog(false)} className="rounded-xl flex-1">
                            Bekor qilish
                        </Button>
                        <Button variant="destructive" onClick={handleDeletePhoto} className="rounded-xl flex-1 bg-red-500 hover:bg-red-600">
                            O'chirish
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

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