'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Target, Check, CheckCircle2, ArrowRight } from 'lucide-react';
import { useGetPublicApprovedDonorsQuery, useGetPublicDonationStatsQuery } from '@/store/api/donationsApi';
import { Language } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

interface DonorShowcaseSectionProps {
  lang: Language;
}

export default function DonorShowcaseSection({ lang }: DonorShowcaseSectionProps) {
  const { data: donors = [], isLoading } = useGetPublicApprovedDonorsQuery({ limit: 12 });
  const { data: stats } = useGetPublicDonationStatsQuery();

  const toBn = (num: number | string) =>
    num.toString().replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[parseInt(d, 10)]);

  const totalAmount = (stats?.totalApprovedAmount || 3500).toLocaleString('en-US');
  const donorCount = stats?.verifiedDonors || 2;

  return (
    <section className="py-10 sm:py-14 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Left-aligned Section Header with Red Accent Bar */}
        <div className="flex items-center gap-2.5 mb-6">
          <span className="w-1.5 h-6 rounded-full bg-[#D62828] shrink-0" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight">
            {lang === 'bn' ? 'মানবতার পাশে যারা দাঁড়িয়েছেন' : 'Standing by Humanity'}
          </h2>
        </div>

        {/* 5-Block Horizontal Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
          {/* Block 1: Featured Red Total Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="lg:col-span-3 rounded-2xl bg-gradient-to-br from-[#EF233C] via-[#D62828] to-[#A4161A] text-white p-5 sm:p-6 shadow-[0_12px_30px_-10px_rgba(214,40,40,0.45)] flex flex-col items-center justify-center text-center"
          >
            <div className="text-3xl sm:text-4xl font-black tracking-tight leading-none">
              <AnimatedCounter
                value={lang === 'bn' ? `৳${toBn(totalAmount)}` : `৳${totalAmount}`}
              />
            </div>
            <p className="text-xs sm:text-sm font-medium text-red-50/95 mt-2">
              {lang === 'bn' ? 'সর্বমোট অনুমোদিত অনুদান' : 'Total Approved Funds'}
            </p>
            <Link
              href="/donate"
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white hover:bg-red-50 px-5 py-1.5 text-xs font-bold text-[#D62828] shadow-sm transition active:scale-[0.98]"
            >
              <span>{lang === 'bn' ? 'অনুদান দিন' : 'Donate Now'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          {/* Blocks 2, 3, 4: 3 Soft Blush Stat Cards */}
          <div className="lg:col-span-6 grid grid-cols-3 gap-2.5 sm:gap-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.08, ease: 'easeOut' }}
              className="rounded-2xl bg-[#FFF4F5] p-4 sm:p-6 flex flex-col items-center justify-center text-center shadow-[0_4px_16px_-6px_rgba(214,40,40,0.08)]"
            >
              <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-[#D62828] fill-[#D62828] mb-2.5" />
              <div className="text-base sm:text-xl font-black text-stone-900 leading-tight">
                <AnimatedCounter
                  value={lang === 'bn' ? `${toBn(donorCount)} জন` : `${donorCount}`}
                />
              </div>
              <p className="text-[11px] sm:text-xs font-semibold text-stone-600 mt-1 leading-snug">
                {lang === 'bn' ? 'সক্রিয় অনুদানদাতা' : 'Verified Donors'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.16, ease: 'easeOut' }}
              className="rounded-2xl bg-[#FFF4F5] p-4 sm:p-6 flex flex-col items-center justify-center text-center shadow-[0_4px_16px_-6px_rgba(214,40,40,0.08)]"
            >
              <Target className="w-6 h-6 sm:w-7 sm:h-7 text-[#D62828] mb-2.5" />
              <div className="text-base sm:text-xl font-black text-stone-900 leading-tight">
                <AnimatedCounter value={lang === 'bn' ? `${toBn(1)} টি` : '1'} />
              </div>
              <p className="text-[11px] sm:text-xs font-semibold text-stone-600 mt-1 leading-snug">
                {lang === 'bn' ? 'চলমান ক্যাম্পেইন' : 'Active Campaigns'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.24, ease: 'easeOut' }}
              className="rounded-2xl bg-[#FFF4F5] p-4 sm:p-6 flex flex-col items-center justify-center text-center shadow-[0_4px_16px_-6px_rgba(214,40,40,0.08)]"
            >
              <Check className="w-6 h-6 sm:w-7 sm:h-7 text-[#D62828] stroke-[3] mb-2.5" />
              <div className="text-base sm:text-xl font-black text-stone-900 leading-tight">
                <AnimatedCounter value={lang === 'bn' ? '১০০%' : '100%'} />
              </div>
              <p className="text-[11px] sm:text-xs font-semibold text-stone-600 mt-1 leading-snug">
                {lang === 'bn' ? 'সরাসরি মাঠপর্যায়ে বিতরণ' : 'Direct Ground Delivery'}
              </p>
            </motion.div>
          </div>

          {/* Block 5: Honored Supporters List Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
            className="lg:col-span-3 rounded-2xl bg-[#FFF4F5] p-5 sm:p-6 flex flex-col justify-center shadow-[0_4px_16px_-6px_rgba(214,40,40,0.08)]"
          >
            <h3 className="text-xs sm:text-sm font-extrabold text-[#D62828] mb-3">
              {lang === 'bn' ? 'আমাদের সম্মানিত সহায়তাকারী' : 'Our Honored Supporters'}
            </h3>

            {isLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full rounded-md" />
                ))}
              </div>
            ) : donors.length === 0 ? (
              <p className="text-xs text-stone-500">
                {lang === 'bn' ? 'কোনো অনুমোদিত অনুদানের তালিকা পাওয়া যায়নি।' : 'No approved donations yet.'}
              </p>
            ) : (
              <ul className="space-y-2">
                {donors.slice(0, 4).map((donor, idx) => (
                  <motion.li
                    key={donor.id}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.35, delay: 0.12 * idx, ease: 'easeOut' }}
                    className="flex items-center gap-2 text-xs"
                  >
                    <CheckCircle2
                      className={`w-3.5 h-3.5 shrink-0 ${
                        idx % 2 === 0 ? 'text-emerald-600' : 'text-[#D62828]'
                      }`}
                    />
                    <span className="font-semibold text-stone-800 truncate">
                      {donor.donorName}
                    </span>
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
