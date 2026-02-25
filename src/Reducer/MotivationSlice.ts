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

        // 🔒 Himoyalangan normalize
        if (Array.isArray(data)) {
            return data.map(
                (item: any) => typeof item === 'string' ? item : (item.text || item.message || item.content || "")
            );
        }

        // Agar object bo‘lsa
        if (typeof data === "object" && data !== null) {
            const possibleArray = (data as any).motivations || (data as any).data || (data as any).results || (data as any).motivation_words;
            if (Array.isArray(possibleArray)) {
                return possibleArray.map(
                    (item: any) => typeof item === 'string' ? item : (item.text || item.message || item.content || "")
                );
            }

            if ((data as any).text) return [(data as any).text];
            if ((data as any).message) return [(data as any).message];
            if ((data as any).content) return [(data as any).content];
        }

        // Fallback
        return [];
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
