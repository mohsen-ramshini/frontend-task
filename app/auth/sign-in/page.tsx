"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/features/auth/components/LoginForm";
import Cookies from "js-cookie";
import { useLogin } from "@/features/auth/api/use-login";
import { toast } from "sonner";

const Page = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const loginUser = useLogin();
  const router = useRouter();

  const handleSubmit = (values: { email: string; password: string }) => {
    setLoading(true);
    setErrorMsg(null);

    loginUser.mutate(values, {
      onSuccess: () => {
        setLoading(false);
        setErrorMsg(null);
        router.push("/dashboard");
      },
      onError: () => {
        setLoading(false);
      },
    });
  };
    useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.replace("/dashboard");
      toast.info("You are already logged in.")
    }
  }, [router]);

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center bg-secondary py-8 relative">
      {/* Overlay Loading */}
      {loading && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <h1 className="text-5xl font-extrabold text-black drop-shadow-md tracking-wide mb-10 z-10">
        SpaceOmid
      </h1>

      <div className="w-5/6 lg:w-3/5 flex justify-center items-center z-10">
        <LoginForm onSubmit={handleSubmit} />
      </div>
    </section>
  );
};

export default Page;
