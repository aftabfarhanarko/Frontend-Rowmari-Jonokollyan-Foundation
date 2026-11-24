import { Suspense } from "react"
import { Metadata } from "next"
import DashboardShell from "@/components/dashboard/DashboardShell"

export const metadata: Metadata = {
  title: "সিস্টেম সেটিংস ও অডিট ট্রেইল | রৌমারী জনকল্যাণ ফাউন্ডেশন",
  description: "সুপার অ্যাডমিন সিকিউরিটি কনফিগারেশন ও সিস্টেম অডিট ট্রেইল",
}

export default function SettingsDashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-stone-500">লোড হচ্ছে...</div>}>
      <DashboardShell defaultTab="settings" />
    </Suspense>
  )
}
