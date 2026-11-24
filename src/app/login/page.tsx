'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  Sparkles,
  Heart,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import BackToTop from '@/components/BackToTop';
import AssistanceModal from '@/components/modals/AssistanceModal';
import DonationModal from '@/components/modals/DonationModal';
import { useLoginMutation } from '@/store/api/authApi';
import { useAppStore } from '@/store/useAppStore';
import { UserRole } from '@/types';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const lang = useAppStore((state) => state.lang);
  const toggleLang = useAppStore((state) => state.toggleLang);
  const setCurrentRole = useAppStore((state) => state.setCurrentRole);
  const setIsAuthenticated = useAppStore((state) => state.setIsAuthenticated);
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  React.useEffect(() => {
    if (isAuthenticated || (typeof document !== 'undefined' && document.cookie.includes('rjf_session=1'))) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, router]);
  const donationModalOpen = useAppStore((state) => state.donationModalOpen);
  const setDonationModalOpen = useAppStore((state) => state.setDonationModalOpen);
  const assistanceModalOpen = useAppStore((state) => state.assistanceModalOpen);
  const setAssistanceModalOpen = useAppStore((state) => state.setAssistanceModalOpen);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error(t('অনুগ্রহ করে ইমেইল ও পাসওয়ার্ড প্রদান করুন', 'Please enter email and password'));
      return;
    }

    try {
      const session = await login({ email: email.trim(), password }).unwrap();
      const userRoles = session.user.roles || [];
      const primaryRole = (
        typeof userRoles[0] === 'object' ? userRoles[0]?.name : userRoles[0]
      ) as UserRole;

      setCurrentRole(primaryRole || 'COMMUNITY_MEMBER');
      setIsAuthenticated(true);
      toast.success(
        t(
          `স্বাগতম, ${session.user.fullName}!`,
          `Welcome back, ${session.user.fullName}!`
        )
      );
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(
        err?.message ||
          t('লগইন ব্যর্থ হয়েছে। সঠিক ইমেইল ও পাসওয়ার্ড দিন।', 'Login failed. Please check credentials.')
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAFBF9] text-stone-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar
        lang={lang}
        onToggleLang={toggleLang}
        onOpenDonation={() => setDonationModalOpen(true)}
      />

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-9 shadow-xl border border-stone-200/90 relative overflow-hidden"
        >
          {/* Subtle Corner Gradient Glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-100/60 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-red-100/40 rounded-full blur-2xl pointer-events-none" />

          <div className="text-center space-y-2 mb-7 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#0D5C35] text-xs font-bold border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0D5C35]" />
              <span>{t('সুরক্ষিত লগইন পোর্টাল', 'Secure Login Portal')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              {t('অ্যাকাউন্টে প্রবেশ করুন', 'Sign In to RJF')}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500">
              {t(
                'রৌমারী জনকল্যাণ ফাউন্ডেশনের ড্যাশবোর্ড ও সেবাসমূহে প্রবেশ করুন',
                'Access your dashboard and foundation community services'
              )}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700">
                {t('ইমেইল ঠিকানা', 'Email Address')}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  autoComplete="email"
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D5C35] focus:border-transparent transition bg-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-700">
                  {t('পাসওয়ার্ড', 'Password')}
                </label>
                <span className="text-[11px] text-stone-400">
                  {t('ন্যূনতম ৮ অক্ষর', 'Min 8 chars')}
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D5C35] focus:border-transparent transition bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 rounded-xl bg-[#0D5C35] hover:bg-[#094527] text-white font-bold text-sm transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t('যাচাই করা হচ্ছে...', 'Signing in...')}</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>{t('লগইন করুন', 'Sign In')}</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200" />
            </div>
            <span className="relative bg-white px-3 text-xs text-stone-400 uppercase tracking-wider">
              {t('অথবা', 'OR')}
            </span>
          </div>

          {/* Link to Register */}
          <div className="text-center space-y-2 relative z-10">
            <p className="text-xs text-stone-600">
              {t('আপনার কি কোনো অ্যাকাউন্ট নেই?', "Don't have an account yet?")}{' '}
              <Link
                href="/register"
                className="font-bold text-[#E53935] hover:underline"
              >
                {t('নতুন অ্যাকাউন্ট খুলুন', 'Create an Account')}
              </Link>
            </p>
          </div>
        </motion.div>
      </main>

      <Footer
        lang={lang}
        onOpenAssistance={() => setAssistanceModalOpen(true)}
        onOpenDonation={() => setDonationModalOpen(true)}
      />

      <MobileBottomBar
        lang={lang}
        onOpenAssistance={() => setAssistanceModalOpen(true)}
        onOpenDonation={() => setDonationModalOpen(true)}
      />

      <BackToTop />

      <AssistanceModal
        isOpen={assistanceModalOpen}
        onClose={() => setAssistanceModalOpen(false)}
        lang={lang}
      />

      <DonationModal
        isOpen={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
