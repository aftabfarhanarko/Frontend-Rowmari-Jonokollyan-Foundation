"use client"

import React from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { MedicalEducationTab } from "@/components/dashboard/tabs/MedicalEducationTab"
import { useGetAdminApplicationsQuery } from "@/store/api/dashboardApi"
import { useAppStore } from "@/store/useAppStore"

export default function MedicalDashboardPage() {
  const { currentRole } = useAppStore()
  const isStaff = currentRole !== "COMMUNITY_MEMBER"
  const { data: adminAppsRes } = useGetAdminApplicationsQuery(undefined, { skip: !isStaff })
  const appItems = Array.isArray(adminAppsRes) ? adminAppsRes : (adminAppsRes as any)?.items || []

  const displayMedicalData = appItems.filter((a: any) => a.category === "MEDICAL").map((r: any) => ({
    id: r.referenceCode || r.id?.slice(0, 8),
    patientName: r.applicantName,
    disease: r.title,
    hospital: r.institution || "রৌমারী উপজেলা স্বাস্থ্য কমপ্লেক্স",
    requiredAmount: r.amountRequested?.toLocaleString("bn-BD") || "০",
    approvedAmount: r.amountApproved?.toLocaleString("bn-BD") || "০",
    status: r.status === "APPROVED" ? "অনুমোদিত" : "বিচারাধীন",
  }))

  return (
    <div className="space-y-6">
      <PageHeader
        title="চিকিৎসা সহায়তা পোর্টাল"
        description="অসহায় ও দরিদ্র রোগীদের জরুরি চিকিৎসা অনুদান ও হাসপাতাল সমন্বয়"
        badge="চিকিৎসা উইং"
        badgeVariant="default"
      />
      <MedicalEducationTab type="medical" data={displayMedicalData} />
    </div>
  )
}
