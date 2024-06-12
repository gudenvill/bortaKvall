import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerClose, DrawerFooter } from "./ui/drawer";
import { Button } from "./ui/button";
import { IoMdClose } from "react-icons/io";
import { BsCart4 } from "react-icons/bs";
import { useCart } from "@/context/cart-context";
import Cart from "./cart";

const ShowCart = () => {
    const { cart } = useCart();
    const totalItems = cart.length;
    return ( 
        <div>
            <Drawer>
                <DrawerTrigger asChild>
                    <Button>
                        <div className="flex flex-row">
                            <div className="text-lg">
                                <BsCart4 />
                            </div>
                            <span className="mx-2 text-xs">{totalItems}</span>
                        </div>
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerClose asChild>
                            <Button variant="ghost" size="icon">
                                <IoMdClose />
                            </Button>
                        </DrawerClose>
                    </DrawerHeader>
                    <Cart />
                    <DrawerFooter>
                        <DrawerClose>
                            <Button variant="ghost" size="icon">
                                <IoMdClose />
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
     );
}
 
export default ShowCart;