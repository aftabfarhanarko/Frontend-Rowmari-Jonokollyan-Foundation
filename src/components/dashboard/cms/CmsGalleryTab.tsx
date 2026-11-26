"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Image as ImageIcon, Plus, Trash2, Copy, Check, Loader2, ExternalLink } from "lucide-react"
import {
  useGetGalleryQuery,
  useCreateGalleryItemMutation,
  GalleryItem,
} from "@/store/api/contentApi"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageUploader } from "@/components/ui/ImageUploader"
import { toast } from "sonner"

export function CmsGalleryTab() {
  const { data: galleryRes, isLoading, refetch } = useGetGalleryQuery()
  const items: GalleryItem[] = Array.isArray(galleryRes) ? galleryRes : (galleryRes as any)?.items || []

  const [createItem, { isLoading: isCreating }] = useCreateGalleryItemMutation()
  const [modalOpen, setModalOpen] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Form
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("শীতবস্ত্র বিতরণ")
  const [imageUrl, setImageUrl] = useState("")
  const [caption, setCaption] = useState("")

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    toast.success("ছবির URL ক্লিপবোর্ডে কপি করা হয়েছে!")
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !imageUrl.trim()) {
      toast.error("শিরোনাম ও ছবির URL প্রদান করুন")
      return
    }

    try {
      await createItem({
        title: title.trim(),
        category,
        imageUrl: imageUrl.trim(),
        mediaUrl: imageUrl.trim(),
        caption: caption.trim() || undefined,
      } as any).unwrap()

      toast.success("ছবি সফলভাবে গ্যালারিতে যুক্ত হয়েছে!")
      setModalOpen(false)
      setTitle("")
      setImageUrl("")
      setCaption("")
      refetch()
    } catch (err: any) {
      toast.error(err?.message || "সংযোজন ব্যর্থ হয়েছে")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#0D5C35] uppercase tracking-wider mb-1">
            <ImageIcon className="size-4" />
            <span>মিডিয়া ও ফটো লাইব্রেরি (Media Library)</span>
          </div>
          <h2 className="text-xl font-black text-stone-900">গ্যালারি ও মিডিয়া ফাইলস</h2>
          <p className="text-xs text-stone-500 mt-0.5">
            ওয়েবসাইটে ব্যবহারের জন্য ছবি আপলোড ও ম্যানেজ করুন। যেকোনো ছবির URL এক ক্লিকে কপি করতে পারবেন
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          className="gap-1.5 bg-[#0D5C35] hover:bg-[#094527] text-white font-bold text-xs shadow-xs cursor-pointer"
        >
          <Plus className="size-4" />
          <span>নতুন ছবি যোগ করুন</span>
        </Button>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="p-12 flex flex-col items-center justify-center gap-2 text-stone-500 bg-white rounded-2xl border border-stone-200">
          <Loader2 className="size-6 animate-spin text-[#0D5C35]" />
          <span className="text-xs">গ্যালারি লোড হচ্ছে...</span>
        </div>
      ) : items.length === 0 ? (
        <div className="p-12 text-center text-stone-500 bg-white rounded-2xl border border-stone-200 space-y-2">
          <ImageIcon className="size-10 text-stone-300 mx-auto" />
          <p className="text-sm font-semibold">কোনো ছবি পাওয়া যায়নি</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
                <Image
                  src={item.imageUrl || (item as any).mediaUrl || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=80"}
                  alt={item.title || "Gallery image"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] border-none font-bold">
                  {item.category || "General"}
                </Badge>
              </div>

              <div className="p-3.5 space-y-2">
                <div className="font-bold text-stone-900 text-xs line-clamp-1">{item.title}</div>
                {item.caption && <p className="text-[11px] text-stone-500 line-clamp-2">{item.caption}</p>}

                <div className="flex items-center justify-between pt-1 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => handleCopyUrl(item.imageUrl, item.id)}
                    className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 hover:text-emerald-950 transition cursor-pointer"
                  >
                    {copiedId === item.id ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />}
                    <span>{copiedId === item.id ? "কপি হয়েছে!" : "URL কপি করুন"}</span>
                  </button>

                  <a
                    href={item.imageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 text-stone-400 hover:text-stone-700 transition"
                    title="মূল ছবি দেখুন"
                  >
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4 animate-in fade-in-50 zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-base font-black text-stone-900">গ্যালারিতে নতুন ছবি যোগ</h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  ছবির শিরোনাম <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="যেমন: চরাঞ্চলে শীতবস্ত্র বিতরণ ২০২৬"
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
                description="JPG, PNG, WEBP (ImgBB ক্লাউডে হোস্ট হবে)"
              />

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">ক্যাপশন বা বিবরণ</label>
                <textarea
                  rows={2}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="ছবির সাথে প্রদর্শিত সংক্ষিপ্ত ক্যাপশন..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="text-xs">
                  বাতিল
                </Button>
                <Button
                  type="submit"
                  disabled={isCreating}
                  className="bg-[#0D5C35] hover:bg-[#094527] text-white font-bold text-xs gap-1.5 cursor-pointer"
                >
                  {isCreating && <Loader2 className="size-3.5 animate-spin" />}
                  <span>ছবি সংরক্ষণ করুন</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
export default CmsGalleryTab
