"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ShieldCheck, ShieldAlert, Loader2, Activity, Calendar, Globe, Eye } from "lucide-react"
import { useGetAdminActivityLogsQuery } from "@/store/api/adminApi"
import { Badge } from "@/components/ui/badge"
import { SkeletonTable } from "@/components/ui/skeleton"

export function CmsActivityLogsTab() {
  const [page, setPage] = useState(1)
  const { data: logsRes, isLoading, refetch } = useGetAdminActivityLogsQuery({ page, limit: 50 })
  const logs: any[] = Array.isArray(logsRes) ? logsRes : (logsRes as any)?.items || []

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#D62828] uppercase tracking-wider mb-1">
            <ShieldCheck className="size-4" />
            <span>সুপার অ্যাডমিন অডিট ট্রেইল (Immutable Audit Logs)</span>
          </div>
          <h2 className="text-xl font-black text-stone-900">সিস্টেম অ্যাক্টিভিটি ও নিরাপত্তা লগ</h2>
          <p className="text-xs text-stone-500 mt-0.5">
            সুপার অ্যাডমিন ও সিস্টেমের প্রতিটি পরিবর্তন, লগইন, কন্টেন্ট আপডেট ও স্ট্যাটাস পরিবর্তনের অপরিবর্তনীয় রেকর্ড
          </p>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          className="text-xs font-bold px-3 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 transition cursor-pointer"
        >
          লগ রিফ্রেশ করুন
        </button>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
        {isLoading ? (
          <div className="p-4">
            <SkeletonTable rows={8} columns={5} showToolbar={false} showPagination={false} />
          </div>
        ) : logs.length === 0 ? (
          <div className="p-12 text-center text-stone-500 space-y-2">
            <Activity className="size-10 text-stone-300 mx-auto" />
            <p className="text-sm font-semibold">কোনো সাম্প্রতিক অডিট রেকর্ড পাওয়া যায়নি</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200/80 text-stone-600 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">অ্যাকশন</th>
                  <th className="py-3 px-4">অ্যাক্টর / প্রশাসক</th>
                  <th className="py-3 px-4">মডিউল / রিসোর্স</th>
                  <th className="py-3 px-4">মেথড ও রুট</th>
                  <th className="py-3 px-4">আইপি ঠিকানা</th>
                  <th className="py-3 px-4 text-right">সময় ও তারিখ</th>
                  <th className="py-3 px-4 text-right">বিস্তারিত</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {logs.map((log: any) => (
                  <tr key={log.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-stone-900">
                      <Link href={`/dashboard/activity-logs/${log.id}`} className="hover:opacity-80 transition inline-block">
                        <Badge
                          variant="outline"
                          className={
                            log.action?.includes("DELETE")
                              ? "border-red-300 bg-red-50 text-red-800 text-[10px]"
                              : log.action?.includes("UPDATE") || log.action?.includes("PUT") || log.action?.includes("PATCH")
                              ? "border-amber-300 bg-amber-50 text-amber-800 text-[10px]"
                              : "border-red-300 bg-red-50 text-red-800 text-[10px]"
                          }
                        >
                          {log.action}
                        </Badge>
                      </Link>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-stone-800">
                      {log.actorName || log.actorId || "System Admin"}
                    </td>

                    <td className="py-3.5 px-4 text-stone-600">
                      {log.entityType || "General"}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-stone-500">
                      {log.method && <strong className="text-stone-700 mr-1">{log.method}</strong>}
                      {log.route || "—"}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-stone-400 text-[11px]">
                      {log.ipAddress || "127.0.0.1"}
                    </td>

                    <td className="py-3.5 px-4 text-right text-stone-500 font-mono text-[11px]">
                      {new Date(log.createdAt).toLocaleString("bn-BD")}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/dashboard/activity-logs/${log.id}`}
                        className="inline-flex p-1.5 rounded-lg text-stone-500 hover:text-[#D62828] hover:bg-stone-100"
                        title="লগ বিস্তারিত দেখুন"
                      >
                        <Eye className="size-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
export default CmsActivityLogsTab
