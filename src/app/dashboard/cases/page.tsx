"use client"

import React from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { CasesTab } from "@/components/dashboard/tabs/CasesTab"
import { useGetAdminApplicationsQuery } from "@/store/api/dashboardApi"
import { useAppStore } from "@/store/useAppStore"

export default function CasesDashboardPage() {
  const { currentRole } = useAppStore()
  const isStaff = currentRole !== "COMMUNITY_MEMBER"
  const { data: adminAppsRes } = useGetAdminApplicationsQuery(undefined, { skip: !isStaff })
  const appItems = Array.isArray(adminAppsRes) ? adminAppsRes : (adminAppsRes as any)?.items || []

  const displayCasesData = appItems.map((r: any) => ({
    id: r.referenceCode || r.id?.slice(0, 8),
    rawId: r.id,
    applicant: r.applicantName,
    category: r.category === "MEDICAL" ? "চিকিৎসা" : "শিক্ষা",
    village: r.applicantAddress || r.address || "রৌমারী",
    officer: r.assignedTo?.fullName || "তদন্ত টিম-১",
    visitStatus: r.status === "APPROVED" ? "সম্পন্ন" : "প্রক্রিয়াধীন",
    recommendation: r.adminRemarks || r.description || "জরুরি সহায়তা প্রযোজ্য",
  }))

  return (
    <div className="space-y-6">
      <PageHeader
        title="সহায়তার আবেদন ও ফিল্ড তদন্ত"
        description="সরেজমিনে আবেদনকারী পরিবার যাচাই, তদন্ত রিপোর্ট ও সাহায্য অনুমোদন"
        badge="তদন্ত চলমান"
        badgeVariant="urgent"
      />
      <CasesTab casesData={displayCasesData} />
    </div>
  )
}
