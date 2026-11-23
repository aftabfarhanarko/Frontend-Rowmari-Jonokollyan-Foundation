"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useAppStore } from "@/store/useAppStore"
import { ALL_ROLES, ROLE_METAS } from "@/config/dashboard-navigation"
import { UserRole } from "@/types"
import { ReusableSelect } from "@/components/ui/select"
import {
  Menu,
  Bell,
  Globe,
  LogOut,
  User,
} from "lucide-react"

interface DashboardNavbarProps {
  onToggleSidebar?: () => void
  activeTabTitle?: string
}

export function DashboardNavbar({
  onToggleSidebar,
  activeTabTitle,
}: DashboardNavbarProps) {
  const { currentRole, setCurrentRole } = useAppStore()

  const roleSelectItems = ALL_ROLES.map((r) => ({
    label: `${ROLE_METAS[r].titleBn} (${r})`,
    value: r,
  }))

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-stone-200/90 shadow-2xs">
      <div className="flex h-16 items-center justify-between px-3 sm:px-6">
        {/* Left: Mobile Menu Button + Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            aria-label="Toggle Navigation"
          >
            <Menu className="size-5" />
          </button>

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 shrink-0">
              <Image
                src="/logo.png"
                alt="RJF Logo"
                fill
                sizes="36px"
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-semibold text-stone-500 leading-tight">
                রৌমারী জনকল্যাণ ফাউন্ডেশন
              </div>
              <div className="text-sm font-bold text-[#0D5C35] leading-tight flex items-center gap-1.5">
                <span>অ্যাডমিন ড্যাশবোর্ড</span>
                {activeTabTitle && (
                  <span className="text-xs font-normal text-stone-400">
                    / {activeTabTitle}
                  </span>
                )}
              </div>
            </div>
          </Link>
        </div>

        {/* Right: Role Switcher + Website Link + Notification + User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Role Switcher Selector */}
          <div className="flex items-center gap-1.5">
            <span className="hidden lg:inline-block text-xs font-medium text-stone-500">
              সক্রিয় রোল:
            </span>
            <div className="w-44 sm:w-56">
              <ReusableSelect<UserRole>
                items={roleSelectItems}
                value={currentRole}
                onValueChange={(val) => {
                  if (val) setCurrentRole(val)
                }}
                size="sm"
                triggerClassName="h-8 text-xs font-medium bg-stone-50 border-stone-300"
              />
            </div>
          </div>

          {/* Quick link to Main Website */}
          <Link
            href="/"
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-600 hover:text-[#0D5C35] hover:bg-stone-100 transition-colors"
            title="মূল ওয়েবসাইটে যান"
          >
            <Globe className="size-3.5 text-stone-400" />
            <span>ওয়েবসাইট</span>
          </Link>

          {/* Notification Icon */}
          <Link
            href="/dashboard?tab=notifications"
            className="relative p-2 rounded-lg text-stone-600 hover:text-[#0D5C35] hover:bg-stone-100 transition-colors"
            title="নোটিফিকেশন"
          >
            <Bell className="size-4.5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E53935] ring-2 ring-white" />
          </Link>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
            <div className="w-8 h-8 rounded-full bg-[#0D5C35] text-white font-bold flex items-center justify-center text-xs shadow-xs select-none">
              স
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-bold text-stone-800 leading-tight">
                সৈয়দ আহমেদ
              </div>
              <div className="text-[10px] text-stone-500 leading-tight">
                {ROLE_METAS[currentRole]?.titleBn}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
export default DashboardNavbar
