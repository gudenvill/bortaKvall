"use client";

import Image from "next/image";
import Navbar from "@/components/navbar";
import AddToCart from "@/components/ui/addToCart";
import DynamicHtmlContent from "@/components/dangerHtml";

import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/context/cart-context";
import { getSingleData } from "@/api/getData";
import { useEffect, useState } from "react";
import { Product } from "@/types";
import { CartProvider } from "@/context/cart-context";
import RelatedTags from "@/components/relatedTags";

const ProductPage = ({ params }: { params: { id: string } }) => {
    const link = "http://www.bortakvall.se";
    const { toast } = useToast();
    const { id } = params;
    const { addToCart } = useCart()
    const [product, setProduct] = useState<Product>();

    useEffect(() => {
        const fetchProduct = async () => {
            const productData = await getSingleData(id);
            setProduct(productData);
        }
        fetchProduct();
    }, [id]);

    if (!product) {
        return <div>Oops.. Such Empty</div>;
    }

    const handleAddToCart = (product: Product) => {
        const success = addToCart(product);
        if (success) {
            toast({
                title: "Produkt läggt till",
                description: `${product.name} har lagts till i din kundvagn`,
            });
        } else {
            toast({
                title: "Kunde inte lägga till",
                description: `Kan inte lägga ${product.name} till kundvagnen. Det kan vara slut på lagret eller du har tagit alla tillgängliga`,
                variant: "destructive"
            });
        }
    };

    const description = product.description || "";

    return ( 
        <div className="container mx-auto px-4">
            <Toaster />
            <Navbar />
            <div className="bg-white mt-20 p-4 border-2 border-gray-300 rounded-lg shadow-md hover:bg-gray-50 transition duration-300 ease-in-out">
                <div className="flex flex-col items-center sm:flex-row sm:items-start sm:justify-around">
                    <div className="w-full sm:w-1/2 lg:w-1/3 p-5">
                        <Image src={link + product.images.large} alt={product.name} width={500} height={500} className="rounded-md mx-auto" />
                    </div>
                    <div className="mt-4 sm:mt-0 sm:w-1/2 lg:w-1/3 text-center sm:text-left">
                        <h1 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h1>
                        <p className="text-gray-600">{product.price} SEK</p>
                        <div className="text-sm text-gray-500">
                            <div className="font-semibold italic">Product Beskivning:</div>
                            <DynamicHtmlContent htmlContent={description} />
                        </div>
                        <div>
                            <button onClick={() => handleAddToCart(product)}>
                                <AddToCart />
                            </button>
                        </div>
                        <div>
                            <RelatedTags tags={product.tags} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default ProductPage;