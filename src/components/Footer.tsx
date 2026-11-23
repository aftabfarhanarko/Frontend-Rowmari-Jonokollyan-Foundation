'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Droplet, ShieldCheck } from 'lucide-react';
import { Language } from '@/types';
import { FOUNDATION_INFO } from '@/data/mockData';

interface FooterProps {
  lang: Language;
  onOpenAssistance?: () => void;
  onOpenBlood?: () => void;
  onOpenDonation?: () => void;
}

export default function Footer({
  lang,
  onOpenAssistance,
  onOpenBlood,
  onOpenDonation,
}: FooterProps) {
  return (
    <footer className="bg-[#052615] text-stone-300 pt-16 pb-10 border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-emerald-900/60">
          {/* Column 1: Organization details & Logo */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 shrink-0 shadow-md">
                <Image
                  src="/logo.png"
                  alt="রৌমারী জনকল্যাণ ফাউন্ডেশন লোগো"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                  {lang === 'bn' ? FOUNDATION_INFO.nameBn : FOUNDATION_INFO.nameEn}
                </h3>
                <p className="text-xs text-emerald-400">
                  {lang === 'bn' ? FOUNDATION_INFO.establishedBn : FOUNDATION_INFO.establishedEn} • {lang === 'bn' ? FOUNDATION_INFO.locationBn : FOUNDATION_INFO.locationEn}
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              {lang === 'bn'
                ? 'রৌমারীর অসহায়, শীতার্ত ও চিকিৎসাবঞ্চিত মানুষের পাশে নিবেদিত একটি অরাজনৈতিক, স্বেচ্ছাসেবী ও অলাভজনক মানবিক সংগঠন।'
                : 'A non-political, voluntary humanitarian foundation serving vulnerable communities in Rowmari and Kurigram.'}
            </p>

            <div className="space-y-2 text-xs text-stone-300 pt-2">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{lang === 'bn' ? FOUNDATION_INFO.addressBn : FOUNDATION_INFO.addressEn}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono">{FOUNDATION_INFO.hotline}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Droplet className="w-4 h-4 text-red-400 shrink-0" />
                <span>
                  {lang === 'bn' ? 'জরুরি ব্লাড হটলাইন:' : 'Blood Hotline:'}{' '}
                  <span className="font-mono font-bold text-red-400">{FOUNDATION_INFO.emergencyBloodHotline}</span>
                </span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono">{FOUNDATION_INFO.email}</span>
              </p>
            </div>
          </div>

          {/* Column 2: দ্রুত লিঙ্ক (Quick Links) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {lang === 'bn' ? 'দ্রুত লিঙ্ক' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition">
                  {lang === 'bn' ? 'হোম পেজ' : 'Home'}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  {lang === 'bn' ? 'আমাদের কথা' : 'About Us'}
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-white transition">
                  {lang === 'bn' ? 'টিম ও কমিটি' : 'Our Team'}
                </Link>
              </li>
              <li>
                <Link href="/activities" className="hover:text-white transition">
                  {lang === 'bn' ? 'সকল কার্যক্রম' : 'Activities'}
                </Link>
              </li>
              <li>
                <Link href="/campaigns" className="hover:text-white transition">
                  {lang === 'bn' ? 'চলমান ক্যাম্পেইন' : 'Campaigns'}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition">
                  {lang === 'bn' ? 'ছবি ও ভিডিও' : 'Gallery'}
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition">
                  {lang === 'bn' ? 'সংবাদ ও বিজ্ঞপ্তি' : 'News & Events'}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  {lang === 'bn' ? 'যোগাযোগ' : 'Contact Us'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: সহায়তা ও সেবা (Services) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {lang === 'bn' ? 'সেবা ও পোর্টাল' : 'Services & Portal'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/get-help" className="hover:text-white transition">
                  {lang === 'bn' ? 'সহায়তার আবেদন ও ট্র্যাকিং' : 'Request Aid & Track'}
                </Link>
              </li>
              <li>
                <Link href="/blood-donation" className="hover:text-white transition">
                  {lang === 'bn' ? 'রক্তদান ও ডোনার নেটওয়ার্ক' : 'Blood Donation Portal'}
                </Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-white transition">
                  {lang === 'bn' ? 'অনুদানের পদ্ধতি ও রশিদ' : 'Donate & Digital Receipt'}
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="hover:text-white transition">
                  {lang === 'bn' ? 'স্বেচ্ছাসেবক নিবন্ধন' : 'Join as Volunteer'}
                </Link>
              </li>
              <li>
                <Link href="/get-help#track" className="hover:text-white transition">
                  {lang === 'bn' ? 'আবেদনের স্ট্যাটাস দেখুন' : 'Application Tracking'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: নীতিমালা ও অনুমোদন (Policies) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {lang === 'bn' ? 'নীতিমালা ও অনুমোদন' : 'Policies & Compliance'}
            </h4>
            <p className="text-[11px] text-stone-400">
              {lang === 'bn' ? FOUNDATION_INFO.registrationNoBn : FOUNDATION_INFO.registrationNoEn}
            </p>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  {lang === 'bn' ? 'গোপনীয়তা ও ডেটা সুরক্ষা নীতি' : 'Privacy & Data Protection Policy'}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  {lang === 'bn' ? 'ব্যবহারের শর্তাবলী' : 'Terms & Conditions'}
                </Link>
              </li>
              <li>
                <Link href="/donation-policy" className="hover:text-white transition">
                  {lang === 'bn' ? 'অনুদান ও আর্থিক স্বচ্ছতা বিধি' : 'Donation & Financial Transparency'}
                </Link>
              </li>
              <li>
                <Link href="/blood-donation" className="hover:text-white transition">
                  {lang === 'bn' ? 'রক্তদাতা সুরক্ষা ও সম্মতি নীতিমালা' : 'Blood Donor Consent Policy'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>
            © 2026 {lang === 'bn' ? FOUNDATION_INFO.nameBn : FOUNDATION_INFO.nameEn}। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'স্বচ্ছতা ও জবাবদিহিতায় অঙ্গীকারবদ্ধ' : 'Committed to Full Accountability'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
