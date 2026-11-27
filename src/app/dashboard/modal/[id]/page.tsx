"use client"

import React, { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  Megaphone,
  Calendar,
  Clock,
  Phone,
  MapPin,
  Heart,
  CheckCircle2,
  XCircle,
  Edit2,
  Trash2,
  ExternalLink,
  Loader2,
  FileText,
} from "lucide-react"
import {
  useGetAdminNoticeModalByIdQuery,
  useUpdateAdminNoticeModalMutation,
  useToggleAdminNoticeModalStatusMutation,
  useDeleteAdminNoticeModalMutation,
} from "@/store/api/adminApi"
import { DetailPageLayout } from "@/components/dashboard/DetailPageLayout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function NoticeModalDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const { data: modal, isLoading, isError, refetch } = useGetAdminNoticeModalByIdQuery(id, { skip: !id })
  const [toggleStatus, { isLoading: isToggling }] = useToggleAdminNoticeModalStatusMutation()
  const [deleteModal, { isLoading: isDeleting }] = useDeleteAdminNoticeModalMutation()

  const handleToggle = async () => {
    if (!modal) return
    try {
      await toggleStatus(modal.id).unwrap()
      toast.success(modal.isActive ? "পপআপ নোটিশ নিষ্ক্রিয় করা হয়েছে" : "পপআপ নোটিশ সক্রিয় করা হয়েছে")
      refetch()
    } catch {
      toast.error("স্ট্যাটাস পরিবর্তন ব্যর্থ হয়েছে")
    }
  }

  const handleDelete = async () => {
    if (!modal) return
    if (!confirm("আপনি কি নিশ্চিতভাবে এই পপআপ নোটিশটি মুছে ফেলতে চান?")) return
    try {
      await deleteModal(modal.id).unwrap()
      toast.success("পপআপ নোটিশ সফলভাবে মুছে ফেলা হয়েছে")
      router.push("/dashboard/modal")
    } catch {
      toast.error("মুছে ফেলতে ব্যর্থ হয়েছে")
    }
  }

  return (
    <DetailPageLayout
      moduleTitle="পপআপ নোটিশ (Modal CMS)"
      moduleHref="/dashboard/modal"
      title={modal?.title || "পপআপ নোটিশ বিস্তারিত"}
      subtitle={modal?.headerTitle || "জরুরি জনকল্যাণ নোটিশ ও ঘোষণা"}
      id={modal?.id}
      createdAt={modal?.createdAt}
      updatedAt={modal?.updatedAt}
      icon={Megaphone}
      isLoading={isLoading}
      isError={isError}
      badge={
        <Badge
          variant="outline"
          className={
            modal?.isActive
              ? "border-emerald-300 bg-emerald-50 text-emerald-800 text-xs font-bold"
              : "border-stone-300 bg-stone-100 text-stone-600 text-xs font-bold"
          }
        >
          {modal?.isActive ? "সক্রিয় নোটিশ" : "নিষ্ক্রিয়"}
        </Badge>
      }
      actions={
        <>
          <Button
            type="button"
            variant="outline"
            disabled={isToggling}
            onClick={handleToggle}
            className="text-xs"
          >
            {isToggling ? <Loader2 className="size-3.5 animate-spin mr-1" /> : null}
            {modal?.isActive ? "নিষ্ক্রিয় করুন" : "সক্রিয় করুন"}
          </Button>

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
        </>
      }
    >
      {modal && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (8 cols): Content & Visual Preview */}
          <div className="lg:col-span-8 space-y-6">
            {/* Banner Image Preview if present */}
            {modal.imageUrl && (modal.imageUrl.startsWith("http://") || modal.imageUrl.startsWith("https://") || modal.imageUrl.startsWith("/")) && (
              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
                <div className="p-4 border-b border-stone-100 flex items-center justify-between text-xs font-bold text-stone-700">
                  <span>সংযুক্ত নোটিশ ব্যানার ছবি</span>
                  <a
                    href={modal.imageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#D62828] hover:underline flex items-center gap-1"
                  >
                    <span>মূল ছবি দেখুন</span>
                    <ExternalLink className="size-3" />
                  </a>
                </div>
                <div className="relative w-full h-64 sm:h-80 bg-stone-100">
                  <Image
                    src={modal.imageUrl}
                    alt={modal.title}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
              </div>
            )}

            {/* Content Details */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
              <div>
                {modal.badge && (
                  <span className="inline-block text-xs font-bold text-[#D62828] bg-red-50 border border-red-200 px-3 py-1 rounded-full mb-3">
                    {modal.badge}
                  </span>
                )}
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                  {modal.title}
                </h2>
              </div>

              <div className="prose prose-sm max-w-none text-stone-700 leading-relaxed bg-stone-50/70 p-4 rounded-xl border border-stone-100">
                <p className="whitespace-pre-line text-sm">{modal.description}</p>
              </div>

              {/* Action Buttons in Modal */}
              <div className="pt-2 border-t border-stone-100 space-y-2">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                  পপআপে প্রদর্শিত অ্যাকশন বাটনসমূহ:
                </span>
                <div className="flex flex-wrap gap-3">
                  {modal.primaryBtnText && (
                    <div className="px-4 py-2 rounded-xl bg-[#D62828] text-white text-xs font-bold flex items-center gap-2 shadow-xs">
                      <Heart className="size-3.5 fill-current" />
                      <span>{modal.primaryBtnText}</span>
                      <span className="text-[10px] text-white/70 font-mono">({modal.primaryBtnLink})</span>
                    </div>
                  )}
                  {modal.secondaryBtnText && (
                    <div className="px-4 py-2 rounded-xl border border-stone-300 text-stone-800 text-xs font-bold flex items-center gap-2 bg-white">
                      <span>{modal.secondaryBtnText}</span>
                      <span className="text-[10px] text-stone-400 font-mono">({modal.secondaryBtnLink})</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Schedule & Metadata */}
          <div className="lg:col-span-4 space-y-6">
            {/* Scheduling & Timing Card */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-stone-100 font-bold text-stone-800 text-sm">
                <Clock className="size-4 text-[#D62828]" />
                <span>সময়সীমা ও প্রদর্শন শিডিউল</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
                  <span className="text-stone-400 text-[11px] block">শুরুর তারিখ ও সময়:</span>
                  <span className="font-semibold text-stone-800">
                    {modal.startDate ? new Date(modal.startDate).toLocaleString("bn-BD") : "তাৎক্ষণিক (কোনো শুরু নির্ধারণ নেই)"}
                  </span>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
                  <span className="text-stone-400 text-[11px] block">মেয়াদ শেষ (Expiration):</span>
                  <span className="font-semibold text-stone-800">
                    {modal.endDate ? new Date(modal.endDate).toLocaleString("bn-BD") : "সীমাহীন (স্থায়ীভাবে চলমান)"}
                  </span>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
                  <span className="text-stone-400 text-[11px] block">প্রদর্শন ফ্রিকোয়েন্সি:</span>
                  <span className="font-bold text-[#D62828]">
                    {modal.displayFrequency === "ONCE_PER_DAY" ? "দৈনিক একবার (প্রতি ভিজিটে ২৪ ঘণ্টায় একবার)" : "সর্বদা প্রদর্শিত"}
                  </span>
                </div>
              </div>
            </div>

            {/* Helpline & Location Card */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-stone-100 font-bold text-stone-800 text-sm">
                <Phone className="size-4 text-[#D62828]" />
                <span>হটলাইন ও যোগাযোগের তথ্য</span>
              </div>

              <div className="space-y-3 text-xs">
                {modal.hotline && (
                  <div className="flex items-center gap-2 text-stone-800">
                    <Phone className="size-3.5 text-[#D62828]" />
                    <span className="font-mono font-bold">{modal.hotline}</span>
                  </div>
                )}
                {modal.address && (
                  <div className="flex items-start gap-2 text-stone-600">
                    <MapPin className="size-3.5 text-[#D62828] shrink-0 mt-0.5" />
                    <span>{modal.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </DetailPageLayout>
  )
}
