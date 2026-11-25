'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  ShieldCheck,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import BackToTop from '@/components/BackToTop';
import AssistanceModal from '@/components/modals/AssistanceModal';
import { useLoginMutation } from '@/store/api/authApi';
import { useAppStore } from '@/store/useAppStore';
import { UserRole } from '@/types';
import { toast } from 'sonner';

function LoginForm() {
  const searchParams = useSearchParams();
  const redirectParam = searchParams?.get('redirect');

  const lang = useAppStore((state) => state.lang);
  const toggleLang = useAppStore((state) => state.toggleLang);
  const setCurrentRole = useAppStore((state) => state.setCurrentRole);
  const currentRole = useAppStore((state) => state.currentRole);
  const setIsAuthenticated = useAppStore((state) => state.setIsAuthenticated);
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  const assistanceModalOpen = useAppStore((state) => state.assistanceModalOpen);
  const setAssistanceModalOpen = useAppStore((state) => state.setAssistanceModalOpen);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);

  // If already authenticated, redirect safely
  useEffect(() => {
    if (isAuthenticated) {
      const target = redirectParam ? decodeURIComponent(redirectParam) : '/dashboard';
      window.location.href = target;
    }
  }, [isAuthenticated, redirectParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!email.trim() || !password) {
      const msg = t('অনুগ্রহ করে ইমেইল ও পাসওয়ার্ড প্রদান করুন', 'Please enter email and password');
      setFormError(msg);
      toast.error(msg);
      return;
    }

    try {
      const session = await login({ email: email.trim(), password }).unwrap();
      const userRoles = session.user.roles || [];
      const isSuperAdmin = userRoles.some(
        (r: any) => (typeof r === 'object' ? r?.name : r) === 'SUPER_ADMIN'
      );
      const primaryRole: UserRole = isSuperAdmin ? 'SUPER_ADMIN' : 'COMMUNITY_MEMBER';

      // Ensure cookies are synchronously written so proxy and subsequent pages see credentials
      if (typeof document !== 'undefined') {
        document.cookie = `rjf_auth_role=${primaryRole}; path=/; max-age=604800; SameSite=Lax`;
        document.cookie = `rjf_session=1; path=/; max-age=604800; SameSite=Lax`;
      }

      setCurrentRole(primaryRole);
      setIsAuthenticated(true);
      setIsRedirecting(true);

      const welcomeMsg = t(
        `স্বাগতম, ${session.user.fullName}! সফলভাবে লগইন হয়েছে।`,
        `Welcome back, ${session.user.fullName}! Successfully signed in.`
      );
      toast.success(welcomeMsg);

      const target = redirectParam ? decodeURIComponent(redirectParam) : '/dashboard';

      // Use a brief timeout so mobile users clearly see the green toast before redirecting,
      // and use window.location.href to guarantee browser HTTP cookie submission to Next.js middleware
      setTimeout(() => {
        window.location.href = target;
      }, 700);
    } catch (err: any) {
      setIsRedirecting(false);
      const errorMsg =
        err?.data?.message ||
        err?.message ||
        t('লগইন ব্যর্থ হয়েছে। সঠিক ইমেইল ও পাসওয়ার্ড দিন।', 'Login failed. Please check credentials.');
      setFormError(errorMsg);
      toast.error(errorMsg);
    }
  };

  const isWorking = isLoading || isRedirecting;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-stone-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar
        lang={lang}
        onToggleLang={toggleLang}
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

          <div className="text-center space-y-2 mb-6 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#0D5C35] text-xs font-bold border border-emerald-200 shadow-2xs">
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

          {/* Notice when redirected from protected dashboard route */}
          {redirectParam && (
            <div className="mb-4 p-3 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-900 text-xs flex items-center gap-2.5 relative z-10 shadow-2xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>
                {t(
                  'ড্যাশবোর্ডে প্রবেশ করতে আপনার সুপার অ্যাডমিন অ্যাকাউন্টে লগইন করুন।',
                  'Please sign in with your Super Admin account to access the dashboard.'
                )}
              </span>
            </div>
          )}

          {/* Visible Inline Error Alert */}
          {formError && (
            <div className="mb-4 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5 relative z-10 shadow-2xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span className="font-semibold">{formError}</span>
            </div>
          )}

          {/* Visible Inline Success/Redirecting Alert */}
          {isRedirecting && (
            <div className="mb-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#0D5C35] text-xs flex items-center gap-2.5 relative z-10 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 animate-bounce" />
              <span className="font-semibold">{t('লগইন সফল! ড্যাশবোর্ডে নিয়ে যাওয়া হচ্ছে...', 'Login successful! Redirecting...')}</span>
            </div>
          )}

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
                  disabled={isWorking}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D5C35] focus:border-transparent transition bg-white disabled:bg-stone-50"
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
                  disabled={isWorking}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D5C35] focus:border-transparent transition bg-white disabled:bg-stone-50"
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
              disabled={isWorking}
              className="w-full mt-2 py-3 rounded-xl bg-[#0D5C35] hover:bg-[#094527] text-white font-bold text-sm transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isWorking ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isRedirecting ? t('প্রবেশ করা হচ্ছে...', 'Entering...') : t('যাচাই করা হচ্ছে...', 'Signing in...')}</span>
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
                href={redirectParam ? `/register?redirect=${encodeURIComponent(redirectParam)}` : '/register'}
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
      />

      <MobileBottomBar
        lang={lang}
        onOpenAssistance={() => setAssistanceModalOpen(true)}
      />

      <BackToTop />

      <AssistanceModal
        isOpen={assistanceModalOpen}
        onClose={() => setAssistanceModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <Loader2 className="w-8 h-8 animate-spin text-[#0D5C35]" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
