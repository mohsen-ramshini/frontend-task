"use client";

import { SignUpForm } from "@/features/auth/components/SignupForm";
import { SignUpFormValues } from "@/features/auth/types/auth";
import { useRegister } from "@/features/auth/api/use-register";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const registerUser = useRegister();
  const router = useRouter();

  const handleSubmit = (values: SignUpFormValues) => {
    setLoading(true);
    setErrorMsg(null);

    registerUser.mutate(values, {
      onSuccess: () => {
        setLoading(false);
        setErrorMsg(null);
        router.push("/auth/sign-in");
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  return (
    <section className="w-full h-screen flex flex-col justify-center items-center bg-secondary relative">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <h1 className="relative hidden sm:block top-10 text-5xl font-extrabold text-black drop-shadow-md tracking-wide z-10">
        SpaceOmid
      </h1>

      <div className="w-5/6 lg:w-3/5 h-full flex justify-center items-center z-10">
        <SignUpForm onSubmit={handleSubmit} />
      </div>
    </section>
  );
};

export default Page;
