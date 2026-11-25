"use client"

import React, { useState } from "react"
import {
  Users,
  Search,
  UserCheck,
  UserX,
  Shield,
  Loader2,
  Calendar,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
} from "lucide-react"
import {
  useGetSuperAdminUsersQuery,
  useUpdateAdminUserStatusMutation,
  AdminUserItem,
} from "@/store/api/adminApi"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function CmsUsersTab() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("ALL")
  const [page, setPage] = useState(1)

  const { data: usersRes, isLoading, refetch } = useGetSuperAdminUsersQuery({
    page,
    limit: 50,
    q: search || undefined,
    status: statusFilter !== "ALL" ? statusFilter : undefined,
  })

  const usersList: AdminUserItem[] = Array.isArray(usersRes)
    ? usersRes
    : (usersRes as any)?.items || []
  const totalUsers = (usersRes as any)?.total || usersList.length

  const [updateStatus, { isLoading: isUpdatingStatus }] = useUpdateAdminUserStatusMutation()

  const handleToggleStatus = async (user: AdminUserItem) => {
    const isSuperAdmin = (user.roles || []).some(
      (r) => (typeof r === "string" ? r : (r as any).name) === "SUPER_ADMIN"
    )
    if (isSuperAdmin) {
      toast.error("সুপার অ্যাডমিন অ্যাকাউন্ট নিষ্ক্রিয় করা সম্ভব নয়!")
      return
    }

    const nextStatus = user.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE"
    const confirmMsg =
      nextStatus === "SUSPENDED"
        ? `আপনি কি নিশ্চিতভাবে '${user.fullName}' এর অ্যাকাউন্ট স্থগিত / ব্লক করতে চান?`
        : `আপনি কি '${user.fullName}' এর অ্যাকাউন্ট পুনরায় সক্রিয় করতে চান?`

    if (!confirm(confirmMsg)) return

    try {
      await updateStatus({ id: user.id, status: nextStatus }).unwrap()
      toast.success(
        nextStatus === "ACTIVE"
          ? "অ্যাকাউন্ট সক্রিয় করা হয়েছে"
          : "অ্যাকাউন্ট স্থগিত করা হয়েছে"
      )
      refetch()
    } catch (err: any) {
      toast.error(err?.message || "স্ট্যাটাস পরিবর্তন ব্যর্থ হয়েছে")
    }
  }

  const activeCount = usersList.filter((u) => u.status === "ACTIVE").length
  const suspendedCount = usersList.filter((u) => u.status === "SUSPENDED").length

  return (
    <div className="space-y-6">
      {/* Top Banner & KPI Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#0D5C35] uppercase tracking-wider mb-1">
            <ShieldAlert className="size-4" />
            <span>সুপার অ্যাডমিন ইউজার গভর্নেন্স (User Management)</span>
          </div>
          <h2 className="text-xl font-black text-stone-900">নিবন্ধিত ইউজার ও সদস্য তালিকা</h2>
          <p className="text-xs text-stone-500 mt-0.5">
            ওয়েবসাইটে নিবন্ধিত সকল সাধারণ নাগরিক ও আবেদনকারীদের তথ্য এবং অ্যাকাউন্ট সক্রিয়/স্থগিত নিয়ন্ত্রণ
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            onClick={() => refetch()}
            variant="outline"
            size="sm"
            className="text-xs font-bold gap-1 cursor-pointer"
          >
            <span>রিফ্রেশ</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs">
          <span className="text-xs font-medium text-stone-500">মোট নিবন্ধিত ইউজার</span>
          <div className="text-xl sm:text-2xl font-black text-stone-900 mt-1">{totalUsers} জন</div>
          <span className="text-[10px] text-emerald-700 font-bold mt-1 inline-block">সম্পূর্ণ ডেটাবেজ রেকর্ড</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs">
          <span className="text-xs font-medium text-stone-500">সক্রিয় সদস্য</span>
          <div className="text-xl sm:text-2xl font-black text-emerald-700 mt-1">{activeCount} জন</div>
          <span className="text-[10px] text-stone-400 font-medium mt-1 inline-block">লগইন ও সেবা সচল</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs">
          <span className="text-xs font-medium text-stone-500">স্থগিত / ব্লকড</span>
          <div className="text-xl sm:text-2xl font-black text-red-600 mt-1">{suspendedCount} জন</div>
          <span className="text-[10px] text-stone-400 font-medium mt-1 inline-block">অস্থায়ী নিষ্ক্রিয়</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs">
          <span className="text-xs font-medium text-stone-500">একচ্ছত্র প্রশাসক</span>
          <div className="text-xl sm:text-2xl font-black text-purple-700 mt-1">১ জন</div>
          <span className="text-[10px] text-purple-600 font-bold mt-1 inline-block">সুপার অ্যাডমিন</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="নাম, ফোন বা ইমেইল দিয়ে খুঁজুন..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#0D5C35]/30 focus:border-[#0D5C35]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl border border-stone-200 bg-white font-semibold text-stone-700"
          >
            <option value="ALL">সকল স্ট্যাটাস</option>
            <option value="ACTIVE">সক্রিয় অ্যাকাউন্ট</option>
            <option value="SUSPENDED">স্থগিত অ্যাকাউন্ট</option>
          </select>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex flex-col items-center justify-center gap-2 text-stone-500">
            <Loader2 className="size-6 animate-spin text-[#0D5C35]" />
            <span className="text-xs">ইউজার ডেটা লোড হচ্ছে...</span>
          </div>
        ) : usersList.length === 0 ? (
          <div className="p-12 text-center text-stone-500">
            <Users className="size-10 text-stone-300 mx-auto mb-2" />
            <p className="text-sm font-semibold">কোনো ইউজার রেকর্ড পাওয়া যায়নি</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200/80 text-stone-600 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">ইউজার ও নাম</th>
                  <th className="py-3 px-4">ফোন ও ইমেইল</th>
                  <th className="py-3 px-4">ঠিকানা</th>
                  <th className="py-3 px-4">নিবন্ধন তারিখ</th>
                  <th className="py-3 px-4 text-center">স্ট্যাটাস</th>
                  <th className="py-3 px-4 text-center">রোল</th>
                  <th className="py-3 px-4 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {usersList.map((user) => {
                  const isSuperAdmin = (user.roles || []).some(
                    (r) => (typeof r === "string" ? r : (r as any).name) === "SUPER_ADMIN"
                  )

                  return (
                    <tr key={user.id} className="hover:bg-stone-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="size-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0">
                            {user.fullName?.slice(0, 1) || "U"}
                          </div>
                          <div>
                            <div className="font-bold text-stone-900">{user.fullName}</div>
                            <div className="text-[10px] text-stone-400 font-mono">ID: {user.id.slice(0, 8)}...</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-xs">
                        <div className="text-stone-800">{user.phone}</div>
                        <div className="text-stone-400 text-[11px] font-sans truncate max-w-xs">{user.email}</div>
                      </td>

                      <td className="py-3.5 px-4 text-stone-500">
                        {user.upazila}, {user.district}
                      </td>

                      <td className="py-3.5 px-4 text-stone-500 text-[11px]">
                        {new Date(user.createdAt).toLocaleDateString("bn-BD")}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <Badge
                          variant="outline"
                          className={
                            user.status === "ACTIVE"
                              ? "border-emerald-300 bg-emerald-50 text-emerald-800 font-bold text-[10px]"
                              : "border-red-300 bg-red-50 text-red-800 font-bold text-[10px]"
                          }
                        >
                          {user.status === "ACTIVE" ? "সক্রিয়" : "স্থগিত"}
                        </Badge>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <Badge
                          variant="outline"
                          className={
                            isSuperAdmin
                              ? "border-purple-300 bg-purple-50 text-purple-800 font-black text-[10px]"
                              : "border-stone-200 bg-stone-50 text-stone-600 font-medium text-[10px]"
                          }
                        >
                          {isSuperAdmin ? "সুপার অ্যাডমিন" : "সাধারণ সদস্য"}
                        </Badge>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        {isSuperAdmin ? (
                          <span className="text-[11px] text-stone-400 italic">সুরক্ষিত</span>
                        ) : (
                          <Button
                            type="button"
                            size="xs"
                            variant={user.status === "ACTIVE" ? "outline" : "default"}
                            onClick={() => handleToggleStatus(user)}
                            className={
                              user.status === "ACTIVE"
                                ? "text-red-700 hover:bg-red-50 border-red-200 cursor-pointer text-[10px]"
                                : "bg-emerald-700 hover:bg-emerald-800 text-white cursor-pointer text-[10px]"
                            }
                          >
                            {user.status === "ACTIVE" ? "স্থগিত করুন" : "সক্রিয় করুন"}
                          </Button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
export default CmsUsersTab
