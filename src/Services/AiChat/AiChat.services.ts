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
    name: string;
    image: string;
    description: string;
    system_prompt?: string;
}

export async function getCategories() {
    const { data } = await api.get("/api/ai/categories/");
    return data.categories as ApiCategory[]; // bu yerda biz backenddan keladigan ma'lumotlarni TypeScript tipiga moslashtiramiz
}




// bu yerda biz backendga categoyId bilan so'rov yuboramiz va suhbatni boshlaymiz va chatga oid ma'lumotlarni olamiz
export async function startChat(categoryId: number) {
    const { data } = await api.get(`/api/ai/chat/${categoryId}/`);
    return data as {
        success: boolean;
        conversation: {
            id: number;
            [key: string]: any;
        };
        messages: ApiChatMessage[]
    };
}

export async function sendMassege(categoryId: number, conversationId: number, message: string) {
    // Agar backend 'conversation_id' o'rniga 'id' kutyotgan bo'lsa, bu yerda tekshirish kerak.
    // Hozirgi holatda metadata 'id' deb ko'rsatmoqda.
    const { data } = await api.post(`/api/ai/chat/${categoryId}/`, {
        message,
        conversation_id: conversationId // Agar xato davom etsa, buni 'id' ga almashtirib ko'rish mumkin
    });
    return data as {
        success: boolean;
        conversation_id: number;
        user_message: ApiChatMessage;
        assistant_message: ApiChatMessage; // ai_response emas, assistant_message
    }
};