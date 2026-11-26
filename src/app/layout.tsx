import type { Metadata } from "next";
import ReduxProvider from "@/components/providers/ReduxProvider";
import PwaClientInit from "@/components/pwa/PwaClientInit";
import "./globals.css";

export const metadata: Metadata = {
  title: "রৌমারী জনকল্যাণ ফাউন্ডেশন | Rowmari Janakalyan Foundation",
  description:
    "মানুষের পাশে, মানুষের জন্য - শীতবস্ত্র, খাদ্য, শিক্ষা ও চিকিৎসায় রৌমারীর অসহায় মানুষের পাশে দাঁড়ানোই আমাদের কাজ।",
  applicationName: "RJF",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "RJF",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/logo.png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="h-full antialiased scroll-smooth font-sans">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#D62828" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="RJF" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
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
      <body className="min-h-full flex flex-col bg-white text-[#1E293B]">
        <ReduxProvider>
          <PwaClientInit>
            {children}
          </PwaClientInit>
        </ReduxProvider>
      </body>
    </html>
  );
}
