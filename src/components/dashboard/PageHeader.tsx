"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  badge?: string | React.ReactNode
  badgeVariant?: "default" | "urgent" | "info" | "success"
  actions?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

export function PageHeader({
  title,
  description,
  badge,
  badgeVariant = "default",
  actions,
  className,
  children,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-stone-200/90 bg-white p-5 shadow-2xs md:flex-row md:items-center",
        className
      )}
    >
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="h-5 w-1 rounded-full bg-[#D62828]" />
          <h1 className="text-xl font-black tracking-tight text-stone-900 sm:text-2xl">
            {title}
          </h1>
          {badge && (
            typeof badge === "string" ? (
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-xs font-bold",
                  badgeVariant === "urgent"
                    ? "bg-red-100 text-red-700 animate-pulse"
                    : badgeVariant === "success"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : badgeVariant === "info"
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "bg-red-50 text-[#D62828] border border-red-200"
                )}
              >
                {badge}
              </span>
            ) : (
              badge
            )
          )}
        </div>
        {description && (
          <p className="text-xs text-stone-500 sm:text-sm pl-3.5">
            {description}
          </p>
        )}
      </div>

      {(actions || children) && (
        <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0">
          {actions}
          {children}
        </div>
      )}
    </div>
  )
}

export default PageHeader
