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

export default function AdminAppointmentsPage() {
  const firestore = useFirestore();
  const appointmentsQuery = useMemoFirebase(() => {
    return query(collection(firestore, 'appointments'), orderBy('appointmentDateTime', 'desc'));
  }, [firestore]);
  
  const { data: appointments, isLoading } = useCollection(appointmentsQuery);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Repair Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading appointments...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Problem</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments?.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    {format(new Date(appointment.appointmentDateTime), 'PPP p')}
                  </TableCell>
                  <TableCell>
                    <div>{appointment.name}</div>
                    <div className="text-muted-foreground text-sm">{appointment.phone}</div>
                  </TableCell>
                  <TableCell>
                    {appointment.brand} {appointment.model}
                  </TableCell>
                  <TableCell>{appointment.problem}</TableCell>
                  <TableCell>
                    <Badge>{appointment.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
         {appointments?.length === 0 && !isLoading && (
            <div className="text-center py-12 text-muted-foreground">
              No appointments have been booked yet.
            </div>
        )}
      </CardContent>
    </Card>
  );
}
