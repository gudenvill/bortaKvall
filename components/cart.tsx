import React from "react";
import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { FaTrash } from "react-icons/fa";
import { Button } from "./ui/button";
import Link from "next/link";
import GoToCheckout from "./ui/goToCheckout";

const Cart = () => {
    const { cart, addToCart, removeFromCart, removeOneFromCart } = useCart();
    const link = "http://www.bortakvall.se"
    const totalPrice = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

    return (
        <div className="container mx-auto px-4">
            <p className="mb-2">{cart.length} Sorter i varukorgen:</p>
            {cart.map((item) => (
                <div key={item.product.id} className="flex items-center mb-4 bg-white p-4 rounded-lg shadow">
                    <Image src={link + item.product.images.thumbnail} alt={item.product.name} width={64} height={64} className="rounded-md" />
                    <div className="m-2 text-xs">
                        <h4 className="font-semibold">{item.product.name}</h4>
                        <p>Pris: {item.product.price} SEK</p>
                        <p>Antal: {item.quantity}</p>
                        <p>Total: {item.product.price * item.quantity} SEK</p>
                        <div className="flex items-center">
                            <button onClick={() => addToCart(item.product)} className="px-2 py-1 text-white bg-green-500 rounded hover:bg-green-600">+</button>
                            <button onClick={() => item.quantity > 1 ? removeOneFromCart(item.product.id) : removeFromCart(item.product.id)} className="px-2 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600 mx-2">-</button>
                            <button onClick={() => removeFromCart(item.product.id)} className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"><FaTrash/></button>
                        </div>
                    </div>
                </div>
            ))}
            <h3 className="text-xl font-semibold mt-6">Totalt Pris: {totalPrice} SEK</h3>
            {cart.length > 0 && (
                <Link href="/checkout">
                    <button>
                        <GoToCheckout />
                    </button>
                </Link>
            )}
        </div>
    );
}

export default Cart;