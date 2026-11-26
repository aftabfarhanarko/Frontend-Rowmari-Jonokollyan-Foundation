"use client"

import React from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { CmsGalleryTab } from "@/components/dashboard/cms/CmsGalleryTab"

export default function GalleryCmsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="গ্যালারি ও মিডিয়া ফাইলস"
        description="ফাউন্ডেশনের বিভিন্ন ইভেন্ট ও ফিল্ড অপারেশনের ছবি এবং মিডিয়া ফাইল লাইব্রেরি"
        badge="মিডিয়া ব্যাংক"
        badgeVariant="default"
      />
      <CmsGalleryTab />
    </div>
  )
}
