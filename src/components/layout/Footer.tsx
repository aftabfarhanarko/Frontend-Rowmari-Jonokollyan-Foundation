'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Heart,
  ArrowRight,
  ExternalLink,
  Lock,
  CheckCircle2,
  Users,
  FileText,
  BadgeCheck,
} from 'lucide-react';
import { Language } from '@/types';
import { FOUNDATION_INFO } from '@/data/mockData';

interface FooterProps {
  lang: Language;
  onOpenAssistance?: () => void;
  onOpenDonation?: () => void;
}

export default function Footer({
  lang,
  onOpenAssistance,
  onOpenDonation,
}: FooterProps) {
  const isBn = lang === 'bn';

  return (
    <footer className="relative z-30 w-full overflow-hidden bg-[#18181B] text-stone-300 border-t border-red-900/60 pt-0 pb-28 sm:pb-12">
      {/* Decorative Top Accent Gradient Line */}
      <div className="h-1 w-full bg-gradient-to-r from-red-600 via-[#E53935] to-red-600" />

      {/* Subtle Background Radial Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-80 rounded-full bg-red-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-red-600/5 blur-[100px]" />
      </div>

      {/* Top Pre-Footer Emergency & Quick Action Ribbon */}
      <div className="border-b border-red-900/50 bg-[#1C1917]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Live Emergency Hotlines */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                </span>
                <span className="text-stone-400 font-medium">
                  {isBn ? 'কেন্দ্রীয় হটলাইন (২৪/৭):' : 'Hotline (24/7):'}
                </span>
                <a
                  href={`tel:${FOUNDATION_INFO.hotline.replace(/\s+/g, '')}`}
                  className="font-mono font-bold text-white hover:text-red-400 transition"
                >
                  {FOUNDATION_INFO.hotline}
                </a>
              </div>

              <span className="hidden sm:inline text-red-900">•</span>

              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                </span>
                <span className="text-stone-400 font-medium">
                  {isBn ? 'ইমেইল যোগাযোগ:' : 'Official Email:'}
                </span>
                <a
                  href={`mailto:${FOUNDATION_INFO.email}`}
                  className="font-mono font-bold text-red-400 hover:text-red-300 transition"
                >
                  {FOUNDATION_INFO.email}
                </a>
              </div>
            </div>

            {/* Direct Action Pills */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {onOpenAssistance && (
                <button
                  onClick={onOpenAssistance}
                  className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-2xs"
                >
                  <FileText className="w-3.5 h-3.5 text-red-400" />
                  <span>{isBn ? 'সহায়তা চাই' : 'Request Aid'}</span>
                </button>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-red-900/60">
          {/* Column 1: Brand & Organization Overview (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white p-1 shrink-0 shadow-lg shadow-red-950/50 border border-red-500/30 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="রৌমারী জনকল্যাণ ফাউন্ডেশন লোগো"
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-lg sm:text-xl font-extrabold text-white leading-tight tracking-tight">
                    {isBn ? FOUNDATION_INFO.nameBn : FOUNDATION_INFO.nameEn}
                  </h3>
                  <BadgeCheck className="w-4 h-4 text-red-400 shrink-0" />
                </div>
                <p className="text-xs sm:text-sm text-red-400 font-medium mt-0.5">
                  {isBn ? FOUNDATION_INFO.establishedBn : FOUNDATION_INFO.establishedEn} • {isBn ? FOUNDATION_INFO.yearsActiveBn : FOUNDATION_INFO.yearsActiveEn}
                </p>
              </div>
            </div>

            <p className="text-sm text-stone-300 leading-relaxed font-normal">
              {isBn
                ? 'কুড়িগ্রাম জেলার ভারত সীমান্তবর্তী ও নদীবেষ্টিত রৌমারীর দুর্গম চরাঞ্চলের অসহায়, শীতার্ত, দরিদ্র রোগী ও চিকিৎসাবঞ্চিত মানুষের সার্বক্ষণিক সেবায় একটি নিবন্ধিত ও নিরপেক্ষ মানবিক সংগঠন।'
                : 'A registered, non-political voluntary foundation dedicated to serving underprivileged families and remote river-island char communities in Rowmari and Kurigram.'}
            </p>

            {/* Official Registration & Trust Badge */}
            <div className="rounded-xl bg-[#062918] border border-red-800/60 p-3.5 text-xs text-stone-300 space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-1.5 text-red-300 font-bold">
                <ShieldCheck className="w-4 h-4 text-red-400" />
                <span>{isBn ? 'স্বীকৃত ও অনুমোদিত সমাজসেবা ট্রাস্ট' : 'Verified & Registered Charity Trust'}</span>
              </div>
              <p className="text-[11px] text-stone-400 font-mono leading-relaxed">
                {isBn ? FOUNDATION_INFO.registrationNoBn : FOUNDATION_INFO.registrationNoEn}
              </p>
            </div>

            {/* Interactive Social Connect Pills */}
            <div className="pt-1">
              <span className="block text-[11px] uppercase tracking-wider text-stone-400 font-semibold mb-2">
                {isBn ? 'সামাজিক যোগাযোগে যুক্ত থাকুন' : 'Connect with Us'}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/8 hover:bg-white/15 border border-white/10 text-xs font-medium text-stone-200 hover:text-white transition flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>Facebook Page</span>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/8 hover:bg-white/15 border border-white/10 text-xs font-medium text-stone-200 hover:text-white transition flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>Facebook Group</span>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/8 hover:bg-white/15 border border-white/10 text-xs font-medium text-stone-200 hover:text-white transition flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: দ্রুত লিঙ্ক (Quick Links - lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-red-800/60 pb-2">
              {isBn ? 'মূল পাতাগুলো' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="group flex items-center gap-1.5 text-stone-300 hover:text-white transition">
                  <ArrowRight className="w-3.5 h-3.5 text-red-500 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition" />
                  <span>{isBn ? 'হোম পেজ' : 'Home'}</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="group flex items-center gap-1.5 text-stone-300 hover:text-white transition">
                  <ArrowRight className="w-3.5 h-3.5 text-red-500 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition" />
                  <span>{isBn ? 'আমাদের কথা ও ইতিহাস' : 'About Foundation'}</span>
                </Link>
              </li>
              <li>
                <Link href="/team" className="group flex items-center gap-1.5 text-stone-300 hover:text-white transition">
                  <ArrowRight className="w-3.5 h-3.5 text-red-500 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition" />
                  <span>{isBn ? 'টিম ও কমিটি' : 'Team & Leadership'}</span>
                </Link>
              </li>
              <li>
                <Link href="/activities" className="group flex items-center gap-1.5 text-stone-300 hover:text-white transition">
                  <ArrowRight className="w-3.5 h-3.5 text-red-500 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition" />
                  <span>{isBn ? 'সকল কার্যক্রম' : 'Field Activities'}</span>
                </Link>
              </li>
              <li>
                <Link href="/campaigns" className="group flex items-center gap-1.5 text-stone-300 hover:text-white transition">
                  <ArrowRight className="w-3.5 h-3.5 text-red-500 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition" />
                  <span>{isBn ? 'চলমান ক্যাম্পেইন' : 'Active Campaigns'}</span>
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="group flex items-center gap-1.5 text-stone-300 hover:text-white transition">
                  <ArrowRight className="w-3.5 h-3.5 text-red-500 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition" />
                  <span>{isBn ? 'ছবি ও ভিডিও গ্যালারি' : 'Photo Gallery'}</span>
                </Link>
              </li>
              <li>
                <Link href="/news" className="group flex items-center gap-1.5 text-stone-300 hover:text-white transition">
                  <ArrowRight className="w-3.5 h-3.5 text-red-500 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition" />
                  <span>{isBn ? 'সংবাদ ও বিজ্ঞপ্তি' : 'News & Press'}</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="group flex items-center gap-1.5 text-stone-300 hover:text-white transition">
                  <ArrowRight className="w-3.5 h-3.5 text-red-500 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition" />
                  <span>{isBn ? 'যোগাযোগ ও সহায়তা কেন্দ্র' : 'Contact Us'}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: সেবা ও জরুরি পোর্টাল (Direct Portals - lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-red-800/60 pb-2">
              {isBn ? 'সেবা ও নাগরিক পোর্টাল' : 'Services & Portals'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/volunteer"
                  className="group flex items-start gap-2 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition"
                >
                  <Users className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="block font-semibold text-white group-hover:text-red-300 transition text-xs sm:text-sm">
                      {isBn ? 'স্বেচ্ছাসেবক হিসেবে যুক্ত হোন' : 'Join as a Volunteer'}
                    </span>
                    <span className="text-[11px] text-stone-400 block">
                      {isBn ? 'তারুণ্যের শক্তিতে মানবতার সেবা' : 'Serve humanity together'}
                    </span>
                  </div>
                </Link>
              </li>

              <li>
                <Link
                  href="/campaigns"
                  className="group flex items-start gap-2 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition"
                >
                  <Heart className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="block font-semibold text-white group-hover:text-red-300 transition text-xs sm:text-sm">
                      {isBn ? 'চলমান মানবিক ক্যাম্পেইন' : 'Active Relief Campaigns'}
                    </span>
                    <span className="text-[11px] text-stone-400 block">
                      {isBn ? 'শীতবস্ত্র, খাদ্য ও জরুরি পুনর্বাসন' : 'Winter warmth, food & char rehabilitation'}
                    </span>
                  </div>
                </Link>
              </li>

              <li>
                <Link
                  href="/activities"
                  className="group flex items-start gap-2 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition"
                >
                  <FileText className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="block font-semibold text-white group-hover:text-red-300 transition text-xs sm:text-sm">
                      {isBn ? 'আমাদের মানবিক কার্যক্রম' : 'Our Relief Activities'}
                    </span>
                    <span className="text-[11px] text-stone-400 block">
                      {isBn ? 'চরাঞ্চলের অসহায় মানুষের সেবায়' : 'Dedicated to river island welfare'}
                    </span>
                  </div>
                </Link>
              </li>

              <li>
                <Link
                  href="/volunteer"
                  className="group flex items-start gap-2 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition"
                >
                  <Users className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="block font-semibold text-white group-hover:text-red-300 transition text-xs sm:text-sm">
                      {isBn ? 'স্বেচ্ছাসেবক নিবন্ধন' : 'Join as Volunteer'}
                    </span>
                    <span className="text-[11px] text-stone-400 block">
                      {isBn ? 'রৌমারীর মানুষের সেবায় কাজ করুন' : 'Be a community changemaker'}
                    </span>
                  </div>
                </Link>
              </li>

              <li className="pt-1">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-700/60 text-red-300 hover:text-white text-xs font-semibold transition"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{isBn ? 'অফিসিয়াল অ্যাডমিন ড্যাশবোর্ড' : 'Staff Admin Dashboard'}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: কেন্দ্রীয় কার্যালয় ও পেমেন্ট স্বচ্ছতা (Headquarters & Contacts - lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-red-800/60 pb-2">
              {isBn ? 'কেন্দ্রীয় কার্যালয় ও ঠিকানা' : 'Official Headquarters'}
            </h4>

            <div className="space-y-3 text-xs sm:text-sm text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {isBn ? FOUNDATION_INFO.addressBn : FOUNDATION_INFO.addressEn}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-red-400 shrink-0" />
                <a
                  href={`tel:${FOUNDATION_INFO.hotline.replace(/\s+/g, '')}`}
                  className="font-mono hover:text-white transition"
                >
                  {FOUNDATION_INFO.hotline}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-red-400 shrink-0" />
                <a
                  href={`mailto:${FOUNDATION_INFO.email}`}
                  className="font-mono hover:text-white transition text-xs"
                >
                  {FOUNDATION_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Policies and Governance Quick Row */}
        <div className="py-4 border-b border-red-900/60 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-red-400 shrink-0" />
            <span className="text-stone-300 font-medium">
              {isBn ? 'নীতিমালা ও আইনি সম্মতি:' : 'Compliance & Governance:'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-stone-300">
            <Link href="/privacy" className="hover:text-red-300 hover:underline transition">
              {isBn ? 'গোপনীয়তা ও ডেটা সুরক্ষা নীতি' : 'Privacy Policy'}
            </Link>
            <span className="text-red-900 hidden sm:inline">•</span>
            <Link href="/terms" className="hover:text-red-300 hover:underline transition">
              {isBn ? 'ব্যবহারের শর্তাবলী' : 'Terms of Use'}
            </Link>
            <span className="text-red-900 hidden sm:inline">•</span>
            <Link href="/about" className="hover:text-red-300 hover:underline transition">
              {isBn ? 'আমাদের সম্পর্কে' : 'About Us'}
            </Link>
          </div>
        </div>

        {/* Bottom Sub-Footer: Copyright, Developer Credits & Accountability */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs sm:text-sm text-stone-400 gap-4">
          <p className="text-center md:text-left text-xs text-stone-400">
            © 2026 {isBn ? FOUNDATION_INFO.nameBn : FOUNDATION_INFO.nameEn}। সর্বস্বত্ব সংরক্ষিত।
          </p>

          {/* Premium Developer Attribution */}
          <div className="flex items-center gap-1.5 text-xs text-stone-300 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full shadow-2xs">
            <span className="text-stone-400">Developed with ❤️ by</span>
            <a
              href="https://www.aftabfarhan.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-red-300 hover:text-white underline underline-offset-4 decoration-red-400 hover:decoration-white transition-all flex items-center gap-1"
            >
              <span>Aftab Farhan ARKO</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-red-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-red-400 shrink-0" />
            <span>{isBn ? 'নিরীক্ষিত আর্থিক স্বচ্ছতা ও জবাবদিহিতা' : '100% Verified Transparency'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
