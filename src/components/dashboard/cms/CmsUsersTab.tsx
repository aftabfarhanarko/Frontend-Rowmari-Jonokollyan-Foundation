"use client"

import React, { useState } from "react"
import { Search, ShieldAlert, Plus } from "lucide-react"
import {
  useGetSuperAdminUsersQuery,
  useUpdateAdminUserStatusMutation,
  useCreateAdminUserMutation,
  useUpdateAdminUserRolesMutation,
  useDeleteAdminUserMutation,
  AdminUserItem,
} from "@/store/api/adminApi"
import { useGetCurrentUserQuery } from "@/store/api/authApi"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { CreateUserModal, SystemRoleItem } from "./users/CreateUserModal"
import { EditRoleModal } from "./users/EditRoleModal"
import { UserDetailsModal } from "./users/UserDetailsModal"
import { UserTable } from "./users/UserTable"

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

export function CmsUsersTab() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("ALL")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [userForRoleEdit, setUserForRoleEdit] = useState<AdminUserItem | null>(null)
  const [userForDetails, setUserForDetails] = useState<AdminUserItem | null>(null)
  const [selectedRoleForEdit, setSelectedRoleForEdit] = useState<string>("COMMUNITY_MEMBER")

  const [createForm, setCreateForm] = useState({
    fullName: "", email: "", phone: "", password: "", role: "COMMUNITY_MEMBER", district: "Kurigram", upazila: "Roumari", address: "",
  })

  const { data: currentUser } = useGetCurrentUserQuery()
  const { data: usersRes, isLoading, refetch } = useGetSuperAdminUsersQuery({
    page: 1, limit: 50, q: search || undefined, status: statusFilter !== "ALL" ? statusFilter : undefined,
  })

  const usersList: AdminUserItem[] = Array.isArray(usersRes) ? usersRes : (usersRes as any)?.items || []
  const totalUsers = (usersRes as any)?.total || usersList.length

  const [updateStatus] = useUpdateAdminUserStatusMutation()
  const [createUser, { isLoading: isCreatingUser }] = useCreateAdminUserMutation()
  const [updateRoles, { isLoading: isUpdatingRoles }] = useUpdateAdminUserRolesMutation()
  const [deleteUser, { isLoading: isDeletingUser }] = useDeleteAdminUserMutation()

  const handleToggleStatus = async (user: AdminUserItem) => {
    if (currentUser?.id === user.id) { toast.error("আপনি নিজের অ্যাকাউন্ট স্থগিত করতে পারবেন না!"); return }
    const nextStatus = user.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE"
    const confirmMsg = nextStatus === "SUSPENDED"
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

  const handleCreateUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!createForm.fullName.trim() || !createForm.email.trim() || !createForm.phone.trim()) {
      toast.error("অনুগ্রহ করে সকল আবশ্যক তথ্য দিন")
      return
    }
    try {
      await createUser({
        fullName: createForm.fullName.trim(), email: createForm.email.trim(), phone: createForm.phone.trim(),
        password: createForm.password, roles: [createForm.role || "COMMUNITY_MEMBER"],
        district: createForm.district.trim() || "Kurigram", upazila: createForm.upazila.trim() || "Roumari",
        address: createForm.address.trim() || undefined,
      }).unwrap()
      toast.success(`সফলভাবে '${createForm.fullName}' অ্যাকাউন্ট তৈরি করা হয়েছে!`)
      setIsCreateModalOpen(false)
      setCreateForm({ fullName: "", email: "", phone: "", password: "", role: "COMMUNITY_MEMBER", district: "Kurigram", upazila: "Roumari", address: "" })
      refetch()
    } catch (err: any) {
      toast.error(err?.message || "ইউজার তৈরি করতে ব্যর্থ হয়েছে।")
    }
  }

  const handleOpenRoleEdit = (user: AdminUserItem) => {
    setUserForRoleEdit(user)
    const existingRoles = (user.roles || []).map((r) => typeof r === "string" ? r : (r as any).name)
    setSelectedRoleForEdit(existingRoles[0] || "COMMUNITY_MEMBER")
  }

  const handleSaveRoles = async () => {
    if (!userForRoleEdit) return
    try {
      await updateRoles({ id: userForRoleEdit.id, roles: [selectedRoleForEdit] }).unwrap()
      toast.success(`'${userForRoleEdit.fullName}' এর রোল সফলভাবে পরিবর্তন করা হয়েছে।`)
      setUserForRoleEdit(null)
      refetch()
    } catch (err: any) {
      toast.error(err?.message || "রোল আপডেট ব্যর্থ হয়েছে।")
    }
  }

  const handleDeleteUser = async (user: AdminUserItem) => {
    if (currentUser?.id === user.id) { toast.error("আপনি নিজের অ্যাকাউন্ট মুছে ফেলতে পারবেন না!"); return }
    if (!confirm(`⚠️ সতর্কবার্তা:\nআপনি কি '${user.fullName}' অ্যাকাউন্ট মুছে ফেলতে চান?`)) return
    try {
      await deleteUser(user.id).unwrap()
      toast.success(`'${user.fullName}' অ্যাকাউন্ট মুছে ফেলা হয়েছে।`)
      refetch()
    } catch (err: any) {
      toast.error(err?.message || "অ্যাকাউন্ট মুছে ফেলা ব্যর্থ হয়েছে।")
    }
  }

  const activeCount = usersList.filter((u) => u.status === "ACTIVE").length
  const suspendedCount = usersList.filter((u) => u.status === "SUSPENDED").length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#D62828] uppercase tracking-wider mb-1">
            <ShieldAlert className="size-4" />
            <span>সুপার অ্যাডমিন ইউজার গভর্নেন্স</span>
          </div>
          <h2 className="text-xl font-black text-stone-900">নিবন্ধিত ইউজার ও প্রশাসক ব্যবস্থাপনা</h2>
          <p className="text-xs text-stone-500 mt-0.5">রোল নির্ধারণ করুন এবং অ্যাকাউন্ট সক্রিয়, স্থগিত বা মুছে ফেলুন</p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button onClick={() => setIsCreateModalOpen(true)} size="sm" className="bg-[#D62828] hover:bg-[#B91C1C] text-white text-xs font-bold gap-1.5 cursor-pointer shadow-xs">
            <Plus className="size-4" />
            <span>নতুন ইউজার তৈরি</span>
          </Button>
          <Button onClick={() => refetch()} variant="outline" size="sm" className="text-xs font-bold gap-1 cursor-pointer">রিফ্রেশ</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs">
          <span className="text-xs font-medium text-stone-500">মোট ইউজার</span>
          <div className="text-xl sm:text-2xl font-black text-stone-900 mt-1">{totalUsers} জন</div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs">
          <span className="text-xs font-medium text-stone-500">সক্রিয় সদস্য</span>
          <div className="text-xl sm:text-2xl font-black text-red-700 mt-1">{activeCount} জন</div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs col-span-2 sm:col-span-1">
          <span className="text-xs font-medium text-stone-500">স্থগিত</span>
          <div className="text-xl sm:text-2xl font-black text-red-600 mt-1">{suspendedCount} জন</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-stone-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="নাম, ফোন বা ইমেইল দিয়ে খুঁজুন..." className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#D62828]/30" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="text-xs px-3 py-2 rounded-xl border border-stone-200 bg-white font-semibold text-stone-700">
          <option value="ALL">সকল স্ট্যাটাস</option>
          <option value="ACTIVE">সক্রিয় অ্যাকাউন্ট</option>
          <option value="SUSPENDED">স্থগিত অ্যাকাউন্ট</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
        <UserTable
          users={usersList}
          isLoading={isLoading}
          currentUserId={currentUser?.id}
          roles={SYSTEM_ROLES}
          onOpenRoleEdit={handleOpenRoleEdit}
          onToggleStatus={handleToggleStatus}
          onDeleteUser={handleDeleteUser}
          onViewDetails={(u) => setUserForDetails(u)}
          isDeleting={isDeletingUser}
        />
      </div>

      <CreateUserModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} form={createForm} setForm={setCreateForm} isCreating={isCreatingUser} onSubmit={handleCreateUserSubmit} roles={SYSTEM_ROLES} />
      <EditRoleModal user={userForRoleEdit} onClose={() => setUserForRoleEdit(null)} selectedRole={selectedRoleForEdit} setSelectedRole={setSelectedRoleForEdit} isUpdating={isUpdatingRoles} onSave={handleSaveRoles} roles={SYSTEM_ROLES} />
      <UserDetailsModal user={userForDetails} onClose={() => setUserForDetails(null)} onOpenRoleEdit={handleOpenRoleEdit} roles={SYSTEM_ROLES} />
    </div>
  )
}
export default CmsUsersTab
