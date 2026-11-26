"use client"

import React from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { CmsMessagesTab } from "@/components/dashboard/cms/CmsMessagesTab"

export default function MessagesCmsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="যোগাযোগের বার্তা ও ইনবক্স"
        description="ওয়েবসাইট থেকে সাধারণ নাগরিকদের পাঠানো অনুসন্ধান ও যোগাযোগের বার্তা"
        badge="ইনবক্স"
        badgeVariant="default"
      />
      <CmsMessagesTab />
    </div>
  )
}
