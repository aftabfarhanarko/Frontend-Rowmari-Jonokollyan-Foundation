"use client"

import React from "react"
import { useAppStore } from "@/store/useAppStore"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface MyVolunteerTabProps {
  currentUser: any
}

export function MyVolunteerTab({ currentUser }: MyVolunteerTabProps) {
  const { setVolunteerModalOpen } = useAppStore()

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/90 shadow-2xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
        <div>
          <h2 className="text-lg font-bold text-stone-900">স্বেচ্ছাসেবক প্রোফাইল ও কার্যক্রম</h2>
          <p className="text-xs text-stone-500">
            রৌমারী জনকল্যাণ ফাউন্ডেশনের মানবিক সেবা কার্যক্রমে আপনার সক্রিয় অংশগ্রহণ
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => setVolunteerModalOpen(true)}
          className="bg-[#D62828] hover:bg-[#B91C1C] text-white text-xs gap-1.5 cursor-pointer shadow-xs font-bold"
        >
          <Plus className="size-3.5" />
          <span>স্বেচ্ছাসেবক নিবন্ধন / তথ্য আপডেট</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-red-50/50 border border-red-200/80 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D62828] animate-pulse" />
            <h3 className="font-bold text-red-950 text-sm">মাঠপর্যায়ের সেবায় অংশগ্রহণ</h3>
          </div>
          <p className="text-xs text-red-900/80 leading-relaxed font-normal">
            বন্যা ত্রাণ, শীতবস্ত্র বিতরণ, চক্ষু ও মেডিকেল ক্যাম্প এবং রক্তের প্রয়োজনে জরুরি সমন্বয়ের জন্য তরুণ ও যুবসমাজের স্বেচ্ছাশ্রমই আমাদের ফাউন্ডেশনের মূল চালিকাশক্তি।
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
          <h3 className="font-bold text-stone-900 text-sm">কার্যক্রম এলাকা ও ফিল্ড শাখা</h3>
          <p className="text-xs text-stone-600 leading-relaxed font-normal">
            রৌমারী সদর, দাঁতভাঙ্গা, যাদুরচর, বন্দবেড়, শৌলমারী ও ব্রহ্মপুত্রের নদীবেষ্টিত চরাঞ্চল।
          </p>
          <div className="text-xs text-stone-500">
            স্বেচ্ছাসেবক আইডি:{" "}
            <strong className="text-stone-800">
              {currentUser?.id
                ? `RJF-VOL-${currentUser.id.slice(0, 6).toUpperCase()}`
                : "RJF-VOL-PENDING"}
            </strong>
          </div>
        </div>
      </div>
    </div>
  )
}
export default MyVolunteerTab
