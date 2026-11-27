"use client"

import React from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { CmsModalTab } from "@/components/dashboard/cms/CmsModalTab"

export default function ModalCmsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="হোমপেজ পপআপ ও জরুরি নোটিশ (Modal CMS)"
        description="ওয়েবসাইটে প্রবেশের পর হোমপেজে প্রদর্শিত জরুরি মানবিক ঘোষণা ও পপআপ নোটিশ পরিচালনা"
        badge="জরুরি নোটিশ"
        badgeVariant="urgent"
      />
      <CmsModalTab />
    </div>
  )
}
