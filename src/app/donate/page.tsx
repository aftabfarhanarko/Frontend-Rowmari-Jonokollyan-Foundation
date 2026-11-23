'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowRight, 
  FileCheck, 
  Sparkles,
  Lock
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import BackToTop from '@/components/BackToTop';
import AssistanceModal from '@/components/modals/AssistanceModal';
import DonationModal from '@/components/modals/DonationModal';
import { GlassSection, SectionHeading, glassCard, glassCardHover } from '@/components/ui/glass';
import { FOUNDATION_INFO } from '@/data/mockData';
import { Language } from '@/types';

export default function DonatePage() {
  const [lang, setLang] = useState<Language>('bn');
  const [selectedAmount, setSelectedAmount] = useState<number | 'other'>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
  const [campaign, setCampaign] = useState<string>('general');
  const [anonymous, setAnonymous] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'bank'>('bkash');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [assistanceModalOpen, setAssistanceModalOpen] = useState<boolean>(false);
  const [copiedNum, setCopiedNum] = useState<string | null>(null);

  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);

  const amounts: (number | 'other')[] = [500, 1000, 2500, 5000, 'other'];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNum(text);
    setTimeout(() => setCopiedNum(null), 2500);
  };

  const getEffectiveAmount = () => {
    if (selectedAmount === 'other') {
      return customAmount ? Number(customAmount) : 0;
    }
    return selectedAmount;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBF9] text-[#1E293B]">
      <Navbar 
        lang={lang} 
        onToggleLang={() => setLang(l => l === 'bn' ? 'en' : 'bn')} 
        onOpenDonation={() => setModalOpen(true)}
      />

      <main className="flex-1 pb-20 sm:pb-24">
        {/* Header Hero Banner */}
        <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 bg-gradient-to-b from-red-50/50 via-white to-[#FAFBF9]">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-red-400/20 blur-3xl" />
            <div className="absolute top-1/2 -right-24 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-[#E53935] text-xs font-bold mb-3 shadow-2xs">
                <Heart className="w-3.5 h-3.5 fill-[#E53935] text-[#E53935]" />
                <span>{t('শতভাগ স্বচ্ছ ও সরাসরি চরে বিতরণযোগ্য অনুদান', '100% Transparent & Directly Distributed Aid')}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
                {t('আপনার একটি অনুদান বদলে দেবে একটি পরিবারের জীবন', 'Your Charitable Gift Directly Saves Char Families')}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-stone-600 leading-relaxed font-normal">
                {t(
                  'রৌমারীর প্রত্যন্ত চরাঞ্চলের অসহায় শীতার্ত মানুষ, জটিল রোগে আক্রান্ত মুমূর্ষু রোগী ও দরিদ্র মেধাবী শিক্ষার্থীদের পাশে দাঁড়ান। প্রতিটি টাকার হিসাব ডিজিটাল রসিদে সংরক্ষিত।',
                  'Support winter warmth, emergency medicines, student scholarships, and food packs in remote chars of Rowmari. Instant verified digital receipt for every taka.'
                )}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Interactive Donation Builder Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Donation Form Card */}
            <div className={`${glassCard} lg:col-span-7 p-6 sm:p-8 space-y-6 shadow-xl`}>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2.5">
                  {t('১. অনুদানের পরিমাণ নির্বাচন করুন (টাকায়)', '1. Select Donation Amount (BDT)')}
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-2.5">
                  {amounts.map((amt) => {
                    const isSelected = selectedAmount === amt;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setSelectedAmount(amt)}
                        className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-bold border transition cursor-pointer text-center ${
                          isSelected
                            ? 'bg-[#E53935] text-white border-[#E53935] shadow-md shadow-red-950/20'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-red-300'
                        }`}
                      >
                        {amt === 'other' ? t('অন্যান্য', 'Other') : `৳${amt.toLocaleString()}`}
                      </button>
                    );
                  })}
                </div>

                {selectedAmount === 'other' && (
                  <div className="mt-3">
                    <input
                      type="number"
                      placeholder={t('অনুদানের পরিমাণ লিখুন (টাকায়)', 'Enter custom amount in BDT')}
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#E53935]"
                    />
                  </div>
                )}
              </div>

              {/* Frequency */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  {t('২. অনুদানের ধরন', '2. Frequency')}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFrequency('once')}
                    className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition cursor-pointer text-center ${
                      frequency === 'once'
                        ? 'bg-[#0D5C35] text-white border-[#0D5C35] shadow-sm'
                        : 'bg-white text-stone-700 border-stone-200'
                    }`}
                  >
                    {t('এককালীন অনুদান', 'One Time')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition cursor-pointer text-center ${
                      frequency === 'monthly'
                        ? 'bg-[#0D5C35] text-white border-[#0D5C35] shadow-sm'
                        : 'bg-white text-stone-700 border-stone-200'
                    }`}
                  >
                    {t('মাসিক মানবিক সহায়তা', 'Monthly')}
                  </button>
                </div>
              </div>

              {/* Campaign Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  {t('৩. সহায়তার খাত / ক্যাম্পেইন', '3. Specific Relief Sector')}
                </label>
                <select
                  value={campaign}
                  onChange={(e) => setCampaign(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#0D5C35]"
                >
                  <option value="general">{t('সাধারণ মানবিক তহবিল (জরুরি প্রয়োজনে বরাদ্দ)', 'General Relief Fund')}</option>
                  <option value="winter">{t('শীতবস্ত্র ও কম্বল বিতরণ ২০২৬', 'Winter Clothes & Blankets')}</option>
                  <option value="medical">{t('অসহায় রোগীর চিকিৎসা ও ফ্রি ওষুধ তহবিল', 'Medical Aid & Free Medicines')}</option>
                  <option value="education">{t('দরিদ্র চরাঞ্চল শিক্ষার্থীদের শিক্ষাবৃত্তি', 'Char Children Education Scholarships')}</option>
                  <option value="zakat">{t('যাকাত তহবিল (সুনির্দিষ্ট হকদারদের জন্য)', '100% Zakat Fund')}</option>
                </select>
              </div>

              {/* Anonymous Checkbox */}
              <div className="flex items-center gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="anon"
                  checked={anonymous}
                  onChange={(e) => setAnonymous(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0D5C35] focus:ring-[#0D5C35] border-stone-300 cursor-pointer"
                />
                <label htmlFor="anon" className="text-xs sm:text-sm text-stone-600 font-medium cursor-pointer">
                  {t('নাম প্রকাশ করতে চাই না (Anonymous Donation)', 'Donate anonymously (Keep name private)')}
                </label>
              </div>

              {/* Instant Online Modal Trigger Button */}
              <button
                onClick={() => setModalOpen(true)}
                className="w-full py-3.5 rounded-xl bg-[#E53935] hover:bg-[#D32F2F] text-white font-black text-sm sm:text-base transition cursor-pointer flex items-center justify-center gap-2 shadow-xl shadow-red-950/20 active:scale-98"
              >
                <Heart className="w-5 h-5 fill-white text-white" />
                <span>
                  {getEffectiveAmount() > 0 
                    ? t(`৳${getEffectiveAmount().toLocaleString()} টাকা অনুদান দিন`, `Donate ৳${getEffectiveAmount().toLocaleString()}`)
                    : t('অনলাইন অনুদান সম্পন্ন করুন', 'Proceed to Donate')}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Direct Official Accounts & Trust Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0D5C35] to-[#073320] text-white shadow-xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-bold text-emerald-200">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t('অফিসিয়াল হিসাব নম্বর', 'Official Foundation Accounts')}</span>
                </div>

                <h2 className="text-lg font-bold">{t('সরাসরি একাউন্টে পাঠান', 'Direct Account Transfers')}</h2>

                {/* bKash */}
                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-emerald-200 font-bold">{t('বিকাশ (মার্চেন্ট)', 'bKash Merchant')}</div>
                    <div className="text-sm font-mono font-bold">{FOUNDATION_INFO.bkashMerchant}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(FOUNDATION_INFO.bkashMerchant)}
                    className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition cursor-pointer"
                    title="Copy"
                  >
                    {copiedNum === FOUNDATION_INFO.bkashMerchant ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Nagad */}
                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-emerald-200 font-bold">{t('নগদ (মার্চেন্ট)', 'Nagad Merchant')}</div>
                    <div className="text-sm font-mono font-bold">{FOUNDATION_INFO.nagadMerchant}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(FOUNDATION_INFO.nagadMerchant)}
                    className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition cursor-pointer"
                    title="Copy"
                  >
                    {copiedNum === FOUNDATION_INFO.nagadMerchant ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Bank */}
                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                  <div className="text-xs text-emerald-200 font-bold mb-1">{t('ব্যাংক একাউন্ট বিবরণ', 'Bank Details')}</div>
                  <div className="text-xs space-y-0.5 font-mono text-emerald-50">
                    <div>{FOUNDATION_INFO.bankDetails.bankName}</div>
                    <div className="font-bold text-white">A/C: {FOUNDATION_INFO.bankDetails.accountNo}</div>
                    <div>Routing: {FOUNDATION_INFO.bankDetails.routingNo}</div>
                  </div>
                </div>
              </div>

              {/* Transparency Notice */}
              <div className={`${glassCard} p-5 space-y-2`}>
                <div className="flex items-center gap-2 text-xs font-bold text-[#0D5C35]">
                  <FileCheck className="w-4 h-4" />
                  <span>{t('তাৎক্ষণিক ডিজিটাল রসিদ', 'Instant Verifiable Receipt')}</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {t(
                    'অনুদান সফল হওয়ার সাথে সাথে একটি যাচাইযোগ্য ডিজিটাল রসিদ পাওয়া যাবে যা পরবর্তীতে যে কোনো সময় ট্র্যাকিং করা সম্ভব।',
                    'Upon donation confirmation, you immediately receive a unique verifiable digital receipt for your audit.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer 
        lang={lang} 
        onOpenAssistance={() => setAssistanceModalOpen(true)}
        onOpenDonation={() => setModalOpen(true)}
      />

      <MobileBottomBar
        lang={lang}
        onOpenAssistance={() => setAssistanceModalOpen(true)}
        onOpenDonation={() => setModalOpen(true)}
      />

      <BackToTop />

      <DonationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        lang={lang}
        preselectedCampaign={campaign}
      />

      <AssistanceModal
        isOpen={assistanceModalOpen}
        onClose={() => setAssistanceModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
