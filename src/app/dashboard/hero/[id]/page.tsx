"use client"

import React from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  Layers,
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Heart,
  Edit2,
  Trash2,
  ExternalLink,
  Loader2,
  Image as ImageIcon,
} from "lucide-react"
import {
  useGetAdminHeroSlideByIdQuery,
  useToggleAdminHeroSlideStatusMutation,
  useDeleteAdminHeroSlideMutation,
} from "@/store/api/adminApi"
import { DetailPageLayout } from "@/components/dashboard/DetailPageLayout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function HeroSlideDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const { data: slide, isLoading, isError, refetch } = useGetAdminHeroSlideByIdQuery(id, { skip: !id })
  const [toggleStatus, { isLoading: isToggling }] = useToggleAdminHeroSlideStatusMutation()
  const [deleteSlide, { isLoading: isDeleting }] = useDeleteAdminHeroSlideMutation()

  const handleToggle = async () => {
    if (!slide) return
    try {
      await toggleStatus(slide.id).unwrap()
      toast.success(slide.isActive ? "স্লাইড নিষ্ক্রিয় করা হয়েছে" : "স্লাইড সক্রিয় করা হয়েছে")
      refetch()
    } catch {
      toast.error("স্ট্যাটাস পরিবর্তন ব্যর্থ হয়েছে")
    }
  }

  const handleDelete = async () => {
    if (!slide) return
    if (!confirm("আপনি কি নিশ্চিতভাবে এই হিরো স্লাইডটি মুছে ফেলতে চান?")) return
    try {
      await deleteSlide(slide.id).unwrap()
      toast.success("হিরো স্লাইড সফলভাবে মুছে ফেলা হয়েছে")
      router.push("/dashboard/hero")
    } catch {
      toast.error("মুছে ফেলতে ব্যর্থ হয়েছে")
    }
  }

  return (
    <DetailPageLayout
      moduleTitle="হিরো স্লাইডার (Hero CMS)"
      moduleHref="/dashboard/hero"
      title={slide?.titleBn || "হিরো স্লাইডার বিস্তারিত"}
      subtitle={slide?.categoryBn || "মানবিক সহায়তা মিশন ব্যানার"}
      id={slide?.id}
      createdAt={slide?.createdAt}
      updatedAt={slide?.updatedAt}
      icon={Layers}
      isLoading={isLoading}
      isError={isError}
      badge={
        <div className="flex items-center gap-1.5">
          <Badge
            variant="outline"
            className={
              slide?.isActive
                ? "border-emerald-300 bg-emerald-50 text-emerald-800 text-xs font-bold"
                : "border-stone-300 bg-stone-100 text-stone-600 text-xs font-bold"
            }
          >
            {slide?.isActive ? "সক্রিয় স্লাইড" : "নিষ্ক্রিয়"}
          </Badge>
          <span className="text-xs bg-red-100 text-[#D62828] font-bold px-2 py-0.5 rounded-full">
            ক্রম: {slide?.displayOrder ?? 1}
          </span>
        </div>
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
            {slide?.isActive ? "নিষ্ক্রিয় করুন" : "সক্রিয় করুন"}
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
      {slide && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (8 cols): Panorama Banner & Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Live Panorama Hero Image with Overlaid Content */}
            <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden shadow-md border border-stone-200">
              <Image
                src={slide.imageUrl}
                alt={slide.titleBn}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#7f1d1d]/90 via-[#991b1b]/70 to-black/40 p-6 sm:p-8 flex flex-col justify-end text-white space-y-3">
                {slide.badgeBn && (
                  <span className="inline-block self-start text-[11px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-white border border-white/30">
                    {slide.badgeBn}
                  </span>
                )}
                <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight drop-shadow-sm">
                  {slide.titleBn}
                </h2>
                <p className="text-xs sm:text-sm text-stone-200 max-w-xl line-clamp-2 leading-relaxed">
                  {slide.subtitleBn}
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="px-4 py-2 rounded-xl bg-white text-[#D62828] text-xs font-bold flex items-center gap-1.5 shadow-md">
                    <Heart className="size-3.5 fill-current" />
                    <span>{slide.btnPrimaryBn || "অনুদান দিন"}</span>
                  </div>
                  <div className="px-4 py-2 rounded-xl border border-white/60 text-white text-xs font-bold flex items-center gap-1.5 bg-black/20">
                    <Search className="size-3.5" />
                    <span>{slide.btnSecondaryBn || "কার্যক্রম দেখুন"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bilingual Data Details */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
              <h3 className="text-sm font-bold text-stone-800 border-b border-stone-100 pb-3">
                শিরোনাম ও সাবটাইটেল বিবরণী (দ্বিভাষিক)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
                  <span className="text-[11px] text-stone-400 font-bold block">মূল শিরোনাম (বাংলা):</span>
                  <div className="font-bold text-stone-900 text-sm">{slide.titleBn}</div>
                </div>
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
                  <span className="text-[11px] text-stone-400 font-bold block">Title (English):</span>
                  <div className="font-bold text-stone-900 text-sm">{slide.titleEn || "প্রদান করা হয়নি"}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
                  <span className="text-[11px] text-stone-400 font-bold block">সাবটাইটেল / বিবরণ (বাংলা):</span>
                  <p className="text-stone-700 leading-relaxed">{slide.subtitleBn}</p>
                </div>
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
                  <span className="text-[11px] text-stone-400 font-bold block">Subtitle (English):</span>
                  <p className="text-stone-700 leading-relaxed">{slide.subtitleEn || "প্রদান করা হয়নি"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Configuration & Actions */}
          <div className="lg:col-span-4 space-y-6">
            {/* Buttons & Links Details */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider border-b border-stone-100 pb-2">
                বাটন ও নেভিগেশন লিংক
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-red-50/60 rounded-xl border border-red-100 space-y-1">
                  <span className="text-[11px] font-bold text-[#D62828] block">প্রাথমিক CTA বাটন:</span>
                  <div className="font-bold text-stone-900">{slide.btnPrimaryBn} / {slide.btnPrimaryEn}</div>
                  <div className="text-[11px] text-stone-500 font-mono">লিংক: {slide.btnPrimaryLink}</div>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
                  <span className="text-[11px] font-bold text-stone-600 block">দ্বিতীয় অ্যাকশন বাটন:</span>
                  <div className="font-bold text-stone-900">{slide.btnSecondaryBn} / {slide.btnSecondaryEn}</div>
                  <div className="text-[11px] text-stone-500 font-mono">লিংক: {slide.btnSecondaryLink}</div>
                </div>
              </div>
            </div>

            {/* Display Order & Category */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3 text-xs">
              <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider border-b border-stone-100 pb-2">
                স্লাইড সেটিংস ও কনফিগ
              </h3>

              <div className="flex items-center justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">প্রদর্শন ক্রম (Order):</span>
                <span className="font-bold font-mono text-stone-900">{slide.displayOrder}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">ক্যাটাগরি:</span>
                <span className="font-bold text-stone-900">{slide.categoryBn}</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-stone-500">স্ট্যাটাস:</span>
                <span className={slide.isActive ? "text-emerald-700 font-bold" : "text-stone-500 font-bold"}>
                  {slide.isActive ? "পাবলিক পেজে সক্রিয়" : "স্থগিত"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </DetailPageLayout>
  )
}
