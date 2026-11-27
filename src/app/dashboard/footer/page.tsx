"use client"

import React from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { CmsFooterTab } from "@/components/dashboard/cms/CmsFooterTab"

export default function FooterCmsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="ওয়েবসাইট ফুটার ও যোগাযোগ সেটিংস (Footer CMS)"
        description="ওয়েবসাইটের ফুটার সারসংক্ষেপ, জরুরি হটলাইন, অফিস ঠিকানা, সোশ্যাল মিডিয়া লিংক ও কপিরাইট পরিচালনা"
        badge="ফুটার কন্টেন্ট"
        badgeVariant="default"
      />
      <CmsFooterTab />
    </div>
  )
}
