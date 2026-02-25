import { api } from "../Api";

export const getDailyMotivationService = async () => {
  const { data } = await api.get("/api/ai/daily-motivation/");
  console.log("DAILY MOTIVATION OK:", data);
  return data; // raw
};