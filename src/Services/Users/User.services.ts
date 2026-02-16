import { api } from "../Api";

// servisecdan me zapros get bilan olinvoti 
export const meService = () => api.get("/me/");