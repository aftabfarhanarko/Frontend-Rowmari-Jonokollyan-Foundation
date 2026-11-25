'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
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
  LogIn,
  UserPlus,
  LogOut,
  User,
} from 'lucide-react';
import { Language, UserRole } from '@/types';
import TopAnnouncement from '@/components/TopAnnouncement';
import { useAppStore } from '@/store/useAppStore';
import { useLogoutMutation, useGetCurrentUserQuery } from '@/store/api/authApi';
import { toast } from 'sonner';

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

// Mobile Side Navigation links matching the drawer design
const mobileDrawerLinks = [
  { href: '/', labelBn: 'হোম', labelEn: 'Home' },
  { href: '/about', labelBn: 'আমাদের সম্পর্কে', labelEn: 'About Us' },
  { href: '/activities', labelBn: 'কার্যক্রমসমূহ', labelEn: 'Activities' },
  { href: '/campaigns', labelBn: 'ক্যাম্পেইন', labelEn: 'Campaigns' },
  { href: '/blood-donation', labelBn: 'জরুরি রক্তদান', labelEn: 'Blood Donation' },
  { href: '/get-help', labelBn: 'সহায়তা আবেদন', labelEn: 'Request Aid' },
  { href: '/gallery', labelBn: 'গ্যালারি', labelEn: 'Gallery' },
  { href: '/volunteer', labelBn: 'আমাদের সাথে যুক্ত হোন', labelEn: 'Join Us' },
  { href: '/news', labelBn: 'সংবাদ ও নোটিশ', labelEn: 'News & Notices' },
  { href: '/contact', labelBn: 'যোগাযোগ', labelEn: 'Contact' },
];

export default function Navbar({ lang, onToggleLang, onOpenDonation }: NavbarProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const currentRole = useAppStore((state) => state.currentRole);
  const setCurrentRole = useAppStore((state) => state.setCurrentRole);
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const setIsAuthenticated = useAppStore((state) => state.setIsAuthenticated);
  const [hasSessionCookie, setHasSessionCookie] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const hasCookie = document.cookie.includes('rjf_session=1');
      setHasSessionCookie(hasCookie);
      if (hasCookie && !isAuthenticated) {
        setIsAuthenticated(true);
      }
    }
  }, [isAuthenticated, setIsAuthenticated]);

  const isUserLoggedIn = isAuthenticated || hasSessionCookie;

  const [logout] = useLogoutMutation();
  const { data: currentUser, isError: isUserError } = useGetCurrentUserQuery(undefined, { skip: !isUserLoggedIn });

  useEffect(() => {
    if (isUserError) {
      setIsAuthenticated(false);
      setHasSessionCookie(false);
      if (typeof document !== 'undefined') {
        document.cookie = 'rjf_session=; path=/; max-age=0; SameSite=Lax';
        document.cookie = 'rjf_auth_role=; path=/; max-age=0; SameSite=Lax';
      }
    }
  }, [isUserError, setIsAuthenticated]);

  useEffect(() => {
    if (currentUser?.roles && currentUser.roles.length > 0) {
      const isSuperAdmin = currentUser.roles.some((r: any) =>
        (typeof r === 'object' ? r?.name : r) === 'SUPER_ADMIN'
      );
      const roleName = isSuperAdmin ? 'SUPER_ADMIN' : 'COMMUNITY_MEMBER';
      if (roleName !== currentRole) {
        setCurrentRole(roleName as UserRole);
      }
    }
  }, [currentUser, currentRole, setCurrentRole]);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch {
      // ignore
    } finally {
      setIsAuthenticated(false);
      setHasSessionCookie(false);
      setCurrentRole('COMMUNITY_MEMBER');
      if (typeof document !== 'undefined') {
        document.cookie = 'rjf_session=; path=/; max-age=0; SameSite=Lax';
        document.cookie = 'rjf_auth_role=; path=/; max-age=0; SameSite=Lax';
      }
      toast.info(lang === 'bn' ? 'লগআউট সম্পন্ন হয়েছে' : 'Logged out successfully');
      router.push('/login');
    }
  };

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

  // Lock body scroll when mobile side drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  const isSecondaryActive = secondaryDesktopLinks.some((l) => isActive(l.href));

  return (
    <>
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
            {isUserLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="px-3 py-1.5 rounded-full border border-[#0D5C35] bg-emerald-50 text-[#0D5C35] hover:bg-[#0D5C35] hover:text-white text-xs font-bold transition flex items-center gap-1.5"
                  title={lang === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard'}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard'}</span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  title={lang === 'bn' ? 'লগআউট করুন' : 'Logout'}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                {pathname !== '/login' && (
                  <Link
                    href="/login"
                    className="px-3 py-1.5 rounded-lg text-stone-700 hover:text-[#0D5C35] hover:bg-emerald-50 text-xs font-bold transition flex items-center gap-1"
                  >
                    <LogIn className="w-3.5 h-3.5 text-[#0D5C35]" />
                    <span>{lang === 'bn' ? 'লগইন' : 'Login'}</span>
                  </Link>
                )}
                {pathname !== '/register' && (
                  <Link
                    href="/register"
                    className="px-3 py-1.5 rounded-lg border border-[#0D5C35]/30 text-[#0D5C35] hover:bg-[#0D5C35] hover:text-white text-xs font-bold transition flex items-center gap-1"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'রেজিস্টার' : 'Register'}</span>
                  </Link>
                )}
              </div>
            )}

            {onToggleLang && (
              <motion.button
                onClick={onToggleLang}
                whileTap={{ scale: 0.95 }}
                className="hidden lg:flex px-2.5 py-1.5 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold transition-colors items-center gap-1.5 cursor-pointer"
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
          </div>

          {/* Mobile controls */}
          <div className="flex xl:hidden items-center gap-2">
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

      {/* Reading-progress line */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute bottom-[-1px] left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-[#0D5C35] to-[#E53935]"
      />
    </motion.header>
    </div>

    {/* Mobile Side Navigation Drawer Portal (Rendered directly in document.body to slide from side full screen) */}
    {mounted && typeof document !== 'undefined' && createPortal(
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[9999] xl:hidden flex">
            {/* Backdrop Dimming Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />

            {/* Side Navigation Panel sliding from left */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="relative z-10 w-[85vw] max-w-[320px] bg-white h-[100dvh] shadow-2xl flex flex-col justify-between overflow-hidden"
            >
              {/* Header: Logo + Organization Name + Close Icon */}
              <div className="px-5 py-4 border-b border-stone-200/90 flex items-center justify-between bg-white shrink-0">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-white p-0.5 shrink-0 border border-emerald-500/30 shadow-xs flex items-center justify-center">
                    <Image
                      src="/logo.png"
                      alt="রৌমারী জনকল্যাণ ফাউন্ডেশন"
                      width={38}
                      height={38}
                      className="w-full h-full object-contain"
                      priority
                    />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-stone-900 text-sm leading-tight">
                      {lang === 'bn' ? 'রৌমারী জনকল্যাণ ফাউন্ডেশন' : 'Rowmari Janakalyan Foundation'}
                    </h2>
                    <p className="text-[11px] text-[#0D5C35] font-semibold mt-0.5">
                      {lang === 'bn' ? 'উম্মাহর স্বার্থে মানবতার সাথে' : 'Dedicated to Humanity'}
                    </p>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 text-stone-700" />
                </button>
              </div>

              {/* Navigation Links (Clean vertical list matching reference design) */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
                {mobileDrawerLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block text-[17px] font-bold transition-colors ${
                        active
                          ? 'text-[#0D5C35] underline decoration-2 underline-offset-4 decoration-[#0D5C35]'
                          : 'text-stone-900 hover:text-[#0D5C35]'
                      }`}
                    >
                      {lang === 'bn' ? link.labelBn : link.labelEn}
                    </Link>
                  );
                })}
              </div>

              {/* Footer: Segmented Language Switch & Account Button */}
              <div className="p-5 border-t border-stone-200/90 bg-white space-y-3 shrink-0">
                {/* Language Toggle (বাং | EN) */}
                {onToggleLang && (
                  <div className="grid grid-cols-2 p-1 rounded-xl bg-stone-100 border border-stone-200/80">
                    <button
                      type="button"
                      onClick={() => {
                        if (lang !== 'bn') onToggleLang();
                      }}
                      className={`py-2 rounded-lg text-sm font-bold transition-all text-center cursor-pointer ${
                        lang === 'bn'
                          ? 'bg-[#A3D9B1] text-[#0A4D2E] shadow-2xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      বাং
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (lang !== 'en') onToggleLang();
                      }}
                      className={`py-2 rounded-lg text-sm font-bold transition-all text-center cursor-pointer ${
                        lang === 'en'
                          ? 'bg-[#A3D9B1] text-[#0A4D2E] shadow-2xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      EN
                    </button>
                  </div>
                )}

                {/* Account Button (Warm Yellow Pill matching screenshot) */}
                <Link
                  href={isUserLoggedIn ? '/dashboard' : '/login'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 px-4 rounded-xl border border-[#F3C474] bg-[#FDE29A] hover:bg-[#FCD880] text-stone-900 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs transition active:scale-[0.99] text-center"
                >
                  <User className="w-5 h-5 text-stone-900" />
                  <span>
                    {isUserLoggedIn
                      ? (lang === 'bn' ? 'আমার ড্যাশবোর্ড' : 'My Dashboard')
                      : (lang === 'bn' ? 'আমার অ্যাকাউন্ট' : 'My Account')}
                  </span>
                </Link>

                {isUserLoggedIn && (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full py-1 text-center text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'লগআউট' : 'Logout'}</span>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </>
  );
}