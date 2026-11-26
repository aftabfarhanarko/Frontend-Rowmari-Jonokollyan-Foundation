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
  Plus,
  Trash2,
  Edit3,
  X,
  Key,
  Lock,
} from "lucide-react"
import {
  useGetSuperAdminUsersQuery,
  useUpdateAdminUserStatusMutation,
  useCreateAdminUserMutation,
  useUpdateAdminUserRolesMutation,
  useDeleteAdminUserMutation,
  AdminUserItem,
} from "@/store/api/adminApi"
import { useGetCurrentUserQuery } from "@/store/api/authApi"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const SYSTEM_ROLES = [
  { key: "SUPER_ADMIN", label: "সুপার অ্যাডমিন (Super Admin)", color: "purple", desc: "সিস্টেমের পূর্ণ প্রশাসনিক ও ইউজার নিয়ন্ত্রণ ক্ষমতা" },
  { key: "ADMIN", label: "সিস্টেম অ্যাডমিন (Admin)", color: "blue", desc: "দৈনন্দিন কার্যক্রম ও সাইট পরিচালনা ক্ষমতা" },
  { key: "VOLUNTEER_MANAGER", label: "স্বেচ্ছাসেবক সমন্বয়ক (Volunteer Manager)", color: "amber", desc: "মাঠপর্যায়ের স্বেচ্ছাসেবক ও টিম পরিচালনা" },
  { key: "MEDICAL_COORDINATOR", label: "চিকিৎসা সমন্বয়ক (Medical Coordinator)", color: "rose", desc: "চিকিৎসা সহায়তা ও ফ্রি ক্যাম্পের তদারকি" },
  { key: "EDUCATION_COORDINATOR", label: "শিক্ষা সমন্বয়ক (Education Coordinator)", color: "indigo", desc: "উপবৃত্তি ও শিক্ষা সহায়তা কার্যক্রম" },
  { key: "FINANCE_MANAGER", label: "অর্থ ও তহবিল ব্যবস্থাপক (Finance Manager)", color: "red", desc: "অনুদানের হিসাব ও রসিদ ব্যবস্থাপনা" },
  { key: "CONTENT_MANAGER", label: "কনটেন্ট ব্যবস্থাপক (Content Manager)", color: "cyan", desc: "খবর, ইভেন্ট ও নোটিশ প্রকাশনা" },
  { key: "BLOOD_COORDINATOR", label: "রক্তদান সমন্বয়ক (Blood Coordinator)", color: "red", desc: "রক্তের অনুরোধ ও ডোনার নেটওয়ার্ক" },
  { key: "COMMUNITY_MEMBER", label: "সাধারণ সদস্য (Community Member)", color: "stone", desc: "সাধারণ নাগরিক / আবেদনকারী সদস্য" },
]

export function CmsUsersTab() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("ALL")
  const [page, setPage] = useState(1)

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [userForRoleEdit, setUserForRoleEdit] = useState<AdminUserItem | null>(null)
  const [selectedRoleForEdit, setSelectedRoleForEdit] = useState<string>("COMMUNITY_MEMBER")

  // Create User Form State (Single selected role)
  const [createForm, setCreateForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "COMMUNITY_MEMBER",
    district: "Kurigram",
    upazila: "Roumari",
    address: "",
  })

  const { data: currentUser } = useGetCurrentUserQuery()

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
  const [createUser, { isLoading: isCreatingUser }] = useCreateAdminUserMutation()
  const [updateRoles, { isLoading: isUpdatingRoles }] = useUpdateAdminUserRolesMutation()
  const [deleteUser, { isLoading: isDeletingUser }] = useDeleteAdminUserMutation()

  // 1. Toggle Active / Suspended Status
  const handleToggleStatus = async (user: AdminUserItem) => {
    if (currentUser?.id === user.id) {
      toast.error("আপনি নিজের অ্যাকাউন্ট স্থগিত করতে পারবেন না!")
      return
    }

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

  // 2. Create User / Super Admin with Selected Single Role
  const handleCreateUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!createForm.fullName.trim()) {
      toast.error("অনুগ্রহ করে পূর্ণ নাম লিখুন")
      return
    }
    if (!createForm.email.trim()) {
      toast.error("অনুগ্রহ করে ইমেইল ঠিকানা লিখুন")
      return
    }
    if (!createForm.phone.trim()) {
      toast.error("অনুগ্রহ করে ফোন নম্বর লিখুন")
      return
    }
    if (!createForm.password || createForm.password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে")
      return
    }

    try {
      await createUser({
        fullName: createForm.fullName.trim(),
        email: createForm.email.trim(),
        phone: createForm.phone.trim(),
        password: createForm.password,
        roles: [createForm.role || "COMMUNITY_MEMBER"],
        district: createForm.district.trim() || "Kurigram",
        upazila: createForm.upazila.trim() || "Roumari",
        address: createForm.address.trim() || undefined,
      }).unwrap()

      const roleObj = SYSTEM_ROLES.find(r => r.key === createForm.role)
      toast.success(`সফলভাবে '${createForm.fullName}' (${roleObj?.label || createForm.role}) অ্যাকাউন্ট তৈরি করা হয়েছে!`)
      setIsCreateModalOpen(false)
      setCreateForm({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        role: "COMMUNITY_MEMBER",
        district: "Kurigram",
        upazila: "Roumari",
        address: "",
      })
      refetch()
    } catch (err: any) {
      toast.error(err?.message || "ইউজার তৈরি করতে ব্যর্থ হয়েছে। ফোন বা ইমেইল ইতিমধ্যে ব্যবহৃত হতে পারে।")
    }
  }

  // 3. Open Role Edit Modal (Pre-selects single role)
  const handleOpenRoleEdit = (user: AdminUserItem) => {
    setUserForRoleEdit(user)
    const existingRoles = (user.roles || []).map((r) =>
      typeof r === "string" ? r : (r as any).name
    )
    setSelectedRoleForEdit(existingRoles[0] || "COMMUNITY_MEMBER")
  }

  // 4. Save Edited Single Role
  const handleSaveRoles = async () => {
    if (!userForRoleEdit) return
    try {
      await updateRoles({
        id: userForRoleEdit.id,
        roles: [selectedRoleForEdit],
      }).unwrap()

      const roleObj = SYSTEM_ROLES.find((r) => r.key === selectedRoleForEdit)
      toast.success(
        `'${userForRoleEdit.fullName}' এর রোল সফলভাবে '${roleObj?.label || selectedRoleForEdit}' এ পরিবর্তন করা হয়েছে।`
      )
      setUserForRoleEdit(null)
      refetch()
    } catch (err: any) {
      toast.error(err?.message || "রোল আপডেট ব্যর্থ হয়েছে।")
    }
  }

  // 5. Delete User
  const handleDeleteUser = async (user: AdminUserItem) => {
    if (currentUser?.id === user.id) {
      toast.error("আপনি নিজের অ্যাকাউন্ট মুছে ফেলতে পারবেন না!")
      return
    }

    const confirmMsg = `⚠️ সতর্কবার্তা:\nআপনি কি নিশ্চিতভাবে '${user.fullName}' (${user.email || user.phone}) অ্যাকাউন্টটি সম্পূর্ণরূপে মুছে ফেলতে চান?\nএই প্রক্রিয়াটি অপরিবর্তনীয়!`
    if (!confirm(confirmMsg)) return

    try {
      await deleteUser(user.id).unwrap()
      toast.success(`'${user.fullName}' অ্যাকাউন্ট সফলভাবে মুছে ফেলা হয়েছে।`)
      refetch()
    } catch (err: any) {
      toast.error(err?.message || "অ্যাকাউন্ট মুছে ফেলা ব্যর্থ হয়েছে।")
    }
  }

  const activeCount = usersList.filter((u) => u.status === "ACTIVE").length
  const suspendedCount = usersList.filter((u) => u.status === "SUSPENDED").length
  const superAdminCount = usersList.filter((u) =>
    (u.roles || []).some((r) => (typeof r === "string" ? r : (r as any).name) === "SUPER_ADMIN")
  ).length

  return (
    <div className="space-y-6">
      {/* Top Banner & KPI Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#D62828] uppercase tracking-wider mb-1">
            <ShieldAlert className="size-4" />
            <span>সুপার অ্যাডমিন ইউজার গভর্নেন্স (User Management)</span>
          </div>
          <h2 className="text-xl font-black text-stone-900">নিবন্ধিত ইউজার ও প্রশাসক ব্যবস্থাপনা</h2>
          <p className="text-xs text-stone-500 mt-0.5">
            সুপার অ্যাডমিন ও কর্মকর্তা তৈরি করুন, যেকোনো একটি নির্দিষ্ট রোল নির্ধারণ করুন এবং অ্যাকাউন্ট সক্রিয়, স্থগিত বা মুছে ফেলুন
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            size="sm"
            className="bg-[#D62828] hover:bg-[#B91C1C] text-white text-xs font-bold gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="size-4" />
            <span>নতুন ইউজার / সুপার অ্যাডমিন তৈরি</span>
          </Button>

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
          <span className="text-[10px] text-red-700 font-bold mt-1 inline-block">সম্পূর্ণ ডেটাবেজ রেকর্ড</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs">
          <span className="text-xs font-medium text-stone-500">সক্রিয় সদস্য</span>
          <div className="text-xl sm:text-2xl font-black text-red-700 mt-1">{activeCount} জন</div>
          <span className="text-[10px] text-stone-400 font-medium mt-1 inline-block">লগইন ও সেবা সচল</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs">
          <span className="text-xs font-medium text-stone-500">স্থগিত / ব্লকড</span>
          <div className="text-xl sm:text-2xl font-black text-red-600 mt-1">{suspendedCount} জন</div>
          <span className="text-[10px] text-stone-400 font-medium mt-1 inline-block">অস্থায়ী নিষ্ক্রিয়</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs">
          <span className="text-xs font-medium text-stone-500">সুপার অ্যাডমিন</span>
          <div className="text-xl sm:text-2xl font-black text-red-700 mt-1">{superAdminCount} জন</div>
          <span className="text-[10px] text-red-600 font-bold mt-1 inline-block">একচ্ছত্র প্রশাসক</span>
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
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#D62828]/30 focus:border-[#D62828]"
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
            <Loader2 className="size-6 animate-spin text-[#D62828]" />
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
                  <th className="py-3 px-4 text-center">নির্ধারিত রোল</th>
                  <th className="py-3 px-4 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {usersList.map((user) => {
                  const roleNames = (user.roles || []).map((r) =>
                    typeof r === "string" ? r : (r as any).name
                  )
                  const primaryRole = roleNames[0] || "COMMUNITY_MEMBER"
                  const isSuperAdmin = primaryRole === "SUPER_ADMIN"
                  const isSelf = currentUser?.id === user.id

                  return (
                    <tr key={user.id} className="hover:bg-stone-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`size-8 rounded-full font-bold flex items-center justify-center text-xs shrink-0 ${
                              isSuperAdmin
                                ? "bg-red-100 text-red-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {user.fullName?.slice(0, 1) || "U"}
                          </div>
                          <div>
                            <div className="font-bold text-stone-900 flex items-center gap-1.5">
                              <span>{user.fullName}</span>
                              {isSelf && (
                                <span className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded font-mono font-normal">
                                  (আপনি)
                                </span>
                              )}
                            </div>
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
                              ? "border-red-300 bg-red-50 text-red-800 font-bold text-[10px]"
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
                            primaryRole === "SUPER_ADMIN"
                              ? "border-purple-300 bg-red-50 text-red-800 font-black text-[10px]"
                              : primaryRole === "ADMIN"
                              ? "border-blue-300 bg-red-50 text-red-800 font-bold text-[10px]"
                              : primaryRole === "VOLUNTEER_MANAGER"
                              ? "border-amber-300 bg-amber-50 text-amber-800 font-bold text-[10px]"
                              : primaryRole === "MEDICAL_COORDINATOR"
                              ? "border-rose-300 bg-rose-50 text-rose-800 font-bold text-[10px]"
                              : primaryRole === "FINANCE_MANAGER"
                              ? "border-red-300 bg-red-50 text-red-800 font-bold text-[10px]"
                              : "border-stone-200 bg-stone-50 text-stone-700 font-medium text-[10px]"
                          }
                        >
                          {SYSTEM_ROLES.find((r) => r.key === primaryRole)?.label || primaryRole}
                        </Badge>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Role Edit Button */}
                          <Button
                            type="button"
                            size="xs"
                            variant="outline"
                            onClick={() => handleOpenRoleEdit(user)}
                            className="text-stone-700 hover:bg-stone-100 border-stone-200 cursor-pointer text-[10px] gap-1 px-2"
                            title="রোল পরিবর্তন"
                          >
                            <Edit3 className="size-3 text-stone-500" />
                            <span>রোল পরিবর্তন</span>
                          </Button>

                          {/* Toggle Active / Suspended */}
                          <Button
                            type="button"
                            size="xs"
                            disabled={isSelf || (isSuperAdmin && user.status === "ACTIVE")}
                            variant={user.status === "ACTIVE" ? "outline" : "default"}
                            onClick={() => handleToggleStatus(user)}
                            className={
                              user.status === "ACTIVE"
                                ? "text-amber-700 hover:bg-amber-50 border-amber-200 cursor-pointer text-[10px]"
                                : "bg-red-700 hover:bg-red-800 text-white cursor-pointer text-[10px]"
                            }
                            title={user.status === "ACTIVE" ? "অ্যাকাউন্ট স্থগিত করুন" : "সক্রিয় করুন"}
                          >
                            {user.status === "ACTIVE" ? "স্থগিত" : "সক্রিয়"}
                          </Button>

                          {/* Delete Button */}
                          <Button
                            type="button"
                            size="xs"
                            variant="outline"
                            disabled={isSelf || isDeletingUser}
                            onClick={() => handleDeleteUser(user)}
                            className="text-red-700 hover:bg-red-50 border-red-200 cursor-pointer text-[10px] p-1.5"
                            title="অ্যাকাউন্ট মুছে ফেলুন"
                          >
                            <Trash2 className="size-3 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL 1: Create New User / Super Admin (Single Role Selection) */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden space-y-4">
            <div className="flex items-center justify-between p-5 border-b border-stone-100 bg-stone-50/70">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-red-100 text-[#D62828]">
                  <Users className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900">নতুন ইউজার / সুপার অ্যাডমিন তৈরি করুন</h3>
                  <p className="text-xs text-stone-500">সিস্টেমে নতুন অ্যাকাউন্ট তৈরি ও সরাসরি ভূমিকা নির্ধারণ</p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200 cursor-pointer transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleCreateUserSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    পূর্ণ নাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={createForm.fullName}
                    onChange={(e) => setCreateForm({ ...createForm, fullName: e.target.value })}
                    placeholder="উদাঃ মোহাম্মদ রফিকুল ইসলাম"
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#D62828]/30 focus:border-[#D62828]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    ইমেইল ঠিকানা <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={createForm.email}
                    onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                    placeholder="user@rjf.org"
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#D62828]/30 focus:border-[#D62828]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    ফোন নম্বর <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={createForm.phone}
                    onChange={(e) => setCreateForm({ ...createForm, phone: e.target.value })}
                    placeholder="01712345678 বা +8801712345678"
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#D62828]/30 focus:border-[#D62828]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    পাসওয়ার্ড <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={createForm.password}
                    onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                    placeholder="কমপক্ষে ৮ অক্ষর (যেমনঃ Admin@2026!)"
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#D62828]/30 focus:border-[#D62828]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">জেলা</label>
                  <input
                    type="text"
                    value={createForm.district}
                    onChange={(e) => setCreateForm({ ...createForm, district: e.target.value })}
                    placeholder="Kurigram"
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#D62828]/30 focus:border-[#D62828]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">উপজেলা</label>
                  <input
                    type="text"
                    value={createForm.upazila}
                    onChange={(e) => setCreateForm({ ...createForm, upazila: e.target.value })}
                    placeholder="Roumari"
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#D62828]/30 focus:border-[#D62828]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">ঠিকানা / গ্রাম (ঐচ্ছিক)</label>
                <input
                  type="text"
                  value={createForm.address}
                  onChange={(e) => setCreateForm({ ...createForm, address: e.target.value })}
                  placeholder="গ্রাম বা এলাকা"
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#D62828]/30 focus:border-[#D62828]"
                />
              </div>

              {/* Single Role Selection Radio */}
              <div className="pt-2 border-t border-stone-100">
                <label className="block text-xs font-bold text-stone-800 mb-2">
                  ইউজারের ভূমিকা / রোল নির্ধারণ করুন (যেকোনো একটি নির্বাচন করুন):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-stone-50 p-3 rounded-xl border border-stone-200/80 max-h-56 overflow-y-auto">
                  {SYSTEM_ROLES.map((r) => {
                    const isSelected = createForm.role === r.key
                    return (
                      <label
                        key={r.key}
                        onClick={() => setCreateForm({ ...createForm, role: r.key })}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl cursor-pointer transition-all text-xs font-medium border ${
                          isSelected
                            ? "bg-white shadow-2xs border-[#D62828] text-[#D62828] font-bold ring-1 ring-[#D62828]/20"
                            : "bg-white/60 border-stone-200 text-stone-700 hover:bg-white"
                        }`}
                      >
                        <input
                          type="radio"
                          name="create_user_role"
                          value={r.key}
                          checked={isSelected}
                          onChange={() => setCreateForm({ ...createForm, role: r.key })}
                          className="size-3.5 text-[#D62828] focus:ring-[#D62828]"
                        />
                        <span className="truncate">{r.label}</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-stone-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="text-xs cursor-pointer"
                >
                  বাতিল
                </Button>
                <Button
                  type="submit"
                  disabled={isCreatingUser}
                  className="bg-[#D62828] hover:bg-[#B91C1C] text-white text-xs font-bold gap-1.5 cursor-pointer"
                >
                  {isCreatingUser ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" />
                      <span>তৈরি হচ্ছে...</span>
                    </>
                  ) : (
                    <span>অ্যাকাউন্ট তৈরি করুন</span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Edit User Role (Single Role Selection) */}
      {userForRoleEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 overflow-hidden space-y-4">
            <div className="flex items-center justify-between p-5 border-b border-stone-100 bg-stone-50/70">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-red-100 text-red-800">
                  <Shield className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900">
                    রোল পরিবর্তন: {userForRoleEdit.fullName}
                  </h3>
                  <p className="text-xs text-stone-500 font-mono">
                    {userForRoleEdit.email} • {userForRoleEdit.phone}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setUserForRoleEdit(null)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200 cursor-pointer transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-xs text-stone-600">
                ইউজারের জন্য যেকোনো একটি দায়িত্ব বা রোল নির্বাচন করুন:
              </p>

              <div className="space-y-2 bg-stone-50 p-3 rounded-xl border border-stone-200/80 max-h-72 overflow-y-auto">
                {SYSTEM_ROLES.map((r) => {
                  const isSelected = selectedRoleForEdit === r.key
                  return (
                    <label
                      key={r.key}
                      onClick={() => setSelectedRoleForEdit(r.key)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? "bg-red-50/90 border-purple-300 ring-2 ring-red-500/20 shadow-xs"
                          : "bg-white border-stone-200 hover:bg-stone-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="edit_user_role"
                          value={r.key}
                          checked={isSelected}
                          onChange={() => setSelectedRoleForEdit(r.key)}
                          className="size-4 text-red-600 focus:ring-red-600"
                        />
                        <div>
                          <div className={`text-xs font-bold ${isSelected ? "text-purple-900" : "text-stone-800"}`}>
                            {r.label}
                          </div>
                          <div className="text-[10px] text-stone-500 mt-0.5">
                            {r.desc}
                          </div>
                        </div>
                      </div>
                      {isSelected && (
                        <span className="text-red-700 font-bold text-xs shrink-0 ml-2">✓ নির্বাচিত</span>
                      )}
                    </label>
                  )
                })}
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-stone-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setUserForRoleEdit(null)}
                  className="text-xs cursor-pointer"
                >
                  বাতিল
                </Button>
                <Button
                  type="button"
                  disabled={isUpdatingRoles}
                  onClick={handleSaveRoles}
                  className="bg-red-700 hover:bg-red-800 text-white text-xs font-bold gap-1.5 cursor-pointer"
                >
                  {isUpdatingRoles ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" />
                      <span>সংরক্ষণ হচ্ছে...</span>
                    </>
                  ) : (
                    <span>রোল সংরক্ষণ করুন</span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CmsUsersTab
