"use client"

import React, { useState, useEffect } from "react"
import {
  Settings,
  Save,
  Loader2,
  Phone,
  Mail,
  MapPin,
  Globe,
  Sparkles,
  Share2,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react"
import {
  useGetAdminSettingsQuery,
  useUpdateAdminSettingsMutation,
} from "@/store/api/adminApi"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function CmsSettingsTab() {
  const { data: settings, isLoading, refetch } = useGetAdminSettingsQuery()
  const [updateSettings, { isLoading: isSaving }] = useUpdateAdminSettingsMutation()

  // General & Contact Settings
  const [siteTitle, setSiteTitle] = useState("")
  const [siteSlogan, setSiteSlogan] = useState("")
  const [contactHotline, setContactHotline] = useState("")
  const [emergencyHotline, setEmergencyHotline] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [officeAddress, setOfficeAddress] = useState("")

  // Emergency Announcement Banner
  const [noticeBannerText, setNoticeBannerText] = useState("")
  const [noticeBannerActive, setNoticeBannerActive] = useState("true")

  // Social & Web Links
  const [facebookUrl, setFacebookUrl] = useState("")
  const [youtubeUrl, setYoutubeUrl] = useState("")

  // Global SEO
  const [seoMetaTitle, setSeoMetaTitle] = useState("")
  const [seoMetaDescription, setSeoMetaDescription] = useState("")

  useEffect(() => {
    if (settings) {
      setSiteTitle(settings.site_title || "রৌমারী জনকল্যাণ ফাউন্ডেশন")
      setSiteSlogan(settings.site_slogan || "স্থাপিত ২০১৮ • রৌমারী, কুড়িগ্রাম • মানুষের পাশে, মানুষের জন্য")
      setContactHotline(settings.contact_hotline || "+880 1712-345678")
      setEmergencyHotline(settings.emergency_hotline || "+880 1812-987654")
      setContactEmail(settings.contact_email || "contact@rowmarijanakalyan.org")
      setOfficeAddress(settings.office_address || "ডাকবাংলো রোড, থানা রোড, রৌমারী সদর, রৌমারী, কুড়িগ্রাম ৫৬৫০")
      setNoticeBannerText(
        settings.notice_banner_text ||
          "জরুরি রক্তের প্রয়োজন: রৌমারী হাসপাতালে O- ও B+ রক্তের জরুরি আহ্বান • চরাঞ্চলে শীতবস্ত্র বিতরণ চলমান • হটলাইন: +880 1712-345678"
      )
      setNoticeBannerActive(settings.notice_banner_active || "true")
      setFacebookUrl(settings.facebook_url || "https://facebook.com/rowmarijanakalyan")
      setYoutubeUrl(settings.youtube_url || "https://youtube.com/@rowmarijanakalyan")
      setSeoMetaTitle(settings.seo_meta_title || "রৌমারী জনকল্যাণ ফাউন্ডেশন | Rowmari Janakalyan Foundation")
      setSeoMetaDescription(
        settings.seo_meta_description ||
          "রৌমারী জনকল্যাণ ফাউন্ডেশন (RJF) কুড়িগ্রামের রৌমারী অঞ্চলের দরিদ্র ও অসহায় মানুষের চিকিৎসাসেবা, রক্তদান, শীতবস্ত্র বিতরণ ও পুনর্বাসনে নিবেদিত একটি স্বেচ্ছাসেবী সংস্থা।"
      )
    }
  }, [settings])

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const payload = [
        { key: "site_title", value: siteTitle.trim(), group: "general", description: "মূল ওয়েবসাইটের নাম" },
        { key: "site_slogan", value: siteSlogan.trim(), group: "general", description: "ওয়েবসাইট স্লোগান" },
        { key: "contact_hotline", value: contactHotline.trim(), group: "contact", description: "সাধারণ অনুসন্ধান হটলাইন" },
        { key: "emergency_hotline", value: emergencyHotline.trim(), group: "contact", description: "জরুরি রক্তদান ও চিকিৎসা হটলাইন" },
        { key: "contact_email", value: contactEmail.trim(), group: "contact", description: "অফিসিয়াল ইমেইল" },
        { key: "office_address", value: officeAddress.trim(), group: "contact", description: "কেন্দ্রীয় কার্যালয়ের ঠিকানা" },
        { key: "notice_banner_text", value: noticeBannerText.trim(), group: "announcement", description: "শীর্ষ লাল ব্যানার জরুরি অ্যালার্ট" },
        { key: "notice_banner_active", value: noticeBannerActive, group: "announcement", description: "ব্যানার প্রদর্শন সক্রিয় কিনা" },
        { key: "facebook_url", value: facebookUrl.trim(), group: "social", description: "ফেসবুক অফিসিয়াল পেজ" },
        { key: "youtube_url", value: youtubeUrl.trim(), group: "social", description: "ইউটিউব চ্যানেল" },
        { key: "seo_meta_title", value: seoMetaTitle.trim(), group: "seo", description: "গুগল সার্চ মেটা টাইটেল" },
        { key: "seo_meta_description", value: seoMetaDescription.trim(), group: "seo", description: "গুগল সার্চ মেটা বিবরণ" },
      ]

      await updateSettings({ settings: payload }).unwrap()
      toast.success("ওয়েবসাইট সেটিংস ও এসইও সফলভাবে হালনাগাদ করা হয়েছে!")
      refetch()
    } catch (err: any) {
      toast.error(err?.message || "সেটিংস সংরক্ষণ করতে সমস্যা হয়েছে")
    }
  }

  return (
    <form onSubmit={handleSaveAll} className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#0D5C35] uppercase tracking-wider mb-1">
            <Settings className="size-4" />
            <span>সিস্টেম কনফিগারেশন ও এসইও (Global CMS Settings)</span>
          </div>
          <h2 className="text-xl font-black text-stone-900">ওয়েবসাইট সেটিংস ও গ্লোবাল এসইও</h2>
          <p className="text-xs text-stone-500 mt-0.5">
            পুরো ওয়েবসাইটের লোগো, শিরোনাম, হটলাইন, ঠিকানা ও গুগল সার্চ এসইও মেটাডাটা সরাসরি নিয়ন্ত্রণ করুন
          </p>
        </div>

        <Button
          type="submit"
          disabled={isSaving || isLoading}
          className="gap-2 bg-[#0D5C35] hover:bg-[#094527] text-white font-bold text-xs shadow-xs cursor-pointer"
        >
          {isSaving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          <span>সেটিংস সংরক্ষণ করুন</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Brand & General Info */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/90 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-900 border-b border-stone-100 pb-2">
            <Globe className="size-4 text-[#0D5C35]" />
            <span>ব্র্যান্ড ও শিরোনাম (Branding & Identity)</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">ওয়েবসাইটের প্রধান নাম (Site Title)</label>
            <input
              type="text"
              required
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#0D5C35]/30 focus:border-[#0D5C35]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">স্লোগান ও ট্যাগলাইন (Slogan)</label>
            <input
              type="text"
              value={siteSlogan}
              onChange={(e) => setSiteSlogan(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#0D5C35]/30 focus:border-[#0D5C35]"
            />
          </div>

          <div className="pt-2">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-900 border-b border-stone-100 pb-2 mb-3">
              <Share2 className="size-4 text-emerald-700" />
              <span>সোশ্যাল মিডিয়া লিংক (Social Media)</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">ফেসবুক পেজ URL</label>
                <input
                  type="url"
                  value={facebookUrl}
                  onChange={(e) => setFacebookUrl(e.target.value)}
                  placeholder="https://facebook.com/..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">ইউটিউব চ্যানেল URL</label>
                <input
                  type="url"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://youtube.com/..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Contact Information */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/90 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-900 border-b border-stone-100 pb-2">
            <Phone className="size-4 text-emerald-700" />
            <span>অফিসিয়াল যোগাযোগ ও ঠিকানা (Contact Details)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">সাধারণ হটলাইন (২৪/৭)</label>
              <input
                type="text"
                required
                value={contactHotline}
                onChange={(e) => setContactHotline(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">জরুরি রক্তদান হটলাইন</label>
              <input
                type="text"
                required
                value={emergencyHotline}
                onChange={(e) => setEmergencyHotline(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">অফিসিয়াল ইমেইল ঠিকানা</label>
            <input
              type="email"
              required
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">কেন্দ্রীয় কার্যালয়ের পূর্ণ ঠিকানা</label>
            <textarea
              rows={3}
              required
              value={officeAddress}
              onChange={(e) => setOfficeAddress(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 font-sans leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* 3. Emergency Announcement & Google SEO */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Announcement Banner */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-red-600">
              <AlertTriangle className="size-4" />
              <span>জরুরি টপ এনাউন্সমেন্ট ব্যানার (Live Alert)</span>
            </div>
            <select
              value={noticeBannerActive}
              onChange={(e) => setNoticeBannerActive(e.target.value)}
              className="text-xs px-2.5 py-1 rounded-lg border border-stone-300 bg-stone-50 font-bold"
            >
              <option value="true">ব্যানার চালু (Visible)</option>
              <option value="false">ব্যানার বন্ধ (Hidden)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              ব্যানারে প্রদর্শিত মেসেজ
            </label>
            <textarea
              rows={4}
              value={noticeBannerText}
              onChange={(e) => setNoticeBannerText(e.target.value)}
              placeholder="ওয়েবসাইটের শীর্ষে চলমান লাল ব্যানার টেক্সট..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 font-sans leading-relaxed"
            />
          </div>
        </div>

        {/* Global SEO */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/90 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-900 border-b border-stone-100 pb-2">
            <Sparkles className="size-4 text-purple-600" />
            <span>গুগল সার্চ ও সোশ্যাল এসইও (Global SEO Metadata)</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">গ্লোবাল মেটা টাইটেল (Title Tag)</label>
            <input
              type="text"
              value={seoMetaTitle}
              onChange={(e) => setSeoMetaTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">গ্লোবাল মেটা বিবরণ (Description)</label>
            <textarea
              rows={4}
              value={seoMetaDescription}
              onChange={(e) => setSeoMetaDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 text-xs leading-relaxed"
            />
          </div>
        </div>
      </div>
    </form>
  )
}
export default CmsSettingsTab
