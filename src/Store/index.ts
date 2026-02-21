import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "@/Reducer/ProfileSlice";
import motivationReducer from "@/Reducer/MotivationSlice";
import { AuthSlice } from "@/Reducer/AuthSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    auth: AuthSlice.reducer,
    motivation: motivationReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
