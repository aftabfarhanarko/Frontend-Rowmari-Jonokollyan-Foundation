"use client"

import React from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { MyApplicationsTab } from "@/components/dashboard/tabs/MyApplicationsTab"
import { useGetMyApplicationsQuery } from "@/store/api/dashboardApi"
import { useAppStore } from "@/store/useAppStore"
import { Button } from "@/components/ui/button"
import { HeartHandshake } from "lucide-react"

export default function MyApplicationsPage() {
  const { setAssistanceModalOpen } = useAppStore()
  const { data: myAppsRes } = useGetMyApplicationsQuery(undefined)
  const myAppItems = Array.isArray(myAppsRes) ? myAppsRes : (myAppsRes as any)?.items || []

  const displayMyApps = myAppItems.map((r: any) => ({
    id: r.referenceCode || r.id?.slice(0, 8),
    categoryBn: r.category === "MEDICAL" ? "জরুরি চিকিৎসা সহায়তা" : "শিক্ষা বৃত্তি ও উপকরণ",
    statusTitle: r.status === "APPROVED" ? "অনুমোদিত" : r.status === "REJECTED" ? "বাতিল" : "যাচাই চলমান",
    note: r.adminRemarks || "আপনার আবেদনটি পর্যালোচনায় রয়েছে।",
    officer: "রৌমারী ফিল্ড অফিসার",
    approvedAmount: r.amountApproved ? `৳${r.amountApproved.toLocaleString("bn-BD")}` : "প্রক্রিয়াধীন",
  }))

  return (
    <div className="space-y-6">
      <PageHeader
        title="আমার সাহায্য আবেদনসমূহ"
        description="আপনার জমাকৃত মানবিক আবেদন ও তদন্তের অগ্রগতি ট্র্যাকিং"
        badge="ব্যক্তিগত রেকর্ড"
        badgeVariant="default"
        actions={
          <Button
            size="sm"
            onClick={() => setAssistanceModalOpen(true)}
            className="text-xs gap-1.5 h-8 bg-[#D62828] hover:bg-[#B91C1C] text-white shadow-xs font-bold cursor-pointer"
          >
            <HeartHandshake className="size-3.5" />
            <span>নতুন আবেদন করুন</span>
          </Button>
        }
      />
      <MyApplicationsTab myApps={displayMyApps} />
    </div>
  )
}
