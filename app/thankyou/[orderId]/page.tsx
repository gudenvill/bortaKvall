import Navbar from "@/components/navbar";
import Link from "next/link";
import { FaHeart } from 'react-icons/fa';


const ThankYouPage = ({ params }: { params: { orderId: string } }) => {
    const { orderId } = params;
    return (
    <div>
        <Navbar />
        <div className="flex items-center justify-center h-screen flex-col">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center w-64">
                <FaHeart className="text-red-500 mx-auto text-3xl" />
                <h1 className="text-xl font-semibold mt-4">Tack!</h1>
                <p className="text-gray-600 mt-2">Ditt order nummer är: <span className="font-semibold">{orderId}</span></p>
            </div>
            <Link href="/">
                <div className="text-lg font-bold text-white hover:text-black bg-black hover:bg-white p-6 rounded-lg shadow-lg text-center w-64">
                    Forsätt handla
                </div>
            </Link>
        </div>
    </div> 
    );
}
 
export default ThankYouPage;