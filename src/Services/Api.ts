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
    async (error) => {
        const originalRequest = error.config;

        // Agar xatolik 401 bo'lsa va bu qayta urinish bo'lmasa
        if (error.response?.status === 401 && !originalRequest._retry) {

            // Login yoki Register paytida 401 kelsa, redirect qilmaymiz (xato componentda chiqishi kerak)
            if (originalRequest.url?.includes("/login/") || originalRequest.url?.includes("/register/")) {
                return Promise.reject(error);
            }

            originalRequest._retry = true;
            const refreshToken = localStorage.getItem("refresh_token");

            if (refreshToken) {
                try {
                    // Refresh token orqali yangi access token olish
                    const response = await axios.post(`${api.defaults.baseURL}/token/refresh/`, {
                        refresh: refreshToken
                    });

                    const newAccessToken = response.data.access;
                    localStorage.setItem("access_token", newAccessToken);

                    // Original requestni yangi token bilan qayta yuborish
                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    }

                    return api(originalRequest);
                } catch (refreshError) {
                    console.error("Refresh token xatosi:", refreshError);
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    window.location.href = "/register";
                    return Promise.reject(refreshError);
                }
            } else {
                localStorage.removeItem("access_token");
                window.location.href = "/register";
            }
        }

        return Promise.reject(error);
    }
);
