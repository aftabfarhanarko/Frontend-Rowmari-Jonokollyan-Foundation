"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface DashboardModalProps {
  children: React.ReactNode
  onBackdropClick?: () => void
  className?: string
}

/**
 * Renders a modal confined to the dashboard `<main>` content area without
 * backdrop blur, keeping the sidebar and top navbar visible and unobstructed.
 */
export function DashboardModal({ children, onBackdropClick, className }: DashboardModalProps) {
  return (
    <div
      className={cn("absolute inset-0 z-30 bg-black/45", className)}
      onClick={(e) => {
        if (e.target === e.currentTarget && onBackdropClick) {
          onBackdropClick()
        }
      }}
    >
      <div
        className="sticky top-[4.125rem] md:top-[4.625rem] flex max-h-[calc(100vh-4.125rem)] md:max-h-[calc(100vh-4.625rem)] min-h-[calc(100vh-4.125rem)] md:min-h-[calc(100vh-4.625rem)] w-full justify-center overflow-y-auto p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget && onBackdropClick) {
            onBackdropClick()
          }
        }}
      >
        <div
          className="my-auto flex w-full justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget && onBackdropClick) {
              onBackdropClick()
            }
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
