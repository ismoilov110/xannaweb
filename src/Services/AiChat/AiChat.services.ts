    import { api } from "../Api";

    // bu file faqat AIChat bilan bog'liq API chaqiriqlarini o'z ichiga oladi

    // bu APIChatMessage formatini backenddan keladigan formatga moslashtirish uchun ishlatiladi
    export type ApiChatMessage = {
        // backenddan keladigan format:
        role: "user" | "assistant";
        content: string;
        timestamp: string;
    };


    // export type ApiCategory = {
    //     id: number;
    //     name: string;
    //     icon: string;
    //     description: string;
    //     system_prompt?: string;
    // }

    // export async function getCategories() {
    //     const { data } = await api.get("/api/ai/categories/"); // bu kodni vazifasi backenddan AI chat kategoriyalarini olish va ularni ApiCategory formatiga moslashtirish. Bu ma'lumotlar keyinchalik chat kategoriyalarini ko'rsatishda ishlatiladi, masalan, Category komponentida.
    //     return data as ApiCategory[]; // bu yerda biz backenddan keladigan ma'lumotlarni TypeScript tipiga moslashtiramiz
    // }


    
    
    // bu yerda biz backendga categoyId bilan so'rov yuboramiz va suhbatni boshlaymiz va chatga oid ma'lumotlarni olamiz
    export async function startChat(categoryId: number) {
        const { data } = await api.get(`/api/ai/chat/${categoryId}/`); // const { data} = await api.get(`/api/ai/chat/${categoryId}/start/`); // bu kodni vazifasi chatni boshlash va unga oid ma'lumotlarni olish, masalan, conversation_id va boshlang'ich xabarlar ro'yxati. Bu ma'lumotlar keyinchalik chat davomida ishlatiladi, masalan, yangi xabar yuborishda yoki chat tarixini olishda.
        return data as { // bu yerda biz backenddan keladigan ma'lumotlarni TypeScript tipiga moslashtiramiz
            conversation_id: number; // bu id chat davomida ishlatiladi, masalan, yangi xabar yuborishda yoki chat tarixini olishda
            messages: ApiChatMessage[] // bu yerda chatning boshlang'ich xabarlar ro'yxati bo'ladi, odatda bu ro'yxat bitta xabardan iborat bo'ladi, u ham backend tomonidan yaratilgan va foydalanuvchiga salomlashish uchun ishlatiladi
        };
    }

    export async function sendMassege(categoryId: number, conversationId: number, message: string) {
        const { data } = await api.post(`/api/ai/chat/${categoryId}/`, {
            message,
            conversation_id: conversationId
        });
        return data as {
            conversation_id: number;
            user_message: ApiChatMessage;
            ai_response: ApiChatMessage;
        }
    };