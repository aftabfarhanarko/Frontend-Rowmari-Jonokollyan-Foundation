"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  FileText,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Eye,
  Loader2,
  Search,
  CheckCircle2,
  AlertCircle,
  Globe,
  Sparkles,
} from "lucide-react"
import {
  useGetAdminPagesQuery,
  useCreatePageMutation,
  useUpdatePageMutation,
  useDeletePageMutation,
  CMSPage,
} from "@/store/api/adminApi"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ImageUploader } from "@/components/ui/ImageUploader"
import { toast } from "sonner"

export function CmsPagesTab() {
  const { data: pagesRes, isLoading, refetch } = useGetAdminPagesQuery()
  const pages: CMSPage[] = Array.isArray(pagesRes) ? pagesRes : (pagesRes as any)?.items || []

  const [createPage, { isLoading: isCreating }] = useCreatePageMutation()
  const [updatePage, { isLoading: isUpdating }] = useUpdatePageMutation()
  const [deletePage, { isLoading: isDeleting }] = useDeletePageMutation()

  const [searchQuery, setSearchQuery] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editingPageId, setEditingPageId] = useState<string | null>(null)

  // Form State
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")
  const [bannerImageUrl, setBannerImageUrl] = useState("")
  const [seoTitle, setSeoTitle] = useState("")
  const [seoDescription, setSeoDescription] = useState("")
  const [displayOrder, setDisplayOrder] = useState<number>(0)
  const [status, setStatus] = useState<"PUBLISHED" | "DRAFT">("PUBLISHED")

  const openCreateModal = () => {
    setEditingPageId(null)
    setTitle("")
    setSlug("")
    setSubtitle("")
    setDescription("")
    setContent("")
    setBannerImageUrl("")
    setSeoTitle("")
    setSeoDescription("")
    setDisplayOrder(pages.length)
    setStatus("PUBLISHED")
    setModalOpen(true)
  }

  const openEditModal = (page: CMSPage) => {
    setEditingPageId(page.id)
    setTitle(page.title || "")
    setSlug(page.slug || "")
    setSubtitle(page.subtitle || "")
    setDescription(page.description || "")
    setContent(page.content || "")
    setBannerImageUrl(page.bannerImageUrl || "")
    setSeoTitle(page.seoTitle || "")
    setSeoDescription(page.seoDescription || "")
    setDisplayOrder(page.displayOrder || 0)
    setStatus(page.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT")
    setModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      toast.error("পেজের শিরোনাম ও মূল কন্টেন্ট প্রদান করুন")
      return
    }

    try {
      const payload: Partial<CMSPage> = {
        title: title.trim(),
        slug: slug.trim() || undefined,
        subtitle: subtitle.trim() || undefined,
        description: description.trim() || undefined,
        content: content.trim(),
        bannerImageUrl: bannerImageUrl.trim() || undefined,
        seoTitle: seoTitle.trim() || undefined,
        seoDescription: seoDescription.trim() || undefined,
        displayOrder: Number(displayOrder) || 0,
        status,
      }

      if (editingPageId) {
        await updatePage({ id: editingPageId, data: payload }).unwrap()
        toast.success("পেজ সফলভাবে আপডেট করা হয়েছে!")
      } else {
        await createPage(payload).unwrap()
        toast.success("নতুন পেজ সফলভাবে তৈরি হয়েছে!")
      }
      setModalOpen(false)
      refetch()
    } catch (err: any) {
      toast.error(err?.message || "পেজ সংরক্ষণ করতে সমস্যা হয়েছে")
    }
  }

  const handleDelete = async (id: string, pageTitle: string) => {
    if (!confirm(`আপনি কি নিশ্চিতভাবে '${pageTitle}' পেজটি মুছে ফেলতে চান?`)) {
      return
    }
    try {
      await deletePage(id).unwrap()
      toast.success("পেজটি মুছে ফেলা হয়েছে")
      refetch()
    } catch (err: any) {
      toast.error(err?.message || "মুছতে সমস্যা হয়েছে")
    }
  }

  const filteredPages = pages.filter((p) => {
    const q = searchQuery.toLowerCase()
    return (
      p.title?.toLowerCase().includes(q) ||
      p.slug?.toLowerCase().includes(q) ||
      p.subtitle?.toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-6">
      {/* Top Banner & KPI Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#0D5C35] uppercase tracking-wider mb-1">
            <Globe className="size-4" />
            <span>সেন্ট্রাল কন্টেন্ট ম্যানেজমেন্ট সিস্টেম (CMS)</span>
          </div>
          <h2 className="text-xl font-black text-stone-900">পাবলিক পেজ ম্যানেজমেন্ট</h2>
          <p className="text-xs text-stone-500 mt-0.5">
            ওয়েবসাইটের যেকোনো পাবলিক পেজের শিরোনাম, টেক্সট, ব্যানার ও এসইও তথ্য পরিবর্তন করুন
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            onClick={openCreateModal}
            className="gap-1.5 bg-[#0D5C35] hover:bg-[#094527] text-white shadow-xs cursor-pointer font-bold text-xs"
          >
            <Plus className="size-4" />
            <span>নতুন পেজ তৈরি করুন</span>
          </Button>
        </div>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="পেজের নাম বা স্ল্যাগ দিয়ে খুঁজুন..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#0D5C35]/30 focus:border-[#0D5C35]"
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-stone-500">
          <span>মোট পেজ: <strong className="text-stone-900">{pages.length}</strong> টি</span>
          <span>•</span>
          <span className="text-emerald-700">প্রকাশিত: <strong>{pages.filter((p) => p.status === "PUBLISHED").length}</strong> টি</span>
          <span>•</span>
          <span className="text-amber-700">ড্রাফট: <strong>{pages.filter((p) => p.status === "DRAFT").length}</strong> টি</span>
        </div>
      </div>

      {/* Pages Table / Cards */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex flex-col items-center justify-center gap-2 text-stone-500">
            <Loader2 className="size-6 animate-spin text-[#0D5C35]" />
            <span className="text-xs">সিএমএস পেজ লোড হচ্ছে...</span>
          </div>
        ) : filteredPages.length === 0 ? (
          <div className="p-12 text-center text-stone-500 space-y-3">
            <FileText className="size-10 text-stone-300 mx-auto" />
            <p className="text-sm font-semibold">কোনো পেজ পাওয়া যায়নি</p>
            <Button onClick={openCreateModal} variant="outline" size="sm" className="gap-1 cursor-pointer">
              <Plus className="size-3.5" />
              <span>প্রথম পেজ তৈরি করুন</span>
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200/80 text-stone-600 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">ক্রম</th>
                  <th className="py-3 px-4">পেজের নাম</th>
                  <th className="py-3 px-4">স্ল্যাগ (URL)</th>
                  <th className="py-3 px-4">উপশিরোনাম</th>
                  <th className="py-3 px-4 text-center">স্ট্যাটাস</th>
                  <th className="py-3 px-4 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {filteredPages.map((page, idx) => (
                  <tr key={page.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-stone-400 font-semibold">{page.displayOrder || idx + 1}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-stone-900 text-sm">{page.title}</div>
                      {page.seoTitle && <div className="text-[11px] text-stone-400 truncate max-w-xs">{page.seoTitle}</div>}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-emerald-800">
                      /{page.slug}
                    </td>
                    <td className="py-3.5 px-4 text-stone-500 truncate max-w-xs">
                      {page.subtitle || "—"}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <Badge
                        variant="outline"
                        className={
                          page.status === "PUBLISHED"
                            ? "border-emerald-300 bg-emerald-50 text-emerald-800 font-bold text-[10px]"
                            : "border-amber-300 bg-amber-50 text-amber-800 font-bold text-[10px]"
                        }
                      >
                        {page.status === "PUBLISHED" ? "প্রকাশিত" : "ড্রাফট"}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/${page.slug === "home" ? "" : page.slug}`}
                          target="_blank"
                          title="লাইভ পেজ দেখুন"
                          className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition"
                        >
                          <ExternalLink className="size-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => openEditModal(page)}
                          title="সম্পাদনা করুন"
                          className="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-50 transition cursor-pointer"
                        >
                          <Edit2 className="size-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(page.id, page.title)}
                          title="মুছে ফেলুন"
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition cursor-pointer"
                        >
                          <Trash2 className="size-3.5" />
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

      {/* Create / Edit Page Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 my-8 space-y-5 animate-in fade-in-50 zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-stone-900">
                  {editingPageId ? "পেজ সম্পাদনা করুন" : "নতুন পাবলিক পেজ তৈরি"}
                </h3>
                <p className="text-xs text-stone-500">
                  সুপার অ্যাডমিন কন্টেন্ট ম্যানেজমেন্ট সিস্টেমের মাধ্যমে পেজ আপডেট করুন
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    পেজের শিরোনাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="যেমন: আমাদের সম্পর্কে (About Us)"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#0D5C35]/30 focus:border-[#0D5C35]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    স্ল্যাগ / URL পাথ <span className="text-stone-400">(যেমন: about-us)</span>
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="about-us"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 font-mono focus:outline-none focus:ring-2 focus:ring-[#0D5C35]/30 focus:border-[#0D5C35]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">উপশিরোনাম (Subtitle)</label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="মানবিক সেবায় একটি অঙ্গীকার"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#0D5C35]/30 focus:border-[#0D5C35]"
                  />
                </div>

                <ImageUploader
                  value={bannerImageUrl}
                  onChange={setBannerImageUrl}
                  label="ব্যানার বা কভার ছবি আপলোড"
                  aspectRatio="banner"
                  description="JPG, PNG, WEBP (ImgBB ক্লাউডে হোস্ট হবে)"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">সংক্ষিপ্ত বিবরণ (Description)</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="পেজের সংক্ষিপ্ত সারসংক্ষেপ..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#0D5C35]/30 focus:border-[#0D5C35]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  মূল পেজ কন্টেন্ট (Content) <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={6}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="সম্পূর্ণ পেজের বিবরণ ও তথ্য এখানে লিখুন (HTML বা প্লেইন টেক্সট সমর্থিত)..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 font-sans leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#0D5C35]/30 focus:border-[#0D5C35]"
                />
              </div>

              {/* SEO & Status Fields */}
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3">
                <div className="text-[11px] font-bold text-[#0D5C35] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="size-3.5" />
                  <span>গুগল সার্চ ও এসইও অপ্টিমাইজেশন (SEO Metadata)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">SEO মেটা টাইটেল</label>
                    <input
                      type="text"
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                      placeholder="Title | রৌমারী জনকল্যাণ ফাউন্ডেশন"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">SEO মেটা বিবরণ</label>
                    <input
                      type="text"
                      value={seoDescription}
                      onChange={(e) => setSeoDescription(e.target.value)}
                      placeholder="Meta description for search engines"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">প্রদর্শন ক্রম (Order)</label>
                    <input
                      type="number"
                      value={displayOrder}
                      onChange={(e) => setDisplayOrder(parseInt(e.target.value, 10) || 0)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">প্রকাশনা স্ট্যাটাস</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white"
                    >
                      <option value="PUBLISHED">PUBLISHED (সরাসরি প্রকাশিত)</option>
                      <option value="DRAFT">DRAFT (ড্রাফট হিসেবে সংরক্ষিত)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setModalOpen(false)}
                  className="cursor-pointer text-xs"
                >
                  বাতিল করুন
                </Button>
                <Button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="bg-[#0D5C35] hover:bg-[#094527] text-white font-bold text-xs gap-1.5 cursor-pointer shadow-xs"
                >
                  {(isCreating || isUpdating) && <Loader2 className="size-3.5 animate-spin" />}
                  <span>{editingPageId ? "পরিবর্তন সংরক্ষণ করুন" : "পেজ প্রকাশ করুন"}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
export default CmsPagesTab
