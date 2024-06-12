import { Product } from "@/types";

interface ApiResponse {
    data: Product[] | Product;
}

export const getData = async (): Promise<Product[]>  => {
    const query = await fetch("https://www.bortakvall.se/api/v2/products");
    const response = await query.json() as ApiResponse;
    return response.data as Product[];
}

export const getSingleData = async (id: string): Promise<Product> => {
    const query = await fetch(`https://www.bortakvall.se/api/v2/products/${id}`);
    const response = await query.json() as ApiResponse;
    return response.data as Product;
}
