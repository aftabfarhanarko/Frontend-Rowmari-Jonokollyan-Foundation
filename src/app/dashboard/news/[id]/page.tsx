"use client"

import React from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  Newspaper,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Trash2,
  FileText,
} from "lucide-react"
import {
  useGetAdminNewsEventByIdQuery,
} from "@/store/api/adminApi"
import { DetailPageLayout } from "@/components/dashboard/DetailPageLayout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function NewsEventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const { data: news, isLoading, isError } = useGetAdminNewsEventByIdQuery(id, { skip: !id })

  return (
    <DetailPageLayout
      moduleTitle="নিউজ ও নোটিশ বোর্ড"
      moduleHref="/dashboard/news"
      title={news?.title || "সংবাদ বিস্তারিত"}
      subtitle={news?.summary || `টাইপ: ${news?.type === "NEWS" ? "সংবাদ ও খবর" : "ইভেন্ট / বিজ্ঞপ্তি"}`}
      id={news?.id}
      createdAt={news?.createdAt}
      icon={Newspaper}
      isLoading={isLoading}
      isError={isError}
      badge={
        <Badge
          variant="outline"
          className={
            news?.type === "NEWS"
              ? "border-blue-300 bg-blue-50 text-blue-800 text-xs font-bold"
              : "border-purple-300 bg-purple-50 text-purple-800 text-xs font-bold"
          }
        >
          {news?.type === "NEWS" ? "সংবাদ" : "ইভেন্ট / বিজ্ঞপ্তি"}
        </Badge>
      }
      actions={
        news?.slug && (
          <a
            href={`/news/${news.slug}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#D62828] text-white text-xs font-bold hover:bg-[#B91C1C] transition shadow-xs"
          >
            <span>পাবলিক ভিউ</span>
            <ExternalLink className="size-3.5" />
          </a>
        )
      }
    >
      {news && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (8 cols): Article Content & Image */}
          <div className="lg:col-span-8 space-y-6">
            {news.imageUrl && (news.imageUrl.startsWith("http://") || news.imageUrl.startsWith("https://") || news.imageUrl.startsWith("/")) && (
              <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden border border-stone-200 shadow-xs bg-stone-100">
                <Image
                  src={news.imageUrl}
                  alt={news.title}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
              </div>
            )}

            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                {news.title}
              </h2>

              {news.summary && (
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-100 text-xs text-stone-700 font-medium leading-relaxed">
                  <span className="font-bold text-stone-900 block mb-1">সংক্ষিপ্ত সারসংক্ষেপ:</span>
                  {news.summary}
                </div>
              )}

              <div className="prose prose-sm max-w-none text-stone-800 leading-relaxed whitespace-pre-line">
                {news.content}
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Meta details */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3 text-xs">
              <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider border-b border-stone-100 pb-2">
                প্রকাশনা বিবরণী
              </h3>

              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500">ধরণ:</span>
                <span className="font-bold text-stone-900">
                  {news.type === "NEWS" ? "প্রেস ও সংবাদ প্রকাশনা" : "অফিসিয়াল ইভেন্ট"}
                </span>
              </div>

              {news.location && (
                <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                  <span className="text-stone-500">স্থান:</span>
                  <span className="font-semibold text-stone-800">{news.location}</span>
                </div>
              )}

              {news.startDate && (
                <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                  <span className="text-stone-500">ইভেন্ট তারিখ:</span>
                  <span className="font-semibold text-stone-800">
                    {new Date(news.startDate).toLocaleDateString("bn-BD")}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between py-1.5">
                <span className="text-stone-500">স্লাগ:</span>
                <span className="font-mono text-stone-700">/{news.slug}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </DetailPageLayout>
  )
}
