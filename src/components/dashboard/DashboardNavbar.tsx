"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/store/useAppStore"
import { ROLE_METAS } from "@/config/dashboard-navigation"
import { UserRole } from "@/types"
import {
  Menu,
  Bell,
  Globe,
  LogOut,
  LogIn,
  X,
  Lock,
  Mail,
  Loader2,
  ShieldCheck,
} from "lucide-react"
import { useLoginMutation, useLogoutMutation, useGetCurrentUserQuery } from "@/store/api/authApi"
import { toast } from "sonner"

interface DashboardNavbarProps {
  onToggleSidebar?: () => void
  activeTabTitle?: string
}

export function DashboardNavbar({
  onToggleSidebar,
  activeTabTitle,
}: DashboardNavbarProps) {
  const router = useRouter()
  const { currentRole, setCurrentRole, isAuthenticated, setIsAuthenticated } = useAppStore()
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [login, { isLoading: isLoggingIn }] = useLoginMutation()
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation()

  const isUserAuthenticated =
    isAuthenticated || (typeof document !== "undefined" && document.cookie.includes("rjf_session=1"))

  const { data: currentUser } = useGetCurrentUserQuery(undefined, {
    skip: !isUserAuthenticated,
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড প্রদান করুন")
      return
    }
    try {
      const session = await login({ email, password }).unwrap()
      const userRoles = session.user.roles || []
      const primaryRole = (typeof userRoles[0] === "object" ? userRoles[0]?.name : userRoles[0]) as UserRole
      setCurrentRole(primaryRole || "COMMUNITY_MEMBER")
      setIsAuthenticated(true)
      toast.success(`স্বাগতম, ${session.user.fullName}!`)
      setLoginModalOpen(false)
      setPassword("")
    } catch (err: any) {
      toast.error(err?.message || "লগইন ব্যর্থ হয়েছে। সঠিক তথ্য প্রদান করুন।")
    }
  }

  const handleLogout = async () => {
    try {
      await logout().unwrap()
    } catch {
      // ignore
    } finally {
      setIsAuthenticated(false)
      setCurrentRole("COMMUNITY_MEMBER")
      if (typeof document !== "undefined") {
        document.cookie = "rjf_session=; path=/; max-age=0"
        document.cookie = "rjf_auth_role=; path=/; max-age=0"
      }
      toast.info("সফলভাবে লগআউট হয়েছে")
      router.push("/login")
    }
  }

  const isUserLoggedIn = isUserAuthenticated

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/70 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 shadow-[0_1px_0_0_rgba(13,92,53,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)]">
      {/* Premium accent line */}
      <div className="h-0.5 w-full bg-linear-to-r from-[#0D5C35] via-emerald-400 to-[#0D5C35]" />

      <div className="flex h-16 w-full items-center justify-between px-3 sm:px-6 lg:px-8">
        {/* Left: Mobile Menu Button + Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 active:scale-95 transition-all"
            aria-label="Toggle Navigation"
          >
            <Menu className="size-5" />
          </button>

          <Link href="/" className="group flex items-center gap-3">
            <div className="relative w-10 h-10 shrink-0 rounded-xl bg-white p-1 ring-1 ring-stone-200 shadow-sm transition-all group-hover:ring-[#0D5C35]/40 group-hover:shadow-md">
              <Image
                src="/logo.png"
                alt="RJF Logo"
                fill
                sizes="40px"
                className="object-contain p-1"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-[11px] font-semibold tracking-wide text-stone-500 leading-tight">
                রৌমারী জনকল্যাণ ফাউন্ডেশন
              </div>
              <div className="mt-0.5 flex items-center gap-1.5 text-sm font-extrabold leading-tight text-[#0D5C35]">
                <span>অ্যাডমিন ড্যাশবোর্ড</span>
                {activeTabTitle && (
                  <>
                    <span className="text-stone-300 font-normal">/</span>
                    <span className="text-xs font-medium text-stone-500">
                      {activeTabTitle}
                    </span>
                  </>
                )}
              </div>
            </div>
          </Link>
        </div>

        {/* Right: Role + Website Link + Notification + User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Role badge */}
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-200/70 bg-linear-to-b from-emerald-50 to-white px-3 py-1.5 shadow-xs">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="hidden lg:inline-block text-[11px] font-medium text-stone-500">
              সক্রিয় রোল:
            </span>
            <span className="text-xs font-bold text-emerald-800">
              {ROLE_METAS[currentRole]?.titleBn || "সাধারণ ব্যবহারকারী"}
            </span>
          </div>

          {/* Quick link to Main Website */}
          <Link
            href="/"
            className="hidden md:flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-stone-600 transition-all hover:bg-stone-100 hover:text-[#0D5C35]"
            title="মূল ওয়েবসাইটে যান"
          >
            <Globe className="size-3.5 text-stone-400" />
            <span>ওয়েবসাইট</span>
          </Link>

          {/* Notification Icon */}
          <Link
            href="/dashboard?tab=notifications"
            className="relative rounded-xl p-2.5 text-stone-600 ring-1 ring-transparent transition-all hover:bg-stone-100 hover:text-[#0D5C35] hover:ring-stone-200"
            title="নোটিফিকেশন"
          >
            <Bell className="size-4.5" />
            <span className="absolute top-2 right-2 flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E53935] opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-[#E53935] ring-2 ring-white" />
            </span>
          </Link>

          {/* User Profile / Login Button */}
          {isUserLoggedIn ? (
            <div className="flex items-center gap-2.5 border-l border-stone-200 pl-3">
              <div className="flex size-9 select-none items-center justify-center rounded-full bg-linear-to-br from-[#0D5C35] to-emerald-600 text-sm font-bold text-white shadow-md ring-2 ring-white outline outline-emerald-100">
                {currentUser?.fullName ? currentUser.fullName[0] : (currentRole === "COMMUNITY_MEMBER" ? "স" : "ক")}
              </div>
              <div className="hidden xl:block text-left">
                <div className="text-xs font-bold leading-tight text-stone-800">
                  {currentUser?.fullName || (currentRole === "COMMUNITY_MEMBER" ? "সদস্য" : "কর্মকর্তা")}
                </div>
                <div className="mt-0.5 text-[10px] font-medium leading-tight text-stone-500">
                  {ROLE_METAS[currentRole]?.titleBn}
                </div>
              </div>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="cursor-pointer rounded-xl p-2 text-stone-400 transition-all hover:bg-red-50 hover:text-red-600 active:scale-95 disabled:opacity-50"
                title="লগআউট করুন"
              >
                <LogOut className="size-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setLoginModalOpen(true)}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-linear-to-b from-[#0F6B3D] to-[#0D5C35] px-4 py-2 text-xs font-bold text-white shadow-md shadow-emerald-900/20 ring-1 ring-inset ring-white/10 transition-all hover:from-[#0D5C35] hover:to-[#094527] hover:shadow-lg active:scale-95"
            >
              <LogIn className="size-3.5" />
              <span>লগইন</span>
            </button>
          )}
        </div>
      </div>

      {/* Staff Login Modal */}
      {loginModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/60 p-4 backdrop-blur-sm"
          onClick={() => setLoginModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md space-y-6 overflow-hidden rounded-3xl border border-stone-200/80 bg-white p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] animate-in fade-in zoom-in-95 duration-200 sm:p-8"
          >
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -top-24 -right-24 size-56 rounded-full bg-emerald-200/40 blur-3xl" />
            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-[#0D5C35] via-emerald-400 to-[#0D5C35]" />

            <div className="relative flex items-start justify-between">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                  <ShieldCheck className="size-3.5" />
                  <span>কর্মকর্তা অথেন্টিকেশন</span>
                </div>
                <h2 className="text-2xl font-black tracking-tight text-stone-900">ড্যাশবোর্ড লগইন</h2>
                <p className="text-xs leading-relaxed text-stone-500">
                  সিস্টেমে প্রবেশের জন্য আপনার অনুমোদিত ইমেইল ও পাসওয়ার্ড প্রদান করুন।
                </p>
              </div>
              <button
                onClick={() => setLoginModalOpen(false)}
                className="cursor-pointer rounded-full p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleLogin} className="relative space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700">ইমেইল ঠিকানা</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@romonijon.org"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50/50 py-3 pl-10 pr-3 text-sm transition-all placeholder:text-stone-400 focus:border-[#0D5C35] focus:bg-white focus:outline-hidden focus:ring-4 focus:ring-[#0D5C35]/10"
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
                    className="w-full rounded-xl border border-stone-200 bg-stone-50/50 py-3 pl-10 pr-3 text-sm transition-all placeholder:text-stone-400 focus:border-[#0D5C35] focus:bg-white focus:outline-hidden focus:ring-4 focus:ring-[#0D5C35]/10"
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
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-linear-to-b from-[#0F6B3D] to-[#0D5C35] py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/20 ring-1 ring-inset ring-white/10 transition-all hover:from-[#0D5C35] hover:to-[#094527] active:scale-[0.99] disabled:opacity-50"
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
      )}
    </header>
  )
}
export default DashboardNavbar