"use client"

import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/store/useAppStore"
import { ROLE_METAS } from "@/config/dashboard-navigation"
import { UserRole } from "@/types"
import { Menu, Bell, Globe, Home, LogOut, LogIn, User, Download, ChevronDown } from "lucide-react"
import { useLoginMutation, useLogoutMutation, useGetCurrentUserQuery } from "@/store/api/authApi"
import { toast } from "sonner"
import PwaInstallButton from "@/components/pwa/PwaInstallButton"
import { usePwa } from "@/context/PwaContext"
import { StaffLoginModal } from "@/components/dashboard/StaffLoginModal"
import { DashboardBreadcrumb } from "@/components/dashboard/DashboardBreadcrumb"

interface NavbarProps {
  onToggleSidebar?: () => void
  activeTabTitle?: string
}

export function Navbar({ onToggleSidebar, activeTabTitle }: NavbarProps) {
  const router = useRouter()
  const { currentRole, setCurrentRole, isAuthenticated, setIsAuthenticated } = useAppStore()
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [login, { isLoading: isLoggingIn }] = useLoginMutation()
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation()
  const [mounted, setMounted] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const profileMenuRef = useRef<HTMLDivElement>(null)
  const { isInstallable, isInstalled, promptInstall } = usePwa()

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!profileMenuOpen) return
    const handleOutsideClick = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false)
      }
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setProfileMenuOpen(false)
    }
    document.addEventListener("mousedown", handleOutsideClick)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [profileMenuOpen])

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
      <div className="flex h-16 md:h-[4.5rem] w-full items-center justify-between px-3 sm:px-6 lg:px-8">
        {/* Left: Mobile Menu + Brand Logo + Breadcrumbs */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 active:scale-95 transition-all cursor-pointer"
            aria-label="Toggle Navigation"
          >
            <Menu className="size-5" />
          </button>
          <Link href="/" className="group flex items-center gap-2.5 md:gap-3">
            <div className="relative w-9 h-9 md:w-10 md:h-10 shrink-0 rounded-xl bg-white p-1 ring-1 ring-stone-200 shadow-xs transition-all group-hover:ring-[#D62828]/40 group-hover:shadow-md">
              <Image src="/logo.png" alt="RJF Logo" fill sizes="40px" className="object-contain p-0.5" priority />
            </div>
            <div className="hidden sm:block">
              <div className="text-[11px] md:text-xs font-semibold tracking-wide text-stone-500 leading-tight">রৌমারী জনকল্যাণ ফাউন্ডেশন</div>
              <div className="text-xs md:text-sm font-black leading-tight text-[#D62828]">
                {mounted && currentRole === 'SUPER_ADMIN' ? 'অ্যাডমিন পোর্টাল' : 'সদস্য পোর্টাল'}
              </div>
            </div>
          </Link>

          {/* Dynamic Breadcrumbs on desktop */}
          <div className="hidden md:block pl-3 border-l border-stone-200">
            <DashboardBreadcrumb customTitle={activeTabTitle} />
          </div>
        </div>

        {/* Right: Role Badge + Links + User Profile */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-red-200/70 bg-linear-to-b from-red-50 to-white px-3 md:px-3.5 py-1.5 shadow-xs">
            <span className="relative flex size-1.5 md:size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />
              <span className="relative inline-flex size-1.5 md:size-2 rounded-full bg-[#D62828]" />
            </span>
            <span className="hidden lg:inline-block text-[11px] md:text-xs font-medium text-stone-500">রোল:</span>
            <span className="text-xs md:text-sm font-bold text-red-800">
              {mounted && ROLE_METAS[currentRole] ? ROLE_METAS[currentRole].titleBn : "সাধারণ ব্যবহারকারী"}
            </span>
          </div>

          <Link href="/" className="hidden md:flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs md:text-sm font-semibold text-stone-600 transition-all hover:bg-stone-100 hover:text-[#D62828]" title="হোম পেজে যান" aria-label="হোম পেজ">
            <Globe className="size-4 text-stone-400" />
            <span>ওয়েবসাইট</span>
          </Link>

          <PwaInstallButton variant="navbar" className="hidden md:flex" />

          <Link href="/dashboard/notifications" className="relative rounded-xl p-2.5 text-stone-600 ring-1 ring-transparent transition-all hover:bg-stone-100 hover:text-[#D62828] hover:ring-stone-200" title="নোটিফিকেশন">
            <Bell className="size-5" />
            <span className="absolute top-2 right-2 flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D62828] opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-[#D62828] ring-2 ring-white" />
            </span>
          </Link>

          {!mounted ? (
            <div className="h-9 w-16 rounded-xl bg-stone-100/50" />
          ) : isUserLoggedIn ? (
            <div ref={profileMenuRef} className="relative flex items-center gap-2 border-l border-stone-200 pl-2.5 md:pl-4">
              <button
                type="button"
                onClick={() => setProfileMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 md:gap-2.5 group cursor-pointer rounded-xl p-1 hover:bg-stone-100/80 transition-colors"
                aria-expanded={profileMenuOpen}
                aria-haspopup="menu"
                title="ইউজার মেনু"
              >
                <div className="flex size-9 md:size-10 select-none items-center justify-center rounded-full bg-linear-to-br from-[#D62828] to-red-600 text-sm md:text-base font-bold text-white shadow-md ring-2 ring-white outline outline-red-100 overflow-hidden">
                  {currentUser?.avatarUrl ? (
                    <img src={currentUser.avatarUrl} alt="" className="size-full rounded-full object-cover" />
                  ) : currentUser?.fullName ? (
                    currentUser.fullName[0]
                  ) : (
                    currentRole === "COMMUNITY_MEMBER" ? "স" : "ক"
                  )}
                </div>
                <div className="hidden xl:block text-left">
                  <div className="text-xs md:text-sm font-bold leading-tight text-stone-800 group-hover:text-[#D62828] transition-colors">
                    {currentUser?.fullName || (currentRole === "COMMUNITY_MEMBER" ? "সদস্য" : "কর্মকর্তা")}
                  </div>
                  <div className="mt-0.5 text-[10px] md:text-xs font-medium leading-tight text-stone-500">{ROLE_METAS[currentRole]?.titleBn}</div>
                </div>
                <ChevronDown className={`size-3.5 text-stone-400 transition-transform ${profileMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {profileMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full mt-2 w-60 rounded-2xl border border-stone-200 bg-white p-1.5 shadow-xl z-50"
                >
                  <div className="px-3 py-2.5 border-b border-stone-100">
                    <div className="text-sm font-bold text-stone-900 truncate">
                      {currentUser?.fullName || (currentRole === "COMMUNITY_MEMBER" ? "সদস্য" : "কর্মকর্তা")}
                    </div>
                    <div className="text-xs font-medium text-[#D62828] mt-0.5">
                      {ROLE_METAS[currentRole]?.titleBn || "সাধারণ ব্যবহারকারী"}
                    </div>
                  </div>

                  <div className="py-1 space-y-0.5">
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setProfileMenuOpen(false)}
                      role="menuitem"
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-colors"
                    >
                      <User className="size-4 text-stone-500" />
                      <span>আমার প্রোফাইল</span>
                    </Link>

                    <Link
                      href="/"
                      onClick={() => setProfileMenuOpen(false)}
                      role="menuitem"
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-colors"
                    >
                      <Home className="size-4 text-stone-500" />
                      <span>হোম পেজে যান</span>
                    </Link>

                    {isInstallable && !isInstalled && (
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setProfileMenuOpen(false)
                          promptInstall()
                        }}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold text-[#D62828] hover:bg-red-50 transition-colors cursor-pointer text-left"
                      >
                        <Download className="size-4" />
                        <span>অ্যাপ ইনস্টল করুন</span>
                      </button>
                    )}
                  </div>

                  <div className="border-t border-stone-100 pt-1">
                    <button
                      type="button"
                      role="menuitem"
                      disabled={isLoggingOut}
                      onClick={() => {
                        setProfileMenuOpen(false)
                        handleLogout()
                      }}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50 text-left"
                    >
                      <LogOut className="size-4" />
                      <span>লগআউট করুন</span>
                    </button>
                  </div>
                </div>
              )}
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

export default Navbar
