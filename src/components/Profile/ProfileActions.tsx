import { LogOut, Edit3 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/Store";
import {
    openEdit,
    closeEdit,
    updateEdits,
    saveProfile,
} from "@/Reducer/ProfileSlice";
import { cn } from "@/lib/utils";

interface ProfileActionsProps {
    onLogout: () => void;
}

export default function ProfileActions({ onLogout }: ProfileActionsProps) {
    const dispatch = useDispatch();

    const { editData, isEditOpen } = useSelector(
        (state: RootState) => state.profile
    );

    return (
        <div className="mt-8 flex flex-col items-center gap-6">
            {/* Edit Profile */}
            <Dialog
                open={isEditOpen}
                onOpenChange={(open) =>
                    open ? dispatch(openEdit()) : dispatch(closeEdit())
                }
            >
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-full h-14 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer rounded-2xl text-base font-medium"
                        onClick={() => dispatch(openEdit())}
                    >
                        <Edit3 className="h-5 w-5 mr-2" />
                        Profilni tahrirlash
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md rounded-3xl border-border/50">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">
                            Profilni tahrirlash
                        </DialogTitle>
                        <DialogDescription>
                            Ma'lumotlaringizni yangilang
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-5 py-4">
                        {/* Name */}
                        <div className="space-y-2">
                            <Label className={cn("text-[#3A2B2F]")}>To‘liq ism</Label>
                            <Input
                                value={editData.name}
                                onChange={(e) =>
                                    dispatch(updateEdits({ name: e.target.value }))
                                }
                                className="h-12 rounded-2xl bg-[#F7A1B5]/50  border border-[#F3D3DA]/50"

                            />
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <Label className={cn("text-[#3A2B2F]")}>Telefon raqam</Label>
                            <Input
                                value={editData.number}
                                onChange={(e) =>
                                    dispatch(updateEdits({ number: e.target.value }))
                                }
                                className="h-12 rounded-2xl bg-[#F7A1B5]/50  border border-[#F3D3DA]/50"
                            />
                        </div>

                        <div className="flex pt-2 items-center gap-3">
                            <Button className="flex-1 h-12 hover:bg-[#F7A1B5]/80 text-black rounded-xl bg-transparent cursor-pointer " onClick={() => dispatch(closeEdit())}>
                                Bekor qilish
                            </Button>
                            <Button
                                className="flex-1 h-12 rounded-xl bg-[#F28BA8] hover:bg-[#F28BA8]/90 shadow-md cursor-pointer"
                                onClick={() => dispatch(saveProfile())}
                            >
                                Saqlash
                            </Button>

                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Logout */}
            <div className="mt-12 pt-6 border-t border-[#F3D3DA]/30 animate-slide-up" style={{ animationDelay: "0.2" }}>
                <Button
                    variant="ghost"
                    onClick={onLogout}
                    className="w-full cursor-pointer rounded-xl text-[#8C6F76] hover:text-destructive hover:bg-destructive/10 transition-colors"
                >
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Chiqish</span>
                </Button>
            </div>
        </div>
    );
}
