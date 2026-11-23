'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Globe,
  Heart,
  Menu,
  X,
  Users,
  Home,
  Info,
  Activity,
  Target,
  Droplet,
  HandHeart,
  Image as ImageIcon,
  Newspaper,
  Phone,
} from 'lucide-react';
import { Language } from '@/types';

interface NavbarProps {
  lang: Language;
  onToggleLang?: () => void;
  onOpenDonation?: () => void;
}

export default function Navbar({
  lang,
  onToggleLang,
  onOpenDonation,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', labelBn: 'হোম', labelEn: 'Home', icon: Home },
    { href: '/about', labelBn: 'আমাদের কথা', labelEn: 'About Us', icon: Info },
    { href: '/team', labelBn: 'টিম ও কমিটি', labelEn: 'Our Team', icon: Users },
    { href: '/activities', labelBn: 'কার্যক্রম', labelEn: 'Activities', icon: Activity },
    { href: '/campaigns', labelBn: 'ক্যাম্পেইন', labelEn: 'Campaigns', icon: Target },
    { href: '/blood-donation', labelBn: 'রক্তদান', labelEn: 'Blood', icon: Droplet },
    { href: '/get-help', labelBn: 'সহায়তা চাই', labelEn: 'Get Help', icon: HandHeart },
    { href: '/gallery', labelBn: 'গ্যালারি', labelEn: 'Gallery', icon: ImageIcon },
    { href: '/news', labelBn: 'সংবাদ ও ইভেন্ট', labelEn: 'News', icon: Newspaper },
    { href: '/contact', labelBn: 'যোগাযোগ', labelEn: 'Contact', icon: Phone },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-stone-200 shadow-xs bg-white flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="রৌমারী জনকল্যাণ ফাউন্ডেশন লোগো"
                width={48}
                height={48}
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div>
              <span className="text-base sm:text-lg md:text-xl font-bold text-[#0D5C35] group-hover:text-[#E53935] transition leading-tight block">
                {lang === 'bn' ? 'রৌমারী জনকল্যাণ ফাউন্ডেশন' : 'Rowmari Janakalyan Foundation'}
              </span>
              <span className="text-[11px] text-stone-500 block leading-tight">
                {lang === 'bn' ? 'স্থাপিত ২০১৮ • রৌমারী, কুড়িগ্রাম' : 'Est. 2018 • Rowmari, Kurigram'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-semibold transition duration-150 py-1.5 px-1 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#0D5C35] border-b-2 border-[#0D5C35] font-bold'
                      : 'text-stone-600 hover:text-[#0D5C35]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{lang === 'bn' ? link.labelBn : link.labelEn}</span>
                </Link>
              );
            })}
          </nav>

          {/* Actions: Language & Donate Button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Language Switch */}
            {onToggleLang && (
              <button
                onClick={onToggleLang}
                className="px-2.5 py-1.5 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
                title="Change Language"
              >
                <Globe className="w-3.5 h-3.5 text-stone-600" />
                <span>{lang === 'bn' ? 'বাংলা | EN' : 'EN | বাংলা'}</span>
              </button>
            )}

            {/* Donate CTA Link / Button (Primary Red #E53935) */}
            {onOpenDonation ? (
              <button
                onClick={onOpenDonation}
                className="px-5 py-2 rounded-full bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold text-xs sm:text-sm transition shadow-md shadow-red-600/20 flex items-center gap-1.5 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-white text-white" />
                <span>{lang === 'bn' ? 'অনুদানের জন্য' : 'Donate Now'}</span>
              </button>
            ) : (
              <Link
                href="/donate"
                className="px-5 py-2 rounded-full bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold text-xs sm:text-sm transition shadow-md shadow-red-600/20 flex items-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Heart className="w-4 h-4 fill-white text-white" />
                <span>{lang === 'bn' ? 'অনুদানের জন্য' : 'Donate Now'}</span>
              </Link>
            )}
          </div>

          {/* Mobile menu toggle button */}
          <div className="flex xl:hidden items-center gap-2">
            {onToggleLang && (
              <button
                onClick={onToggleLang}
                className="px-2 py-1 rounded border border-stone-200 text-stone-700 text-xs font-semibold"
              >
                {lang === 'bn' ? 'EN' : 'বাং'}
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="p-2 rounded-lg text-stone-600 hover:bg-stone-100"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-stone-800" />
              ) : (
                <Menu className="w-6 h-6 text-stone-800" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200 shadow-lg">
          <nav className="grid grid-cols-2 gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg font-medium text-xs transition flex items-center gap-2 ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-900 font-bold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-emerald-800' : 'text-stone-500'}`} />
                  <span>{lang === 'bn' ? link.labelBn : link.labelEn}</span>
                </Link>
              );
            })}
          </nav>
          <div className="pt-3 border-t border-stone-100 flex gap-2">
            <Link
              href="/donate"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2 rounded-full bg-[#E53935] hover:bg-[#D32F2F] text-white font-semibold text-xs shadow-md flex items-center justify-center gap-1.5 text-center"
            >
              <Heart className="w-3.5 h-3.5 fill-white text-white" />
              <span>{lang === 'bn' ? 'অনুদানের জন্য' : 'Donate Now'}</span>
            </Link>
            <Link
              href="/volunteer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2 rounded-full border border-[#0D5C35] text-[#0D5C35] hover:bg-emerald-50 font-semibold text-xs flex items-center justify-center gap-1.5 text-center"
            >
              <Users className="w-3.5 h-3.5 text-[#0D5C35]" />
              <span>{lang === 'bn' ? 'স্বেচ্ছাসেবক' : 'Volunteer'}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
