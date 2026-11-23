import { Suspense } from "react"
import { Metadata } from "next"
import DashboardShell from "@/components/dashboard/DashboardShell"

export const metadata: Metadata = {
  title: "ইউজার ও রোল ব্যবস্থাপনা | রৌমারী জনকল্যাণ ফাউন্ডেশন",
  description: "কমিটি মেম্বার ও কর্মকর্তাদের ভূমিকা ও পারমিশন কন্ট্রোল",
}

export default function UsersManagementPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-stone-500">লোড হচ্ছে...</div>}>
      <DashboardShell defaultTab="users" />
    </Suspense>
  )
}
