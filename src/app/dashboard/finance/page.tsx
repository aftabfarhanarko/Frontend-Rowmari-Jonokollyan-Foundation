import { Suspense } from "react"
import { Metadata } from "next"
import DashboardShell from "@/components/dashboard/DashboardShell"

export const metadata: Metadata = {
  title: "অর্থ ও অনুদান হিসাব | রৌমারী জনকল্যাণ ফাউন্ডেশন",
  description: "অনুদান সংগ্রহ, ব্যাংক ট্রানজেকশন ও অডিট প্রতিবেদন",
}

export default function FinanceDashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-stone-500">লোড হচ্ছে...</div>}>
      <DashboardShell defaultTab="finance" />
    </Suspense>
  )
}
