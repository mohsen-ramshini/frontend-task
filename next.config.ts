import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['reqres.in'], // ✅ مجاز کردن بارگذاری تصویر از این دامنه
  },
};

export default nextConfig;
