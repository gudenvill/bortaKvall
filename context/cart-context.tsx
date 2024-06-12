"use client"
import React, { createContext, useContext, useEffect, useState} from "react";
import { CartItem, Product } from "@/types";

const CART_STORAGE_KEY = 'cart';

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => boolean;
    removeFromCart: (id: number) => void;
    removeOneFromCart: (id: number) => void;
}

const CartContext = createContext<CartContextType>({
    cart: [],
    addToCart: (product: Product) => false,
    removeFromCart: () => {},
    removeOneFromCart: () => {},
});

interface CartProviderProps {
    children: React.ReactNode;
}

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        if (typeof window !== 'undefined') {
            const storedCart = localStorage.getItem(CART_STORAGE_KEY);
            return storedCart ? JSON.parse(storedCart) : [];
        } else {
            return [];
        }
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        }
    }, [cart]);

    const addToCart = (product: Product): boolean => {
        const existingItemIndex = cart.findIndex((item) => item.product.id === product.id);
        if (product.stock_quantity === null) {
            return false;
        }
        if (existingItemIndex !== -1) {
            const existingItem = cart[existingItemIndex];
            if (existingItem.quantity < product.stock_quantity) {
                const updatedCart = [...cart];
                updatedCart[existingItemIndex].quantity++;
                setCart(updatedCart);
                return true;
            } else {
                return false; 
            }
        } else {
            if (product.stock_quantity > 0) {
                setCart([...cart, { product, quantity: 1 }]);
                return true;
            } else {
                return false;
            }
        }
    };

    const removeFromCart = (id: number) => {
        setCart(cart.filter((item) => item.product.id !== id));
    };

    const removeOneFromCart = (id: number) => {
        const updatedCart = cart.map((item) => {
            if (item.product.id === id && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1};
            }
            return item;
        });
        setCart(updatedCart);
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, removeOneFromCart }}>
            {children}
        </CartContext.Provider>
    );
}; 

export default CartContext;