'use client';

import React from 'react';
import Link from 'next/link';
import { Users, HandHeart, Heart } from 'lucide-react';
import { Language } from '@/types';

interface MobileBottomBarProps {
  lang: Language;
  onOpenAssistance?: () => void;
  onOpenDonation?: () => void;
  onOpenVolunteer?: () => void;
}

export default function MobileBottomBar({
  lang,
  onOpenAssistance,
  onOpenVolunteer,
}: MobileBottomBarProps) {
  return (
    <aside aria-label="Quick Actions" className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-3 py-2 flex items-center gap-2 sm:hidden shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      {/* 1. Primary Donation CTA */}
      <Link
        href="/donate"
        className="flex-1 py-2 px-2.5 rounded-xl bg-[#D62828] hover:bg-[#B91C1C] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition active:scale-[0.98]"
      >
        <Heart className="w-3.5 h-3.5 fill-current" />
        <span>{lang === 'bn' ? 'অনুদান দিন' : 'Donate'}</span>
      </Link>

      {/* 2. Beneficiary Assistance CTA */}
      {onOpenAssistance ? (
        <button
          onClick={onOpenAssistance}
          className="flex-1 py-2 px-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition active:scale-[0.98] cursor-pointer"
        >
          <HandHeart className="w-3.5 h-3.5 text-white" />
          <span>{lang === 'bn' ? 'সহায়তার আবেদন' : 'Apply'}</span>
        </button>
      ) : (
        <Link
          href="/get-help"
          className="flex-1 py-2 px-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition active:scale-[0.98]"
        >
          <HandHeart className="w-3.5 h-3.5 text-white" />
          <span>{lang === 'bn' ? 'সহায়তার আবেদন' : 'Apply'}</span>
        </Link>
      )}

      {/* 3. Volunteer CTA */}
      {onOpenVolunteer ? (
        <button
          onClick={onOpenVolunteer}
          className="flex-1 py-2 px-2.5 rounded-xl border border-stone-300 bg-white text-stone-800 hover:bg-stone-50 font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition active:scale-[0.98] cursor-pointer"
        >
          <Users className="w-3.5 h-3.5 text-[#D62828]" />
          <span>{lang === 'bn' ? 'স্বেচ্ছাসেবক হন' : 'Volunteer'}</span>
        </button>
      ) : (
        <Link
          href="/volunteer"
          className="flex-1 py-2 px-2.5 rounded-xl border border-stone-300 bg-white text-stone-800 hover:bg-stone-50 font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition active:scale-[0.98]"
        >
          <Users className="w-3.5 h-3.5 text-[#D62828]" />
          <span>{lang === 'bn' ? 'স্বেচ্ছাসেবক হন' : 'Volunteer'}</span>
        </Link>
      )}
    </aside>
  );
}
