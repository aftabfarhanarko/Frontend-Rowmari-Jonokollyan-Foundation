"use client"

import React from "react"
import { useAppStore } from "@/store/useAppStore"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Target, Mail, Users, CheckCircle2, Plus, UserCheck } from "lucide-react"

interface MemberOverviewTabProps {
  onSelectTab?: (tab: string) => void
  currentUser: any
  myApps: any[]
  campaignsCount: number
}

export function MemberOverviewTab({
  onSelectTab,
  currentUser,
  myApps,
  campaignsCount,
}: MemberOverviewTabProps) {
  const { setAssistanceModalOpen, setVolunteerModalOpen } = useAppStore()

  const approvedAppsCount = myApps.filter(
    (a: any) => a.status === "approved" || a.statusTitle === "অনুমোদিত"
  ).length

  return (
    <div className="space-y-6">
      {/* Member Welcome Banner */}
      <div className="bg-gradient-to-br from-[#D62828] via-[#B91C1C] to-[#991B1B] text-white p-6 rounded-2xl shadow-md relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-red-100 text-xs font-bold">
              <UserCheck className="w-3.5 h-3.5" />
              <span>কমিউনিটি মেম্বার / সাধারণ নাগরিক</span>
            </span>
            <span className="text-xs text-red-200/90 font-mono">
              আইডি: {currentUser?.id?.slice(0, 8) || "RJF-MBR"}
            </span>
          </div>

          <div className="flex items-center gap-3.5">
            {currentUser?.avatarUrl ? (
              <img
                src={currentUser.avatarUrl}
                alt={currentUser?.fullName || "ব্যবহারকারী"}
                className="w-14 h-14 rounded-full border-2 border-white/60 object-cover shadow-sm shrink-0"
              />
            ) : (
              <div className="w-12 h-12 rounded-full border border-white/30 bg-white/10 flex items-center justify-center font-bold text-lg text-white shrink-0">
                {currentUser?.fullName?.charAt(0) || "U"}
              </div>
            )}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                স্বাগতম, {currentUser?.fullName || "সম্মানিত সদস্য"}!
              </h2>
              <p className="text-xs sm:text-sm text-red-100/90 mt-0.5 max-w-2xl leading-relaxed">
                রৌমারী জনকল্যাণ ফাউন্ডেশনের মেম্বার পোর্টালে আপনার সকল ব্যক্তিগত সেবা ও সহায়তা আবেদন পর্যবেক্ষণ করুন।
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs text-red-100">
            <span className="bg-black/20 px-3 py-1 rounded-lg">মোবাইল: <strong>{currentUser?.phone || "সংরক্ষিত"}</strong></span>
            <span className="bg-black/20 px-3 py-1 rounded-lg">ইমেইল: <strong>{currentUser?.email || "সংরক্ষিত"}</strong></span>
            <span className="bg-black/20 px-3 py-1 rounded-lg">শাখা: <strong>রৌমারী, কুড়িগ্রাম</strong></span>
          </div>
        </div>
      </div>

      {/* 4 Quick Activity Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div onClick={() => onSelectTab?.("my-applications")} className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer group">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium mb-2">
            <span>আমার সহায়তা আবেদন</span>
            <div className="p-2 rounded-xl bg-red-50 text-[#D62828] group-hover:bg-[#D62828] group-hover:text-white transition-colors">
              <FileText className="size-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-stone-900">{myApps.length} টি</div>
          <div className="text-[11px] text-[#D62828] font-semibold mt-1">{approvedAppsCount} টি অনুমোদিত</div>
        </div>

        <div onClick={() => onSelectTab?.("campaigns")} className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer group">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium mb-2">
            <span>চলমান ক্যাম্পেইন</span>
            <div className="p-2 rounded-xl bg-red-50 text-[#D62828] group-hover:bg-[#D62828] group-hover:text-white transition-colors">
              <Target className="size-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-stone-900">{campaignsCount} টি</div>
          <div className="text-[11px] text-[#D62828] font-semibold mt-1">মাঠপর্যায়ে সক্রিয়</div>
        </div>

        <div onClick={() => onSelectTab?.("messages")} className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer group">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium mb-2">
            <span>যোগাযোগ ও বার্তা</span>
            <div className="p-2 rounded-xl bg-red-50 text-[#D62828] group-hover:bg-[#D62828] group-hover:text-white transition-colors">
              <Mail className="size-4" />
            </div>
          </div>
          <div className="text-lg font-black text-stone-900">সরাসরি বার্তা</div>
          <div className="text-[11px] text-[#D62828] font-semibold mt-1 flex items-center gap-1">
            <CheckCircle2 className="size-3" />
            <span>হেল্পলাইন ২৪/৭</span>
          </div>
        </div>

        <div onClick={() => setVolunteerModalOpen(true)} className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer group">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium mb-2">
            <span>স্বেচ্ছাসেবক কার্যক্রম</span>
            <div className="p-2 rounded-xl bg-red-50 text-[#D62828] group-hover:bg-[#D62828] group-hover:text-white transition-colors">
              <Users className="size-4" />
            </div>
          </div>
          <div className="text-lg font-black text-stone-900">কমিউনিটি উইং</div>
          <div className="text-[11px] text-[#D62828] font-semibold mt-1 flex items-center gap-1">
            <Plus className="size-3" />
            <span>অংশগ্রহণ করুন</span>
          </div>
        </div>
      </div>

      {/* Member Quick Action Buttons */}
      <div className="bg-stone-50/80 p-4 sm:p-5 rounded-2xl border border-stone-200">
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-3">
          এক ক্লিকে আপনার প্রয়োজনীয় সেবা গ্রহণ করুন
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Button onClick={() => setAssistanceModalOpen(true)} className="bg-[#D62828] hover:bg-[#B91C1C] text-white text-xs py-2.5 h-auto justify-start gap-2 shadow-xs cursor-pointer">
            <FileText className="size-4" />
            <span>সহায়তার নতুন আবেদন</span>
          </Button>

          <Button onClick={() => setVolunteerModalOpen(true)} variant="outline" className="border-stone-300 bg-white hover:bg-red-50 text-stone-800 hover:text-[#D62828] text-xs py-2.5 h-auto justify-start gap-2 shadow-xs cursor-pointer">
            <Users className="size-4 text-stone-600" />
            <span>স্বেচ্ছাসেবক আবেদন</span>
          </Button>

          <Button onClick={() => onSelectTab?.("my-profile")} variant="outline" className="border-red-200 bg-white hover:bg-red-50 text-[#D62828] text-xs py-2.5 h-auto justify-start gap-2 shadow-xs cursor-pointer">
            <UserCheck className="size-4 text-[#D62828]" />
            <span>প্রোফাইল সেটিংস</span>
          </Button>
        </div>
      </div>

      {/* Recent Activities Preview */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
            <FileText className="size-4 text-[#D62828]" />
            <span>আমার সহায়তা আবেদনসমূহ</span>
          </h4>
          <button onClick={() => onSelectTab?.("my-applications")} className="text-xs font-semibold text-[#D62828] hover:underline cursor-pointer">
            সব দেখুন
          </button>
        </div>

        {myApps.length === 0 ? (
          <p className="text-xs text-stone-400 py-3 text-center">এখনো কোনো আবেদন করা হয়নি</p>
        ) : (
          myApps.slice(0, 5).map((app: any) => (
            <div key={app.id} className="p-3 rounded-xl bg-stone-50 border border-stone-200/70 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-stone-800">{app.id}</span>
                <Badge className="bg-[#D62828] text-white text-[10px]">{app.statusTitle}</Badge>
              </div>
              <div className="font-semibold text-stone-900">{app.categoryBn}</div>
              <div className="text-stone-500 text-[11px]">{app.note}</div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
export default MemberOverviewTab
