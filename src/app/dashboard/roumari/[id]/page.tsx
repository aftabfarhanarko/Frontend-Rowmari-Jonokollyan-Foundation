"use client"

import React from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  MapPin,
  Phone,
  Calendar,
  Clock,
  ExternalLink,
  Edit2,
  Trash2,
  Loader2,
  Building,
} from "lucide-react"
import {
  useGetRoumariDirectoryByIdQuery,
  useDeleteRoumariDirectoryMutation,
} from "@/store/api/roumariApi"
import { DetailPageLayout } from "@/components/dashboard/DetailPageLayout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function RoumariItemDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const { data: item, isLoading, isError } = useGetRoumariDirectoryByIdQuery(id, { skip: !id })
  const [deleteDirectory, { isLoading: isDeleting }] = useDeleteRoumariDirectoryMutation()

  const handleDelete = async () => {
    if (!item) return
    const name = item.name || item.titleBn || "এই এন্ট্রি"
    if (!confirm(`আপনি কি নিশ্চিতভাবে '${name}' মুছে ফেলতে চান?`)) return
    try {
      await deleteDirectory(item.id).unwrap()
      toast.success("ডিরেক্টরি এন্ট্রি মুছে ফেলা হয়েছে")
      router.push("/dashboard/roumari")
    } catch {
      toast.error("মুছে ফেলতে ব্যর্থ হয়েছে")
    }
  }

  return (
    <DetailPageLayout
      moduleTitle="আমাদের রৌমারী পোর্টাল"
      moduleHref="/dashboard/roumari"
      title={item?.name || item?.titleBn || "ডিরেক্টরি বিস্তারিত"}
      subtitle={item?.category || "রৌমারী সেবা ও দর্শনীয় স্থান"}
      id={item?.id}
      createdAt={item?.createdAt}
      icon={MapPin}
      isLoading={isLoading}
      isError={isError}
      badge={
        <Badge variant="outline" className="border-red-200 bg-red-50 text-[#D62828] text-xs font-bold">
          {item?.category || "ডিরেক্টরি"}
        </Badge>
      }
      actions={
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
      }
    >
      {item && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (8 cols): Primary details */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                  {item.name || item.titleBn}
                </h2>
                {(item.titleEn || item.nameEn) && (
                  <p className="text-xs sm:text-sm text-stone-500 mt-1 font-medium">{item.titleEn || item.nameEn}</p>
                )}
              </div>

              {item.description && (
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-100 text-xs text-stone-700 leading-relaxed whitespace-pre-line">
                  {item.description}
                </div>
              )}

              {/* Contact info grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                <div className="p-3.5 bg-red-50/50 rounded-xl border border-red-100 space-y-1">
                  <span className="text-[11px] font-bold text-[#D62828] block">হটলাইন / মোবাইল নম্বর:</span>
                  <div className="font-mono font-bold text-stone-900 text-sm flex items-center gap-1.5">
                    <Phone className="size-3.5 text-[#D62828]" />
                    <span>{item.phoneNumber || item.hotline || "প্রদান করা হয়নি"}</span>
                  </div>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
                  <span className="text-[11px] font-bold text-stone-500 block">ঠিকানা ও ইউনিয়ন:</span>
                  <div className="font-semibold text-stone-800 flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-[#D62828]" />
                    <span>{item.address || "রৌমারী সদর"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Meta details */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3 text-xs">
              <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider border-b border-stone-100 pb-2">
                ডিরেক্টরি শ্রেণীবিভাগ
              </h3>

              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500">ক্যাটাগরি:</span>
                <span className="font-bold text-stone-900">{item.category}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500">জরুরি সেবা কিনা:</span>
                <span className={item.isEmergency ? "text-red-700 font-bold" : "text-stone-600 font-semibold"}>
                  {item.isEmergency ? "জরুরি সেবা (২৪/৭)" : "সাধারণ ডিরেক্টরি"}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5">
                <span className="text-stone-500">অনুমোদনের স্ট্যাটাস:</span>
                <span className="text-emerald-700 font-bold">প্রকাশিত</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </DetailPageLayout>
  )
}
