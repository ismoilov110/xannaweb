import { api } from "../Api";


export type StoryPrompt = {
    id: number;
    image: string;
    ai_response: string;
    is_active: boolean;
    created_at: string;
    expires_at: string;
    time_remaining_hours: number;
    is_expired: boolean;
};


// API call to get active story
export async function getActiveStory() {
    const { data } = await api.get("/api/ai/story/");
    return data as { success: boolean; has_story: boolean; story: StoryPrompt | null, message: string };
}

// Aliases for compatibility
export const getActiveStrory = getActiveStory;

// bu API call orqali biz o'zimizning barcha story tariximizni olamiz
export async function getStoryHistory() {
    const { data } = await api.get("/api/ai/story/history/")
    return data as { success: boolean; total: number; stories: StoryPrompt[] };
}

// Aliases for compatibility
export const geyStoryHistory = getStoryHistory;

export async function uploadStoryImage(file: File) {
    const formData = new FormData()
    formData.append("image", file);

    const { data } = await api.post("/api/ai/story/", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return data as { success: boolean; story?: StoryPrompt; message?: string; error?: any; }
}



