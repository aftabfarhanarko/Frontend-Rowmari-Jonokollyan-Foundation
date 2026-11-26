"use client"

import React from "react"
import { useAppStore } from "@/store/useAppStore"
import { Button } from "@/components/ui/button"
import { RoleBadge } from "@/components/dashboard/RoleBadge"
import { ROLE_METAS } from "@/config/dashboard-navigation"
import { RefreshCw, Plus, HeartHandshake } from "lucide-react"

import {
  useGetAdminApplicationsQuery,
  useGetAdminVolunteersQuery,
  useGetAdminUsersQuery,
  useGetAdminNotificationsQuery,
  useGetMyApplicationsQuery,
} from "@/store/api/dashboardApi"
import { useGetCampaignsQuery } from "@/store/api/campaignsApi"
import { useGetAdminDashboardQuery } from "@/store/api/adminApi"
import { useGetCurrentUserQuery, useUpdateProfileMutation } from "@/store/api/authApi"

import { CmsPagesTab } from "@/components/dashboard/cms/CmsPagesTab"
import { CmsNewsTab } from "@/components/dashboard/cms/CmsNewsTab"
import { CmsGalleryTab } from "@/components/dashboard/cms/CmsGalleryTab"
import { CmsSettingsTab } from "@/components/dashboard/cms/CmsSettingsTab"
import { CmsUsersTab } from "@/components/dashboard/cms/CmsUsersTab"
import { CmsMessagesTab } from "@/components/dashboard/cms/CmsMessagesTab"
import { CmsActivityLogsTab } from "@/components/dashboard/cms/CmsActivityLogsTab"

import { MemberOverviewTab } from "@/components/dashboard/tabs/MemberOverviewTab"
import { AdminOverviewTab } from "@/components/dashboard/tabs/AdminOverviewTab"
import { CasesTab } from "@/components/dashboard/tabs/CasesTab"
import { VolunteersTab } from "@/components/dashboard/tabs/VolunteersTab"
import { CampaignsTab } from "@/components/dashboard/tabs/CampaignsTab"
import { MyApplicationsTab } from "@/components/dashboard/tabs/MyApplicationsTab"
import { MyVolunteerTab } from "@/components/dashboard/tabs/MyVolunteerTab"
import { ProfileTab } from "@/components/dashboard/tabs/ProfileTab"
import { NotificationsTab } from "@/components/dashboard/tabs/NotificationsTab"
import { MedicalEducationTab } from "@/components/dashboard/tabs/MedicalEducationTab"
import { DonationsTab } from "@/components/dashboard/tabs/DonationsTab"
import { RoumariTab } from "@/components/dashboard/tabs/RoumariTab"

interface DashboardContentProps {
  activeTab: string
  onSelectTab?: (tab: string) => void
}

export function DashboardContent({ activeTab, onSelectTab }: DashboardContentProps) {
  const { currentRole, setAssistanceModalOpen } = useAppStore()
  const roleMeta = ROLE_METAS[currentRole] || ROLE_METAS.COMMUNITY_MEMBER
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const { data: currentUser, refetch: refetchCurrentUser } = useGetCurrentUserQuery()
  const [updateProfileMutation] = useUpdateProfileMutation()

  const isStaff = currentRole !== "COMMUNITY_MEMBER"
  const { data: adminDashboard } = useGetAdminDashboardQuery(undefined, { skip: currentRole !== "SUPER_ADMIN" })
  const { data: adminAppsRes } = useGetAdminApplicationsQuery(undefined, { skip: !isStaff })
  const appItems = Array.isArray(adminAppsRes) ? adminAppsRes : (adminAppsRes as any)?.items || []

  const { data: adminVolunteersRes } = useGetAdminVolunteersQuery(undefined, { skip: !isStaff })
  const volunteerItems = Array.isArray(adminVolunteersRes) ? adminVolunteersRes : (adminVolunteersRes as any)?.items || []

  const { data: adminUsersRes } = useGetAdminUsersQuery(undefined, { skip: !["SUPER_ADMIN", "ADMIN"].includes(currentRole) })
  const userItems = Array.isArray(adminUsersRes) ? adminUsersRes : (adminUsersRes as any)?.items || []

  const { data: liveCampaignsRes } = useGetCampaignsQuery()
  const liveCampaigns = liveCampaignsRes || []

  const { data: myAppsRes } = useGetMyApplicationsQuery(undefined)
  const myAppItems = Array.isArray(myAppsRes) ? myAppsRes : (myAppsRes as any)?.items || []

  const { data: adminNotificationsRes } = useGetAdminNotificationsQuery(undefined, { skip: !isStaff })
  const notificationItems = Array.isArray(adminNotificationsRes) ? adminNotificationsRes : (adminNotificationsRes as any)?.items || []

  // Data mappers
  const displayMedicalData = appItems.filter((a: any) => a.category === "MEDICAL").map((r: any) => ({
    id: r.referenceCode || r.id?.slice(0, 8), patientName: r.applicantName, disease: r.title,
    hospital: r.institution || "রৌমারী উপজেলা স্বাস্থ্য কমপ্লেক্স", requiredAmount: r.amountRequested?.toLocaleString("bn-BD") || "০",
    approvedAmount: r.amountApproved?.toLocaleString("bn-BD") || "০", status: r.status === "APPROVED" ? "অনুমোদিত" : "বিচারাধীন",
  }))

  const displayEducationData = appItems.filter((a: any) => a.category === "EDUCATION").map((r: any) => ({
    id: r.referenceCode || r.id?.slice(0, 8), studentName: r.applicantName, institute: r.institution || "রৌমারী সরকারি কলেজ",
    grade: r.notes || "উচ্চ মাধ্যমিক", supportType: r.title, amount: r.amountApproved?.toLocaleString("bn-BD") || r.amountRequested?.toLocaleString("bn-BD") || "০",
    status: r.status === "APPROVED" ? "অনুমোদিত" : "বিচারাধীন",
  }))

  const displayVolunteersData = volunteerItems.map((r: any) => ({
    id: r.referenceCode || r.id?.slice(0, 8), name: r.user?.fullName || r.name || "স্বেচ্ছাসেবক",
    wing: r.bloodGroup ? `রক্তদান (${r.bloodGroup})` : "ত্রাণ ও পুনর্বাসন", union: r.user?.upazila || "রৌমারী সদর",
    phone: r.phone || r.user?.phone || "+8801700000000", status: r.isApproved ? "সক্রিয়" : "অপেক্ষমান",
  }))

  const displayCasesData = appItems.map((r: any) => ({
    id: r.referenceCode || r.id?.slice(0, 8), applicant: r.applicantName, category: r.category === "MEDICAL" ? "চিকিৎসা" : "শিক্ষা",
    village: r.applicantAddress || "রৌমারী", officer: "তদন্ত টিম-১",
    visitStatus: r.status === "APPROVED" ? "সম্পন্ন" : "প্রক্রিয়াধীন", recommendation: r.adminRemarks || "জরুরি সহায়তা প্রযোজ্য",
  }))

  const displayCampaignsList = liveCampaigns.map((c: any) => ({
    id: c.slug || c.id?.slice(0, 8), titleBn: c.title, target: Number(c.targetAmount) || 0,
    raised: Number(c.currentAmount) || 0, donors: c.donorCount || 0, deadlineBn: c.deadline ? new Date(c.deadline).toLocaleDateString("bn-BD") : "চলমান",
    status: c.status === "ACTIVE" ? "চলমান" : "সমাপ্ত",
  }))

  const displayMyApps = myAppItems.map((r: any) => ({
    id: r.referenceCode || r.id?.slice(0, 8), categoryBn: r.category === "MEDICAL" ? "জরুরি চিকিৎসা সহায়তা" : "শিক্ষা বৃত্তি ও উপকরণ",
    statusTitle: r.status === "APPROVED" ? "অনুমোদিত" : r.status === "REJECTED" ? "বাতিল" : "যাচাই চলমান",
    note: r.adminRemarks || "আপনার আবেদনটি পর্যালোচনায় রয়েছে।", officer: "রৌমারী ফিল্ড অফিসার",
    approvedAmount: r.amountApproved ? `৳${r.amountApproved.toLocaleString("bn-BD")}` : "প্রক্রিয়াধীন",
  }))

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">স্বাগতম, {roleMeta.titleBn}</h1>
            <RoleBadge role={currentRole} size="sm" />
          </div>
          <p className="text-xs sm:text-sm text-stone-500">{roleMeta.descriptionBn}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => window.location.reload()} className="text-xs gap-1.5 h-8 border-stone-300 hover:border-red-300 hover:text-[#D62828] cursor-pointer">
            <RefreshCw className="size-3.5 text-stone-500" />
            <span>রিফ্রেশ</span>
          </Button>
          <a
            href="/donate"
            className="text-xs gap-1.5 h-8 px-3 inline-flex items-center rounded-md bg-[#D62828] hover:bg-[#B91C1C] text-white shadow-xs font-bold cursor-pointer"
          >
            <HeartHandshake className="size-3.5" />
            <span>অনুদান দিন</span>
          </a>
        </div>
      </div>

      {/* Tabs Dispatcher */}
      {activeTab === "overview" && currentRole === "COMMUNITY_MEMBER" && (
        <MemberOverviewTab onSelectTab={onSelectTab} currentUser={currentUser} myApps={displayMyApps} campaignsCount={displayCampaignsList.length} />
      )}
      {activeTab === "overview" && currentRole !== "COMMUNITY_MEMBER" && (
        <AdminOverviewTab adminDashboard={adminDashboard} userItems={userItems} volunteerItems={volunteerItems} campaignsCount={displayCampaignsList.length} appItems={appItems} onSelectTab={onSelectTab} />
      )}
      {(activeTab === "donations" || activeTab === "finance") && <DonationsTab />}
      {activeTab === "roumari" && <RoumariTab />}
      {activeTab === "medical" && <MedicalEducationTab type="medical" data={displayMedicalData} />}
      {activeTab === "education" && <MedicalEducationTab type="education" data={displayEducationData} />}
      {activeTab === "volunteers" && <VolunteersTab volunteersData={displayVolunteersData} />}
      {activeTab === "cases" && <CasesTab casesData={displayCasesData} />}
      {(activeTab === "content" || activeTab === "campaigns" || activeTab === "activities") && <CampaignsTab campaignsList={displayCampaignsList} />}
      {activeTab === "my-applications" && <MyApplicationsTab myApps={displayMyApps} />}
      {activeTab === "my-volunteer" && <MyVolunteerTab currentUser={currentUser} />}
      {(activeTab === "my-profile" || activeTab === "profile" || activeTab === "admin-profile") && (
        <ProfileTab currentUser={currentUser} currentRole={currentRole} updateProfileMutation={updateProfileMutation} refetchCurrentUser={refetchCurrentUser} />
      )}
      {activeTab === "notifications" && <NotificationsTab notifications={notificationItems} />}
      {activeTab === "pages" && <CmsPagesTab />}
      {activeTab === "news" && <CmsNewsTab />}
      {activeTab === "gallery" && <CmsGalleryTab />}
      {activeTab === "messages" && <CmsMessagesTab />}
      {activeTab === "activity-logs" && <CmsActivityLogsTab />}
      {(activeTab === "users" || activeTab === "superadmin") && <CmsUsersTab />}
      {activeTab === "settings" && <CmsSettingsTab />}
    </div>
  )
}
export default DashboardContent
