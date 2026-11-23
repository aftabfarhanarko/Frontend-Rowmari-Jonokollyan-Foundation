import type { Metadata } from "next";
import ReduxProvider from "@/components/providers/ReduxProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "রৌমারী জনকল্যাণ ফাউন্ডেশন | Rowmari Janakalyan Foundation",
  description:
    "মানুষের পাশে, মানুষের জন্য - শীতবস্ত্র, খাদ্য, শিক্ষা, চিকিৎসা ও রক্তদানে রৌমারীর অসহায় মানুষের পাশে দাঁড়ানোই আমাদের কাজ।",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAFBF9] text-[#1E293B]">
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
