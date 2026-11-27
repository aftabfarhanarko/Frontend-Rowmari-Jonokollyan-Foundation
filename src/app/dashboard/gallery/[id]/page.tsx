"use client"

import React from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  Image as ImageIcon,
  Calendar,
  ExternalLink,
  Trash2,
  Copy,
  Tag,
  Loader2,
} from "lucide-react"
import {
  useGetAdminGalleryByIdQuery,
  useDeleteAdminMediaMutation,
} from "@/store/api/adminApi"
import { DetailPageLayout } from "@/components/dashboard/DetailPageLayout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function GalleryItemDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const { data: item, isLoading, isError } = useGetAdminGalleryByIdQuery(id, { skip: !id })
  const [deleteMedia, { isLoading: isDeleting }] = useDeleteAdminMediaMutation()

  const copyUrl = () => {
    if (item?.imageUrl) {
      navigator.clipboard.writeText(item.imageUrl)
      toast.success("ছবির সরাসরি লিংক কপি করা হয়েছে!")
    }
  }

  const handleDelete = async () => {
    if (!item) return
    if (!confirm("আপনি কি নিশ্চিতভাবে এই ছবিটি মুছে ফেলতে চান?")) return
    try {
      await deleteMedia(item.id).unwrap()
      toast.success("ছবিটি সফলভাবে মুছে ফেলা হয়েছে")
      router.push("/dashboard/gallery")
    } catch {
      toast.error("মুছে ফেলতে ব্যর্থ হয়েছে")
    }
  }

  return (
    <DetailPageLayout
      moduleTitle="গ্যালারি ও মিডিয়া ফাইলস"
      moduleHref="/dashboard/gallery"
      title={item?.title || "মিডিয়া বিস্তারিত"}
      subtitle={item?.category ? `ক্যাটাগরি: ${item.category}` : undefined}
      id={item?.id}
      createdAt={item?.createdAt}
      icon={ImageIcon}
      isLoading={isLoading}
      isError={isError}
      badge={
        item?.category ? (
          <Badge variant="outline" className="border-red-200 bg-red-50 text-[#D62828] text-xs font-bold">
            {item.category}
          </Badge>
        ) : null
      }
      actions={
        <>
          <Button
            type="button"
            variant="outline"
            onClick={copyUrl}
            className="text-xs gap-1"
          >
            <Copy className="size-3.5" />
            <span>লিংক কপি</span>
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
      {item && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (8 cols): Full Resolution Image Preview */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs">
              <div className="relative w-full h-96 sm:h-[480px] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                {item.imageUrl && (item.imageUrl.startsWith("http://") || item.imageUrl.startsWith("https://") || item.imageUrl.startsWith("/")) ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    unoptimized
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 800px"
                  />
                ) : null}
              </div>

              {item.caption && (
                <div className="p-4 mt-3 bg-stone-50 rounded-xl text-xs text-stone-700 font-medium">
                  <span className="font-bold text-stone-900 block mb-1">ক্যাপশন:</span>
                  {item.caption}
                </div>
              )}
            </div>
          </div>

          {/* Right Column (4 cols): Metadata */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3 text-xs">
              <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider border-b border-stone-100 pb-2">
                মিডিয়া ফাইল তথ্য
              </h3>

              <div className="space-y-1">
                <span className="text-[11px] text-stone-400 font-medium">শিরোনাম:</span>
                <div className="font-bold text-stone-900 text-sm">{item.title}</div>
              </div>

              <div className="space-y-1 pt-2">
                <span className="text-[11px] text-stone-400 font-medium">ক্যাটাগরি:</span>
                <div className="font-semibold text-stone-800">{item.category || "সাধারণ গ্যালারি"}</div>
              </div>

              <div className="space-y-1 pt-2">
                <span className="text-[11px] text-stone-400 font-medium">সরাসরি ইমেজ URL:</span>
                <div className="p-2 bg-stone-50 rounded-lg border border-stone-200 font-mono text-[10px] text-stone-600 break-all">
                  {item.imageUrl}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DetailPageLayout>
  )
}
