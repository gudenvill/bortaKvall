import { MdPayment } from "react-icons/md";

const GoToCheckout = () => {
    return ( 
        <div className="border-2 border-black rounded-md p-3 my-3 w-64 flex flex-row justify-between text-black hover:text-white bg-transparent hover:bg-black">
            <div className="text-2xl">
                <MdPayment />
            </div>
            <div className="text-md font-bold">
                Gå till kassan
            </div>
        </div>
     );
}
 
export default GoToCheckout;

