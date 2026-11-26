"use client"

import React from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { CampaignsTab } from "@/components/dashboard/tabs/CampaignsTab"
import { useGetCampaignsQuery } from "@/store/api/campaignsApi"

export default function ActivitiesDashboardPage() {
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
        title="প্রজেক্ট ও কার্যক্রম"
        description="বাস্তবায়িত এবং চলমান সামাজিক ও মানবিক উন্নয়নমূলক কার্যক্রম"
        badge="প্রজেক্ট পোর্টফোলিও"
        badgeVariant="default"
      />
      <CampaignsTab campaignsList={displayCampaignsList} />
    </div>
  )
}
