import { DeleteMe } from "@/Services/ProfileDelete/ProfileDelete.servec";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteAccoutThunk = createAsyncThunk(
    "user/deleteAccount",
    async (_, { rejectWithValue }) => {
        try {
            await DeleteMe();
            return true;
        } catch (err: any) {
            return rejectWithValue(err?.response?.data || "Delete failed")
        }
    }
)