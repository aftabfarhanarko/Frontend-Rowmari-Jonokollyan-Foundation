"use client"

import React from "react"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useAppStore } from "@/store/useAppStore"

interface VolunteersTabProps {
  volunteersData: any[]
}

export function VolunteersTab({ volunteersData }: VolunteersTabProps) {
  const { setVolunteerModalOpen } = useAppStore()

  const columns = [
    { header: "আইডি", accessorKey: "id", className: "font-mono text-xs font-bold text-[#D62828]" },
    { header: "নাম", accessorKey: "name", sortable: true, className: "font-semibold" },
    { header: "উইং", accessorKey: "wing" },
    { header: "ইউনিয়ন", accessorKey: "union" },
    { header: "মোবাইল নম্বর", accessorKey: "phone", className: "font-mono text-xs" },
    {
      header: "অবস্থা",
      accessorKey: "status",
      align: "center" as const,
      cell: (r: any) => (
        <span className="inline-block px-2.5 py-0.5 rounded-full bg-red-50 text-[#D62828] border border-red-200 text-xs font-bold">
          {r.status}
        </span>
      ),
    },
  ]

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
      <DataTable
        title="স্বেচ্ছাসেবক তালিকা ও উইং বণ্টন"
        description="নিবন্ধিত স্বেচ্ছাসেবক ও দায়িত্ব বণ্টন (API: /api/volunteer)"
        columns={columns}
        data={volunteersData}
        searchable
        searchPlaceholder="নাম, উইং বা ইউনিয়ন..."
        pageSize={10}
        actions={
          <Button
            size="xs"
            onClick={() => setVolunteerModalOpen(true)}
            className="gap-1 bg-[#D62828] hover:bg-[#B91C1C] text-white cursor-pointer font-bold"
          >
            <Plus className="size-3.5" />
            <span>নতুন স্বেচ্ছাসেবক যোগ</span>
          </Button>
        }
      />
    </div>
  )
}
export default VolunteersTab
