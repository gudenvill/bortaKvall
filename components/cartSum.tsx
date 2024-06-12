import React from 'react';
import Image from 'next/image';
import { useCart } from "@/context/cart-context";

const CartSum = () => {
    const { cart } = useCart();
    const totalPrice = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const link = "https://www.bortakvall.se"

    return (
        <div>
            <div className="text-sm p-4 border rounded-lg shadow">
                <h1 className="font-normal text-lg">Varukorgssammanfattning</h1>
                <div className="italic mt-4">
                    <p>Antal Produkter: {totalItems}</p>
                    <p>Totalt Pris: {totalPrice.toFixed(2)} SEK</p>
                </div>
                <h2 className="text-md font-light mt-2">Varor i varukorgen:</h2>
                <ul>
                    {cart.map((item, index) => (
                        <li key={index} className="mt-2 flex items-center">
                            <Image src={link + item.product.images.thumbnail} alt={item.product.name} width={50} height={50} />
                            <div>
                                <p>{item.product.name} - {item.product.price.toFixed(2)} SEK x {item.quantity}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div> 
    );
}

export default CartSum;