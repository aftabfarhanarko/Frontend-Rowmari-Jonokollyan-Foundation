'use client';

import React, { useEffect, useRef, useState } from 'react';
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
  HandHeart,
  Image as ImageIcon,
  Newspaper,
  Phone,
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  LogIn,
  UserPlus,
  LogOut,
  User,
  MapPin,
  Smartphone,
} from 'lucide-react';
import { Language, UserRole } from '@/types';
import TopAnnouncement from '@/components/TopAnnouncement';
import { useAppStore } from '@/store/useAppStore';
import { useLogoutMutation, useGetCurrentUserQuery } from '@/store/api/authApi';
import { toast } from 'sonner';
import PwaInstallButton from '@/components/pwa/PwaInstallButton';
import { usePwa } from '@/context/PwaContext';

interface NavbarProps {
  lang: Language;
  onToggleLang?: () => void;
  onOpenDonation?: () => void;
}

const navLinks = [
  { href: '/', labelBn: 'হোম', labelEn: 'Home', icon: Home },
  { href: '/roumari', labelBn: 'আমাদের রৌমারী', labelEn: 'Our Roumari', icon: MapPin },
  { href: '/about', labelBn: 'আমাদের কথা', labelEn: 'About Us', icon: Info },
  { href: '/team', labelBn: 'টিম ও কমিটি', labelEn: 'Our Team', icon: Users },
  { href: '/activities', labelBn: 'কার্যক্রম', labelEn: 'Activities', icon: Activity },
  { href: '/campaigns', labelBn: 'ক্যাম্পেইন', labelEn: 'Campaigns', icon: Target },
  { href: '/volunteer', labelBn: 'স্বেচ্ছাসেবক', labelEn: 'Volunteer', icon: Users },
  { href: '/gallery', labelBn: 'গ্যালারি', labelEn: 'Gallery', icon: ImageIcon },
  { href: '/news', labelBn: 'সংবাদ ও ইভেন্ট', labelEn: 'News', icon: Newspaper },
  { href: '/contact', labelBn: 'যোগাযোগ', labelEn: 'Contact', icon: Phone },
  { href: '/dashboard', labelBn: 'ড্যাশবোর্ড', labelEn: 'Dashboard', icon: LayoutDashboard },
];

// 1. Core important links directly visible on Desktop & Laptop
const primaryDesktopLinks = [
  { href: '/', labelBn: 'হোম', labelEn: 'Home', icon: Home },
  { href: '/roumari', labelBn: 'আমাদের রৌমারী', labelEn: 'Our Roumari', icon: MapPin },
  { href: '/campaigns', labelBn: 'ক্যাম্পেইন', labelEn: 'Campaigns', icon: Target },
  { href: '/activities', labelBn: 'কার্যক্রম', labelEn: 'Activities', icon: Activity },
  { href: '/volunteer', labelBn: 'স্বেচ্ছাসেবক', labelEn: 'Volunteer', icon: Users },
];

// 2. Secondary links placed in "আরও" (More) dropdown on desktop
const secondaryDesktopLinks = [
  { href: '/about', labelBn: 'আমাদের কথা', labelEn: 'About Us', icon: Info },
  { href: '/team', labelBn: 'টিম ও কমিটি', labelEn: 'Our Team', icon: Users },
  { href: '/gallery', labelBn: 'গ্যালারি', labelEn: 'Gallery', icon: ImageIcon },
  { href: '/news', labelBn: 'সংবাদ ও ইভেন্ট', labelEn: 'News', icon: Newspaper },
  { href: '/contact', labelBn: 'যোগাযোগ', labelEn: 'Contact', icon: Phone },
];

const EASE = [0.22, 1, 0.36, 1] as const;

// Mobile Side Navigation links (with icons for the premium drawer)
const mobileDrawerLinks = [
  { href: '/', labelBn: 'হোম', labelEn: 'Home', icon: Home },
  { href: '/roumari', labelBn: 'আমাদের রৌমারী', labelEn: 'Our Roumari', icon: MapPin },
  { href: '/about', labelBn: 'আমাদের সম্পর্কে', labelEn: 'About Us', icon: Info },
  { href: '/team', labelBn: 'কমিটি ও নেতৃত্ব', labelEn: 'Committee & Leadership', icon: Users },
  { href: '/activities', labelBn: 'কার্যক্রমসমূহ', labelEn: 'Activities', icon: Activity },
  { href: '/campaigns', labelBn: 'ক্যাম্পেইন', labelEn: 'Campaigns', icon: Target },
  { href: '/volunteer', labelBn: 'স্বেচ্ছাসেবক হোন', labelEn: 'Join as Volunteer', icon: HandHeart },
  { href: '/gallery', labelBn: 'গ্যালারি', labelEn: 'Gallery', icon: ImageIcon },
  { href: '/news', labelBn: 'সংবাদ ও নোটিশ', labelEn: 'News & Notices', icon: Newspaper },
  { href: '/contact', labelBn: 'যোগাযোগ', labelEn: 'Contact', icon: Phone },
];

// Drawer list: gentle staggered reveal when the drawer opens
const drawerListVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035, delayChildren: 0.12 } },
};

const drawerItemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.28, ease: EASE } },
};

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
      toast.info(lang === 'bn' ? 'লগআউট সম্পন্ন হয়েছে' : 'Logged out successfully');
      router.push('/login');
    }
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { isInstallable, isInstalled, promptInstall } = usePwa();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!userMenuOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setUserMenuOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [userMenuOpen]);
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

  // Close drawer with the Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
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
          className={`relative border-b transition-[background-color,box-shadow,border-color] duration-300 ${scrolled
              ? 'bg-white/80 backdrop-blur-xl border-stone-200/80 shadow-[0_8px_30px_-12px_rgba(214,40,40,0.18)]'
              : 'bg-white/95 backdrop-blur-md border-stone-200 shadow-xs'
            }`}
        >
          {/* Wider container on large screens so nothing gets squeezed */}
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              animate={{ height: scrolled ? 64 : 76 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="flex items-center justify-between gap-4"
            >
              {/* ============ Zone 1: Brand ============ */}
              <Link href="/" className="flex items-center gap-3 group shrink-0">
                <motion.div
                  whileHover={reduceMotion ? undefined : { rotate: 8, scale: 1.06 }}
                  animate={{ width: scrolled ? 40 : 48, height: scrolled ? 40 : 48 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative rounded-full overflow-hidden shrink-0 border border-stone-200 shadow-xs bg-white flex items-center justify-center ring-2 ring-transparent group-hover:ring-[#D62828]/20 transition-shadow"
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
                <div className="min-w-0">
                  <span className="text-sm sm:text-base xl:text-lg 2xl:text-xl font-bold text-[#E53935] group-hover:text-[#D32F2F] transition-colors duration-300 leading-tight block whitespace-nowrap">
                    {lang === 'bn' ? 'রৌমারী জনকল্যাণ ফাউন্ডেশন' : 'Rowmari Janakalyan Foundation'}
                  </span>
                  <AnimatePresence initial={false}>
                    {!scrolled && (
                      <motion.span
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="hidden 2xl:block text-[11px] text-stone-500 leading-tight overflow-hidden whitespace-nowrap"
                      >
                        {lang === 'bn' ? 'স্থাপিত ২০১৮ • রৌমারী, কুড়িগ্রাম' : 'Est. 2018 • Rowmari, Kurigram'}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </Link>

              {/* ============ Zone 2: Navigation (centered, never wraps) ============ */}
              <nav
                className="hidden lg:flex flex-1 min-w-0 items-center justify-center gap-0.5 xl:gap-1"
                aria-label="Main"
              >
                {primaryDesktopLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.href);
                  const visibilityCls = link.href === '/volunteer' ? 'hidden 2xl:flex' : 'flex';
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={`relative whitespace-nowrap text-[13px] font-semibold py-2 px-2.5 xl:px-3 rounded-lg ${visibilityCls} items-center gap-1.5 transition-colors duration-200 ${active ? 'text-[#D62828] font-bold' : 'text-stone-600 hover:text-[#D62828] hover:bg-stone-50'
                        }`}
                    >
                      {/* Single pill that slides between the active links */}
                      {active && (
                        <motion.span
                          layoutId="nav-active-pill"
                          className="absolute inset-0 rounded-lg bg-red-50 border border-red-100"
                          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        />
                      )}
                      {/* Icons only on very wide screens to save space on laptops */}
                      <Icon className="relative w-3.5 h-3.5 shrink-0 hidden 2xl:block" />
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
                    className={`relative whitespace-nowrap text-[13px] font-semibold py-2 px-3 rounded-lg flex items-center gap-1 transition-colors duration-200 cursor-pointer ${isSecondaryActive
                        ? 'text-[#D62828] font-bold bg-red-50 border border-red-100'
                        : 'text-stone-600 hover:text-[#D62828] hover:bg-stone-50'
                      }`}
                    aria-expanded={moreMenuOpen}
                    aria-haspopup="menu"
                  >
                    <span>{lang === 'bn' ? 'আরও' : 'More'}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${moreMenuOpen ? 'rotate-180' : ''
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
                        className="absolute top-full right-0 pt-2 z-50"
                        role="menu"
                      >
                        <div className="w-52 bg-white rounded-xl shadow-xl shadow-stone-900/10 border border-stone-200/90 py-1.5 overflow-hidden">
                          {/* Volunteer link moves into More on laptops (< 2xl) */}
                          <Link
                            href="/volunteer"
                            role="menuitem"
                            onClick={() => setMoreMenuOpen(false)}
                            className={`2xl:hidden px-3.5 py-2.5 text-[13px] font-medium flex items-center gap-2.5 whitespace-nowrap transition-colors ${isActive('/volunteer')
                                ? 'bg-red-50 text-red-900 font-bold'
                                : 'text-stone-700 hover:bg-stone-50 hover:text-[#D62828]'
                              }`}
                          >
                            <Users className={`w-4 h-4 shrink-0 ${isActive('/volunteer') ? 'text-red-800' : 'text-stone-400'}`} />
                            <span>{lang === 'bn' ? 'স্বেচ্ছাসেবক' : 'Volunteer'}</span>
                          </Link>

                          {secondaryDesktopLinks.map((link) => {
                            const Icon = link.icon;
                            const active = isActive(link.href);
                            return (
                              <Link
                                key={link.href}
                                href={link.href}
                                role="menuitem"
                                onClick={() => setMoreMenuOpen(false)}
                                className={`px-3.5 py-2.5 text-[13px] font-medium flex items-center gap-2.5 whitespace-nowrap transition-colors ${active
                                    ? 'bg-red-50 text-red-900 font-bold'
                                    : 'text-stone-700 hover:bg-stone-50 hover:text-[#D62828]'
                                  }`}
                              >
                                <Icon
                                  className={`w-4 h-4 shrink-0 ${active ? 'text-red-800' : 'text-stone-400'
                                    }`}
                                />
                                <span>{lang === 'bn' ? link.labelBn : link.labelEn}</span>
                              </Link>
                            );
                          })}

                          {/* Register moves here on laptops (shown as a button only on 2xl) */}
                          {!isUserLoggedIn && pathname !== '/register' && (
                            <Link
                              href="/register"
                              role="menuitem"
                              onClick={() => setMoreMenuOpen(false)}
                              className="2xl:hidden mt-1 pt-2.5 pb-2.5 px-3.5 border-t border-stone-100 text-[13px] font-bold text-[#D62828] hover:bg-red-50 flex items-center gap-2.5 whitespace-nowrap transition-colors"
                            >
                              <UserPlus className="w-4 h-4 shrink-0" />
                              <span>{lang === 'bn' ? 'রেজিস্টার' : 'Register'}</span>
                            </Link>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </nav>

              {/* ============ Zone 3: Actions ============ */}
              <div className="hidden sm:flex items-center gap-2 shrink-0">
                {/* Donation CTA: shown on tablet only, hidden on laptop & desktop */}
                <Link
                  href="/donate"
                  className="flex lg:hidden whitespace-nowrap px-4 py-2 rounded-xl bg-[#D62828] hover:bg-[#B91C1C] text-white text-[13px] font-bold transition items-center gap-1.5 shadow-sm shadow-red-500/20 active:scale-95"
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>{lang === 'bn' ? 'অনুদান দিন' : 'Donate Now'}</span>
                </Link>

                {isUserLoggedIn ? (
                  <div ref={userMenuRef} className="relative flex items-center">
                    <button
                      type="button"
                      onClick={() => setUserMenuOpen((prev) => !prev)}
                      aria-expanded={userMenuOpen}
                      aria-haspopup="menu"
                      title={currentUser?.fullName || (lang === 'bn' ? 'অ্যাকাউন্ট মেনু' : 'Account Menu')}
                      className="flex items-center gap-1.5 rounded-full p-1 pr-2 border border-stone-200 bg-white hover:border-[#D62828]/40 hover:bg-red-50/40 transition cursor-pointer shadow-2xs"
                    >
                      <div className="flex w-8 h-8 select-none items-center justify-center rounded-full bg-linear-to-br from-[#D62828] to-red-600 text-xs font-bold text-white overflow-hidden">
                        {currentUser?.avatarUrl ? (
                          <img src={currentUser.avatarUrl} alt={currentUser.fullName || 'User'} className="w-full h-full object-cover" />
                        ) : currentUser?.fullName ? (
                          currentUser.fullName[0]
                        ) : (
                          currentRole === 'SUPER_ADMIN' ? 'অ' : 'স'
                        )}
                      </div>
                      <ChevronDown className={`w-3.5 h-3.5 text-stone-500 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {userMenuOpen && (
                      <div
                        role="menu"
                        className="absolute right-0 top-full mt-2 w-60 rounded-2xl border border-stone-200 bg-white p-1.5 shadow-xl z-50"
                      >
                        <div className="px-3 py-2.5 border-b border-stone-100">
                          <div className="text-sm font-bold text-stone-900 truncate">
                            {currentUser?.fullName || (currentRole === 'SUPER_ADMIN' ? (lang === 'bn' ? 'সুপার অ্যাডমিন' : 'Super Admin') : (lang === 'bn' ? 'সদস্য' : 'Member'))}
                          </div>
                          <div className="text-xs font-medium text-[#D62828] mt-0.5">
                            {currentRole === 'SUPER_ADMIN'
                              ? (lang === 'bn' ? 'অ্যাডমিন পোর্টাল' : 'Admin Portal')
                              : (lang === 'bn' ? 'সদস্য পোর্টাল' : 'Member Portal')}
                          </div>
                        </div>

                        <div className="py-1 space-y-0.5">
                          <Link
                            href="/dashboard"
                            onClick={() => setUserMenuOpen(false)}
                            role="menuitem"
                            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold text-stone-800 hover:bg-red-50 hover:text-[#D62828] transition-colors"
                          >
                            <LayoutDashboard className="w-4 h-4 text-[#D62828]" />
                            <span>
                              {currentRole === 'SUPER_ADMIN'
                                ? (lang === 'bn' ? 'অ্যাডমিন ড্যাশবোর্ড' : 'Admin Dashboard')
                                : (lang === 'bn' ? 'আমার ড্যাশবোর্ড' : 'My Dashboard')}
                            </span>
                          </Link>

                          {onToggleLang && (
                            <button
                              type="button"
                              role="menuitem"
                              onClick={() => {
                                onToggleLang();
                                setUserMenuOpen(false);
                              }}
                              className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer text-left"
                            >
                              <span className="flex items-center gap-2.5">
                                <Globe className="w-4 h-4 text-stone-500" />
                                <span>{lang === 'bn' ? 'ভাষা পরিবর্তন' : 'Language'}</span>
                              </span>
                              <span className="px-2 py-0.5 rounded-md bg-stone-100 text-xs font-bold text-stone-800">
                                {lang === 'bn' ? 'EN' : 'বাংলা'}
                              </span>
                            </button>
                          )}
                        </div>

                        <div className="border-t border-stone-100 pt-1">
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => {
                              setUserMenuOpen(false);
                              handleLogout();
                            }}
                            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-left"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>{lang === 'bn' ? 'লগআউট' : 'Logout'}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5">
                    {pathname !== '/login' && (
                      <Link
                        href="/login"
                        className="whitespace-nowrap px-3 py-2 rounded-lg text-stone-700 hover:text-[#D62828] hover:bg-red-50 text-[13px] font-bold transition flex items-center gap-1.5"
                      >
                        <LogIn className="w-3.5 h-3.5 text-[#D62828]" />
                        <span>{lang === 'bn' ? 'লগইন' : 'Login'}</span>
                      </Link>
                    )}
                    {/* Register button: only on very wide screens, otherwise inside "More" */}
                    {pathname !== '/register' && (
                      <Link
                        href="/register"
                        className="hidden 2xl:flex whitespace-nowrap px-3 py-2 rounded-lg border border-[#D62828]/30 text-[#D62828] hover:bg-[#D62828] hover:text-white text-[13px] font-bold transition items-center gap-1.5"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>{lang === 'bn' ? 'রেজিস্টার' : 'Register'}</span>
                      </Link>
                    )}
                  </div>
                )}

                {!isUserLoggedIn && onToggleLang && (
                  <motion.button
                    onClick={onToggleLang}
                    whileTap={{ scale: 0.95 }}
                    className="hidden xl:flex whitespace-nowrap px-2.5 py-2 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-50 text-[13px] font-semibold transition-colors items-center gap-1.5 cursor-pointer"
                    title={lang === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
                    aria-label="Change Language"
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
                        {lang === 'bn' ? 'EN' : 'বাংলা'}
                      </motion.span>
                    </AnimatePresence>
                  </motion.button>
                )}

                <div className="hidden 2xl:flex">
                  <PwaInstallButton variant="navbar" lang={lang} />
                </div>
              </div>

              {/* Mobile controls */}
              <div className="flex lg:hidden items-center gap-2">
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
            className="absolute bottom-[-1px] left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-[#D62828] to-[#E53935]"
          />
        </motion.header>
      </div>

      {/* Mobile Side Navigation Drawer Portal (Rendered directly in document.body) */}
      {mounted && mobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] xl:hidden flex">
          {/* Backdrop Dimming Overlay */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-stone-950/50 cursor-pointer"
          />

          {/* Compact side panel */}
          <aside
            role="dialog"
            aria-modal="true"
            aria-label={lang === 'bn' ? 'নেভিগেশন মেনু' : 'Navigation menu'}
            className="relative z-10 w-[74vw] max-w-[272px] h-[100dvh] bg-gradient-to-b from-white via-white to-stone-50 rounded-r-[28px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] flex flex-col overflow-hidden"
          >
                {/* Brand accent strip */}
                <div className="h-1 w-full shrink-0 bg-gradient-to-r from-[#D62828] via-[#E53935] to-[#B91C1C]" />

                {/* Header: Logo + Organization Name + Close */}
                <div className="px-4 pt-4 pb-3.5 flex items-start gap-2.5 shrink-0">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 min-w-0 flex-1"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-white p-0.5 shrink-0 border border-stone-200 shadow-sm ring-2 ring-red-500/10 flex items-center justify-center">
                      <Image
                        src="/logo.png"
                        alt="রৌমারী জনকল্যাণ ফাউন্ডেশন"
                        width={38}
                        height={38}
                        className="w-full h-full object-contain"
                        priority
                      />
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-extrabold text-stone-900 text-[13px] leading-snug">
                        {lang === 'bn' ? 'রৌমারী জনকল্যাণ ফাউন্ডেশন' : 'Rowmari Janakalyan Foundation'}
                      </h2>
                      <p className="text-[10.5px] text-[#D62828] font-semibold mt-0.5 leading-tight">
                        {lang === 'bn' ? 'উম্মাহর স্বার্থে মানবতার সাথে' : 'Dedicated to Humanity'}
                      </p>
                    </div>
                  </Link>

                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                    className="p-1.5 -mr-1 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer shrink-0"
                  >
                    <X className="w-[18px] h-[18px]" />
                  </button>
                </div>

                <div className="mx-4 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent shrink-0" />

                {/* Navigation Links */}
                <nav
                  aria-label="Mobile"
                  className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5 overscroll-contain"
                >
                  {mobileDrawerLinks.map((link) => {
                    const active = isActive(link.href);
                    const Icon = link.icon;
                    return (
                      <div key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          aria-current={active ? 'page' : undefined}
                          className={`group relative flex items-center gap-3 pl-3 pr-2.5 py-2 rounded-xl transition-colors duration-200 ${active
                              ? 'bg-gradient-to-r from-red-50 to-red-50/30'
                              : 'hover:bg-stone-100/80 active:bg-stone-100'
                            }`}
                        >
                          {/* Active indicator bar */}
                          {active && (
                            <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-[#D62828]" />
                          )}
                          <span
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${active
                                ? 'bg-[#D62828] text-white shadow-sm shadow-red-500/30'
                                : 'bg-stone-100 text-stone-500 group-hover:bg-white group-hover:text-[#D62828]'
                              }`}
                          >
                            <Icon className="w-4 h-4" />
                          </span>
                          <span
                            className={`flex-1 text-[14px] leading-snug ${active ? 'font-bold text-[#D62828]' : 'font-semibold text-stone-800'
                              }`}
                          >
                            {lang === 'bn' ? link.labelBn : link.labelEn}
                          </span>
                          <ChevronRight
                            className={`w-3.5 h-3.5 shrink-0 transition-all ${active
                                ? 'text-[#D62828]'
                                : 'text-stone-300 group-hover:text-stone-500 group-hover:translate-x-0.5'
                              }`}
                          />
                        </Link>
                      </div>
                    );
                  })}
                </nav>

                {/* Footer: Donate, Language + Install, Account + Logout */}
                <div className="px-3.5 pt-2.5 pb-3.5 border-t border-stone-200/80 bg-white space-y-2 shrink-0 pb-[max(0.875rem,env(safe-area-inset-bottom))]">
                  {/* Row 1: Primary Donate CTA */}
                  <Link
                    href="/donate"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-br from-[#E53935] to-[#C62020] text-white text-[13px] font-bold flex items-center justify-center gap-2 shadow-sm shadow-red-500/20 active:scale-[0.98] transition"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                    <span>{lang === 'bn' ? 'অনুদান দিন' : 'Donate Now'}</span>
                  </Link>

                  {/* Row 2: Compact Language + Install App side-by-side */}
                  {(onToggleLang || (isInstallable && !isInstalled)) && (
                    <div className={`grid gap-2 ${onToggleLang && isInstallable && !isInstalled ? 'grid-cols-2' : 'grid-cols-1'}`}>
                      {onToggleLang && (
                        <div className="grid grid-cols-2 p-0.5 rounded-xl bg-stone-100 border border-stone-200/80">
                          <button
                            type="button"
                            onClick={() => { if (lang !== 'bn') onToggleLang(); }}
                            className={`py-1.5 rounded-[10px] text-xs font-bold text-center cursor-pointer transition-colors ${lang === 'bn' ? 'bg-white text-[#D62828] shadow-xs' : 'text-stone-500 hover:text-stone-800'}`}
                          >
                            বাংলা
                          </button>
                          <button
                            type="button"
                            onClick={() => { if (lang !== 'en') onToggleLang(); }}
                            className={`py-1.5 rounded-[10px] text-xs font-bold text-center cursor-pointer transition-colors ${lang === 'en' ? 'bg-white text-[#D62828] shadow-xs' : 'text-stone-500 hover:text-stone-800'}`}
                          >
                            EN
                          </button>
                        </div>
                      )}

                      {isInstallable && !isInstalled && (
                        <button
                          type="button"
                          onClick={promptInstall}
                          className="py-1.5 px-2.5 rounded-xl border border-[#D62828]/25 bg-red-50 hover:bg-red-100 text-[#D62828] font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-[0.98] cursor-pointer"
                        >
                          <Smartphone className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{lang === 'bn' ? 'অ্যাপ ইনস্টল' : 'Install App'}</span>
                        </button>
                      )}
                    </div>
                  )}

                  {/* Row 3: Dashboard / Account + Logout */}
                  {isUserLoggedIn ? (
                    <div className="flex items-center gap-2">
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex-1 min-w-0 py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition active:scale-[0.98]"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-[#F3C474] shrink-0" />
                        <span className="truncate">
                          {currentRole === 'SUPER_ADMIN'
                            ? (lang === 'bn' ? 'অ্যাডমিন ড্যাশবোর্ড' : 'Admin Dashboard')
                            : (lang === 'bn' ? 'আমার ড্যাশবোর্ড' : 'My Dashboard')}
                        </span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          handleLogout();
                        }}
                        title={lang === 'bn' ? 'লগআউট' : 'Logout'}
                        aria-label={lang === 'bn' ? 'লগআউট' : 'Logout'}
                        className="py-2 px-2.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs flex items-center justify-center gap-1 transition active:scale-[0.98] cursor-pointer shrink-0"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>{lang === 'bn' ? 'লগআউট' : 'Logout'}</span>
                      </button>
                    </div>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-[13px] flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.98]"
                    >
                      <User className="w-4 h-4 text-[#F3C474]" />
                      <span>{lang === 'bn' ? 'লগইন / অ্যাকাউন্ট' : 'Login / Account'}</span>
                    </Link>
                  )}
                </div>
              </aside>
            </div>,
        document.body
      )}
    </>
  );
}