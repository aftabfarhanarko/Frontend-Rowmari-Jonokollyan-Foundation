'use client';

import React from 'react';
import Link from 'next/link';
import { Users, Heart } from 'lucide-react';
import { Language } from '@/types';

interface MobileBottomBarProps {
  lang: Language;
  onOpenDonation?: () => void;
  onOpenVolunteer?: () => void;
}

export default function MobileBottomBar({
  lang,
  onOpenVolunteer,
}: MobileBottomBarProps) {
  return (
    <aside aria-label="Quick Actions" className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-4 py-2.5 flex items-center gap-3 sm:hidden shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      {/* 1. Primary Donation CTA */}
      <Link
        href="/donate"
        className="flex-1 py-2.5 px-3 rounded-xl bg-[#D62828] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition active:scale-[0.98]"
      >
        <Heart className="w-4 h-4 fill-current" />
        <span>{lang === 'bn' ? 'অনুদান দিন' : 'Donate'}</span>
      </Link>

      {/* 2. Volunteer CTA */}
      {onOpenVolunteer ? (
        <button
          onClick={onOpenVolunteer}
          className="flex-1 py-2.5 px-3 rounded-xl border border-stone-300 bg-white text-stone-800 hover:bg-stone-50 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs transition active:scale-[0.98] cursor-pointer"
        >
          <Users className="w-4 h-4 text-[#D62828]" />
          <span>{lang === 'bn' ? 'স্বেচ্ছাসেবক হন' : 'Volunteer'}</span>
        </button>
      ) : (
        <Link
          href="/volunteer"
          className="flex-1 py-2.5 px-3 rounded-xl border border-stone-300 bg-white text-stone-800 hover:bg-stone-50 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs transition active:scale-[0.98]"
        >
          <Users className="w-4 h-4 text-[#D62828]" />
          <span>{lang === 'bn' ? 'স্বেচ্ছাসেবক হন' : 'Volunteer'}</span>
        </Link>
      )}
    </aside>
  );
}
