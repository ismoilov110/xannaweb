import { getMeThunk } from "@/features/User/User.thunks";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserProfile {
  name: string;
  number: string;
  email: string;
  avatar: string;
  isPremium: boolean;
  memberSince: string;
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
    number: "",
    email: "",
    avatar: "/vite.svg",
    isPremium: false, // Default: obuna bo'lmagan (falsy)
    memberSince: "",
  },
  editData: {
    name: "",
    number: "",
    email: "",
    avatar: "/vite.svg",
    isPremium: false,
    memberSince: "",
  },
  isEditOpen: false,
  isLoading: false,
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
      state.userData.avatar = action.payload;
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
          avatar: user.profile_image || "/vite.svg",
          isPremium: !!(user.has_subscription || user.is_active_subscription),
          number: user.phone_number || "",
          email: user.email || "",
          memberSince: user.date_joined
            ? new Date(user.date_joined).toLocaleDateString()
            : "Noma'lum",
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
