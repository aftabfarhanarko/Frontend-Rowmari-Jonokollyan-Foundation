"use client"

import React from "react"
import { useAppStore } from "@/store/useAppStore"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"

interface MyApplicationsTabProps {
  myApps: any[]
}

export function MyApplicationsTab({ myApps }: MyApplicationsTabProps) {
  const { setAssistanceModalOpen } = useAppStore()

  return (
    <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-bold text-stone-900">
            আমার সাহায্য আবেদন ও বর্তমান অবস্থা
          </h2>
          <p className="text-xs text-stone-500">
            আপনার জমা দেওয়া সকল মানবিক সহায়তা আবেদনের রিয়েলটাইম অগ্রগতি (API: /api/track/[id])
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => window.location.href = '/donate'}
          className="bg-[#D62828] hover:bg-[#B91C1C] text-white text-xs gap-1.5 cursor-pointer font-bold shadow-xs"
        >
          <Plus className="size-3.5" />
          <span>তহবিলে অনুদান দিন</span>
        </Button>
      </div>

      <div className="space-y-3">
        {myApps.length === 0 ? (
          <p className="text-sm text-stone-400 text-center py-8">
            এখনো কোনো আবেদন জমা দেওয়া হয়নি।
          </p>
        ) : (
          myApps.map((app: any) => (
            <div
              key={app.id}
              className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2 hover:border-red-200 transition-colors"
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold bg-white px-2 py-0.5 rounded border border-stone-200 text-stone-800">
                    {app.id}
                  </span>
                  <span className="font-bold text-stone-900 text-sm">{app.categoryBn}</span>
                </div>
                <Badge className="bg-[#D62828] text-white text-[10px]">{app.statusTitle}</Badge>
              </div>
              <p className="text-xs text-stone-600 bg-white p-2.5 rounded-lg border border-stone-100">
                <strong className="text-stone-800">সর্বশেষ আপডেট:</strong> {app.note}
              </p>
              <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                <span>কর্মকর্তা: {app.officer}</span>
                <span className="font-semibold text-[#D62828]">
                  বরাদ্দ: {app.approvedAmount}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
export default MyApplicationsTab
