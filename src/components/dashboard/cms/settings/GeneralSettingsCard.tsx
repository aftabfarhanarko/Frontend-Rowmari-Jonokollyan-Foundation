"use client"

import React from "react"
import { Globe, Phone } from "lucide-react"
import { ImageUploader } from "@/components/ui/ImageUploader"

interface GeneralSettingsCardProps {
  siteTitle: string
  setSiteTitle: (v: string) => void
  siteSlogan: string
  setSiteSlogan: (v: string) => void
  siteLogoUrl: string
  setSiteLogoUrl: (v: string) => void
  contactHotline: string
  setContactHotline: (v: string) => void
  emergencyHotline: string
  setEmergencyHotline: (v: string) => void
  contactEmail: string
  setContactEmail: (v: string) => void
  officeAddress: string
  setOfficeAddress: (v: string) => void
}

export function GeneralSettingsCard({
  siteTitle,
  setSiteTitle,
  siteSlogan,
  setSiteSlogan,
  siteLogoUrl,
  setSiteLogoUrl,
  contactHotline,
  setContactHotline,
  emergencyHotline,
  setEmergencyHotline,
  contactEmail,
  setContactEmail,
  officeAddress,
  setOfficeAddress,
}: GeneralSettingsCardProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/90 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-stone-900 border-b border-stone-100 pb-2">
          <Globe className="size-4 text-[#D62828]" />
          <span>ব্র্যান্ড ও শিরোনাম (Branding & Identity)</span>
        </div>
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">ওয়েবসাইটের প্রধান নাম</label>
          <input
            type="text"
            required
            value={siteTitle}
            onChange={(e) => setSiteTitle(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#D62828]/30"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">স্লোগান ও ট্যাগলাইন</label>
          <input
            type="text"
            value={siteSlogan}
            onChange={(e) => setSiteSlogan(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#D62828]/30"
          />
        </div>
        <ImageUploader
          value={siteLogoUrl}
          onChange={setSiteLogoUrl}
          label="অফিসিয়াল লোগো"
          aspectRatio="square"
          description="JPG, PNG, WEBP (ImgBB ক্লাউড)"
        />
      </div>

      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/90 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-stone-900 border-b border-stone-100 pb-2">
          <Phone className="size-4 text-red-700" />
          <span>যোগাযোগ ও ঠিকানা (Contact Details)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">সাধারণ হটলাইন</label>
            <input
              type="text"
              required
              value={contactHotline}
              onChange={(e) => setContactHotline(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">জরুরি হটলাইন</label>
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
          <label className="block text-xs font-bold text-stone-700 mb-1">অফিসিয়াল ইমেইল</label>
          <input
            type="email"
            required
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">কার্যালয়ের পূর্ণ ঠিকানা</label>
          <textarea
            rows={3}
            required
            value={officeAddress}
            onChange={(e) => setOfficeAddress(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 font-sans"
          />
        </div>
      </div>
    </div>
  )
}
