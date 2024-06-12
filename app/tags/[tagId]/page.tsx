"use client"

import { getProductsByTag } from "@/api/getProductsByTag";
import { getTagName } from "@/api/getTagName";
import { Product } from '@/types';
import { useEffect, useState } from 'react';

import Gallery from '@/components/gallery';
import Navbar from '@/components/navbar';

const TagPage = ({ params }: { params: { tagId: string } }) => {
    const tagId = Number(params.tagId);
    const [products, setProducts] = useState<Product[]>([]);
    const [tagName, setTagName] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await getProductsByTag(tagId);
                setProducts(data);
                const tagNameData = await getTagName(tagId);
                setTagName(tagNameData);
            } catch (err) {
                setError('Failed to fetch data');
                console.error(err);
            }
        };
        getProducts();
    }, [tagId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="py-32">
                <h1 className="text-center text-2xl font-light mb-4">{tagName}</h1> 
                <Gallery products={products} />
            </div>
        </div>
    );
}

export default TagPage;