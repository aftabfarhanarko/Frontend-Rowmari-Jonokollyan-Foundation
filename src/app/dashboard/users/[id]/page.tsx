"use client"

import React, { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Shield,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Copy,
  Edit3,
  Loader2,
  FileText,
  Activity,
  Globe,
  AlertTriangle,
  Lock,
} from "lucide-react"
import {
  useGetAdminUserByIdQuery,
  useUpdateAdminUserStatusMutation,
  useUpdateAdminUserRolesMutation,
} from "@/store/api/adminApi"
import { useGetCurrentUserQuery } from "@/store/api/authApi"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { EditRoleModal } from "@/components/dashboard/cms/users/EditRoleModal"
import { SystemRoleItem } from "@/components/dashboard/cms/users/CreateUserModal"

const SYSTEM_ROLES: SystemRoleItem[] = [
  { key: "SUPER_ADMIN", label: "সুপার অ্যাডমিন (Super Admin)", color: "purple", desc: "পূর্ণ প্রশাসনিক ও ইউজার নিয়ন্ত্রণ ক্ষমতা" },
  { key: "ADMIN", label: "সিস্টেম অ্যাডমিন (Admin)", color: "blue", desc: "দৈনন্দিন কার্যক্রম ও সাইট পরিচালনা ক্ষমতা" },
  { key: "VOLUNTEER_MANAGER", label: "স্বেচ্ছাসেবক সমন্বয়ক", color: "amber", desc: "মাঠপর্যায়ের স্বেচ্ছাসেবক ও টিম পরিচালনা" },
  { key: "MEDICAL_COORDINATOR", label: "চিকিৎসা সমন্বয়ক", color: "rose", desc: "চিকিৎসা সহায়তা ও ফ্রি ক্যাম্পের তদারকি" },
  { key: "EDUCATION_COORDINATOR", label: "শিক্ষা সমন্বয়ক", color: "indigo", desc: "উপবৃত্তি ও শিক্ষা সহায়তা কার্যক্রম" },
  { key: "FINANCE_MANAGER", label: "অর্থ ও তহবিল ব্যবস্থাপক", color: "red", desc: "অনুদানের হিসাব ও রসিদ ব্যবস্থাপনা" },
  { key: "CONTENT_MANAGER", label: "কনটেন্ট ব্যবস্থাপক", color: "cyan", desc: "খবর, ইভেন্ট ও নোটিশ প্রকাশনা" },
  { key: "BLOOD_COORDINATOR", label: "রক্তদান সমন্বয়ক", color: "red", desc: "রক্তের অনুরোধ ও ডোনার নেটওয়ার্ক" },
  { key: "COMMUNITY_MEMBER", label: "সাধারণ সদস্য", color: "stone", desc: "সাধারণ নাগরিক / আবেদনকারী সদস্য" },
]

export default function UserDetailPage() {
  const params = useParams()
  const router = useRouter()
  const userId = params?.id as string

  const { data: user, isLoading, isError, refetch } = useGetAdminUserByIdQuery(userId, {
    skip: !userId,
  })
  const { data: currentUser } = useGetCurrentUserQuery()

  const [updateStatus, { isLoading: isUpdatingStatus }] = useUpdateAdminUserStatusMutation()
  const [updateRoles, { isLoading: isUpdatingRoles }] = useUpdateAdminUserRolesMutation()

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState("COMMUNITY_MEMBER")

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} কপি করা হয়েছে!`)
  }

  const handleToggleStatus = async () => {
    if (!user) return
    if (currentUser?.id === user.id) {
      toast.error("আপনি নিজের অ্যাকাউন্ট স্থগিত করতে পারবেন না!")
      return
    }

    const nextStatus = user.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE"
    const confirmMsg =
      nextStatus === "SUSPENDED"
        ? `আপনি কি '${user.fullName}' এর অ্যাকাউন্ট স্থগিত / ব্লক করতে চান?`
        : `আপনি কি '${user.fullName}' এর অ্যাকাউন্ট পুনরায় সক্রিয় করতে চান?`

    if (!confirm(confirmMsg)) return

    try {
      await updateStatus({ id: user.id, status: nextStatus }).unwrap()
      toast.success(nextStatus === "ACTIVE" ? "অ্যাকাউন্ট সক্রিয় করা হয়েছে" : "অ্যাকাউন্ট স্থগিত করা হয়েছে")
      refetch()
    } catch (err: any) {
      toast.error(err?.message || "স্ট্যাটাস পরিবর্তন ব্যর্থ হয়েছে")
    }
  }

  const handleOpenRoleModal = () => {
    if (!user) return
    const existingRoles = (user.roles || []).map((r) =>
      typeof r === "string" ? r : (r as any).name
    )
    setSelectedRole(existingRoles[0] || "COMMUNITY_MEMBER")
    setIsRoleModalOpen(true)
  }

  const handleSaveRole = async () => {
    if (!user) return
    try {
      await updateRoles({ id: user.id, roles: [selectedRole] }).unwrap()
      toast.success(`সফলভাবে '${user.fullName}' এর রোল আপডেট করা হয়েছে!`)
      setIsRoleModalOpen(false)
      refetch()
    } catch (err: any) {
      toast.error(err?.message || "রোল আপডেট করতে ব্যর্থ হয়েছে")
    }
  }

  if (isLoading) {
    return (
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <div className="h-6 w-48 bg-stone-200 animate-pulse rounded-md" />
        <div className="h-44 bg-white rounded-2xl border border-stone-200 animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="h-80 bg-white rounded-2xl border border-stone-200 animate-pulse lg:col-span-2" />
          <div className="h-80 bg-white rounded-2xl border border-stone-200 animate-pulse" />
        </div>
      </div>
    )
  }

  if (isError || !user) {
    return (
      <div className="p-12 text-center max-w-lg mx-auto bg-white rounded-2xl border border-stone-200 shadow-sm mt-8">
        <AlertTriangle className="size-12 text-[#D62828] mx-auto mb-3" />
        <h2 className="text-lg font-bold text-stone-900">ইউজার তথ্য খুঁজে পাওয়া যায়নি</h2>
        <p className="text-xs text-stone-500 mt-1 mb-6">
          অনুরোধকৃত ইউজার অ্যাকাউন্টটি মুছে ফেলা হয়ে থাকতে পারে অথবা আপনার দেখার অনুমতি নেই।
        </p>
        <Link
          href="/dashboard/users"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D62828] text-white text-xs font-semibold hover:bg-[#B91C1C] transition"
        >
          <ArrowLeft className="size-4" />
          <span>ইউজার তালিকায় ফিরে যান</span>
        </Link>
      </div>
    )
  }

  const roleNames = (user.roles || []).map((r) =>
    typeof r === "string" ? r : (r as any).name
  )
  const primaryRole = roleNames[0] || "COMMUNITY_MEMBER"
  const isSuperAdmin = primaryRole === "SUPER_ADMIN"
  const isSelf = currentUser?.id === user.id
  const roleMeta = SYSTEM_ROLES.find((r) => r.key === primaryRole)

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      {/* Top Breadcrumb & Back navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <Link href="/dashboard" className="hover:text-stone-900">
            ড্যাশবোর্ড
          </Link>
          <span>/</span>
          <Link href="/dashboard/users" className="hover:text-stone-900">
            ইউজার ও সুপার অ্যাডমিন ব্যবস্থাপনা
          </Link>
          <span>/</span>
          <span className="font-semibold text-stone-900 truncate max-w-xs">{user.fullName}</span>
        </div>

        <Link
          href="/dashboard/users"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900"
        >
          <ArrowLeft className="size-3.5" />
          <span>ইউজার তালিকায় ফিরুন</span>
        </Link>
      </div>

      {/* Main Profile Header Banner Card */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="size-16 sm:size-20 rounded-2xl bg-red-100 text-[#D62828] font-black text-2xl sm:text-3xl flex items-center justify-center shrink-0 border-2 border-red-200 shadow-xs">
              {user.fullName?.slice(0, 1) || "U"}
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
                  {user.fullName}
                </h1>
                {isSelf && (
                  <span className="text-[11px] bg-red-50 text-[#D62828] border border-red-200 px-2 py-0.5 rounded-full font-bold">
                    (আপনি)
                  </span>
                )}
                <Badge
                  variant="outline"
                  className={
                    user.status === "ACTIVE"
                      ? "border-emerald-300 bg-emerald-50 text-emerald-800 text-xs font-bold"
                      : "border-red-300 bg-red-50 text-red-800 text-xs font-bold"
                  }
                >
                  {user.status === "ACTIVE" ? "সক্রিয় অ্যাকাউন্ট" : "অ্যাকাউন্ট স্থগিত"}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-500">
                <span className="font-mono text-stone-400">ID: {user.id}</span>
                <span className="flex items-center gap-1">
                  <MapPin className="size-3 text-[#D62828]" />
                  <span>
                    {user.upazila || "রৌমারী"}, {user.district || "কুড়িগ্রাম"}
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="size-3 text-stone-400" />
                  <span>নিবন্ধন: {new Date(user.createdAt).toLocaleDateString("bn-BD")}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 pt-4 md:pt-0 border-t md:border-t-0 border-stone-100">
            <Button
              type="button"
              variant="outline"
              onClick={handleOpenRoleModal}
              className="border-stone-300 text-stone-700 hover:bg-stone-100 text-xs gap-1.5 cursor-pointer"
            >
              <Edit3 className="size-3.5 text-[#D62828]" />
              <span>রোল পরিবর্তন করুন</span>
            </Button>

            <Button
              type="button"
              disabled={isSelf || (isSuperAdmin && user.status === "ACTIVE") || isUpdatingStatus}
              onClick={handleToggleStatus}
              className={
                user.status === "ACTIVE"
                  ? "bg-amber-600 hover:bg-amber-700 text-white text-xs cursor-pointer"
                  : "bg-[#D62828] hover:bg-[#B91C1C] text-white text-xs cursor-pointer"
              }
            >
              {isUpdatingStatus ? (
                <Loader2 className="size-3.5 animate-spin mr-1.5" />
              ) : null}
              {user.status === "ACTIVE" ? "অ্যাকাউন্ট স্থগিত করুন" : "অ্যাকাউন্ট সক্রিয় করুন"}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Grid: Details breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Personal & Roles Info */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Contact & Personal Details */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100 font-bold text-stone-800 text-sm">
              <UserIcon className="size-4 text-[#D62828]" />
              <span>ব্যক্তিগত ও যোগাযোগের তথ্য</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
                <span className="text-[11px] text-stone-400 font-medium">মোবাইল ফোন নম্বর</span>
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-stone-900 text-sm">{user.phone}</span>
                  <button
                    onClick={() => copyToClipboard(user.phone, "ফোন নম্বর")}
                    className="p-1 text-stone-400 hover:text-stone-700"
                    title="কপি করুন"
                  >
                    <Copy className="size-3.5" />
                  </button>
                </div>
                <div className="flex items-center gap-1 text-[11px] pt-1">
                  {user.isPhoneVerified ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="size-3" /> ফোন ভেরিফাইড
                    </span>
                  ) : (
                    <span className="text-stone-500 flex items-center gap-1">
                      <ShieldAlert className="size-3 text-amber-500" /> ফোন নন-ভেরিফাইড
                    </span>
                  )}
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
                <span className="text-[11px] text-stone-400 font-medium">ইমেইল ঠিকানা</span>
                <div className="flex items-center justify-between">
                  <span className="font-sans font-bold text-stone-900 text-xs truncate max-w-[190px]">
                    {user.email}
                  </span>
                  <button
                    onClick={() => copyToClipboard(user.email, "ইমেইল")}
                    className="p-1 text-stone-400 hover:text-stone-700"
                    title="কপি করুন"
                  >
                    <Copy className="size-3.5" />
                  </button>
                </div>
                <div className="flex items-center gap-1 text-[11px] pt-1">
                  {user.isEmailVerified ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="size-3" /> ইমেইল ভেরিফাইড
                    </span>
                  ) : (
                    <span className="text-stone-500 flex items-center gap-1">
                      <ShieldAlert className="size-3 text-amber-500" /> ইমেইল নন-ভেরিফাইড
                    </span>
                  )}
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
                <span className="text-[11px] text-stone-400 font-medium">জেলা ও উপজেলা</span>
                <div className="font-semibold text-stone-800">
                  {user.upazila || "রৌমারী"}, {user.district || "কুড়িগ্রাম"}
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
                <span className="text-[11px] text-stone-400 font-medium">ঠিকানা / গ্রাম / ইউনিয়ন</span>
                <div className="font-semibold text-stone-800">
                  {user.address || "ঠিকানা প্রদান করা হয়নি"}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Roles and System Permissions */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2 font-bold text-stone-800 text-sm">
                <Shield className="size-4 text-[#D62828]" />
                <span>নির্ধারিত রোল ও পারমিশন বিস্তারিত</span>
              </div>
              <span className="text-[11px] bg-red-50 text-[#D62828] px-2 py-0.5 rounded-full font-bold">
                {roleNames.length} টি রোল সক্রিয়
              </span>
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-stone-900">
                  {roleMeta?.label || primaryRole}
                </span>
                <Badge variant="outline" className="text-[10px] bg-white border-stone-300">
                  {primaryRole}
                </Badge>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {roleMeta?.desc || "ফাউন্ডেশনের সিস্টেমে নির্ধারিত প্রশাসনিক বা নাগরিক অধিকার"}
              </p>
            </div>

            {/* List all permissions if present */}
            {Array.isArray(user.roles) && user.roles.some((r: any) => r.permissions?.length > 0) ? (
              <div className="space-y-2">
                <span className="text-xs font-bold text-stone-600 block">
                  সিস্টেম এক্সেস পারমিশনসমূহ:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {user.roles.flatMap((r: any) =>
                    (r.permissions || []).map((perm: any) => (
                      <span
                        key={perm.id || perm.name}
                        className="px-2 py-1 rounded-lg bg-stone-100 border border-stone-200 text-stone-700 font-mono text-[10px]"
                      >
                        {perm.resource ? `${perm.resource}:${perm.action}` : perm.name}
                      </span>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="text-xs text-stone-400 italic">
                {isSuperAdmin
                  ? "★ সুপার অ্যাডমিন হিসেবে সমস্ত মডিউল ও ডাটাবেজে পূর্ণ বাইপাস পারমিশন রয়েছে।"
                  : "সাধারণ সদস্য পারমিশন কার্যকর রয়েছে।"}
              </div>
            )}
          </div>

          {/* Card 3: Recent Assistance Applications */}
          {user.recentApplications && user.recentApplications.length > 0 && (
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 font-bold text-stone-800 text-sm">
                <div className="flex items-center gap-2">
                  <FileText className="size-4 text-[#D62828]" />
                  <span>ইউজারের সহায়তা আবেদন হিস্ট্রি</span>
                </div>
                <span className="text-xs text-stone-500 font-normal">
                  মোট {user.stats?.applicationCount || user.recentApplications.length} টি
                </span>
              </div>

              <div className="divide-y divide-stone-100">
                {user.recentApplications.map((app) => (
                  <div key={app.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-stone-900">{app.title}</div>
                      <div className="text-[11px] text-stone-400 font-mono">
                        ট্র্যাকিং কোড: {app.referenceCode} • ক্যাটাগরি: {app.category}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px] font-bold">
                      {app.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (5 cols): Security, Login Meta & Audit */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 1: Security & IP Tracking */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100 font-bold text-stone-800 text-sm">
              <Lock className="size-4 text-[#D62828]" />
              <span>নিরাপত্তা ও অডিট ট্র্যাক</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500 flex items-center gap-1.5">
                  <Calendar className="size-3.5 text-stone-400" />
                  <span>অ্যাকাউন্ট খোলার তারিখ</span>
                </span>
                <span className="font-semibold text-stone-800">
                  {new Date(user.createdAt).toLocaleString("bn-BD")}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500 flex items-center gap-1.5">
                  <Clock className="size-3.5 text-stone-400" />
                  <span>সর্বশেষ লগইন</span>
                </span>
                <span className="font-semibold text-stone-800">
                  {user.lastLoginAt
                    ? new Date(user.lastLoginAt).toLocaleString("bn-BD")
                    : "রেকর্ড পাওয়া যায়নি"}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500 flex items-center gap-1.5">
                  <Globe className="size-3.5 text-stone-400" />
                  <span>সর্বশেষ লগইন IP</span>
                </span>
                <span className="font-mono font-semibold text-stone-800">
                  {user.lastLoginIp || "১ম সেশন"}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5">
                <span className="text-stone-500 flex items-center gap-1.5">
                  <Globe className="size-3.5 text-stone-400" />
                  <span>নিবন্ধনকালীন IP</span>
                </span>
                <span className="font-mono font-semibold text-stone-800">
                  {user.registrationIp || "নিবন্ধিত"}
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Recent Activity Audit Logs */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100 font-bold text-stone-800 text-sm">
              <Activity className="size-4 text-[#D62828]" />
              <span>সাম্প্রতিক সিস্টেম অডিট লগ</span>
            </div>

            {user.recentAuditLogs && user.recentAuditLogs.length > 0 ? (
              <div className="space-y-3">
                {user.recentAuditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-800">{log.action}</span>
                      <span className="text-[10px] text-stone-400">
                        {new Date(log.createdAt).toLocaleTimeString("bn-BD")}
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-500 flex items-center justify-between">
                      <span>মডিউল: {log.entityType}</span>
                      {log.ipAddress && <span className="font-mono">{log.ipAddress}</span>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-stone-400 italic text-center py-4">
                কোনো সাম্প্রতিক অডিট রেকর্ড নেই।
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Role Edit Modal */}
      {isRoleModalOpen && (
        <EditRoleModal
          user={user}
          onClose={() => setIsRoleModalOpen(false)}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          isUpdating={isUpdatingRoles}
          onSave={handleSaveRole}
          roles={SYSTEM_ROLES}
        />
      )}
    </div>
  )
}
