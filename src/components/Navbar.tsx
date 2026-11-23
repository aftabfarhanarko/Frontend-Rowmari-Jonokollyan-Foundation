'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
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
  LayoutDashboard,
  ChevronDown,
} from 'lucide-react';
import { Language } from '@/types';
import TopAnnouncement from '@/components/TopAnnouncement';

interface NavbarProps {
  lang: Language;
  onToggleLang?: () => void;
  onOpenDonation?: () => void;
}

const navLinks = [
  { href: '/', labelBn: 'হোম', labelEn: 'Home', icon: Home },
  { href: '/about', labelBn: 'আমাদের কথা', labelEn: 'About Us', icon: Info },
  { href: '/team', labelBn: 'টিম ও কমিটি', labelEn: 'Our Team', icon: Users },
  { href: '/activities', labelBn: 'কার্যক্রম', labelEn: 'Activities', icon: Activity },
  { href: '/campaigns', labelBn: 'ক্যাম্পেইন', labelEn: 'Campaigns', icon: Target },
  { href: '/blood-donation', labelBn: 'রক্তদান', labelEn: 'Blood', icon: Droplet },
  { href: '/get-help', labelBn: 'সহায়তা চাই', labelEn: 'Get Help', icon: HandHeart },
  { href: '/gallery', labelBn: 'গ্যালারি', labelEn: 'Gallery', icon: ImageIcon },
  { href: '/news', labelBn: 'সংবাদ ও ইভেন্ট', labelEn: 'News', icon: Newspaper },
  { href: '/contact', labelBn: 'যোগাযোগ', labelEn: 'Contact', icon: Phone },
  { href: '/dashboard', labelBn: 'ড্যাশবোর্ড', labelEn: 'Dashboard', icon: LayoutDashboard },
];

// 1. Core important links directly visible on Desktop & Laptop (Ultra-clean 4 links)
const primaryDesktopLinks = [
  { href: '/', labelBn: 'হোম', labelEn: 'Home', icon: Home },
  { href: '/campaigns', labelBn: 'ক্যাম্পেইন', labelEn: 'Campaigns', icon: Target },
  { href: '/blood-donation', labelBn: 'রক্তদান', labelEn: 'Blood', icon: Droplet },
  { href: '/get-help', labelBn: 'সহায়তা চাই', labelEn: 'Get Help', icon: HandHeart },
];

// 2. Secondary links placed in "আরও" (More) dropdown on desktop
const secondaryDesktopLinks = [
  { href: '/about', labelBn: 'আমাদের কথা', labelEn: 'About Us', icon: Info },
  { href: '/activities', labelBn: 'কার্যক্রম', labelEn: 'Activities', icon: Activity },
  { href: '/team', labelBn: 'টিম ও কমিটি', labelEn: 'Our Team', icon: Users },
  { href: '/gallery', labelBn: 'গ্যালারি', labelEn: 'Gallery', icon: ImageIcon },
  { href: '/news', labelBn: 'সংবাদ ও ইভেন্ট', labelEn: 'News', icon: Newspaper },
  { href: '/contact', labelBn: 'যোগাযোগ', labelEn: 'Contact', icon: Phone },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const drawerVariants: Variants = {
  closed: { opacity: 0, height: 0, transition: { duration: 0.25, ease: EASE } },
  open: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.35, ease: EASE, when: 'beforeChildren', staggerChildren: 0.035 },
  },
};

const drawerItem: Variants = {
  closed: { opacity: 0, y: -8 },
  open: { opacity: 1, y: 0, transition: { duration: 0.28, ease: EASE } },
};

export default function Navbar({ lang, onToggleLang, onOpenDonation }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  // Reading progress line along the bottom edge of the header
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the drawer and dropdown whenever the route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  const isSecondaryActive = secondaryDesktopLinks.some((l) => isActive(l.href));

  const donateClasses =
    'relative overflow-hidden px-5 py-2 rounded-full bg-[#E53935] text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-red-600/25 cursor-pointer';

  const donateInner = (
    <>
      {/* Light sweep on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/25 transition-transform duration-700 ease-out group-hover/donate:translate-x-[400%]"
      />
      <motion.span
        className="relative flex"
        animate={reduceMotion ? undefined : { scale: [1, 1.22, 1, 1.12, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 3.2, ease: 'easeInOut' }}
      >
        <Heart className="w-4 h-4 fill-white text-white" />
      </motion.span>
      <span className="relative">{lang === 'bn' ? 'অনুদানের জন্য' : 'Donate Now'}</span>
    </>
  );

  return (
    <div className="sticky top-0 z-40 w-full">
      <TopAnnouncement lang={lang} />
      <motion.header
        initial={reduceMotion ? false : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className={`border-b transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl border-stone-200/80 shadow-[0_8px_30px_-12px_rgba(13,92,53,0.25)]'
            : 'bg-white/95 backdrop-blur-md border-stone-200 shadow-xs'
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          animate={{ height: scrolled ? 64 : 80 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="flex items-center justify-between"
        >
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <motion.div
              whileHover={reduceMotion ? undefined : { rotate: 8, scale: 1.06 }}
              animate={{ width: scrolled ? 40 : 48, height: scrolled ? 40 : 48 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative rounded-full overflow-hidden shrink-0 border border-stone-200 shadow-xs bg-white flex items-center justify-center ring-2 ring-transparent group-hover:ring-[#0D5C35]/20 transition-shadow"
            >
              <Image
                src="/logo.png"
                alt="রৌমারী জনকল্যাণ ফাউন্ডেশন লোগো"
                width={48}
                height={48}
                className="object-contain p-0.5"
                priority
              />
            </motion.div>
            <div>
              <span className="text-base sm:text-lg md:text-xl font-bold text-[#E53935] group-hover:text-[#D32F2F] transition-colors duration-300 leading-tight block">
                {lang === 'bn' ? 'রৌমারী জনকল্যাণ ফাউন্ডেশন' : 'Rowmari Janakalyan Foundation'}
              </span>
              <AnimatePresence initial={false}>
                {!scrolled && (
                  <motion.span
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[11px] text-stone-500 block leading-tight overflow-hidden"
                  >
                    {lang === 'bn' ? 'স্থাপিত ২০১৮ • রৌমারী, কুড়িগ্রাম' : 'Est. 2018 • Rowmari, Kurigram'}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </Link>

          {/* Desktop navigation - Primary important links + "More" dropdown */}
          <nav className="hidden xl:flex items-center gap-1" aria-label="Main">
            {primaryDesktopLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative text-xs font-semibold py-2 px-2.5 rounded-lg flex items-center gap-1.5 transition-colors duration-200 ${
                    active ? 'text-[#0D5C35] font-bold' : 'text-stone-600 hover:text-[#0D5C35]'
                  }`}
                >
                  {/* Single pill that slides between the active links */}
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-lg bg-emerald-50 border border-emerald-100"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <Icon className="relative w-3.5 h-3.5 shrink-0" />
                  <span className="relative">{lang === 'bn' ? link.labelBn : link.labelEn}</span>
                </Link>
              );
            })}

            {/* "আরও" (More) dropdown for secondary links on desktop */}
            <div
              className="relative"
              onMouseEnter={() => setMoreMenuOpen(true)}
              onMouseLeave={() => setMoreMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => setMoreMenuOpen((o) => !o)}
                className={`relative text-xs font-semibold py-2 px-2.5 rounded-lg flex items-center gap-1 transition-colors duration-200 cursor-pointer ${
                  isSecondaryActive
                    ? 'text-[#0D5C35] font-bold bg-emerald-50 border border-emerald-100'
                    : 'text-stone-600 hover:text-[#0D5C35]'
                }`}
                aria-expanded={moreMenuOpen}
              >
                <span>{lang === 'bn' ? 'আরও' : 'More'}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    moreMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {moreMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    className="absolute top-full right-0 mt-1.5 w-48 bg-white rounded-xl shadow-xl border border-stone-200/90 py-1.5 z-50 overflow-hidden"
                  >
                    {secondaryDesktopLinks.map((link) => {
                      const Icon = link.icon;
                      const active = isActive(link.href);
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMoreMenuOpen(false)}
                          className={`px-3.5 py-2 text-xs font-medium flex items-center gap-2.5 transition-colors ${
                            active
                              ? 'bg-emerald-50 text-emerald-900 font-bold'
                              : 'text-stone-700 hover:bg-stone-50 hover:text-[#0D5C35]'
                          }`}
                        >
                          <Icon
                            className={`w-3.5 h-3.5 shrink-0 ${
                              active ? 'text-emerald-800' : 'text-stone-400'
                            }`}
                          />
                          <span>{lang === 'bn' ? link.labelBn : link.labelEn}</span>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Actions */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/dashboard"
                className="px-3.5 py-1.5 rounded-full border border-[#0D5C35] text-[#0D5C35] hover:bg-[#0D5C35] hover:text-white text-xs font-bold transition-colors flex items-center gap-1.5 group"
                title={lang === 'bn' ? 'অ্যাডমিন ও মেম্বার ড্যাশবোর্ড' : 'Admin & Member Dashboard'}
              >
                <LayoutDashboard className="w-3.5 h-3.5 group-hover:rotate-6 transition-transform" />
                <span>{lang === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard'}</span>
              </Link>
            </motion.div>

            {onToggleLang && (
              <motion.button
                onClick={onToggleLang}
                whileTap={{ scale: 0.95 }}
                className="px-2.5 py-1.5 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Change Language"
              >
                <Globe className="w-3.5 h-3.5 text-stone-600" />
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={lang}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                  >
                    {lang === 'bn' ? 'বাংলা | EN' : 'EN | বাংলা'}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            )}

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="group/donate">
              {onOpenDonation ? (
                <button onClick={onOpenDonation} className={donateClasses}>
                  {donateInner}
                </button>
              ) : (
                <Link href="/donate" className={donateClasses}>
                  {donateInner}
                </Link>
              )}
            </motion.div>
          </div>

          {/* Mobile controls */}
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
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileMenuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.16 }}
                  className="flex"
                >
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6 text-stone-800" />
                  ) : (
                    <Menu className="w-6 h-6 text-stone-800" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence initial={false}>
        {mobileMenuOpen && (
          <motion.div
            key="drawer"
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="xl:hidden overflow-hidden border-t border-stone-200 bg-white shadow-lg"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              <nav className="grid grid-cols-2 gap-1.5" aria-label="Mobile">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.href);
                  return (
                    <motion.div key={link.href} variants={drawerItem}>
                      <Link
                        href={link.href}
                        aria-current={active ? 'page' : undefined}
                        className={`px-3 py-2 rounded-lg font-medium text-xs transition-colors flex items-center gap-2 ${
                          active
                            ? 'bg-emerald-50 text-emerald-900 font-bold'
                            : 'text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        <Icon
                          className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-emerald-800' : 'text-stone-500'}`}
                        />
                        <span>{lang === 'bn' ? link.labelBn : link.labelEn}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div variants={drawerItem} className="pt-3 border-t border-stone-100 flex flex-col gap-2">
                <Link
                  href="/dashboard"
                  className="w-full py-2 rounded-full border border-[#0D5C35] bg-emerald-50 text-[#0D5C35] font-bold text-xs flex items-center justify-center gap-1.5 text-center"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-[#0D5C35]" />
                  <span>{lang === 'bn' ? 'ড্যাশবোর্ড প্রবেশ' : 'Go to Dashboard'}</span>
                </Link>

                <div className="flex gap-2">
                  <Link
                    href="/donate"
                    className="flex-1 py-2 rounded-full bg-[#E53935] hover:bg-[#D32F2F] text-white font-semibold text-xs shadow-md flex items-center justify-center gap-1.5 text-center active:scale-[0.97] transition"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white text-white" />
                    <span>{lang === 'bn' ? 'অনুদানের জন্য' : 'Donate Now'}</span>
                  </Link>
                  <Link
                    href="/volunteer"
                    className="flex-1 py-2 rounded-full border border-[#0D5C35] text-[#0D5C35] hover:bg-emerald-50 font-semibold text-xs flex items-center justify-center gap-1.5 text-center active:scale-[0.97] transition"
                  >
                    <Users className="w-3.5 h-3.5 text-[#0D5C35]" />
                    <span>{lang === 'bn' ? 'স্বেচ্ছাসেবক' : 'Volunteer'}</span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reading-progress line */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute bottom-[-1px] left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-[#0D5C35] to-[#E53935]"
      />
    </motion.header>
    </div>
  );
}