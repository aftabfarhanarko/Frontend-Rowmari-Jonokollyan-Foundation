"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, AlertTriangle, Calendar, Clock, Copy, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface DetailPageLayoutProps {
  moduleTitle: string
  moduleHref: string
  title: string
  subtitle?: string
  badge?: React.ReactNode
  icon?: React.ElementType
  avatarUrl?: string
  id?: string
  createdAt?: string
  updatedAt?: string
  actions?: React.ReactNode
  isLoading?: boolean
  isError?: boolean
  errorMessage?: string
  children: React.ReactNode
}

export function DetailPageLayout({
  moduleTitle,
  moduleHref,
  title,
  subtitle,
  badge,
  icon: Icon,
  avatarUrl,
  id,
  createdAt,
  updatedAt,
  actions,
  isLoading,
  isError,
  errorMessage,
  children,
}: DetailPageLayoutProps) {
  const copyId = () => {
    if (id) {
      navigator.clipboard.writeText(id)
      toast.success("আইডি কপি করা হয়েছে!")
    }
  }

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
        <div className="h-6 w-56 bg-stone-200 animate-pulse rounded-md" />
        <div className="h-40 bg-white rounded-2xl border border-stone-200 animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="h-96 bg-white rounded-2xl border border-stone-200 animate-pulse lg:col-span-8" />
          <div className="h-96 bg-white rounded-2xl border border-stone-200 animate-pulse lg:col-span-4" />
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="p-12 text-center max-w-md mx-auto bg-white rounded-2xl border border-stone-200 shadow-sm mt-12 space-y-4">
        <div className="size-14 rounded-2xl bg-red-50 text-[#D62828] flex items-center justify-center mx-auto">
          <AlertTriangle className="size-7" />
        </div>
        <h2 className="text-lg font-bold text-stone-900">তথ্য খুঁজে পাওয়া যায়নি</h2>
        <p className="text-xs text-stone-500 leading-relaxed">
          {errorMessage || "অনুরোধকৃত রেকর্ডটি ডাটাবেজে উপস্থিত নেই বা মুছে ফেলা হয়েছে।"}
        </p>
        <div className="pt-2">
          <Link
            href={moduleHref}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D62828] text-white text-xs font-semibold hover:bg-[#B91C1C] transition shadow-xs"
          >
            <ArrowLeft className="size-3.5" />
            <span>{moduleTitle}-এ ফিরে যান</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* 1. Breadcrumbs & Top Back Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <Link href="/dashboard" className="hover:text-stone-900 transition">
            ড্যাশবোর্ড
          </Link>
          <span>/</span>
          <Link href={moduleHref} className="hover:text-stone-900 transition font-medium">
            {moduleTitle}
          </Link>
          <span>/</span>
          <span className="font-semibold text-stone-900 truncate max-w-xs">{title}</span>
        </div>

        <Link
          href={moduleHref}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition cursor-pointer"
        >
          <ArrowLeft className="size-3.5" />
          <span>তালিকায় ফিরে যান</span>
        </Link>
      </div>

      {/* 2. Unified Header Banner Card */}
      <div className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-4 min-w-0">
            {/* Visual Icon / Avatar */}
            {avatarUrl ? (
              <div className="relative size-14 sm:size-16 rounded-2xl overflow-hidden shrink-0 border border-stone-200 shadow-xs bg-stone-100">
                <Image
                  src={avatarUrl}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            ) : Icon ? (
              <div className="size-14 sm:size-16 rounded-2xl bg-red-50 text-[#D62828] border border-red-200/80 flex items-center justify-center shrink-0 shadow-xs">
                <Icon className="size-7" />
              </div>
            ) : (
              <div className="size-14 sm:size-16 rounded-2xl bg-red-100 text-[#D62828] font-black text-xl flex items-center justify-center shrink-0 border border-red-200">
                {title.slice(0, 1)}
              </div>
            )}

            {/* Title & Metadata */}
            <div className="space-y-1.5 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-stone-900 truncate max-w-xl">
                  {title}
                </h1>
                {badge}
              </div>

              {subtitle && (
                <p className="text-xs sm:text-sm text-stone-500 line-clamp-1">{subtitle}</p>
              )}

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-400 font-mono">
                {id && (
                  <button
                    onClick={copyId}
                    className="inline-flex items-center gap-1 hover:text-stone-700 transition"
                    title="আইডি কপি করতে ক্লিক করুন"
                  >
                    <Hash className="size-3" />
                    <span>ID: {id.slice(0, 8)}...</span>
                    <Copy className="size-2.5 opacity-60" />
                  </button>
                )}
                {createdAt && (
                  <span className="flex items-center gap-1 font-sans text-stone-500">
                    <Calendar className="size-3 text-stone-400" />
                    <span>তৈরি: {new Date(createdAt).toLocaleDateString("bn-BD")}</span>
                  </span>
                )}
                {updatedAt && (
                  <span className="flex items-center gap-1 font-sans text-stone-500">
                    <Clock className="size-3 text-stone-400" />
                    <span>হালনাগাদ: {new Date(updatedAt).toLocaleDateString("bn-BD")}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons Slot */}
          {actions && (
            <div className="flex flex-wrap items-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-stone-100 shrink-0">
              {actions}
            </div>
          )}
        </div>
      </div>

      {/* 3. Main Content Slot */}
      {children}
    </div>
  )
}
