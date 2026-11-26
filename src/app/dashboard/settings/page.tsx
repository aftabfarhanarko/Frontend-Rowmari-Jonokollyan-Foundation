"use client"

import React from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { CmsSettingsTab } from "@/components/dashboard/cms/CmsSettingsTab"

export default function SettingsDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="ওয়েবসাইট সেটিংস ও এসইও"
        description="ফাউন্ডেশনের সাধারণ সেটিংস, যোগাযোগের তথ্য, সামাজিক মাধ্যম ও গ্লোবাল এসইও কনফিগারেশন"
        badge="গ্লোবাল কনফিগ"
        badgeVariant="default"
      />
      <CmsSettingsTab />
    </div>
  )
}
