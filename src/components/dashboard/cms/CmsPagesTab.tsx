"use client"

import React, { useState } from "react"
import Link from "next/link"
import { FileText, Plus, Edit2, Trash2, ExternalLink, Loader2, Search, Eye } from "lucide-react"
import {
  useGetAdminPagesQuery,
  useCreatePageMutation,
  useUpdatePageMutation,
  useDeletePageMutation,
  CMSPage,
} from "@/store/api/adminApi"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { PageEditModal } from "./pages/PageEditModal"
import { SkeletonTable } from "@/components/ui/skeleton"

export function CmsPagesTab() {
  const { data: pagesRes, isLoading, refetch } = useGetAdminPagesQuery()
  const pages: CMSPage[] = Array.isArray(pagesRes) ? pagesRes : (pagesRes as any)?.items || []

  const [createPage, { isLoading: isCreating }] = useCreatePageMutation()
  const [updatePage, { isLoading: isUpdating }] = useUpdatePageMutation()
  const [deletePage] = useDeletePageMutation()

  const [searchQuery, setSearchQuery] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editingPageId, setEditingPageId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: "", slug: "", subtitle: "", description: "", content: "",
    bannerImageUrl: "", seoTitle: "", seoDescription: "", displayOrder: 0, status: "PUBLISHED" as "PUBLISHED" | "DRAFT",
  })

  const openCreateModal = () => {
    setEditingPageId(null)
    setFormData({ title: "", slug: "", subtitle: "", description: "", content: "", bannerImageUrl: "", seoTitle: "", seoDescription: "", displayOrder: pages.length, status: "PUBLISHED" })
    setModalOpen(true)
  }

  const openEditModal = (page: CMSPage) => {
    setEditingPageId(page.id)
    setFormData({
      title: page.title || "", slug: page.slug || "", subtitle: page.subtitle || "",
      description: page.description || "", content: page.content || "", bannerImageUrl: page.bannerImageUrl || "",
      seoTitle: page.seoTitle || "", seoDescription: page.seoDescription || "", displayOrder: page.displayOrder || 0,
      status: page.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
    })
    setModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("পেজের শিরোনাম ও মূল কন্টেন্ট প্রদান করুন")
      return
    }

    try {
      const payload: Partial<CMSPage> = {
        title: formData.title.trim(),
        slug: formData.slug.trim() || undefined,
        subtitle: formData.subtitle.trim() || undefined,
        description: formData.description.trim() || undefined,
        content: formData.content.trim(),
        bannerImageUrl: formData.bannerImageUrl.trim() || undefined,
        seoTitle: formData.seoTitle.trim() || undefined,
        seoDescription: formData.seoDescription.trim() || undefined,
        displayOrder: formData.displayOrder,
        status: formData.status,
      }

      if (editingPageId) {
        await updatePage({ id: editingPageId, data: payload }).unwrap()
        toast.success("পেজ সফলভাবে আপডেট করা হয়েছে")
      } else {
        await createPage(payload).unwrap()
        toast.success("নতুন পেজ সফলভাবে তৈরি হয়েছে")
      }
      setModalOpen(false)
      refetch()
    } catch (err: any) {
      toast.error(err?.message || "পেজ সংরক্ষণ ব্যর্থ হয়েছে")
    }
  }

  const handleDelete = async (id: string, pageTitle: string) => {
    if (!confirm(`আপনি কি "${pageTitle}" পেজটি মুছে ফেলতে চান?`)) return
    try {
      await deletePage(id).unwrap()
      toast.success("পেজ মুছে ফেলা হয়েছে")
      refetch()
    } catch (err: any) {
      toast.error(err?.message || "মুছে ফেলা সম্ভব হয়নি")
    }
  }

  const filteredPages = pages.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.slug.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#D62828] uppercase tracking-wider mb-1">
            <FileText className="size-4" />
            <span>পাবলিক ওয়েবসাইট কন্টেন্ট ম্যানেজমেন্ট (CMS)</span>
          </div>
          <h2 className="text-xl font-black text-stone-900">সকল পেজ ও কন্টেন্ট তালিকা</h2>
          <p className="text-xs text-stone-500 mt-0.5">হোম, আমাদের সম্পর্কে, যোগাযোগ ও অন্যান্য পেজ সম্পাদন</p>
        </div>
        <Button onClick={openCreateModal} size="sm" className="bg-[#D62828] hover:bg-[#B91C1C] text-white text-xs font-bold gap-1.5 cursor-pointer shadow-xs">
          <Plus className="size-4" />
          <span>নতুন পেজ তৈরি করুন</span>
        </Button>
      </div>

      <div className="relative w-full sm:w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-stone-400" />
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="পেজ খুঁজুন..." className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#D62828]/30" />
      </div>

      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
        {isLoading ? (
          <SkeletonTable rows={5} columns={5} showHeader showToolbar={false} showPagination={false} />
        ) : filteredPages.length === 0 ? (
          <div className="p-12 text-center text-stone-500 space-y-3">
            <FileText className="size-10 text-stone-300 mx-auto" />
            <p className="text-sm font-semibold">কোনো পেজ পাওয়া যায়নি</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200/80 text-stone-600 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">ক্রম</th>
                  <th className="py-3 px-4">পেজের নাম</th>
                  <th className="py-3 px-4">স্ল্যাগ</th>
                  <th className="py-3 px-4 text-center">স্ট্যাটাস</th>
                  <th className="py-3 px-4 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {filteredPages.map((page, idx) => (
                  <tr key={page.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-stone-400 font-semibold">{page.displayOrder || idx + 1}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-stone-900 text-sm hover:text-[#D62828] transition">
                        <Link href={`/dashboard/pages/${page.id}`}>{page.title}</Link>
                      </div>
                      {page.subtitle && <div className="text-[11px] text-stone-400 truncate max-w-xs">{page.subtitle}</div>}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-red-800">/{page.slug}</td>
                    <td className="py-3.5 px-4 text-center">
                      <Badge variant="outline" className={page.status === "PUBLISHED" ? "border-red-300 bg-red-50 text-red-800 font-bold text-[10px]" : "border-amber-300 bg-amber-50 text-amber-800 font-bold text-[10px]"}>
                        {page.status === "PUBLISHED" ? "প্রকাশিত" : "ড্রাফট"}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link href={`/dashboard/pages/${page.id}`} title="বিস্তারিত পেজ দেখুন" className="p-1.5 rounded-lg text-stone-600 hover:text-[#D62828] hover:bg-stone-100 transition">
                          <Eye className="size-3.5" />
                        </Link>
                        <Link href={`/${page.slug === "home" ? "" : page.slug}`} target="_blank" title="লাইভ পেজ দেখুন" className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition">
                          <ExternalLink className="size-3.5" />
                        </Link>
                        <button type="button" onClick={() => openEditModal(page)} title="সম্পাদনা করুন" className="p-1.5 rounded-lg text-red-700 hover:bg-red-50 transition cursor-pointer">
                          <Edit2 className="size-3.5" />
                        </button>
                        <button type="button" onClick={() => handleDelete(page.id, page.title)} title="মুছে ফেলুন" className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition cursor-pointer">
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

      <PageEditModal isOpen={modalOpen} onClose={() => setModalOpen(false)} editingPageId={editingPageId} formData={formData} setFormData={setFormData} isSubmitting={isCreating || isUpdating} onSubmit={handleSave} />
    </div>
  )
}
export default CmsPagesTab
