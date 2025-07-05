import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row justify-center items-center">
      {/* سمت چپ: فرم */}
      <div className="w-full md:w-1/2 h-full flex justify-center items-center bg-[#f9fafb]">
        {children}
      </div>
      {/* سمت راست: ویدیو بک‌گراند */}
      <div className="hidden md:flex w-1/2 h-full relative overflow-hidden">
        {/* ویدیو */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/assets/videos/video-1.mp4" type="video/mp4" />
          مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
        </video>

        {/* سایه از سمت چپ روی ویدیو */}
        <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-black/25 to-transparent z-20" />

        {/* لایه محتوای روی ویدیو (مثلاً لوگو) */}
        <div className="relative z-30 w-full h-full flex justify-start items-start p-4">
          <div className="w-36 h-20 flex justify-center items-center">
            <Image
              src={"/assets/images/logo.png"}
              alt="logo"
              width={125}
              height={50}
            />
          </div>
        </div>

        {/* لایه تیره روی ویدیو برای کانتراست بیشتر */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/20 z-10" />
      </div>
    </div>
  );
}
