import { api } from "../Api";

// servisecdan me zapros get bilan olinvoti 
export const meService = () => api.get("/me/");

// Profile rasmiani yangilash uchun xizmat
export const updateUserImageService = (formData: FormData) => api.post("/me/image/", formData, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
});

// Profile ma'lumotlarini yangilash uchun xizmat
export const updateProfileService = (formData: FormData) => api.patch("/me/", formData, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
});
