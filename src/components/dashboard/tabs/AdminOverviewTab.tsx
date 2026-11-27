"use client"

import React from "react"
import { Users, Target, HeartPulse, ShieldCheck, FileText, Newspaper, Image as ImageIcon, Mail, UserCheck, Key } from "lucide-react"

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
  const kpis = [
    {
      title: "মোট নিবন্ধিত ইউজার",
      value: adminDashboard?.users?.total !== undefined ? `${adminDashboard.users.total} জন` : `${userItems.length} জন`,
      subtitle: adminDashboard?.users?.active !== undefined ? `${adminDashboard.users.active} জন সক্রিয় সদস্য` : "সকল সাধারণ সদস্য",
      icon: Users,
    },
    {
      title: "স্বেচ্ছাসেবক নেটওয়ার্ক",
      value: `${volunteerItems.length} জন`,
      subtitle: "মাঠপর্যায়ে সক্রিয় টিম",
      icon: Users,
    },
    {
      title: "চলমান ক্যাম্পেইন",
      value: adminDashboard?.operations?.totalCampaigns !== undefined ? `${adminDashboard.operations.totalCampaigns} টি` : `${campaignsCount} টি`,
      subtitle: "মাঠপর্যায়ে সক্রিয়",
      icon: Target,
    },
    {
      title: "ত্রাণ ও সেবা বিতরণ",
      value: adminDashboard?.operations?.totalApplications !== undefined ? `${adminDashboard.operations.totalApplications} টি` : `${appItems.length} টি`,
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
