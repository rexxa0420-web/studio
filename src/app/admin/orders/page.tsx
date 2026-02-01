'use client';

import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function AdminOrdersPage() {
  const firestore = useFirestore();
  const ordersQuery = useMemoFirebase(() => {
    return query(collection(firestore, 'orders'), orderBy('orderDate', 'desc'));
  }, [firestore]);

  const { data: orders, isLoading } = useCollection(ordersQuery);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading orders...</p>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {orders?.map((order) => (
              <AccordionItem key={order.id} value={order.id}>
                <AccordionTrigger>
                    <div className="flex justify-between w-full pr-4">
                        <span>Order #{order.id.slice(0, 7)}...</span>
                        <span>{format(new Date(order.orderDate.toDate()), 'PPP')}</span>
                        <span>₹{order.totalAmount.toFixed(2)}</span>
                        <Badge>{order.paymentMethod.toUpperCase()}</Badge>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="p-4 bg-muted/50 rounded-md">
                        <h4 className="font-semibold mb-2">Shipping Address</h4>
                        <p>{order.shippingAddress.name}</p>
                        <p>{order.shippingAddress.address}</p>
                        <p>{order.shippingAddress.city}, {order.shippingAddress.pincode}</p>
                        <h4 className="font-semibold mt-4 mb-2">Items</h4>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Price</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {order.items.map((item: any, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>₹{item.price.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
        {orders?.length === 0 && !isLoading && (
            <div className="text-center py-12 text-muted-foreground">
              No orders have been placed yet.
            </div>
        )}
      </CardContent>
    </Card>
  );
}
