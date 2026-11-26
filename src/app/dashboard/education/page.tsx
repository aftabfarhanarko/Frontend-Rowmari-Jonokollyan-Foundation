"use client"

import React from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { MedicalEducationTab } from "@/components/dashboard/tabs/MedicalEducationTab"
import { useGetAdminApplicationsQuery } from "@/store/api/dashboardApi"
import { useAppStore } from "@/store/useAppStore"

export default function EducationDashboardPage() {
  const { currentRole } = useAppStore()
  const isStaff = currentRole !== "COMMUNITY_MEMBER"
  const { data: adminAppsRes } = useGetAdminApplicationsQuery(undefined, { skip: !isStaff })
  const appItems = Array.isArray(adminAppsRes) ? adminAppsRes : (adminAppsRes as any)?.items || []

  const displayEducationData = appItems.filter((a: any) => a.category === "EDUCATION").map((r: any) => ({
    id: r.referenceCode || r.id?.slice(0, 8),
    studentName: r.applicantName,
    institute: r.institution || "রৌমারী সরকারি কলেজ",
    grade: r.notes || "উচ্চ মাধ্যমিক",
    supportType: r.title,
    amount: r.amountApproved?.toLocaleString("bn-BD") || r.amountRequested?.toLocaleString("bn-BD") || "০",
    status: r.status === "APPROVED" ? "অনুমোদিত" : "বিচারাধীন",
  }))

  return (
    <div className="space-y-6">
      <PageHeader
        title="শিক্ষা সহায়তা ও মেধা বৃত্তি"
        description="দরিদ্র ও মেধাবী শিক্ষার্থীদের বৃত্তি এবং শিক্ষা উপকরণ বিতরণ"
        badge="শিক্ষা তহবিল"
        badgeVariant="default"
      />
      <MedicalEducationTab type="education" data={displayEducationData} />
    </div>
  )
}
