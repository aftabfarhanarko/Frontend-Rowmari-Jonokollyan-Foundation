"use client"

import React from "react"
import { ShieldCheck, X, Mail, Lock, Loader2, LogIn } from "lucide-react"

interface StaffLoginModalProps {
  isOpen: boolean
  onClose: () => void
  email: string
  setEmail: (val: string) => void
  password: string
  setPassword: (val: string) => void
  isLoggingIn: boolean
  onSubmit: (e: React.FormEvent) => void
}

export function StaffLoginModal({
  isOpen,
  onClose,
  email,
  setEmail,
  password,
  setPassword,
  isLoggingIn,
  onSubmit,
}: StaffLoginModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md space-y-6 overflow-hidden rounded-3xl border border-stone-200/80 bg-white p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] animate-in fade-in zoom-in-95 duration-200 sm:p-8"
      >
        <div className="pointer-events-none absolute -top-24 -right-24 size-56 rounded-full bg-red-200/30 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-[#D62828] via-red-400 to-[#D62828]" />

        <div className="relative flex items-start justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-2.5 py-0.5 text-xs font-bold text-red-800">
              <ShieldCheck className="size-3.5" />
              <span>কর্মকর্তা অথেন্টিকেশন</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-stone-900">ড্যাশবোর্ড লগইন</h2>
            <p className="text-xs leading-relaxed text-stone-500">
              সিস্টেমে প্রবেশের জন্য আপনার অনুমোদিত ইমেইল ও পাসওয়ার্ড প্রদান করুন।
            </p>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer rounded-full p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="relative space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700">ইমেইল ঠিকানা</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@romonijon.org"
                className="w-full rounded-xl border border-stone-200 bg-stone-50/50 py-3 pl-10 pr-3 text-sm transition-all placeholder:text-stone-400 focus:border-[#D62828] focus:bg-white focus:outline-hidden focus:ring-4 focus:ring-[#D62828]/10"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700">পাসওয়ার্ড</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-stone-200 bg-stone-50/50 py-3 pl-10 pr-3 text-sm transition-all placeholder:text-stone-400 focus:border-[#D62828] focus:bg-white focus:outline-hidden focus:ring-4 focus:ring-[#D62828]/10"
                required
              />
            </div>
          </div>

          <div className="rounded-xl border border-stone-200/80 bg-stone-50 p-3 text-[11px] leading-relaxed text-stone-500">
            💡 <strong className="text-stone-700">লগইন সহায়িকা:</strong> সুপার অ্যাডমিন ক্রেডেনশিয়াল আপনার সুরক্ষিত ডাটাবেজে কনফিগার করা রয়েছে।
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-linear-to-b from-[#B91C1C] to-[#D62828] py-3 text-sm font-bold text-white shadow-lg shadow-red-900/20 ring-1 ring-inset ring-white/10 transition-all hover:from-[#D62828] hover:to-[#991B1B] active:scale-[0.99] disabled:opacity-50"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>যাচাই করা হচ্ছে...</span>
              </>
            ) : (
              <>
                <LogIn className="size-4" />
                <span>নিরাপদ লগইন</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
export default StaffLoginModal
