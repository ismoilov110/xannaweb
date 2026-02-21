import { createSlice } from "@reduxjs/toolkit";
import { logInThunk, RegisterThunk } from "@/features/Auth/Auth.thunks";

interface AuthState {
   isAuth: boolean;
   status: "idle" | "loading" | "succeeded" | "failed";
   error?: string;
}

const initialState: AuthState = {
   isAuth: !!localStorage.getItem("access_token"),
   status: "idle"
};

console.log("AuthSlice: isAuth initialized as:", initialState.isAuth, "tokens:", !!localStorage.getItem("access_token"));

export const AuthSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      logout(state) {
         localStorage.removeItem("access_token");
         localStorage.removeItem("refresh_token");
         state.isAuth = false;
         state.status = "idle";
      },
   },
   extraReducers: (builder) => {
      builder
         // Login
         .addCase(logInThunk.pending, (state) => {
            state.status = "loading";
         })
         .addCase(logInThunk.fulfilled, (state) => {
            state.status = "succeeded";
            state.isAuth = true;
         })
         .addCase(logInThunk.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload as string;
         })
         // Register
         .addCase(RegisterThunk.pending, (state) => {
            state.status = "loading";
         })
         .addCase(RegisterThunk.fulfilled, (state) => {
            state.status = "succeeded";
            state.isAuth = true;
         })
         .addCase(RegisterThunk.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload as string;
         });
   },
});

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;