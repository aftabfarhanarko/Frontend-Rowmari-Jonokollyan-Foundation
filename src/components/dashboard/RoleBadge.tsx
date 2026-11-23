"use client"

import React from "react"
import { UserRole } from "@/types"
import { ROLE_METAS } from "@/config/dashboard-navigation"
import { cn } from "@/lib/utils"
import { ShieldCheck } from "lucide-react"

interface RoleBadgeProps {
  role: UserRole
  showIcon?: boolean
  className?: string
  size?: "sm" | "default" | "lg"
}

export function RoleBadge({
  role,
  showIcon = true,
  className,
  size = "default",
}: RoleBadgeProps) {
  const meta = ROLE_METAS[role] || ROLE_METAS.COMMUNITY_MEMBER

  const sizeStyles = {
    sm: "text-[10px] px-1.5 py-0.5",
    default: "text-xs px-2.5 py-1",
    lg: "text-sm px-3 py-1.5 font-semibold",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium border transition-colors",
        meta.colorScheme.bg,
        meta.colorScheme.border,
        sizeStyles[size],
        className
      )}
      title={`${meta.titleEn} (${role})`}
    >
      {showIcon && <ShieldCheck className="size-3.5 shrink-0 opacity-80" />}
      <span>{meta.titleBn}</span>
    </span>
  )
}
export default RoleBadge
