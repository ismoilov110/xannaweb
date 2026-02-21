import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDailyMotivationService } from "../Services/AiChat/Motivation.services";

interface MotivationState {
    messages: string[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: MotivationState = {
    messages: [],
    status: "idle",
    error: null,
};

export const getDailyMotivationThunk = createAsyncThunk(
    "motivation/getDaily",
    async () => {
        const data = await getDailyMotivationService();
        // Backenddan kelgan MotivationMessage[] ni string[] ga o'tkazamiz
        return data.map((item: any) => item.text || item.message || item.content);
    }
);

const motivationSlice = createSlice({
    name: "motivation",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDailyMotivationThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getDailyMotivationThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.messages = action.payload;
            })
            .addCase(getDailyMotivationThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Something went wrong";
            });
    },
});

export default motivationSlice.reducer;
