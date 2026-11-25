'use client';

import React from 'react';
import { Download, Smartphone } from 'lucide-react';
import { usePwa } from '@/context/PwaContext';

interface PwaInstallButtonProps {
  variant?: 'navbar' | 'drawer' | 'default';
  className?: string;
  lang?: 'bn' | 'en';
}

export default function PwaInstallButton({
  variant = 'default',
  className = '',
  lang = 'bn',
}: PwaInstallButtonProps) {
  const { isInstallable, isInstalled, promptInstall } = usePwa();

  // If already running as an installed standalone PWA, completely hide the install button
  if (isInstalled) {
    return null;
  }

  // If not installable and not on iOS, don't show the button
  if (!isInstallable) {
    return null;
  }

  if (variant === 'navbar') {
    return (
      <button
        type="button"
        onClick={promptInstall}
        className={`px-3 py-1.5 rounded-full border border-emerald-600/30 bg-emerald-50 hover:bg-emerald-100 text-[#0D5C35] text-xs font-bold transition flex items-center gap-1.5 shadow-2xs cursor-pointer active:scale-95 ${className}`}
        title={lang === 'bn' ? 'অ্যাপ ইনস্টল করুন' : 'Install App'}
      >
        <Download className="w-3.5 h-3.5 text-[#0D5C35]" />
        <span>{lang === 'bn' ? 'অ্যাপ ইনস্টল' : 'Install App'}</span>
      </button>
    );
  }

  if (variant === 'drawer') {
    return (
      <button
        type="button"
        onClick={promptInstall}
        className={`w-full py-3 px-4 rounded-xl border border-emerald-600/30 bg-emerald-50 hover:bg-emerald-100 text-[#0D5C35] font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs transition active:scale-[0.99] text-center cursor-pointer ${className}`}
      >
        <Smartphone className="w-5 h-5 text-[#0D5C35]" />
        <span>{lang === 'bn' ? 'RJF অ্যাপ ইনস্টল করুন' : 'Install RJF App'}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={promptInstall}
      className={`py-2 px-4 rounded-xl bg-[#0D5C35] hover:bg-[#0A4729] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition cursor-pointer active:scale-95 ${className}`}
    >
      <Download className="w-4 h-4 text-white" />
      <span>{lang === 'bn' ? 'অ্যাপ ইনস্টল করুন' : 'Install App'}</span>
    </button>
  );
}
