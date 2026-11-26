"use client"

import React from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { CmsPagesTab } from "@/components/dashboard/cms/CmsPagesTab"

export default function PagesCmsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="পাবলিক পেজ ম্যানেজমেন্ট (CMS)"
        description="হোম, আমাদের কথা, যোগাযোগ, পলিসি ইত্যাদি ওয়েবসাইটের পাবলিক পেজ কন্টেন্ট সম্পাদন"
        badge="CMS মডিউল"
        badgeVariant="info"
      />
      <CmsPagesTab />
    </div>
  )
}
