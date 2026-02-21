import { api } from "../Api";

export interface MotivationMessage {
    id: number;
    text: string;
    author?: string;
}

export const getDailyMotivationService = async () => {
    const { data } = await api.get("/api/ai/daily-motivation/");
    return data as MotivationMessage[];
};
