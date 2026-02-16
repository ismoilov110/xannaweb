import { logInThunk } from "@/features/Auth/Auth.thunks";
import {  createSlice } from "@reduxjs/toolkit";

type AuthState = {
    isAuth: boolean;
}


const initialState: AuthState = {
   isAuth: !!localStorage.getItem("access_token"), 
}
export const AuthSlice = createSlice({
   name: "Auth",
   initialState,
   reducers: {
     logout(state) {
        state.isAuth = false,
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
     },
   },

   extraReducers: (builder) => {
      builder.addCase(logInThunk.fulfilled, (state) => {
        state.isAuth = true
      })
   }
})


export const {logout} = AuthSlice.actions;
export default AuthSlice.reducer