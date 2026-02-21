import { api } from "../Api";

// bu file faqat AIChat bilan bog'liq API chaqiriqlarini o'z ichiga oladi

// bu APIChatMessage formatini backenddan keladigan formatga moslashtirish uchun ishlatiladi
export type ApiChatMessage = {
    // backenddan keladigan format:
    role: "user" | "assistant";
    content: string;
    created_at: string;
    timestamp?: string; // zaxira uchun
};


export type ApiCategory = {
    id: number;
    title: string;
    image: string;
    name: string;
    system_prompt?: string;
}

export async function getCategories() {
    const { data } = await api.get("/api/ai/categories/");
    return data.categories as ApiCategory[]; // bu yerda biz backenddan keladigan ma'lumotlarni TypeScript tipiga moslashtiramiz
}




// bu yerda biz backendga categoyId bilan so'rov yuboramiz va suhbatni boshlaymiz va chatga oid ma'lumotlarni olamiz
export async function startChat(_categoryId: number) {
    try {
        // FormData ishlatish orqali application/json cheklovidan o'tamiz
        // const { data } = await api.post(`/api/ai/quick-chat/${_categoryId}/`, formData, {
        // headers: {
        //         "Content-Type": "multipart/form-data"
        //     }
        // });
        // return data as {
        //     success: boolean;
        //     conversation?: {
        //         id: number;
        //         [key: string]: any;
        //     };
        //     conversation_id?: number;
        //     messages?: ApiChatMessage[]
        // };
    } catch (error) {
        console.error("startChat error:", error);
        throw error;
    }
}

export async function sendMessage(categoryId: number, conversationId: number | null, message: string) {
    const formData = new FormData();
    formData.append("message", message);
    if (conversationId) {
        formData.append("conversation_id", conversationId.toString());
    }

    const { data } = await api.post(`/api/ai/quick-chat/${categoryId}/`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return data as {
        success: boolean;
        conversation_id?: number;
        user_message: ApiChatMessage;
        assistant_message: ApiChatMessage;
    }
};
