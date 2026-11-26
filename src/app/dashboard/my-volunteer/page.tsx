"use client"

import React from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { MyVolunteerTab } from "@/components/dashboard/tabs/MyVolunteerTab"
import { useGetCurrentUserQuery } from "@/store/api/authApi"

export default function MyVolunteerPage() {
  const { data: currentUser } = useGetCurrentUserQuery()

  return (
    <div className="space-y-6">
      <PageHeader
        title="স্বেচ্ছাসেবক প্রোফাইল"
        description="আপনার সেবামূলক স্বেচ্ছাসেবী অংশগ্রহণের তথ্য ও স্ট্যাটাস"
        badge="স্বেচ্ছাসেবক"
        badgeVariant="default"
      />
      <MyVolunteerTab currentUser={currentUser} />
    </div>
  )
}
