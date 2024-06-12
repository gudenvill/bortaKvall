"use client"

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
const ShowCart = dynamic(() => import('@/components/showCart'), {
  ssr: false
});
import Link from "next/link";
import ShowTags from "@/components/showTags";

const Navbar = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    return (
            <div className="fixed top-0 left-0 right-0 bg-black text-white w-full h-16 z-50 flex justify-between items-center px-8 mb-8">
                <div className="font-bolder text-lg">
                    <Link href="/">
                        BortaKväll
                    </Link>
                </div>
                <ShowTags  />
                <div className="flex items-center gap-4">
                    {isMounted && <ShowCart />}
                </div>
            </div>
        );
}
 
export default Navbar;