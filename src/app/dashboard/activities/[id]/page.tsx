"use client"

import React from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  Activity as ActivityIcon,
  MapPin,
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  FileText,
  Clock,
  Sparkles,
  ArrowLeft,
} from "lucide-react"
import { DetailPageLayout } from "@/components/dashboard/DetailPageLayout"
import { useGetActivityByIdQuery } from "@/store/api/activitiesApi"
import { Button } from "@/components/ui/button"

export default function ActivityDetailPage() {
  const params = useParams()
  const id = params?.id as string

  const { data: activity, isLoading, isError } = useGetActivityByIdQuery(id, {
    skip: !id,
  })

  const isPublished = activity?.isPublished !== false
  const cover = activity?.coverImageUrl || activity?.imageUrl

  return (
    <DetailPageLayout
      moduleTitle="প্রজেক্ট ও কার্যক্রম"
      moduleHref="/dashboard/activities"
      title={activity?.title || activity?.titleBn || "কার্যক্রমের বিবরণ"}
      subtitle={
        activity?.location
          ? `স্থান: ${activity.location}`
          : activity?.category
          ? `বিভাগ: ${activity.category}`
          : undefined
      }
      badge={
        <span
          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
            isPublished
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-stone-100 text-stone-600 border border-stone-200"
          }`}
        >
          {isPublished ? <CheckCircle className="size-3.5" /> : <Clock className="size-3.5" />}
          {isPublished ? "প্রকাশিত (Published)" : "অপ্রকাশিত (Draft)"}
        </span>
      }
      icon={ActivityIcon}
      id={activity?.id || id}
      createdAt={activity?.createdAt}
      updatedAt={activity?.updatedAt}
      isLoading={isLoading}
      isError={isError}
      actions={
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/activities"
            className="inline-flex items-center px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition"
          >
            তালিকায় ফিরুন
          </Link>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Details (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Cover Image */}
          {cover && (
            <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-stone-200 shadow-xs bg-stone-100">
              <Image
                src={cover}
                alt={activity.title || "Activity"}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}

          {/* Summary */}
          {activity?.summary && (
            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 shadow-xs">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Sparkles className="size-4 text-[#D62828]" /> সারাংশ / সংক্ষেপ
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                {activity.summary}
              </p>
            </div>
          )}

          {/* Full Content */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-stone-900 pb-3 border-b border-stone-100 flex items-center gap-2">
              <FileText className="size-4 text-[#D62828]" />
              কার্যক্রমের সম্পূর্ণ প্রতিবেদন ও বিবরণ
            </h3>

            <div className="text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-wrap">
              {activity?.content || activity?.description || activity?.descriptionBn || "কোনো বিবরণ প্রদান করা হয়নি।"}
            </div>
          </div>
        </div>

        {/* Sidebar Info (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider pb-3 border-b border-stone-100">
              কার্যক্রমের তথ্যাবলি
            </h4>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="size-8 rounded-xl bg-red-50 text-[#D62828] flex items-center justify-center shrink-0">
                  <Calendar className="size-4" />
                </div>
                <div>
                  <p className="text-[10px] text-stone-400">কার্যক্রমের তারিখ</p>
                  <p className="text-xs font-bold text-stone-900">
                    {activity?.activityDate
                      ? new Date(activity.activityDate).toLocaleDateString("bn-BD")
                      : activity?.dateBn || "—"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="size-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <MapPin className="size-4" />
                </div>
                <div>
                  <p className="text-[10px] text-stone-400">স্থান ও এলাকা</p>
                  <p className="text-xs font-bold text-stone-900">
                    {activity?.location || activity?.locationBn || "রৌমারী, কুড়িগ্রাম"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="size-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Users className="size-4" />
                </div>
                <div>
                  <p className="text-[10px] text-stone-400">উপকৃত মানুষের সংখ্যা</p>
                  <p className="text-sm font-extrabold text-stone-900">
                    {activity?.beneficiariesCount
                      ? `${Number(activity.beneficiariesCount).toLocaleString("bn-BD")} জন`
                      : "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DetailPageLayout>
  )
}
