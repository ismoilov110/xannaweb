import { getMeThunk } from "@/features/User/User.thunks";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserProfile {
  name: string;
  number: string;
  avatar: string;
  isPremium: boolean;
  memberSince: string;
}

interface ProfileState {
  userData: UserProfile;
  editData: UserProfile;
  isEditOpen: boolean;
}

const initialState: ProfileState = {
  userData: {
    name: "",
    number: "",
    avatar: "/vite.svg",
    isPremium: true,
    memberSince: "",
  },
  editData: {
    name: "",
    number: "",
    avatar: "/vite.svg",
    isPremium: true,
    memberSince: "",
  },
  isEditOpen: false,
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
    builder.addCase(getMeThunk.fulfilled, (state, action) => {
      const user = action.payload;

      state.userData = {
        name: `${user.first_name} ${user.last_name}`,
        avatar: user.profile_image ?? null,
        isPremium: user.has_subscription ?? false,
        number: user.phone_number,
        memberSince: new Date(user.date_joined).toLocaleDateString(),
      };
    })
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
