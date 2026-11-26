"use client"

import React from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { CmsUsersTab } from "@/components/dashboard/cms/CmsUsersTab"

export default function UsersManagementPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="ইউজার ও সুপার অ্যাডমিন ব্যবস্থাপনা"
        description="সুপার অ্যাডমিন ও সাধারণ ইউজার তৈরি, রোল পরিবর্তন ও এক্সেস স্ট্যাটাস নিয়ন্ত্রণ"
        badge="প্রশাসনিক নিয়ন্ত্রণ"
        badgeVariant="default"
      />
      <CmsUsersTab />
    </div>
  )
}
