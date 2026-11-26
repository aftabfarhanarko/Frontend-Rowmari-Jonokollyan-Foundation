"use client"

import React, { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { DashboardContent } from "@/components/dashboard/DashboardContent"

function DashboardOverview() {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("tab") || "overview"

  return <DashboardContent activeTab={activeTab} />
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="size-6 rounded-full border-2 border-[#D62828] border-t-transparent animate-spin" />
            <p className="text-xs text-stone-500 font-medium">লোড হচ্ছে...</p>
          </div>
        </div>
      }
    >
      <DashboardOverview />
    </Suspense>
  )
}
