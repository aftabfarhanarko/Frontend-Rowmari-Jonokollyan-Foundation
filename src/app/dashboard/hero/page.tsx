"use client"

import React from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { CmsHeroTab } from "@/components/dashboard/cms/CmsHeroTab"

export default function HeroCmsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="হোমপেজ হিরো স্লাইডার (Hero CMS)"
        description="ওয়েবসাইটের প্রধান ব্যানারের ছবি, শিরোনাম, সাবটাইটেল, বাটন ও প্রদর্শন ক্রম পরিচালনা"
        badge="হিরো ব্যানার"
        badgeVariant="info"
      />
      <CmsHeroTab />
    </div>
  )
}
