'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';
import { usePwa } from '@/context/PwaContext';

export default function PwaInstallBanner() {
  const { isInstallable, isInstalled, isBannerDismissed, promptInstall, dismissBanner } = usePwa();

  // Hide if already installed, not installable, or user dismissed it
  if (isInstalled || !isInstallable || isBannerDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.aside
        aria-label="PWA Installation Prompt"
        initial={{ opacity: 0, y: 50, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border-2 border-[#0D5C35]/25"
      >
        <div className="flex items-start gap-3.5">
          <Image
            src="/icons/icon-192x192.png"
            alt="RJF App Icon"
            width={48}
            height={48}
            className="rounded-2xl shadow-sm shrink-0 border border-stone-100"
          />

          <div className="flex-1 min-w-0 pr-6">
            <h4 className="text-sm font-extrabold text-stone-900 leading-tight">
              RJF অ্যাপ ইনস্টল করুন
            </h4>
            <p className="text-xs text-stone-600 mt-1 leading-snug">
              দ্রুততম সেবা, অফলাইন সুবিধা এবং সহজে আবেদনের জন্য সরাসরি আপনার ডিভাইসে ইনস্টল করুন।
            </p>

            <div className="flex items-center gap-2.5 mt-3">
              <button
                type="button"
                onClick={promptInstall}
                className="py-1.5 px-3.5 rounded-xl bg-[#0D5C35] hover:bg-[#0A4729] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition active:scale-95 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>এখনই ইনস্টল করুন</span>
              </button>

              <button
                type="button"
                onClick={dismissBanner}
                className="py-1.5 px-3 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-100 text-xs font-semibold transition cursor-pointer"
              >
                পরে
              </button>
            </div>
          </div>

          {/* Close button in top-right */}
          <button
            type="button"
            onClick={dismissBanner}
            aria-label="Close"
            className="absolute top-3 right-3 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
