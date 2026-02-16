import axios from "axios";
import { api } from "./Api"


export const registerService = async (payload: {
  phone_number: string;
  first_name: string;
  last_name: string;
  password1: string;
  password2: string;
}) => {
  try {
    return await api.post("/register/", payload);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("STATUS:", error.response?.status);
      console.log("RESPONSE:", error.response?.data); // <<< ENG MUHIM
      console.log("SENT PAYLOAD:", payload);
    }
    throw error;
  }
};

export const loginService = (payload: {
    phone_number: string,
    password: string
}) => api.post("/login/", payload)

