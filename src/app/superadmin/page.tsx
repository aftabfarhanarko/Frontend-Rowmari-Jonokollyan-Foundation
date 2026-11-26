import { Suspense } from "react"
import { Metadata } from "next"
import DashboardShell from "@/components/dashboard/DashboardShell"

export const metadata: Metadata = {
  title: "সুপার অ্যাডমিন কন্ট্রোল ও ইউজার ব্যবস্থাপনা | রৌমারী জনকল্যাণ ফাউন্ডেশন",
  description: "সুপার অ্যাডমিন ও ইউজার তৈরি, রোল ব্যবস্থাপনা, সক্রিয়করণ ও একাউন্ট অপসারণ",
}

export default function SuperAdminPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-stone-500">লোড হচ্ছে...</div>}>
      <DashboardShell defaultTab="users" />
    </Suspense>
  )
}
