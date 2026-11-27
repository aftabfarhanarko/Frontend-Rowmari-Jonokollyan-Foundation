'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  motion,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Heart,
  ChevronRight,
  ChevronUp,
  ExternalLink,
  Lock,
  Users,
  BadgeCheck,
} from 'lucide-react';
import { Language } from '@/types';
import { FOUNDATION_INFO } from '@/data/mockData';
import { useGetFooterConfigQuery } from '@/store/api/contentApi';

interface FooterProps {
  lang: Language;
  onOpenDonation?: () => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------- Free inline brand icons (no extra package) ---------- */
function FacebookIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971h-1.514c-1.491 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

function YoutubeIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function LinkedinIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
    </svg>
  );
}

/* ---------- Data ---------- */
const quickLinks = [
  { href: '/', bn: 'হোম', en: 'Home' },
  { href: '/about', bn: 'আমাদের কথা', en: 'About Us' },
  { href: '/team', bn: 'টিম ও কমিটি', en: 'Our Team' },
  { href: '/activities', bn: 'কার্যক্রম', en: 'Activities' },
  { href: '/campaigns', bn: 'ক্যাম্পেইন', en: 'Campaigns' },
  { href: '/gallery', bn: 'গ্যালারি', en: 'Gallery' },
  { href: '/news', bn: 'সংবাদ ও বিজ্ঞপ্তি', en: 'News & Press' },
  { href: '/contact', bn: 'যোগাযোগ', en: 'Contact Us' },
];

/* ---------- Motion variants ---------- */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const listContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const listItem: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
};

/* ---------- Soft people-silhouette backdrop (pure SVG, no image file) ---------- */
type Kind = 'man' | 'woman' | 'child' | 'elder';

const SHAPES: Record<Kind, { head: [number, number]; body: string }> = {
  man: {
    head: [-172, 16],
    body:
      'M-24,-150 C-24,-156 -18,-158 -10,-158 L10,-158 C18,-158 24,-156 24,-150 L29,-84 C29,-79 23,-79 22,-84 L19,-122 L19,-84 L17,0 L3,0 L0,-76 L-3,0 L-17,0 L-19,-84 L-19,-122 L-22,-84 C-23,-79 -29,-79 -29,-84 Z',
  },
  woman: {
    head: [-174, 15],
    body:
      'M-18,-152 C-18,-158 -12,-160 -7,-160 L7,-160 C12,-160 18,-158 18,-152 L20,-112 C24,-82 36,-40 42,0 L-42,0 C-36,-40 -24,-82 -20,-112 Z',
  },
  child: {
    head: [-96, 14],
    body:
      'M-16,-76 C-16,-81 -10,-83 -6,-83 L6,-83 C10,-83 16,-81 16,-76 L18,-42 L10,-42 L9,0 L2,0 L0,-36 L-2,0 L-9,0 L-10,-42 L-18,-42 Z',
  },
  elder: {
    head: [-166, 15],
    body:
      'M-22,-146 C-22,-152 -16,-154 -9,-154 L9,-154 C16,-154 22,-152 22,-146 L27,-82 C27,-77 21,-77 20,-82 L17,-118 L17,-82 L15,0 L3,0 L0,-72 L-3,0 L-15,0 L-17,-82 L-17,-118 L-20,-82 C-21,-77 -27,-77 -27,-82 Z M34,-96 L38,-96 L38,0 L34,0 Z',
  },
};

// x position, kind, scale
const FRONT: [number, Kind, number][] = [
  [70, 'woman', 1.45],
  [150, 'child', 1.05],
  [235, 'man', 1.55],
  [330, 'elder', 1.4],
  [420, 'woman', 1.5],
  [500, 'child', 0.95],
  [585, 'man', 1.5],
  [680, 'woman', 1.6],
  [765, 'child', 1.05],
  [850, 'man', 1.55],
  [945, 'elder', 1.4],
  [1030, 'woman', 1.5],
  [1110, 'child', 1.0],
  [1195, 'man', 1.55],
  [1285, 'woman', 1.45],
  [1355, 'child', 1.0],
];

const BACK: [number, Kind, number][] = [
  [30, 'man', 1.2],
  [195, 'woman', 1.15],
  [375, 'man', 1.25],
  [545, 'woman', 1.2],
  [720, 'man', 1.15],
  [895, 'woman', 1.25],
  [990, 'child', 0.9],
  [1070, 'man', 1.2],
  [1245, 'woman', 1.15],
  [1395, 'man', 1.2],
];

function Silhouette({ kind }: { kind: Kind }) {
  const sh = SHAPES[kind];
  return (
    <g>
      <circle cx="0" cy={sh.head[0]} r={sh.head[1]} />
      <path d={sh.body} />
    </g>
  );
}

function PeopleBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[170px] sm:h-[320px] lg:h-[400px] select-none"
      style={{
        WebkitMaskImage:
          'linear-gradient(to top, #000 0%, #000 35%, transparent 100%)',
        maskImage:
          'linear-gradient(to top, #000 0%, #000 35%, transparent 100%)',
      }}
    >
      <svg
        viewBox="0 0 1400 330"
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="ppl-front" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#E53935" stopOpacity="0.20" />
            <stop offset="1" stopColor="#B91C1C" stopOpacity="0.38" />
          </linearGradient>
          <linearGradient id="ppl-back" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#E53935" stopOpacity="0.08" />
            <stop offset="1" stopColor="#D62828" stopOpacity="0.16" />
          </linearGradient>
          <filter id="ppl-soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.2" />
          </filter>
          <filter id="ppl-ground" x="-50%" y="-200%" width="200%" height="500%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        {/* far row: blurred, lighter, gives depth */}
        <g fill="url(#ppl-back)" filter="url(#ppl-soft)">
          {BACK.map(([x, kind, sc], i) => (
            <g key={`b${i}`} transform={`translate(${x} 330) scale(${sc})`}>
              <Silhouette kind={kind} />
            </g>
          ))}
        </g>

        {/* soft ground shadows under the front row */}
        <g fill="#7F1D1D" opacity="0.22" filter="url(#ppl-ground)">
          {FRONT.map(([x, , sc], i) => (
            <ellipse key={`g${i}`} cx={x + 14} cy={328} rx={34 * sc} ry={5} />
          ))}
        </g>

        {/* front row */}
        <g fill="url(#ppl-front)">
          {FRONT.map(([x, kind, sc], i) => (
            <g key={`f${i}`} transform={`translate(${x} 330) scale(${sc})`}>
              <Silhouette kind={kind} />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

export default function Footer({
  lang,
  onOpenDonation,
}: FooterProps) {
  const isBn = lang === 'bn';
  const reduceMotion = useReducedMotion();
  const { data: footerConfig } = useGetFooterConfigQuery();

  const activeAboutSummary = isBn
    ? (footerConfig?.aboutSummaryBn || 'কুড়িগ্রাম জেলার ভারত সীমান্তবর্তী ও নদীবেষ্টিত রৌমারীর দুর্গম চরাঞ্চলের অসহায়, শীতার্ত, দরিদ্র রোগী ও চিকিৎসাবঞ্চিত মানুষের সার্বক্ষণিক সেবায় একটি নিবন্ধিত ও নিরপেক্ষ মানবিক সংগঠন।')
    : (footerConfig?.aboutSummaryEn || 'A registered, non-political voluntary foundation dedicated to serving underprivileged families and remote river-island char communities in Rowmari and Kurigram.');

  const activeRegistrationNo = isBn
    ? (footerConfig?.registrationNoBn || FOUNDATION_INFO.registrationNoBn)
    : (footerConfig?.registrationNoEn || FOUNDATION_INFO.registrationNoEn);

  const activeAddress = isBn
    ? (footerConfig?.addressBn || FOUNDATION_INFO.addressBn)
    : (footerConfig?.addressEn || FOUNDATION_INFO.addressEn);

  const activeHotline = footerConfig?.hotline || FOUNDATION_INFO.hotline;
  const activeEmail = footerConfig?.emailPrimary || FOUNDATION_INFO.email;
  const phoneHref = `tel:${activeHotline.replace(/[^\d+]/g, '')}`;

  const dynamicSocialLinks = useMemo(() => {
    const links = [
      {
        href: footerConfig?.facebookPageUrl || 'https://www.facebook.com/share/1ESs7zSjYo/',
        label: 'Facebook Page',
        Icon: FacebookIcon,
        color: 'text-[#1877F2]',
      },
      {
        href: footerConfig?.facebookGroupUrl || 'https://www.facebook.com/share/g/186KVkSwCg/',
        label: 'Facebook Group',
        Icon: FacebookIcon,
        color: 'text-[#1877F2]',
      },
      {
        href: footerConfig?.youtubeUrl || 'https://youtube.com',
        label: 'YouTube',
        Icon: YoutubeIcon,
        color: 'text-[#FF0000]',
      },
    ];
    if (footerConfig?.linkedinUrl) {
      links.push({
        href: footerConfig.linkedinUrl,
        label: 'LinkedIn',
        Icon: LinkedinIcon,
        color: 'text-[#0A66C2]',
      });
    }
    return links;
  }, [footerConfig]);

  const activeCopyright = isBn
    ? (footerConfig?.copyrightTextBn || `© 2026 ${FOUNDATION_INFO.nameBn}। সর্বস্বত্ব সংরক্ষিত।`)
    : (footerConfig?.copyrightTextEn || `© 2026 ${FOUNDATION_INFO.nameEn}. All rights reserved.`);

  // When the user prefers reduced motion, show everything immediately.
  const viewProps = reduceMotion
    ? { initial: 'show' as const, animate: 'show' as const }
    : {
      initial: 'hidden' as const,
      whileInView: 'show' as const,
      viewport: { once: true, margin: '-60px' },
    };

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });

  return (
    <footer className="relative z-30 w-full overflow-hidden bg-gradient-to-b from-white to-[#FAFAF9] text-stone-600 border-t border-stone-200">
      {/* Animated brand strip */}
      <motion.div
        aria-hidden
        initial={reduceMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: EASE }}
        className="h-1 w-full origin-left bg-gradient-to-r from-[#B91C1C] via-[#D62828] to-[#E53935]"
      />

      {/* Soft decorative glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-red-500/[0.06] blur-3xl" />
        <div className="absolute bottom-24 -left-24 w-72 h-72 rounded-full bg-red-500/[0.05] blur-3xl" />
      </div>

      {/* ============ CTA band ============ */}
      <div className="relative border-b border-stone-200 bg-white/80 backdrop-blur-sm">
        <motion.div
          variants={container}
          {...viewProps}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <motion.div variants={item} className="text-center md:text-left">
            <p className="text-lg sm:text-xl font-extrabold text-stone-900 leading-snug">
              {isBn ? 'আপনার সহায়তায় বদলে যেতে পারে একটি জীবন' : 'Your support can change a life'}
            </p>
            <p className="text-sm text-stone-500 mt-1">
              {isBn
                ? 'অনুদান দিন অথবা স্বেচ্ছাসেবক হিসেবে যুক্ত হোন।'
                : 'Donate, or join us as a volunteer.'}
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="grid grid-cols-2 sm:flex items-center gap-2.5 w-full md:w-auto shrink-0"
          >
            <motion.div whileHover={reduceMotion ? undefined : { y: -2 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/donate"
                className="w-full px-5 py-3 rounded-xl bg-[#D62828] hover:bg-[#B91C1C] text-white text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-md shadow-red-500/25"
              >
                <motion.span
                  animate={reduceMotion ? undefined : { scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </motion.span>
                <span>{isBn ? 'অনুদান দিন' : 'Donate Now'}</span>
              </Link>
            </motion.div>

            <motion.div whileHover={reduceMotion ? undefined : { y: -2 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/volunteer"
                className="w-full px-5 py-3 rounded-xl border border-[#D62828]/30 bg-white text-[#D62828] hover:bg-red-50 text-sm font-bold transition-colors flex items-center justify-center gap-2"
              >
                <Users className="w-4 h-4" />
                <span>{isBn ? 'স্বেচ্ছাসেবক হোন' : 'Volunteer'}</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* ============ Main columns ============ */}
      <div className="relative">
        <PeopleBackdrop />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7 sm:pt-9 pb-8 sm:pb-10">
          <motion.div
            variants={container}
            {...viewProps}
            className="grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-7 lg:gap-8"
          >
            {/* Brand (full width on mobile) */}
            <motion.div variants={item} className="col-span-2 lg:col-span-5 space-y-5">
              <div className="flex items-center gap-3.5">
                <motion.div
                  whileHover={reduceMotion ? undefined : { rotate: 8, scale: 1.06 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  className="w-14 h-14 rounded-full overflow-hidden bg-white p-1 shrink-0 shadow-sm border border-stone-200 ring-2 ring-red-500/10 flex items-center justify-center"
                >
                  <Image
                    src="/logo.png"
                    alt="রৌমারী জনকল্যাণ ফাউন্ডেশন লোগো"
                    width={56}
                    height={56}
                    className="object-contain"
                  />
                </motion.div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#D62828] leading-tight">
                      {isBn ? FOUNDATION_INFO.nameBn : FOUNDATION_INFO.nameEn}
                    </h3>
                    <BadgeCheck className="w-4 h-4 text-[#D62828] shrink-0" />
                  </div>
                  <p className="text-xs sm:text-sm text-stone-500 font-medium mt-0.5">
                    {isBn ? FOUNDATION_INFO.establishedBn : FOUNDATION_INFO.establishedEn} •{' '}
                    {isBn ? FOUNDATION_INFO.yearsActiveBn : FOUNDATION_INFO.yearsActiveEn}
                  </p>
                </div>
              </div>

              <p className="text-sm text-stone-600 leading-relaxed max-w-md">
                {activeAboutSummary}
              </p>

              {/* Registration */}
              <div className="rounded-xl bg-white border border-stone-200 border-l-4 border-l-[#D62828] p-3.5 text-xs space-y-1 shadow-xs max-w-md">
                <div className="flex items-center gap-1.5 text-[#D62828] font-bold">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>{isBn ? 'স্বীকৃত ও অনুমোদিত সমাজসেবা ট্রাস্ট' : 'Verified & Registered Charity Trust'}</span>
                </div>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  {activeRegistrationNo}
                </p>
              </div>

              {/* Social */}
              <div>
                <p className="text-xs font-semibold text-stone-500 mb-2">
                  {isBn ? 'আমাদের সাথে যুক্ত থাকুন' : 'Stay connected'}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {dynamicSocialLinks.map((s) => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      whileHover={reduceMotion ? undefined : { y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 rounded-full bg-white border border-stone-200 hover:border-[#D62828]/40 hover:shadow-md hover:shadow-red-500/10 text-xs font-semibold text-stone-700 hover:text-[#D62828] transition-colors flex items-center gap-2"
                    >
                      <s.Icon className={`w-4 h-4 shrink-0 ${s.color}`} />
                      <span>{s.label}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick links (half width on mobile) */}
            <motion.div variants={item} className="col-span-2 sm:col-span-1 lg:col-span-3 space-y-4">
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-[#D62828]" />
                {isBn ? 'মূল পাতাগুলো' : 'Quick Links'}
              </h4>
              <motion.ul
                variants={listContainer}
                className="grid grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-2.5 text-sm"
              >
                {quickLinks.map((l) => (
                  <motion.li key={l.href} variants={listItem}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center gap-1 text-stone-600 hover:text-[#D62828] transition-colors"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-[#D62828] group-hover:translate-x-0.5 transition" />
                      <span>{isBn ? l.bn : l.en}</span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Contact */}
            <motion.div variants={item} className="col-span-2 sm:col-span-1 lg:col-span-4 space-y-4">
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-[#D62828]" />
                {isBn ? 'কেন্দ্রীয় কার্যালয় ও যোগাযোগ' : 'Headquarters & Contact'}
              </h4>

              <motion.ul variants={listContainer} className="space-y-3.5 text-sm">
                <motion.li variants={listItem} className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-xl bg-red-50 text-[#D62828] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <span className="leading-relaxed pt-1.5">
                    {activeAddress}
                  </span>
                </motion.li>

                <motion.li variants={listItem}>
                  <a href={phoneHref} className="group flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-red-50 text-[#D62828] flex items-center justify-center shrink-0 group-hover:bg-[#D62828] group-hover:text-white transition-colors">
                      <Phone className="w-4 h-4" />
                    </span>
                    <span className="leading-tight">
                      <span className="block text-[11px] text-stone-400">
                        {isBn ? 'হটলাইন (২৪/৭)' : 'Hotline (24/7)'}
                      </span>
                      <span className="font-semibold text-stone-800 group-hover:text-[#D62828] transition-colors">
                        {activeHotline}
                      </span>
                    </span>
                  </a>
                </motion.li>

                <motion.li variants={listItem}>
                  <a href={`mailto:${activeEmail}`} className="group flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-red-50 text-[#D62828] flex items-center justify-center shrink-0 group-hover:bg-[#D62828] group-hover:text-white transition-colors">
                      <Mail className="w-4 h-4" />
                    </span>
                    <span className="leading-tight min-w-0">
                      <span className="block text-[11px] text-stone-400">
                        {isBn ? 'ইমেইল' : 'Email'}
                      </span>
                      <span className="font-semibold text-stone-800 group-hover:text-[#D62828] transition-colors break-all">
                        {activeEmail}
                      </span>
                    </span>
                  </a>
                </motion.li>
              </motion.ul>

              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-stone-200 bg-white hover:border-[#D62828]/40 hover:text-[#D62828] text-stone-600 text-xs font-semibold transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{isBn ? 'অ্যাডমিন ড্যাশবোর্ড' : 'Admin Dashboard'}</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

      </div>

      {/* ============ Red bottom bar ============ */}
      <div className="relative bg-gradient-to-r from-[#B91C1C] via-[#D62828] to-[#B91C1C] text-white/90">
        <motion.div
          variants={container}
          {...viewProps}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3.5 pb-16 sm:pt-5 sm:pb-5 flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-3 text-xs"
        >
          <motion.p variants={item} className="text-center md:text-left">
            {activeCopyright}
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5"
          >
            <Link href="/privacy" className="hover:text-white hover:underline underline-offset-4 transition">
              {isBn ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
            </Link>
            <Link href="/terms" className="hover:text-white hover:underline underline-offset-4 transition">
              {isBn ? 'ব্যবহারের শর্তাবলী' : 'Terms of Use'}
            </Link>
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-white/75">Developed by</span>
              <a
                href="https://www.aftabfarhan.tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-white hover:underline underline-offset-4 flex items-center gap-1"
              >
                <span>Aftab Farhan ARKO</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>
            </div>

            <motion.button
              type="button"
              onClick={scrollTop}
              aria-label={isBn ? 'উপরে যান' : 'Back to top'}
              whileHover={reduceMotion ? undefined : { y: -3 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 flex items-center justify-center cursor-pointer transition-colors"
            >
              <ChevronUp className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}