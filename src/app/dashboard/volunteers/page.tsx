"use client"

import React from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { VolunteersTab } from "@/components/dashboard/tabs/VolunteersTab"
import { useGetAdminVolunteersQuery } from "@/store/api/dashboardApi"
import { useAppStore } from "@/store/useAppStore"

export default function VolunteersDashboardPage() {
  const { currentRole } = useAppStore()
  const isStaff = currentRole !== "COMMUNITY_MEMBER"
  const { data: adminVolunteersRes } = useGetAdminVolunteersQuery(undefined, { skip: !isStaff })
  const volunteerItems = Array.isArray(adminVolunteersRes) ? adminVolunteersRes : (adminVolunteersRes as any)?.items || []

  const displayVolunteersData = volunteerItems.map((r: any) => ({
    id: r.referenceCode || r.id?.slice(0, 8),
    rawId: r.id,
    isApprovedRaw: !!r.isApproved,
    name: r.fullName || r.user?.fullName || r.name || "স্বেচ্ছাসেবক",
    wing: r.skills ? r.skills : (r.bloodGroup ? `রক্তদান (${r.bloodGroup})` : "ত্রাণ ও পুনর্বাসন"),
    union: r.upazila || r.user?.upazila || "রৌমারী সদর",
    phone: r.phone || r.user?.phone || "+8801700000000",
    status: r.isApproved ? "সক্রিয়" : "অপেক্ষমান",
  }))

  return (
    <div className="space-y-6">
      <PageHeader
        title="স্বেচ্ছাসেবক ব্যবস্থাপনা"
        description="স্বেচ্ছাসেবক উইং, রক্তের গ্রুপ অনুযায়ী ভলান্টিয়ার ও টিম সমন্বয়"
        badge="ফিল্ড টিম"
        badgeVariant="default"
      />
      <VolunteersTab volunteersData={displayVolunteersData} />
    </div>
  )
}
