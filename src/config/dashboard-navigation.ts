import { UserRole, RoleMeta } from "@/types"

export interface NavItemConfig {
  id: string
  titleBn: string
  titleEn: string
  href: string
  iconName: string
  badge?: string | number
  badgeVariant?: "default" | "urgent" | "info" | "success"
  category: "core" | "operations" | "finance" | "community" | "admin"
  roles: UserRole[]
  descriptionBn?: string
}

export const ROLE_METAS: Record<UserRole, RoleMeta> = {
  SUPER_ADMIN: {
    role: "SUPER_ADMIN",
    titleBn: "সুপার অ্যাডমিন",
    titleEn: "Super Admin",
    descriptionBn: "ফাউন্ডেশনের সকল অপারেশন ও সিস্টেমের পূর্ণ নিয়ন্ত্রক",
    colorScheme: {
      bg: "bg-purple-100 text-purple-800",
      text: "text-purple-700",
      border: "border-purple-300",
    },
  },
  ADMIN: {
    role: "ADMIN",
    titleBn: "অ্যাডমিনিস্ট্রেটর",
    titleEn: "Administrator",
    descriptionBn: "দৈনন্দিন প্রশাসনিক কার্যক্রম ও অনুমোদন ব্যবস্থাপক",
    colorScheme: {
      bg: "bg-blue-100 text-blue-800",
      text: "text-blue-700",
      border: "border-blue-300",
    },
  },
  BLOOD_COORDINATOR: {
    role: "BLOOD_COORDINATOR",
    titleBn: "ব্লাড কো-অর্ডিনেটর",
    titleEn: "Blood Coordinator",
    descriptionBn: "জরুরি রক্তের অনুরোধ, রক্তদাতা নেটওয়ার্ক ও ব্লাড ব্যাংক যোগাযোগ",
    colorScheme: {
      bg: "bg-red-100 text-red-800",
      text: "text-red-700",
      border: "border-red-300",
    },
  },
  MEDICAL_COORDINATOR: {
    role: "MEDICAL_COORDINATOR",
    titleBn: "চিকিৎসা সমন্বয়ক",
    titleEn: "Medical Coordinator",
    descriptionBn: "অসহায় রোগীদের চিকিৎসা অনুদান ও হাসপাতাল সমন্বয়",
    colorScheme: {
      bg: "bg-emerald-100 text-emerald-800",
      text: "text-emerald-700",
      border: "border-emerald-300",
    },
  },
  EDUCATION_COORDINATOR: {
    role: "EDUCATION_COORDINATOR",
    titleBn: "শিক্ষা সমন্বয়ক",
    titleEn: "Education Coordinator",
    descriptionBn: "দরিদ্র শিক্ষার্থীদের বৃত্তি ও শিক্ষা উপকরণ বিতরণ",
    colorScheme: {
      bg: "bg-indigo-100 text-indigo-800",
      text: "text-indigo-700",
      border: "border-indigo-300",
    },
  },
  VOLUNTEER_MANAGER: {
    role: "VOLUNTEER_MANAGER",
    titleBn: "স্বেচ্ছাসেবক ব্যবস্থাপক",
    titleEn: "Volunteer Manager",
    descriptionBn: "স্বেচ্ছাসেবক নিবন্ধন, দায়িত্ব বণ্টন ও ইভেন্ট টিম পরিচালনা",
    colorScheme: {
      bg: "bg-teal-100 text-teal-800",
      text: "text-teal-700",
      border: "border-teal-300",
    },
  },
  VOLUNTEER_COORDINATOR: {
    role: "VOLUNTEER_COORDINATOR",
    titleBn: "স্বেচ্ছাসেবক সমন্বয়ক",
    titleEn: "Volunteer Coordinator",
    descriptionBn: "মাঠপর্যায়ে স্বেচ্ছাসেবী ক্যাম্প ও টিম সমন্বয়",
    colorScheme: {
      bg: "bg-cyan-100 text-cyan-800",
      text: "text-cyan-700",
      border: "border-cyan-300",
    },
  },
  CONTENT_MANAGER: {
    role: "CONTENT_MANAGER",
    titleBn: "কন্টেন্ট ও প্রচার ব্যবস্থাপক",
    titleEn: "Content Manager",
    descriptionBn: "ক্যাম্পেইন প্রকাশ, ছবি গ্যালারি, নিউজ ও সোশ্যাল মিডিয়া কন্টেন্ট",
    colorScheme: {
      bg: "bg-amber-100 text-amber-800",
      text: "text-amber-700",
      border: "border-amber-300",
    },
  },
  FINANCE_MANAGER: {
    role: "FINANCE_MANAGER",
    titleBn: "অর্থ ও হিসাব ব্যবস্থাপক",
    titleEn: "Finance Manager",
    descriptionBn: "অনুদান প্রাপ্তি, ব্যাংক ও বিকাশ ট্রানজেকশন এবং অডিট রিপোর্ট",
    colorScheme: {
      bg: "bg-green-100 text-green-800",
      text: "text-green-700",
      border: "border-green-300",
    },
  },
  CASE_WORKER: {
    role: "CASE_WORKER",
    titleBn: "ফিল্ড কেস ওয়ার্কার",
    titleEn: "Field Case Worker",
    descriptionBn: "সরেজমিনে আবেদনকারী পরিবার যাচাই ও সাহায্য বিতরণ রিপোর্ট",
    colorScheme: {
      bg: "bg-orange-100 text-orange-800",
      text: "text-orange-700",
      border: "border-orange-300",
    },
  },
  COMMUNITY_MEMBER: {
    role: "COMMUNITY_MEMBER",
    titleBn: "সাধারণ সদস্য / আবেদনকারী",
    titleEn: "Community Member",
    descriptionBn: "নিজের আবেদন ট্র্যাকিং, রক্তের অনুরোধ ও অনুদানের হিস্ট্রি",
    colorScheme: {
      bg: "bg-stone-100 text-stone-800",
      text: "text-stone-700",
      border: "border-stone-300",
    },
  },
}

export const ALL_ROLES: UserRole[] = [
  "SUPER_ADMIN",
  "ADMIN",
  "BLOOD_COORDINATOR",
  "MEDICAL_COORDINATOR",
  "EDUCATION_COORDINATOR",
  "VOLUNTEER_MANAGER",
  "VOLUNTEER_COORDINATOR",
  "CONTENT_MANAGER",
  "FINANCE_MANAGER",
  "CASE_WORKER",
  "COMMUNITY_MEMBER",
]

export const DASHBOARD_NAV_ITEMS: NavItemConfig[] = [
  // 1. Overview (All Roles)
  {
    id: "overview",
    titleBn: "ড্যাশবোর্ড ওভারভিউ",
    titleEn: "Overview",
    href: "/dashboard",
    iconName: "LayoutDashboard",
    category: "core",
    roles: ALL_ROLES,
    descriptionBn: "সার্বিক পরিসংখ্যান ও জরুরি তথ্য",
  },

  // 2. Blood Network (Super Admin, Admin, Blood Coordinator)
  {
    id: "blood",
    titleBn: "রক্তদান সেবা",
    titleEn: "Blood Network",
    href: "/dashboard?tab=blood",
    iconName: "Droplet",
    badge: "৩ জরুরি",
    badgeVariant: "urgent",
    category: "operations",
    roles: ["SUPER_ADMIN", "ADMIN", "BLOOD_COORDINATOR"],
    descriptionBn: "রক্তের আবেদন ও রক্তদাতা নেটওয়ার্ক",
  },

  // 3. Medical Aid (Super Admin, Admin, Medical Coordinator, Case Worker)
  {
    id: "medical",
    titleBn: "চিকিৎসা সহায়তা",
    titleEn: "Medical Aid",
    href: "/dashboard?tab=medical",
    iconName: "HeartPulse",
    badge: 5,
    category: "operations",
    roles: ["SUPER_ADMIN", "ADMIN", "MEDICAL_COORDINATOR", "CASE_WORKER"],
    descriptionBn: "অসুস্থ রোগীদের চিকিৎসা ও ওষুধ বিতরণ",
  },

  // 4. Education Wing (Super Admin, Admin, Education Coordinator)
  {
    id: "education",
    titleBn: "শিক্ষা সহায়তা",
    titleEn: "Education Wing",
    href: "/dashboard?tab=education",
    iconName: "GraduationCap",
    category: "operations",
    roles: ["SUPER_ADMIN", "ADMIN", "EDUCATION_COORDINATOR"],
    descriptionBn: "শিক্ষা বৃত্তি ও উপকরণ বিতরণ",
  },

  // 5. Volunteer Management (Super Admin, Admin, Volunteer Manager)
  {
    id: "volunteers",
    titleBn: "স্বেচ্ছাসেবক উইং",
    titleEn: "Volunteers",
    href: "/dashboard?tab=volunteers",
    iconName: "Users",
    category: "operations",
    roles: ["SUPER_ADMIN", "ADMIN", "VOLUNTEER_MANAGER", "VOLUNTEER_COORDINATOR"],
    descriptionBn: "স্বেচ্ছাসেবক আবেদন ও দায়িত্ব বণ্টন",
  },

  // 6. Field Case Investigation (Super Admin, Admin, Case Worker, Medical Coordinator)
  {
    id: "cases",
    titleBn: "মাঠপর্যায় তদন্ত (কেস)",
    titleEn: "Field Cases",
    href: "/dashboard?tab=cases",
    iconName: "ClipboardCheck",
    badge: 8,
    category: "operations",
    roles: ["SUPER_ADMIN", "ADMIN", "CASE_WORKER", "MEDICAL_COORDINATOR"],
    descriptionBn: "সরেজমিনে আবেদনকারী যাচাইকরণ রিপোর্ট",
  },

  // 7. Finance & Accounts (Super Admin, Admin, Finance Manager)
  {
    id: "finance",
    titleBn: "অর্থ ও অনুদান হিসাব",
    titleEn: "Finance & Accounts",
    href: "/dashboard?tab=finance",
    iconName: "Coins",
    category: "finance",
    roles: ["SUPER_ADMIN", "ADMIN", "FINANCE_MANAGER"],
    descriptionBn: "অনুদান সংগ্রহ, ব্যাংক ট্রানজেকশন ও অডিট",
  },

  // 8. Campaigns & Content (Super Admin, Admin, Content Manager)
  {
    id: "content",
    titleBn: "ক্যাম্পেইন ও কন্টেন্ট",
    titleEn: "Content & Media",
    href: "/dashboard?tab=content",
    iconName: "Megaphone",
    category: "operations",
    roles: ["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER"],
    descriptionBn: "ক্যাম্পেইন প্রকাশ, ছবি ও খবর আপডেট",
  },

  // 9. Community Member Routes (Personal dashboard for regular members)
  {
    id: "my-applications",
    titleBn: "আমার সাহায্য আবেদন",
    titleEn: "My Applications",
    href: "/dashboard?tab=my-applications",
    iconName: "FileText",
    category: "community",
    roles: ["COMMUNITY_MEMBER"],
    descriptionBn: "আপনার জমা দেওয়া আবেদন ও বর্তমান অবস্থা",
  },
  {
    id: "my-blood-requests",
    titleBn: "আমার রক্তের অনুরোধ",
    titleEn: "My Blood Requests",
    href: "/dashboard?tab=my-blood-requests",
    iconName: "HeartHandshake",
    category: "community",
    roles: ["COMMUNITY_MEMBER"],
    descriptionBn: "আপনার পরিবারের জন্য চাওয়া রক্তের স্ট্যাটাস",
  },
  {
    id: "my-donations",
    titleBn: "আমার অনুদান ও রশিদ",
    titleEn: "My Donations",
    href: "/dashboard?tab=my-donations",
    iconName: "Receipt",
    category: "community",
    roles: ["COMMUNITY_MEMBER"],
    descriptionBn: "আপনার প্রদত্ত সকল অনুদানের ইতিহাস ও রশিদ",
  },

  // 10. User & Role Management (Super Admin, Admin)
  {
    id: "users",
    titleBn: "ইউজার ও রোল ব্যবস্থাপনা",
    titleEn: "Users & Roles",
    href: "/dashboard?tab=users",
    iconName: "ShieldAlert",
    category: "admin",
    roles: ["SUPER_ADMIN", "ADMIN"],
    descriptionBn: "কমিটি মেম্বারদের রোল বরাদ্দ ও পারমিশন",
  },

  // 11. System Notifications (All Roles)
  {
    id: "notifications",
    titleBn: "নোটিফিকেশন",
    titleEn: "Notifications",
    href: "/dashboard?tab=notifications",
    iconName: "Bell",
    badge: 3,
    badgeVariant: "urgent",
    category: "core",
    roles: ALL_ROLES,
    descriptionBn: "আপনার দায়িত্বে থাকা সাম্প্রতিক বার্তা",
  },

  // 12. System Settings (Super Admin Only)
  {
    id: "settings",
    titleBn: "সিস্টেম সেটিংস ও অডিট",
    titleEn: "System Settings",
    href: "/dashboard?tab=settings",
    iconName: "Settings",
    category: "admin",
    roles: ["SUPER_ADMIN"],
    descriptionBn: "সিস্টেম কনফিগারেশন ও অডিট ট্রেইল",
  },
]

/**
 * Filter navigation items dynamically based on the active role
 */
export function getNavItemsForRole(role: UserRole): NavItemConfig[] {
  return DASHBOARD_NAV_ITEMS.filter((item) => item.roles.includes(role))
}

/**
 * Check if a role has access to a specific nav item ID
 */
export function canAccessNavItem(role: UserRole, itemId: string): boolean {
  const item = DASHBOARD_NAV_ITEMS.find((it) => it.id === itemId)
  if (!item) return false
  return item.roles.includes(role)
}
