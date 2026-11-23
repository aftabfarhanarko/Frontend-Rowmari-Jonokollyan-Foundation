import { Suspense } from "react"
import { Metadata } from "next"
import DashboardShell from "@/components/dashboard/DashboardShell"

export const metadata: Metadata = {
  title: "চিকিৎসা সহায়তা পোর্টাল | রৌমারী জনকল্যাণ ফাউন্ডেশন",
  description: "অসহায় রোগীদের চিকিৎসা অনুদান ও হাসপাতাল সমন্বয়",
}

export default function MedicalDashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-stone-500">লোড হচ্ছে...</div>}>
      <DashboardShell defaultTab="medical" />
    </Suspense>
  )
}
