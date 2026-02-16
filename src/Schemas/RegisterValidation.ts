import { z } from "zod";

export const registerSchema = z
    .object({
        name: z
            .string()
            .min(2, "Ismingiz kamida 2 ta harfdan iborat bo‘lishi kerak"),

        surname: z
            .string()
            .min(2, "Familiyangiz kamida 2 ta harfdan iborat bo‘lishi kerak"),

        phoneNumber: z
            .string()
            .min(9, "Telefon raqamingizni to‘liq kiriting"),

        email: z
            .string()
            .email("Email noto'g'ri")
            .optional()
            .or(z.literal("")),// ixtiyoriy

        password1: z
            .string()
            .min(6, "Parol kamida 6 ta belgidan iborat bo‘lishi kerak"),

        password2: z
            .string()
            .min(6, "Parolni qayta kiriting"),
    })
    .refine((data) => data.password1 === data.password2, {
        message: "Parollar mos kelmadi",
        path: ["password2"],
    });

export type RegisterFormValues = z.infer<typeof registerSchema>;
