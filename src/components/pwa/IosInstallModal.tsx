'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share, PlusSquare, CheckCircle2 } from 'lucide-react';
import { usePwa } from '@/context/PwaContext';

export default function IosInstallModal() {
  const { iosModalOpen, setIosModalOpen } = usePwa();

  if (!iosModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
        {/* Backdrop click */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIosModalOpen(false)}
          className="absolute inset-0"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 sm:p-7 shadow-2xl border border-stone-200 z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div className="flex items-center gap-3">
              <Image
                src="/icons/apple-touch-icon.png"
                alt="RJF Icon"
                width={44}
                height={44}
                className="rounded-2xl shadow-sm"
              />
              <div>
                <h3 className="text-base font-extrabold text-stone-900 leading-tight">
                  iPhone / iPad-এ ইনস্টল করুন
                </h3>
                <p className="text-xs text-stone-500 font-medium">
                  Add to Home Screen গাইড
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIosModalOpen(false)}
              className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 3 Visual Steps */}
          <div className="mt-5 space-y-4">
            <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-stone-50 border border-stone-200/80">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold text-xs">
                ১
              </div>
              <div className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                Safari ব্রাউজারের নিচের টুলবারে থাকা{' '}
                <span className="inline-flex items-center gap-1 font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md">
                  <Share className="w-3.5 h-3.5" /> শেয়ার (Share)
                </span>{' '}
                আইকনে চাপ দিন।
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-stone-50 border border-stone-200/80">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold text-xs">
                ২
              </div>
              <div className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                শেয়ার মেনুটি নিচের দিকে স্ক্রোল করে{' '}
                <span className="inline-flex items-center gap-1 font-bold text-stone-900 bg-stone-200/80 px-1.5 py-0.5 rounded-md">
                  <PlusSquare className="w-3.5 h-3.5" /> Add to Home Screen
                </span>{' '}
                বিকল্পটি নির্বাচন করুন।
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-stone-50 border border-stone-200/80">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#0D5C35] flex items-center justify-center shrink-0 font-bold text-xs">
                ৩
              </div>
              <div className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                ওপরের ডান কোণে{' '}
                <span className="font-bold text-[#0D5C35] bg-emerald-50 px-1.5 py-0.5 rounded-md">
                  Add (যোগ করুন)
                </span>{' '}
                ট্যাপ করলেই RJF অ্যাপ আপনার হোম স্ক্রিনে যুক্ত হয়ে যাবে।
              </div>
            </div>
          </div>

          {/* Dismiss Button */}
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setIosModalOpen(false)}
              className="w-full py-3 rounded-xl bg-[#0D5C35] hover:bg-[#0A4729] text-white font-bold text-sm transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>বুঝেছি, ধন্যবাদ</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
