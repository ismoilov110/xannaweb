import axios from "axios"

// bu man api ozgaruchi ochib request yuborvomiz
export const api = axios.create({
    baseURL: `https://xannaofficial.uz`,
    headers: {
        "Content-Type": "application/json"
    }
});

// bu yerda xar request ketsa shu kodni ishlat degan buyruq bervomiz
api.interceptors.request.use((config) => {
    // LocalStorage bu brauzer xotirasi bu sahifani ochirsang ham refresh bersang ham ochib ketmaydi
    const token = localStorage.getItem("access_token"); // bu yerda access_token nomli qiymatni olib keladi 
    // bu yerda if shartli operatire bilan tokeni tekshirib olvomiz yani token bolsa ishlatsin bolmasa yoq 
    if (token) {
        config.headers.Authorization = `Bearer ${token}`// bu yerda biz ozimizni kimligimizni korsatyapmiz
    }
    return config;
});