import { Suspense } from "react"
import { Metadata } from "next"
import DashboardShell from "@/components/dashboard/DashboardShell"

export const metadata: Metadata = {
  title: "মাঠপর্যায় তদন্ত ও কেস রিপোর্ট | রৌমারী জনকল্যাণ ফাউন্ডেশন",
  description: "সরেজমিনে আবেদনকারী পরিবার যাচাই ও সাহায্য বিতরণ রিপোর্ট",
}

export default function CasesDashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-stone-500">লোড হচ্ছে...</div>}>
      <DashboardShell defaultTab="cases" />
    </Suspense>
  )
}
