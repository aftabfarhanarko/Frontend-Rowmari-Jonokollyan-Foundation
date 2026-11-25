'use client';

import React from 'react';
import Link from 'next/link';
import { Droplet, HandHeart } from 'lucide-react';
import { Language } from '@/types';

interface MobileBottomBarProps {
  lang: Language;
  onOpenAssistance?: () => void;
  onOpenDonation?: () => void;
  onOpenBlood?: () => void;
}

export default function MobileBottomBar({
  lang,
  onOpenAssistance,
  onOpenBlood,
}: MobileBottomBarProps) {
  return (
    <aside aria-label="Quick Actions" className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-4 py-2.5 flex items-center gap-3 sm:hidden shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      {onOpenAssistance ? (
        <button
          onClick={onOpenAssistance}
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#0D5C35] hover:bg-[#094527] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition active:scale-[0.98] cursor-pointer"
        >
          <HandHeart className="w-4 h-4 text-white" />
          <span>{lang === 'bn' ? 'সহায়তা চাই' : 'Get Help'}</span>
        </button>
      ) : (
        <Link
          href="/get-help"
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#0D5C35] hover:bg-[#094527] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition active:scale-[0.98]"
        >
          <HandHeart className="w-4 h-4 text-white" />
          <span>{lang === 'bn' ? 'সহায়তা চাই' : 'Get Help'}</span>
        </Link>
      )}

      {onOpenBlood ? (
        <button
          onClick={onOpenBlood}
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition active:scale-[0.98] cursor-pointer"
        >
          <Droplet className="w-4 h-4 fill-white text-white" />
          <span>{lang === 'bn' ? 'রক্তদান পোর্টাল' : 'Blood Portal'}</span>
        </button>
      ) : (
        <Link
          href="/blood-donation"
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition active:scale-[0.98]"
        >
          <Droplet className="w-4 h-4 fill-white text-white" />
          <span>{lang === 'bn' ? 'রক্তদান পোর্টাল' : 'Blood Portal'}</span>
        </Link>
      )}
    </aside>
  );
}
