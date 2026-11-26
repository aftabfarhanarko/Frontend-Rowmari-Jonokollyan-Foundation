import React, { Suspense } from "react"
import { Metadata } from "next"
import DashboardShell from "@/components/dashboard/DashboardShell"

export const metadata: Metadata = {
  title: "ড্যাশবোর্ড | রৌমারী জনকল্যাণ ফাউন্ডেশন",
  description: "রৌমারী জনকল্যাণ ফাউন্ডেশনের রোল-ভিত্তিক ড্যাশবোর্ড ও প্রশাসনিক ব্যবস্থাপনা পোর্টাল",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="size-8 border-3 border-[#D62828] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-stone-600 font-medium">ড্যাশবোর্ড লোড হচ্ছে...</p>
          </div>
        </div>
      }
    >
      <DashboardShell>{children}</DashboardShell>
    </Suspense>
  )
}
