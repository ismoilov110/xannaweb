import { getMeThunk, updateProfileThunk, updateUserImageThunk } from "@/features/User/User.thunks";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserProfile {
  name: string;
  first_name: string;
  last_name: string;
  number: string;
  birth_date: string;
  avatar: string;
  isPremium: boolean;
  memberSince: string;
  expired_at: string;
}

interface ProfileState {
  userData: UserProfile;
  editData: UserProfile;
  isEditOpen: boolean;
  isLoading: boolean; // Ma'lumotlar yuklanayotganini tekshirish uchun
}

const initialState: ProfileState = {
  userData: {
    name: "",
    first_name: "",
    last_name: "",
    number: "",
    birth_date: "",
    avatar: "", // Default avatar bo'sh bo'lishi kerak, Fallback ishlashi uchun
    isPremium: false,
    memberSince: "",
    expired_at: "",
  },
  editData: {
    name: "",
    first_name: "",
    last_name: "",
    number: "",
    birth_date: "",
    avatar: "",
    isPremium: false,
    memberSince: "",
    expired_at: "",
  },
  isEditOpen: false,
  isLoading: false,
};

const formatAvatarUrl = (url: string | null | undefined) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `https://xannaofficial.uz${url.startsWith("/") ? "" : "/"}${url}`;
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    openEdit(state) {
      state.isEditOpen = true;
      state.editData = state.userData;
    },
    closeEdit(state) {
      state.isEditOpen = false;
      state.editData = state.userData;
    },
    updateEdits(state, action: PayloadAction<Partial<UserProfile>>) {
      state.editData = { ...state.editData, ...action.payload };
    },
    updateAvatar(state, action: PayloadAction<string>) {
      state.userData.avatar = formatAvatarUrl(action.payload);
    },
    saveProfile(state) {
      state.userData = state.editData;
      state.isEditOpen = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getMeThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMeThunk.fulfilled, (state, action) => {
      // Backenddan kelgan ma'lumotni log qilamiz (debug uchun)
      console.log("ME API RESPONSE:", action.payload);

      try {
        // Ma'lumot action.payload.user ichida keladi
        const user = action.payload?.user || {};

        state.userData = {
          name: user.full_name || (user.first_name || user.last_name
            ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
            : "Foydalanuvchi"),
          first_name: user.first_name || "",
          last_name: user.last_name || "",
          avatar: formatAvatarUrl(user.profile_image),
          isPremium: !!(user.has_subscription || user.is_active_subscription),
          number: user.phone_number || "",
          birth_date: user.birth_date || "Kiritilmagan",
          memberSince: user.date_joined
            ? new Date(user.date_joined).toLocaleDateString()
            : "Noma'lum",
          expired_at: user.subscription_expired_at
            ? new Date(user.subscription_expired_at).toLocaleDateString()
            : "Amal qilish muddati yo'q",
        };
      } catch (err) {
        console.error("ProfileSlice mapping error:", err);
      } finally {
        state.isLoading = false;
        console.log("ProfileSlice: isLoading set to FALSE");
      }
    });
    builder.addCase(getMeThunk.rejected, (state, action) => {
      console.error("getMeThunk REJECTED:", action.error);
      state.isLoading = false;
    });

    // Avatar yuklash jarayoni
    builder.addCase(updateUserImageThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserImageThunk.fulfilled, (state, action) => {
      // Backenddan yangi avatar URL kelishi kerak
      console.log("UPDATE IMAGE RESPONSE:", action.payload);
      const newAvatar = action.payload?.user?.profile_image || action.payload?.profile_image || action.payload?.image;
      if (newAvatar) {
        state.userData.avatar = formatAvatarUrl(newAvatar);
      }
      state.isLoading = false;
    });
    builder.addCase(updateUserImageThunk.rejected, (state, action) => {
      console.error("updateUserImageThunk REJECTED:", action.error);
      state.isLoading = false;
    });

    // Profil ma'lumotlarini yangilash
    builder.addCase(updateProfileThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProfileThunk.fulfilled, (state, action) => {
      console.log("UPDATE PROFILE RESPONSE:", action.payload);
      const user = action.payload?.user || action.payload || {};
      state.userData = {
        ...state.userData,
        name: user.full_name || (user.first_name || user.last_name
          ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
          : state.userData.name),
        first_name: user.first_name || state.userData.first_name,
        last_name: user.last_name || state.userData.last_name,
        birth_date: user.birth_date || state.userData.birth_date,
      };
      state.isLoading = false;
      state.isEditOpen = false;
    });
    builder.addCase(updateProfileThunk.rejected, (state, action) => {
      console.error("updateProfileThunk REJECTED:", action.error);
      state.isLoading = false;
    });

    // Logout bo'lganda profil ma'lumotlarini tozalash
    builder.addCase("auth/logout", () => {
      console.log("ProfileSlice: Auth logout detected, resetting profile state");
      return initialState;
    });
  }
});

export const {
  openEdit,
  closeEdit,
  updateEdits,
  updateAvatar,
  saveProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
