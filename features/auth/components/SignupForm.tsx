"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { relationships , SignUpFormProps ,SignUpFormValues} from "../types/auth";
import { signUpSchema  } from "../types/schema";


export const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  const router = useRouter();
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      phone_number: "",
      first_name: "",
      last_name: "",
      role: "caregiver",
      relationship_to_user: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    form.setValue("role", "caregiver");
  }, [form]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10 mt-12 text-left">
  <div className="mb-6 text-center">
    <h1 className="text-2xl font-bold text-gray-800">Create a New Account</h1>
    <p className="text-sm text-gray-500 mt-2">
      Please fill in the information below to register.
    </p>
  </div>

  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/** First Name */}
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-gray-700">First Name</FormLabel>
              <FormControl>
                <Input dir="ltr" type="text" placeholder="Jane" className="w-full bg-gray-50 border border-gray-300 text-gray-900" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/** Last Name */}
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-gray-700">Last Name</FormLabel>
              <FormControl>
                <Input dir="ltr" type="text" placeholder="Doe" className="w-full bg-gray-50 border border-gray-300 text-gray-900" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/** Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-gray-700">Username</FormLabel>
              <FormControl>
                <Input dir="ltr" type="text" placeholder="jane" className="w-full bg-gray-50 border border-gray-300 text-gray-900" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/** Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-gray-700">Email</FormLabel>
              <FormControl>
                <Input dir="ltr" type="email" placeholder="jane.doe@example.com" className="w-full bg-gray-50 border border-gray-300 text-gray-900" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/** Phone Number */}
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-gray-700">Phone Number</FormLabel>
              <FormControl>
                <Input dir="ltr" type="tel" placeholder="123-456-7890" className="w-full bg-gray-50 border border-gray-300 text-gray-900" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/** Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-gray-700">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    dir="ltr"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 pr-10"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-500"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <input type="hidden" {...form.register("role")} value="caregiver" />

      <Button type="submit" className="w-full mt-4 text-white">
        Sign Up
      </Button>

      <Button
        type="button"
        variant="ghost"
        className="w-full text-sm text-gray-600 hover:underline"
        onClick={() => router.push("/auth/sign-in")}
      >
        Already have an account? Sign In
      </Button>
    </form>
  </Form>
</div>

  );
};
