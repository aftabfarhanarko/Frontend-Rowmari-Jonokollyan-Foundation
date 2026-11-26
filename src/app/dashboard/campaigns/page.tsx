"use client"

import React from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { CampaignsTab } from "@/components/dashboard/tabs/CampaignsTab"
import { useGetCampaignsQuery } from "@/store/api/campaignsApi"

export default function CampaignsDashboardPage() {
  const { data: liveCampaignsRes } = useGetCampaignsQuery()
  const liveCampaigns = liveCampaignsRes || []

  const displayCampaignsList = liveCampaigns.map((c: any) => ({
    id: c.slug || c.id?.slice(0, 8),
    titleBn: c.title,
    target: Number(c.targetAmount) || 0,
    raised: Number(c.currentAmount) || 0,
    donors: c.donorCount || 0,
    deadlineBn: c.deadline ? new Date(c.deadline).toLocaleDateString("bn-BD") : "চলমান",
    status: c.status === "ACTIVE" ? "চলমান" : "সমাপ্ত",
  }))

  return (
    <div className="space-y-6">
      <PageHeader
        title="ক্যাম্পেইন ও ফান্ডরেইজিং"
        description="ত্রাণ, শিক্ষা ও চিকিৎসা তহবিলের ক্যাম্পেইন পরিচালনা ও তহবিল সংগ্রহ"
        badge="লাইভ ক্যাম্পেইন"
        badgeVariant="default"
      />
      <CampaignsTab campaignsList={displayCampaignsList} />
    </div>
  )
}
