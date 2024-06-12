import { Product } from "@/types";

interface ApiResponse {
    status: string;
    data: {
        products: Product[];
    };
}

export const getProductsByTag = async (tagId: number): Promise<Product[]> => {
    const query = await fetch(`https://www.bortakvall.se/api/v2/tags/${tagId}`);
    const response = await query.json() as ApiResponse;
    return response.data.products;
}