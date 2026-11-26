'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileBottomBar from '@/components/layout/MobileBottomBar';
import { useLazyVerifyMemberByIdQuery } from '@/store/api/committeesApi';
import { MemberVerificationCard } from '@/components/team/MemberVerificationCard';
import { Search, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function MemberVerifyClient() {
  const [memberIdInput, setMemberIdInput] = useState('');
  const [verifyMember, { data: profile, isLoading, error, isUninitialized }] = useLazyVerifyMemberByIdQuery();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberIdInput.trim()) return;
    verifyMember(memberIdInput.trim());
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Navbar lang="bn" />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 w-full">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#D62828] text-xs font-bold border border-red-200">
            <ShieldCheck className="w-4 h-4" />
            <span>অফিসিয়াল সদস্য যাচাইকরণ ডাটাবেজ</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            রৌমারী জনকল্যাণ ফাউন্ডেশন সদস্য সত্যতা যাচাই
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto">
            যেকোনো সদস্যের ডিজিটাল আইডি কার্ড বা মেম্বার আইডি (যেমন: RJF-000001) লিখে সরাসরি সত্যতা ও পদবী যাচাই করুন।
          </p>
        </div>

        {/* Search Input Box */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto">
          <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-stone-300 shadow-xs focus-within:border-[#D62828]">
            <Search className="w-5 h-5 text-stone-400 ml-2" />
            <input
              type="text"
              required
              value={memberIdInput}
              onChange={(e) => setMemberIdInput(e.target.value)}
              placeholder="মেম্বার আইডি লিখুন (যেমন: RJF-000001)"
              className="w-full text-xs sm:text-sm uppercase font-mono font-bold focus:outline-none px-2 py-1.5"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl bg-[#D62828] hover:bg-[#B91C1C] text-white font-bold text-xs shrink-0 transition cursor-pointer flex items-center gap-1.5"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'যাচাই করুন'}
            </button>
          </div>
        </form>

        {/* Verification Result */}
        {profile && <MemberVerificationCard profile={profile} />}

        {error && !isLoading && (
          <div className="max-w-md mx-auto bg-red-50 border border-red-200 p-4 rounded-2xl text-center space-y-1">
            <AlertCircle className="w-6 h-6 text-[#D62828] mx-auto" />
            <p className="font-bold text-xs text-red-900">সদস্য তথ্য পাওয়া যায়নি</p>
            <p className="text-[11px] text-red-700">
              আইডিটি সঠিক কিনা যাচাই করুন। কোনো অননুমোদিত ব্যক্তির তথ্য ফাউন্ডেশনের ডাটাবেজে সংরক্ষিত থাকে না।
            </p>
          </div>
        )}
      </main>
      <Footer lang="bn" />
      <MobileBottomBar lang="bn" />
    </div>
  );
}
