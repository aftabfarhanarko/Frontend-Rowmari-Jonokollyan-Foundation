'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  User, 
  Users, 
  Phone, 
  Mail, 
  CheckCircle2, 
  HeartHandshake, 
  ShieldCheck, 
  Award,
  Sparkles
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import BackToTop from '@/components/BackToTop';
import VolunteerModal from '@/components/modals/VolunteerModal';
import DonationModal from '@/components/modals/DonationModal';
import AssistanceModal from '@/components/modals/AssistanceModal';
import { GlassSection, SectionHeading, glassCard, glassCardHover } from '@/components/ui/glass';
import { Language } from '@/types';

export default function TeamPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [activeTab, setActiveTab] = useState<'all' | 'exec' | 'blood' | 'relief'>('all');
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [assistanceModalOpen, setAssistanceModalOpen] = useState(false);

  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);

  const teamMembers = [
    {
      id: 'member-1',
      nameBn: 'মাওলানা আব্দুল হাই',
      nameEn: 'Mawlana Abdul Hai',
      roleBn: 'সভাপতি',
      roleEn: 'President',
      wing: 'exec',
      wingBn: 'পরিচালনা পরিষদ',
      wingEn: 'Executive Board',
      phone: '+880 1712-345678',
      descBn: 'ফাউন্ডেশনের প্রতিষ্ঠাতাদের একজন ও প্রধান সামাজিক অভিভাবক। বিগত ৮ বছর ধরে ত্রাণ কার্যক্রমে নেতৃত্ব দিচ্ছেন।',
      descEn: 'Founding member and social patron directing char humanitarian relief operations for 8+ years.',
      badgeColor: 'bg-[#0D5C35]',
    },
    {
      id: 'member-2',
      nameBn: 'মোঃ রফিকুল ইসলাম',
      nameEn: 'Md. Rafiqul Islam',
      roleBn: 'সাধারণ সম্পাদক',
      roleEn: 'General Secretary',
      wing: 'exec',
      wingBn: 'পরিচালনা পরিষদ',
      wingEn: 'Executive Board',
      phone: '+880 1723-456789',
      descBn: 'মাঠপর্যায়ের সার্বিক সমন্বয়, প্রশাসনিক অনুমোদন এবং সরকারি দপ্তরের সাথে যৌথ সমন্বয়কারী।',
      descEn: 'Coordinating on-ground execution, administrative relations, and government social welfare liaisons.',
      badgeColor: 'bg-[#0D5C35]',
    },
    {
      id: 'member-3',
      nameBn: 'মোঃ আশরাফুল আলম',
      nameEn: 'Md. Ashraful Alam',
      roleBn: 'কোষাধ্যক্ষ',
      roleEn: 'Treasurer & Accounts',
      wing: 'exec',
      wingBn: 'অর্থ ও নিরীক্ষা উইং',
      wingEn: 'Finance & Audit Wing',
      phone: '+880 1734-567890',
      descBn: 'আর্থিক স্বচ্ছতা, ডিজিটাল হিসাব সংরক্ষণ এবং দাতাদের রসিদ প্রেরণের দায়িত্বপ্রাপ্ত কর্মকর্তা।',
      descEn: 'Managing transparent institutional accounts, financial audits, and verified digital donor receipts.',
      badgeColor: 'bg-emerald-700',
    },
    {
      id: 'member-4',
      nameBn: 'ডাঃ মোস্তাফিজুর রহমান',
      nameEn: 'Dr. Mostafizur Rahman',
      roleBn: 'চিকিৎসা সেল প্রধান',
      roleEn: 'Medical Cell Lead',
      wing: 'relief',
      wingBn: 'স্বাস্থ্য ও চিকিৎসা উইং',
      wingEn: 'Health & Medical Cell',
      phone: '+880 1745-678901',
      descBn: 'চরাঞ্চলে ফ্রি মেডিকেল ক্যাম্প পরিচালনা, অসহায় রোগীদের প্রেসক্রিপশন নিরীক্ষা ও ওষুধ সরবরাহ।',
      descEn: 'Supervising free char medical camps, prescription vetting, and life-saving medicine distribution.',
      badgeColor: 'bg-teal-700',
    },
    {
      id: 'member-5',
      nameBn: 'মোছাঃ তানজিনা আক্তার',
      nameEn: 'Mst. Tanjina Akter',
      roleBn: 'জরুরি রক্তদান সমন্বয়ক',
      roleEn: 'Emergency Blood Coordinator',
      wing: 'blood',
      wingBn: 'রক্তদান সেবা উইং',
      wingEn: 'Blood Donation Wing',
      phone: '+880 1756-789012',
      descBn: 'রৌমারী হাসপাতালের সাথে যুক্ত থেকে ২৪/৭ জরুরি রক্তদাতাদের যোগাযোগ ও ব্লাড গ্রুপিং পরিচালনা।',
      descEn: 'Managing 24/7 emergency blood requests and donor-patient coordination at Rowmari Hospital.',
      badgeColor: 'bg-[#E53935]',
    },
    {
      id: 'member-6',
      nameBn: 'মোঃ শফিকুল ইসলাম (সুমন)',
      nameEn: 'Md. Shafiqul Islam (Sumon)',
      roleBn: 'ত্রাণ ও পুনর্বাসন সমন্বয়ক',
      roleEn: 'Relief & Rehabilitation Lead',
      wing: 'relief',
      wingBn: 'মাঠপর্যায়ের ত্রাণ উইং',
      wingEn: 'Char Relief Operations',
      phone: '+880 1767-890123',
      descBn: 'দাঁতভাঙ্গা ও যাদুরচর চরাঞ্চলে বাড়ি বাড়ি গিয়ে প্রকৃত দুস্থ পরিবার যাচাই ও তালিকা প্রণয়নকারী।',
      descEn: 'Leading char field surveys and verified beneficiary listings in remote Datbhanga & Yadurchar.',
      badgeColor: 'bg-amber-700',
    },
  ];

  const filteredMembers = teamMembers.filter((m) => {
    if (activeTab === 'all') return true;
    return m.wing === activeTab;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBF9] text-[#1E293B]">
      <Navbar 
        lang={lang} 
        onToggleLang={() => setLang(l => l === 'bn' ? 'en' : 'bn')} 
        onOpenDonation={() => setDonationModalOpen(true)}
      />

      <main className="flex-1 pb-20 sm:pb-24">
        {/* Header Hero Banner */}
        <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 bg-gradient-to-b from-red-50/40 via-white to-[#FAFBF9]">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-red-300/25 blur-3xl" />
            <div className="absolute top-1/2 -right-20 h-80 w-80 rounded-full bg-emerald-300/25 blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-[#E53935] text-xs font-bold mb-3 shadow-2xs">
                <Users className="w-3.5 h-3.5 text-[#E53935]" />
                <span>{t('কার্যনির্বাহী পরিচালনা পরিষদ ও উইং সমন্বয়কবৃন্দ', 'Executive Committee & Wing Leads')}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
                {t('যাঁরা রৌমারীর মানুষের সেবায় নিবেদিত', 'The Dedicated Team Behind the Service')}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-stone-600 leading-relaxed">
                {t(
                  'রৌমারী জনকল্যাণ ফাউন্ডেশনের প্রতিটি উদ্যোগ পরিচালিত হয় স্থানীয় শিক্ষক, চিকিৎসক, সমাজসেবক ও উদ্যমী তরুণদের সমন্বয়ে গঠিত একটি দায়িত্বশীল কমিটির মাধ্যমে।',
                  'Our executive council, verified medical specialists, and active youth coordinators ensure transparent, immediate humanitarian response in remote chars.'
                )}
              </p>
            </motion.div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 mt-8 pt-4 border-t border-stone-200/70">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#0D5C35] text-white shadow-md'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {t('সকল সদস্য', 'All Members')}
              </button>
              <button
                onClick={() => setActiveTab('exec')}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'exec'
                    ? 'bg-[#0D5C35] text-white shadow-md'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {t('পরিচালনা পরিষদ', 'Executive Board')}
              </button>
              <button
                onClick={() => setActiveTab('blood')}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'blood'
                    ? 'bg-[#E53935] text-white shadow-md'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {t('জরুরি রক্তদান উইং', 'Blood Donation Wing')}
              </button>
              <button
                onClick={() => setActiveTab('relief')}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'relief'
                    ? 'bg-teal-700 text-white shadow-md'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {t('স্বাস্থ্য ও ত্রাণ উইং', 'Health & Relief Wing')}
              </button>
            </div>
          </div>
        </section>

        {/* Team Cards Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredMembers.map((m, idx) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className={`${glassCardHover} p-6 sm:p-7 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0D5C35] to-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-emerald-950/20 shrink-0">
                      {t(m.nameBn, m.nameEn).charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-stone-900 leading-snug">{t(m.nameBn, m.nameEn)}</h2>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className={`text-[11px] font-bold text-white px-2.5 py-0.5 rounded shadow-2xs ${m.badgeColor}`}>
                          {t(m.roleBn, m.roleEn)}
                        </span>
                      </div>
                      <div className="text-xs text-stone-500 mt-1 font-medium">{t(m.wingBn, m.wingEn)}</div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">{t(m.descBn, m.descEn)}</p>
                </div>

                <div className="pt-4 border-t border-stone-200/70 flex items-center justify-between text-xs text-stone-500">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t('যাচাইকৃত প্রতিনিধি', 'Verified Officer')}</span>
                  </div>
                  <span className="font-mono text-stone-600">{m.phone}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Join Committee / Volunteer CTA */}
          <div className="mt-12 sm:mt-16 rounded-3xl bg-gradient-to-br from-[#0D5C35] via-[#094828] to-stone-950 p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-emerald-200 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('মানবতার সেবায় এগিয়ে আসুন', 'Join the Movement')}</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black leading-tight">
                {t('আপনিও আমাদের নিবেদিত স্বেচ্ছাসেবক দলের অংশ হতে পারেন', 'Become a Volunteer in Rowmari Humanitarian Network')}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                {t('রক্তদান সমন্বয়, ত্রাণ বিতরণ, মেডিকেল ক্যাম্প পরিচালনা কিংবা আইটি ডেস্কে কাজ করার আগ্রহ থাকলে আজই নিবন্ধন করুন।', 'Join our specialized wings for emergency blood coordination, food packing, doctor assistance, or media communications.')}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <button
                onClick={() => setVolunteerModalOpen(true)}
                className="px-6 py-3 rounded-full bg-white text-[#0D5C35] font-bold text-xs sm:text-sm hover:bg-emerald-50 transition shadow-lg cursor-pointer"
              >
                {t('স্বেচ্ছাসেবক হিসেবে যোগ দিন', 'Apply as Volunteer')}
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer 
        lang={lang} 
        onOpenAssistance={() => setAssistanceModalOpen(true)}
        onOpenDonation={() => setDonationModalOpen(true)}
      />

      <MobileBottomBar
        lang={lang}
        onOpenAssistance={() => setAssistanceModalOpen(true)}
        onOpenDonation={() => setDonationModalOpen(true)}
      />

      <BackToTop />

      <VolunteerModal
        isOpen={volunteerModalOpen}
        onClose={() => setVolunteerModalOpen(false)}
        lang={lang}
      />

      <DonationModal
        isOpen={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
        lang={lang}
      />

      <AssistanceModal
        isOpen={assistanceModalOpen}
        onClose={() => setAssistanceModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
