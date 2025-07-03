import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row justify-center items-center ">
      {/* سمت چپ: فرم ورود/ثبت‌نام یا هر چی باشه */}
      <div className="w-full md:w-1/2 h-full flex justify-center items-center bg-[#f5f7fa]">
        {children}
      </div>

      {/* سمت راست: ویدیو بک‌گراند فقط در md+ */}
      <div className="hidden md:flex w-1/2 h-full relative overflow-hidden">
        {/* ویدیو بک‌گراند */}
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

        {/* لایه‌ی محتوا روی ویدیو (مثلاً لوگو) */}
        <div className="relative z-10 w-full h-full flex justify-start items-start p-4">
          <div className="w-36 h-20  flex justify-center items-center">
            {/* اگر خواستی لوگو رو اضافه کن */}
            <Image
              src={"/assets/images/logo.png"}
              alt="logo"
              width={125}
              height={50}
            />
          </div>
        </div>

        {/* لایه‌ی شفاف برای بهتر دیده شدن محتوا */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/20 z-0" />
      </div>
    </div>
  );
}
