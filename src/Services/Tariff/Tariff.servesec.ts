import { api } from "../Api";



export type PaymentMethod = {
    id: string;
    name: string;
    icon: string;
    url: string;
};

export const getTariffPurchaseService = (tariffId: number) =>
    api.get(`/api/tariffs/${tariffId}/purchase/`)