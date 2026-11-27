'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileBottomBar from '@/components/layout/MobileBottomBar';
import { PageBanner } from '@/components/layout/PageBanner';
import { useGetPublicCommitteesQuery } from '@/store/api/committeesApi';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, User, ArrowRight } from 'lucide-react';
import { Skeleton, SkeletonCard } from '@/components/ui/skeleton';

export default function TeamClientPage() {
  const { data: committees, isLoading } = useGetPublicCommitteesQuery();
  const [selectedCommitteeId, setSelectedCommitteeId] = useState<string>('');

  const activeCommittees = committees || [];
  const currentCommittee = selectedCommitteeId
    ? activeCommittees.find((c) => c.id === selectedCommitteeId)
    : activeCommittees[0];

  const memberships = currentCommittee?.memberships || [];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar lang="bn" />

      <main className="flex-1 pb-16 sm:pb-20">
        <PageBanner
          badge="পরিচালনা ও উপদেষ্টা পরিষদ"
          title="ফাউন্ডেশনের কমিটি ও নেতৃত্ব"
          subtitle="রৌমারী জনকল্যাণ ফাউন্ডেশনের গণতান্ত্রিকভাবে নির্বাচিত দায়িত্বপ্রাপ্ত কমিটি ও সম্মানিত সদস্যবৃন্দ।"
        >
          <Link
            href="/verify-member"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-red-50 text-[#D62828] text-xs sm:text-sm font-bold shadow-md transition active:scale-[0.98]"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>সদস্যপদ যাচাই করুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </PageBanner>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6 w-full">
          {/* Committee Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-9 w-32 rounded-full shrink-0" />
              ))
            ) : (
              activeCommittees.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCommitteeId(c.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                    currentCommittee?.id === c.id
                      ? 'bg-[#D62828] text-white shadow-sm'
                      : 'bg-[#FFF4F5] text-stone-700 hover:bg-red-100/70'
                  }`}
                >
                  {c.name} ({c.year})
                </button>
              ))
            )}
          </div>

          {/* Members Grid — 2 per row on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} variant="team" />
              ))
            ) : (
              memberships.map((m, idx) => {
                const member = m.member;
                const designation = m.designation;
                if (!member) return null;

                return (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.38, delay: (idx % 4) * 0.08, ease: 'easeOut' }}
                    className="group bg-white rounded-2xl border border-red-100/90 overflow-hidden shadow-[0_6px_22px_-8px_rgba(214,40,40,0.12)] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-center"
                  >
                    <div>
                      {/* Top Crimson Header Strip */}
                      <div className="h-14 sm:h-16 bg-gradient-to-br from-[#991B1B] via-[#D62828] to-[#E53935] relative">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_60%)]" />
                      </div>

                      {/* Overlapping Circular Avatar */}
                      <div className="relative size-20 sm:size-22 rounded-full mx-auto -mt-10 sm:-mt-11 overflow-hidden bg-stone-100 ring-4 ring-white shadow-md">
                        {member.photoUrl ? (
                          <Image
                            src={member.photoUrl}
                            alt={member.nameBn}
                            fill
                            sizes="96px"
                            className="object-cover group-hover:scale-105 transition duration-300"
                          />
                        ) : (
                          <div className="size-full flex items-center justify-center text-stone-400 bg-[#FFF4F5]">
                            <User className="size-9 text-[#D62828]/50" />
                          </div>
                        )}
                      </div>

                      {/* Member Info */}
                      <div className="px-3 sm:px-4 pt-3 pb-3 space-y-1.5">
                        <h3 className="font-extrabold text-xs sm:text-sm text-stone-900 group-hover:text-[#D62828] transition line-clamp-1">
                          {member.nameBn}
                        </h3>

                        {designation?.titleBn && (
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FFF4F5] text-[#D62828] text-[10px] sm:text-[11px] font-bold">
                            {designation.titleBn}
                          </span>
                        )}

                        <p className="text-[10px] font-mono text-stone-400 font-semibold">
                          {member.memberId}
                        </p>

                        {member.bio && (
                          <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed pt-1.5 border-t border-stone-100">
                            {member.bio}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Footer Verify Action */}
                    <div className="px-3 sm:px-4 pb-3.5 pt-2 border-t border-stone-100/80 bg-[#FFF9F9]">
                      <Link
                        href={`/verify-member?id=${member.memberId}`}
                        className="inline-flex items-center justify-center gap-1 text-[11px] font-bold text-[#D62828] hover:text-[#B91C1C] transition"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>প্রোফাইল ভেরিফাই</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </main>

      <Footer lang="bn" />
      <MobileBottomBar lang="bn" />
    </div>
  );
}
