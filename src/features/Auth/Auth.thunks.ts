import { loginService, registerService } from "@/Services/Auth.services";
import { createAsyncThunk } from "@reduxjs/toolkit";


// bu faylda biz Auth ni Miyasini yozib oldik
export const logInThunk = createAsyncThunk(
    "auth/login",
    async (data: { phone_number: string, password: string }, { rejectWithValue }) => {
        try {
            const res = await loginService(data)
            localStorage.setItem("access_token", res.data.access);
            localStorage.setItem("refresh_token", res.data.refresh)
            return res.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Login xatosi")
        }
    }
)


export const RegisterThunk = createAsyncThunk(
    "auth/register",
    async (data: { phone_number: string, first_name: string, last_name: string, password1: string, password2: string }, { dispatch, rejectWithValue }) => {
        try {
            const res = await registerService(data);
            localStorage.setItem("access_token", res.data.access);
            localStorage.setItem("refresh_token", res.data.refresh);
            await dispatch(logInThunk({ phone_number: data.phone_number, password: data.password1 }));
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Ro'yxatdan o'tishda xatolik")
        }
    },
)