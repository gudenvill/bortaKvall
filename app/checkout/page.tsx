"use client"

import Navbar from "@/components/navbar";
import CartSum from "@/components/cartSum";

import { BuyForm } from "@/components/forms/fromSchema";
import { useState, useEffect } from "react";

const Checkout = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center h-screen my-96 md:my-64">
                <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-4xl mx-auto p-8"> {/* Added items-center to center align children vertically */}
                    <div className="w-full md:max-w-md p-8 border rounded-lg">
                        {isMounted && <CartSum />}
                    </div>
                    <div className="w-full md:max-w-md p-8 border rounded-lg mb-4 md:mb-0">
                        <BuyForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;