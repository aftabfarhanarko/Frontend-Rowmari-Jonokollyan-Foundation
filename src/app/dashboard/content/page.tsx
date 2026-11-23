import { Suspense } from "react"
import { Metadata } from "next"
import DashboardShell from "@/components/dashboard/DashboardShell"

export const metadata: Metadata = {
  title: "ক্যাম্পেইন ও কন্টেন্ট প্রকাশনা | রৌমারী জনকল্যাণ ফাউন্ডেশন",
  description: "ক্যাম্পেইন প্রকাশ, ছবি ও খবর আপডেট ব্যবস্থাপনা",
}

export default function ContentDashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-stone-500">লোড হচ্ছে...</div>}>
      <DashboardShell defaultTab="content" />
    </Suspense>
  )
}
