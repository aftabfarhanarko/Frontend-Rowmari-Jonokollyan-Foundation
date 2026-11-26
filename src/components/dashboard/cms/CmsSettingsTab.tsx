"use client"

import React, { useState, useEffect } from "react"
import { Settings, Save, Loader2 } from "lucide-react"
import { useGetAdminSettingsQuery, useUpdateAdminSettingsMutation } from "@/store/api/adminApi"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { GeneralSettingsCard } from "./settings/GeneralSettingsCard"
import { SeoSocialCard } from "./settings/SeoSocialCard"

export function CmsSettingsTab() {
  const { data: settings, isLoading, refetch } = useGetAdminSettingsQuery()
  const [updateSettings, { isLoading: isSaving }] = useUpdateAdminSettingsMutation()

  const [siteTitle, setSiteTitle] = useState("")
  const [siteSlogan, setSiteSlogan] = useState("")
  const [siteLogoUrl, setSiteLogoUrl] = useState("")
  const [contactHotline, setContactHotline] = useState("")
  const [emergencyHotline, setEmergencyHotline] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [officeAddress, setOfficeAddress] = useState("")

  const [noticeBannerText, setNoticeBannerText] = useState("")
  const [noticeBannerActive, setNoticeBannerActive] = useState("true")
  const [facebookUrl, setFacebookUrl] = useState("")
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [seoMetaTitle, setSeoMetaTitle] = useState("")
  const [seoMetaDescription, setSeoMetaDescription] = useState("")

  useEffect(() => {
    if (settings) {
      setSiteTitle(settings.site_title || "রৌমারী জনকল্যাণ ফাউন্ডেশন")
      setSiteSlogan(settings.site_slogan || "মানুষের পাশে, মানুষের জন্য")
      setSiteLogoUrl(settings.site_logo || "")
      setContactHotline(settings.contact_hotline || "+880 1712-345678")
      setEmergencyHotline(settings.emergency_hotline || "+880 1812-987654")
      setContactEmail(settings.contact_email || "contact@rowmarijanakalyan.org")
      setOfficeAddress(settings.office_address || "ভোলামোড়, রৌমারী উপজেলা, রংপুর, বাংলাদেশ ৫৬৪০")
      setNoticeBannerText(settings.notice_banner_text || "রৌমারী জনকল্যাণ ফাউন্ডেশন • শীতবস্ত্র ও জরুরি মানবিক ত্রাণ বিতরণ চলমান")
      setNoticeBannerActive(settings.notice_banner_active || "true")
      setFacebookUrl(settings.facebook_url || "https://facebook.com/rowmarijanakalyan")
      setYoutubeUrl(settings.youtube_url || "https://youtube.com/@rowmarijanakalyan")
      setSeoMetaTitle(settings.seo_meta_title || "রৌমারী জনকল্যাণ ফাউন্ডেশন")
      setSeoMetaDescription(settings.seo_meta_description || "RJF কুড়িগ্রামের রৌমারী অঞ্চলের সেবামূলক সংস্থা।")
    }
  }, [settings])

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const payload = [
        { key: "site_title", value: siteTitle.trim(), group: "general", description: "মূল ওয়েবসাইটের নাম" },
        { key: "site_slogan", value: siteSlogan.trim(), group: "general", description: "ওয়েবসাইট স্লোগান" },
        { key: "site_logo", value: siteLogoUrl.trim(), group: "general", description: "ওয়েবসাইটের অফিসিয়াল লোগো" },
        { key: "contact_hotline", value: contactHotline.trim(), group: "contact", description: "সাধারণ অনুসন্ধান হটলাইন" },
        { key: "emergency_hotline", value: emergencyHotline.trim(), group: "contact", description: "জরুরি রক্তদান ও চিকিৎসা হটলাইন" },
        { key: "contact_email", value: contactEmail.trim(), group: "contact", description: "অফিসিয়াল ইমেইল" },
        { key: "office_address", value: officeAddress.trim(), group: "contact", description: "কেন্দ্রীয় কার্যালয়ের ঠিকানা" },
        { key: "notice_banner_text", value: noticeBannerText.trim(), group: "announcement", description: "জরুরি অ্যালার্ট ব্যানার" },
        { key: "notice_banner_active", value: noticeBannerActive, group: "announcement", description: "ব্যানার প্রদর্শন সক্রিয় কিনা" },
        { key: "facebook_url", value: facebookUrl.trim(), group: "social", description: "ফেসবুক অফিসিয়াল পেজ" },
        { key: "youtube_url", value: youtubeUrl.trim(), group: "social", description: "ইউটিউব চ্যানেল" },
        { key: "seo_meta_title", value: seoMetaTitle.trim(), group: "seo", description: "গুগল সার্চ মেটা টাইটেল" },
        { key: "seo_meta_description", value: seoMetaDescription.trim(), group: "seo", description: "গুগল সার্চ মেটা বিবরণ" },
      ]

      await updateSettings({ settings: payload }).unwrap()
      toast.success("ওয়েবসাইট সেটিংস ও এসইও সফলভাবে সংরক্ষিত হয়েছে!")
      refetch()
    } catch (err: any) {
      toast.error(err?.message || "সেটিংস সংরক্ষণ করতে সমস্যা হয়েছে")
    }
  }

  return (
    <form onSubmit={handleSaveAll} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#D62828] uppercase tracking-wider mb-1">
            <Settings className="size-4" />
            <span>সিস্টেম কনফিগারেশন ও এসইও</span>
          </div>
          <h2 className="text-xl font-black text-stone-900">ওয়েবসাইট সেটিংস ও গ্লোবাল এসইও</h2>
          <p className="text-xs text-stone-500 mt-0.5">লোগো, শিরোনাম, হটলাইন, ঠিকানা ও গুগল সার্চ এসইও মেটাডাটা নিয়ন্ত্রণ করুন</p>
        </div>
        <Button type="submit" disabled={isSaving || isLoading} className="gap-2 bg-[#D62828] hover:bg-[#B91C1C] text-white font-bold text-xs shadow-xs cursor-pointer">
          {isSaving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          <span>সেটিংস সংরক্ষণ করুন</span>
        </Button>
      </div>

      <GeneralSettingsCard siteTitle={siteTitle} setSiteTitle={setSiteTitle} siteSlogan={siteSlogan} setSiteSlogan={setSiteSlogan} siteLogoUrl={siteLogoUrl} setSiteLogoUrl={setSiteLogoUrl} contactHotline={contactHotline} setContactHotline={setContactHotline} emergencyHotline={emergencyHotline} setEmergencyHotline={setEmergencyHotline} contactEmail={contactEmail} setContactEmail={setContactEmail} officeAddress={officeAddress} setOfficeAddress={setOfficeAddress} />

      <SeoSocialCard facebookUrl={facebookUrl} setFacebookUrl={setFacebookUrl} youtubeUrl={youtubeUrl} setYoutubeUrl={setYoutubeUrl} noticeBannerText={noticeBannerText} setNoticeBannerText={setNoticeBannerText} noticeBannerActive={noticeBannerActive} setNoticeBannerActive={setNoticeBannerActive} seoMetaTitle={seoMetaTitle} setSeoMetaTitle={setSeoMetaTitle} seoMetaDescription={seoMetaDescription} setSeoMetaDescription={setSeoMetaDescription} />
    </form>
  )
}
export default CmsSettingsTab
