"use client"

import React from "react"
import { Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ImageUploader } from "@/components/ui/ImageUploader"

interface PageEditModalProps {
  isOpen: boolean
  onClose: () => void
  editingPageId: string | null
  formData: {
    title: string; slug: string; subtitle: string; bannerImageUrl: string;
    description: string; content: string; seoTitle: string; seoDescription: string;
    displayOrder: number; status: "PUBLISHED" | "DRAFT"
  }
  setFormData: React.Dispatch<React.SetStateAction<any>>
  isSubmitting: boolean
  onSubmit: (e: React.FormEvent) => void
}

export function PageEditModal({
  isOpen, onClose, editingPageId, formData, setFormData, isSubmitting, onSubmit,
}: PageEditModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 my-8 space-y-5 animate-in fade-in-50 zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div>
            <h3 className="text-lg font-black text-stone-900">{editingPageId ? "পেজ সম্পাদনা করুন" : "নতুন পাবলিক পেজ তৈরি"}</h3>
            <p className="text-xs text-stone-500">কন্টেন্ট ম্যানেজমেন্ট সিস্টেমের মাধ্যমে পেজ আপডেট করুন</p>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer">✕</button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">পেজের শিরোনাম <span className="text-red-500">*</span></label>
              <input type="text" required value={formData.title} onChange={(e) => setFormData((prev: any) => ({ ...prev, title: e.target.value }))} placeholder="যেমন: আমাদের সম্পর্কে" className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#D62828]/30" />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">স্ল্যাগ / URL পাথ</label>
              <input type="text" value={formData.slug} onChange={(e) => setFormData((prev: any) => ({ ...prev, slug: e.target.value }))} placeholder="about-us" className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 font-mono focus:outline-none focus:ring-2 focus:ring-[#D62828]/30" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">উপশিরোনাম</label>
              <input type="text" value={formData.subtitle} onChange={(e) => setFormData((prev: any) => ({ ...prev, subtitle: e.target.value }))} placeholder="মানবিক সেবায় একটি অঙ্গীকার" className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300" />
            </div>
            <ImageUploader value={formData.bannerImageUrl} onChange={(url) => setFormData((prev: any) => ({ ...prev, bannerImageUrl: url }))} label="ব্যানার বা কভার ছবি" aspectRatio="banner" description="JPG, PNG, WEBP" />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">সংক্ষিপ্ত বিবরণ</label>
            <textarea rows={2} value={formData.description} onChange={(e) => setFormData((prev: any) => ({ ...prev, description: e.target.value }))} placeholder="পেজের সংক্ষিপ্ত সারসংক্ষেপ..." className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300" />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">মূল পেজ কন্টেন্ট <span className="text-red-500">*</span></label>
            <textarea rows={5} required value={formData.content} onChange={(e) => setFormData((prev: any) => ({ ...prev, content: e.target.value }))} placeholder="সম্পূর্ণ পেজের বিবরণ ও তথ্য লিখুন..." className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 font-sans leading-relaxed" />
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3">
            <div className="text-[11px] font-bold text-[#D62828] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="size-3.5" />
              <span>এসইও অপ্টিমাইজেশন (SEO Metadata)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">SEO মেটা টাইটেল</label>
                <input type="text" value={formData.seoTitle} onChange={(e) => setFormData((prev: any) => ({ ...prev, seoTitle: e.target.value }))} placeholder="Title | RJF" className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">SEO মেটা বিবরণ</label>
                <input type="text" value={formData.seoDescription} onChange={(e) => setFormData((prev: any) => ({ ...prev, seoDescription: e.target.value }))} placeholder="Meta description" className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">প্রদর্শন ক্রম (Order)</label>
                <input type="number" value={formData.displayOrder} onChange={(e) => setFormData((prev: any) => ({ ...prev, displayOrder: parseInt(e.target.value, 10) || 0 }))} className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white" />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">প্রকাশনা স্ট্যাটাস</label>
                <select value={formData.status} onChange={(e) => setFormData((prev: any) => ({ ...prev, status: e.target.value as any }))} className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white">
                  <option value="PUBLISHED">PUBLISHED (প্রকাশিত)</option>
                  <option value="DRAFT">DRAFT (ড্রাফট)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="cursor-pointer text-xs">বাতিল</Button>
            <Button type="submit" disabled={isSubmitting} className="bg-[#D62828] hover:bg-[#B91C1C] text-white font-bold text-xs gap-1.5 cursor-pointer shadow-xs">
              {isSubmitting && <Loader2 className="size-3.5 animate-spin" />}
              <span>{editingPageId ? "সংরক্ষণ করুন" : "প্রকাশ করুন"}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
