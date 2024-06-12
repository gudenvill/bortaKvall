import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { FaCreditCard } from "react-icons/fa6";
import { OrderData, OrderItem } from "@/types";
import { useCart } from '@/context/cart-context'; 
import { sendOrder } from '@/api/sendOrder';
import { useRouter } from 'next/navigation'; 
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  customer_first_name: z.string().min(2, { message: "Namnet måste innehålla minst 2 bokstäver." }),
  customer_last_name: z.string().min(2, { message: "Efternamnet måste innehålla minst 2 bokstäver." }),
  customer_address: z.string().min(2, { message: "Adressen måste innehålla minst 2 bokstäver." }),
  customer_postcode: z.string().min(5, { message: "Postnumret måste innehålla minst 5 siffror." }),
  customer_city: z.string().min(2, { message: "Stadens namn måste innehålla minst 2 bokstäver." }),
  customer_email: z.string().email({ message: "Ange en giltig e-postadress." }),
  customer_phone: z.string().min(10, { message: "Telefonnumret måste innehålla minst 10 siffror." }),
});

export function BuyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        customer_first_name: "",
        customer_last_name: "",
        customer_address: "",
        customer_postcode: "",
        customer_city: "",
        customer_email: "",
        customer_phone: "",
      },
  });

  const { cart } = useCart();
  const router = useRouter();


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (cart.length === 0) {
      alert('At least one item must be added to the cart.');
      return;
    }

    const orderItems: OrderItem[] = cart.map(item => ({
      product_id: item.product.id,
      qty: item.quantity,
      item_price: item.product.price,
      item_total: item.product.price * item.quantity
    }));
    const orderTotal = orderItems.reduce((acc, item) => acc + item.item_total, 0);

    const newOrder: OrderData = {
      ...values,
      order_items: orderItems,
      order_total: orderTotal,
      customer_phone: values.customer_phone || null
    };

    try {
      const response = await sendOrder(newOrder);
      if (response.status === "success") {
        router.push(`/thankyou/${response.data.id}`);
      } else {
        alert("Order submission failed.");
      }
    } catch (error: any) {
      console.error("API Error:", error.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="customer_first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Förnamn</FormLabel>
              <FormControl>
                <Input placeholder="Paul" {...field} />
              </FormControl>
              <FormDescription>
                Vad heter du i förnamn?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customer_last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Efternamn</FormLabel>
              <FormControl>
                <Input placeholder="Atreides" {...field} />
              </FormControl>
              <FormDescription>
                Vad heter du i efternamn?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customer_address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adress</FormLabel>
              <FormControl>
                <Input placeholder="Arrakeen Palace" {...field} />
              </FormControl>
              <FormDescription>
                Ange din adress.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customer_postcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postnummer</FormLabel>
              <FormControl>
                <Input placeholder="12345" {...field} />
              </FormControl>
              <FormDescription>
                Ange ditt postnummer.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customer_city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stad</FormLabel>
              <FormControl>
                <Input placeholder="Arrakeen" {...field} />
              </FormControl>
              <FormDescription>
                Ange staden du bor i.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customer_email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="paul@atreides.com" {...field} />
              </FormControl>
              <FormDescription>
                Ange din e-postadress.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customer_phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefonnummer</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="0701234567" {...field} />
              </FormControl>
              <FormDescription>
                Ange ditt telefonnummer.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          <FaCreditCard />
          <div className="flex items-center justify-center m-2">
            Betala
          </div>
        </Button>  
      </form>
    </Form>
  )
}

function onSubmit(values: z.infer<typeof formSchema>) {
  console.log(values);
}