"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { CheckCircle, CreditCard, Truck } from "lucide-react";
import { useFirestore, useUser } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

const checkoutFormSchema = z.object({
  name: z.string().min(2, "Name is required."),
  address: z.string().min(10, "A valid address is required."),
  city: z.string().min(2, "City is required."),
  pincode: z.string().min(6, "A valid pincode is required.").max(6),
  paymentMethod: z.enum(["cod", "upi"], {
    required_error: "You need to select a payment method.",
  }),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart, itemCount } = useCart();
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const firestore = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
  });

  if (itemCount === 0 && !showConfirmation) {
    if (typeof window !== 'undefined') {
      router.push('/shop');
    }
    return null;
  }
  
  async function onSubmit(data: CheckoutFormValues) {
    if (!firestore || !user) {
        toast({ variant: 'destructive', title: "Error", description: "You must be logged in to place an order."});
        return;
    };
    
    const orderData = {
        userId: user.uid,
        orderDate: serverTimestamp(),
        totalAmount: totalPrice,
        paymentMethod: data.paymentMethod,
        shippingAddress: {
            name: data.name,
            address: data.address,
            city: data.city,
            pincode: data.pincode,
        },
        items: cart.map(item => ({
            productId: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            imageUrl: item.image,
        })),
        status: 'pending'
    };

    try {
        await addDoc(collection(firestore, 'orders'), orderData);
        setShowConfirmation(true);
        clearCart();
    } catch (error) {
        console.error("Error placing order: ", error);
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem placing your order.",
        })
    }
  }

  return (
    <>
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-center text-4xl font-bold font-headline">Checkout</h1>
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Shipping & Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem><FormLabel>Address</FormLabel><FormControl><Input placeholder="123 Main St" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <FormField control={form.control} name="city" render={({ field }) => (
                      <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="Anytown" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="pincode" render={({ field }) => (
                      <FormItem><FormLabel>Pincode</FormLabel><FormControl><Input placeholder="123456" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                    <FormItem className="space-y-3"><FormLabel>Payment Method</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                          <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl><RadioGroupItem value="cod" /></FormControl>
                            <FormLabel className="font-normal">Cash on Delivery (COD)</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl><RadioGroupItem value="upi" /></FormControl>
                            <FormLabel className="font-normal">UPI</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    <FormMessage /></FormItem>
                  )} />
                  <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <CreditCard className="mr-2 h-5 w-5" />Place Order
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>{itemCount} item(s)</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64 pr-4">
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md object-cover" data-ai-hint="product image" />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="flex-col items-stretch gap-2">
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
    <AlertDialog open={showConfirmation}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <AlertDialogTitle className="text-center">Order Placed Successfully!</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Thank you for your purchase. Your order is being processed and will be shipped soon. You'll receive a confirmation email shortly.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogAction onClick={() => router.push('/')} className="w-full">
          <Truck className="mr-2 h-4 w-4" /> Continue Shopping
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
