import { meService } from "@/Services/Users/User.services";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getMeThunk = createAsyncThunk("user/me", async () => {
  const res = await meService();
  return res.data;
});
