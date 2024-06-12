import { Product } from "@/types";
import Image from "next/image";

const Card: React.FC<{ product: Product }> = ({ product }) => {
    const link = "https://www.bortakvall.se"
    return (
        <div className="border-2 border-gray-300 rounded-lg shadow-md p-4 bg-white hover:bg-gray-50 transition duration-300 ease-in-out w-full max-w-sm mx-auto sm:max-w-md flex flex-col items-center text-xs md:text-sm">
            <h3 className="text-lg font-semibold text-gray-800 truncate text-center">{product.name}</h3>
            <div className="my-2">
                <Image src={link + product.images.thumbnail} alt={product.name} width={200} height={200} className="rounded-md" />
            </div>
            <p className="text-gray-600 text-center">${product.price}</p>
            <p className={`font-medium ${product.stock_status === 'instock' ? 'text-green-500' : 'text-red-500'} text-center`}>
                {product.stock_status === 'instock' ? 'In Stock' : 'Out of Stock'}
            </p>
            <p className="text-sm text-gray-500 text-center">Quantity: {product.stock_quantity}</p>
            <p className="text-xs text-gray-400 mt-2 text-center">Tags: {product.tags.map((tag) => tag.name).join(", ")}</p>
        </div>
    );
}

export default Card;