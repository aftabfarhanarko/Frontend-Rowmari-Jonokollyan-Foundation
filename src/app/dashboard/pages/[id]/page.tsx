"use client"

import React, { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  FileText,
  Calendar,
  Clock,
  Globe,
  Edit2,
  Trash2,
  ExternalLink,
  Loader2,
  CheckCircle2,
  Layers,
} from "lucide-react"
import {
  useGetAdminPageByIdQuery,
  useUpdatePageMutation,
  useDeletePageMutation,
} from "@/store/api/adminApi"
import { DetailPageLayout } from "@/components/dashboard/DetailPageLayout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function CMSPageDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const { data: page, isLoading, isError, refetch } = useGetAdminPageByIdQuery(id, { skip: !id })
  const [updatePage, { isLoading: isUpdating }] = useUpdatePageMutation()
  const [deletePage, { isLoading: isDeleting }] = useDeletePageMutation()

  const handleTogglePublish = async () => {
    if (!page) return
    const nextStatus = page.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED"
    try {
      await updatePage({ id: page.id, data: { status: nextStatus } }).unwrap()
      toast.success(nextStatus === "PUBLISHED" ? "পেজটি সফলভাবে প্রকাশিত হয়েছে" : "পেজটি ড্রাফটে নেওয়া হয়েছে")
      refetch()
    } catch {
      toast.error("স্ট্যাটাস পরিবর্তন ব্যর্থ হয়েছে")
    }
  }

  const handleDelete = async () => {
    if (!page) return
    if (page.isSystemPage) {
      toast.error("সিস্টেম পেজ মুছে ফেলা যাবে না")
      return
    }
    if (!confirm(`আপনি কি নিশ্চিতভাবে '${page.title}' পেজটি মুছে ফেলতে চান?`)) return
    try {
      await deletePage(page.id).unwrap()
      toast.success("পেজটি মুছে ফেলা হয়েছে")
      router.push("/dashboard/pages")
    } catch {
      toast.error("মুছে ফেলতে ব্যর্থ হয়েছে")
    }
  }

  return (
    <DetailPageLayout
      moduleTitle="পাবলিক পেজ ম্যানেজমেন্ট (CMS)"
      moduleHref="/dashboard/pages"
      title={page?.title || "পেজ বিস্তারিত"}
      subtitle={page?.subtitle || `স্লাগ: /${page?.slug}`}
      id={page?.id}
      createdAt={page?.createdAt}
      updatedAt={page?.updatedAt}
      icon={FileText}
      isLoading={isLoading}
      isError={isError}
      badge={
        <div className="flex items-center gap-1.5">
          <Badge
            variant="outline"
            className={
              page?.status === "PUBLISHED"
                ? "border-emerald-300 bg-emerald-50 text-emerald-800 text-xs font-bold"
                : "border-stone-300 bg-stone-100 text-stone-600 text-xs font-bold"
            }
          >
            {page?.status === "PUBLISHED" ? "প্রকাশিত" : "ড্রাফট"}
          </Badge>
          {page?.isSystemPage && (
            <span className="text-xs bg-red-100 text-[#D62828] font-bold px-2 py-0.5 rounded-full">
              সিস্টেম পেজ
            </span>
          )}
        </div>
      }
      actions={
        <>
          <Button
            type="button"
            variant="outline"
            disabled={isUpdating}
            onClick={handleTogglePublish}
            className="text-xs"
          >
            {isUpdating ? <Loader2 className="size-3.5 animate-spin mr-1" /> : null}
            {page?.status === "PUBLISHED" ? "ড্রাফটে নিন" : "প্রকাশ করুন"}
          </Button>

          {!page?.isSystemPage && (
            <Button
              type="button"
              variant="outline"
              disabled={isDeleting}
              onClick={handleDelete}
              className="border-red-200 text-red-700 hover:bg-red-50 text-xs"
            >
              {isDeleting ? <Loader2 className="size-3.5 animate-spin mr-1" /> : <Trash2 className="size-3.5 mr-1" />}
              মুছে ফেলুন
            </Button>
          )}

          {page?.slug && (
            <a
              href={`/${page.slug}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-[#D62828] text-white text-xs font-bold hover:bg-[#B91C1C] transition shadow-xs"
            >
              <span>পাবলিক পেজ দেখুন</span>
              <ExternalLink className="size-3.5" />
            </a>
          )}
        </>
      }
    >
      {page && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (8 cols): Content Body */}
          <div className="lg:col-span-8 space-y-6">
            {page.bannerImageUrl && (
              <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-stone-200 shadow-xs">
                <Image
                  src={page.bannerImageUrl}
                  alt={page.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
              </div>
            )}

            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-stone-800 border-b border-stone-100 pb-2">
                পেজ কন্টেন্ট ও বিবরণ
              </h3>

              {page.description && (
                <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-600 font-medium">
                  {page.description}
                </div>
              )}

              <div className="prose prose-sm max-w-none text-stone-800 leading-relaxed whitespace-pre-line bg-stone-50/50 p-4 rounded-xl border border-stone-100">
                {page.content}
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): SEO & System Meta */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3 text-xs">
              <div className="flex items-center gap-2 pb-2 border-b border-stone-100 font-bold text-stone-800">
                <Globe className="size-4 text-[#D62828]" />
                <span>এসইও ও মেটাট্যাগ (SEO Meta)</span>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-stone-400 font-medium">এসইও শিরোনাম (SEO Title):</span>
                <div className="font-semibold text-stone-800">{page.seoTitle || page.title}</div>
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-[11px] text-stone-400 font-medium">এসইও বিবরণ (Meta Description):</span>
                <div className="text-stone-600 leading-relaxed">
                  {page.seoDescription || page.description || "কোনো মেটা বিবরণ নেই"}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3 text-xs">
              <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider border-b border-stone-100 pb-2">
                সিস্টেম বিবরণী
              </h3>

              <div className="flex items-center justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">রাউট স্লাগ:</span>
                <span className="font-mono font-bold text-stone-900">/{page.slug}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">ক্রম (Display Order):</span>
                <span className="font-mono font-bold text-stone-900">{page.displayOrder}</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-stone-500">সিস্টেম পেজ কিনা:</span>
                <span className="font-bold text-stone-800">{page.isSystemPage ? "হ্যাঁ (সংরক্ষিত)" : "না (কাস্টম)"}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </DetailPageLayout>
  )
}
