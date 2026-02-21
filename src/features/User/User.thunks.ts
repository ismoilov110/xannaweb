import { meService, updateUserImageService, updateProfileService, deleteUserImageService } from "@/Services/Users/User.services";
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

export const deleteUserImageThunk = createAsyncThunk("user/deleteImage", async () => {
  const res = await deleteUserImageService();
  return res.data;
});

export const updateProfileThunk = createAsyncThunk("user/updateProfile", async (payload: { first_name?: string; last_name?: string; birth_date?: string; gender?: string }) => {
  const formData = new FormData();
  if (payload.first_name) formData.append("first_name", payload.first_name);
  if (payload.last_name) formData.append("last_name", payload.last_name);
  if (payload.birth_date) formData.append("birth_date", payload.birth_date);
  if (payload.gender) formData.append("gender", payload.gender);

  const res = await updateProfileService(formData);
  return res.data;
});
