import { Suspense } from "react"
import { Metadata } from "next"
import DashboardShell from "@/components/dashboard/DashboardShell"

export const metadata: Metadata = {
  title: "রক্তদান সেবা পোর্টাল | রৌমারী জনকল্যাণ ফাউন্ডেশন",
  description: "জরুরি রক্তের আবেদন ও রক্তদাতা নেটওয়ার্ক ব্যবস্থাপনা",
}

export default function BloodDashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-stone-500">লোড হচ্ছে...</div>}>
      <DashboardShell defaultTab="blood" />
    </Suspense>
  )
}
