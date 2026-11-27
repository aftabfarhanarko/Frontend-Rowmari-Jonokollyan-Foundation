"use client"

import React, { useState } from "react"
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Eye,
  Loader2,
  X,
  ExternalLink,
  ArrowUpDown,
  Image as ImageIcon,
} from "lucide-react"
import {
  useGetAdminHeroSlidesQuery,
  useCreateAdminHeroSlideMutation,
  useUpdateAdminHeroSlideMutation,
  useToggleAdminHeroSlideStatusMutation,
  useDeleteAdminHeroSlideMutation,
} from "@/store/api/adminApi"
import { HeroSlideItem } from "@/store/api/contentApi"
import { Button } from "@/components/ui/button"
import { SkeletonTable } from "@/components/ui/skeleton"
import { ImageUploader } from "@/components/ui/ImageUploader"
import { toast } from "sonner"
import Image from "next/image"

export function CmsHeroTab() {
  const { data: slides = [], isLoading, refetch } = useGetAdminHeroSlidesQuery()
  const [createSlide, { isLoading: isCreating }] = useCreateAdminHeroSlideMutation()
  const [updateSlide, { isLoading: isUpdating }] = useUpdateAdminHeroSlideMutation()
  const [toggleStatus] = useToggleAdminHeroSlideStatusMutation()
  const [deleteSlide, { isLoading: isDeleting }] = useDeleteAdminHeroSlideMutation()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSlide, setEditingSlide] = useState<HeroSlideItem | null>(null)
  const [previewSlide, setPreviewSlide] = useState<HeroSlideItem | null>(null)

  // Form states
  const [titleBn, setTitleBn] = useState("")
  const [titleEn, setTitleEn] = useState("")
  const [subtitleBn, setSubtitleBn] = useState("")
  const [subtitleEn, setSubtitleEn] = useState("")
  const [badgeBn, setBadgeBn] = useState("স্থাপিত ২০১৮ • রৌমারী, কুড়িগ্রাম • ৯ম বছরে পদার্পণ")
  const [badgeEn, setBadgeEn] = useState("Est. 2018 • Rowmari, Kurigram")
  const [categoryBn, setCategoryBn] = useState("মানবিক সহায়তা মিশন")
  const [categoryEn, setCategoryEn] = useState("Humanitarian Mission")
  const [imageUrl, setImageUrl] = useState("")
  const [btnPrimaryBn, setBtnPrimaryBn] = useState("অনুদান দিন")
  const [btnPrimaryEn, setBtnPrimaryEn] = useState("Donate Now")
  const [btnPrimaryLink, setBtnPrimaryLink] = useState("/donate")
  const [btnSecondaryBn, setBtnSecondaryBn] = useState("কার্যক্রম দেখুন")
  const [btnSecondaryEn, setBtnSecondaryEn] = useState("Explore Activities")
  const [btnSecondaryLink, setBtnSecondaryLink] = useState("/activities")
  const [displayOrder, setDisplayOrder] = useState(0)
  const [isActive, setIsActive] = useState(true)

  const openCreateDialog = () => {
    setEditingSlide(null)
    setTitleBn("")
    setTitleEn("")
    setSubtitleBn("")
    setSubtitleEn("")
    setBadgeBn("স্থাপিত ২০১৮ • রৌমারী, কুড়িগ্রাম • ৯ম বছরে পদার্পণ")
    setBadgeEn("Est. 2018 • Rowmari, Kurigram")
    setCategoryBn("মানবিক সহায়তা মিশন")
    setCategoryEn("Humanitarian Mission")
    setImageUrl("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1800&q=85")
    setBtnPrimaryBn("অনুদান দিন")
    setBtnPrimaryEn("Donate Now")
    setBtnPrimaryLink("/donate")
    setBtnSecondaryBn("কার্যক্রম দেখুন")
    setBtnSecondaryEn("Explore Activities")
    setBtnSecondaryLink("/activities")
    setDisplayOrder(slides.length + 1)
    setIsActive(true)
    setIsDialogOpen(true)
  }

  const openEditDialog = (item: HeroSlideItem) => {
    setEditingSlide(item)
    setTitleBn(item.titleBn)
    setTitleEn(item.titleEn || "")
    setSubtitleBn(item.subtitleBn)
    setSubtitleEn(item.subtitleEn || "")
    setBadgeBn(item.badgeBn || "")
    setBadgeEn(item.badgeEn || "")
    setCategoryBn(item.categoryBn || "")
    setCategoryEn(item.categoryEn || "")
    setImageUrl(item.imageUrl)
    setBtnPrimaryBn(item.btnPrimaryBn || "অনুদান দিন")
    setBtnPrimaryEn(item.btnPrimaryEn || "Donate Now")
    setBtnPrimaryLink(item.btnPrimaryLink || "/donate")
    setBtnSecondaryBn(item.btnSecondaryBn || "কার্যক্রম দেখুন")
    setBtnSecondaryEn(item.btnSecondaryEn || "Explore Activities")
    setBtnSecondaryLink(item.btnSecondaryLink || "/activities")
    setDisplayOrder(item.displayOrder || 0)
    setIsActive(item.isActive)
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!titleBn.trim() || !subtitleBn.trim() || !imageUrl.trim()) {
      toast.error("বাংলা শিরোনাম, বিবরণ এবং ছবির লিঙ্ক/আপলোড আবশ্যক")
      return
    }

    const payload = {
      titleBn: titleBn.trim(),
      titleEn: titleEn.trim() || null,
      subtitleBn: subtitleBn.trim(),
      subtitleEn: subtitleEn.trim() || null,
      badgeBn: badgeBn.trim() || null,
      badgeEn: badgeEn.trim() || null,
      categoryBn: categoryBn.trim() || null,
      categoryEn: categoryEn.trim() || null,
      imageUrl: imageUrl.trim(),
      btnPrimaryBn: btnPrimaryBn.trim() || "অনুদান দিন",
      btnPrimaryEn: btnPrimaryEn.trim() || "Donate Now",
      btnPrimaryLink: btnPrimaryLink.trim() || "/donate",
      btnSecondaryBn: btnSecondaryBn.trim() || "কার্যক্রম দেখুন",
      btnSecondaryEn: btnSecondaryEn.trim() || "Explore Activities",
      btnSecondaryLink: btnSecondaryLink.trim() || "/activities",
      displayOrder: Number(displayOrder) || 0,
      isActive,
    }

    try {
      if (editingSlide) {
        await updateSlide({ id: editingSlide.id, data: payload }).unwrap()
        toast.success("হিরো স্লাইড সফলভাবে আপডেট হয়েছে")
      } else {
        await createSlide(payload).unwrap()
        toast.success("নতুন হিরো স্লাইড সফলভাবে যুক্ত হয়েছে")
      }
      setIsDialogOpen(false)
      refetch()
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "সংরক্ষণ ব্যর্থ হয়েছে")
    }
  }

  const handleToggle = async (id: string) => {
    try {
      await toggleStatus(id).unwrap()
      toast.success("স্ট্যাটাস পরিবর্তন হয়েছে")
      refetch()
    } catch {
      toast.error("স্ট্যাটাস পরিবর্তন ব্যর্থ হয়েছে")
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`আপনি কি নিশ্চিত যে '${name}' স্লাইডটি মুছে ফেলতে চান?`)) return
    try {
      await deleteSlide(id).unwrap()
      toast.success("স্লাইড মুছে ফেলা হয়েছে")
      refetch()
    } catch {
      toast.error("মুছে ফেলা ব্যর্থ হয়েছে")
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#D62828] text-xs font-bold mb-1.5 border border-red-200">
            <Layers className="w-3.5 h-3.5" />
            <span>হোমপেজ ব্যানার স্লাইডার</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
            হিরো স্লাইডার ব্যবস্থাপনা (Hero Slider CMS)
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
            হোমপেজের মূল ব্যানার স্লাইড, ছবি, হেডলাইন, বিবরণ ও বোতাম সক্রিয়/নিষ্ক্রিয় ও সাজান।
          </p>
        </div>

        <Button
          onClick={openCreateDialog}
          className="bg-[#D62828] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন স্লাইড তৈরি</span>
        </Button>
      </div>

      {/* Hero Slides Table */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
        {isLoading ? (
          <div className="p-4">
            <SkeletonTable rows={4} columns={6} showToolbar={false} showPagination={false} />
          </div>
        ) : slides.length === 0 ? (
          <div className="p-12 text-center text-stone-500 space-y-3">
            <Layers className="w-10 h-10 mx-auto text-stone-300" />
            <p className="font-semibold text-stone-800">কোনো হিরো স্লাইড তৈরি করা হয়নি</p>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              হোমপেজের মূল ব্যানারে স্লাইড যুক্ত করতে ওপরের বাটনটি ব্যবহার করুন।
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-50 text-stone-600 border-b border-stone-200 font-bold uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-3 px-4 w-12 text-center">ক্রম</th>
                  <th className="py-3 px-4">ছবি</th>
                  <th className="py-3 px-4">শিরোনাম ও ব্যাজ</th>
                  <th className="py-3 px-4">বোতাম (CTAs)</th>
                  <th className="py-3 px-4 text-center">স্ট্যাটাস</th>
                  <th className="py-3 px-4 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {slides.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-50/60 transition">
                    <td className="py-3.5 px-4 text-center font-bold font-mono text-stone-500">
                      {item.displayOrder}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="relative w-20 h-14 rounded-lg overflow-hidden border border-stone-200 bg-stone-100 shrink-0">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.titleBn}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-stone-400">
                            <ImageIcon className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs sm:max-w-md">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {item.categoryBn && (
                            <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[10px] font-bold">
                              {item.categoryBn}
                            </span>
                          )}
                          {item.badgeBn && (
                            <span className="px-2 py-0.5 rounded-md bg-red-50 text-[#D62828] border border-red-200 text-[10px] font-bold truncate max-w-[200px]">
                              {item.badgeBn}
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-stone-900 leading-snug line-clamp-1">
                          {item.titleBn}
                        </h4>
                        <p className="text-xs text-stone-500 line-clamp-1">{item.subtitleBn}</p>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-xs whitespace-nowrap">
                      <div className="space-y-1">
                        <span className="inline-block px-2 py-0.5 rounded bg-red-50 text-[#D62828] font-bold text-[10px]">
                          {item.btnPrimaryBn} ({item.btnPrimaryLink})
                        </span>
                        {item.btnSecondaryBn && (
                          <span className="block text-[10px] text-stone-500">
                            {item.btnSecondaryBn} ({item.btnSecondaryLink})
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleToggle(item.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                          item.isActive
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                            : "bg-stone-100 text-stone-500 border border-stone-200 hover:bg-stone-200"
                        }`}
                        title="স্ট্যাটাস পরিবর্তন করুন"
                      >
                        {item.isActive ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>সক্রিয় (Active)</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-stone-400" />
                            <span>নিষ্ক্রিয় (Inactive)</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => setPreviewSlide(item)}
                          className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-100 transition cursor-pointer"
                          title="লাইভ প্রিভিউ দেখুন"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditDialog(item)}
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                          title="সম্পাদনা করুন"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.titleBn)}
                          disabled={isDeleting}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition cursor-pointer"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Slide Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-2xl w-full my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#D62828]" />
                <h3 className="font-bold text-lg text-stone-900">
                  {editingSlide ? "হিরো স্লাইড সম্পাদনা" : "নতুন হিরো স্লাইড তৈরি"}
                </h3>
              </div>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Image Uploader & Image URL */}
              <div>
                <ImageUploader
                  label="স্লাইডের ছবি আপলোড / লিঙ্ক"
                  value={imageUrl}
                  onChange={setImageUrl}
                  aspectRatio="video"
                  description="উচ্চ রেজ্যুলেশন ও অনুভূমিক ছবি নির্বাচন করুন (16:10 বা 16:9)"
                />
              </div>

              {/* Title BN & Title EN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    বাংলা মূল শিরোনাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={titleBn}
                    onChange={(e) => setTitleBn(e.target.value)}
                    placeholder="যেমন: মানুষের পাশে, মানুষের জন্য"
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-[#D62828] font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    ইংরেজি শিরোনাম (ঐচ্ছিক)
                  </label>
                  <input
                    type="text"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    placeholder="Standing by People, For Humanity"
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-[#D62828]"
                  />
                </div>
              </div>

              {/* Subtitle BN & EN */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  বাংলা বিস্তারিত বিবরণ *
                </label>
                <textarea
                  required
                  rows={3}
                  value={subtitleBn}
                  onChange={(e) => setSubtitleBn(e.target.value)}
                  placeholder="রৌমারী ও ব্রহ্মপুত্রের দুর্গম চরাঞ্চলের অসহায় মানুষের পাশে দাঁড়ানোই আমাদের কাজ..."
                  className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-[#D62828]"
                />
              </div>

              {/* Badges & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    ট্যাগলাইন ব্যাজ (বাংলা)
                  </label>
                  <input
                    type="text"
                    value={badgeBn}
                    onChange={(e) => setBadgeBn(e.target.value)}
                    placeholder="স্থাপিত ২০১৮ • রৌমারী, কুড়িগ্রাম"
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-[#D62828]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    ক্যাটাগরি ট্যাগ (বাংলা)
                  </label>
                  <input
                    type="text"
                    value={categoryBn}
                    onChange={(e) => setCategoryBn(e.target.value)}
                    placeholder="যেমন: মানবিক সহায়তা মিশন"
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-[#D62828]"
                  />
                </div>
              </div>

              {/* Primary & Secondary Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    প্রধান বোতাম (Primary CTA)
                  </label>
                  <div className="space-y-1.5">
                    <input
                      type="text"
                      value={btnPrimaryBn}
                      onChange={(e) => setBtnPrimaryBn(e.target.value)}
                      placeholder="বাটন টেক্সট (যেমন: অনুদান দিন)"
                      className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white"
                    />
                    <input
                      type="text"
                      value={btnPrimaryLink}
                      onChange={(e) => setBtnPrimaryLink(e.target.value)}
                      placeholder="লিঙ্ক (যেমন: /donate)"
                      className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    দ্বিতীয় বোতাম (Secondary CTA)
                  </label>
                  <div className="space-y-1.5">
                    <input
                      type="text"
                      value={btnSecondaryBn}
                      onChange={(e) => setBtnSecondaryBn(e.target.value)}
                      placeholder="বাটন টেক্সট (যেমন: কার্যক্রম দেখুন)"
                      className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white"
                    />
                    <input
                      type="text"
                      value={btnSecondaryLink}
                      onChange={(e) => setBtnSecondaryLink(e.target.value)}
                      placeholder="লিঙ্ক (যেমন: /activities)"
                      className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Display Order & Active */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-stone-700">প্রদর্শন ক্রম (Display Order):</span>
                  <input
                    type="number"
                    min="0"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(Number(e.target.value))}
                    className="w-20 px-2.5 py-1 rounded-lg border border-stone-300 bg-white text-xs font-mono font-bold"
                  />
                </div>

                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 text-[#D62828] rounded border-stone-300 focus:ring-[#D62828]"
                  />
                  <span className="text-xs font-bold text-stone-800">
                    স্লাইডটি ওয়েবসাইটে সক্রিয় থাকবে (Active)
                  </span>
                </label>
              </div>

              {/* Dialog Actions */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="text-xs border-stone-300"
                >
                  বাতিল
                </Button>
                <Button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="bg-[#D62828] hover:bg-[#B91C1C] text-white font-bold text-xs px-5 flex items-center gap-1.5"
                >
                  {isCreating || isUpdating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : editingSlide ? (
                    "আপডেট করুন"
                  ) : (
                    "তৈরি করুন"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Live Preview Slide Dialog */}
      {previewSlide && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setPreviewSlide(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
              <span className="text-xs font-bold text-[#D62828] uppercase tracking-wider">
                হিরো স্লাইড প্রিভিউ
              </span>
              <button
                onClick={() => setPreviewSlide(null)}
                className="p-1 rounded-full hover:bg-stone-100 text-stone-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Split layout preview */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 space-y-3.5">
                <span className="inline-block px-3 py-1 rounded-full bg-red-50 text-[#D62828] border border-red-200 text-xs font-bold">
                  {previewSlide.badgeBn || "RJF OFFICIAL"}
                </span>
                <span className="block text-xs font-bold text-stone-500 uppercase">
                  {previewSlide.categoryBn || "মানবিক মিশন"}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-stone-900 leading-tight">
                  {previewSlide.titleBn}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {previewSlide.subtitleBn}
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <span className="px-5 py-2.5 rounded-xl bg-[#D62828] text-white text-xs font-bold shadow-sm">
                    {previewSlide.btnPrimaryBn}
                  </span>
                  {previewSlide.btnSecondaryBn && (
                    <span className="px-5 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs font-bold">
                      {previewSlide.btnSecondaryBn}
                    </span>
                  )}
                </div>
              </div>

              <div className="md:col-span-5">
                <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden border border-stone-200 shadow-md bg-stone-100">
                  {previewSlide.imageUrl ? (
                    <Image
                      src={previewSlide.imageUrl}
                      alt={previewSlide.titleBn}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-400">
                      ছবি নেই
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
