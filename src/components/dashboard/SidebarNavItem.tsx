"use client"

import React from "react"
import Link from "next/link"
import { NavItemConfig } from "@/config/dashboard-navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard, Droplet, Users, ClipboardCheck, Coins, Megaphone,
  FileText, HeartHandshake, Receipt, ShieldAlert, Settings,
  ChevronRight, Newspaper, Image as ImageIcon, Layers, Mail, UserCheck,
  LayoutTemplate, MapPin
} from "lucide-react"

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard, Droplet, Users, ClipboardCheck, Coins, Megaphone,
  FileText, HeartHandshake, Receipt, ShieldAlert, Settings, Newspaper,
  Image: ImageIcon, Layers, Mail, UserCheck, LayoutTemplate, MapPin,
}

interface SidebarNavItemProps {
  item: NavItemConfig
  isActive: boolean
  isCollapsed?: boolean
  onClick?: () => void
}

export function SidebarNavItem({
  item,
  isActive,
  isCollapsed = false,
  onClick,
}: SidebarNavItemProps) {
  const Icon = ICON_MAP[item.iconName] || LayoutDashboard

  return (
    <Link
      href={item.href}
      onClick={onClick}
      title={isCollapsed ? item.titleBn : undefined}
      className={cn(
        "group relative flex w-full items-center justify-between rounded-xl px-3 py-2 md:px-3.5 md:py-2.5 text-xs md:text-sm font-semibold transition-all text-left",
        isActive
          ? "bg-[#D62828] text-white shadow-xs font-bold"
          : "text-stone-600 hover:text-stone-900 hover:bg-stone-100/80",
        isCollapsed && "justify-center px-2 py-2.5"
      )}
    >
      <div className={cn("flex items-center gap-2.5 md:gap-3 min-w-0", isCollapsed && "gap-0")}>
        <Icon
          className={cn(
            "size-4 md:size-[18px] shrink-0 transition-colors",
            isActive ? "text-white" : "text-stone-400 group-hover:text-stone-700"
          )}
        />
        {!isCollapsed && <span className="truncate">{item.titleBn}</span>}
      </div>

      {!isCollapsed && (
        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          {item.badge !== undefined && (
            <span
              className={cn(
                "px-1.5 py-0.5 rounded-full text-[10px] md:text-[11px] font-bold",
                isActive
                  ? "bg-white/20 text-white"
                  : item.badgeVariant === "urgent"
                  ? "bg-red-100 text-red-700 animate-pulse"
                  : "bg-red-50 text-[#D62828] border border-red-200"
              )}
            >
              {item.badge}
            </span>
          )}
          {isActive && <ChevronRight className="size-3.5 opacity-70" />}
        </div>
      )}

      {isCollapsed && item.badge !== undefined && (
        <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-[#D62828] ring-2 ring-white" />
      )}
    </Link>
  )
}

export default SidebarNavItem
