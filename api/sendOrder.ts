import axios from "axios";
import { OrderData, ApiSuccessResponse } from "../types";

const BASE_URL = "https://www.bortakvall.se/api/v2"

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
})

const post = async <Payload, Response = unknown>(endpoint: string, data: Payload) => {
    const res = await instance.post<Response>(endpoint, data);
    return res.data
}

export const sendOrder = async (order: OrderData) => {
    return post<OrderData, ApiSuccessResponse>("/users/42/orders", order);
}