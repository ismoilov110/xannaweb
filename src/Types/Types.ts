// CategoriesChat uchun type

export interface categoriesy {
    titles: string,
    icon: any,
    color: string,
    greeting: string
}


export interface Message {
    id: number,
    text: string,
    isUser: boolean,
    timestamp: Date
}

export type CategoriesType = Record<string, categoriesy>


// Auth typlari

export interface LoginPayload {
    phone_number: string,
    password: string
}

export interface RegisterPayload {
    phone_number: string,
    fist_name: string,
    last_name: string,
    password: string,
    password2: string
}

export interface AuthState  {
    isAuth: boolean;
    status: "idle" | "loading" | "succeeded" | "failed",
    error?: string       
}