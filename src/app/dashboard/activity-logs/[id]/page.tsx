"use client"

import React from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import {
  Activity,
  ShieldCheck,
  User,
  Globe,
  Terminal,
  Clock,
  Layers,
  FileCode,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import { DetailPageLayout } from "@/components/dashboard/DetailPageLayout"
import { useGetAuditLogByIdQuery } from "@/store/api/dashboardApi"
import { Button } from "@/components/ui/button"

export default function ActivityLogDetailPage() {
  const params = useParams()
  const id = params?.id as string

  const { data: log, isLoading, isError } = useGetAuditLogByIdQuery(id, {
    skip: !id,
  })

  const isSuccess = log?.statusCode ? log.statusCode < 400 : true

  return (
    <DetailPageLayout
      moduleTitle="সিস্টেম অ্যাক্টিভিটি অডিট লগ"
      moduleHref="/dashboard/activity-logs"
      title={log?.action || "অডিট লগ বিবরণ"}
      subtitle={log?.entityType ? `এনটিটি টাইপ: ${log.entityType} ${log.entityId ? `(#${log.entityId})` : ""}` : undefined}
      badge={
        <span
          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
            isSuccess
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {isSuccess ? <CheckCircle className="size-3.5" /> : <AlertTriangle className="size-3.5" />}
          {log?.statusCode ? `HTTP ${log.statusCode}` : "অডিট রেকর্ড"}
        </span>
      }
      icon={Activity}
      id={log?.id || id}
      createdAt={log?.createdAt}
      isLoading={isLoading}
      isError={isError}
      actions={
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/activity-logs"
            className="inline-flex items-center px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition"
          >
            লগ তালিকায় ফিরুন
          </Link>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Details (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Action Overview Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
            <h3 className="text-sm font-bold text-stone-900 mb-4 pb-3 border-b border-stone-100 flex items-center gap-2">
              <Terminal className="size-4 text-[#D62828]" />
              অ্যাকশন ও রিকোয়েস্ট বিবরণ
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100">
                <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                  অ্যাকশন নাম
                </p>
                <p className="text-sm font-bold font-mono text-[#D62828]">{log?.action || "—"}</p>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100">
                <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                  লক্ষ্যবস্তু এনটিটি
                </p>
                <p className="text-sm font-bold text-stone-900">{log?.entityType || "—"}</p>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100">
                <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                  HTTP মেথড
                </p>
                <span className="inline-block px-2.5 py-0.5 rounded-lg text-xs font-bold font-mono bg-stone-200 text-stone-800">
                  {log?.method || "N/A"}
                </span>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100">
                <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                  রেসপন্স টাইম
                </p>
                <p className="text-sm font-bold font-mono text-stone-900">
                  {log?.durationMs !== null && log?.durationMs !== undefined ? `${log.durationMs} ms` : "—"}
                </p>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100 sm:col-span-2">
                <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                  এপিআই রুট / ইউআরএল
                </p>
                <p className="text-xs font-mono text-stone-800 break-all">{log?.route || "—"}</p>
              </div>
            </div>
          </div>

          {/* Metadata JSON Viewer */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-stone-900 pb-3 border-b border-stone-100 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileCode className="size-4 text-[#D62828]" />
                মেটাডাটা ও পেলোড (Payload Details)
              </span>
              <span className="text-[10px] font-mono text-stone-400">JSON Object</span>
            </h3>

            <pre className="p-4 bg-stone-900 text-stone-100 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed max-h-96">
              {log?.metadata ? JSON.stringify(log.metadata, null, 2) : "// কোনো মেটাডাটা সংরক্ষিত নেই"}
            </pre>
          </div>
        </div>

        {/* Sidebar Cards (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Actor Info */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider pb-3 border-b border-stone-100 flex items-center gap-2">
              <User className="size-4 text-[#D62828]" />
              ব্যবহারকারী / অ্যাক্টরের তথ্য
            </h4>

            <div className="space-y-3 text-xs">
              <div>
                <p className="text-[10px] text-stone-400">নাম</p>
                <p className="font-bold text-stone-900">{log?.actorName || "সিস্টেম বট / অজ্ঞাত"}</p>
              </div>

              <div>
                <p className="text-[10px] text-stone-400">অ্যাক্টর আইডি</p>
                <p className="font-mono text-stone-600 break-all">{log?.actorId || "System"}</p>
              </div>
            </div>
          </div>

          {/* Network & Device Info */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider pb-3 border-b border-stone-100 flex items-center gap-2">
              <Globe className="size-4 text-[#D62828]" />
              নেটওয়ার্ক ও ক্লায়েন্ট তথ্য
            </h4>

            <div className="space-y-3 text-xs">
              <div>
                <p className="text-[10px] text-stone-400">আইপি ঠিকানা (IP Address)</p>
                <p className="font-mono font-bold text-stone-900">{log?.ipAddress || "127.0.0.1"}</p>
              </div>

              <div>
                <p className="text-[10px] text-stone-400">ইউজার এজেন্ট (User Agent)</p>
                <p className="text-stone-600 font-mono text-[11px] leading-relaxed break-all">
                  {log?.userAgent || "—"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DetailPageLayout>
  )
}
