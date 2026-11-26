"use client"

import React from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { CmsActivityLogsTab } from "@/components/dashboard/cms/CmsActivityLogsTab"

export default function ActivityLogsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="সিস্টেম অ্যাক্টিভিটি অডিট ও লগ"
        description="ফাউন্ডেশনের প্রশাসনিক ক্রিয়াকলাপের অপরিবর্তনীয় অডিট লগ ও নিরাপত্তা ট্র্যাকিং"
        badge="নিরাপত্তা অডিট"
        badgeVariant="default"
      />
      <CmsActivityLogsTab />
    </div>
  )
}
