'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileBottomBar from '@/components/layout/MobileBottomBar';
import { useGetPublicCommitteesQuery } from '@/store/api/committeesApi';
import Image from 'next/image';
import Link from 'next/link';
import { Users, ShieldCheck, User, Search, MapPin } from 'lucide-react';

export default function TeamClientPage() {
  const { data: committees, isLoading } = useGetPublicCommitteesQuery();
  const [selectedCommitteeId, setSelectedCommitteeId] = useState<string>('');

  const activeCommittees = committees || [];
  const currentCommittee = selectedCommitteeId
    ? activeCommittees.find((c) => c.id === selectedCommitteeId)
    : activeCommittees[0];

  const memberships = currentCommittee?.memberships || [];

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Navbar lang="bn" />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#D62828] text-xs font-bold mb-1.5 border border-red-200">
              <Users className="w-3.5 h-3.5" />
              <span>পরিচালনা ও উপদেষ্টা পরিষদ</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              ফাউন্ডেশনের কমিটি ও নেতৃত্ব
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              রৌমারী জনকল্যাণ ফাউন্ডেশনের গণতান্ত্রিকভাবে নির্বাচিত দায়িত্বপ্রাপ্ত কমিটি ও সম্মানিত সদস্যবৃন্দ।
            </p>
          </div>
          <Link
            href="/verify-member"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D62828] hover:bg-[#B91C1C] text-white text-xs sm:text-sm font-bold shadow-xs transition shrink-0"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>সদস্যপদ যাচাই করুন (Verify ID)</span>
          </Link>
        </div>

        {/* Committee Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {activeCommittees.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCommitteeId(c.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                (currentCommittee?.id === c.id)
                  ? 'bg-[#D62828] text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              {c.name} ({c.year})
            </button>
          ))}
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {memberships.map((m) => {
            const member = m.member;
            const designation = m.designation;
            if (!member) return null;

            return (
              <div
                key={m.id}
                className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs hover:border-red-300 transition text-center space-y-3 group"
              >
                <div className="relative size-24 rounded-full mx-auto overflow-hidden bg-stone-100 border-2 border-red-100 shadow-xs">
                  {member.photoUrl ? (
                    <Image src={member.photoUrl} alt={member.nameBn} fill className="object-cover group-hover:scale-105 transition" />
                  ) : (
                    <div className="size-full flex items-center justify-center text-stone-400">
                      <User className="size-10" />
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-stone-900 group-hover:text-[#D62828] transition">{member.nameBn}</h3>
                  <p className="text-[11px] font-bold text-[#D62828]">{designation?.titleBn}</p>
                  <p className="text-[10px] font-mono text-stone-400 font-bold">{member.memberId}</p>
                </div>

                {member.bio && (
                  <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed pt-1 border-t border-stone-100">
                    {member.bio}
                  </p>
                )}

                <Link
                  href={`/verify-member?id=${member.memberId}`}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-600 hover:text-[#D62828] pt-1"
                >
                  <ShieldCheck className="w-3 h-3 text-[#D62828]" />
                  <span>প্রোফাইল ভেরিফাই</span>
                </Link>
              </div>
            );
          })}
        </div>
      </main>
      <Footer lang="bn" />
      <MobileBottomBar lang="bn" />
    </div>
  );
}
