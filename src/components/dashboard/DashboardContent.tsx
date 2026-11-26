"use client"

import React, { useState } from "react"
import { useAppStore } from "@/store/useAppStore"
import { UserRole } from "@/types"
import { DataTable, type TableColumn } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RoleBadge } from "@/components/dashboard/RoleBadge"
import { ROLE_METAS } from "@/config/dashboard-navigation"
import {
  Users,
  Target,
  HeartPulse,
  Plus,
  FileSpreadsheet,
  RefreshCw,
  FileText,
  HeartHandshake,
  UserCheck,
  Loader2,
  ShieldCheck,
  Key,
  Image as ImageIcon,
  Newspaper,
  Mail,
  Camera,
  Upload,
  CheckCircle2,
} from "lucide-react"
import {
  useGetExecutiveDashboardQuery,
  useGetAdminApplicationsQuery,
  useUpdateApplicationStatusMutation,
  useGetAdminDonationsQuery,
  useGetAdminVolunteersQuery,
  useApproveVolunteerMutation,
  useGetAdminUsersQuery,
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
  useGetAccessControlRolesQuery,
  useGetAuditLogsQuery,
  useGetAdminNotificationsQuery,
  useGetMyApplicationsQuery,
  useGetMyDonationsQuery,
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
import { uploadToImgbb, validateImageFile } from "@/lib/utils/imgbb"
import { toast } from "sonner"

interface DashboardContentProps {
  activeTab: string
  onSelectTab?: (tab: string) => void
}

export function DashboardContent({ activeTab, onSelectTab }: DashboardContentProps) {
  const {
    currentRole,
    setAssistanceModalOpen,
    setDonationModalOpen,
    setVolunteerModalOpen,
  } = useAppStore()
  const roleMeta = ROLE_METAS[currentRole] || ROLE_METAS.COMMUNITY_MEMBER
  const { data: currentUser, refetch: refetchCurrentUser } = useGetCurrentUserQuery()
  const [updateProfileMutation] = useUpdateProfileMutation()
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)
  const avatarInputRef = React.useRef<HTMLInputElement>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const handleAvatarFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validation = validateImageFile(file, 10)
    if (!validation.valid) {
      toast.error(validation.error || "অকার্যকর ছবি ফাইল")
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setAvatarPreview(objectUrl)
    setIsUploadingAvatar(true)

    try {
      toast.info("প্রোফাইল ছবি ImgBB ক্লাউডে আপলোড হচ্ছে...", { duration: 3000 })
      const res = await uploadToImgbb(file)
      if (res?.url) {
        await updateProfileMutation({ avatarUrl: res.url }).unwrap()
        toast.success("প্রোফাইল ছবি সফলভাবে আপলোড এবং ডাটাবেসে সেভ হয়েছে!")
        refetchCurrentUser?.()
      }
    } catch (err: any) {
      setAvatarPreview(null)
      toast.error(err?.message || "ছবি আপলোড ব্যর্থ হয়েছে। পুনরায় চেষ্টা করুন।")
    } finally {
      setIsUploadingAvatar(false)
    }
  }

  // --- Role helpers ---
  const isPrivileged = ["SUPER_ADMIN", "ADMIN", "FINANCE_MANAGER"].includes(currentRole)
  const isStaff =
    isPrivileged ||
    [
      "MEDICAL_COORDINATOR",
      "EDUCATION_COORDINATOR",
      "CASE_WORKER",
      "VOLUNTEER_MANAGER",
      "BLOOD_COORDINATOR",
    ].includes(currentRole)

  // --- Real Backend API Hooks (no mocks) ---
  const { data: execDashboard, isLoading: isDashboardLoading, refetch: refetchDashboard } =
    useGetExecutiveDashboardQuery(undefined, { skip: !isPrivileged })

  const { data: adminDashboard, isLoading: isAdminDashboardLoading, refetch: refetchAdminDashboard } =
    useGetAdminDashboardQuery(undefined, { skip: currentRole !== "SUPER_ADMIN" })

  const { data: adminAppsRes, isLoading: isAppsLoading, refetch: refetchApps } =
    useGetAdminApplicationsQuery(undefined, { skip: !isStaff })
  const appItems = Array.isArray(adminAppsRes) ? adminAppsRes : (adminAppsRes as any)?.items || []

  const { data: adminVolunteersRes, refetch: refetchVolunteers } = useGetAdminVolunteersQuery(
    undefined,
    { skip: !isStaff }
  )
  const volunteerItems = Array.isArray(adminVolunteersRes)
    ? adminVolunteersRes
    : (adminVolunteersRes as any)?.items || []

  const { data: adminDonationsRes } = useGetAdminDonationsQuery(undefined, { skip: !isStaff })
  const donationItems = Array.isArray(adminDonationsRes)
    ? adminDonationsRes
    : (adminDonationsRes as any)?.items || []

  const { data: liveCampaignsRes } = useGetCampaignsQuery()
  const liveCampaigns = liveCampaignsRes || []

  const { data: adminUsersRes, refetch: refetchUsers } = useGetAdminUsersQuery(undefined, {
    skip: !["SUPER_ADMIN", "ADMIN"].includes(currentRole),
  })
  const userItems = Array.isArray(adminUsersRes) ? adminUsersRes : (adminUsersRes as any)?.items || []

  const { data: accessRolesRes } = useGetAccessControlRolesQuery(undefined, {
    skip: currentRole !== "SUPER_ADMIN",
  })
  const accessRoles = accessRolesRes || []

  const { data: auditLogsRes, refetch: refetchAuditLogs } = useGetAuditLogsQuery(undefined, {
    skip: currentRole !== "SUPER_ADMIN",
  })
  const auditLogs = Array.isArray(auditLogsRes) ? auditLogsRes : (auditLogsRes as any)?.items || []

  const { data: adminNotificationsRes } = useGetAdminNotificationsQuery(undefined, {
    skip: !isPrivileged,
  })
  const notificationItems = Array.isArray(adminNotificationsRes)
    ? adminNotificationsRes
    : (adminNotificationsRes as any)?.items || []

  const { data: myAppsRes } = useGetMyApplicationsQuery(undefined, {
    skip: currentRole === "COMMUNITY_MEMBER" ? false : false, // always allow for members
  })
  const myAppItems = Array.isArray(myAppsRes) ? myAppsRes : (myAppsRes as any)?.items || []

  const { data: myDonationsRes } = useGetMyDonationsQuery(undefined, {
    skip: false,
  })
  const myDonationItems = Array.isArray(myDonationsRes)
    ? myDonationsRes
    : (myDonationsRes as any)?.items || []

  // Mutations
  const [approveVolunteerMutation] = useApproveVolunteerMutation()
  const [updateApplicationStatusMutation] = useUpdateApplicationStatusMutation()
  const [updateUserRoleMutation, { isLoading: isUpdatingRole }] = useUpdateUserRoleMutation()
  const [updateUserStatusMutation, { isLoading: isUpdatingStatus }] = useUpdateUserStatusMutation()

  const [selectedUserForEdit, setSelectedUserForEdit] = useState<any | null>(null)
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string>("ACTIVE")
  const [notifFilter, setNotifFilter] = useState<"all" | "unread" | "urgent">("all")

  const handleSaveUserRolesAndStatus = async () => {
    if (!selectedUserForEdit) return
    try {
      await updateUserRoleMutation({
        id: selectedUserForEdit.rawId,
        roles: selectedRoles,
      }).unwrap()

      await updateUserStatusMutation({
        id: selectedUserForEdit.rawId,
        status: selectedStatus as any,
      }).unwrap()

      toast.success(`'${selectedUserForEdit.name}' এর রোল ও স্ট্যাটাস সফলভাবে আপডেট করা হয়েছে।`)
      setSelectedUserForEdit(null)
      refetchUsers()
    } catch (err: any) {
      toast.error(err?.message || "ব্যবহারকারীর তথ্য আপডেট ব্যর্থ হয়েছে।")
    }
  }

  const handleApproveVolunteer = async (id: string, currentStatus: boolean) => {
    try {
      await approveVolunteerMutation({ id, isApproved: !currentStatus }).unwrap()
      toast.success(
        !currentStatus ? "স্বেচ্ছাসেবক সফলভাবে অনুমোদিত হয়েছে" : "স্বেচ্ছাসেবক স্ট্যাটাস পরিবর্তিত হয়েছে"
      )
      refetchVolunteers()
    } catch (err: any) {
      toast.error(err?.message || "অনুমোদন ব্যর্থ হয়েছে")
    }
  }

  // --- Pure API-derived display data (no mocks) ---
  const displayMedicalData = appItems
    .filter((a: any) => a.category === "MEDICAL")
    .map((r: any) => ({
      id: r.referenceCode || r.id?.slice(0, 8),
      applicant: r.applicantName,
      condition: r.description || "জরুরি চিকিৎসা সহায়তা",
      amountNeeded: Number(r.requestedAmount || 0),
      approvedAmount: Number(r.approvedAmount || 0),
      assignedOfficer: r.assignedTo?.fullName || "অপেক্ষমাণ",
      status:
        r.status === "APPROVED"
          ? "অনুমোদিত"
          : r.status === "REJECTED"
          ? "বাতিল"
          : "যাচাই সম্পন্ন",
      union: r.upazila || "রৌমারী সদর",
      date: new Date(r.createdAt || Date.now()).toLocaleDateString("bn-BD"),
      rawId: r.id,
    }))

  const displayEducationData = appItems
    .filter((a: any) => a.category === "EDUCATION")
    .map((r: any) => ({
      id: r.referenceCode || r.id?.slice(0, 8),
      studentName: r.applicantName,
      institute: r.address || "রৌমারী উচ্চ বিদ্যালয়",
      grade: "শ্রেণি সহায়তা",
      supportType: r.description || "উপবৃত্তি",
      amount: Number(r.requestedAmount || 0),
      status: r.status === "APPROVED" ? "অনুমোদিত" : "অপেক্ষমাণ",
      union: r.upazila || "রৌমারী",
      rawId: r.id,
    }))

  const displayVolunteersData = volunteerItems.map((v: any) => ({
    id: v.id?.slice(0, 8) || "VOL",
    name: v.fullName,
    wing: v.skills || "সাধারণ সহায়তা উইং",
    union: v.upazila || "রৌমারী",
    phone: v.phone,
    joinDate: new Date(v.createdAt || Date.now()).toLocaleDateString("bn-BD"),
    status: v.isApproved ? "সক্রিয়" : "অপেক্ষমাণ",
    rawId: v.id,
    isApproved: v.isApproved,
  }))

  const displayCasesData = appItems.map((r: any) => ({
    caseId: r.referenceCode || r.id?.slice(0, 8),
    applicationId: r.referenceCode || r.id?.slice(0, 8),
    applicant: r.applicantName,
    union: r.upazila || "রৌমারী সদর",
    village: r.address || "গ্রাম",
    category:
      r.category === "MEDICAL"
        ? "চিকিৎসা সহায়তা"
        : r.category === "EDUCATION"
        ? "শিক্ষা সহায়তা"
        : "সাধারণ সহায়তা",
    caseWorker: r.assignedTo?.fullName || "অপেক্ষমাণ",
    visitStatus:
      r.status === "APPROVED"
        ? "অনুমোদিত ও বিতরণযোগ্য"
        : r.status === "UNDER_REVIEW"
        ? "তদন্তাধীন"
        : "মাঠ পরিদর্শন সম্পন্ন",
    recommendation: r.approvedAmount
      ? `অনুমোদনের সুপারিশ (৳${Number(r.approvedAmount).toLocaleString("bn-BD")})`
      : "যাচাই সম্পন্ন",
    priority: "উচ্চ",
    rawId: r.id,
  }))

  const displayFinanceData = donationItems.map((d: any) => ({
    id: d.id?.slice(0, 8),
    receiptNo: d.receipt?.receiptNumber || `RJF-REC-${d.id?.slice(0, 6)}`,
    donor: d.isAnonymous ? "বেনামী শুভাকাঙ্ক্ষী" : d.donorName || "শুভাকাঙ্ক্ষী",
    campaign: d.campaign?.title || "সাধারণ তহবিল",
    amount: Number(d.amount),
    channel: d.paymentMethod,
    date: new Date(d.createdAt || Date.now()).toLocaleDateString("bn-BD"),
    status: "সফল",
  }))

  const displayCampaignsList = liveCampaigns.map((c: any) => ({
    id: c.id,
    titleBn: c.titleBn || c.titleEn,
    target: c.targetAmount,
    raised: c.raisedAmount,
    donors: c.donorsCount || 0,
    deadlineBn: c.deadlineBn || "চলমান",
    status: c.status === "ongoing" || c.status === "ONGOING" ? "চলমান" : "সম্পন্ন",
  }))

  const displayUsersData = userItems.map((u: any) => ({
    id: u.id?.slice(0, 8),
    name: u.fullName,
    contact: u.email || u.phone,
    status: u.status || (u.isActive ? "ACTIVE" : "SUSPENDED"),
    roles: u.roles?.map((r: any) => (typeof r === "object" ? r.name : r)) || [],
    role: ((u.roles?.[0] && typeof u.roles[0] === "object" ? u.roles[0].name : u.roles?.[0]) ||
      "COMMUNITY_MEMBER") as UserRole,
    rawId: u.id,
    createdAt: u.createdAt,
  }))

  const displayMyApps = myAppItems.map((a: any) => ({
    id: a.referenceCode || a.id?.slice(0, 8),
    categoryBn: a.category === "MEDICAL" ? "জরুরি চিকিৎসা সহায়তা" : "মানবিক সহায়তা",
    submittedDate: new Date(a.createdAt || Date.now()).toLocaleDateString("bn-BD"),
    status: (a.status || "").toLowerCase(),
    statusTitle:
      a.status === "APPROVED"
        ? "অনুমোদিত"
        : a.status === "REJECTED"
        ? "বাতিল"
        : "তদন্তাধীন",
    note: a.statusHistory?.at(-1)?.remarks || "আপনার আবেদনটি প্রক্রিয়াকরণ চলছে।",
    officer: a.assignedTo?.fullName || "মাঠ কর্মকর্তা",
    approvedAmount: a.approvedAmount
      ? `৳${Number(a.approvedAmount).toLocaleString("bn-BD")}`
      : "অপেক্ষমাণ",
  }))

  const displayMyDonations = myDonationItems.map((d: any) => ({
    receiptNo: d.receipt?.receiptNumber || `RJF-REC-${d.id?.slice(0, 6)}`,
    campaign: d.campaign?.title || "সাধারণ তহবিল",
    amount: Number(d.amount),
    paymentMethod: d.paymentMethod,
    date: new Date(d.createdAt || Date.now()).toLocaleDateString("bn-BD"),
    transactionId: d.transactionReference || "TRX-N/A",
  }))

  // Notifications from API
  const displayNotifications = notificationItems.map((n: any) => ({
    id: n.id,
    titleBn: n.titleBn || n.title || "নোটিফিকেশন",
    descBn: n.messageBn || n.message || n.body || "",
    timeBn: n.createdAt
      ? new Date(n.createdAt).toLocaleString("bn-BD")
      : "সম্প্রতি",
    type: n.type || n.priority || "info",
    isUnread: n.isRead === false || n.isUnread === true,
  }))

  // --- Table Column Definitions ---
  const medicalColumns: TableColumn<any>[] = [
    { header: "আবেদন আইডি", accessorKey: "id", sortable: true, className: "font-mono text-xs" },
    { header: "আবেদনকারী", accessorKey: "applicant", sortable: true, className: "font-semibold" },
    { header: "চিকিৎসা সংক্রান্ত সমস্যা", accessorKey: "condition" },
    { header: "ইউনিয়ন", accessorKey: "union" },
    {
      header: "প্রয়োজন",
      accessorKey: "amountNeeded",
      sortable: true,
      align: "right",
      cell: (r) => (
        <span className="font-semibold text-stone-800">
          ৳{r.amountNeeded.toLocaleString("bn-BD")}
        </span>
      ),
    },
    {
      header: "অনুমোদিত",
      accessorKey: "approvedAmount",
      align: "right",
      cell: (r) => (
        <span className="font-bold text-emerald-700">
          ৳{r.approvedAmount.toLocaleString("bn-BD")}
        </span>
      ),
    },
    { header: "দায়িত্বপ্রাপ্ত", accessorKey: "assignedOfficer" },
    {
      header: "অবস্থা",
      accessorKey: "status",
      align: "center",
      cell: (r) => (
        <Badge
          variant="outline"
          className={
            r.status === "অনুমোদিত"
              ? "border-emerald-500 text-emerald-700 bg-emerald-50"
              : r.status === "যাচাই সম্পন্ন"
              ? "border-blue-500 text-blue-700 bg-blue-50"
              : "border-amber-500 text-amber-700 bg-amber-50"
          }
        >
          {r.status}
        </Badge>
      ),
    },
  ]

  const casesColumns: TableColumn<any>[] = [
    {
      header: "কেস নং",
      accessorKey: "caseId",
      sortable: true,
      className: "font-mono text-xs font-bold",
    },
    {
      header: "আবেদন আইডি",
      accessorKey: "applicationId",
      className: "font-mono text-xs text-muted-foreground",
    },
    {
      header: "আবেদনকারী",
      accessorKey: "applicant",
      sortable: true,
      className: "font-semibold",
    },
    { header: "ইউনিয়ন ও গ্রাম", cell: (r) => <span>{r.union}, {r.village}</span> },
    { header: "ধরণ", accessorKey: "category" },
    { header: "তদন্তকারী কর্মকর্তা", accessorKey: "caseWorker" },
    {
      header: "তদন্ত অবস্থা",
      accessorKey: "visitStatus",
      align: "center",
      cell: (r) => (
        <Badge
          variant="outline"
          className={
            r.visitStatus.includes("অনুমোদিত")
              ? "border-emerald-500 text-emerald-700 bg-emerald-50"
              : "border-blue-500 text-blue-700 bg-blue-50"
          }
        >
          {r.visitStatus}
        </Badge>
      ),
    },
    { header: "সুপারিশ", accessorKey: "recommendation", className: "text-xs font-medium" },
    {
      header: "অ্যাকশন",
      align: "center",
      cell: () => (
        <Button size="xs" variant="outline" className="h-7 text-xs">
          রিপোর্ট আপডেট
        </Button>
      ),
    },
  ]

  const financeColumns: TableColumn<any>[] = [
    {
      header: "রশিদ নং",
      accessorKey: "receiptNo",
      className: "font-mono text-xs font-bold text-[#0D5C35]",
    },
    { header: "দাতার নাম", accessorKey: "donor", sortable: true, className: "font-semibold" },
    { header: "ক্যাম্পেইন", accessorKey: "campaign" },
    {
      header: "পরিমাণ",
      accessorKey: "amount",
      sortable: true,
      align: "right",
      cell: (r) => (
        <span className="font-bold text-emerald-700">
          ৳{r.amount.toLocaleString("bn-BD")}
        </span>
      ),
    },
    { header: "পদ্ধতি", accessorKey: "channel", align: "center" },
    { header: "তারিখ", accessorKey: "date", className: "text-xs text-muted-foreground" },
  ]

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              স্বাগতম, {roleMeta.titleBn}
            </h1>
            <RoleBadge role={currentRole} size="sm" />
          </div>
          <p className="text-xs sm:text-sm text-stone-500">{roleMeta.descriptionBn}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => window.location.reload()}
            className="text-xs gap-1.5 h-8 border-stone-300"
          >
            <RefreshCw className="size-3.5 text-stone-500" />
            <span>রিফ্রেশ</span>
          </Button>

          {["SUPER_ADMIN", "ADMIN", "MEDICAL_COORDINATOR", "EDUCATION_COORDINATOR"].includes(
            currentRole
          ) && (
            <Button
              size="sm"
              onClick={() => setAssistanceModalOpen(true)}
              className="text-xs gap-1.5 h-8 bg-[#0D5C35] hover:bg-[#094527] text-white shadow-xs"
            >
              <Plus className="size-3.5" />
              <span>নতুন আবেদন</span>
            </Button>
          )}

          {currentRole === "COMMUNITY_MEMBER" && (
            <Button
              size="sm"
              onClick={() => setAssistanceModalOpen(true)}
              className="text-xs gap-1.5 h-8 bg-[#0D5C35] hover:bg-[#094527] text-white shadow-xs"
            >
              <HeartHandshake className="size-3.5" />
              <span>সাহায্যের আবেদন করুন</span>
            </Button>
          )}
        </div>
      </div>

      {/* 2. Overview Tab: Community Member View */}
      {activeTab === "overview" && currentRole === "COMMUNITY_MEMBER" && (
        <div className="space-y-6">
          {/* Member Welcome Banner */}
          <div className="bg-gradient-to-br from-[#0D5C35] via-[#0b4d2c] to-[#07361e] text-white p-6 sm:p-7 rounded-2xl shadow-md relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-400/15 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-bold shadow-2xs">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>কমিউনিটি মেম্বার / সাধারণ নাগরিক</span>
                </span>
                <span className="text-xs text-emerald-200/80 font-mono">
                  আইডি: {currentUser?.id?.slice(0, 8) || "RJF-MBR"}
                </span>
              </div>

              <div className="flex items-center gap-3.5">
                {currentUser?.avatarUrl ? (
                  <img
                    src={currentUser.avatarUrl || undefined}
                    alt={currentUser?.fullName || "ব্যবহারকারী"}
                    className="w-14 h-14 rounded-full border-2 border-white/60 object-cover shadow-sm shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full border border-white/30 bg-white/10 flex items-center justify-center font-bold text-lg text-white shrink-0">
                    {currentUser?.fullName?.charAt(0) || "U"}
                  </div>
                )}
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    স্বাগতম, {currentUser?.fullName || "সম্মানিত সদস্য"}!
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-100/90 mt-0.5 max-w-2xl leading-relaxed">
                    রৌমারী জনকল্যাণ ফাউন্ডেশনের মেম্বার পোর্টালে আপনার সকল ব্যক্তিগত সেবা ও মানবিক
                    সহায়তা আবেদন এখান থেকেই এক ক্লিকে পর্যবেক্ষণ ও পরিচালনা করতে পারবেন।
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs text-emerald-100">
                <span className="bg-black/20 px-3 py-1 rounded-lg backdrop-blur-xs">
                  মোবাইল: <strong>{currentUser?.phone || "সংরক্ষিত"}</strong>
                </span>
                <span className="bg-black/20 px-3 py-1 rounded-lg backdrop-blur-xs">
                  ইমেইল: <strong>{currentUser?.email || "সংরক্ষিত"}</strong>
                </span>
                <span className="bg-black/20 px-3 py-1 rounded-lg backdrop-blur-xs">
                  শাখা: <strong>রৌমারী, কুড়িগ্রাম</strong>
                </span>
              </div>
            </div>
          </div>

          {/* 4 Quick Activity Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div
              onClick={() => onSelectTab?.("my-applications")}
              className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-stone-500 text-xs font-medium mb-2">
                <span>আমার সহায়তা আবেদন</span>
                <div className="p-2 rounded-xl bg-emerald-50 text-[#0D5C35] group-hover:bg-[#0D5C35] group-hover:text-white transition-colors">
                  <FileText className="size-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-stone-900">{displayMyApps.length} টি</div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                {
                  displayMyApps.filter(
                    (a: any) => a.status === "approved" || a.statusTitle === "অনুমোদিত"
                  ).length
                }{" "}
                টি অনুমোদিত
              </div>
            </div>

            <div
              onClick={() => onSelectTab?.("campaigns")}
              className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-stone-500 text-xs font-medium mb-2">
                <span>চলমান ক্যাম্পেইন</span>
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Target className="size-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-stone-900">
                {displayCampaignsList.length} টি
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-1">মাঠপর্যায়ে সক্রিয়</div>
            </div>

            <div
              onClick={() => onSelectTab?.("messages")}
              className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-stone-500 text-xs font-medium mb-2">
                <span>যোগাযোগ ও বার্তা</span>
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Mail className="size-4" />
                </div>
              </div>
              <div className="text-lg font-black text-stone-900">সরাসরি বার্তা</div>
              <div className="text-[11px] text-blue-700 font-semibold mt-1 flex items-center gap-1">
                <CheckCircle2 className="size-3" />
                <span>হেল্পলাইন ২৪/৭</span>
              </div>
            </div>

            <div
              onClick={() => setVolunteerModalOpen(true)}
              className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-stone-500 text-xs font-medium mb-2">
                <span>স্বেচ্ছাসেবক কার্যক্রম</span>
                <div className="p-2 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <Users className="size-4" />
                </div>
              </div>
              <div className="text-lg font-black text-stone-900">কমিউনিটি উইং</div>
              <div className="text-[11px] text-amber-700 font-semibold mt-1 flex items-center gap-1">
                <Plus className="size-3" />
                <span>অংশগ্রহণ করুন</span>
              </div>
            </div>
          </div>

          {/* Member Quick Action Buttons */}
          <div className="bg-stone-50/80 p-4 sm:p-5 rounded-2xl border border-stone-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-3">
              এক ক্লিকে আপনার প্রয়োজনীয় সেবা গ্রহণ করুন
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <Button
                onClick={() => setAssistanceModalOpen(true)}
                className="bg-[#0D5C35] hover:bg-[#094527] text-white text-xs py-2.5 h-auto justify-start gap-2 shadow-xs cursor-pointer"
              >
                <FileText className="size-4" />
                <span>সহায়তার নতুন আবেদন</span>
              </Button>

              <Button
                onClick={() => setVolunteerModalOpen(true)}
                variant="outline"
                className="border-stone-300 bg-white hover:bg-stone-100 text-stone-800 text-xs py-2.5 h-auto justify-start gap-2 shadow-xs cursor-pointer"
              >
                <Users className="size-4 text-stone-600" />
                <span>স্বেচ্ছাসেবক আবেদন</span>
              </Button>

              <Button
                onClick={() => onSelectTab?.("my-profile")}
                variant="outline"
                className="border-purple-200 bg-white hover:bg-purple-50 text-purple-800 text-xs py-2.5 h-auto justify-start gap-2 shadow-xs cursor-pointer"
              >
                <UserCheck className="size-4 text-purple-600" />
                <span>প্রোফাইল সেটিংস</span>
              </Button>
            </div>
          </div>

          {/* Recent Activities Preview */}
          <div className="grid grid-cols-1 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <FileText className="size-4 text-[#0D5C35]" />
                  <span>আমার সহায়তা আবেদনসমূহ</span>
                </h4>
                <button
                  onClick={() => onSelectTab?.("my-applications")}
                  className="text-xs font-semibold text-[#0D5C35] hover:underline cursor-pointer"
                >
                  সব দেখুন
                </button>
              </div>

              {displayMyApps.length === 0 ? (
                <p className="text-xs text-stone-400 py-3 text-center">এখনো কোনো আবেদন করা হয়নি</p>
              ) : (
                displayMyApps.slice(0, 5).map((app: any) => (
                  <div
                    key={app.id}
                    className="p-3 rounded-xl bg-stone-50 border border-stone-200/70 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-stone-800">{app.id}</span>
                      <Badge className="bg-emerald-600 text-white text-[10px]">
                        {app.statusTitle}
                      </Badge>
                    </div>
                    <div className="font-semibold text-stone-900">{app.categoryBn}</div>
                    <div className="text-stone-500 text-[11px]">{app.note}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. Overview Tab: Super Admin / Staff CMS Control Center */}
      {activeTab === "overview" && currentRole !== "COMMUNITY_MEMBER" && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs">
              <div className="flex items-center justify-between text-stone-500 text-xs font-medium mb-2">
                <span>মোট নিবন্ধিত ইউজার</span>
                <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                  <Users className="size-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-stone-900">
                {adminDashboard?.users?.total !== undefined
                  ? `${adminDashboard.users.total} জন`
                  : `${userItems.length} জন`}
              </div>
              <div className="text-[11px] text-purple-700 font-semibold mt-1">
                {adminDashboard?.users?.active !== undefined
                  ? `${adminDashboard.users.active} জন সক্রিয় সদস্য`
                  : "সকল সাধারণ সদস্য"}
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs">
              <div className="flex items-center justify-between text-stone-500 text-xs font-medium mb-2">
                <span>স্বেচ্ছাসেবক নেটওয়ার্ক</span>
                <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                  <Users className="size-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-stone-900">
                {volunteerItems.length} জন
              </div>
              <div className="text-[11px] text-amber-700 font-semibold mt-1">
                মাঠপর্যায়ে সক্রিয় টিম
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs">
              <div className="flex items-center justify-between text-stone-500 text-xs font-medium mb-2">
                <span>চলমান ক্যাম্পেইন</span>
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                  <Target className="size-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-stone-900">
                {adminDashboard?.operations?.totalCampaigns !== undefined
                  ? `${adminDashboard.operations.totalCampaigns} টি`
                  : `${displayCampaignsList.length} টি`}
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                মাঠপর্যায়ে সক্রিয়
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs">
              <div className="flex items-center justify-between text-stone-500 text-xs font-medium mb-2">
                <span>সহায়তার আবেদন</span>
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                  <HeartPulse className="size-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-stone-900">
                {adminDashboard?.operations?.totalApplications !== undefined
                  ? `${adminDashboard.operations.totalApplications} টি`
                  : `${appItems.length} টি`}
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                চিকিৎসা ও শিক্ষা সহায়তা
              </div>
            </div>
          </div>

          {/* Super Admin CMS Management Quick Access Hub */}
          <div className="bg-white p-5 rounded-3xl border border-stone-200/90 shadow-2xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-stone-100 pb-3 mb-4">
              <div>
                <h3 className="text-base font-extrabold text-stone-900">
                  পাবলিক ওয়েবসাইট CMS নিয়ন্ত্রণ কেন্দ্র (Content Management)
                </h3>
                <p className="text-xs text-stone-500">
                  ওয়েবসাইটের প্রতিটি পাবলিক পেজ, খবর, নোটিশ, গ্যালারি ও সেটিংস এক ক্লিকে নিয়ন্ত্রণ করুন
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                <ShieldCheck className="size-3.5 text-emerald-600" />
                একচ্ছত্র সুপার অ্যাডমিন নিয়ন্ত্রণ
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => onSelectTab?.("pages")}
                className="flex items-start gap-3 p-3.5 rounded-2xl border border-stone-200/80 bg-stone-50/50 hover:bg-emerald-50/50 hover:border-emerald-300 text-left transition-all group cursor-pointer"
              >
                <div className="p-2.5 rounded-xl bg-white border border-stone-200 text-[#0D5C35] group-hover:bg-[#0D5C35] group-hover:text-white transition-colors shadow-2xs">
                  <FileText className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 text-xs group-hover:text-[#0D5C35]">
                      পাবলিক পেজ ম্যানেজমেন্ট
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-200 text-stone-700">
                      {adminDashboard?.cms?.totalPages !== undefined
                        ? `${adminDashboard.cms.totalPages}টি`
                        : "CMS"}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                    হোম, আমাদের কথা, যোগাযোগ, পলিসি ইত্যাদির টেক্সট ও ব্যানার আপডেট
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onSelectTab?.("news")}
                className="flex items-start gap-3 p-3.5 rounded-2xl border border-stone-200/80 bg-stone-50/50 hover:bg-emerald-50/50 hover:border-emerald-300 text-left transition-all group cursor-pointer"
              >
                <div className="p-2.5 rounded-xl bg-white border border-stone-200 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-2xs">
                  <Newspaper className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 text-xs group-hover:text-blue-700">
                      নিউজ ও নোটিশ বোর্ড
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                      {adminDashboard?.cms?.totalNews !== undefined
                        ? `${adminDashboard.cms.totalNews}টি`
                        : "লাইভ"}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                    জরুরি বিজ্ঞপ্তি, প্রেস রিলিজ ও কার্যক্রমের সংবাদ প্রকাশনা
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onSelectTab?.("gallery")}
                className="flex items-start gap-3 p-3.5 rounded-2xl border border-stone-200/80 bg-stone-50/50 hover:bg-emerald-50/50 hover:border-emerald-300 text-left transition-all group cursor-pointer"
              >
                <div className="p-2.5 rounded-xl bg-white border border-stone-200 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors shadow-2xs">
                  <ImageIcon className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 text-xs group-hover:text-purple-700">
                      গ্যালারি ও মিডিয়া ফাইলস
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">
                      {adminDashboard?.cms?.totalGallery !== undefined
                        ? `${adminDashboard.cms.totalGallery}টি`
                        : "ছবি"}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                    অনুষ্ঠান ও ত্রাণের ফটো অ্যালবাম ও কন্টেন্ট মিডিয়া লিংক
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onSelectTab?.("messages")}
                className="flex items-start gap-3 p-3.5 rounded-2xl border border-stone-200/80 bg-stone-50/50 hover:bg-emerald-50/50 hover:border-emerald-300 text-left transition-all group cursor-pointer"
              >
                <div className="p-2.5 rounded-xl bg-white border border-stone-200 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors shadow-2xs">
                  <Mail className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 text-xs group-hover:text-teal-700">
                      যোগাযোগের বার্তা
                    </span>
                    {adminDashboard?.operations?.totalContactMessages ? (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-700 animate-pulse">
                        {adminDashboard.operations.totalContactMessages} বার্তা
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-200 text-stone-700">
                        ইনবক্স
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                    পাবলিক ওয়েবসাইট থেকে পাঠানো সরাসরি নাগরিক বার্তা
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onSelectTab?.("users")}
                className="flex items-start gap-3 p-3.5 rounded-2xl border border-stone-200/80 bg-stone-50/50 hover:bg-emerald-50/50 hover:border-emerald-300 text-left transition-all group cursor-pointer"
              >
                <div className="p-2.5 rounded-xl bg-white border border-stone-200 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-2xs">
                  <UserCheck className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 text-xs group-hover:text-indigo-700">
                      ইউজার ও অ্যাকাউন্ট
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800">
                      ব্যবহারকারী
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                    নিবন্ধিত সকল সদস্যের তালিকা, অনুসন্ধান ও এক্সেস স্ট্যাটাস
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onSelectTab?.("settings")}
                className="flex items-start gap-3 p-3.5 rounded-2xl border border-stone-200/80 bg-stone-50/50 hover:bg-emerald-50/50 hover:border-emerald-300 text-left transition-all group cursor-pointer"
              >
                <div className="p-2.5 rounded-xl bg-white border border-stone-200 text-stone-700 group-hover:bg-stone-800 group-hover:text-white transition-colors shadow-2xs">
                  <Key className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 text-xs group-hover:text-stone-900">
                      ওয়েবসাইট সেটিংস ও এসইও
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-200 text-stone-700">
                      কনফিগ
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                    হটলাইন, ইমার্জেন্সি ফোন, অফিস ঠিকানা ও গ্লোবাল মেটাট্যাগ
                  </p>
                </div>
              </button>
            </div>
          </div>
        </>
      )}

      {/* CMS Tabs */}
      {activeTab === "pages" && <CmsPagesTab />}
      {activeTab === "news" && <CmsNewsTab />}
      {activeTab === "gallery" && <CmsGalleryTab />}
      {activeTab === "messages" && <CmsMessagesTab />}
      {activeTab === "activity-logs" && <CmsActivityLogsTab />}

      {/* Medical Aid Tab */}
      {activeTab === "medical" && (
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
          <DataTable
            title="চিকিৎসা সহায়তা আবেদনসমূহ"
            description="অসহায় ও দরিদ্র রোগীদের চিকিৎসার জন্য তহবিল বিতরণ তালিকা (API: /api/assistance)"
            columns={medicalColumns}
            data={displayMedicalData}
            searchable
            searchPlaceholder="আবেদনকারী বা রোগ দিয়ে খুঁজুন..."
            pageSize={10}
            actions={
              <Button
                size="xs"
                onClick={() => setAssistanceModalOpen(true)}
                className="gap-1 bg-[#0D5C35] text-white"
              >
                <Plus className="size-3.5" />
                <span>নতুন আবেদনপত্র</span>
              </Button>
            }
          />
        </div>
      )}

      {/* Education Tab */}
      {activeTab === "education" && (
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
          <DataTable
            title="শিক্ষা সহায়তা ও মেধা বৃত্তি"
            description="দরিদ্র ও মেধাবী শিক্ষার্থীদের উপবৃত্তি ও শিক্ষা সামগ্রী (API: /api/assistance)"
            columns={[
              { header: "আইডি", accessorKey: "id", className: "font-mono text-xs" },
              {
                header: "শিক্ষার্থীর নাম",
                accessorKey: "studentName",
                sortable: true,
                className: "font-semibold",
              },
              { header: "শিক্ষা প্রতিষ্ঠান", accessorKey: "institute" },
              { header: "শ্রেণি", accessorKey: "grade" },
              { header: "সহায়তার ধরণ", accessorKey: "supportType" },
              {
                header: "বরাদ্দকৃত অর্থ",
                accessorKey: "amount",
                align: "right",
                cell: (r) => (
                  <span className="font-bold text-indigo-700">৳{r.amount}</span>
                ),
              },
              {
                header: "স্ট্যাটাস",
                accessorKey: "status",
                align: "center",
                cell: (r) => (
                  <Badge
                    variant="outline"
                    className="border-indigo-400 text-indigo-700 bg-indigo-50"
                  >
                    {r.status}
                  </Badge>
                ),
              },
            ]}
            data={displayEducationData}
            searchable
            searchPlaceholder="শিক্ষার্থীর নাম বা প্রতিষ্ঠান..."
            pageSize={10}
            actions={
              <Button
                size="xs"
                onClick={() => setAssistanceModalOpen(true)}
                className="gap-1 bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Plus className="size-3.5" />
                <span>বৃত্তি আবেদন যোগ</span>
              </Button>
            }
          />
        </div>
      )}

      {/* Volunteers Tab */}
      {activeTab === "volunteers" && (
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
          <DataTable
            title="স্বেচ্ছাসেবক তালিকা ও উইং বণ্টন"
            description="নিবন্ধিত স্বেচ্ছাসেবক ও দায়িত্ব বণ্টন (API: /api/volunteer)"
            columns={[
              { header: "আইডি", accessorKey: "id", className: "font-mono text-xs" },
              { header: "নাম", accessorKey: "name", sortable: true, className: "font-semibold" },
              { header: "উইং", accessorKey: "wing" },
              { header: "ইউনিয়ন", accessorKey: "union" },
              { header: "মোবাইল নম্বর", accessorKey: "phone", className: "font-mono text-xs" },
              {
                header: "অবস্থা",
                accessorKey: "status",
                align: "center",
                cell: (r) => (
                  <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                    {r.status}
                  </span>
                ),
              },
            ]}
            data={displayVolunteersData}
            searchable
            searchPlaceholder="নাম, উইং বা ইউনিয়ন..."
            pageSize={10}
            actions={
              <Button
                size="xs"
                onClick={() => setVolunteerModalOpen(true)}
                className="gap-1 bg-teal-600 hover:bg-teal-700 text-white"
              >
                <Plus className="size-3.5" />
                <span>নতুন স্বেচ্ছাসেবক যোগ</span>
              </Button>
            }
          />
        </div>
      )}

      {/* Field Cases Tab */}
      {activeTab === "cases" && (
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
          <DataTable
            title="মাঠপর্যায় তদন্ত (কেস ট্র্যাকিং ও পরিদর্শন)"
            description="আবেদনকারীদের বাড়ি গিয়ে যাচাইকরণ ও প্রতিবেদন জমা (API: /api/assistance & /api/track)"
            columns={casesColumns}
            data={displayCasesData}
            searchable
            searchPlaceholder="কেস নং, আবেদনকারী বা গ্রাম..."
            pageSize={10}
            actions={
              <Button size="xs" variant="outline" className="gap-1 border-stone-300">
                <FileSpreadsheet className="size-3.5 text-orange-600" />
                <span>তদন্ত তালিকা প্রিন্ট</span>
              </Button>
            }
          />
        </div>
      )}

      {/* Campaigns & Content Tab */}
      {(activeTab === "content" || activeTab === "campaigns" || activeTab === "activities") && (
        <div className="space-y-6">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
            <DataTable
              title="ক্যাম্পেইন ব্যবস্থাপনা"
              description="ওয়েবসাইটে চলমান ও সমাপ্ত ক্যাম্পেইনসমূহ (API: /api/campaigns)"
              columns={[
                { header: "আইডি", accessorKey: "id", className: "font-mono text-xs" },
                {
                  header: "ক্যাম্পেইনের নাম",
                  accessorKey: "titleBn",
                  sortable: true,
                  className: "font-semibold",
                },
                {
                  header: "লক্ষ্যমাত্রা",
                  accessorKey: "target",
                  align: "right",
                  cell: (r) => <span>৳{r.target?.toLocaleString("bn-BD")}</span>,
                },
                {
                  header: "সংগৃহীত অর্থ",
                  accessorKey: "raised",
                  align: "right",
                  cell: (r) => (
                    <span className="font-bold text-emerald-700">
                      ৳{r.raised?.toLocaleString("bn-BD")}
                    </span>
                  ),
                },
                { header: "দাতা", accessorKey: "donors", align: "center" },
                { header: "শেষ সময়", accessorKey: "deadlineBn" },
                {
                  header: "অবস্থা",
                  accessorKey: "status",
                  align: "center",
                  cell: (r) => (
                    <Badge
                      variant="outline"
                      className={
                        r.status === "চলমান"
                          ? "border-emerald-500 text-emerald-700 bg-emerald-50"
                          : "border-stone-400 text-stone-600"
                      }
                    >
                      {r.status}
                    </Badge>
                  ),
                },
              ]}
              data={displayCampaignsList}
              searchable
              pageSize={5}
              actions={
                <Button size="xs" className="gap-1 bg-amber-600 hover:bg-amber-700 text-white">
                  <Plus className="size-3.5" />
                  <span>নতুন ক্যাম্পেইন তৈরি</span>
                </Button>
              }
            />
          </div>
        </div>
      )}

      {/* Community Member: My Applications */}
      {activeTab === "my-applications" && (
        <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-stone-900">
                আমার সাহায্য আবেদন ও বর্তমান অবস্থা
              </h2>
              <p className="text-xs text-stone-500">
                আপনার জমা দেওয়া সকল মানবিক সহায়তা আবেদনের রিয়েলটাইম অগ্রগতি (API: /api/track/[id])
              </p>
            </div>
            <Button
              size="sm"
              onClick={() => setAssistanceModalOpen(true)}
              className="bg-[#0D5C35] text-white text-xs gap-1.5"
            >
              <Plus className="size-3.5" />
              <span>নতুন আবেদন করুন</span>
            </Button>
          </div>

          <div className="space-y-3">
            {displayMyApps.length === 0 ? (
              <p className="text-sm text-stone-400 text-center py-8">
                এখনো কোনো আবেদন জমা দেওয়া হয়নি।
              </p>
            ) : (
              displayMyApps.map((app: any) => (
                <div
                  key={app.id}
                  className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold bg-white px-2 py-0.5 rounded border border-stone-200 text-stone-800">
                        {app.id}
                      </span>
                      <span className="font-bold text-stone-900 text-sm">{app.categoryBn}</span>
                    </div>
                    <Badge className="bg-emerald-600 text-white">{app.statusTitle}</Badge>
                  </div>
                  <p className="text-xs text-stone-600 bg-white p-2.5 rounded-lg border border-stone-100">
                    <strong className="text-stone-800">সর্বশেষ আপডেট:</strong> {app.note}
                  </p>
                  <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                    <span>কর্মকর্তা: {app.officer}</span>
                    <span className="font-semibold text-emerald-700">
                      বরাদ্দ: {app.approvedAmount}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Community Member: Volunteer Profile */}
      {activeTab === "my-volunteer" && (
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/90 shadow-2xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
            <div>
              <h2 className="text-lg font-bold text-stone-900">স্বেচ্ছাসেবক প্রোফাইল ও কার্যক্রম</h2>
              <p className="text-xs text-stone-500">
                রৌমারী জনকল্যাণ ফাউন্ডেশনের মানবিক সেবা কার্যক্রমে আপনার সক্রিয় অংশগ্রহণ
              </p>
            </div>
            <Button
              size="sm"
              onClick={() => setVolunteerModalOpen(true)}
              className="bg-[#0D5C35] hover:bg-[#094527] text-white text-xs gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="size-3.5" />
              <span>স্বেচ্ছাসেবক নিবন্ধন / তথ্য আপডেট</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                <h3 className="font-bold text-emerald-950 text-sm">মাঠপর্যায়ের সেবায় অংশগ্রহণ</h3>
              </div>
              <p className="text-xs text-emerald-900/80 leading-relaxed font-normal">
                বন্যা ত্রাণ, শীতবস্ত্র বিতরণ, চক্ষু ও মেডিকেল ক্যাম্প এবং রক্তের প্রয়োজনে জরুরি
                সমন্বয়ের জন্য তরুণ ও যুবসমাজের স্বেচ্ছাশ্রমই আমাদের ফাউন্ডেশনের মূল চালিকাশক্তি।
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <h3 className="font-bold text-stone-900 text-sm">কার্যক্রম এলাকা ও ফিল্ড শাখা</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                রৌমারী সদর, দাঁতভাঙ্গা, যাদুরচর, বন্দবেড়, শৌলমারী ও ব্রহ্মপুত্রের নদীবেষ্টিত চরাঞ্চল।
              </p>
              <div className="text-xs text-stone-500">
                স্বেচ্ছাসেবক আইডি:{" "}
                <strong>
                  {currentUser?.id
                    ? `RJF-VOL-${currentUser.id.slice(0, 6).toUpperCase()}`
                    : "RJF-VOL-PENDING"}
                </strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Community Member: Profile & Settings */}
      {activeTab === "my-profile" && (
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/90 shadow-2xs space-y-5">
          <div className="pb-4 border-b border-stone-100">
            <h2 className="text-lg font-bold text-stone-900">আমার প্রোফাইল ও অ্যাকাউন্ট তথ্য</h2>
            <p className="text-xs text-stone-500">
              আপনার সংরক্ষিত যোগাযোগের তথ্য ও অ্যাকাউন্ট বিবরণী
            </p>
          </div>

          {/* Profile Picture Card */}
          <div className="p-5 rounded-2xl border border-stone-200 bg-stone-50/70 flex flex-col sm:flex-row items-center gap-5">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#0D5C35] bg-emerald-50 flex items-center justify-center shadow-sm">
                {avatarPreview || currentUser?.avatarUrl ? (
                  <img
                    src={avatarPreview || currentUser?.avatarUrl || undefined}
                    alt={currentUser?.fullName || "ব্যবহারকারী"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-black text-[#0D5C35]">
                    {currentUser?.fullName?.charAt(0) || "U"}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => avatarInputRef.current?.click()}
                disabled={isUploadingAvatar}
                className="absolute inset-0 rounded-full bg-black/50 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer disabled:cursor-not-allowed"
                title="প্রোফাইল ছবি পরিবর্তন করুন"
              >
                {isUploadingAvatar ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <>
                    <Camera className="size-5" />
                    <span className="text-[10px] mt-0.5">ছবি পরিবর্তন</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-1.5 text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="text-base font-bold text-stone-900">
                  {currentUser?.fullName || "সম্মানিত সদস্য"}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#0D5C35] font-bold text-[11px]">
                  {currentRole === "SUPER_ADMIN" ? "সুপার অ্যাডমিন" : "কমিউনিটি মেম্বার"}
                </span>
              </div>
              <p className="text-xs text-stone-500">
                ইমেজ বিবি (ImgBB) ক্লাউডের মাধ্যমে প্রোফাইল ছবি আপলোড করুন ও ডাটাবেসে সেভ রাখুন।
              </p>
              <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <input
                  type="file"
                  ref={avatarInputRef}
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  className="hidden"
                  onChange={handleAvatarFileSelect}
                />
                <Button
                  size="sm"
                  variant="outline"
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  disabled={isUploadingAvatar}
                  className="text-xs h-8 border-stone-300 gap-1.5"
                >
                  {isUploadingAvatar ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" />
                      <span>আপলোড ও সেভ হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="size-3.5 text-[#0D5C35]" />
                      <span>নতুন ছবি আপলোড</span>
                    </>
                  )}
                </Button>
                {currentUser?.avatarUrl && (
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="size-3" />
                    <span>ক্লাউডে সংরক্ষিত</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1">
              <span className="text-xs text-stone-400 font-medium">পুরো নাম</span>
              <div className="font-bold text-stone-900 text-sm">
                {currentUser?.fullName || "তথ্য সংরক্ষিত"}
              </div>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1">
              <span className="text-xs text-stone-400 font-medium">ইমেইল ঠিকানা</span>
              <div className="font-bold text-stone-900 text-sm">
                {currentUser?.email || "তথ্য সংরক্ষিত"}
              </div>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1">
              <span className="text-xs text-stone-400 font-medium">মোবাইল নম্বর</span>
              <div className="font-bold text-stone-900 text-sm">
                {currentUser?.phone || "তথ্য সংরক্ষিত"}
              </div>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1">
              <span className="text-xs text-stone-400 font-medium">বর্তমান পদমর্যাদা (Role)</span>
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#0D5C35] font-bold text-xs">
                  {currentRole === "SUPER_ADMIN"
                    ? "সুপার অ্যাডমিন"
                    : "কমিউনিটি মেম্বার / সাধারণ নাগরিক"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-stone-900">সিস্টেম নোটিফিকেশন</h2>
            <div className="flex items-center gap-1.5">
              {(["all", "unread", "urgent"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setNotifFilter(f)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    notifFilter === f
                      ? "bg-[#0D5C35] text-white"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {f === "all" ? "সব" : f === "unread" ? "অপঠিত" : "জরুরি"}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-stone-100">
            {displayNotifications
              .filter((n: any) => {
                if (notifFilter === "unread") return n.isUnread
                if (notifFilter === "urgent") return n.type === "urgent"
                return true
              })
              .map((item: any) => (
                <div
                  key={item.id}
                  className="py-3 flex items-start gap-3 cursor-pointer hover:bg-stone-50/80 px-2 rounded-xl transition-colors"
                >
                  <div className="pt-1.5 shrink-0 w-3">
                    {item.isUnread && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#E53935] animate-pulse" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-stone-900">{item.titleBn}</h3>
                    <p className="text-xs text-stone-500 mt-0.5">{item.descBn}</p>
                    <span className="text-[11px] text-stone-400 mt-1 inline-block">
                      {item.timeBn}
                    </span>
                  </div>
                </div>
              ))}

            {displayNotifications.length === 0 && (
              <p className="text-sm text-stone-400 text-center py-8">কোনো নোটিফিকেশন নেই</p>
            )}
          </div>
        </div>
      )}

      {/* User Management & Settings */}
      {(activeTab === "users" || activeTab === "superadmin") && <CmsUsersTab />}
      {activeTab === "settings" && <CmsSettingsTab />}
    </div>
  )
}

export default DashboardContent