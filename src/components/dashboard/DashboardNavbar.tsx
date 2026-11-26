"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/store/useAppStore"
import { ROLE_METAS } from "@/config/dashboard-navigation"
import { UserRole } from "@/types"
import { Menu, Bell, Globe, LogOut, LogIn } from "lucide-react"
import { useLoginMutation, useLogoutMutation, useGetCurrentUserQuery } from "@/store/api/authApi"
import { toast } from "sonner"
import PwaInstallButton from "@/components/pwa/PwaInstallButton"
import { StaffLoginModal } from "@/components/dashboard/StaffLoginModal"

interface DashboardNavbarProps {
  onToggleSidebar?: () => void
  activeTabTitle?: string
}

export function DashboardNavbar({ onToggleSidebar, activeTabTitle }: DashboardNavbarProps) {
  const router = useRouter()
  const { currentRole, setCurrentRole, isAuthenticated, setIsAuthenticated } = useAppStore()
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [login, { isLoading: isLoggingIn }] = useLoginMutation()
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const isUserAuthenticated = isAuthenticated || (mounted && typeof document !== "undefined" && document.cookie.includes("rjf_session=1"))
  const { data: currentUser } = useGetCurrentUserQuery(undefined, { skip: !isUserAuthenticated })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) { toast.error("ইমেইল ও পাসওয়ার্ড প্রদান করুন"); return }
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
    try { await logout().unwrap() } catch { /* ignore */ } finally {
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

  const isUserLoggedIn = mounted && isUserAuthenticated

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/70 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 shadow-[0_1px_0_0_rgba(214,40,40,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)]">
      <div className="h-0.5 w-full bg-linear-to-r from-[#D62828] via-red-400 to-[#D62828]" />
      <div className="flex h-16 w-full items-center justify-between px-3 sm:px-6 lg:px-8">
        {/* Left: Mobile Menu + Brand Logo */}
        <div className="flex items-center gap-3">
          <button type="button" onClick={onToggleSidebar} className="md:hidden p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 active:scale-95 transition-all cursor-pointer" aria-label="Toggle Navigation">
            <Menu className="size-5" />
          </button>
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative w-10 h-10 shrink-0 rounded-xl bg-white p-1 ring-1 ring-stone-200 shadow-sm transition-all group-hover:ring-[#D62828]/40 group-hover:shadow-md">
              <Image src="/logo.png" alt="RJF Logo" fill sizes="40px" className="object-contain p-1" priority />
            </div>
            <div className="hidden sm:block">
              <div className="text-[11px] font-semibold tracking-wide text-stone-500 leading-tight">রৌমারী জনকল্যাণ ফাউন্ডেশন</div>
              <div className="mt-0.5 flex items-center gap-1.5 text-sm font-extrabold leading-tight text-[#D62828]">
                <span>{mounted && currentRole === 'SUPER_ADMIN' ? 'অ্যাডমিন ড্যাশবোর্ড' : 'সদস্য ড্যাশবোর্ড'}</span>
                {activeTabTitle && (
                  <>
                    <span className="text-stone-300 font-normal">/</span>
                    <span className="text-xs font-medium text-stone-500">{activeTabTitle}</span>
                  </>
                )}
              </div>
            </div>
          </Link>
        </div>

        {/* Right: Role Badge + Links + User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-red-200/70 bg-linear-to-b from-red-50 to-white px-3 py-1.5 shadow-xs">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-[#D62828]" />
            </span>
            <span className="hidden lg:inline-block text-[11px] font-medium text-stone-500">সক্রিয় রোল:</span>
            <span className="text-xs font-bold text-red-800">{mounted && ROLE_METAS[currentRole] ? ROLE_METAS[currentRole].titleBn : "সাধারণ ব্যবহারকারী"}</span>
          </div>

          <Link href="/" className="hidden md:flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-stone-600 transition-all hover:bg-stone-100 hover:text-[#D62828]" title="মূল ওয়েবসাইটে যান">
            <Globe className="size-3.5 text-stone-400" />
            <span>ওয়েবসাইট</span>
          </Link>

          <PwaInstallButton variant="navbar" />

          <Link href="/dashboard?tab=notifications" className="relative rounded-xl p-2.5 text-stone-600 ring-1 ring-transparent transition-all hover:bg-stone-100 hover:text-[#D62828] hover:ring-stone-200" title="নোটিফিকেশন">
            <Bell className="size-4.5" />
            <span className="absolute top-2 right-2 flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D62828] opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-[#D62828] ring-2 ring-white" />
            </span>
          </Link>

          {!mounted ? (
            <div className="h-9 w-20 rounded-xl bg-stone-100/50" />
          ) : isUserLoggedIn ? (
            <div className="flex items-center gap-2.5 border-l border-stone-200 pl-3">
              <Link href="/dashboard?tab=my-profile" className="flex items-center gap-2.5 group cursor-pointer hover:opacity-85 transition-opacity" title="আমার প্রোফাইল দেখুন">
                <div className="flex size-9 select-none items-center justify-center rounded-full bg-linear-to-br from-[#D62828] to-red-600 text-sm font-bold text-white shadow-md ring-2 ring-white outline outline-red-100 group-hover:scale-105 transition-transform overflow-hidden">
                  {currentUser?.avatarUrl ? (
                    <img src={currentUser.avatarUrl} alt="" className="size-full rounded-full object-cover" />
                  ) : currentUser?.fullName ? (
                    currentUser.fullName[0]
                  ) : (
                    currentRole === "COMMUNITY_MEMBER" ? "স" : "ক"
                  )}
                </div>
                <div className="hidden xl:block text-left">
                  <div className="text-xs font-bold leading-tight text-stone-800 group-hover:text-[#D62828] transition-colors">
                    {currentUser?.fullName || (currentRole === "COMMUNITY_MEMBER" ? "সদস্য" : "কর্মকর্তা")}
                  </div>
                  <div className="mt-0.5 text-[10px] font-medium leading-tight text-stone-500">{ROLE_METAS[currentRole]?.titleBn}</div>
                </div>
              </Link>
              <button onClick={handleLogout} disabled={isLoggingOut} className="cursor-pointer rounded-xl p-2 text-stone-400 transition-all hover:bg-red-50 hover:text-red-600 active:scale-95 disabled:opacity-50" title="লগআউট করুন">
                <LogOut className="size-4" />
              </button>
            </div>
          ) : (
            <button onClick={() => setLoginModalOpen(true)} className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-linear-to-b from-[#B91C1C] to-[#D62828] px-4 py-2 text-xs font-bold text-white shadow-md shadow-red-900/20 ring-1 ring-inset ring-white/10 transition-all hover:from-[#D62828] hover:to-[#991B1B] hover:shadow-lg active:scale-95">
              <LogIn className="size-3.5" />
              <span>লগইন</span>
            </button>
          )}
        </div>
      </div>

      <StaffLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        isLoggingIn={isLoggingIn}
        onSubmit={handleLogin}
      />
    </header>
  )
}
export default DashboardNavbar
