import { Suspense } from "react"
import { Metadata } from "next"
import DashboardShell from "@/components/dashboard/DashboardShell"

export const metadata: Metadata = {
  title: "নোটিফিকেশন সেন্টার | রৌমারী জনকল্যাণ ফাউন্ডেশন",
  description: "সিস্টেম নোটিফিকেশন ও জরুরি বার্তা কেন্দ্র",
}

export default function NotificationsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-stone-500">লোড হচ্ছে...</div>}>
      <DashboardShell defaultTab="notifications" />
    </Suspense>
  )
}
