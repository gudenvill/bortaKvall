import { Tag } from "@/types";

interface ApiResponse {
    status: string;
    data: Tag[];
}

export const getTags = async () => {
    const response = await fetch("https://www.bortakvall.se/api/v2/tags");
    const jsonResponse = await response.json() as ApiResponse;
    if (jsonResponse.status === "success") {
        return jsonResponse.data;
    } else {
        throw new Error("Failed to fetch tags");
    }
}

