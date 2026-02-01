'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { collection, doc, setDoc, query, limit } from 'firebase/firestore';
import { useAdmin } from '@/hooks/use-admin';

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

type LoginFormValues = z.infer<typeof loginFormSchema>;
type SignupFormValues = z.infer<typeof signupFormSchema>;

export default function LoginPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get user and admin status
  const { isAdmin, isLoading: isAdminLoading } = useAdmin();

  // Check if any admin accounts exist at all (for the initial signup form)
  const adminsQuery = useMemoFirebase(() => query(collection(firestore, 'roles_admin'), limit(1)), [firestore]);
  const { data: admins, isLoading: adminsLoading } = useCollection(adminsQuery);
  
  useEffect(() => {
    // If we've finished checking and the user is an admin, redirect to the dashboard.
    // This handles cases where an already logged-in admin navigates to /login,
    // or when a user successfully logs in and their admin status is confirmed.
    if (!isAdminLoading && isAdmin) {
      router.push('/admin');
    }
  }, [isAdmin, isAdminLoading, router]);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: '', password: '' },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast({ title: 'Login Successful', description: 'Redirecting to dashboard...' });
      // No immediate redirect. The useEffect will handle it reactively.
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: error.message,
      });
      setIsSubmitting(false); // Only set to false on error to allow retry
    }
    // On success, isSubmitting remains true, keeping the loading state until redirection.
  };

  const onSignupSubmit = async (data: SignupFormValues) => {
    setIsSubmitting(true);
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;

        await setDoc(doc(firestore, 'roles_admin', user.uid), { created: new Date() });

        toast({ title: 'Admin Account Created', description: 'Redirecting to dashboard...' });
        // No immediate redirect. The useEffect will handle it reactively.
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: 'Signup Failed',
            description: error.message,
        });
        setIsSubmitting(false); // Only set to false on error to allow retry
    }
    // On success, isSubmitting remains true, keeping the loading state until redirection.
  };

  // Combined loading state. Show loading if checking for admins, checking current user's status, or submitting a form.
  const pageIsLoading = adminsLoading || isAdminLoading || isSubmitting;

  // This unified loading state prevents the form from flashing or getting into loops.
  if (pageIsLoading) {
      return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <p>Loading...</p>
        </div>
      )
  }

  // If the user is confirmed as admin but the redirect hasn't fired yet, show a redirecting message.
  if (isAdmin) {
      return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <p>Redirecting...</p>
        </div>
      );
  }
  
  const noAdminsExist = admins?.length === 0;

  if (noAdminsExist) {
      return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Create Admin Account</CardTitle>
                    <CardDescription>
                        This will be the first administrator account for your store.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...signupForm}>
                        <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                            <FormField control={signupForm.control} name="email" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl><Input type="email" placeholder="admin@example.com" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={signupForm.control} name="password" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={signupForm.control} name="confirmPassword" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                Create Admin Account
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
      )
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            Enter your email and password to access the admin panel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="admin@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
