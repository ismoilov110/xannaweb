import axios from "axios"

// bu man api ozgaruchi ochib request yuborvomiz
export const api = axios.create({
    baseURL: `https://xannaofficial.uz`,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json"
    }
});

// bu yerda xar request ketsa shu kodni ishlat degan buyruq bervomiz
api.interceptors.request.use((config) => {
    // LocalStorage bu brauzer xotirasi bu sahifani ochirsang ham refresh bersang ham ochib ketmaydi
    const token = localStorage.getItem("access_token"); // bu yerda access_token nomli qiymatni olib keladi 
    console.log(`API REQUEST: ${config.method?.toUpperCase()} ${config.url}`, config.data);
    // bu yerda if shartli operatire bilan tokeni tekshirib olvomiz yani token bolsa ishlatsin bolmasa yoq 
    if (token) {
        config.headers.Authorization = `Bearer ${token}`// bu yerda biz ozimizni kimligimizni korsatyapmiz
    }
    return config;
});

// Response interceptor: 401 (Unauthorized) xatoliklarni ushlab olamiz
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn("Seans muddati tugagan yoki token xato. Tizimdan chiqilmoqda...");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            // Register'ga yo'naltiramiz, u yerdan login qilsa bo'ladi
            window.location.href = "/register";
        }
        return Promise.reject(error);
    }
);