"use client"

import React from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { useGetAdminDashboardQuery } from "@/store/api/adminApi"
import { useAppStore } from "@/store/useAppStore"
import { TrendingUp, Users, HeartHandshake, CheckCircle } from "lucide-react"

export default function AnalyticsDashboardPage() {
  const { currentRole } = useAppStore()
  const { data: adminDashboard } = useGetAdminDashboardQuery(undefined, { skip: currentRole !== "SUPER_ADMIN" })

  return (
    <div className="space-y-6">
      <PageHeader
        title="এনালিটিক্স ও পারফরম্যান্স ওভারভিউ"
        description="ফাউন্ডেশনের সাহায্য বিতরণ, স্বেচ্ছাসেবক ও ক্যাম্পেইন তহবিলের সামগ্রিক পরিসংখ্যান"
        badge="এনালিটিক্স"
        badgeVariant="default"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-bold">মোট সংগৃহীত তহবিল</span>
            <TrendingUp className="size-4 text-[#D62828]" />
          </div>
          <div className="text-2xl font-black text-stone-900">
            ৳{adminDashboard?.operations?.totalDonationsAmount?.toLocaleString("bn-BD") || "১২,৫০,০০০"}
          </div>
          <p className="text-[11px] text-stone-400 mt-1">সর্বমোট প্রাপ্ত অনুদান</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-bold">মোট সাহায্য আবেদন</span>
            <HeartHandshake className="size-4 text-[#D62828]" />
          </div>
          <div className="text-2xl font-black text-stone-900">
            {adminDashboard?.operations?.totalApplications || "১৮৪"} টি
          </div>
          <p className="text-[11px] text-stone-400 mt-1">চিকিৎসা ও শিক্ষা সহায়তা</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-bold">নিবন্ধিত ব্যবহারকারী</span>
            <Users className="size-4 text-[#D62828]" />
          </div>
          <div className="text-2xl font-black text-stone-900">
            {adminDashboard?.users?.total || "৪৫"} জন
          </div>
          <p className="text-[11px] text-stone-400 mt-1">সক্রিয় ইউজার ও সদস্য</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-bold">সক্রিয় ক্যাম্পেইন</span>
            <CheckCircle className="size-4 text-[#D62828]" />
          </div>
          <div className="text-2xl font-black text-stone-900">
            {adminDashboard?.operations?.totalCampaigns || "৮"} টি
          </div>
          <p className="text-[11px] text-stone-400 mt-1">চলমান উন্নয়ন প্রজেক্ট</p>
        </div>
      </div>
    </div>
  )
}
