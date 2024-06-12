"use client"

import Gallery from "@/components/gallery";
import Navbar from "@/components/navbar";

import { getData } from "@/api/getData";
import { useEffect, useState } from "react";
import { Product } from "@/types";

export default function Home() {
  const [productInfo, setProductInfo] = useState<Product[]>([]);

  useEffect(() => {
    const getDataFromApi = async () => {
        const data = await getData();
        setProductInfo(data);
    }
    getDataFromApi();
}, [])

  return (
    <div>
      <Navbar />
      <div className="py-32">
        <Gallery products={productInfo} />
      </div>
    </div>
  );
}
