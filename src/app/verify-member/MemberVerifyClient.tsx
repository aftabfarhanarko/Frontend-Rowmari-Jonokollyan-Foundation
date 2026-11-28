'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  ShieldCheck,
  AlertCircle,
  Loader2,
  QrCode,
  BadgeCheck,
  Users,
  ArrowRight,
  X,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import BackToTop from '@/components/BackToTop';
import DonationModal from '@/components/modals/DonationModal';
import { PageBanner } from '@/components/layout/PageBanner';
import { useLazyVerifyMemberByIdQuery } from '@/store/api/committeesApi';
import { MemberVerificationCard } from '@/components/team/MemberVerificationCard';
import { SkeletonProfile } from '@/components/ui/skeleton';
import { Language } from '@/types';

export default function MemberVerifyClient() {
  const [lang, setLang] = useState<Language>('bn');
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id') || '';

  const [memberIdInput, setMemberIdInput] = useState(initialId);
  const [verifyMember, { data: profile, isLoading, error, isUninitialized }] =
    useLazyVerifyMemberByIdQuery();

  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);

  useEffect(() => {
    const idParam = searchParams.get('id')?.trim();
    if (idParam) {
      setMemberIdInput(idParam);
      verifyMember(idParam);
    }
  }, [searchParams, verifyMember]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = memberIdInput.trim();
    if (!cleaned) return;
    verifyMember(cleaned);
  };

  const guideSteps = [
    {
      icon: QrCode,
      titleBn: '১. মেম্বার আইডি সংগ্রহ করুন',
      titleEn: '1. Locate Member ID',
      descBn:
        'সদস্যের ডিজিটাল বা প্রিন্টেড আইডি কার্ডে থাকা অনন্য কোড (যেমন: RJF-000001) দেখে নিন।',
      descEn: 'Find the unique RJF Member ID printed on the member’s official ID card.',
    },
    {
      icon: Search,
      titleBn: '২. উপরের সার্চ বক্সে লিখুন',
      titleEn: '2. Enter & Search',
      descBn:
        'সঠিকভাবে আইডিটি লিখে "যাচাই করুন" বাটনে ক্লিক করলে রিয়েল-টাইম ডাটাবেজ থেকে তথ্য আনা হবে।',
      descEn: 'Type the ID above and click Verify to query our live registry in real time.',
    },
    {
      icon: BadgeCheck,
      titleBn: '৩. পদবি ও স্ট্যাটাস নিশ্চিত হোন',
      titleEn: '3. Confirm Role & Status',
      descBn:
        'সদস্যের ছবি, বর্তমান কমিটি, পদবি ও সক্রিয় স্ট্যাটাস যাচাই করে প্রতারণা থেকে নিরাপদ থাকুন।',
      descEn: 'Verify photo, active committee role, and official status to prevent impersonation.',
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col text-[#1E293B]" lang={lang === 'bn' ? 'bn' : 'en'}>
      <Navbar
        lang={lang}
        onToggleLang={() => setLang((l) => (l === 'bn' ? 'en' : 'bn'))}
        onOpenDonation={() => setDonationModalOpen(true)}
      />

      <main className="flex-1 pb-20 sm:pb-24">
        <PageBanner
          badge={t('অফিসিয়াল সদস্য যাচাইকরণ ডাটাবেজ', 'Official Member Verification Registry')}
          title={t('রৌমারী জনকল্যাণ ফাউন্ডেশন সদস্য সত্যতা যাচাই', 'RJF Member Authenticity Verification')}
          subtitle={t(
            'যেকোনো সদস্যের ডিজিটাল আইডি কার্ড বা মেম্বার আইডি (যেমন: RJF-000001) লিখে সরাসরি সত্যতা, কমিটি ও পদবি যাচাই করুন।',
            'Verify any member’s official identity, active committee designation, and status using their unique RJF Member ID.'
          )}
        >
          {/* Integrated Search Box inside Hero Banner */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto mt-2">
            <div className="flex items-center gap-2 bg-white p-2 rounded-2xl shadow-xl border border-white/40">
              <Search className="w-5 h-5 text-[#D62828] ml-2 shrink-0" />
              <input
                type="text"
                required
                value={memberIdInput}
                onChange={(e) => setMemberIdInput(e.target.value)}
                placeholder={t('মেম্বার আইডি লিখুন (যেমন: RJF-000001)', 'Enter Member ID (e.g. RJF-000001)')}
                className="w-full text-xs sm:text-sm uppercase font-mono font-bold text-stone-900 placeholder:text-stone-400 placeholder:normal-case placeholder:font-sans focus:outline-none px-2 py-2 bg-transparent"
              />
              {memberIdInput && (
                <button
                  type="button"
                  onClick={() => setMemberIdInput('')}
                  aria-label="Clear"
                  className="p-1.5 text-stone-400 hover:text-stone-600 cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2.5 rounded-xl bg-[#D62828] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm shrink-0 transition cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>{t('যাচাই করুন', 'Verify')}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </PageBanner>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8 w-full">
          {/* Loading State */}
          {isLoading && (
            <div className="max-w-2xl mx-auto">
              <SkeletonProfile />
            </div>
          )}

          {/* Verified Result Card */}
          {profile && !isLoading && (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 py-2 px-4 rounded-full w-fit mx-auto">
                <BadgeCheck className="w-4 h-4" />
                <span>{t('অফিসিয়াল ডাটাবেজে সদস্যের তথ্য যাচাইকৃত হয়েছে', 'Verified in Official RJF Registry')}</span>
              </div>
              <MemberVerificationCard profile={profile} />
            </div>
          )}

          {/* Error / Not Found State */}
          {error && !isLoading && (
            <div className="max-w-lg mx-auto bg-[#FFF4F5] border border-red-200 p-6 sm:p-8 rounded-3xl text-center space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-[#D62828] flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h2 className="font-black text-base sm:text-lg text-stone-900">
                {t('সদস্যের তথ্য পাওয়া যায়নি', 'Member Record Not Found')}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {t(
                  `"${memberIdInput}" আইডিটি ফাউন্ডেশনের অফিসিয়াল ডাটাবেজে পাওয়া যায়নি। আইডিটি সঠিকভাবে লেখা হয়েছে কিনা যাচাই করুন অথবা পরিচালনা কমিটির তালিকা দেখুন।`,
                  `No active record matched "${memberIdInput}". Please double-check the ID or browse our official committee list.`
                )}
              </p>
              <div className="pt-2">
                <Link
                  href="/team"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#D62828] hover:bg-[#B91C1C] text-white text-xs font-bold transition shadow-xs"
                >
                  <Users className="w-4 h-4" />
                  <span>{t('কমিটি তালিকা দেখুন', 'Browse Committee Directory')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* 3-Step Verification Guide (shown when uninitialized or below result) */}
          {(isUninitialized || !profile) && !isLoading && (
            <section className="space-y-5">
              <div className="text-center space-y-1">
                <h2 className="text-lg sm:text-xl font-black text-stone-900">
                  {t('কীভাবে সদস্যপদ যাচাই করবেন?', 'How Member Verification Works')}
                </h2>
                <p className="text-xs sm:text-sm text-stone-500">
                  {t(
                    'স্বচ্ছতা ও নিরাপত্তা নিশ্চিত করতে আমাদের ডিজিটাল ভেরিফিকেশন প্রক্রিয়া',
                    'Three simple steps to confirm an authentic RJF representative'
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                {guideSteps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-stone-200/90 bg-white p-5 sm:p-6 shadow-2xs hover:border-red-200 hover:shadow-md transition-all space-y-3"
                    >
                      <div className="w-11 h-11 rounded-2xl bg-red-50 text-[#D62828] flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm sm:text-base font-extrabold text-stone-900">
                        {t(step.titleBn, step.titleEn)}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                        {t(step.descBn, step.descEn)}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Directory CTA */}
              <div className="rounded-2xl bg-[#FFF4F5] border border-red-100 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <div className="w-10 h-10 rounded-xl bg-[#D62828] text-white flex items-center justify-center shrink-0 hidden sm:flex">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-stone-900">
                      {t('মেম্বার আইডি জানা নেই?', 'Don’t have the Member ID handy?')}
                    </h3>
                    <p className="text-xs text-stone-600">
                      {t(
                        'আমাদের পরিচালনা ও উপদেষ্টা কমিটির তালিকা থেকে সরাসরি যেকোনো সদস্যের আইডি ও প্রোফাইল দেখুন।',
                        'Browse our official committee directory to view member profiles and verify their IDs directly.'
                      )}
                    </p>
                  </div>
                </div>
                <Link
                  href="/team"
                  className="px-5 py-2.5 rounded-full bg-[#D62828] hover:bg-[#B91C1C] text-white text-xs sm:text-sm font-bold shrink-0 inline-flex items-center gap-1.5 shadow-sm transition"
                >
                  <span>{t('কমিটি ও নেতৃত্ব দেখুন', 'View Committee')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer lang={lang} onOpenDonation={() => setDonationModalOpen(true)} />
      <MobileBottomBar lang={lang} onOpenDonation={() => setDonationModalOpen(true)} />
      <BackToTop />

      <DonationModal
        isOpen={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
