"use client"

import React from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ImageUploader } from "@/components/ui/ImageUploader"

interface NewsEditModalProps {
  isOpen: boolean
  onClose: () => void
  type: "NEWS" | "EVENT"
  setType: (v: "NEWS" | "EVENT") => void
  title: string
  setTitle: (v: string) => void
  imageUrl: string
  setImageUrl: (v: string) => void
  summary: string
  setSummary: (v: string) => void
  content: string
  setContent: (v: string) => void
  isCreating: boolean
  onSubmit: (e: React.FormEvent) => void
}

export function NewsEditModal({
  isOpen,
  onClose,
  type,
  setType,
  title,
  setTitle,
  imageUrl,
  setImageUrl,
  summary,
  setSummary,
  content,
  setContent,
  isCreating,
  onSubmit,
}: NewsEditModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-4 animate-in fade-in-50 zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <h3 className="text-lg font-black text-stone-900">নতুন খবর বা নোটিশ প্রকাশ</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              পোস্টের ধরন <span className="text-red-500">*</span>
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 font-semibold"
            >
              <option value="NEWS">সংবাদ ও প্রেস বিজ্ঞপ্তি (News)</option>
              <option value="EVENT">আসন্ন সেবামূলক ইভেন্ট (Event)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              শিরোনাম <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="খবরের শিরোনাম..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#D62828]/30"
            />
          </div>

          <ImageUploader
            value={imageUrl}
            onChange={setImageUrl}
            label="সংবাদ বা ইভেন্টের ব্যানার ছবি"
            aspectRatio="video"
            description="JPG, PNG, WEBP"
          />

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">সংক্ষিপ্ত সারসংক্ষেপ</label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="১-২ লাইনে মূল সারসংক্ষেপ..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              সম্পূর্ণ বিবরণ ও কন্টেন্ট <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={5}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="খবরের বিস্তারিত বিবরণ লিখুন..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 font-sans"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="text-xs">
              বাতিল
            </Button>
            <Button
              type="submit"
              disabled={isCreating}
              className="bg-[#D62828] hover:bg-[#B91C1C] text-white font-bold text-xs gap-1.5 cursor-pointer"
            >
              {isCreating && <Loader2 className="size-3.5 animate-spin" />}
              <span>প্রকাশ করুন</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
