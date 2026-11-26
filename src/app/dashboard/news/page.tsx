"use client"

import React from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { CmsNewsTab } from "@/components/dashboard/cms/CmsNewsTab"

export default function NewsCmsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="নিউজ ও নোটিশ বোর্ড"
        description="ফাউন্ডেশনের সংবাদ, প্রেস বিজ্ঞপ্তি, জরুরি নোটিশ ও ইভেন্ট প্রকাশনা"
        badge="বিজ্ঞপ্তি ও খবর"
        badgeVariant="default"
      />
      <CmsNewsTab />
    </div>
  )
}
