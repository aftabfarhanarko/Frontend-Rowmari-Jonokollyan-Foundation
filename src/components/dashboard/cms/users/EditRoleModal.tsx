"use client"

import React from "react"
import { Shield, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AdminUserItem } from "@/store/api/adminApi"
import { SystemRoleItem } from "./CreateUserModal"

interface EditRoleModalProps {
  user: AdminUserItem | null
  onClose: () => void
  selectedRole: string
  setSelectedRole: (role: string) => void
  isUpdating: boolean
  onSave: () => void
  roles: SystemRoleItem[]
}

export function EditRoleModal({
  user,
  onClose,
  selectedRole,
  setSelectedRole,
  isUpdating,
  onSave,
  roles,
}: EditRoleModalProps) {
  if (!user) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 overflow-hidden space-y-4">
        <div className="flex items-center justify-between p-5 border-b border-stone-100 bg-stone-50/70">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-red-100 text-red-800">
              <Shield className="size-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                রোল পরিবর্তন: {user.fullName}
              </h3>
              <p className="text-xs text-stone-500 font-mono">
                {user.email} • {user.phone}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
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
            {roles.map((r) => {
              const isSelected = selectedRole === r.key
              return (
                <label
                  key={r.key}
                  onClick={() => setSelectedRole(r.key)}
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
                      onChange={() => setSelectedRole(r.key)}
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
              onClick={onClose}
              className="text-xs cursor-pointer"
            >
              বাতিল
            </Button>
            <Button
              type="button"
              disabled={isUpdating}
              onClick={onSave}
              className="bg-red-700 hover:bg-red-800 text-white text-xs font-bold gap-1.5 cursor-pointer"
            >
              {isUpdating ? (
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
  )
}
