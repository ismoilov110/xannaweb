import { meService, updateUserImageService, updateProfileService } from "@/Services/Users/User.services";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getMeThunk = createAsyncThunk("user/me", async () => {
  const res = await meService();
  return res.data;
});

export const updateUserImageThunk = createAsyncThunk("user/updateImage", async (file: File) => {
  const formData = new FormData();
  formData.append("profile_image", file);
  const res = await updateUserImageService(formData);
  return res.data;
});

export const updateProfileThunk = createAsyncThunk("user/updateProfile", async (payload: { first_name?: string; last_name?: string; birth_date?: string }) => {
  const formData = new FormData();
  if (payload.first_name) formData.append("first_name", payload.first_name);
  if (payload.last_name) formData.append("last_name", payload.last_name);
  if (payload.birth_date) formData.append("birth_date", payload.birth_date);

  const res = await updateProfileService(formData);
  return res.data;
});
