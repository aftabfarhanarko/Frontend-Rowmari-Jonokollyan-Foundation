'use client';

import React, { useMemo, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import BackToTop from '@/components/BackToTop';
import DonationModal from '@/components/modals/DonationModal';
import { PageBanner } from '@/components/layout/PageBanner';
import { useGetPublicCommitteesQuery } from '@/store/api/committeesApi';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  User,
  ArrowRight,
  Search,
  Users,
  Award,
  X,
  BadgeCheck,
  CalendarDays,
} from 'lucide-react';
import { Skeleton, SkeletonCard } from '@/components/ui/skeleton';
import { Language } from '@/types';

export default function TeamClientPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const { data: committees, isLoading } = useGetPublicCommitteesQuery();
  const [selectedCommitteeId, setSelectedCommitteeId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMembership, setSelectedMembership] = useState<any | null>(null);

  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);

  const activeCommittees = committees || [];
  const currentCommittee = selectedCommitteeId
    ? activeCommittees.find((c) => c.id === selectedCommitteeId)
    : activeCommittees[0];

  const memberships = useMemo(
    () => (currentCommittee?.memberships || []).filter((m) => Boolean(m.member)),
    [currentCommittee]
  );

  const filteredMemberships = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return memberships;
    return memberships.filter((m) => {
      const name = (m.member?.nameBn || '').toLowerCase();
      const nameEn = (m.member?.nameEn || '').toLowerCase();
      const desig = (m.designation?.titleBn || '').toLowerCase();
      const mid = (m.member?.memberId || '').toLowerCase();
      return name.includes(q) || nameEn.includes(q) || desig.includes(q) || mid.includes(q);
    });
  }, [memberships, searchQuery]);

  return (
    <div className="min-h-screen bg-white flex flex-col text-[#1E293B]" lang={lang === 'bn' ? 'bn' : 'en'}>
      <Navbar
        lang={lang}
        onToggleLang={() => setLang((l) => (l === 'bn' ? 'en' : 'bn'))}
        onOpenDonation={() => setDonationModalOpen(true)}
      />

      <main className="flex-1 pb-20 sm:pb-24">
        <PageBanner
          badge={t('পরিচালনা ও উপদেষ্টা পরিষদ', 'Executive & Advisory Leadership')}
          title={t('ফাউন্ডেশনের কমিটি ও নেতৃত্ব', 'Foundation Committees & Leadership')}
          subtitle={t(
            'রৌমারী জনকল্যাণ ফাউন্ডেশনের গণতান্ত্রিকভাবে নির্বাচিত দায়িত্বপ্রাপ্ত কমিটি ও সম্মানিত সদস্যবৃন্দ।',
            'Democratically elected executive committees and dedicated members serving Rowmari communities.'
          )}
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/verify-member"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-red-50 text-[#D62828] text-xs sm:text-sm font-bold shadow-md transition active:scale-[0.98]"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t('সদস্যপদ যাচাই করুন', 'Verify Member ID')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            {!isLoading && currentCommittee && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/25 text-white text-xs font-semibold backdrop-blur-xs">
                <Users className="w-3.5 h-3.5" />
                <span>
                  {t(
                    `${memberships.length.toLocaleString('bn-BD')} জন দায়িত্বপ্রাপ্ত সদস্য`,
                    `${memberships.length} Active Members`
                  )}
                </span>
              </div>
            )}
          </div>
        </PageBanner>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6 w-full">
          {/* Committee Tabs + Search Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 bg-[#FFF9F9] border border-red-100/90 p-3.5 sm:p-4 rounded-2xl">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-9 w-32 rounded-full shrink-0" />
                ))
              ) : (
                activeCommittees.map((c) => {
                  const isSelected = currentCommittee?.id === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCommitteeId(c.id)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                        isSelected
                          ? 'bg-[#D62828] text-white shadow-sm'
                          : 'bg-white text-stone-700 border border-stone-200/80 hover:border-red-300 hover:text-[#D62828]'
                      }`}
                    >
                      <Award className={`w-3.5 h-3.5 ${isSelected ? 'text-red-100' : 'text-[#D62828]'}`} />
                      <span>
                        {c.name} ({c.year})
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            <div className="relative w-full lg:w-72 shrink-0">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('নাম, পদবি বা আইডি খুঁজুন...', 'Search name, role, or ID...')}
                className="w-full pl-10 pr-9 py-2 rounded-full border border-stone-200 bg-white text-xs sm:text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#D62828]/25 focus:border-[#D62828]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Active Committee Info Banner */}
          {!isLoading && currentCommittee && (
            <div className="flex flex-wrap items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-5 rounded-full bg-[#D62828]" />
                <h2 className="text-base sm:text-lg font-black text-stone-900">
                  {currentCommittee.name}
                </h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[11px] font-bold">
                  <CalendarDays className="w-3 h-3 text-[#D62828]" />
                  {currentCommittee.year}
                </span>
              </div>
              <span className="text-xs font-semibold text-stone-500">
                {t(
                  `মোট ${filteredMemberships.length.toLocaleString('bn-BD')} জন প্রদর্শিত হচ্ছে`,
                  `Showing ${filteredMemberships.length} members`
                )}
              </span>
            </div>
          )}

          {/* Members Grid — 2 per row on mobile, 4 on desktop */}
          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} variant="team" />
              ))}
            </div>
          ) : filteredMemberships.length === 0 ? (
            <div className="rounded-3xl border border-stone-200 bg-stone-50/70 p-12 text-center space-y-2.5">
              <Users className="w-10 h-10 text-stone-300 mx-auto" />
              <p className="text-sm font-bold text-stone-700">
                {t('কোনো সদস্যের তথ্য পাওয়া যায়নি।', 'No committee members found.')}
              </p>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-1.5 rounded-full bg-[#D62828] text-white text-xs font-bold cursor-pointer"
                >
                  {t('সার্চ রিসেট করুন', 'Reset Search')}
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {filteredMemberships.map((m, idx) => {
                const member = m.member;
                const designation = m.designation;
                if (!member) return null;

                return (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{ duration: 0.35, delay: (idx % 4) * 0.06, ease: 'easeOut' }}
                    onClick={() => setSelectedMembership(m)}
                    className="group bg-white rounded-2xl border border-red-100/90 overflow-hidden shadow-[0_6px_22px_-8px_rgba(214,40,40,0.12)] hover:-translate-y-1 hover:shadow-xl hover:border-red-300 transition-all duration-300 flex flex-col justify-between text-center cursor-pointer"
                  >
                    <div>
                      {/* Top Crimson Header Strip */}
                      <div className="h-14 sm:h-16 bg-gradient-to-br from-[#991B1B] via-[#D62828] to-[#E53935] relative">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_60%)]" />
                        <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-white/15 text-white text-[9px] font-mono font-bold backdrop-blur-xs">
                          #{idx + 1}
                        </span>
                      </div>

                      {/* Overlapping Circular Avatar */}
                      <div className="relative size-20 sm:size-24 rounded-full mx-auto -mt-10 sm:-mt-12 overflow-hidden bg-stone-100 ring-4 ring-white shadow-md">
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
                      <div className="px-2.5 sm:px-4 pt-3 pb-3 space-y-1.5">
                        <h3 className="font-extrabold text-xs sm:text-sm text-stone-900 group-hover:text-[#D62828] transition line-clamp-1">
                          {lang === 'en' && member.nameEn ? member.nameEn : member.nameBn}
                        </h3>

                        {designation?.titleBn && (
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FFF4F5] border border-red-100 text-[#D62828] text-[10px] sm:text-[11px] font-bold line-clamp-1">
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
                    <div
                      className="px-2.5 sm:px-4 pb-3 pt-2 border-t border-stone-100/80 bg-[#FFF9F9] flex items-center justify-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link
                        href={`/verify-member?id=${member.memberId}`}
                        className="inline-flex items-center justify-center gap-1 text-[10px] sm:text-[11px] font-bold text-[#D62828] hover:text-[#B91C1C] transition"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                        <span>{t('প্রোফাইল ভেরিফাই', 'Verify Profile')}</span>
                        <ArrowRight className="w-3 h-3 shrink-0" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Member Quick-View Modal */}
      {selectedMembership?.member && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setSelectedMembership(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-24 bg-gradient-to-br from-[#991B1B] via-[#D62828] to-[#E53935] relative">
              <button
                type="button"
                onClick={() => setSelectedMembership(null)}
                aria-label="Close"
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 pb-6 -mt-12 text-center space-y-3">
              <div className="relative size-24 rounded-full mx-auto overflow-hidden bg-stone-100 ring-4 ring-white shadow-lg">
                {selectedMembership.member.photoUrl ? (
                  <Image
                    src={selectedMembership.member.photoUrl}
                    alt={selectedMembership.member.nameBn}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : (
                  <div className="size-full flex items-center justify-center bg-[#FFF4F5]">
                    <User className="size-10 text-[#D62828]/50" />
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-black text-stone-900">
                  {selectedMembership.member.nameBn}
                </h3>
                {selectedMembership.member.nameEn && (
                  <p className="text-xs text-stone-500 font-medium">{selectedMembership.member.nameEn}</p>
                )}
                {selectedMembership.designation?.titleBn && (
                  <span className="inline-block mt-2 px-3 py-1 rounded-full bg-[#FFF4F5] border border-red-100 text-[#D62828] text-xs font-bold">
                    {selectedMembership.designation.titleBn}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-center gap-2 text-xs font-mono text-stone-500 bg-stone-50 py-2 px-3 rounded-xl border border-stone-100">
                <BadgeCheck className="w-4 h-4 text-[#D62828]" />
                <span>ID: {selectedMembership.member.memberId}</span>
                {currentCommittee && (
                  <span>• {currentCommittee.name} ({currentCommittee.year})</span>
                )}
              </div>

              {selectedMembership.member.bio && (
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed text-left bg-stone-50/70 p-3.5 rounded-2xl border border-stone-100">
                  {selectedMembership.member.bio}
                </p>
              )}

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <Link
                  href={`/verify-member?id=${selectedMembership.member.memberId}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#D62828] hover:bg-[#B91C1C] text-white text-xs sm:text-sm font-bold shadow-sm transition"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t('অফিসিয়াল ভেরিফিকেশন', 'Official Verification')}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedMembership(null)}
                  className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs sm:text-sm font-bold cursor-pointer transition"
                >
                  {t('বন্ধ করুন', 'Close')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
