"use client"

import React, { useState, useEffect, useMemo } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { useAppStore } from "@/store/useAppStore"
import { getNavItemsForRole, ROLE_METAS } from "@/config/dashboard-navigation"
import { RoleBadge } from "@/components/dashboard/RoleBadge"
import { SidebarNavItem } from "@/components/dashboard/SidebarNavItem"
import { cn } from "@/lib/utils"
import { Shield, X, PanelLeftClose, PanelLeftOpen } from "lucide-react"

interface SidebarProps {
  isOpenMobile?: boolean
  onCloseMobile?: () => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
  activeTab?: string
  onSelectTab?: (tabId: string) => void
}

export function Sidebar({
  isOpenMobile = false,
  onCloseMobile,
  isCollapsed = false,
  onToggleCollapse,
  activeTab,
  onSelectTab,
}: SidebarProps) {
  const pathname = usePathname() || "/dashboard"
  const searchParams = useSearchParams()
  const { currentRole } = useAppStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const effectiveRole = mounted ? currentRole : "COMMUNITY_MEMBER"
  const allowedNavItems = useMemo(() => getNavItemsForRole(effectiveRole), [effectiveRole])

  const categories = [
    { key: "core", title: "সার্বিক ড্যাশবোর্ড" },
    { key: "cms", title: "ওয়েবসাইট কন্টেন্ট (CMS)" },
    { key: "operations", title: "প্রজেক্ট ও ফিল্ড অপারেশন" },
    { key: "system", title: "প্রশাসন ও প্রোফাইল" },
    { key: "community", title: "ব্যক্তিগত সেবা ও আবেদন" },
  ] as const

  const checkIsActive = (itemHref: string, itemId: string) => {
    if (activeTab) return activeTab === itemId
    const tabParam = searchParams.get("tab")
    if (tabParam) return tabParam === itemId
    if (itemHref === "/dashboard") return pathname === "/dashboard"
    return pathname.startsWith(itemHref)
  }

  const renderNavGroup = (categoryKey: typeof categories[number]["key"], title: string) => {
    const items = allowedNavItems.filter((item) => item.category === categoryKey)
    if (items.length === 0) return null

    return (
      <div key={categoryKey} className="mb-4">
        {!isCollapsed && (
          <div className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400">
            {title}
          </div>
        )}
        <nav className="space-y-0.5">
          {items.map((item) => (
            <SidebarNavItem
              key={item.id}
              item={item}
              isActive={checkIsActive(item.href, item.id)}
              isCollapsed={isCollapsed}
              onClick={() => {
                onSelectTab?.(item.id)
                onCloseMobile?.()
              }}
            />
          ))}
        </nav>
      </div>
    )
  }

  const sidebarContent = (
    <div
      className={cn(
        "flex flex-col h-full bg-white border-r border-stone-200/90 select-none transition-all duration-300",
        isCollapsed ? "w-18" : "w-64"
      )}
    >
      {/* Top Header in Mobile */}
      <div className="flex md:hidden items-center justify-between p-4 border-b border-stone-200">
        <div className="text-sm font-bold text-[#D62828]">ড্যাশবোর্ড মেনু</div>
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
      {!isCollapsed ? (
        <div className="p-3 m-3 rounded-2xl bg-stone-50 border border-stone-200/80">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="size-3.5 text-[#D62828]" />
            <span className="text-[11px] font-bold text-stone-700">সিস্টেম রোল:</span>
          </div>
          <RoleBadge role={effectiveRole} size="sm" />
          <p className="text-[10px] text-stone-500 mt-1.5 leading-snug">
            {ROLE_METAS[effectiveRole]?.descriptionBn || "সুপার অ্যাডমিন সেন্ট্রাল কন্ট্রোল প্যানেল"}
          </p>
        </div>
      ) : (
        <div className="p-2 my-2 flex justify-center">
          <div className="size-8 rounded-xl bg-red-50 flex items-center justify-center text-[#D62828]" title={ROLE_METAS[effectiveRole]?.titleBn}>
            <Shield className="size-4" />
          </div>
        </div>
      )}

      {/* Scrollable Nav Items */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-3 py-2 scrollbar-thin">
        {categories.map((cat) => renderNavGroup(cat.key, cat.title))}
      </div>

      {/* Footer / Desktop Collapse Toggle */}
      <div className="p-2 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between text-[10px] text-stone-400">
        {!isCollapsed && <span className="truncate px-1">রৌমারী জনকল্যাণ ফাউন্ডেশন</span>}
        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="hidden md:flex p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors mx-auto cursor-pointer"
            title={isCollapsed ? "সাইডবার বড় করুন" : "সাইডবার ছোট করুন"}
          >
            {isCollapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
          </button>
        )}
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
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  )
}

export default Sidebar
