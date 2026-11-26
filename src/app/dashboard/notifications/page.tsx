"use client"

import React from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { NotificationsTab } from "@/components/dashboard/tabs/NotificationsTab"
import { useGetAdminNotificationsQuery } from "@/store/api/dashboardApi"
import { useAppStore } from "@/store/useAppStore"

export default function NotificationsPage() {
  const { currentRole } = useAppStore()
  const isStaff = currentRole !== "COMMUNITY_MEMBER"
  const { data: adminNotificationsRes } = useGetAdminNotificationsQuery(undefined, { skip: !isStaff })
  const notificationItems = Array.isArray(adminNotificationsRes) ? adminNotificationsRes : (adminNotificationsRes as any)?.items || []

  return (
    <div className="space-y-6">
      <PageHeader
        title="নোটিফিকেশন সেন্টার"
        description="সিস্টেম নোটিফিকেশন, আবেদন সংক্রান্ত আপডেট ও জরুরি বার্তা কেন্দ্র"
        badge="নোটিফিকেশন"
        badgeVariant="default"
      />
      <NotificationsTab notifications={notificationItems} />
    </div>
  )
}
