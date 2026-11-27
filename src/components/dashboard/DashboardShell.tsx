"use client"

import React, { useState, useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useAppStore } from "@/store/useAppStore"
import { Navbar } from "@/components/dashboard/Navbar"
import { Sidebar } from "@/components/dashboard/Sidebar"
import { DashboardContent } from "@/components/dashboard/DashboardContent"
import { canAccessNavItem, DASHBOARD_NAV_ITEMS } from "@/config/dashboard-navigation"
import { ShieldAlert } from "lucide-react"
import { toast } from "sonner"
import { useGetCurrentUserQuery } from "@/store/api/authApi"
import { UserRole } from "@/types"
import { DashboardShellSkeleton } from "@/components/ui/skeleton"

import VolunteerModal from "@/components/modals/VolunteerModal"
import AnnouncementModal from "@/components/modals/AnnouncementModal"

interface DashboardShellProps {
  children?: React.ReactNode
  defaultTab?: string
}

export function DashboardShell({ children, defaultTab }: DashboardShellProps) {
  const router = useRouter()
  const pathname = usePathname() || "/dashboard"
  const searchParams = useSearchParams()

  const segments = pathname.split("/").filter(Boolean)
  const lastSegment = segments[segments.length - 1]
  const currentTabFromRoute = lastSegment === "dashboard" ? "overview" : lastSegment
  const initialTab = defaultTab || searchParams.get("tab") || currentTabFromRoute || "overview"

  const {
    currentRole,
    setCurrentRole,
    isAuthenticated,
    setIsAuthenticated,
    lang,
    assistanceModalOpen,
    setAssistanceModalOpen,
    volunteerModalOpen,
    setVolunteerModalOpen,
    announcementModalOpen,
    setAnnouncementModalOpen,
  } = useAppStore()

  const [activeTab, setActiveTab] = useState(initialTab)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isAuthReady, setIsAuthReady] = useState(false)

  // Fetch current user if session cookie is present
  const hasSessionCookie = typeof document !== "undefined" && document.cookie.includes("rjf_session=1")
  const { data: currentUser, isLoading: isUserLoading, isError: isUserError } = useGetCurrentUserQuery(
    undefined,
    { skip: typeof window === "undefined" || (!hasSessionCookie && !isAuthenticated) }
  )

  // Auth & Role Sync Initialization
  useEffect(() => {
    if (typeof document === "undefined") return

    const sessionExists = document.cookie.includes("rjf_session=1")
    if (!sessionExists && !isAuthenticated) {
      toast.error("ড্যাশবোর্ডে প্রবেশ করতে অনুগ্রহ করে প্রথমে লগইন করুন।")
      const currentPath = window.location.pathname + window.location.search
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`)
      return
    }

    // Read saved role cookie immediately to prevent flash
    const roleCookieMatch = document.cookie.match(/rjf_auth_role=([^;]+)/)
    if (roleCookieMatch && roleCookieMatch[1]) {
      const savedRole = roleCookieMatch[1] as UserRole
      if (savedRole !== currentRole) {
        setCurrentRole(savedRole)
      }
    }

    if (currentUser) {
      setIsAuthenticated(true)
      const userRoles = currentUser.roles || []
      const primaryRole = (typeof userRoles[0] === "object" ? (userRoles[0] as any)?.name : userRoles[0]) as UserRole
      if (primaryRole && primaryRole !== currentRole) {
        setCurrentRole(primaryRole)
      }
      setIsAuthReady(true)
    } else if (isUserError || (!isUserLoading && sessionExists)) {
      // Finished loading or fallback to cookie role
      setIsAuthReady(true)
    }
  }, [currentUser, isUserLoading, isUserError, isAuthenticated, currentRole, router, setCurrentRole, setIsAuthenticated])

  // Sync activeTab with pathname or query
  useEffect(() => {
    const tabFromUrl = searchParams.get("tab")
    if (tabFromUrl) {
      setActiveTab(tabFromUrl)
    } else if (defaultTab) {
      setActiveTab(defaultTab)
    } else {
      const segs = pathname.split("/").filter(Boolean)
      const last = segs[segs.length - 1]
      setActiveTab(last === "dashboard" ? "overview" : (last || "overview"))
    }
  }, [searchParams, defaultTab, pathname])

  // Role access check only after auth is ready
  useEffect(() => {
    if (isAuthReady && !canAccessNavItem(currentRole, activeTab)) {
      setActiveTab("overview")
    }
  }, [isAuthReady, currentRole, activeTab])

  // Clean structured skeleton while auth and role are resolving
  if (!isAuthReady) {
    return <DashboardShellSkeleton />
  }

  const activeNavItem = DASHBOARD_NAV_ITEMS.find((it) => it.id === activeTab)
  const isPermitted = canAccessNavItem(currentRole, activeTab)

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-white font-sans text-[#1E293B] antialiased selection:bg-red-200/60 selection:text-red-950">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-32 size-120 rounded-full bg-red-200/20 blur-3xl" />
        <div className="absolute top-1/3 -right-40 size-130 rounded-full bg-stone-100/40 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(214,40,40,0.04)_1px,transparent_0)] bg-size-[28px_28px] mask-[linear-gradient(to_bottom,black,transparent_60%)]" />
      </div>

      <Navbar onToggleSidebar={() => setIsMobileSidebarOpen(true)} activeTabTitle={activeNavItem?.titleBn} />

      <div className="flex w-full flex-1">
        <Sidebar
          activeTab={activeTab}
          onSelectTab={(tabId) => setActiveTab(tabId)}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />

        <main className="relative min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">
            {isPermitted ? (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                {children ? children : <DashboardContent activeTab={activeTab} onSelectTab={(tabId) => setActiveTab(tabId)} />}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center min-h-[50vh]">
                <div className="w-16 h-16 rounded-3xl bg-red-100 flex items-center justify-center text-red-600 mb-4 shadow-xs">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-extrabold text-stone-900">অননুমোদিত এক্সেস (403 Forbidden)</h2>
                <p className="text-sm text-stone-500 mt-1 max-w-md">আপনার বর্তমান এক্সেস রোল ({currentRole}) এর জন্য এই সেকশনটিতে প্রবেশের অনুমতি নেই।</p>
                <button
                  type="button"
                  onClick={() => router.push("/dashboard")}
                  className="mt-5 px-5 py-2.5 rounded-xl bg-[#D62828] text-white font-bold text-xs hover:bg-[#B91C1C] transition-colors cursor-pointer"
                >
                  ড্যাশবোর্ড ওভারভিউতে ফিরে যান
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      <VolunteerModal isOpen={volunteerModalOpen} onClose={() => setVolunteerModalOpen(false)} lang={lang} />
      <AnnouncementModal
        isOpen={announcementModalOpen}
        onClose={() => setAnnouncementModalOpen(false)}
        lang={lang}
      />
    </div>
  )
}

export default DashboardShell
