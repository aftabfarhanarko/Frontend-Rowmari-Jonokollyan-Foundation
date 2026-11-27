"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Image as ImageIcon, Plus, Loader2, Copy, Check, ExternalLink, Eye, Pencil, Trash2, Search } from "lucide-react"
import {
  useGetGalleryQuery,
  useCreateGalleryItemMutation,
  useUpdateGalleryItemMutation,
  useDeleteGalleryItemMutation,
  GalleryItem,
} from "@/store/api/contentApi"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { GalleryUploadModal } from "./gallery/GalleryUploadModal"
import { SkeletonCard } from "@/components/ui/skeleton"

export function CmsGalleryTab() {
  const { data: galleryRes, isLoading, refetch } = useGetGalleryQuery()
  const items: GalleryItem[] = Array.isArray(galleryRes) ? galleryRes : (galleryRes as any)?.items || []

  const [createGalleryItem, { isLoading: isCreating }] = useCreateGalleryItemMutation()
  const [updateGalleryItem, { isLoading: isUpdating }] = useUpdateGalleryItemMutation()
  const [deleteGalleryItem, { isLoading: isDeleting }] = useDeleteGalleryItemMutation()

  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [selectedCat, setSelectedCat] = useState<string>("ALL")
  const [search, setSearch] = useState("")

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("শীতবস্ত্র বিতরণ")
  const [imageUrl, setImageUrl] = useState("")
  const [caption, setCaption] = useState("")

  const handleOpenCreate = () => {
    setEditingItem(null)
    setTitle("")
    setCategory("শীতবস্ত্র বিতরণ")
    setImageUrl("")
    setCaption("")
    setModalOpen(true)
  }

  const handleOpenEdit = (item: GalleryItem) => {
    setEditingItem(item)
    setTitle(item.title || "")
    setCategory(item.category || "শীতবস্ত্র বিতরণ")
    setImageUrl(item.imageUrl || (item as any).mediaUrl || "")
    setCaption(item.caption || "")
    setModalOpen(true)
  }

  const handleDelete = async (id: string, titleStr: string) => {
    if (!window.confirm(`আপনি কি নিশ্চিতভাবে "${titleStr || "এই ছবিটি"}" গ্যালারি থেকে মুছে ফেলতে চান?`)) {
      return
    }

    try {
      await deleteGalleryItem(id).unwrap()
      toast.success("ছবি সফলভাবে মুছে ফেলা হয়েছে")
      refetch()
    } catch (err: any) {
      toast.error(err?.message || "মুছে ফেলতে সমস্যা হয়েছে")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!imageUrl.trim()) {
      toast.error("ছবির লিঙ্ক বা আপলোড ফাইল আবশ্যক")
      return
    }

    try {
      if (editingItem) {
        await updateGalleryItem({
          id: editingItem.id,
          data: {
            title: title.trim() || "কার্যক্রমের ছবি",
            category,
            imageUrl: imageUrl.trim(),
            caption: caption.trim() || undefined,
          },
        }).unwrap()
        toast.success("ছবি সফলভাবে আপডেট হয়েছে")
      } else {
        await createGalleryItem({
          title: title.trim() || "কার্যক্রমের ছবি",
          category,
          imageUrl: imageUrl.trim(),
          caption: caption.trim() || undefined,
        }).unwrap()
        toast.success("ছবি সফলভাবে গ্যালারিতে যোগ হয়েছে")
      }
      setModalOpen(false)
      setEditingItem(null)
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

  const filteredItems = items.filter((item) => {
    const matchCat = selectedCat === "ALL" || item.category === selectedCat
    const matchSearch =
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.caption?.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

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
        <Button onClick={handleOpenCreate} size="sm" className="bg-[#D62828] hover:bg-[#B91C1C] text-white text-xs font-bold gap-1.5 cursor-pointer shadow-xs">
          <Plus className="size-4" />
          <span>নতুন ছবি যোগ করুন</span>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ছবির শিরোনাম খুঁজুন..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#D62828]/30"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl border border-stone-200 bg-white font-semibold text-stone-700"
          >
            <option value="ALL">সকল ক্যাটাগরি ({items.length})</option>
            <option value="শীতবস্ত্র বিতরণ">শীতবস্ত্র বিতরণ</option>
            <option value="মেডিকেল ক্যাম্প">মেডিকেল ক্যাম্প</option>
            <option value="বন্যা ও দুর্যোগ ত্রাণ">বন্যা ও দুর্যোগ ত্রাণ</option>
            <option value="শিক্ষা ও বৃত্তি">শিক্ষা ও বৃত্তি</option>
            <option value="রক্তদান কার্যক্রম">রক্তদান কার্যক্রম</option>
            <option value="সাধারণ কার্যক্রম">সাধারণ কার্যক্রম</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} variant="gallery" />
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-stone-500 space-y-2">
          <ImageIcon className="size-10 text-stone-300 mx-auto" />
          <p className="text-sm font-semibold">কোনো গ্যালারি আইটেম পাওয়া যায়নি</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
              <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
                <Image
                  src={item.imageUrl || (item as any).mediaUrl || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=80"}
                  alt={item.title || "Gallery image"}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] border-none font-bold">
                  {item.category || "General"}
                </Badge>
              </div>

              <div className="p-3.5 space-y-2">
                <div className="font-bold text-stone-900 text-xs line-clamp-1 hover:text-[#D62828] transition">
                  <Link href={`/dashboard/gallery/${item.id}`}>{item.title}</Link>
                </div>
                {item.caption && <p className="text-[11px] text-stone-500 line-clamp-2">{item.caption}</p>}
                
                <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => handleCopyUrl(item.imageUrl || (item as any).mediaUrl, item.id)}
                    className="flex items-center gap-1 text-[11px] font-bold text-red-800 hover:text-red-950 transition cursor-pointer"
                  >
                    {copiedId === item.id ? <Check className="size-3 text-red-600" /> : <Copy className="size-3" />}
                    <span>{copiedId === item.id ? "কপি হয়েছে!" : "লিংক"}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <Link
                      href={`/dashboard/gallery/${item.id}`}
                      className="p-1 rounded text-stone-400 hover:text-[#D62828] hover:bg-stone-50 transition"
                      title="বিস্তারিত পেজ দেখুন"
                    >
                      <Eye className="size-3.5" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(item)}
                      className="p-1 rounded text-stone-400 hover:text-amber-700 hover:bg-amber-50 transition cursor-pointer"
                      title="সম্পাদনা করুন"
                    >
                      <Pencil className="size-3.5 text-amber-600" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id, item.title)}
                      disabled={isDeleting}
                      className="p-1 rounded text-stone-400 hover:text-red-700 hover:bg-red-50 transition cursor-pointer"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 className="size-3.5 text-red-600" />
                    </button>
                    <a
                      href={item.imageUrl || (item as any).mediaUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 rounded text-stone-400 hover:text-stone-700 hover:bg-stone-50 transition"
                      title="মূল ছবি দেখুন"
                    >
                      <ExternalLink className="size-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <GalleryUploadModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingItem(null) }}
        isEdit={!!editingItem}
        title={title}
        setTitle={setTitle}
        category={category}
        setCategory={setCategory}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        caption={caption}
        setCaption={setCaption}
        isSubmitting={isCreating || isUpdating}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
export default CmsGalleryTab
