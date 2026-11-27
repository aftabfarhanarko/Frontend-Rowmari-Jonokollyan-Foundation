"use client"

import React from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  HeartHandshake,
  Target,
  Calendar,
  Layers,
  Sparkles,
  TrendingUp,
  ExternalLink,
  Edit,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { DetailPageLayout } from "@/components/dashboard/DetailPageLayout"
import { useGetCampaignByIdQuery } from "@/store/api/campaignsApi"
import { Button } from "@/components/ui/button"

export default function CampaignDetailPage() {
  const params = useParams()
  const id = params?.id as string

  const { data: campaign, isLoading, isError } = useGetCampaignByIdQuery(id, {
    skip: !id,
  })

  const target = Number(campaign?.targetAmount || 0)
  const raised = Number(campaign?.raisedAmount || 0)
  const progressPercent = target > 0 ? Math.min(100, Math.round((raised / target) * 100)) : 0

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "ACTIVE":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle className="size-3.5" /> সক্রিয় (Active)
          </span>
        )
      case "COMPLETED":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <CheckCircle className="size-3.5" /> সম্পন্ন (Completed)
          </span>
        )
      case "SUSPENDED":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
            <AlertCircle className="size-3.5" /> স্থগিত (Suspended)
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-stone-100 text-stone-600 border border-stone-200">
            <Clock className="size-3.5" /> খসড়া (Draft)
          </span>
        )
    }
  }

  return (
    <DetailPageLayout
      moduleTitle="ক্যাম্পেইন ও তহবিল সংগ্রহ"
      moduleHref="/dashboard/campaigns"
      title={campaign?.title || "ক্যাম্পেইন বিবরণ"}
      subtitle={campaign?.category ? `ক্যাটাগরি: ${campaign.category}` : undefined}
      badge={getStatusBadge(campaign?.status)}
      icon={HeartHandshake}
      id={campaign?.id || id}
      createdAt={campaign?.createdAt}
      updatedAt={campaign?.updatedAt}
      isLoading={isLoading}
      isError={isError}
      actions={
        <div className="flex items-center gap-2">
          {campaign?.slug && (
            <Link
              href={`/campaigns/${campaign.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition"
            >
              <ExternalLink className="size-3.5 mr-1" /> লাইভ পেজ দেখুন
            </Link>
          )}
          <Link
            href="/dashboard/campaigns"
            className="inline-flex items-center px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition"
          >
            তালিকায় ফিরুন
          </Link>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Banner Image */}
          {campaign?.bannerImageUrl && (campaign.bannerImageUrl.startsWith("http://") || campaign.bannerImageUrl.startsWith("https://") || campaign.bannerImageUrl.startsWith("/")) && (
            <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-stone-200 shadow-xs bg-stone-100">
              <Image
                src={campaign.bannerImageUrl}
                alt={campaign.title}
                fill
                priority
                unoptimized
                className="object-cover"
              />
            </div>
          )}

          {/* Description */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-stone-900 pb-3 border-b border-stone-100">
              ক্যাম্পেইনের বিস্তারিত বিবরণ
            </h3>
            <div className="text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-wrap">
              {campaign?.description || "কোনো বিবরণ প্রদান করা হয়নি।"}
            </div>
          </div>

          {/* Updates Section */}
          {campaign?.updates && campaign.updates.length > 0 && (
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-stone-900 pb-3 border-b border-stone-100 flex items-center gap-2">
                <TrendingUp className="size-4 text-[#D62828]" />
                ক্যাম্পেইন অগ্রগতি ও আপডেট
              </h3>

              <div className="space-y-4">
                {campaign.updates.map((update: any, idx: number) => (
                  <div
                    key={update.id || idx}
                    className="p-4 rounded-xl border border-stone-100 bg-stone-50/50 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-stone-900">{update.title}</h4>
                      <span className="text-[10px] text-stone-400">
                        {update.createdAt ? new Date(update.createdAt).toLocaleDateString("bn-BD") : ""}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">{update.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Cards (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Funding Progress Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider pb-3 border-b border-stone-100 flex items-center gap-2">
              <Target className="size-4 text-[#D62828]" />
              তহবিল সংগ্রহের অগ্রগতি
            </h4>

            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-black text-[#D62828]">
                  ৳ {raised.toLocaleString("bn-BD")}
                </span>
                <span className="text-xs font-bold text-stone-500">
                  {progressPercent}% সংগৃহীত
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-stone-100 rounded-full h-3 overflow-hidden border border-stone-200">
                <div
                  className="bg-gradient-to-r from-[#D62828] to-[#B91C1C] h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="flex justify-between text-xs text-stone-500 pt-1">
                <span>লক্ষ্যমাত্রা: ৳ {target.toLocaleString("bn-BD")}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-500">ক্যাটাগরি:</span>
                <span className="font-semibold text-stone-900">{campaign?.category || "সাধারণ"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">ফিচার্ড ক্যাম্পেইন:</span>
                <span className="font-semibold text-stone-900">
                  {campaign?.isFeatured ? "হ্যাঁ (Featured)" : "না"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">শুরুর তারিখ:</span>
                <span className="font-semibold text-stone-900">
                  {campaign?.startDate ? new Date(campaign.startDate).toLocaleDateString("bn-BD") : "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">শেষের তারিখ:</span>
                <span className="font-semibold text-stone-900">
                  {campaign?.endDate ? new Date(campaign.endDate).toLocaleDateString("bn-BD") : "চলমান"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DetailPageLayout>
  )
}
