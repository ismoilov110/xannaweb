import { z } from "zod"
import type { registerSchema } from "./RegisterValidation"

export const registerSchame = z.object({
    name: z.string().min(6, "ismingiz faqat 6 ta harfdan iborat bolishi kerak"),
    surname: z.string().min(7, "familyangizda xatolik bor tekshirib korin!"),
    phoneNumber: z.string().min(10, "telefon raqamingizni xato kirgizdingiz tekshirib qayta orinib koring"),
    email: z.string().email("Email Notogri"),
    Pasword: z.string().min(6, "Parol kamida 6 ta bolishi kerak")
})

export type RegisterFormValues = z.infer<typeof registerSchema>
