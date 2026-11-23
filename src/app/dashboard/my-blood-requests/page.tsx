import { Suspense } from "react"
import { Metadata } from "next"
import DashboardShell from "@/components/dashboard/DashboardShell"

export const metadata: Metadata = {
  title: "আমার রক্তের অনুরোধ | রৌমারী জনকল্যাণ ফাউন্ডেশন",
  description: "আপনার পরিবারের জন্য চাওয়া রক্তের আপডেট ও লাইভ স্ট্যাটাস",
}

export default function MyBloodRequestsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-stone-500">লোড হচ্ছে...</div>}>
      <DashboardShell defaultTab="my-blood-requests" />
    </Suspense>
  )
}
