import { Suspense } from "react"
import { Metadata } from "next"
import DashboardShell from "@/components/dashboard/DashboardShell"

export const metadata: Metadata = {
  title: "আমার অনুদান ও রশিদ | রৌমারী জনকল্যাণ ফাউন্ডেশন",
  description: "আপনার প্রদত্ত সকল অনুদানের ইতিহাস ও মানি রিসিট",
}

export default function MyDonationsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-stone-500">লোড হচ্ছে...</div>}>
      <DashboardShell defaultTab="my-donations" />
    </Suspense>
  )
}
