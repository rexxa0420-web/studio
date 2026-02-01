'use client';

import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
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
import { useMemo } from 'react';

export default function AdminAppointmentsPage() {
  const firestore = useFirestore();
  const appointmentsQuery = useMemo(() => {
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
