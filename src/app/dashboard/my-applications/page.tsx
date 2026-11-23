import { Suspense } from "react"
import { Metadata } from "next"
import DashboardShell from "@/components/dashboard/DashboardShell"

export const metadata: Metadata = {
  title: "আমার সাহায্য আবেদনসমূহ | রৌমারী জনকল্যাণ ফাউন্ডেশন",
  description: "আপনার জমাকৃত মানবিক আবেদন ও তদন্তের অগ্রগতি ট্র্যাকিং",
}

export default function MyApplicationsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-stone-500">লোড হচ্ছে...</div>}>
      <DashboardShell defaultTab="my-applications" />
    </Suspense>
  )
}
