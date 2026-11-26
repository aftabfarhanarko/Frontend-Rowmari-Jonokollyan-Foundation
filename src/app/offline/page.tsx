'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WifiOff, RotateCw, Home, ArrowLeft } from 'lucide-react';

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setIsOnline(typeof navigator !== 'undefined' ? navigator.onLine : false);

    const handleOnline = () => {
      setIsOnline(true);
      // Auto reload after 1 second if connection returns
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      window.location.reload();
    }, 400);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between items-center px-4 py-8 select-none">
      {/* Top Header bar */}
      <header className="w-full max-w-md flex items-center justify-between py-2 border-b border-stone-100">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="RJF Logo"
            width={34}
            height={34}
            className="rounded-full shadow-2xs"
            priority
          />
          <div className="text-left">
            <span className="text-xs sm:text-sm font-extrabold text-[#D62828] block leading-tight">
              রৌমারী জনকল্যাণ ফাউন্ডেশন
            </span>
            <span className="text-[10px] text-stone-500 font-mono tracking-tight block">
              RJF Progressive Web App
            </span>
          </div>
        </Link>
        <span
          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-colors ${
            isOnline
              ? 'bg-red-100 text-red-800'
              : 'bg-stone-100 text-stone-600'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isOnline ? 'bg-red-600 animate-pulse' : 'bg-stone-400'
            }`}
          />
          {isOnline ? 'অনলাইন' : 'অফলাইন'}
        </span>
      </header>

      {/* Main Offline Content matching the user mockup */}
      <main className="flex-1 flex flex-col items-center justify-center text-center max-w-sm my-10 space-y-6">
        <div className="relative">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 shadow-inner">
            <WifiOff className="w-12 h-12 sm:w-14 sm:h-14 stroke-[1.5]" />
          </div>
          {isOnline && (
            <span className="absolute -top-1 -right-1 px-2 py-0.5 bg-red-600 text-white text-[10px] font-bold rounded-full shadow-md animate-bounce">
              সংযুক্ত!
            </span>
          )}
        </div>

        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
            {isOnline
              ? 'ইন্টারনেট সংযোগ ফিরে এসেছে!'
              : 'আপনি বর্তমানে অফলাইনে আছেন'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-normal">
            {isOnline
              ? 'সংযোগ চালু হয়েছে, পেজটি এখনই স্বয়ংক্রিয়ভাবে রিলোড হচ্ছে...'
              : 'ইন্টারনেট সংযোগ পাওয়া যাচ্ছে না। আপনার ওয়াইফাই বা মোবাইল ডেটা চেক করে পুনরায় পেজটি রিফ্রেশ করুন।'}
          </p>
        </div>

        {/* Action Button: Refresh the page */}
        <div className="w-full space-y-3 pt-2">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="w-full py-3.5 px-6 rounded-2xl bg-stone-100 hover:bg-stone-200 active:scale-[0.99] text-stone-800 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-75"
          >
            <RotateCw
              className={`w-4 h-4 text-stone-600 ${
                isRefreshing ? 'animate-spin' : ''
              }`}
            />
            <span>
              {isRefreshing ? 'রিলোড হচ্ছে...' : 'Refresh the page / রিফ্রেশ করুন'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (typeof window !== 'undefined' && window.history.length > 1) {
                window.history.back();
              } else {
                window.location.href = '/';
              }
            }}
            className="w-full py-2.5 px-4 text-xs font-semibold text-stone-600 hover:text-[#D62828] flex items-center justify-center gap-1.5 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>পূর্ববর্তী পেজে ফিরে যান</span>
          </button>
        </div>
      </main>

      {/* Brand Logo Footer Anchor */}
      <footer className="w-full max-w-md flex flex-col items-center justify-center space-y-3 pt-6 border-t border-stone-100">
        <Link href="/" className="hover:opacity-90 transition">
          <Image
            src="/logo.png"
            alt="Rowmari Janakalyan Foundation"
            width={64}
            height={64}
            className="rounded-full shadow-md hover:scale-105 transition"
          />
        </Link>
        <p className="text-[11px] text-stone-400 font-medium text-center">
          © ২০২৬ রৌমারী জনকল্যাণ ফাউন্ডেশন | মানুষের পাশে, মানুষের জন্য
        </p>
      </footer>
    </div>
  );
}
