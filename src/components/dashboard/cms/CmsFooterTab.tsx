"use client"

import React, { useState, useEffect } from "react"
import {
  LayoutTemplate,
  Save,
  RotateCcw,
  MapPin,
  Phone,
  Mail,
  Share2,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  ExternalLink,
  Facebook,
  Youtube,
  Linkedin,
} from "lucide-react"
import {
  useGetAdminFooterConfigQuery,
  useUpdateAdminFooterConfigMutation,
} from "@/store/api/adminApi"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function CmsFooterTab() {
  const { data: footerData, isLoading, refetch } = useGetAdminFooterConfigQuery()
  const [updateFooter, { isLoading: isSaving }] = useUpdateAdminFooterConfigMutation()

  // Form states
  const [aboutSummaryBn, setAboutSummaryBn] = useState("")
  const [aboutSummaryEn, setAboutSummaryEn] = useState("")
  const [addressBn, setAddressBn] = useState("")
  const [addressEn, setAddressEn] = useState("")
  const [hotline, setHotline] = useState("")
  const [phonePrimary, setPhonePrimary] = useState("")
  const [phoneSecondary, setPhoneSecondary] = useState("")
  const [emergencyHotline, setEmergencyHotline] = useState("")
  const [emailPrimary, setEmailPrimary] = useState("")
  const [emailSupport, setEmailSupport] = useState("")
  const [registrationNoBn, setRegistrationNoBn] = useState("")
  const [registrationNoEn, setRegistrationNoEn] = useState("")
  const [facebookPageUrl, setFacebookPageUrl] = useState("")
  const [facebookGroupUrl, setFacebookGroupUrl] = useState("")
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [linkedinUrl, setLinkedinUrl] = useState("")
  const [copyrightTextBn, setCopyrightTextBn] = useState("")
  const [copyrightTextEn, setCopyrightTextEn] = useState("")

  // Populate from query
  useEffect(() => {
    if (footerData) {
      setAboutSummaryBn(footerData.aboutSummaryBn || "")
      setAboutSummaryEn(footerData.aboutSummaryEn || "")
      setAddressBn(footerData.addressBn || "")
      setAddressEn(footerData.addressEn || "")
      setHotline(footerData.hotline || "")
      setPhonePrimary(footerData.phonePrimary || "")
      setPhoneSecondary(footerData.phoneSecondary || "")
      setEmergencyHotline(footerData.emergencyHotline || "")
      setEmailPrimary(footerData.emailPrimary || "")
      setEmailSupport(footerData.emailSupport || "")
      setRegistrationNoBn(footerData.registrationNoBn || "")
      setRegistrationNoEn(footerData.registrationNoEn || "")
      setFacebookPageUrl(footerData.facebookPageUrl || "")
      setFacebookGroupUrl(footerData.facebookGroupUrl || "")
      setYoutubeUrl(footerData.youtubeUrl || "")
      setLinkedinUrl(footerData.linkedinUrl || "")
      setCopyrightTextBn(footerData.copyrightTextBn || "")
      setCopyrightTextEn(footerData.copyrightTextEn || "")
    }
  }, [footerData])

  const handleReset = () => {
    if (footerData) {
      setAboutSummaryBn(footerData.aboutSummaryBn || "")
      setAboutSummaryEn(footerData.aboutSummaryEn || "")
      setAddressBn(footerData.addressBn || "")
      setAddressEn(footerData.addressEn || "")
      setHotline(footerData.hotline || "")
      setPhonePrimary(footerData.phonePrimary || "")
      setPhoneSecondary(footerData.phoneSecondary || "")
      setEmergencyHotline(footerData.emergencyHotline || "")
      setEmailPrimary(footerData.emailPrimary || "")
      setEmailSupport(footerData.emailSupport || "")
      setRegistrationNoBn(footerData.registrationNoBn || "")
      setRegistrationNoEn(footerData.registrationNoEn || "")
      setFacebookPageUrl(footerData.facebookPageUrl || "")
      setFacebookGroupUrl(footerData.facebookGroupUrl || "")
      setYoutubeUrl(footerData.youtubeUrl || "")
      setLinkedinUrl(footerData.linkedinUrl || "")
      setCopyrightTextBn(footerData.copyrightTextBn || "")
      setCopyrightTextEn(footerData.copyrightTextEn || "")
      toast.info("পূর্ববর্তী তথ্যে রিসেট করা হয়েছে")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!aboutSummaryBn.trim() || !addressBn.trim() || !hotline.trim() || !emailPrimary.trim()) {
      toast.error("সারসংক্ষেপ, ঠিকানা, হটলাইন এবং ইমেইল আবশ্যক")
      return
    }

    try {
      await updateFooter({
        aboutSummaryBn: aboutSummaryBn.trim(),
        aboutSummaryEn: aboutSummaryEn.trim() || null,
        addressBn: addressBn.trim(),
        addressEn: addressEn.trim() || null,
        hotline: hotline.trim(),
        phonePrimary: phonePrimary.trim(),
        phoneSecondary: phoneSecondary.trim() || null,
        emergencyHotline: emergencyHotline.trim() || null,
        emailPrimary: emailPrimary.trim(),
        emailSupport: emailSupport.trim() || null,
        registrationNoBn: registrationNoBn.trim() || null,
        registrationNoEn: registrationNoEn.trim() || null,
        facebookPageUrl: facebookPageUrl.trim() || null,
        facebookGroupUrl: facebookGroupUrl.trim() || null,
        youtubeUrl: youtubeUrl.trim() || null,
        linkedinUrl: linkedinUrl.trim() || null,
        copyrightTextBn: copyrightTextBn.trim() || "© ২০২৬ রৌমারী জনকল্যাণ ফাউন্ডেশন। সর্বস্বত্ব সংরক্ষিত।",
        copyrightTextEn: copyrightTextEn.trim() || null,
      }).unwrap()

      toast.success("ফুটার কন্টেন্ট ও তথ্য সফলভাবে আপডেট করা হয়েছে!")
      refetch()
    } catch (err: unknown) {
      console.error(err)
      toast.error("ফুটার আপডেট করতে ব্যর্থ হয়েছে")
    }
  }

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-8 w-64 bg-stone-200 animate-pulse rounded-lg" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-96 bg-stone-100 animate-pulse rounded-xl" />
          <div className="h-96 bg-stone-100 animate-pulse rounded-xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-red-100 text-[#D62828] rounded-xl">
              <LayoutTemplate className="size-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
              ওয়েবসাইট ফুটার কন্টেন্ট পরিচালনা (Footer CMS)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            পাবলিক ওয়েবসাইটের সকল ফুটার তথ্য, হটলাইন নম্বর, ঠিকানা, সোশ্যাল লিংক ও কপিরাইট সম্পাদনা করুন
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="border-stone-300 text-stone-700 hover:bg-stone-100"
          >
            <RotateCcw className="size-4 mr-1.5" />
            রিসেট
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSaving}
            className="bg-[#D62828] hover:bg-[#B91C1C] text-white shadow-sm"
          >
            {isSaving ? (
              <Loader2 className="size-4 animate-spin mr-1.5" />
            ) : (
              <Save className="size-4 mr-1.5" />
            )}
            পরিবর্তন সংরক্ষণ করুন
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Edit Form (7 cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
          {/* Card 1: About & Registration */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100 font-bold text-stone-800 text-sm">
              <FileText className="size-4 text-[#D62828]" />
              <span>ফাউন্ডেশন পরিচিতি ও সারসংক্ষেপ</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                ফাউন্ডেশন সারসংক্ষেপ (বাংলা) <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                value={aboutSummaryBn}
                onChange={(e) => setAboutSummaryBn(e.target.value)}
                placeholder="রৌমারী জনকল্যাণ ফাউন্ডেশন (RJF) রৌমারী ও দুর্গম চরাঞ্চলের অসহায় ও সুবিধাবঞ্চিত মানুষের পাশে নিবেদিত..."
                className="w-full text-xs rounded-xl border border-stone-300 px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-[#D62828] resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                ফাউন্ডেশন সারসংক্ষেপ (English - Optional)
              </label>
              <textarea
                rows={2}
                value={aboutSummaryEn}
                onChange={(e) => setAboutSummaryEn(e.target.value)}
                placeholder="Rowmari Janakalyan Foundation (RJF) is dedicated to serving underprivileged communities..."
                className="w-full text-xs rounded-xl border border-stone-300 px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-[#D62828] resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  নিবন্ধন নম্বর (বাংলা)
                </label>
                <input
                  type="text"
                  value={registrationNoBn}
                  onChange={(e) => setRegistrationNoBn(e.target.value)}
                  placeholder="রেজিস্ট্রেশন নং: ১৮-০০৭২/২০১৮"
                  className="w-full text-xs rounded-xl border border-stone-300 px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-[#D62828]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  নিবন্ধন নম্বর (English)
                </label>
                <input
                  type="text"
                  value={registrationNoEn}
                  onChange={(e) => setRegistrationNoEn(e.target.value)}
                  placeholder="Govt. Reg No: 18-0072/2018"
                  className="w-full text-xs rounded-xl border border-stone-300 px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-[#D62828]"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Address & Contact */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100 font-bold text-stone-800 text-sm">
              <MapPin className="size-4 text-[#D62828]" />
              <span>ঠিকানা ও যোগাযোগ তথ্য</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  কেন্দ্রীয় ঠিকানা (বাংলা) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={addressBn}
                  onChange={(e) => setAddressBn(e.target.value)}
                  placeholder="ভোলামোড়, রৌমারী উপজেলা, রংপুর, বাংলাদেশ (৫৬৪০)"
                  className="w-full text-xs rounded-xl border border-stone-300 px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-[#D62828]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  কেন্দ্রীয় ঠিকানা (English)
                </label>
                <input
                  type="text"
                  value={addressEn}
                  onChange={(e) => setAddressEn(e.target.value)}
                  placeholder="Vola Mor, Rowmari Upazila, Rangpur, Bangladesh (5640)"
                  className="w-full text-xs rounded-xl border border-stone-300 px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-[#D62828]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  ২৪/৭ কেন্দ্রীয় জরুরি হটলাইন <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={hotline}
                  onChange={(e) => setHotline(e.target.value)}
                  placeholder="+880 1712-345678"
                  className="w-full text-xs font-mono rounded-xl border border-stone-300 px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-[#D62828]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  প্রধান মোবাইল নম্বর <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={phonePrimary}
                  onChange={(e) => setPhonePrimary(e.target.value)}
                  placeholder="+880 1712-345678"
                  className="w-full text-xs font-mono rounded-xl border border-stone-300 px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-[#D62828]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  বিকল্প ফোন নম্বর (ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  value={phoneSecondary}
                  onChange={(e) => setPhoneSecondary(e.target.value)}
                  placeholder="+880 1723-456789"
                  className="w-full text-xs font-mono rounded-xl border border-stone-300 px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-[#D62828]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  অ্যাম্বুলেন্স / স্বাস্থ্য হটলাইন
                </label>
                <input
                  type="text"
                  value={emergencyHotline}
                  onChange={(e) => setEmergencyHotline(e.target.value)}
                  placeholder="+880 1700-112233"
                  className="w-full text-xs font-mono rounded-xl border border-stone-300 px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-[#D62828]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  অফিসিয়াল ইমেইল <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={emailPrimary}
                  onChange={(e) => setEmailPrimary(e.target.value)}
                  placeholder="contact@rjfbd.org"
                  className="w-full text-xs rounded-xl border border-stone-300 px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-[#D62828]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  সাপোর্ট / অনুসন্ধান ইমেইল
                </label>
                <input
                  type="email"
                  value={emailSupport}
                  onChange={(e) => setEmailSupport(e.target.value)}
                  placeholder="info@rjfbd.org"
                  className="w-full text-xs rounded-xl border border-stone-300 px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-[#D62828]"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Social Media Links */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100 font-bold text-stone-800 text-sm">
              <Share2 className="size-4 text-[#D62828]" />
              <span>সোশ্যাল মিডিয়া প্রোফাইল লিংক</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-stone-700 mb-1">
                  <Facebook className="size-3.5 text-[#1877F2]" />
                  <span>ফেসবুক অফিসিয়াল পেজ URL</span>
                </label>
                <input
                  type="url"
                  value={facebookPageUrl}
                  onChange={(e) => setFacebookPageUrl(e.target.value)}
                  placeholder="https://www.facebook.com/share/..."
                  className="w-full text-xs rounded-xl border border-stone-300 px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-[#D62828]"
                />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-stone-700 mb-1">
                  <Facebook className="size-3.5 text-[#1877F2]" />
                  <span>ফেসবুক কমিউনিটি গ্রুপ URL</span>
                </label>
                <input
                  type="url"
                  value={facebookGroupUrl}
                  onChange={(e) => setFacebookGroupUrl(e.target.value)}
                  placeholder="https://www.facebook.com/groups/..."
                  className="w-full text-xs rounded-xl border border-stone-300 px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-[#D62828]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-stone-700 mb-1">
                  <Youtube className="size-3.5 text-[#FF0000]" />
                  <span>ইউটিউব চ্যানেল URL</span>
                </label>
                <input
                  type="url"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://youtube.com/@..."
                  className="w-full text-xs rounded-xl border border-stone-300 px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-[#D62828]"
                />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-stone-700 mb-1">
                  <Linkedin className="size-3.5 text-[#0A66C2]" />
                  <span>লিংকডইন পেজ URL</span>
                </label>
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/company/..."
                  className="w-full text-xs rounded-xl border border-stone-300 px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-[#D62828]"
                />
              </div>
            </div>
          </div>

          {/* Card 4: Copyright Text */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100 font-bold text-stone-800 text-sm">
              <ShieldCheck className="size-4 text-[#D62828]" />
              <span>কপিরাইট ও আইনি বার্তা</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  কপিরাইট টেক্সট (বাংলা)
                </label>
                <input
                  type="text"
                  value={copyrightTextBn}
                  onChange={(e) => setCopyrightTextBn(e.target.value)}
                  placeholder="© ২০২৬ রৌমারী জনকল্যাণ ফাউন্ডেশন। সর্বস্বত্ব সংরক্ষিত।"
                  className="w-full text-xs rounded-xl border border-stone-300 px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-[#D62828]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  কপিরাইট টেক্সট (English)
                </label>
                <input
                  type="text"
                  value={copyrightTextEn}
                  onChange={(e) => setCopyrightTextEn(e.target.value)}
                  placeholder="© 2026 Rowmari Janakalyan Foundation. All rights reserved."
                  className="w-full text-xs rounded-xl border border-stone-300 px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-[#D62828]"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSaving}
              className="w-full sm:w-auto bg-[#D62828] hover:bg-[#B91C1C] text-white px-8 py-2.5 rounded-xl text-sm font-bold shadow-md cursor-pointer"
            >
              {isSaving ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-2" />
                  সংরক্ষণ করা হচ্ছে...
                </>
              ) : (
                <>
                  <Save className="size-4 mr-2" />
                  সকল পরিবর্তন সংরক্ষণ করুন
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Right: Live Visual Preview Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="sticky top-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                ওয়েবসাইটে যেভাবে দৃশ্যমান হবে (Live Preview)
              </span>
              <span className="text-[11px] bg-red-100 text-[#D62828] px-2 py-0.5 rounded-full font-bold">
                লাইভ প্রিভিউ
              </span>
            </div>

            <div className="bg-[#121212] text-stone-200 rounded-2xl border border-stone-800 p-6 shadow-xl space-y-6">
              {/* Foundation Brand & Reg */}
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#D62828] flex items-center justify-center text-white font-black text-sm">
                    RJF
                  </div>
                  <span className="font-bold text-white text-sm">
                    রৌমারী জনকল্যাণ ফাউন্ডেশন
                  </span>
                </div>
                {registrationNoBn && (
                  <div className="mt-2 text-[11px] text-stone-400 flex items-center gap-1">
                    <ShieldCheck className="size-3 text-red-400" />
                    <span>{registrationNoBn}</span>
                  </div>
                )}
                <p className="mt-3 text-xs text-stone-400 leading-relaxed line-clamp-3">
                  {aboutSummaryBn || "ফাউন্ডেশনের সারসংক্ষেপ এখানে প্রদর্শিত হবে..."}
                </p>
              </div>

              {/* Contact Card */}
              <div className="p-4 bg-stone-900/90 rounded-xl border border-stone-800 space-y-2.5 text-xs">
                <div className="flex items-start gap-2 text-stone-300">
                  <MapPin className="size-3.5 text-red-500 shrink-0 mt-0.5" />
                  <span>{addressBn || "প্রধান কার্যালয়ের ঠিকানা..."}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-300">
                  <Phone className="size-3.5 text-red-500 shrink-0" />
                  <span className="font-mono">{hotline || phonePrimary || "+880 1712-345678"}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-300">
                  <Mail className="size-3.5 text-red-500 shrink-0" />
                  <span>{emailPrimary || "contact@rjfbd.org"}</span>
                </div>
              </div>

              {/* Social Channels */}
              <div>
                <span className="text-[11px] font-bold text-stone-400 block mb-2">
                  সামাজিক যোগাযোগ মাধ্যম:
                </span>
                <div className="flex items-center gap-2">
                  {facebookPageUrl && (
                    <a
                      href={facebookPageUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-stone-800 text-[#1877F2] hover:bg-stone-700 transition"
                      title="Facebook Page"
                    >
                      <Facebook className="size-4" />
                    </a>
                  )}
                  {facebookGroupUrl && (
                    <a
                      href={facebookGroupUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-stone-800 text-blue-400 hover:bg-stone-700 transition"
                      title="Facebook Group"
                    >
                      <Share2 className="size-4" />
                    </a>
                  )}
                  {youtubeUrl && (
                    <a
                      href={youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-stone-800 text-[#FF0000] hover:bg-stone-700 transition"
                      title="YouTube"
                    >
                      <Youtube className="size-4" />
                    </a>
                  )}
                  {linkedinUrl && (
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-stone-800 text-[#0A66C2] hover:bg-stone-700 transition"
                      title="LinkedIn"
                    >
                      <Linkedin className="size-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Copyright Preview */}
              <div className="pt-4 border-t border-stone-800 text-[11px] text-stone-500 flex items-center justify-between">
                <span>{copyrightTextBn || "© ২০২৬ রৌমারী জনকল্যাণ ফাউন্ডেশন।"}</span>
                <span className="text-red-500 font-bold">লাইভ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
