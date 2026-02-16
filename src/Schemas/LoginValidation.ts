import { z } from "zod"

export const loginSchema = z.object({
    PhoneNumber: z.string().min(10, "Telefon raqamingizni notogri kiritingiz"),
    password1: z.string().min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak")
})

export type LoginFormValues = z.infer<typeof loginSchema>
