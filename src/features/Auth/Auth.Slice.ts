import { createSlice } from "@reduxjs/toolkit";
import { logInThunk, RegisterThunk } from "./Auth.thunks";
interface AuthState {
    isAuth: boolean,
    status: "idle" | "loading" | "succeeded" | "failed",
    error?: string

}

const initialState: AuthState = {
    isAuth: Boolean(localStorage.getItem("access_token")),
    status: "idle"
}
export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            localStorage.clear();
            state.isAuth = false,
                state.status = "idle"
        },
    },
    extraReducers: (builder) => {
        builder
            // Login uchun 
            .addCase(logInThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(logInThunk.fulfilled, (state) => {
                state.status = "succeeded",
                    state.isAuth = true
            })
            .addCase(logInThunk.rejected, (state) => {
                state.status = "failed"
            })

            // Register uchun

            .addCase(RegisterThunk.pending, (state) => {
                state.status = "loading"
            })
            .addCase(RegisterThunk.fulfilled, (state) => {
                state.status = "succeeded",
                    state.isAuth = true
            })
            .addCase(RegisterThunk.rejected, (state) => {
                state.status = "failed"
            });
    },
});

export default AuthSlice.reducer;
export const { logout } = AuthSlice.actions;