"use client"

import React from "react"
import { Share2, Sparkles, AlertTriangle } from "lucide-react"

interface SeoSocialCardProps {
  facebookUrl: string
  setFacebookUrl: (v: string) => void
  youtubeUrl: string
  setYoutubeUrl: (v: string) => void
  noticeBannerText: string
  setNoticeBannerText: (v: string) => void
  noticeBannerActive: string
  setNoticeBannerActive: (v: string) => void
  seoMetaTitle: string
  setSeoMetaTitle: (v: string) => void
  seoMetaDescription: string
  setSeoMetaDescription: (v: string) => void
}

export function SeoSocialCard({
  facebookUrl,
  setFacebookUrl,
  youtubeUrl,
  setYoutubeUrl,
  noticeBannerText,
  setNoticeBannerText,
  noticeBannerActive,
  setNoticeBannerActive,
  seoMetaTitle,
  setSeoMetaTitle,
  seoMetaDescription,
  setSeoMetaDescription,
}: SeoSocialCardProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/90 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-stone-900 border-b border-stone-100 pb-2">
          <AlertTriangle className="size-4 text-[#D62828]" />
          <span>জরুরি নোটিশ ব্যানার (Alert Announcement)</span>
        </div>
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">নোটিশ টেক্সট</label>
          <textarea
            rows={3}
            value={noticeBannerText}
            onChange={(e) => setNoticeBannerText(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="banner_active"
            checked={noticeBannerActive === "true"}
            onChange={(e) => setNoticeBannerActive(e.target.checked ? "true" : "false")}
            className="size-4 text-[#D62828] rounded border-stone-300"
          />
          <label htmlFor="banner_active" className="text-xs font-semibold text-stone-700 cursor-pointer">
            ওয়েবসাইটের শীর্ষে জরুরি ব্যানার প্রদর্শন করুন
          </label>
        </div>
        <div className="pt-2 border-t border-stone-100">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-900 mb-2">
            <Share2 className="size-4 text-red-700" />
            <span>সোশ্যাল মিডিয়া লিংক</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="url"
              value={facebookUrl}
              onChange={(e) => setFacebookUrl(e.target.value)}
              placeholder="Facebook URL"
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 font-mono"
            />
            <input
              type="url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="YouTube URL"
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 font-mono"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/90 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-stone-900 border-b border-stone-100 pb-2">
          <Sparkles className="size-4 text-[#D62828]" />
          <span>গ্লোবাল গুগল সার্চ এসইও (Global SEO)</span>
        </div>
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">ডিফল্ট মেটা টাইটেল</label>
          <input
            type="text"
            value={seoMetaTitle}
            onChange={(e) => setSeoMetaTitle(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">ডিফল্ট মেটা বিবরণ</label>
          <textarea
            rows={4}
            value={seoMetaDescription}
            onChange={(e) => setSeoMetaDescription(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
          />
        </div>
      </div>
    </div>
  )
}
