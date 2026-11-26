'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Users, Mail, HandHeart } from 'lucide-react';
import { Language } from '@/types';

interface Props {
  lang: Language;
  onOpenDonation?: () => void;
  onOpenVolunteer: () => void;
}

export default function JoinCTA({ lang, onOpenDonation, onOpenVolunteer }: Props) {
  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
    setEmail('');
  };

  return (
    <section className="relative overflow-hidden py-10 md:py-14">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#D62828] via-[#0b4d2d] to-[#073320] p-6 md:p-10 shadow-lg">
          <div aria-hidden className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-[#E53935]/15 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-red-300/15 blur-3xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5 text-white">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
                {t('আপনার ছোট একটি পদক্ষেপ বদলে দিতে পারে একটি পরিবারের জীবন', 'One small step from you can change a family’s life')}
              </h2>
              <p className="text-red-50/85 leading-relaxed">
                {t('স্বেচ্ছাসেবক হোন, অথবা আমাদের মানবিক কার্যক্রমে যুক্ত থাকুন।', 'Join as a volunteer, or stay connected with our humanitarian work.')}
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  onClick={onOpenVolunteer}
                  className="px-6 py-3 rounded-full bg-[#E53935] hover:bg-[#D32F2F] font-bold text-sm flex items-center gap-2 shadow-lg shadow-red-900/30 transition active:scale-[0.98] cursor-pointer"
                >
                  <Users className="w-4 h-4" />
                  {t('স্বেচ্ছাসেবক হোন', 'Join as Volunteer')}
                </button>
                <Link
                  href="/donate"
                  className="px-6 py-3 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-md font-bold text-sm flex items-center gap-2 transition active:scale-[0.98] cursor-pointer text-white"
                >
                  <Heart className="w-4 h-4 text-red-300 fill-current" />
                  {t('অনুদান দিন', 'Donate Now')}
                </Link>
              </div>
            </div>

            <form
              onSubmit={submit}
              className="rounded-3xl bg-white/12 border border-white/25 backdrop-blur-xl p-6 md:p-7 space-y-4 text-white"
            >
              <div className="flex items-center gap-2 font-bold">
                <Mail className="w-5 h-5" />
                {t('আপডেট পেতে ইমেইল দিন', 'Get updates by email')}
              </div>
              {done ? (
                <p className="text-sm text-red-100">{t('ধন্যবাদ! আপনার ইমেইল যুক্ত হয়েছে।', 'Thank you! Your email has been added.')}</p>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('আপনার ইমেইল', 'Your email')}
                    className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-white/90 text-stone-900 placeholder:text-stone-500 text-sm outline-none focus:ring-2 focus:ring-white/70"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-white text-[#D62828] font-bold text-sm hover:bg-red-50 transition active:scale-[0.98] cursor-pointer"
                  >
                    {t('যুক্ত হোন', 'Subscribe')}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
