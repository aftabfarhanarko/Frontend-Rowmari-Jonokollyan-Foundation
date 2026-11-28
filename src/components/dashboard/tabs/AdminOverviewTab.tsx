"use client"

import React from "react"
import {
  Users,
  Target,
  HeartPulse,
  ShieldCheck,
  FileText,
  Newspaper,
  Image as ImageIcon,
  Mail,
  UserCheck,
  Key,
  BarChart3,
  PieChart,
  Activity,
  HandCoins,
  Clock,
  Globe,
  ArrowUpRight,
} from "lucide-react"
import type { AdminDashboardOverview } from "@/store/api/adminApi"

interface AdminOverviewTabProps {
  adminDashboard?: AdminDashboardOverview | any
  userItems: any[]
  volunteerItems: any[]
  campaignsCount: number
  appItems: any[]
  onSelectTab?: (tab: string) => void
}

const bnNum = (val: number | undefined | null) =>
  Number(val ?? 0).toLocaleString("bn-BD")

const formatDateBn = (iso?: string) => {
  if (!iso) return "—"
  try {
    return new Date(iso).toLocaleString("bn-BD", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch {
    return iso
  }
}

const getMethodBadgeClass = (method?: string) => {
  switch ((method || "").toUpperCase()) {
    case "POST":
      return "bg-emerald-50 text-emerald-700 border-emerald-200"
    case "PATCH":
    case "PUT":
      return "bg-amber-50 text-amber-700 border-amber-200"
    case "DELETE":
      return "bg-red-50 text-red-700 border-red-200"
    default:
      return "bg-stone-100 text-stone-700 border-stone-200"
  }
}

const getUserStatusBadge = (status?: string) => {
  switch ((status || "").toUpperCase()) {
    case "ACTIVE":
      return { label: "সক্রিয়", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" }
    case "PENDING":
      return { label: "অপেক্ষমান", cls: "bg-amber-50 text-amber-700 border-amber-200" }
    case "SUSPENDED":
      return { label: "স্থগিত", cls: "bg-red-50 text-red-700 border-red-200" }
    default:
      return { label: status || "অজানা", cls: "bg-stone-100 text-stone-600 border-stone-200" }
  }
}

export function AdminOverviewTab({
  adminDashboard,
  userItems,
  volunteerItems,
  campaignsCount,
  appItems,
  onSelectTab,
}: AdminOverviewTabProps) {
  const usersData = adminDashboard?.users
  const cmsData = adminDashboard?.cms
  const opsData = adminDashboard?.operations
  const recentUsers: Array<{
    id: string
    fullName: string
    email?: string
    phone?: string
    status?: string
    createdAt?: string
  }> = Array.isArray(usersData?.recent) ? usersData.recent : []
  const activityLogs: Array<{
    id: string
    action: string
    actorName?: string
    entityType?: string
    method?: string
    route?: string
    statusCode?: number
    durationMs?: number
    ipAddress?: string
    createdAt: string
  }> = Array.isArray(adminDashboard?.recentActivityLogs) ? adminDashboard.recentActivityLogs : []

  const totalUsers = usersData?.total ?? userItems.length
  const activeUsers = usersData?.active ?? userItems.length
  const inactiveUsers = usersData?.inactive ?? 0
  const totalVolunteers = volunteerItems.length

  const totalCampaigns = opsData?.totalCampaigns ?? campaignsCount
  const totalApplications = opsData?.totalApplications ?? appItems.length
  const totalContactMessages = opsData?.totalContactMessages ?? 0
  const totalDonations = opsData?.totalDonations ?? 0
  const totalDonationsAmount = opsData?.totalDonationsAmount ?? 0

  const totalPages = cmsData?.totalPages ?? 0
  const publishedPages = cmsData?.publishedPages ?? 0
  const draftPages = cmsData?.draftPages ?? 0
  const totalNews = cmsData?.totalNews ?? 0
  const totalGallery = cmsData?.totalGallery ?? 0

  const chartItems = [
    { label: "নিবন্ধিত ইউজার", value: totalUsers, color: "#D62828", unit: "জন" },
    { label: "সক্রিয় স্বেচ্ছাসেবক", value: totalVolunteers, color: "#E53935", unit: "জন" },
    { label: "চলমান ক্যাম্পেইন", value: totalCampaigns, color: "#B91C1C", unit: "টি" },
    { label: "ত্রাণ ও সেবা", value: totalApplications, color: "#7F1D1D", unit: "টি" },
  ]
  const maxChartVal = Math.max(...chartItems.map((i) => i.value), 1)
  const totalChartSum = chartItems.reduce((sum, i) => sum + i.value, 0) || 1

  const radius = 52
  const circumference = 2 * Math.PI * radius
  let cumulativeOffset = 0
  const donutSegments = chartItems.map((item) => {
    const pct = item.value / totalChartSum
    const dash = pct * circumference
    const seg = {
      ...item,
      pct: Math.round(pct * 100),
      dashArray: `${dash} ${circumference - dash}`,
      dashOffset: -cumulativeOffset,
    }
    cumulativeOffset += dash
    return seg
  })

  const kpis = [
    {
      title: "মোট নিবন্ধিত ইউজার",
      value: `${bnNum(totalUsers)} জন`,
      subtitle: `${bnNum(activeUsers)} সক্রিয় • ${bnNum(inactiveUsers)} নিষ্ক্রিয়`,
      icon: Users,
      tab: "users",
    },
    {
      title: "মোট অনুদান তহবিল",
      value: `৳${bnNum(totalDonationsAmount)}`,
      subtitle: `${bnNum(totalDonations)} টি সফল অনুদান`,
      icon: HandCoins,
      tab: "donations",
    },
    {
      title: "ক্যাম্পেইন ও আবেদন",
      value: `${bnNum(totalCampaigns)} টি`,
      subtitle: `${bnNum(totalApplications)} টি আবেদন • ${bnNum(totalVolunteers)} স্বেচ্ছাসেবক`,
      icon: Target,
      tab: "campaigns",
    },
    {
      title: "পাবলিক CMS ও বার্তা",
      value: `${bnNum(totalPages)} টি পেজ`,
      subtitle: `${bnNum(publishedPages)} প্রকাশিত • ${bnNum(totalContactMessages)} বার্তা`,
      icon: Globe,
      tab: "pages",
    },
  ]

  const cmsShortcuts = [
    { id: "pages", title: "পাবলিক পেজ ম্যানেজমেন্ট", desc: "হোম, আমাদের কথা, যোগাযোগ, পলিসি ইত্যাদির টেক্সট ও ব্যানার আপডেট", badge: `${bnNum(totalPages)}টি`, icon: FileText },
    { id: "news", title: "নিউজ ও নোটিশ বোর্ড", desc: "জরুরি বিজ্ঞপ্তি, প্রেস রিলিজ ও কার্যক্রমের সংবাদ প্রকাশনা", badge: `${bnNum(totalNews)}টি`, icon: Newspaper },
    { id: "gallery", title: "গ্যালারি ও মিডিয়া ফাইলস", desc: "অনুষ্ঠান ও ত্রাণের ফটো অ্যালবাম ও কন্টেন্ট মিডিয়া লিংক", badge: `${bnNum(totalGallery)}টি`, icon: ImageIcon },
    { id: "messages", title: "যোগাযোগের বার্তা", desc: "পাবলিক ওয়েবসাইট থেকে পাঠানো সরাসরি নাগরিক বার্তা", badge: `${bnNum(totalContactMessages)} বার্তা`, icon: Mail },
    { id: "users", title: "ইউজার ও অ্যাকাউন্ট", desc: "নিবন্ধিত সকল সদস্যের তালিকা, অনুসন্ধান ও এক্সেস স্ট্যাটাস", badge: `${bnNum(totalUsers)} জন`, icon: UserCheck },
    { id: "settings", title: "ওয়েবসাইট সেটিংস ও এসইও", desc: "হটলাইন, ইমার্জেন্সি ফোন, অফিস ঠিকানা ও গ্লোবাল মেটাট্যাগ", badge: "কনফিগ", icon: Key },
  ]

  return (
    <div className="space-y-6">
      {/* 1. Primary 4 KPI Cards (Mobile: 2col, LG: 4col) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectTab?.(kpi.tab)}
              className="bg-white p-3 sm:p-4 rounded-2xl border border-stone-200/90 shadow-2xs hover:border-red-300 hover:shadow-sm transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center justify-between text-stone-500 text-[11px] sm:text-xs font-medium mb-1.5 sm:mb-2 gap-1.5">
                <span className="truncate">{kpi.title}</span>
                <div className="p-1.5 sm:p-2 rounded-xl bg-red-50 text-[#D62828] group-hover:bg-[#D62828] group-hover:text-white transition-colors shrink-0">
                  <Icon className="size-3.5 sm:size-4" />
                </div>
              </div>
              <div className="text-lg sm:text-2xl font-black text-stone-900 tracking-tight">{kpi.value}</div>
              <div className="text-[10px] sm:text-[11px] text-[#D62828] font-semibold mt-1 truncate">{kpi.subtitle}</div>
            </button>
          )
        })}
      </div>

      {/* 2. Structured Domain Breakdown: Users / Operations / CMS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Users Summary Card */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-red-50 text-[#D62828]">
                  <Users className="size-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-stone-900">ইউজার ও সদস্য পরিসংখ্যান</h3>
                  <p className="text-[11px] text-stone-500">অ্যাকাউন্ট ও স্বেচ্ছাসেবক অবস্থা</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onSelectTab?.("users")}
                className="text-[11px] font-bold text-[#D62828] hover:underline inline-flex items-center gap-0.5 cursor-pointer"
              >
                বিস্তারিত <ArrowUpRight className="size-3" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                <div className="text-[11px] text-stone-500">মোট ইউজার</div>
                <div className="text-lg font-black text-stone-900">{bnNum(totalUsers)}</div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <div className="text-[11px] text-emerald-700">সক্রিয় (Active)</div>
                <div className="text-lg font-black text-emerald-800">{bnNum(activeUsers)}</div>
              </div>
              <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-100">
                <div className="text-[11px] text-amber-700">নিষ্ক্রিয় (Inactive)</div>
                <div className="text-lg font-black text-amber-800">{bnNum(inactiveUsers)}</div>
              </div>
              <div className="p-3 rounded-xl bg-red-50/50 border border-red-100">
                <div className="text-[11px] text-[#D62828]">স্বেচ্ছাসেবক টিম</div>
                <div className="text-lg font-black text-stone-900">{bnNum(totalVolunteers)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Operations Summary Card */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-red-50 text-[#D62828]">
                  <HeartPulse className="size-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-stone-900">অপারেশনস ও অনুদান</h3>
                  <p className="text-[11px] text-stone-500">মাঠপর্যায়ের কার্যক্রম ও ফান্ড</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onSelectTab?.("donations")}
                className="text-[11px] font-bold text-[#D62828] hover:underline inline-flex items-center gap-0.5 cursor-pointer"
              >
                অনুদান <ArrowUpRight className="size-3" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-600">চলমান ক্যাম্পেইন</span>
                <span className="font-bold text-stone-900">{bnNum(totalCampaigns)} টি</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-600">মোট সাহায্য আবেদন</span>
                <span className="font-bold text-stone-900">{bnNum(totalApplications)} টি</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-600">যোগাযোগের বার্তা</span>
                <span className="font-bold text-stone-900">{bnNum(totalContactMessages)} টি</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-600">মোট অনুদান সংখ্যা</span>
                <span className="font-bold text-stone-900">{bnNum(totalDonations)} টি</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="font-semibold text-stone-700">মোট অনুদানের পরিমাণ</span>
                <span className="font-black text-[#D62828] text-sm">৳{bnNum(totalDonationsAmount)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* CMS Summary Card */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-2xs md:col-span-2 xl:col-span-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-red-50 text-[#D62828]">
                  <FileText className="size-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-stone-900">কন্টেন্ট ম্যানেজমেন্ট (CMS)</h3>
                  <p className="text-[11px] text-stone-500">পাবলিক পেজ, নিউজ ও গ্যালারি</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onSelectTab?.("pages")}
                className="text-[11px] font-bold text-[#D62828] hover:underline inline-flex items-center gap-0.5 cursor-pointer"
              >
                CMS পেজ <ArrowUpRight className="size-3" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-600">মোট পাবলিক পেজ</span>
                <span className="font-bold text-stone-900">{bnNum(totalPages)} টি</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-600">প্রকাশিত পেজ (Published)</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px] border border-emerald-200">
                  {bnNum(publishedPages)} টি
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-600">খসড়া পেজ (Draft)</span>
                <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 font-bold text-[11px] border border-stone-200">
                  {bnNum(draftPages)} টি
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-600">নিউজ ও বুলেটিন</span>
                <span className="font-bold text-stone-900">{bnNum(totalNews)} টি</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-stone-600">গ্যালারি মিডিয়া</span>
                <span className="font-bold text-stone-900">{bnNum(totalGallery)} টি</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Overview Charts (Bar Chart + Donut Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Bar Chart */}
        <div className="lg:col-span-7 bg-white p-4 sm:p-5 rounded-3xl border border-stone-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-red-50 text-[#D62828] shrink-0">
                <BarChart3 className="size-4" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-stone-900">কার্যক্রম ও নেটওয়ার্ক পরিসংখ্যান</h3>
                <p className="text-[11px] text-stone-500">সদস্য, স্বেচ্ছাসেবক, ক্যাম্পেইন ও সেবা বিতরণের তুলনামূলক চিত্র</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-5 items-end h-44 sm:h-48 pt-6 pb-2 px-1 sm:px-2 border-b border-stone-100">
            {chartItems.map((item, idx) => {
              const heightPct = Math.max(Math.round((item.value / maxChartVal) * 100), 10)
              return (
                <div key={idx} className="flex flex-col items-center h-full justify-end group">
                  <span className="text-[10px] sm:text-xs font-black text-stone-900 mb-1.5 text-center">
                    {bnNum(item.value)} {item.unit}
                  </span>
                  <div className="w-full max-w-[44px] flex-1 flex items-end justify-center bg-stone-50 rounded-t-xl overflow-hidden">
                    <div
                      className="w-full rounded-t-xl transition-all duration-700 group-hover:opacity-90"
                      style={{ height: `${heightPct}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
          <div className="grid grid-cols-4 gap-2 sm:gap-5 pt-2.5 px-1 sm:px-2">
            {chartItems.map((item, idx) => (
              <div key={idx} className="text-center text-[10px] sm:text-[11px] font-bold text-stone-600 leading-tight">
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Donut Distribution Chart */}
        <div className="lg:col-span-5 bg-white p-4 sm:p-5 rounded-3xl border border-stone-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-red-50 text-[#D62828] shrink-0">
              <PieChart className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-stone-900">সামগ্রিক অনুপাত চার্ট</h3>
              <p className="text-[11px] text-stone-500">সিস্টেমের মোট কার্যক্রমের শতকরা হিসাব</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 my-auto">
            <div className="relative size-36 shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 130 130" className="size-full -rotate-90">
                <circle cx="65" cy="65" r={radius} fill="none" stroke="#F5F5F4" strokeWidth="18" />
                {donutSegments.map((seg, idx) => (
                  <circle
                    key={idx}
                    cx="65"
                    cy="65"
                    r={radius}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth="18"
                    strokeDasharray={seg.dashArray}
                    strokeDashoffset={seg.dashOffset}
                    strokeLinecap="butt"
                  />
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-black text-stone-900 leading-none">{bnNum(totalChartSum)}</span>
                <span className="text-[10px] font-semibold text-stone-500 mt-1">মোট রেকর্ড</span>
              </div>
            </div>

            <div className="w-full space-y-2">
              {donutSegments.map((seg, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="size-2.5 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                    <span className="font-semibold text-stone-700 truncate">{seg.label}</span>
                  </div>
                  <span className="font-bold text-stone-900 shrink-0">
                    {bnNum(seg.value)} ({bnNum(seg.pct)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Recent Users & Recent Activity Logs (Responsive for Mobile, Tablet & Desktop) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        {/* Recent Users */}
        <div className="xl:col-span-5 bg-white p-4 sm:p-5 rounded-3xl border border-stone-200/90 shadow-2xs flex flex-col">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-3 gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="p-2 rounded-xl bg-red-50 text-[#D62828] shrink-0">
                <UserCheck className="size-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-extrabold text-stone-900 truncate">সাম্প্রতিক নিবন্ধিত ইউজার</h3>
                <p className="text-[11px] text-stone-500 truncate">সর্বশেষ যোগদানকৃত সদস্যদের তালিকা</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onSelectTab?.("users")}
              className="text-xs font-bold text-[#D62828] hover:underline shrink-0 cursor-pointer"
            >
              সব দেখুন
            </button>
          </div>

          {recentUsers.length === 0 ? (
            <div className="py-8 text-center text-xs text-stone-400">
              এখনও কোনো সাম্প্রতিক ইউজার তথ্য পাওয়া যায়নি।
            </div>
          ) : (
            <div className="space-y-2.5">
              {recentUsers.map((u) => {
                const st = getUserStatusBadge(u.status)
                const initials = (u.fullName || "U").trim().slice(0, 2).toUpperCase()
                return (
                  <div
                    key={u.id}
                    className="flex items-start justify-between gap-3 p-3 rounded-2xl border border-stone-100 bg-stone-50/60 hover:bg-red-50/30 hover:border-red-200 transition-colors"
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className="size-9 rounded-xl bg-red-100 text-[#D62828] font-black text-xs flex items-center justify-center shrink-0">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-stone-900 truncate">{u.fullName || "নামহীন"}</div>
                        {u.email && (
                          <div className="text-[11px] text-stone-500 truncate">{u.email}</div>
                        )}
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-stone-400 mt-0.5">
                          {u.phone && <span>{u.phone}</span>}
                          <span>•</span>
                          <span>{formatDateBn(u.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${st.cls}`}>
                      {st.label}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Recent Activity Logs */}
        <div className="xl:col-span-7 bg-white p-4 sm:p-5 rounded-3xl border border-stone-200/90 shadow-2xs flex flex-col">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-3 gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="p-2 rounded-xl bg-red-50 text-[#D62828] shrink-0">
                <Activity className="size-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-extrabold text-stone-900 truncate">সাম্প্রতিক সিস্টেম অ্যাক্টিভিটি লগ</h3>
                <p className="text-[11px] text-stone-500 truncate">অ্যাডমিন ও সিস্টেম অপারেশনের রিয়েল-টাইম অডিট</p>
              </div>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 shrink-0">
              সর্বশেষ {bnNum(activityLogs.length)} টি
            </span>
          </div>

          {activityLogs.length === 0 ? (
            <div className="py-8 text-center text-xs text-stone-400">
              এখনও কোনো অ্যাক্টিভিটি লগ রেকর্ড হয়নি।
            </div>
          ) : (
            <>
              {/* Mobile & Small Tablet Card View */}
              <div className="space-y-2.5 md:hidden">
                {activityLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-2xl border border-stone-100 bg-stone-50/60 space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-stone-900 truncate">
                        {log.actorName || "সিস্টেম"}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {log.method && (
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold border ${getMethodBadgeClass(log.method)}`}>
                            {log.method}
                          </span>
                        )}
                        {log.statusCode !== undefined && (
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${log.statusCode < 400 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                            {log.statusCode}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-[11px] font-mono text-stone-600 break-all">
                      {log.route || log.action}
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-stone-400 pt-0.5">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3" />
                        {formatDateBn(log.createdAt)}
                      </span>
                      <span>
                        {log.durationMs !== undefined ? `${log.durationMs}ms` : ""}
                        {log.ipAddress ? ` • ${log.ipAddress}` : ""}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tablet & Desktop Table View */}
              <div className="hidden md:block overflow-x-auto -mx-1 px-1">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-stone-100 text-[11px] font-bold text-stone-500">
                      <th className="py-2 pr-3">অ্যাক্টর</th>
                      <th className="py-2 pr-3">মেথড ও রুট</th>
                      <th className="py-2 pr-3 text-center">স্ট্যাটাস</th>
                      <th className="py-2 pr-3 text-right">সময়</th>
                      <th className="py-2 text-right">তারিখ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-xs">
                    {activityLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-stone-50/80 transition-colors">
                        <td className="py-2.5 pr-3 font-semibold text-stone-900 max-w-[160px] truncate">
                          {log.actorName || "সিস্টেম"}
                        </td>
                        <td className="py-2.5 pr-3">
                          <div className="flex items-center gap-1.5 max-w-[260px]">
                            {log.method && (
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold border shrink-0 ${getMethodBadgeClass(log.method)}`}>
                                {log.method}
                              </span>
                            )}
                            <span className="font-mono text-[11px] text-stone-600 truncate" title={log.route || log.action}>
                              {log.route || log.action}
                            </span>
                          </div>
                        </td>
                        <td className="py-2.5 pr-3 text-center">
                          {log.statusCode !== undefined ? (
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${log.statusCode < 400 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                              {log.statusCode}
                            </span>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td className="py-2.5 pr-3 text-right font-mono text-[11px] text-stone-500 whitespace-nowrap">
                          {log.durationMs !== undefined ? `${log.durationMs}ms` : "—"}
                        </td>
                        <td className="py-2.5 text-right text-[11px] text-stone-500 whitespace-nowrap">
                          {formatDateBn(log.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 5. Super Admin CMS Hub */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200/90 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-stone-100 pb-3 mb-4">
          <div>
            <h3 className="text-base font-extrabold text-stone-900">
              পাবলিক ওয়েবসাইট CMS নিয়ন্ত্রণ কেন্দ্র (Content Management)
            </h3>
            <p className="text-xs text-stone-500">
              ওয়েবসাইটের প্রতিটি পাবলিক পেজ, খবর, নোটিশ, গ্যালারি ও সেটিংস এক ক্লিকে নিয়ন্ত্রণ করুন
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#D62828] text-xs font-bold border border-red-200 shrink-0">
            <ShieldCheck className="size-3.5 text-[#D62828]" />
            একচ্ছত্র সুপার অ্যাডমিন নিয়ন্ত্রণ
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {cmsShortcuts.map((sc) => {
            const Icon = sc.icon
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => onSelectTab?.(sc.id)}
                className="flex items-start gap-3 p-3.5 rounded-2xl border border-stone-200/80 bg-stone-50/50 hover:bg-red-50/40 hover:border-red-300 text-left transition-all group cursor-pointer"
              >
                <div className="p-2.5 rounded-xl bg-white border border-stone-200 text-[#D62828] group-hover:bg-[#D62828] group-hover:text-white transition-colors shadow-2xs shrink-0">
                  <Icon className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-stone-900 text-xs group-hover:text-[#D62828] transition-colors truncate">
                      {sc.title}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-200 text-stone-700 shrink-0">
                      {sc.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                    {sc.desc}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default AdminOverviewTab
