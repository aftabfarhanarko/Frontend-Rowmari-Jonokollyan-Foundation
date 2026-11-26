import { UserRole, RoleMeta } from "@/types"

export interface NavItemConfig {
  id: string
  titleBn: string
  titleEn: string
  href: string
  iconName: string
  badge?: string | number
  badgeVariant?: "default" | "urgent" | "info" | "success"
  category: "core" | "cms" | "operations" | "finance" | "system" | "community"
  roles: UserRole[]
  descriptionBn?: string
}

export const ROLE_METAS: Record<string, RoleMeta> = {
  SUPER_ADMIN: {
    role: "SUPER_ADMIN" as UserRole,
    titleBn: "সুপার অ্যাডমিন (পূর্ণ নিয়ন্ত্রক)",
    titleEn: "Super Admin",
    descriptionBn: "ফাউন্ডেশনের সমগ্র ওয়েবসাইট, কন্টেন্ট CMS, ইউজার ও অপারেশনের একচ্ছত্র নিয়ন্ত্রক",
    colorScheme: {
      bg: "bg-red-50 text-red-800",
      text: "text-red-700",
      border: "border-red-200",
    },
  },
  COMMUNITY_MEMBER: {
    role: "COMMUNITY_MEMBER" as UserRole,
    titleBn: "সাধারণ সদস্য / নাগরিক",
    titleEn: "Community Member",
    descriptionBn: "ব্যক্তিগত আবেদন, সেবামূলক উদ্যোগ ও হিস্ট্রি",
    colorScheme: {
      bg: "bg-stone-100 text-stone-800",
      text: "text-stone-700",
      border: "border-stone-300",
    },
  },
}

export const ALL_ROLES: UserRole[] = ["SUPER_ADMIN", "COMMUNITY_MEMBER"]

export const DASHBOARD_NAV_ITEMS: NavItemConfig[] = [
  // 1. Core Overview
  {
    id: "overview",
    titleBn: "ড্যাশবোর্ড ওভারভিউ",
    titleEn: "Overview",
    href: "/dashboard",
    iconName: "LayoutDashboard",
    category: "core",
    roles: ["SUPER_ADMIN", "COMMUNITY_MEMBER"],
    descriptionBn: "লাইভ পরিসংখ্যান ও ব্যক্তিগত সেবার সারসংক্ষেপ",
  },

  // 2. Public Website CMS Management
  {
    id: "pages",
    titleBn: "পাবলিক পেজ ম্যানেজমেন্ট (CMS)",
    titleEn: "Public Pages CMS",
    href: "/dashboard?tab=pages",
    iconName: "FileText",
    badge: "CMS",
    badgeVariant: "info",
    category: "cms",
    roles: ["SUPER_ADMIN"],
    descriptionBn: "হোম, আমাদের কথা, যোগাযোগ, পলিসি ইত্যাদি পেজ সম্পাদন",
  },
  {
    id: "news",
    titleBn: "নিউজ ও নোটিশ বোর্ড",
    titleEn: "News & Notices",
    href: "/dashboard?tab=news",
    iconName: "Newspaper",
    category: "cms",
    roles: ["SUPER_ADMIN"],
    descriptionBn: "সংবাদ, জরুরি নোটিশ ও ইভেন্ট প্রকাশনা",
  },
  {
    id: "gallery",
    titleBn: "গ্যালারি ও মিডিয়া ফাইলস",
    titleEn: "Gallery & Media",
    href: "/dashboard?tab=gallery",
    iconName: "Image",
    category: "cms",
    roles: ["SUPER_ADMIN"],
    descriptionBn: "ছবি ও ডকুমেন্ট মিডিয়া লাইব্রেরি",
  },

  // 3. Projects & Campaigns
  {
    id: "campaigns",
    titleBn: "ক্যাম্পেইন ও ফান্ডরেইজিং",
    titleEn: "Campaigns",
    href: "/dashboard?tab=campaigns",
    iconName: "Megaphone",
    category: "operations",
    roles: ["SUPER_ADMIN"],
    descriptionBn: "ত্রাণ ও সাহায্য তহবিলের ক্যাম্পেইন পরিচালনা",
  },
  {
    id: "activities",
    titleBn: "প্রজেক্ট ও কার্যক্রম",
    titleEn: "Projects & Activities",
    href: "/dashboard?tab=activities",
    iconName: "Layers",
    category: "operations",
    roles: ["SUPER_ADMIN"],
    descriptionBn: "ফাউন্ডেশনের বাস্তবায়িত উন্নয়নমূলক প্রজেক্ট",
  },

  // 4. Community Aid & Operations
  {
    id: "cases",
    titleBn: "সহায়তার আবেদনসমূহ",
    titleEn: "Help Applications",
    href: "/dashboard?tab=cases",
    iconName: "ClipboardCheck",
    badge: "যাচাই",
    badgeVariant: "urgent",
    category: "operations",
    roles: ["SUPER_ADMIN"],
    descriptionBn: "চিকিৎসা ও সামাজিক সাহায্য আবেদন নিষ্পত্তি",
  },
  {
    id: "volunteers",
    titleBn: "স্বেচ্ছাসেবক ব্যবস্থাপনা",
    titleEn: "Volunteers",
    href: "/dashboard?tab=volunteers",
    iconName: "Users",
    category: "operations",
    roles: ["SUPER_ADMIN"],
    descriptionBn: "স্বেচ্ছাসেবী নিবন্ধন ও টিম পরিচালনা",
  },

  {
    id: "messages",
    titleBn: "যোগাযোগের বার্তা",
    titleEn: "Contact Messages",
    href: "/dashboard?tab=messages",
    iconName: "Mail",
    category: "operations",
    roles: ["SUPER_ADMIN"],
    descriptionBn: "ওয়েবসাইট থেকে আসা পাবলিক অনুসন্ধান বার্তা",
  },

  // 5. System Administration & Security
  {
    id: "users",
    titleBn: "ইউজার ও সুপার অ্যাডমিন",
    titleEn: "User & Admin Management",
    href: "/dashboard?tab=users",
    iconName: "UserCheck",
    category: "system",
    roles: ["SUPER_ADMIN"],
    descriptionBn: "সুপার অ্যাডমিন ও ইউজার তৈরি, রোল ও স্ট্যাটাস নিয়ন্ত্রণ",
  },
  {
    id: "settings",
    titleBn: "ওয়েবসাইট সেটিংস ও এসইও",
    titleEn: "Website Settings & SEO",
    href: "/dashboard?tab=settings",
    iconName: "Settings",
    category: "system",
    roles: ["SUPER_ADMIN"],
    descriptionBn: "ওয়েবসাইটের ফোন, ঠিকানা, লোগো ও গ্লোবাল এসইও",
  },
  {
    id: "activity-logs",
    titleBn: "সিস্টেম অ্যাক্টিভিটি অডিট",
    titleEn: "Audit & Activity Logs",
    href: "/dashboard?tab=activity-logs",
    iconName: "ShieldAlert",
    category: "system",
    roles: ["SUPER_ADMIN"],
    descriptionBn: "সকল প্রশাসনিক ক্রিয়াকলাপের অপরিবর্তনীয় অডিট লগ",
  },
  {
    id: "my-profile",
    titleBn: "আমার অ্যাডমিন প্রোফাইল",
    titleEn: "Admin Profile",
    href: "/dashboard?tab=my-profile",
    iconName: "UserCheck",
    category: "system",
    roles: ["SUPER_ADMIN"],
    descriptionBn: "সুপার অ্যাডমিন ব্যক্তিগত তথ্য ও প্রোফাইল ছবি",
  },

  // 6. Community Member Portal (Personal records)
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
    id: "my-volunteer",
    titleBn: "স্বেচ্ছাসেবক প্রোফাইল",
    titleEn: "Volunteer Status",
    href: "/dashboard?tab=my-volunteer",
    iconName: "Users",
    category: "community",
    roles: ["COMMUNITY_MEMBER"],
    descriptionBn: "আপনার সেবামূলক স্বেচ্ছাসেবী অংশগ্রহণের তথ্য",
  },
  {
    id: "my-profile",
    titleBn: "আমার প্রোফাইল ও সেটিংস",
    titleEn: "My Profile",
    href: "/dashboard?tab=my-profile",
    iconName: "UserCheck",
    category: "community",
    roles: ["COMMUNITY_MEMBER"],
    descriptionBn: "ব্যক্তিগত তথ্য ও যোগাযোগের বিবরণ",
  },

]

export function getNavItemsForRole(role: UserRole): NavItemConfig[] {
  if (role === "SUPER_ADMIN") {
    // Super admin sees all administrative and CMS modules, plus their admin profile
    return DASHBOARD_NAV_ITEMS.filter((item) => item.category !== "community" && item.roles.includes("SUPER_ADMIN"))
  }
  return DASHBOARD_NAV_ITEMS.filter((item) => item.roles.includes(role))
}

export function canAccessNavItem(role: UserRole, itemId: string): boolean {
  if (role === "SUPER_ADMIN") return true
  const item = DASHBOARD_NAV_ITEMS.find((it) => it.id === itemId && it.roles.includes(role))
  if (!item) return false
  return item.roles.includes(role)
}
