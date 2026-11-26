"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Image as ImageIcon, Plus, Loader2, Copy, Check, ExternalLink } from "lucide-react"
import { useGetGalleryQuery, useCreateGalleryItemMutation, GalleryItem } from "@/store/api/contentApi"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { GalleryUploadModal } from "./gallery/GalleryUploadModal"

export function CmsGalleryTab() {
  const { data: galleryRes, isLoading, refetch } = useGetGalleryQuery()
  const items: GalleryItem[] = Array.isArray(galleryRes) ? galleryRes : (galleryRes as any)?.items || []

  const [createGalleryItem, { isLoading: isCreating }] = useCreateGalleryItemMutation()
  const [modalOpen, setModalOpen] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("শীতবস্ত্র বিতরণ")
  const [imageUrl, setImageUrl] = useState("")
  const [caption, setCaption] = useState("")

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!imageUrl.trim()) { toast.error("ছবির লিংক বা আপলোড ফাইল আবশ্যক"); return }

    try {
      await createGalleryItem({ title: title.trim() || "কার্যক্রমের ছবি", category, imageUrl: imageUrl.trim(), caption: caption.trim() || undefined }).unwrap()
      toast.success("ছবি সফলভাবে গ্যালারিতে যোগ হয়েছে")
      setModalOpen(false)
      setTitle(""); setImageUrl(""); setCaption("")
      refetch()
    } catch (err: any) {
      toast.error(err?.message || "ছবি সংরক্ষণ করতে সমস্যা হয়েছে")
    }
  }

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    toast.success("ছবির URL ক্লিপবোর্ডে কপি করা হয়েছে")
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#D62828] uppercase tracking-wider mb-1">
            <ImageIcon className="size-4" />
            <span>মিডিয়া ও গ্যালারি লাইব্রেরি (CMS)</span>
          </div>
          <h2 className="text-xl font-black text-stone-900">ফটো ও ইভেন্ট গ্যালারি</h2>
          <p className="text-xs text-stone-500 mt-0.5">ওয়েবসাইটের গ্যালারি পেজে প্রদর্শিত ফটো ও ডকুমেন্ট পরিচালনা করুন</p>
        </div>
        <Button onClick={() => setModalOpen(true)} size="sm" className="bg-[#D62828] hover:bg-[#B91C1C] text-white text-xs font-bold gap-1.5 cursor-pointer shadow-xs">
          <Plus className="size-4" />
          <span>নতুন ছবি যোগ করুন</span>
        </Button>
      </div>

      {isLoading ? (
        <div className="p-12 flex flex-col items-center justify-center gap-2 text-stone-500">
          <Loader2 className="size-6 animate-spin text-[#D62828]" />
          <span className="text-xs">গ্যালারি ফাইল লোড হচ্ছে...</span>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-stone-500 space-y-2">
          <ImageIcon className="size-10 text-stone-300 mx-auto" />
          <p className="text-sm font-semibold">কোনো গ্যালারি আইটেম পাওয়া যায়নি</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
              <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
                <Image src={item.imageUrl || (item as any).mediaUrl || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=80"} alt={item.title || "Gallery image"} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <Badge className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] border-none font-bold">
                  {item.category || "General"}
                </Badge>
              </div>

              <div className="p-3.5 space-y-2">
                <div className="font-bold text-stone-900 text-xs line-clamp-1">{item.title}</div>
                {item.caption && <p className="text-[11px] text-stone-500 line-clamp-2">{item.caption}</p>}
                <div className="flex items-center justify-between pt-1 border-t border-stone-100">
                  <button type="button" onClick={() => handleCopyUrl(item.imageUrl, item.id)} className="flex items-center gap-1 text-[11px] font-bold text-red-800 hover:text-red-950 transition cursor-pointer">
                    {copiedId === item.id ? <Check className="size-3 text-red-600" /> : <Copy className="size-3" />}
                    <span>{copiedId === item.id ? "কপি হয়েছে!" : "URL কপি করুন"}</span>
                  </button>
                  <a href={item.imageUrl} target="_blank" rel="noreferrer" className="p-1 text-stone-400 hover:text-stone-700 transition" title="মূল ছবি দেখুন">
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <GalleryUploadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={title} setTitle={setTitle} category={category} setCategory={setCategory} imageUrl={imageUrl} setImageUrl={setImageUrl} caption={caption} setCaption={setCaption} isCreating={isCreating} onSubmit={handleCreate} />
    </div>
  )
}
export default CmsGalleryTab
