"use client"

import React from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ImageUploader } from "@/components/ui/ImageUploader"
import { DashboardModal } from "@/components/dashboard/DashboardModal"

interface GalleryUploadModalProps {
  isOpen: boolean
  onClose: () => void
  isEdit?: boolean
  title: string
  setTitle: (v: string) => void
  category: string
  setCategory: (v: string) => void
  imageUrl: string
  setImageUrl: (v: string) => void
  caption: string
  setCaption: (v: string) => void
  isSubmitting?: boolean
  isCreating?: boolean
  onSubmit: (e: React.FormEvent) => void
}

export function GalleryUploadModal({
  isOpen,
  onClose,
  isEdit = false,
  title,
  setTitle,
  category,
  setCategory,
  imageUrl,
  setImageUrl,
  caption,
  setCaption,
  isSubmitting,
  isCreating,
  onSubmit,
}: GalleryUploadModalProps) {
  if (!isOpen) return null

  const loading = isSubmitting ?? isCreating ?? false

  return (
    <DashboardModal>
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4 animate-in fade-in-50 zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <h3 className="text-base font-black text-stone-900">
            {isEdit ? "গ্যালারি ছবি সম্পাদনা" : "গ্যালারিতে নতুন ছবি যোগ"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              ছবির শিরোনাম <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="যেমন: চরাঞ্চলে শীতবস্ত্র বিতরণ"
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">ক্যাটাগরি</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 font-semibold"
            >
              <option value="শীতবস্ত্র বিতরণ">শীতবস্ত্র বিতরণ</option>
              <option value="মেডিকেল ক্যাম্প">মেডিকেল ক্যাম্প</option>
              <option value="বন্যা ও দুর্যোগ ত্রাণ">বন্যা ও দুর্যোগ ত্রাণ</option>
              <option value="শিক্ষা ও বৃত্তি">শিক্ষা ও বৃত্তি</option>
              <option value="রক্তদান কার্যক্রম">রক্তদান কার্যক্রম</option>
              <option value="সাধারণ কার্যক্রম">সাধারণ কার্যক্রম</option>
            </select>
          </div>

          <ImageUploader
            value={imageUrl}
            onChange={setImageUrl}
            label="গ্যালারির ছবি নির্বাচন / আপলোড"
            required
            aspectRatio="video"
            description="JPG, PNG, WEBP"
          />

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">ক্যাপশন</label>
            <textarea
              rows={2}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="সংক্ষিপ্ত বিবরণ..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="text-xs">
              বাতিল
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#D62828] hover:bg-[#B91C1C] text-white font-bold text-xs gap-1.5 cursor-pointer"
            >
              {loading && <Loader2 className="size-3.5 animate-spin" />}
              <span>{isEdit ? "আপডেট সংরক্ষণ করুন" : "ছবি সংরক্ষণ করুন"}</span>
            </Button>
          </div>
        </form>
      </div>
    </DashboardModal>
  )
}
