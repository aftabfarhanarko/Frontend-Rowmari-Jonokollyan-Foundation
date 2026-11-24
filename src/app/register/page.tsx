'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  MapPin,
  Droplet,
  UserPlus,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  Heart,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import BackToTop from '@/components/BackToTop';
import AssistanceModal from '@/components/modals/AssistanceModal';
import DonationModal from '@/components/modals/DonationModal';
import { useRegisterUserMutation } from '@/store/api/authApi';
import { useAppStore } from '@/store/useAppStore';
import { UserRole } from '@/types';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const lang = useAppStore((state) => state.lang);
  const toggleLang = useAppStore((state) => state.toggleLang);
  const setCurrentRole = useAppStore((state) => state.setCurrentRole);
  const setIsAuthenticated = useAppStore((state) => state.setIsAuthenticated);
  const donationModalOpen = useAppStore((state) => state.donationModalOpen);
  const setDonationModalOpen = useAppStore((state) => state.setDonationModalOpen);
  const assistanceModalOpen = useAppStore((state) => state.assistanceModalOpen);
  const setAssistanceModalOpen = useAppStore((state) => state.setAssistanceModalOpen);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [upazila, setUpazila] = useState('Roumari');
  const [address, setAddress] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [consentToDonateBlood, setConsentToDonateBlood] = useState(false);

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);

  const bloodGroupOptions = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !phone.trim() || !password) {
      toast.error(t('অনুগ্রহ করে প্রয়োজনীয় তথ্যসমূহ পূরণ করুন', 'Please fill in all required fields'));
      return;
    }

    if (password.length < 8) {
      toast.error(t('পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে', 'Password must be at least 8 characters'));
      return;
    }

    // Format phone to international format if starts with 01
    let formattedPhone = phone.trim().replace(/[\s\-\(\)]/g, '');
    if (formattedPhone.startsWith('01') && formattedPhone.length === 11) {
      formattedPhone = `+88${formattedPhone}`;
    } else if (formattedPhone.startsWith('8801') && !formattedPhone.startsWith('+')) {
      formattedPhone = `+${formattedPhone}`;
    }

    try {
      const session = await registerUser({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: formattedPhone,
        password,
        district: 'Kurigram',
        upazila,
        address: address.trim() || undefined,
        bloodGroup: bloodGroup || undefined,
        consentToDonateBlood,
      }).unwrap();

      const userRoles = session.user.roles || [];
      const primaryRole = (
        typeof userRoles[0] === 'object' ? userRoles[0]?.name : userRoles[0]
      ) as UserRole;

      setCurrentRole(primaryRole || 'COMMUNITY_MEMBER');
      setIsAuthenticated(true);
      toast.success(
        t(
          `অভিনন্দন ${session.user.fullName}! আপনার অ্যাকাউন্ট তৈরি সম্পন্ন হয়েছে।`,
          `Welcome ${session.user.fullName}! Account created successfully.`
        )
      );
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(
        err?.message ||
          t('নিবন্ধন ব্যর্থ হয়েছে। পুনরায় চেষ্টা করুন।', 'Registration failed. Please try again.')
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

      {/* Main Register Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-9 shadow-xl border border-stone-200/90 relative overflow-hidden"
        >
          {/* Subtle Corner Gradient Glow */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-100/60 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-red-100/40 rounded-full blur-2xl pointer-events-none" />

          <div className="text-center space-y-2 mb-7 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#0D5C35] text-xs font-bold border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0D5C35]" />
              <span>{t('কমিউনিটি মেম্বারশিপ', 'Community Membership')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              {t('নতুন অ্যাকাউন্ট তৈরি করুন', 'Create Your Account')}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500">
              {t(
                'রৌমারী জনকল্যাণ ফাউন্ডেশনের মানবিক উদ্যোগে যুক্ত হতে ফর্মটি পূরণ করুন',
                'Join the humanitarian movement for Rowmari and Kurigram'
              )}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700">
                {t('আপনার পুরো নাম *', 'Full Name *')}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="মো: আব্দুল করিম"
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D5C35] focus:border-transparent transition bg-white"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">
                  {t('ইমেইল ঠিকানা *', 'Email Address *')}
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
                <label className="text-xs font-bold text-stone-700">
                  {t('মোবাইল নম্বর *', 'Phone Number *')}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01712-345678"
                    autoComplete="tel"
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D5C35] focus:border-transparent transition bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-700">
                  {t('পাসওয়ার্ড *', 'Password *')}
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
                  autoComplete="new-password"
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

            {/* Upazila & Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">
                  {t('উপজেলা', 'Upazila')}
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={upazila}
                    onChange={(e) => setUpazila(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D5C35] focus:border-transparent transition bg-white"
                  >
                    <option value="Roumari">রৌমারী (Roumari)</option>
                    <option value="Rajibpur">রাজিবপুর (Rajibpur)</option>
                    <option value="Chilmari">চিলমারী (Chilmari)</option>
                    <option value="Kurigram Sadar">কুড়িগ্রাম সদর (Kurigram Sadar)</option>
                    <option value="Ulipur">উলিপুর (Ulipur)</option>
                    <option value="Nageshwari">নাগেশ্বরী (Nageshwari)</option>
                    <option value="Bhurungamari">ভুরুঙ্গামারী (Bhurungamari)</option>
                    <option value="Other">অন্যান্য (Other)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">
                  {t('ইউনিয়ন / গ্রাম', 'Union / Village')}
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="যাদুরচর, দাঁতভাঙ্গা বা গ্রাম"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D5C35] focus:border-transparent transition bg-white"
                />
              </div>
            </div>

            {/* Blood Donation Voluntary Opt-in */}
            <div className="p-3.5 rounded-2xl bg-red-50/60 border border-red-200/70 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-red-900 flex items-center gap-1.5">
                  <Droplet className="w-3.5 h-3.5 text-red-600" />
                  <span>{t('রক্তের গ্রুপ (ঐচ্ছিক)', 'Blood Group (Optional)')}</span>
                </label>
                <div className="flex flex-wrap gap-1">
                  {bloodGroupOptions.map((bg) => (
                    <button
                      type="button"
                      key={bg}
                      onClick={() => setBloodGroup(bloodGroup === bg ? '' : bg)}
                      className={`px-2 py-0.5 rounded-md text-xs font-bold transition cursor-pointer ${
                        bloodGroup === bg
                          ? 'bg-red-600 text-white'
                          : 'bg-white text-stone-700 border border-stone-200 hover:border-red-300'
                      }`}
                    >
                      {bg}
                    </button>
                  ))}
                </div>
              </div>

              {bloodGroup && (
                <label className="flex items-center gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={consentToDonateBlood}
                    onChange={(e) => setConsentToDonateBlood(e.target.checked)}
                    className="rounded text-red-600 focus:ring-red-500 w-4 h-4 cursor-pointer"
                  />
                  <span className="text-xs text-stone-700">
                    {t(
                      'জরুরি প্রয়োজনে রোগীদের রক্তদানে আমি আগ্রহী (গোপনীয়তা সংরক্ষিত)',
                      'I consent to be contacted for emergency voluntary blood donation'
                    )}
                  </span>
                </label>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-3 py-3 rounded-xl bg-[#0D5C35] hover:bg-[#094527] text-white font-bold text-sm transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t('নিবন্ধন প্রক্রিয়াকরণ চলছে...', 'Creating account...')}</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>{t('অ্যাকাউন্ট তৈরি সম্পন্ন করুন', 'Complete Registration')}</span>
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

          {/* Link to Login */}
          <div className="text-center space-y-2 relative z-10">
            <p className="text-xs text-stone-600">
              {t('ইতিমধ্যে আপনার একটি অ্যাকাউন্ট আছে?', 'Already have an account?')}{' '}
              <Link
                href="/login"
                className="font-bold text-[#0D5C35] hover:underline"
              >
                {t('এখানে লগইন করুন', 'Sign In Here')}
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
