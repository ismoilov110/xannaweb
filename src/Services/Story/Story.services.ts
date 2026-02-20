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
export async function getActiveStrory(){
    const {data} = await api.get("/api/ai/story/");
    return data as {success: boolean; has_story: boolean; story: StoryPrompt | null,  message: string};
} 


// export async function geyStoryHistory() {
//     const {data} = await api.get("/api/ai/story/history/")
// }


