"use client"

import React from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { ChevronRight, Home, LayoutDashboard } from "lucide-react"

const ROUTE_NAME_MAP: Record<string, string> = {
  dashboard: "ড্যাশবোর্ড",
  users: "ইউজার ও সুপার অ্যাডমিন",
  settings: "ওয়েবসাইট সেটিংস ও এসইও",
  cases: "সহায়তার আবেদনসমূহ",
  volunteers: "স্বেচ্ছাসেবক ব্যবস্থাপনা",
  campaigns: "ক্যাম্পেইন ও ফান্ডরেইজিং",
  content: "ক্যাম্পেইন ও কন্টেন্ট",
  pages: "পাবলিক পেজ CMS",
  news: "নিউজ ও নোটিশ বোর্ড",
  gallery: "গ্যালারি ও মিডিয়া",
  messages: "যোগাযোগ বার্তা",
  "activity-logs": "অ্যাক্টিভিটি লগ ও অডিট",
  analytics: "এনালিটিক্স ও রিপোর্ট",
  notifications: "নোটিফিকেশন সেন্টার",
  "my-applications": "আমার আবেদন",
  "my-volunteer": "স্বেচ্ছাসেবক প্রোফাইল",
  "my-profile": "আমার প্রোফাইল",
  profile: "আমার প্রোফাইল",
  medical: "চিকিৎসা সহায়তা",
  education: "শিক্ষা সহায়তা",
}

interface DashboardBreadcrumbProps {
  className?: string
  customTitle?: string
}

export function DashboardBreadcrumb({ className = "", customTitle }: DashboardBreadcrumbProps) {
  const pathname = usePathname() || "/dashboard"
  const searchParams = useSearchParams()

  const segments = pathname.split("/").filter(Boolean)
  const tabParam = searchParams.get("tab")

  let currentPageTitle = customTitle
  if (!currentPageTitle) {
    if (tabParam && ROUTE_NAME_MAP[tabParam]) {
      currentPageTitle = ROUTE_NAME_MAP[tabParam]
    } else {
      const lastSegment = segments[segments.length - 1]
      currentPageTitle = ROUTE_NAME_MAP[lastSegment] || (lastSegment === "dashboard" ? "ওভারভিউ" : lastSegment)
    }
  }

  const isRootDashboard = segments.length === 1 && segments[0] === "dashboard" && !tabParam

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-xs text-stone-500 ${className}`}>
      <ol className="flex items-center space-x-1.5 sm:space-x-2">
        <li>
          <Link
            href="/"
            className="flex items-center text-stone-400 hover:text-stone-700 transition-colors"
            title="হোম পেজ"
          >
            <Home className="size-3.5" />
            <span className="sr-only">হোম</span>
          </Link>
        </li>
        <li className="flex items-center text-stone-300">
          <ChevronRight className="size-3" />
        </li>
        <li>
          <Link
            href="/dashboard"
            className={`flex items-center gap-1 font-medium hover:text-[#D62828] transition-colors ${
              isRootDashboard ? "text-[#D62828] font-bold" : "text-stone-600"
            }`}
          >
            <LayoutDashboard className="size-3 hidden sm:inline" />
            <span>ড্যাশবোর্ড</span>
          </Link>
        </li>
        {!isRootDashboard && currentPageTitle && (
          <>
            <li className="flex items-center text-stone-300">
              <ChevronRight className="size-3" />
            </li>
            <li className="font-bold text-[#D62828] max-w-[140px] sm:max-w-xs truncate">
              {currentPageTitle}
            </li>
          </>
        )}
      </ol>
    </nav>
  )
}

export default DashboardBreadcrumb
