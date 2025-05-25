
/**
 * @file LoginForm.jsx
 * @description Component for rendering the user login form.
 * Handles form submission, validation, and uses the AuthContext for login functionality.
 */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Hammer } from "lucide-react"; // FairBid's iconic hammer icon

/**
 * Defines the validation schema for the login form using Zod.
 * Ensures email is a valid email format and password is not empty.
 * @type {z.ZodObject}
 */
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }), // Min 1 for demo, usually 8 or more
});

/**
 * LoginForm component.
 * Provides a UI for users to sign in.
 *
 * @returns {JSX.Element} The rendered login form.
 */
export default function LoginForm() {
  const { login } = useAuth(); // Auth context for login function
  const router = useRouter(); // Next.js router for navigation
  const searchParams = useSearchParams(); // To get URL query parameters, e.g., for redirects
  const redirectUrl = searchParams.get('redirect') || '/'; // Default redirect to home page

  /**
   * Initializes the react-hook-form with the Zod schema resolver and default values.
   * @type {import('react-hook-form').UseFormReturn}
   */
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /**
   * Handles the form submission event.
   * On successful validation, it calls the login function from AuthContext
   * and redirects the user.
   * @param {object} values - The validated form values.
   * @param {string} values.email - The user's email.
   * @param {string} values.password - The user's password.
   */
  function onSubmit(values) {
    // In a real application, this would typically involve an API call to a backend server
    // to verify credentials and receive an authentication token or session.

    // For this demo, we'll use a mock login.
    // A real login would also likely return the user's full name and other details.
    // We'll derive a mock name from the email for this demonstration.
    const name = values.email.split('@')[0]; 
    
    // Call the login function from the authentication context
    login(values.email, name); 
    
    // Redirect the user to the originally intended page or the home page.
    router.push(redirectUrl);
  }

  return (
    <Card className="w-full max-w-md shadow-xl">
      {/* Card header with application icon, title, and description */}
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <Hammer className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">Welcome Back to FairBid!</CardTitle>
        <CardDescription>Sign in to access your account and start bidding.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Form provider from react-hook-form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email input field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage /> {/* Displays validation errors for this field */}
                </FormItem>
              )}
            />
            {/* Password input field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage /> {/* Displays validation errors for this field */}
                </FormItem>
              )}
            />
            {/* Forgot password link */}
            <div className="flex items-center justify-end">
              <Button variant="link" size="sm" asChild className="px-0 font-normal">
                <Link href="/forgot-password">
                  Forgot your password?
                </Link>
              </Button>
            </div>
            {/* Submit button */}
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </Form>
      </CardContent>
      {/* Card footer with a link to the registration page */}
      <CardFooter className="flex flex-col items-center space-y-2">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Button variant="link" asChild className="px-1">
            <Link href="/register">Sign up</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
