"use client"

import React, { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useAppStore } from "@/store/useAppStore"
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import { DashboardContent } from "@/components/dashboard/DashboardContent"
import { canAccessNavItem, DASHBOARD_NAV_ITEMS } from "@/config/dashboard-navigation"
import { ShieldAlert } from "lucide-react"
import { toast } from "sonner"

import BloodRequestModal from "@/components/modals/BloodRequestModal"
import BloodDonorModal from "@/components/modals/BloodDonorModal"
import AssistanceModal from "@/components/modals/AssistanceModal"
import VolunteerModal from "@/components/modals/VolunteerModal"
import AnnouncementModal from "@/components/modals/AnnouncementModal"

interface DashboardShellProps {
  defaultTab?: string
}

export function DashboardShell({ defaultTab }: DashboardShellProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialTab = defaultTab || searchParams.get("tab") || "overview"

  const {
    currentRole,
    isAuthenticated,
    lang,
    bloodRequestModalOpen,
    setBloodRequestModalOpen,
    bloodDonorModalOpen,
    setBloodDonorModalOpen,
    assistanceModalOpen,
    setAssistanceModalOpen,
    donationModalOpen,
    setDonationModalOpen,
    preselectedCampaign,
    volunteerModalOpen,
    setVolunteerModalOpen,
    announcementModalOpen,
    setAnnouncementModalOpen,
  } = useAppStore()

  const [activeTab, setActiveTab] = useState(initialTab)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  // Client-side authentication verification:
  // If user is unauthenticated (no session cookie and store is unauthenticated), redirect to login
  useEffect(() => {
    if (typeof document !== "undefined") {
      const hasSessionCookie = document.cookie.includes("rjf_session=1")
      if (!hasSessionCookie && !isAuthenticated) {
        toast.error("ড্যাশবোর্ডে প্রবেশ করতে অনুগ্রহ করে প্রথমে লগইন করুন।")
        const currentPath = typeof window !== 'undefined' ? (window.location.pathname + window.location.search) : '/dashboard';
        router.push(`/login?redirect=${encodeURIComponent(currentPath)}`)
      }
    }
  }, [isAuthenticated, router])

  // Sync with searchParams or defaultTab if changes
  useEffect(() => {
    const tabFromUrl = searchParams.get("tab")
    if (tabFromUrl) {
      setActiveTab(tabFromUrl)
    } else if (defaultTab) {
      setActiveTab(defaultTab)
    }

    const denied = searchParams.get("denied")
    if (denied) {
      toast.error(`আপনার বর্তমান রোলে '${denied}' সেকশনে প্রবেশের অনুমতি নেই।`)
    }
  }, [searchParams, defaultTab])

  // If user switches role and currently selected tab is not permitted for the new role,
  // gracefully fall back to 'overview'
  useEffect(() => {
    if (!canAccessNavItem(currentRole, activeTab)) {
      setActiveTab("overview")
    }
  }, [currentRole, activeTab])

  const activeNavItem = DASHBOARD_NAV_ITEMS.find((it) => it.id === activeTab)
  const isPermitted = canAccessNavItem(currentRole, activeTab)

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-white font-sans text-[#1E293B] antialiased selection:bg-emerald-200/60 selection:text-emerald-950">
      {/* Decorative ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-32 size-120 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute top-1/3 -right-40 size-130 rounded-full bg-amber-100/40 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(13,92,53,0.05)_1px,transparent_0)] bg-size-[28px_28px] mask-[linear-gradient(to_bottom,black,transparent_60%)]" />
      </div>

      {/* 1. Global Top Navbar */}
      <DashboardNavbar
        onToggleSidebar={() => setIsMobileSidebarOpen(true)}
        activeTabTitle={activeNavItem?.titleBn}
      />

      {/* 2. Body: Sidebar + Main Content */}
      <div className="flex w-full flex-1">
        {/* Dynamic Role-Based Sidebar */}
        <DashboardSidebar
          activeTab={activeTab}
          onSelectTab={(tabId) => setActiveTab(tabId)}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Dynamic Tab Content Area */}
        <main className="min-w-0 flex-1 p-3 sm:p-6 lg:p-8">
          <div className="min-h-[calc(100vh-6.5rem)] rounded-3xl border border-stone-200/70 bg-white/70 p-4 shadow-[0_1px_0_0_rgba(255,255,255,0.8)_inset,0_20px_50px_-24px_rgba(13,92,53,0.18)] ring-1 ring-black/2 backdrop-blur-sm sm:p-6 lg:p-8">
            {isPermitted ? (
              <div
                key={activeTab}
                className="animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                <DashboardContent activeTab={activeTab} onSelectTab={(tabId) => setActiveTab(tabId)} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center min-h-[50vh]">
                <div className="w-16 h-16 rounded-3xl bg-red-100 flex items-center justify-center text-red-600 mb-4 shadow-xs">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-extrabold text-stone-900">অননুমোদিত এক্সেস (403 Forbidden)</h2>
                <p className="text-sm text-stone-500 mt-1 max-w-md">
                  আপনার বর্তমান এক্সেস রোল ({currentRole}) এর জন্য এই সেকশনটিতে প্রবেশের অনুমতি নেই।
                </p>
                <button
                  onClick={() => setActiveTab("overview")}
                  className="mt-5 px-5 py-2.5 rounded-xl bg-[#0D5C35] text-white font-bold text-xs hover:bg-[#094226] transition-colors"
                >
                  ড্যাশবোর্ড ওভারভিউতে ফিরে যান
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modals integrated with Dashboard quick actions */}
      <BloodRequestModal
        isOpen={bloodRequestModalOpen}
        onClose={() => setBloodRequestModalOpen(false)}
        lang={lang}
      />

      <BloodDonorModal
        isOpen={bloodDonorModalOpen}
        onClose={() => setBloodDonorModalOpen(false)}
        lang={lang}
      />

      <AssistanceModal
        isOpen={assistanceModalOpen}
        onClose={() => setAssistanceModalOpen(false)}
        lang={lang}
      />



      <VolunteerModal
        isOpen={volunteerModalOpen}
        onClose={() => setVolunteerModalOpen(false)}
        lang={lang}
      />

      <AnnouncementModal
        isOpen={announcementModalOpen}
        onClose={() => setAnnouncementModalOpen(false)}
        lang={lang}
        onOpenBloodRequest={() => {
          setAnnouncementModalOpen(false)
          setBloodRequestModalOpen(true)
        }}
        onOpenAssistance={() => {
          setAnnouncementModalOpen(false)
          setAssistanceModalOpen(true)
        }}
      />
    </div>
  )
}

export default DashboardShell