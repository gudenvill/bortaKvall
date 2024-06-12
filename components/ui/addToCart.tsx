import { FaCartPlus } from "react-icons/fa";

const AddToCart = () => {
    return ( 
        <div className="border-2 border-black rounded-md p-3 my-3 w-64 flex flex-row justify-between text-black hover:text-white bg-transparent hover:bg-black">
            <div className="text-2xl">
                <FaCartPlus />
            </div>
            <div className="text-md font-bold">
                Lägg till i kundvagnen
            </div>
        </div>
     );
}
 
export default AddToCart;

