"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
import { loginSchema } from "../types/schema";
import { LoginFormValues,LoginFormProps } from "../types/auth";


export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8 mt-12 text-left direction-ltr">
  <div className="mb-6 text-center">
    <h1 className="text-2xl font-bold text-gray-800">Sign In to Your Account</h1>
    <p className="text-sm text-gray-500 mt-2">
      Please enter your username and password to sign in.
    </p>
  </div>

  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700">Username</FormLabel>
            <FormControl>
              <Input
                dir="ltr"
                type="text"
                placeholder="Enter your username"
                className="bg-gray-50 border border-gray-300 text-gray-900"
                {...field}
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
            <FormLabel className="text-gray-700">Password</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  dir="ltr"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 pr-10"
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

      <Link
        href=""
        className="block text-sm text-blue-600 hover:underline"
      >
        Forgot your password?
      </Link>

      <Button type="submit" className="w-full mt-2 text-white">
        Sign In
      </Button>

      <Button
        type="button"
        variant="ghost"
        className="w-full text-sm text-gray-600 hover:underline"
        onClick={() => router.push("/auth/sign-up")}
      >
        Don’t have an account? Sign Up
      </Button>
    </form>
  </Form>
</div>

  );
};
export default LoginForm;