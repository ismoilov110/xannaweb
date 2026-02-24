import { Edit3, Calendar, Trash2 } from "lucide-react";
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
import type { RootState, AppDispatch } from "@/Store";
import { openEdit, closeEdit, updateEdits } from "@/Reducer/ProfileSlice";
import { updateProfileThunk } from "@/features/User/User.thunks";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { deleteAccoutThunk } from "@/features/ProfileDelete/DeleteProfile.thunks";
import { useEffect, useState } from "react";

export default function ProfileActions() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { editData, isEditOpen, isLoading } = useSelector(
    (state: RootState) => state.profile
  );

  // ✅ Delete dialogni boshqaramiz (Bekor qilish yopadi)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // ✅ redirect logikasini safe qilamiz
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) navigate("/register", { replace: true });
  }, [navigate]);

  const handleSave = () => {
    dispatch(
      updateProfileThunk({
        first_name: editData.first_name,
        last_name: editData.last_name,
        birth_date: editData.birth_date,
        gender: editData.gender || "",
      })
    );
  };

  const handleDeleteAccount = async () => {
    const res = await dispatch(deleteAccoutThunk());

    if (deleteAccoutThunk.fulfilled.match(res)) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      // ✅ loop bo‘lmasin desang, eng ishonchli:
      window.location.href = "/register";
      // yoki SPA navigate ishlatsang:
      // navigate("/register", { replace: true });
    } else {
      console.log("Delete error:", res.payload);
    }
  };

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
            <DialogTitle className="text-2xl">Profilni tahrirlash</DialogTitle>
            <DialogDescription>Ma'lumotlaringizni yangilang</DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className={cn("text-[#3A2B2F]")}>Ism</Label>
                <Input
                  value={editData.first_name}
                  onChange={(e) =>
                    dispatch(updateEdits({ first_name: e.target.value }))
                  }
                  className="h-12 rounded-2xl bg-[#F7A1B5]/50 border border-[#F3D3DA]/50"
                  placeholder="Ism"
                />
              </div>
              <div className="space-y-2">
                <Label className={cn("text-[#3A2B2F]")}>Familiya</Label>
                <Input
                  value={editData.last_name}
                  onChange={(e) =>
                    dispatch(updateEdits({ last_name: e.target.value }))
                  }
                  className="h-12 rounded-2xl bg-[#F7A1B5]/50 border border-[#F3D3DA]/50"
                  placeholder="Familiya"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className={cn("text-[#3A2B2F]")}>Jins</Label>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant={editData.gender === "male" ? "default" : "outline"}
                  onClick={() => dispatch(updateEdits({ gender: "male" }))}
                  className={cn(
                    "flex-1 h-11 rounded-xl transition-all cursor-pointer",
                    editData.gender === "male"
                      ? "bg-[#F28BA8] hover:bg-[#F28BA8]/90 text-white"
                      : "border-[#F3D3DA]/50 text-[#3A2B2F]"
                  )}
                >
                  Erkak
                </Button>
                <Button
                  type="button"
                  variant={editData.gender === "female" ? "default" : "outline"}
                  onClick={() => dispatch(updateEdits({ gender: "female" }))}
                  className={cn(
                    "flex-1 h-11 rounded-xl transition-all cursor-pointer",
                    editData.gender === "female"
                      ? "bg-[#F28BA8] hover:bg-[#F28BA8]/90 text-white"
                      : "border-[#F3D3DA]/50 text-[#3A2B2F]"
                  )}
                >
                  Ayol
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className={cn("text-[#3A2B2F]")}>
                Telefon raqam (O'zgartirib bo'lmaydi)
              </Label>
              <Input
                value={editData.number}
                readOnly
                className="h-12 rounded-2xl bg-[#F7A1B5]/20 border border-[#F3D3DA]/50 cursor-not-allowed opacity-70"
              />
            </div>

            <div className="space-y-2">
              <Label className={cn("text-[#3A2B2F] font-medium")}>
                Tug'ilgan sana
              </Label>
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8C6F76] group-focus-within:text-[#F28BA8] transition-colors pointer-events-none" />
                <Input
                  type="date"
                  value={editData.birth_date}
                  onChange={(e) =>
                    dispatch(updateEdits({ birth_date: e.target.value }))
                  }
                  className={cn(
                    "h-12 pl-12 pr-4 rounded-2xl bg-[#F9E0E6] border border-[#F3D3DA]/50",
                    "focus:bg-white focus:border-[#F28BA8] focus:ring-2 focus:ring-[#F28BA8]/20",
                    "transition-all duration-200 cursor-pointer appearance-none",
                    "[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  )}
                />
              </div>
            </div>

            <div className="flex pt-2 items-center gap-3">
              <Button
                variant="ghost"
                className="flex-1 h-12 hover:bg-[#F7A1B5]/80 text-black rounded-xl bg-transparent cursor-pointer"
                onClick={() => dispatch(closeEdit())}
              >
                Bekor qilish
              </Button>
              <Button
                className="flex-1 h-12 rounded-xl bg-[#F28BA8] hover:bg-[#F28BA8]/90 shadow-md cursor-pointer"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? "Saqlanmoqda..." : "Saqlash"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Account */}
      <div className="w-full mt-12 pt-6 border-t border-[#F3D3DA]/30">
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="w-full cursor-pointer rounded-xl text-destructive hover:bg-destructive/10 transition-colors"
              disabled={isLoading}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              <span>Akkountni o‘chirish</span>
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md rounded-3xl">
            <DialogHeader>
              <DialogTitle>Akkountni o‘chirish</DialogTitle>
              <DialogDescription>
                Akkountingiz butunlay o‘chadi. Qayta tiklab bo‘lmaydi. Davom
                etasizmi?
              </DialogDescription>
            </DialogHeader>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                className="flex-1 h-11 rounded-xl"
                onClick={() => setIsDeleteOpen(false)}
              >
                Bekor qilish
              </Button>

              <Button
                className="flex-1 h-11 rounded-xl bg-destructive hover:bg-destructive/90"
                onClick={handleDeleteAccount}
                disabled={isLoading}
              >
                {isLoading ? "O‘chirilmoqda..." : "Ha, o‘chirish"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}