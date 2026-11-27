"use client"

import React from "react"
import Link from "next/link"
import {
  User as UserIcon,
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Copy,
  Edit3,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AdminUserItem } from "@/store/api/adminApi"
import { SystemRoleItem } from "./CreateUserModal"
import { toast } from "sonner"

interface UserDetailsModalProps {
  user: AdminUserItem | null
  onClose: () => void
  onOpenRoleEdit?: (user: AdminUserItem) => void
  roles: SystemRoleItem[]
}

export function UserDetailsModal({
  user,
  onClose,
  onOpenRoleEdit,
  roles,
}: UserDetailsModalProps) {
  if (!user) return null

  const roleNames = (user.roles || []).map((r) =>
    typeof r === "string" ? r : (r as any).name
  )
  const primaryRole = roleNames[0] || "COMMUNITY_MEMBER"
  const roleMeta = roles.find((r) => r.key === primaryRole)

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} কপি করা হয়েছে!`)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-100 bg-stone-50/80">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-2xl bg-red-100 text-[#D62828] font-bold flex items-center justify-center text-base shadow-xs">
              {user.fullName?.slice(0, 1) || "U"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-stone-900">{user.fullName}</h3>
                <Badge
                  variant="outline"
                  className={
                    user.status === "ACTIVE"
                      ? "border-emerald-300 bg-emerald-50 text-emerald-800 text-[10px]"
                      : "border-red-300 bg-red-50 text-red-800 text-[10px]"
                  }
                >
                  {user.status === "ACTIVE" ? "সক্রিয়" : "স্থগিত"}
                </Badge>
              </div>
              <p className="text-xs text-stone-400 font-mono mt-0.5">ID: {user.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200 cursor-pointer transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Role & Access Badge Card */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-stone-500 font-semibold mb-1">
                <Shield className="size-4 text-[#D62828]" />
                <span>নির্ধারিত সিস্টেম রোল:</span>
              </div>
              <div className="text-sm font-bold text-stone-900">
                {roleMeta?.label || primaryRole}
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                {roleMeta?.desc || "সাধারণ সিস্টেম অনুমতি"}
              </p>
            </div>

            {onOpenRoleEdit && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => {
                  onClose()
                  onOpenRoleEdit(user)
                }}
                className="border-stone-300 text-stone-700 hover:bg-white cursor-pointer text-xs shrink-0"
              >
                <Edit3 className="size-3.5 mr-1 text-[#D62828]" />
                রোল পরিবর্তন করুন
              </Button>
            )}
          </div>

          {/* Contact & Location Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-stone-200 space-y-3">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                যোগাযোগের তথ্য
              </span>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-stone-700">
                    <Phone className="size-3.5 text-[#D62828]" />
                    <span className="font-mono font-semibold">{user.phone}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(user.phone, "ফোন নম্বর")}
                    className="p-1 text-stone-400 hover:text-stone-700"
                    title="কপি করুন"
                  >
                    <Copy className="size-3" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-stone-700">
                    <Mail className="size-3.5 text-[#D62828]" />
                    <span className="font-sans truncate max-w-[180px]">{user.email}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(user.email, "ইমেইল")}
                    className="p-1 text-stone-400 hover:text-stone-700"
                    title="কপি করুন"
                  >
                    <Copy className="size-3" />
                  </button>
                </div>

                <div className="flex items-center gap-2 pt-1 text-[11px] text-stone-500">
                  <span className="flex items-center gap-1">
                    {user.isEmailVerified ? (
                      <CheckCircle2 className="size-3 text-emerald-600" />
                    ) : (
                      <ShieldAlert className="size-3 text-amber-500" />
                    )}
                    {user.isEmailVerified ? "ইমেইল ভেরিফাইড" : "ইমেইল নন-ভেরিফাইড"}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    {user.isPhoneVerified ? (
                      <CheckCircle2 className="size-3 text-emerald-600" />
                    ) : (
                      <ShieldAlert className="size-3 text-amber-500" />
                    )}
                    {user.isPhoneVerified ? "ফোন ভেরিফাইড" : "ফোন নন-ভেরিফাইড"}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 space-y-3">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                ঠিকানা ও অবস্থান
              </span>

              <div className="space-y-2 text-xs text-stone-700">
                <div className="flex items-start gap-2">
                  <MapPin className="size-3.5 text-[#D62828] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">উপজেলা ও জেলা:</span>
                    <span className="text-stone-600">
                      {user.upazila || "রৌমারী"}, {user.district || "কুড়িগ্রাম"}
                    </span>
                  </div>
                </div>

                {user.address && (
                  <div className="pt-1 text-stone-500 text-[11px] leading-relaxed">
                    <span className="font-semibold text-stone-700 block">পূর্ণ ঠিকানা:</span>
                    {user.address}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Registration & Security Meta */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-2">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              নিবন্ধন ও অ্যাকাউন্ট লগ
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-600">
              <div className="flex items-center gap-2">
                <Calendar className="size-3.5 text-stone-400" />
                <span>নিবন্ধন তারিখ:</span>
                <span className="font-semibold text-stone-800">
                  {new Date(user.createdAt).toLocaleString("bn-BD")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-3.5 text-stone-400" />
                <span>অ্যাকাউন্ট স্ট্যাটাস:</span>
                <span className="font-semibold text-stone-800">
                  {user.status === "ACTIVE" ? "সক্রিয় রয়েছে" : "স্থগিত করা হয়েছে"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-stone-100 bg-stone-50 flex items-center justify-between">
          <Link
            href={`/dashboard/users/${user.id}`}
            onClick={onClose}
            className="text-xs font-bold text-[#D62828] hover:text-[#B91C1C] flex items-center gap-1 cursor-pointer"
          >
            <span>সম্পূর্ণ প্রোফাইল পেজে যান</span>
            <ExternalLink className="size-3.5" />
          </Link>

          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="text-xs"
          >
            বন্ধ করুন
          </Button>
        </div>
      </div>
    </div>
  )
}
