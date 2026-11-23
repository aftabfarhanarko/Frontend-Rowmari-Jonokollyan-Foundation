"use client"

import React, { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useAppStore } from "@/store/useAppStore"
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import { DashboardContent } from "@/components/dashboard/DashboardContent"
import { canAccessNavItem, DASHBOARD_NAV_ITEMS } from "@/config/dashboard-navigation"

import BloodRequestModal from "@/components/modals/BloodRequestModal"
import BloodDonorModal from "@/components/modals/BloodDonorModal"
import AssistanceModal from "@/components/modals/AssistanceModal"
import DonationModal from "@/components/modals/DonationModal"
import VolunteerModal from "@/components/modals/VolunteerModal"
import AnnouncementModal from "@/components/modals/AnnouncementModal"
import Footer from "@/components/Footer"

interface DashboardShellProps {
  defaultTab?: string
}

export function DashboardShell({ defaultTab }: DashboardShellProps) {
  const searchParams = useSearchParams()
  const initialTab = defaultTab || searchParams.get("tab") || "overview"

  const {
    currentRole,
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

  // Sync with searchParams or defaultTab if changes
  useEffect(() => {
    const tabFromUrl = searchParams.get("tab")
    if (tabFromUrl) {
      setActiveTab(tabFromUrl)
    } else if (defaultTab) {
      setActiveTab(defaultTab)
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

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-[#1E293B] flex flex-col font-sans">
      {/* 1. Global Top Navbar */}
      <DashboardNavbar
        onToggleSidebar={() => setIsMobileSidebarOpen(true)}
        activeTabTitle={activeNavItem?.titleBn}
      />

      {/* 2. Body: Sidebar + Main Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Dynamic Role-Based Sidebar */}
        <DashboardSidebar
          activeTab={activeTab}
          onSelectTab={(tabId) => setActiveTab(tabId)}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Dynamic Tab Content Area */}
        <main className="flex-1 min-w-0 p-3 sm:p-6 lg:p-8">
          <DashboardContent activeTab={activeTab} />
        </main>
      </div>

      {/* 3. Global Footer */}
      <Footer lang={lang} />

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

      <DonationModal
        isOpen={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
        lang={lang}
        preselectedCampaign={preselectedCampaign}
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
