export interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    on_sale: boolean;
    images: {
        thumbnail: string;
        large: string;
    };
    stock_status: 'instock' | 'outofstock';
    stock_quantity: number | null;
    tags: Tag[];
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface CartState {
    items: CartItem[];
}

export type OrderData = {
    id?: number,
    customer_first_name: string,
    customer_last_name: string,
    customer_address: string,
    customer_postcode: string,
    customer_city: string,
    customer_email: string,
    customer_phone: string | null,
    order_items: OrderItem[]
    order_total: number
}

export interface OrderItem {
    product_id: number,
    qty: number,
    item_price: number,
    item_total: number
}

export interface ApiSuccessResponse {
    status: 'success';
    message: string;
    data: OrderData;
}