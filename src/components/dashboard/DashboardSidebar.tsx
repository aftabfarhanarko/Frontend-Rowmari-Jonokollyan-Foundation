"use client"

import React from "react"
import { useAppStore } from "@/store/useAppStore"
import { getNavItemsForRole, ROLE_METAS } from "@/config/dashboard-navigation"
import { RoleBadge } from "@/components/dashboard/RoleBadge"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Droplet,
  Users,
  ClipboardCheck,
  Coins,
  Megaphone,
  FileText,
  HeartHandshake,
  Receipt,
  ShieldAlert,
  Settings,
  X,
  ChevronRight,
  Shield,
  Newspaper,
  Image as ImageIcon,
  Layers,
  Mail,
  UserCheck,
} from "lucide-react"

// Icon Resolver
const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard,
  Droplet,
  Users,
  ClipboardCheck,
  Coins,
  Megaphone,
  FileText,
  HeartHandshake,
  Receipt,
  ShieldAlert,
  Settings,
  Newspaper,
  Image: ImageIcon,
  Layers,
  Mail,
  UserCheck,
}

interface DashboardSidebarProps {
  activeTab: string
  onSelectTab: (tabId: string) => void
  isOpenMobile?: boolean
  onCloseMobile?: () => void
}

export function DashboardSidebar({
  activeTab,
  onSelectTab,
  isOpenMobile = false,
  onCloseMobile,
}: DashboardSidebarProps) {
  const { currentRole } = useAppStore()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const effectiveRole = mounted ? currentRole : "COMMUNITY_MEMBER"

  // Get allowed routes for this specific role
  const allowedNavItems = React.useMemo(() => {
    return getNavItemsForRole(effectiveRole)
  }, [effectiveRole])

  // Group items by category for Single Super Admin CMS
  const categories = [
    { key: "core", title: "সার্বিক ড্যাশবোর্ড" },
    { key: "cms", title: "ওয়েবসাইট কন্টেন্ট (CMS)" },
    { key: "operations", title: "প্রজেক্ট ও ফিল্ড অপারেশন" },
    { key: "system", title: "প্রশাসন ও প্রোফাইল" },
    { key: "community", title: "ব্যক্তিগত সেবা ও আবেদন" },
  ] as const

  const renderNavGroup = (categoryKey: typeof categories[number]["key"], title: string) => {
    const items = allowedNavItems.filter((item) => item.category === categoryKey)
    if (items.length === 0) return null

    return (
      <div key={categoryKey} className="mb-4">
        <div className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400">
          {title}
        </div>
        <nav className="space-y-0.5">
          {items.map((item) => {
            const Icon = ICON_MAP[item.iconName] || LayoutDashboard
            const isActive = activeTab === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectTab(item.id)
                  onCloseMobile?.()
                }}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer",
                  isActive
                    ? "bg-[#0D5C35] text-white shadow-xs font-bold"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-100/80"
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    className={cn(
                      "size-4 shrink-0 transition-colors",
                      isActive ? "text-white" : "text-stone-400"
                    )}
                  />
                  <span className="truncate">{item.titleBn}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  {item.badge !== undefined && (
                    <span
                      className={cn(
                        "px-1.5 py-0.5 rounded-full text-[10px] font-bold",
                        isActive
                          ? "bg-white/20 text-white"
                          : item.badgeVariant === "urgent"
                          ? "bg-red-100 text-red-700 animate-pulse"
                          : "bg-emerald-100 text-[#0D5C35]"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="size-3.5 opacity-70" />}
                </div>
              </button>
            )
          })}
        </nav>
      </div>
    )
  }

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-stone-200/90 w-64 select-none">
      {/* Top Header in Sidebar (Mobile close button) */}
      <div className="flex md:hidden items-center justify-between p-4 border-b border-stone-200">
        <div className="text-sm font-bold text-[#0D5C35]">ড্যাশবোর্ড মেনু</div>
        <button
          type="button"
          onClick={onCloseMobile}
          className="p-1 rounded-md text-stone-500 hover:bg-stone-100 cursor-pointer"
          aria-label="Close Sidebar"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* Role Summary Banner */}
      <div className="p-3 m-3 rounded-2xl bg-stone-50 border border-stone-200/80">
        <div className="flex items-center gap-2 mb-1">
          <Shield className="size-3.5 text-[#0D5C35]" />
          <span className="text-[11px] font-bold text-stone-700">অ্যাডমিন সিস্টেম:</span>
        </div>
        <RoleBadge role={effectiveRole} size="sm" />
        <p className="text-[10px] text-stone-500 mt-1.5 leading-snug">
          {ROLE_METAS[effectiveRole]?.descriptionBn || "সুপার অ্যাডমিন সেন্ট্রাল কন্ট্রোল প্যানেল"}
        </p>
      </div>

      {/* Scrollable Nav Items */}
      <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-thin">
        {categories.map((cat) => renderNavGroup(cat.key, cat.title))}
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:block shrink-0 sticky top-16 h-[calc(100vh-4rem)] z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative z-50 w-72 max-w-[80vw] h-full shadow-xl animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  )
}
export default DashboardSidebar
