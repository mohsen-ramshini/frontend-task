"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";
// import { toast } from "sonner";
import { LoginForm } from "@/features/auth/components/LoginForm";

const Page = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();


const handleSubmit = (values: { username: string; password: string }) => {
  setLoading(true);
  setErrorMsg(null);

    console.log(values);
    router.push("/dashboard")
    
};


  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center bg-secondary py-8">
      <h1 className="text-5xl font-extrabold text-black drop-shadow-md tracking-wide mb-10">
        SpaceOmid
      </h1>
      <div className="w-5/6 lg:w-3/5 flex justify-center items-center">
        <LoginForm onSubmit={handleSubmit} />
      </div>
    </section>
  );
};

export default Page;
