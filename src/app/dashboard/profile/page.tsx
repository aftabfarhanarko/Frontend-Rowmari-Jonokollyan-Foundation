"use client"

import React from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { ProfileTab } from "@/components/dashboard/tabs/ProfileTab"
import { useGetCurrentUserQuery, useUpdateProfileMutation } from "@/store/api/authApi"
import { useAppStore } from "@/store/useAppStore"

export default function ProfileDashboardPage() {
  const { currentRole } = useAppStore()
  const { data: currentUser, refetch: refetchCurrentUser } = useGetCurrentUserQuery()
  const [updateProfileMutation] = useUpdateProfileMutation()

  return (
    <div className="space-y-6">
      <PageHeader
        title="আমার প্রোফাইল ও সেটিংস"
        description="ব্যক্তিগত তথ্য, ছবি ও যোগাযোগ বিবরণ হালনাগাদ করুন"
        badge="ব্যক্তিগত অ্যাকাউন্ট"
        badgeVariant="default"
      />
      <ProfileTab
        currentUser={currentUser}
        currentRole={currentRole}
        updateProfileMutation={updateProfileMutation}
        refetchCurrentUser={refetchCurrentUser}
      />
    </div>
  )
}
