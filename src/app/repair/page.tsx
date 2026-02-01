"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Wrench, Smartphone, CheckCircle } from "lucide-react";
import { deviceBrands, deviceModels } from "@/lib/device-data";
import { useFirestore, useUser, initiateAnonymousSignIn, useAuth } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const repairFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  brand: z.string().min(1, "Please select your device brand."),
  model: z.string().min(1, "Please select your device model."),
  problem: z.string().min(10, "Please describe the problem in at least 10 characters."),
  date: z.date({
    required_error: "A date for the appointment is required.",
  }),
  time: z.string({ required_error: "A time for the appointment is required." }),
});

type RepairFormValues = z.infer<typeof repairFormSchema>;

const availableTimeSlots = [
    '09:00 AM - 11:00 AM',
    '11:00 AM - 01:00 PM',
    '01:00 PM - 03:00 PM',
    '03:00 PM - 05:00 PM',
    '05:00 PM - 07:00 PM',
];

export default function RepairPage() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const firestore = useFirestore();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();
  
  const form = useForm<RepairFormValues>({
    resolver: zodResolver(repairFormSchema),
    defaultValues: { name: "", phone: "", brand: "", model: "", problem: "", time: "" },
  });

  const selectedBrand = form.watch("brand");
  const modelsForBrand = selectedBrand ? deviceModels[selectedBrand] || [] : [];

  useEffect(() => {
    if (!isUserLoading && !user) {
        initiateAnonymousSignIn(auth);
    }
  }, [user, isUserLoading, auth]);

  useEffect(() => {
    form.resetField("model");
  }, [selectedBrand, form]);

  async function onSubmit(data: RepairFormValues) {
    if (!firestore || !user) {
        toast({ variant: 'destructive', title: "Error", description: "Could not submit appointment. Please try again."});
        return;
    };
    
    const appointmentDateTime = new Date(data.date);
    const [startTime, period] = data.time.split(' ')[0].split(':');
    let hours = parseInt(startTime, 10);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    appointmentDateTime.setHours(hours);

    const appointmentData = {
        userId: user.uid,
        name: data.name,
        phone: data.phone,
        brand: data.brand,
        model: data.model,
        problem: data.problem,
        appointmentDateTime: appointmentDateTime.toISOString(),
        status: "pending",
    };

    try {
        await addDoc(collection(firestore, "appointments"), appointmentData);
        setShowConfirmation(true);
        form.reset({ name: '', phone: '', brand: '', model: '', problem: '', date: undefined, time: '' });
    } catch (error) {
        console.error("Error booking appointment: ", error);
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem booking your appointment.",
        })
    }
  }

  return (
    <>
      <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
        <div className="text-center">
          <Wrench className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 text-4xl font-bold font-headline">Book a Repair</h1>
          <p className="mt-2 text-muted-foreground">
            Fill out the form below to schedule your device repair with our expert technicians.
          </p>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Appointment Details</CardTitle>
            <CardDescription>
              We'll contact you to confirm the exact time and cost.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Device Brand</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select device brand" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {deviceBrands.map(brand => (
                              <SelectItem key={brand.id} value={brand.id}>{brand.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Device Model</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} disabled={!selectedBrand || modelsForBrand.length === 0}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select device model" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {modelsForBrand.map(model => (
                              <SelectItem key={model.id} value={model.id}>{model.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="problem"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issue with Device</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Cracked screen, battery draining quickly..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Preferred Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date(new Date().setHours(0, 0, 0, 0))
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Time</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a time slot" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableTimeSlots.map(slot => (
                              <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={isUserLoading}>
                  <Smartphone className="mr-2 h-5 w-5" />
                  Request Appointment
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <AlertDialogTitle className="text-center">Appointment Requested!</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Thank you! We've received your repair request. Our team will contact you shortly on the provided phone number to confirm your appointment details and provide a quote.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogAction onClick={() => setShowConfirmation(false)} className="w-full">
            Great!
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
