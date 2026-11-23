import { Suspense } from "react"
import { Metadata } from "next"
import DashboardShell from "@/components/dashboard/DashboardShell"

export const metadata: Metadata = {
  title: "স্বেচ্ছাসেবক উইং ব্যবস্থাপনা | রৌমারী জনকল্যাণ ফাউন্ডেশন",
  description: "স্বেচ্ছাসেবক নিবন্ধন, দায়িত্ব বণ্টন ও টিম পরিচালনা",
}

export default function VolunteersDashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-stone-500">লোড হচ্ছে...</div>}>
      <DashboardShell defaultTab="volunteers" />
    </Suspense>
  )
}
