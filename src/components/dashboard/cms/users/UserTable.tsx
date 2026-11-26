"use client"

import React from "react"
import { Users, Loader2, Edit3, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AdminUserItem } from "@/store/api/adminApi"
import { SystemRoleItem } from "./CreateUserModal"

interface UserTableProps {
  users: AdminUserItem[]
  isLoading: boolean
  currentUserId?: string
  roles: SystemRoleItem[]
  onOpenRoleEdit: (user: AdminUserItem) => void
  onToggleStatus: (user: AdminUserItem) => void
  onDeleteUser: (user: AdminUserItem) => void
  isDeleting: boolean
}

export function UserTable({
  users,
  isLoading,
  currentUserId,
  roles,
  onOpenRoleEdit,
  onToggleStatus,
  onDeleteUser,
  isDeleting,
}: UserTableProps) {
  if (isLoading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center gap-2 text-stone-500">
        <Loader2 className="size-6 animate-spin text-[#D62828]" />
        <span className="text-xs">ইউজার ডেটা লোড হচ্ছে...</span>
      </div>
    )
  }

  if (users.length === 0) {
    return (
      <div className="p-12 text-center text-stone-500">
        <Users className="size-10 text-stone-300 mx-auto mb-2" />
        <p className="text-sm font-semibold">কোনো ইউজার রেকর্ড পাওয়া যায়নি</p>
      </div>
    )
  }

  return (
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
          {users.map((user) => {
            const roleNames = (user.roles || []).map((r) =>
              typeof r === "string" ? r : (r as any).name
            )
            const primaryRole = roleNames[0] || "COMMUNITY_MEMBER"
            const isSuperAdmin = primaryRole === "SUPER_ADMIN"
            const isSelf = currentUserId === user.id

            return (
              <tr key={user.id} className="hover:bg-stone-50/70 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2.5">
                    <div className="size-8 rounded-full font-bold flex items-center justify-center text-xs shrink-0 bg-red-100 text-red-800">
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
                    className="border-red-300 bg-red-50 text-red-800 font-bold text-[10px]"
                  >
                    {user.status === "ACTIVE" ? "সক্রিয়" : "স্থগিত"}
                  </Badge>
                </td>

                <td className="py-3.5 px-4 text-center">
                  <Badge
                    variant="outline"
                    className="border-red-200 bg-red-50 text-red-800 font-bold text-[10px]"
                  >
                    {roles.find((r) => r.key === primaryRole)?.label || primaryRole}
                  </Badge>
                </td>

                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Button
                      type="button"
                      size="xs"
                      variant="outline"
                      onClick={() => onOpenRoleEdit(user)}
                      className="text-stone-700 hover:bg-stone-100 border-stone-200 cursor-pointer text-[10px] gap-1 px-2"
                      title="রোল পরিবর্তন"
                    >
                      <Edit3 className="size-3 text-stone-500" />
                      <span>রোল পরিবর্তন</span>
                    </Button>

                    <Button
                      type="button"
                      size="xs"
                      disabled={isSelf || (isSuperAdmin && user.status === "ACTIVE")}
                      variant={user.status === "ACTIVE" ? "outline" : "default"}
                      onClick={() => onToggleStatus(user)}
                      className={
                        user.status === "ACTIVE"
                          ? "text-amber-700 hover:bg-amber-50 border-amber-200 cursor-pointer text-[10px]"
                          : "bg-red-700 hover:bg-red-800 text-white cursor-pointer text-[10px]"
                      }
                      title={user.status === "ACTIVE" ? "অ্যাকাউন্ট স্থগিত করুন" : "সক্রিয় করুন"}
                    >
                      {user.status === "ACTIVE" ? "স্থগিত" : "সক্রিয়"}
                    </Button>

                    <Button
                      type="button"
                      size="xs"
                      variant="outline"
                      disabled={isSelf || isDeleting}
                      onClick={() => onDeleteUser(user)}
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
  )
}
