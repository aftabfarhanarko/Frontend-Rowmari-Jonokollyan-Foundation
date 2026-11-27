"use client"

import React from "react"
import { Users, Target, HeartPulse, ShieldCheck, FileText, Newspaper, Image as ImageIcon, Mail, UserCheck, Key, BarChart3, PieChart } from "lucide-react"

interface AdminOverviewTabProps {
  adminDashboard: any
  userItems: any[]
  volunteerItems: any[]
  campaignsCount: number
  appItems: any[]
  onSelectTab?: (tab: string) => void
}

export function AdminOverviewTab({
  adminDashboard,
  userItems,
  volunteerItems,
  campaignsCount,
  appItems,
  onSelectTab,
}: AdminOverviewTabProps) {
  const totalUsers = adminDashboard?.users?.total ?? userItems.length
  const activeUsers = adminDashboard?.users?.active ?? userItems.length
  const totalVolunteers = volunteerItems.length
  const totalCampaigns = adminDashboard?.operations?.totalCampaigns ?? campaignsCount
  const totalApplications = adminDashboard?.operations?.totalApplications ?? appItems.length

  const chartItems = [
    { label: "নিবন্ধিত ইউজার", value: totalUsers, color: "#D62828", unit: "জন" },
    { label: "সক্রিয় স্বেচ্ছাসেবক", value: totalVolunteers, color: "#E53935", unit: "জন" },
    { label: "চলমান ক্যাম্পেইন", value: totalCampaigns, color: "#B91C1C", unit: "টি" },
    { label: "ত্রাণ ও সেবা", value: totalApplications, color: "#7F1D1D", unit: "টি" },
  ]
  const maxChartVal = Math.max(...chartItems.map((i) => i.value), 1)
  const totalChartSum = chartItems.reduce((sum, i) => sum + i.value, 0) || 1

  // Build SVG donut segments
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
      value: `${totalUsers} জন`,
      subtitle: `${activeUsers} জন সক্রিয় সদস্য`,
      icon: Users,
    },
    {
      title: "স্বেচ্ছাসেবক নেটওয়ার্ক",
      value: `${totalVolunteers} জন`,
      subtitle: "মাঠপর্যায়ে সক্রিয় টিম",
      icon: Users,
    },
    {
      title: "চলমান ক্যাম্পেইন",
      value: `${totalCampaigns} টি`,
      subtitle: "মাঠপর্যায়ে সক্রিয়",
      icon: Target,
    },
    {
      title: "ত্রাণ ও সেবা বিতরণ",
      value: `${totalApplications} টি`,
      subtitle: "চিকিৎসা ও শিক্ষা কর্মসূচি",
      icon: HeartPulse,
    },
  ]

  const cmsShortcuts = [
    { id: "pages", title: "পাবলিক পেজ ম্যানেজমেন্ট", desc: "হোম, আমাদের কথা, যোগাযোগ, পলিসি ইত্যাদির টেক্সট ও ব্যানার আপডেট", badge: adminDashboard?.cms?.totalPages !== undefined ? `${adminDashboard.cms.totalPages}টি` : "CMS", icon: FileText },
    { id: "news", title: "নিউজ ও নোটিশ বোর্ড", desc: "জরুরি বিজ্ঞপ্তি, প্রেস রিলিজ ও কার্যক্রমের সংবাদ প্রকাশনা", badge: adminDashboard?.cms?.totalNews !== undefined ? `${adminDashboard.cms.totalNews}টি` : "লাইভ", icon: Newspaper },
    { id: "gallery", title: "গ্যালারি ও মিডিয়া ফাইলস", desc: "অনুষ্ঠান ও ত্রাণের ফটো অ্যালবাম ও কন্টেন্ট মিডিয়া লিংক", badge: adminDashboard?.cms?.totalGallery !== undefined ? `${adminDashboard.cms.totalGallery}টি` : "ছবি", icon: ImageIcon },
    { id: "messages", title: "যোগাযোগের বার্তা", desc: "পাবলিক ওয়েবসাইট থেকে পাঠানো সরাসরি নাগরিক বার্তা", badge: adminDashboard?.operations?.totalContactMessages ? `${adminDashboard.operations.totalContactMessages} বার্তা` : "ইনবক্স", icon: Mail },
    { id: "users", title: "ইউজার ও অ্যাকাউন্ট", desc: "নিবন্ধিত সকল সদস্যের তালিকা, অনুসন্ধান ও এক্সেস স্ট্যাটাস", badge: "ব্যবহারকারী", icon: UserCheck },
    { id: "settings", title: "ওয়েবসাইট সেটিংস ও এসইও", desc: "হটলাইন, ইমার্জেন্সি ফোন, অফিস ঠিকানা ও গ্লোবাল মেটাট্যাগ", badge: "কনফিগ", icon: Key },
  ]

  return (
    <div className="space-y-6">
      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon
          return (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs hover:border-red-200 transition-all">
              <div className="flex items-center justify-between text-stone-500 text-xs font-medium mb-2">
                <span>{kpi.title}</span>
                <div className="p-2 rounded-xl bg-red-50 text-[#D62828]">
                  <Icon className="size-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-stone-900">{kpi.value}</div>
              <div className="text-[11px] text-[#D62828] font-semibold mt-1">{kpi.subtitle}</div>
            </div>
          )
        })}
      </div>

      {/* Overview Charts (Bar Chart + Donut Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Bar Chart */}
        <div className="lg:col-span-7 bg-white p-5 rounded-3xl border border-stone-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-red-50 text-[#D62828]">
                <BarChart3 className="size-4" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-stone-900">কার্যক্রম ও নেটওয়ার্ক পরিসংখ্যান</h3>
                <p className="text-[11px] text-stone-500">সদস্য, স্বেচ্ছাসেবক, ক্যাম্পেইন ও সেবা বিতরণের তুলনামূলক চিত্র</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 sm:gap-5 items-end h-48 pt-6 pb-2 px-2 border-b border-stone-100">
            {chartItems.map((item, idx) => {
              const heightPct = Math.max(Math.round((item.value / maxChartVal) * 100), 10)
              return (
                <div key={idx} className="flex flex-col items-center h-full justify-end group">
                  <span className="text-xs font-black text-stone-900 mb-1.5">
                    {item.value} {item.unit}
                  </span>
                  <div className="w-full max-w-[48px] flex-1 flex items-end justify-center bg-stone-50 rounded-t-xl overflow-hidden">
                    <div
                      className="w-full rounded-t-xl transition-all duration-700 group-hover:opacity-90"
                      style={{ height: `${heightPct}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
          <div className="grid grid-cols-4 gap-3 sm:gap-5 pt-2.5 px-2">
            {chartItems.map((item, idx) => (
              <div key={idx} className="text-center text-[11px] font-bold text-stone-600 leading-tight">
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Donut Distribution Chart */}
        <div className="lg:col-span-5 bg-white p-5 rounded-3xl border border-stone-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-red-50 text-[#D62828]">
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
                <span className="text-xl font-black text-stone-900 leading-none">{totalChartSum}</span>
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
                    {seg.value} ({seg.pct}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Super Admin CMS Hub */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200/90 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-stone-100 pb-3 mb-4">
          <div>
            <h3 className="text-base font-extrabold text-stone-900">
              পাবলিক ওয়েবসাইট CMS নিয়ন্ত্রণ কেন্দ্র (Content Management)
            </h3>
            <p className="text-xs text-stone-500">
              ওয়েবসাইটের প্রতিটি পাবলিক পেজ, খবর, নোটিশ, গ্যালারি ও সেটিংস এক ক্লিকে নিয়ন্ত্রণ করুন
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#D62828] text-xs font-bold border border-red-200">
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
                <div className="p-2.5 rounded-xl bg-white border border-stone-200 text-[#D62828] group-hover:bg-[#D62828] group-hover:text-white transition-colors shadow-2xs">
                  <Icon className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 text-xs group-hover:text-[#D62828] transition-colors">
                      {sc.title}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-200 text-stone-700">
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
