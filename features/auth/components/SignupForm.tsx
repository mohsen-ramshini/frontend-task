"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../types/schema"; // فرض کردم schema رو به روز کردی برای فقط email و password
import { SignUpFormProps, SignUpFormValues } from "../types/auth";

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
import { useRouter } from "next/navigation";

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "eve.holt@reqres.in",
      password: "pistol",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10 mt-12 text-left">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Create a New Account</h1>
        <p className="text-sm text-gray-500 mt-2">
          Please fill in the information below to register.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter email"
                    {...field}
                    className="bg-gray-50 border border-gray-300 text-gray-900"
                    dir="ltr"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      {...field}
                      className="bg-gray-50 border border-gray-300 text-gray-900 pr-10"
                      dir="ltr"
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

          <Button type="submit" className="w-full mt-4 text-white">
            Sign Up
          </Button>
        </form>
          <Button
            type="button"
            variant="ghost"
            className="w-full text-sm text-gray-600 dark:text-gray-400 hover:underline mt-5"
            onClick={() => router.push("/auth/sign-in")}
          >
            Already have an account? Sign In
          </Button>
      </Form>
    </div>
  );
};
