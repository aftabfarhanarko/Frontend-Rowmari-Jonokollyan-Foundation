"use client"

import React, { useState } from "react"
import { useAppStore } from "@/store/useAppStore"
import { UserRole } from "@/types"
import { DataTable, type TableColumn } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RoleBadge } from "@/components/dashboard/RoleBadge"
import { ROLE_METAS, ALL_ROLES } from "@/config/dashboard-navigation"
import {
  Users,
  Droplet,
  HeartPulse,
  GraduationCap,
  Coins,
  ClipboardCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Eye,
  FileSpreadsheet,
  RefreshCw,
  Search,
  Megaphone,
  FileText,
  HeartHandshake,
  Receipt,
  Download,
  Calendar,
  Building,
  UserCheck,
  Send,
  ExternalLink,
  Loader2,
  ShieldAlert,
  ShieldCheck,
  Key,
  Lock,
  Activity,
  UserCog,
  Check,
  X,
  Image as ImageIcon,
  Newspaper,
  Mail,
} from "lucide-react"
import {
  useGetExecutiveDashboardQuery,
  useGetAdminApplicationsQuery,
  useUpdateApplicationStatusMutation,
  useAssignApplicationStaffMutation,
  useGetAdminDonationsQuery,
  useGetAdminExpensesQuery,
  useGetAdminVolunteersQuery,
  useApproveVolunteerMutation,
  useGetAdminUsersQuery,
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
  useGetAccessControlRolesQuery,
  useGetAccessControlPermissionsQuery,
  useGetAuditLogsQuery,
  useGetAdminNotificationsQuery,
  useGetMyApplicationsQuery,
  useGetMyDonationsQuery,
  useGetMyBloodRequestsQuery,
} from "@/store/api/dashboardApi"
import { useGetBloodRequestsQuery } from "@/store/api/bloodApi"
import { useGetCampaignsQuery } from "@/store/api/campaignsApi"
import { useGetAdminDashboardQuery } from "@/store/api/adminApi"
import { CmsPagesTab } from "@/components/dashboard/cms/CmsPagesTab"
import { CmsNewsTab } from "@/components/dashboard/cms/CmsNewsTab"
import { CmsGalleryTab } from "@/components/dashboard/cms/CmsGalleryTab"
import { CmsSettingsTab } from "@/components/dashboard/cms/CmsSettingsTab"
import { CmsUsersTab } from "@/components/dashboard/cms/CmsUsersTab"
import { CmsMessagesTab } from "@/components/dashboard/cms/CmsMessagesTab"
import { CmsActivityLogsTab } from "@/components/dashboard/cms/CmsActivityLogsTab"
import { toast } from "sonner"

interface DashboardContentProps {
  activeTab: string
  onSelectTab?: (tab: string) => void
}

export function DashboardContent({ activeTab, onSelectTab }: DashboardContentProps) {
  const {
    currentRole,
    setBloodRequestModalOpen,
    setBloodDonorModalOpen,
    setAssistanceModalOpen,
    setDonationModalOpen,
    setVolunteerModalOpen,
  } = useAppStore()
  const roleMeta = ROLE_METAS[currentRole] || ROLE_METAS.COMMUNITY_MEMBER

  // --- Real Backend API Hooks ---
  const isPrivileged = ["SUPER_ADMIN", "ADMIN", "FINANCE_MANAGER"].includes(currentRole)
  const isStaff = isPrivileged || ["MEDICAL_COORDINATOR", "EDUCATION_COORDINATOR", "CASE_WORKER", "VOLUNTEER_MANAGER", "BLOOD_COORDINATOR"].includes(currentRole)

  const { data: execDashboard, isLoading: isDashboardLoading, refetch: refetchDashboard } = useGetExecutiveDashboardQuery(undefined, {
    skip: !isPrivileged,
  })

  const { data: adminDashboard, isLoading: isAdminDashboardLoading, refetch: refetchAdminDashboard } = useGetAdminDashboardQuery(undefined, {
    skip: currentRole !== "SUPER_ADMIN",
  })

  const { data: bloodRequestsRes, isLoading: isBloodLoading, refetch: refetchBlood } = useGetBloodRequestsQuery()
  const bloodItems = Array.isArray(bloodRequestsRes) ? bloodRequestsRes : (bloodRequestsRes as any)?.items || []

  const { data: adminAppsRes, isLoading: isAppsLoading, refetch: refetchApps } = useGetAdminApplicationsQuery(undefined, {
    skip: !isStaff,
  })
  const appItems = Array.isArray(adminAppsRes) ? adminAppsRes : (adminAppsRes as any)?.items || []

  const { data: adminVolunteersRes, refetch: refetchVolunteers } = useGetAdminVolunteersQuery(undefined, {
    skip: !isStaff,
  })
  const volunteerItems = Array.isArray(adminVolunteersRes) ? adminVolunteersRes : (adminVolunteersRes as any)?.items || []

  const { data: adminDonationsRes } = useGetAdminDonationsQuery(undefined, {
    skip: !isStaff,
  })
  const donationItems = Array.isArray(adminDonationsRes) ? adminDonationsRes : (adminDonationsRes as any)?.items || []

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

  const [selectedUserForEdit, setSelectedUserForEdit] = useState<any | null>(null)
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string>("ACTIVE")

  const { data: myAppsRes } = useGetMyApplicationsQuery(undefined, {
    skip: currentRole === "COMMUNITY_MEMBER",
  })
  const myAppItems = Array.isArray(myAppsRes) ? myAppsRes : (myAppsRes as any)?.items || []

  const { data: myBloodRes } = useGetMyBloodRequestsQuery(undefined, {
    skip: currentRole === "COMMUNITY_MEMBER",
  })
  const myBloodItems = Array.isArray(myBloodRes) ? myBloodRes : (myBloodRes as any)?.items || []

  const { data: myDonationsRes } = useGetMyDonationsQuery(undefined, {
    skip: currentRole === "COMMUNITY_MEMBER",
  })
  const myDonationItems = Array.isArray(myDonationsRes) ? myDonationsRes : (myDonationsRes as any)?.items || []

  // Mutations
  const [approveVolunteerMutation] = useApproveVolunteerMutation()
  const [updateApplicationStatusMutation] = useUpdateApplicationStatusMutation()
  const [updateUserRoleMutation, { isLoading: isUpdatingRole }] = useUpdateUserRoleMutation()
  const [updateUserStatusMutation, { isLoading: isUpdatingStatus }] = useUpdateUserStatusMutation()

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
      toast.success(!currentStatus ? "স্বেচ্ছাসেবক সফলভাবে অনুমোদিত হয়েছে" : "স্বেচ্ছাসেবক স্ট্যাটাস পরিবর্তিত হয়েছে")
      refetchVolunteers()
    } catch (err: any) {
      toast.error(err?.message || "অনুমোদন ব্যর্থ হয়েছে")
    }
  }

  // --- 1. Blood Network Data (API: /api/blood/request & /api/blood/donor) ---
  const [bloodData] = useState([
    {
      id: "BLD-REQ-901",
      patient: "রাকিব হাসান",
      bloodGroup: "O+",
      bags: 2,
      hospital: "রৌমারী উপজেলা স্বাস্থ্য কমপ্লেক্স",
      phone: "01712-345678",
      urgency: "খুব জরুরি",
      status: "রক্তদাতা খোঁজা হচ্ছে",
      date: "আজ, সকাল ১০:১৫",
    },
    {
      id: "BLD-REQ-902",
      patient: "মোছাঃ সালেহা বেগম",
      bloodGroup: "B-",
      bags: 1,
      hospital: "কুড়িগ্রাম সদর হাসপাতাল",
      phone: "01823-456789",
      urgency: "জরুরি",
      status: "রক্তদাতা বরাদ্দ হয়েছে",
      date: "আজ, সকাল ০৮:৩০",
    },
    {
      id: "BLD-REQ-903",
      patient: "আরিফুল ইসলাম",
      bloodGroup: "A+",
      bags: 1,
      hospital: "রৌমারী মডেল ক্লিনিক",
      phone: "01934-567890",
      urgency: "সাধারণ",
      status: "সম্পন্ন",
      date: "গতকাল",
    },
    {
      id: "BLD-REQ-904",
      patient: "খাদিজা আক্তার",
      bloodGroup: "AB+",
      bags: 2,
      hospital: "রৌমারী মাতৃসদন",
      phone: "01755-123456",
      urgency: "খুব জরুরি",
      status: "অনুরোধ গৃহীত",
      date: "আজ, দুপুর ০১:০০",
    },
  ])

  // --- 2. Medical Aid Applications (API: /api/assistance) ---
  const [medicalData] = useState([
    {
      id: "RJF-2026-8492",
      applicant: "আব্দুল কুদ্দুস",
      condition: "হৃদরোগ চিকিৎসা ও বাইপাস সহায়তা",
      amountNeeded: 25000,
      approvedAmount: 15000,
      assignedOfficer: "তানভীর আহমেদ",
      status: "যাচাই সম্পন্ন",
      union: "রৌমারী সদর",
      date: "২২ নভেম্বর ২০২৪",
    },
    {
      id: "RJF-2026-8493",
      applicant: "মরিয়ম আক্তার",
      condition: "থ্যালাসেমিয়া রোগীর নিয়মিত রক্ত ও ইনজেকশন",
      amountNeeded: 10000,
      approvedAmount: 10000,
      assignedOfficer: "ডাঃ সুমাইয়া",
      status: "অনুমোদিত",
      union: "যাদুরচর",
      date: "২১ নভেম্বর ২০২৪",
    },
    {
      id: "RJF-2026-8494",
      applicant: "জহিরুল ইসলাম",
      condition: "বন্যাজনিত দুর্ঘটনায় ভাঙা পায়ের অস্ত্রোপচার",
      amountNeeded: 18000,
      approvedAmount: 0,
      assignedOfficer: "অপেক্ষমাণ",
      status: "তদন্তাধীন",
      union: "দাঁতভাঙ্গা",
      date: "২০ নভেম্বর ২০২৪",
    },
  ])

  // --- 3. Education Scholarships (API: /api/assistance - category: education) ---
  const [educationData] = useState([
    {
      id: "RJF-2026-301",
      studentName: "ফাতিমা তুজ জোহরা",
      institute: "রৌমারী মহিলা কলেজ",
      grade: "এইচএসসি ১ম বর্ষ",
      supportType: "মাসিক উপবৃত্তি ও বইপত্র",
      amount: 1500,
      status: "অনুমোদিত",
      union: "রৌমারী সদর",
    },
    {
      id: "RJF-2026-302",
      studentName: "মো: মেহেদী হাসান",
      institute: "যাদুরচর উচ্চ বিদ্যালয়",
      grade: "১০ম শ্রেণি",
      supportType: "পরীক্ষার ফি ও গাইড বই",
      amount: 2000,
      status: "অনুমোদিত",
      union: "যাদুরচর",
    },
    {
      id: "RJF-2026-303",
      studentName: "নূরে জান্নাত",
      institute: "শৌলমারী মাদ্রাসা",
      grade: "৮ম শ্রেণি",
      supportType: "পোশাক ও শিক্ষাসামগ্রী",
      amount: 1200,
      status: "অপেক্ষমাণ",
      union: "শৌলমারী",
    },
  ])

  // --- 4. Volunteers Data (API: /api/volunteer) ---
  const [volunteersData] = useState([
    {
      id: "VOL-101",
      name: "নাজমুল হক",
      wing: "ব্লাড ডোনেশন উইং",
      union: "রৌমারী সদর",
      phone: "01723-998877",
      joinDate: "জানুয়ারি ২০২৪",
      status: "সক্রিয়",
    },
    {
      id: "VOL-102",
      name: "তানিয়া সুলতানা",
      wing: "শিক্ষা ও প্রশিক্ষণ উইং",
      union: "যাদুরচর",
      phone: "01834-887766",
      joinDate: "মার্চ ২০২৪",
      status: "সক্রিয়",
    },
    {
      id: "VOL-103",
      name: "শামীম রেজা",
      wing: "দুর্যোগ ও ত্রাণ উইং",
      union: "দাঁতভাঙ্গা",
      phone: "01945-776655",
      joinDate: "আগস্ট ২০২৪",
      status: "অন ডিউটি",
    },
  ])

  // --- 5. Field Cases Data (API: /api/assistance & /api/track/[id]) ---
  const [casesData] = useState([
    {
      caseId: "CASE-081",
      applicationId: "RJF-2026-8494",
      applicant: "জহিরুল ইসলাম",
      union: "দাঁতভাঙ্গা",
      village: "চর গয়াপাড়া",
      category: "চিকিৎসা সহায়তা",
      caseWorker: "মো: সাইদুর রহমান",
      visitStatus: "মাঠ পরিদর্শন সম্পন্ন",
      recommendation: "অনুমোদনের সুপারিশ (৳১৫,০০০)",
      priority: "উচ্চ",
    },
    {
      caseId: "CASE-082",
      applicationId: "RJF-2026-8495",
      applicant: "আনোয়ারা বেগম",
      union: "বন্দবেড়",
      village: "কুটিরচর",
      category: "খাদ্য ও পুনর্বাসন",
      caseWorker: "হাসিবুল ইসলাম",
      visitStatus: "তদন্তাধীন",
      recommendation: "পরিবার যাচাই অপেক্ষমাণ",
      priority: "জরুরি",
    },
    {
      caseId: "CASE-083",
      applicationId: "RJF-2026-8492",
      applicant: "আব্দুল কুদ্দুস",
      union: "রৌমারী সদর",
      village: "মির্জাপাড়া",
      category: "চিকিৎসা সহায়তা",
      caseWorker: "তানভীর আহমেদ",
      visitStatus: "অনুমোদিত ও বিতরণযোগ্য",
      recommendation: "যাচাই সত্য, জরুরি চিকিৎসা প্রয়োজন",
      priority: "উচ্চ",
    },
  ])

  // --- 6. Finance Transactions (API: /api/donate) ---
  const [financeData] = useState([
    {
      id: "TRX-5501",
      receiptNo: "RJF-REC-78219",
      donor: "ইকবাল মাহমুদ",
      campaign: "শীতবস্ত্র বিতরণ ২০২৪",
      amount: 5000,
      channel: "bKash",
      date: "২৪ নভেম্বর ২০২৪",
      status: "সফল",
    },
    {
      id: "TRX-5502",
      receiptNo: "RJF-REC-78220",
      donor: "ড. শরিফুল হক (প্রবাসী)",
      campaign: "সাধারণ তহবিল",
      amount: 25000,
      channel: "Bank Transfer",
      date: "২৩ নভেম্বর ২০২৪",
      status: "সফল",
    },
    {
      id: "TRX-5503",
      receiptNo: "RJF-REC-78221",
      donor: "বেনামী শুভাকাঙ্ক্ষী",
      campaign: "জরুরি চিকিৎসা সহায়তা",
      amount: 2000,
      channel: "Nagad",
      date: "২২ নভেম্বর ২০২৪",
      status: "সফল",
    },
  ])

  // --- 7. Campaigns & Content (API: /api/campaigns & /api/news) ---
  const [campaignsList] = useState([
    {
      id: "cmp-winter-2024",
      titleBn: "শীতবস্ত্র বিতরণ ও কম্বল সহায়তা ২০২৪",
      target: 100000,
      raised: 75000,
      donors: 85,
      deadlineBn: "৩১ ডিসেম্বর ২০২৪",
      status: "চলমান",
    },
    {
      id: "cmp-medical-emergency",
      titleBn: "অসহায় রোগীর জরুরি চিকিৎসা তহবিল",
      target: 200000,
      raised: 145000,
      donors: 120,
      deadlineBn: "চলমান তহবিল",
      status: "চলমান",
    },
    {
      id: "cmp-education-aid",
      titleBn: "মেধাবী শিক্ষার্থী শিক্ষা উপকরণ ও উপবৃত্তি",
      target: 80000,
      raised: 80000,
      donors: 64,
      deadlineBn: "১৫ নভেম্বর ২০২৪",
      status: "সম্পন্ন",
    },
  ])

  // --- 8. Community Member's Personal Submissions ---
  const [myApplications] = useState([
    {
      id: "RJF-2026-8492",
      categoryBn: "জরুরি চিকিৎসা সহায়তা",
      submittedDate: "২২ নভেম্বর ২০২৪",
      status: "approved",
      statusTitle: "অনুমোদিত",
      note: "আপনার আবেদনটি অনুমোদিত হয়েছে। আগামী ২৪ ঘণ্টার মধ্যে সহায়তা প্রদান করা হবে।",
      officer: "তানভীর আহমেদ (মাঠ কর্মকর্তা)",
      approvedAmount: "৳১৫,০০০",
    },
    {
      id: "RJF-2026-9104",
      categoryBn: "শীতবস্ত্র ও জরুরি ত্রাণ",
      submittedDate: "১০ নভেম্বর ২০২৪",
      status: "completed",
      statusTitle: "সম্পন্ন",
      note: "সহায়তা সামগ্রী সফলভাবে হস্তান্তর করা হয়েছে।",
      officer: "মো: শফিকুল ইসলাম",
      approvedAmount: "২টি কম্বল ও শুকনো খাবার",
    },
  ])

  const [myBloodRequests] = useState([
    {
      id: "BLD-REQ-901",
      patient: "রাকিব হাসান (ভাই)",
      bloodGroup: "O+",
      bags: 2,
      hospital: "রৌমারী উপজেলা স্বাস্থ্য কমপ্লেক্স",
      status: "রক্তদাতা খোঁজা হচ্ছে",
      coordinator: "মাহমুদুল হাসান তারেক (01812-987654)",
      date: "আজ, সকাল ১০:১৫",
    },
  ])

  const [myDonations] = useState([
    {
      receiptNo: "RJF-REC-78219",
      campaign: "শীতবস্ত্র বিতরণ ২০২৪",
      amount: 5000,
      paymentMethod: "bKash",
      date: "২৪ নভেম্বর ২০২৪",
      transactionId: "BK9X8921KL",
    },
  ])

  // --- 9. Notifications Data ---
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      titleBn: "নতুন রক্তের অনুরোধ",
      descBn: "ও-পজিটিভ (O+) ২ ব্যাগ • রৌমারী উপজেলা স্বাস্থ্য কমপ্লেক্স",
      timeBn: "১০ মিনিট আগে",
      type: "urgent",
      isUnread: true,
    },
    {
      id: "2",
      titleBn: "আবেদন RJF-2026-8492 হালনাগাদ",
      descBn: "চিকিৎসা সহায়তা • যাচাইকারী কর্মকর্তা পরিদর্শন সম্পন্ন করেছেন",
      timeBn: "২৫ মিনিট আগে",
      type: "info",
      isUnread: true,
    },
    {
      id: "3",
      titleBn: "ক্যাম্পেইনের লক্ষ্যমাত্রা পূর্ণ",
      descBn: "শীতবস্ত্র বিতরণ ২০২৪ • ৫০,০০০ টাকা সফলভাবে সংগৃহীত হয়েছে",
      timeBn: "২ ঘণ্টা আগে",
      type: "success",
      isUnread: false,
    },
    {
      id: "4",
      titleBn: "SMS পাঠানো হয়েছে",
      descBn: "জরুরি রক্তের প্রয়োজনের প্রেক্ষিতে ১৫ জন রক্তদাতাকে বার্তা প্রেরিত",
      timeBn: "৫ ঘণ্টা আগে",
      type: "info",
      isUnread: false,
    },
  ])
  const [notifFilter, setNotifFilter] = useState<"all" | "unread" | "urgent">("all")

  // --- Dynamic Live Mappings from API ---
  const displayBloodData = bloodItems.length > 0
    ? bloodItems.map((r: any) => ({
        id: r.id?.slice(0, 8) || "BLD",
        patient: r.patientName,
        bloodGroup: r.bloodGroup,
        bags: r.unitsNeeded || 1,
        hospital: r.hospitalName,
        phone: r.contactPhone,
        urgency: r.urgency === "EMERGENCY" ? "খুব জরুরি" : "জরুরি",
        status: r.status === "OPEN" ? "রক্তদাতা খোঁজা হচ্ছে" : r.status === "MATCHED" ? "রক্তদাতা বরাদ্দ হয়েছে" : "সম্পন্ন",
        date: new Date(r.createdAt || Date.now()).toLocaleDateString("bn-BD"),
        rawId: r.id,
      }))
    : bloodData

  const displayMedicalData = appItems.filter((a: any) => a.category === "MEDICAL").length > 0
    ? appItems
        .filter((a: any) => a.category === "MEDICAL")
        .map((r: any) => ({
          id: r.referenceCode || r.id?.slice(0, 8),
          applicant: r.applicantName,
          condition: r.description || "জরুরি চিকিৎসা সহায়তা",
          amountNeeded: Number(r.requestedAmount || 0),
          approvedAmount: Number(r.approvedAmount || 0),
          assignedOfficer: r.assignedTo?.fullName || "অপেক্ষমাণ",
          status: r.status === "APPROVED" ? "অনুমোদিত" : r.status === "REJECTED" ? "বাতিল" : "যাচাই সম্পন্ন",
          union: r.upazila || "রৌমারী সদর",
          date: new Date(r.createdAt || Date.now()).toLocaleDateString("bn-BD"),
          rawId: r.id,
        }))
    : medicalData

  const displayEducationData = appItems.filter((a: any) => a.category === "EDUCATION").length > 0
    ? appItems
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
    : educationData

  const displayVolunteersData = volunteerItems.length > 0
    ? volunteerItems.map((v: any) => ({
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
    : volunteersData

  const displayCasesData = appItems.length > 0
    ? appItems.map((r: any) => ({
        caseId: r.referenceCode || r.id?.slice(0, 8),
        applicationId: r.referenceCode || r.id?.slice(0, 8),
        applicant: r.applicantName,
        union: r.upazila || "রৌমারী সদর",
        village: r.address || "গ্রাম",
        category: r.category === "MEDICAL" ? "চিকিৎসা সহায়তা" : r.category === "EDUCATION" ? "শিক্ষা সহায়তা" : "সাধারণ সহায়তা",
        caseWorker: r.assignedTo?.fullName || "অপেক্ষমাণ",
        visitStatus: r.status === "APPROVED" ? "অনুমোদিত ও বিতরণযোগ্য" : r.status === "UNDER_REVIEW" ? "তদন্তাধীন" : "মাঠ পরিদর্শন সম্পন্ন",
        recommendation: r.approvedAmount ? `অনুমোদনের সুপারিশ (৳${r.approvedAmount.toLocaleString("bn-BD")})` : "যাচাই সম্পন্ন",
        priority: "উচ্চ",
        rawId: r.id,
      }))
    : casesData

  const displayFinanceData = donationItems.length > 0
    ? donationItems.map((d: any) => ({
        id: d.id?.slice(0, 8),
        receiptNo: d.receipt?.receiptNumber || `RJF-REC-${d.id?.slice(0, 6)}`,
        donor: d.isAnonymous ? "বেনামী শুভাকাঙ্ক্ষী" : (d.donorName || "শুভাকাঙ্ক্ষী"),
        campaign: d.campaign?.title || "সাধারণ তহবিল",
        amount: Number(d.amount),
        channel: d.paymentMethod,
        date: new Date(d.createdAt || Date.now()).toLocaleDateString("bn-BD"),
        status: "সফল",
      }))
    : financeData

  const displayCampaignsList = liveCampaigns.length > 0
    ? liveCampaigns.map((c: any) => ({
        id: c.id,
        titleBn: c.titleBn || c.titleEn,
        target: c.targetAmount,
        raised: c.raisedAmount,
        donors: c.donorsCount || 0,
        deadlineBn: c.deadlineBn || "চলমান",
        status: c.status === "ongoing" ? "চলমান" : "সম্পন্ন",
      }))
    : campaignsList

  const displayUsersData = userItems.length > 0
    ? userItems.map((u: any) => ({
        id: u.id?.slice(0, 8),
        name: u.fullName,
        contact: u.email || u.phone,
        status: u.status || (u.isActive ? "ACTIVE" : "SUSPENDED"),
        roles: u.roles?.map((r: any) => (typeof r === "object" ? r.name : r)) || [],
        role: ((u.roles?.[0] && typeof u.roles[0] === "object" ? u.roles[0].name : u.roles?.[0]) || "COMMUNITY_MEMBER") as UserRole,
        rawId: u.id,
        createdAt: u.createdAt,
      }))
    : [
        {
          id: "USR-01",
          name: "প্রকৌশলী মো: রফিকুল ইসলাম",
          contact: "admin@rjf.org",
          status: "ACTIVE",
          roles: ["SUPER_ADMIN"],
          role: "SUPER_ADMIN" as UserRole,
          rawId: "usr-01",
          createdAt: new Date().toISOString(),
        },
        {
          id: "USR-02",
          name: "মো: শফিকুল ইসলাম সাজু",
          contact: "01713-223344",
          status: "ACTIVE",
          roles: ["ADMIN"],
          role: "ADMIN" as UserRole,
          rawId: "usr-02",
          createdAt: new Date().toISOString(),
        },
      ]

  const displayMyApps = myAppItems.length > 0
    ? myAppItems.map((a: any) => ({
        id: a.referenceCode || a.id?.slice(0, 8),
        categoryBn: a.category === "MEDICAL" ? "জরুরি চিকিৎসা সহায়তা" : "মানবিক সহায়তা",
        submittedDate: new Date(a.createdAt || Date.now()).toLocaleDateString("bn-BD"),
        status: a.status.toLowerCase(),
        statusTitle: a.status === "APPROVED" ? "অনুমোদিত" : a.status === "REJECTED" ? "বাতিল" : "তদন্তাধীন",
        note: a.statusHistory?.at(-1)?.remarks || "আপনার আবেদনটি প্রক্রিয়াকরণ চলছে।",
        officer: a.assignedTo?.fullName || "মাঠ কর্মকর্তা",
        approvedAmount: a.approvedAmount ? `৳${a.approvedAmount.toLocaleString("bn-BD")}` : "অপেক্ষমাণ",
      }))
    : myApplications

  const displayMyBlood = myBloodItems.length > 0
    ? myBloodItems.map((b: any) => ({
        id: b.id?.slice(0, 8),
        patient: b.patientName,
        bloodGroup: b.bloodGroup,
        bags: b.unitsNeeded,
        hospital: b.hospitalName,
        status: b.status === "OPEN" ? "রক্তদাতা খোঁজা হচ্ছে" : b.status === "MATCHED" ? "রক্তদাতা বরাদ্দ হয়েছে" : "সম্পন্ন",
        coordinator: b.contactPerson || "জরুরি সমন্বয়ক",
        date: new Date(b.createdAt || Date.now()).toLocaleDateString("bn-BD"),
      }))
    : myBloodRequests

  const displayMyDonations = myDonationItems.length > 0
    ? myDonationItems.map((d: any) => ({
        receiptNo: d.receipt?.receiptNumber || `RJF-REC-${d.id?.slice(0, 6)}`,
        campaign: d.campaign?.title || "সাধারণ তহবিল",
        amount: Number(d.amount),
        paymentMethod: d.paymentMethod,
        date: new Date(d.createdAt || Date.now()).toLocaleDateString("bn-BD"),
        transactionId: d.transactionReference || "TRX-N/A",
      }))
    : myDonations

  // --- Table Column Definitions ---
  const bloodColumns: TableColumn<any>[] = [
    { header: "আইডি", accessorKey: "id", sortable: true, className: "font-mono text-xs" },
    { header: "রোগীর নাম", accessorKey: "patient", sortable: true, className: "font-semibold" },
    {
      header: "রক্তের গ্রুপ",
      accessorKey: "bloodGroup",
      align: "center",
      cell: (r) => (
        <span className="inline-block px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 font-bold text-xs">
          {r.bloodGroup}
        </span>
      ),
    },
    { header: "ব্যাগ", accessorKey: "bags", align: "center" },
    { header: "হাসপাতাল", accessorKey: "hospital" },
    { header: "জরুরিতা", accessorKey: "urgency", align: "center", cell: (r) => (
      <Badge className={r.urgency === "খুব জরুরি" ? "bg-red-600 text-white" : "bg-amber-500 text-white"}>
        {r.urgency}
      </Badge>
    )},
    { header: "অবস্থা", accessorKey: "status", align: "center", cell: (r) => (
      <Badge variant="outline" className="border-stone-300 text-stone-700 bg-stone-50">
        {r.status}
      </Badge>
    )},
    {
      header: "অ্যাকশন",
      align: "center",
      cell: () => (
        <Button size="xs" variant="outline" className="h-7 text-xs gap-1">
          <Eye className="size-3" />
          <span>বিবরণ</span>
        </Button>
      ),
    },
  ]

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
      cell: (r) => <span className="font-semibold text-stone-800">৳{r.amountNeeded.toLocaleString("bn-BD")}</span>,
    },
    {
      header: "অনুমোদিত",
      accessorKey: "approvedAmount",
      align: "right",
      cell: (r) => (
        <span className="font-bold text-emerald-700">৳{r.approvedAmount.toLocaleString("bn-BD")}</span>
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
    { header: "কেস নং", accessorKey: "caseId", sortable: true, className: "font-mono text-xs font-bold" },
    { header: "আবেদন আইডি", accessorKey: "applicationId", className: "font-mono text-xs text-muted-foreground" },
    { header: "আবেদনকারী", accessorKey: "applicant", sortable: true, className: "font-semibold" },
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
    { header: "রশিদ নং", accessorKey: "receiptNo", className: "font-mono text-xs font-bold text-[#0D5C35]" },
    { header: "দাতার নাম", accessorKey: "donor", sortable: true, className: "font-semibold" },
    { header: "ক্যাম্পেইন", accessorKey: "campaign" },
    {
      header: "পরিমাণ",
      accessorKey: "amount",
      sortable: true,
      align: "right",
      cell: (r) => <span className="font-bold text-emerald-700">৳{r.amount.toLocaleString("bn-BD")}</span>,
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
          <p className="text-xs sm:text-sm text-stone-500">
            {roleMeta.descriptionBn}
          </p>
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

          {/* Role-based quick modal trigger buttons */}
          {["SUPER_ADMIN", "ADMIN", "BLOOD_COORDINATOR"].includes(currentRole) && (
            <Button
              size="sm"
              onClick={() => setBloodRequestModalOpen(true)}
              className="text-xs gap-1.5 h-8 bg-red-600 hover:bg-red-700 text-white shadow-xs"
            >
              <Droplet className="size-3.5" />
              <span>রক্তের আবেদন</span>
            </Button>
          )}

          {["SUPER_ADMIN", "ADMIN", "MEDICAL_COORDINATOR", "EDUCATION_COORDINATOR"].includes(currentRole) && (
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

      {/* 2. Overview Tab (Single Super Admin CMS Control Center) */}
      {activeTab === "overview" && (
        <>
          {/* Top Real-time Statistics */}
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
                  : `${userItems.length || 24} জন`}
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
                {volunteerItems.length ? `${volunteerItems.length} জন` : "১৩০+ জন"}
              </div>
              <div className="text-[11px] text-amber-700 font-semibold mt-1">
                মাঠপর্যায়ে সক্রিয় টিম
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs">
              <div className="flex items-center justify-between text-stone-500 text-xs font-medium mb-2">
                <span>জরুরি রক্তের আবেদন</span>
                <div className="p-2 rounded-xl bg-red-50 text-red-600">
                  <Droplet className="size-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-stone-900">
                {adminDashboard?.operations?.totalBloodRequests !== undefined
                  ? `${adminDashboard.operations.totalBloodRequests} টি`
                  : `${bloodItems.length || 4} টি`}
              </div>
              <div className="text-[11px] text-red-600 font-semibold mt-1">
                লাইভ নেটওয়ার্ক সক্রিয়
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
                  : `${appItems.length || 12} টি`}
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
                      {adminDashboard?.cms?.totalPages !== undefined ? `${adminDashboard.cms.totalPages}টি` : "CMS"}
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
                      {adminDashboard?.cms?.totalNews !== undefined ? `${adminDashboard.cms.totalNews}টি` : "লাইভ"}
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
                      {adminDashboard?.cms?.totalGallery !== undefined ? `${adminDashboard.cms.totalGallery}টি` : "ছবি"}
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

          {/* Live Blood Requests Table */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
            <DataTable
              title="জরুরি রক্তের অনুরোধসমূহ (লাইভ ফিড)"
              description="রৌমারী উপজেলা স্বাস্থ্য কমপ্লেক্স ও কুড়িগ্রাম সদর হাসপাতালের জরুরি তালিকা"
              columns={bloodColumns}
              data={displayBloodData}
              searchable
              searchPlaceholder="রোগীর নাম বা রক্তের গ্রুপ দিয়ে খুঁজুন..."
              pageSize={5}
            />
          </div>
        </>
      )}

      {/* 2.1 Public Pages CMS Tab */}
      {activeTab === "pages" && <CmsPagesTab />}

      {/* 2.2 News & Notices Tab */}
      {activeTab === "news" && <CmsNewsTab />}

      {/* 2.3 Gallery & Media Tab */}
      {activeTab === "gallery" && <CmsGalleryTab />}

      {/* 2.4 Contact Messages Tab */}
      {activeTab === "messages" && <CmsMessagesTab />}

      {/* 2.5 Activity & Audit Logs Tab */}
      {activeTab === "activity-logs" && <CmsActivityLogsTab />}

      {/* 3. Blood Network Tab (Role: BLOOD_COORDINATOR, ADMIN, SUPER_ADMIN) */}
      {activeTab === "blood" && (
        <div className="space-y-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
            <DataTable
              title="রক্তদান ব্যবস্থাপনা ও লাইভ রিকোয়েস্ট"
              description="জরুরি রক্তের আবেদন ও রক্তদাতাদের সমন্বয় (API: /api/blood/request)"
              columns={bloodColumns}
              data={displayBloodData}
              searchable
              searchPlaceholder="রোগী, হাসপাতাল বা রক্তের গ্রুপ..."
              pageSize={10}
              actions={
                <div className="flex items-center gap-2">
                  <Button
                    size="xs"
                    onClick={() => setBloodDonorModalOpen(true)}
                    variant="outline"
                    className="gap-1 border-stone-300 text-stone-700"
                  >
                    <UserCheck className="size-3.5" />
                    <span>রক্তদাতা নিবন্ধন</span>
                  </Button>
                  <Button
                    size="xs"
                    onClick={() => setBloodRequestModalOpen(true)}
                    className="gap-1 bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Plus className="size-3.5" />
                    <span>নতুন রক্তের চাহিদা</span>
                  </Button>
                </div>
              }
            />
          </div>
        </div>
      )}

      {/* 4. Medical Aid Tab (Role: MEDICAL_COORDINATOR, ADMIN, SUPER_ADMIN) */}
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

      {/* 5. Education Tab (Role: EDUCATION_COORDINATOR, ADMIN, SUPER_ADMIN) */}
      {activeTab === "education" && (
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
          <DataTable
            title="শিক্ষা সহায়তা ও মেধা বৃত্তি"
            description="দরিদ্র ও মেধাবী শিক্ষার্থীদের উপবৃত্তি ও শিক্ষা সামগ্রী (API: /api/assistance)"
            columns={[
              { header: "আইডি", accessorKey: "id", className: "font-mono text-xs" },
              { header: "শিক্ষার্থীর নাম", accessorKey: "studentName", sortable: true, className: "font-semibold" },
              { header: "শিক্ষা প্রতিষ্ঠান", accessorKey: "institute" },
              { header: "শ্রেণি", accessorKey: "grade" },
              { header: "সহায়তার ধরণ", accessorKey: "supportType" },
              {
                header: "বরাদ্দকৃত অর্থ",
                accessorKey: "amount",
                align: "right",
                cell: (r) => <span className="font-bold text-indigo-700">৳{r.amount}</span>,
              },
              {
                header: "স্ট্যাটাস",
                accessorKey: "status",
                align: "center",
                cell: (r) => (
                  <Badge variant="outline" className="border-indigo-400 text-indigo-700 bg-indigo-50">
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

      {/* 6. Volunteers Tab (Role: VOLUNTEER_MANAGER, ADMIN, SUPER_ADMIN) */}
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

      {/* 7. Field Cases Tab (Role: CASE_WORKER, MEDICAL_COORDINATOR, ADMIN, SUPER_ADMIN) */}
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



      {/* 9. Campaigns & Content Tab */}
      {(activeTab === "content" || activeTab === "campaigns" || activeTab === "activities") && (
        <div className="space-y-6">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
            <DataTable
              title="ক্যাম্পেইন ব্যবস্থাপনা"
              description="ওয়েবসাইটে চলমান ও সমাপ্ত ক্যাম্পেইনসমূহ (API: /api/campaigns)"
              columns={[
                { header: "আইডি", accessorKey: "id", className: "font-mono text-xs" },
                { header: "ক্যাম্পেইনের নাম", accessorKey: "titleBn", sortable: true, className: "font-semibold" },
                {
                  header: "লক্ষ্যমাত্রা",
                  accessorKey: "target",
                  align: "right",
                  cell: (r) => <span>৳{r.target.toLocaleString("bn-BD")}</span>,
                },
                {
                  header: "সংগৃহীত অর্থ",
                  accessorKey: "raised",
                  align: "right",
                  cell: (r) => (
                    <span className="font-bold text-emerald-700">৳{r.raised.toLocaleString("bn-BD")}</span>
                  ),
                },
                { header: "দাতা", accessorKey: "donors", align: "center" },
                { header: "শেষ সময়", accessorKey: "deadlineBn" },
                {
                  header: "অবস্থা",
                  accessorKey: "status",
                  align: "center",
                  cell: (r) => (
                    <Badge variant="outline" className={r.status === "চলমান" ? "border-emerald-500 text-emerald-700 bg-emerald-50" : "border-stone-400 text-stone-600"}>
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

      {/* 10. Community Member: My Applications (Role: COMMUNITY_MEMBER) */}
      {activeTab === "my-applications" && (
        <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-stone-900">আমার সাহায্য আবেদন ও বর্তমান অবস্থা</h2>
              <p className="text-xs text-stone-500">আপনার জমা দেওয়া সকল মানবিক সহায়তা আবেদনের রিয়েলটাইম অগ্রগতি (API: /api/track/[id])</p>
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
            {displayMyApps.map((app: any) => (
              <div key={app.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
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
                  <span className="font-semibold text-emerald-700">বরাদ্দ: {app.approvedAmount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 11. Community Member: My Blood Requests */}
      {activeTab === "my-blood-requests" && (
        <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-stone-900">আমার রক্তের অনুরোধসমূহ</h2>
              <p className="text-xs text-stone-500">আপনার পরিবারের জন্য চাওয়া রক্তের আপডেট ও সমন্বয়কারীর তথ্য</p>
            </div>
            <Button
              size="sm"
              onClick={() => setBloodRequestModalOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white text-xs gap-1.5"
            >
              <Droplet className="size-3.5" />
              <span>জরুরি রক্তের আবেদন</span>
            </Button>
          </div>

          <div className="space-y-3">
            {displayMyBlood.map((b: any) => (
              <div key={b.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold text-xs">
                      {b.bloodGroup}
                    </span>
                    <span className="font-bold text-stone-900 text-sm">{b.patient}</span>
                    <span className="text-xs text-stone-500">({b.bags} ব্যাগ)</span>
                  </div>
                  <Badge variant="outline" className="border-amber-400 text-amber-700 bg-amber-50">
                    {b.status}
                  </Badge>
                </div>
                <div className="text-xs text-stone-600">
                  <div><strong>হাসপাতাল:</strong> {b.hospital}</div>
                  <div><strong>দায়িত্বপ্রাপ্ত কো-অর্ডিনেটর:</strong> {b.coordinator}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}



      {/* 13. Notifications Tab */}
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
            {notifications
              .filter((n) => {
                if (notifFilter === "unread") return n.isUnread
                if (notifFilter === "urgent") return n.type === "urgent"
                return true
              })
              .map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setNotifications((prev) =>
                      prev.map((n) =>
                        n.id === item.id ? { ...n, isUnread: !n.isUnread } : n
                      )
                    )
                  }}
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
                    <span className="text-[11px] text-stone-400 mt-1 inline-block">{item.timeBn}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* 14. User Management Tab (Single Super Admin) */}
      {activeTab === "users" && <CmsUsersTab />}

      {/* 15. Website Settings & SEO Tab (Single Super Admin) */}
      {activeTab === "settings" && <CmsSettingsTab />}
    </div>
  )
}

export default DashboardContent
