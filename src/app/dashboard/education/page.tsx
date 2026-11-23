import { Suspense } from "react"
import { Metadata } from "next"
import DashboardShell from "@/components/dashboard/DashboardShell"

export const metadata: Metadata = {
  title: "শিক্ষা সহায়তা ও মেধা বৃত্তি | রৌমারী জনকল্যাণ ফাউন্ডেশন",
  description: "দরিদ্র ও মেধাবী শিক্ষার্থীদের বৃত্তি এবং শিক্ষা উপকরণ বিতরণ",
}

export default function EducationDashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-stone-500">লোড হচ্ছে...</div>}>
      <DashboardShell defaultTab="education" />
    </Suspense>
  )
}
