"use client";

import Card from "./card";
import Link from "next/link";
import { Product } from "@/types";

interface GalleryProps {
    products: Product[];
}

const Gallery = ({ products }: GalleryProps) => {
    if (!products || !Array.isArray(products)) {
        return <div>No products found.</div>;
    }

    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product, index) => (
                    <Link key={index} href={`/products/${product.id}`}>
                        <Card product={product} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Gallery;