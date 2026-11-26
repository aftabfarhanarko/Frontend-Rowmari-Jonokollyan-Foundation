"use client"

import React, { useState } from "react"

interface NotificationsTabProps {
  notifications: any[]
}

export function NotificationsTab({ notifications }: NotificationsTabProps) {
  const [notifFilter, setNotifFilter] = useState<"all" | "unread" | "urgent">("all")

  const filteredNotifications = notifications.filter((n: any) => {
    if (notifFilter === "unread") return n.isUnread
    if (notifFilter === "urgent") return n.type === "urgent"
    return true
  })

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-2xs space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-stone-900">সিস্টেম নোটিফিকেশন</h2>
        <div className="flex items-center gap-1.5">
          {(["all", "unread", "urgent"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setNotifFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                notifFilter === f
                  ? "bg-[#D62828] text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {f === "all" ? "সব" : f === "unread" ? "অপঠিত" : "জরুরি"}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-stone-100">
        {filteredNotifications.map((item: any) => (
          <div
            key={item.id}
            className="py-3 flex items-start gap-3 cursor-pointer hover:bg-red-50/20 px-2 rounded-xl transition-colors"
          >
            <div className="pt-1.5 shrink-0 w-3">
              {item.isUnread && (
                <div className="w-2.5 h-2.5 rounded-full bg-[#D62828] animate-pulse" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-stone-900">{item.titleBn}</h3>
              <p className="text-xs text-stone-500 mt-0.5">{item.descBn}</p>
              <span className="text-[11px] text-stone-400 mt-1 inline-block">
                {item.timeBn}
              </span>
            </div>
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <p className="text-sm text-stone-400 text-center py-8">কোনো নোটিফিকেশন নেই</p>
        )}
      </div>
    </div>
  )
}
export default NotificationsTab
