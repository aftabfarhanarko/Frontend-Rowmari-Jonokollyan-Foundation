"use client"

import React from "react"
import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface CampaignsTabProps {
  campaignsList: any[]
}

export function CampaignsTab({ campaignsList }: CampaignsTabProps) {
  const columns = [
    { header: "আইডি", accessorKey: "id", className: "font-mono text-xs font-bold text-[#D62828]" },
    {
      header: "ক্যাম্পেইনের নাম",
      accessorKey: "titleBn",
      sortable: true,
      className: "font-semibold",
    },
    {
      header: "লক্ষ্যমাত্রা",
      accessorKey: "target",
      align: "right" as const,
      cell: (r: any) => <span>৳{r.target?.toLocaleString("bn-BD")}</span>,
    },
    {
      header: "সংগৃহীত অর্থ",
      accessorKey: "raised",
      align: "right" as const,
      cell: (r: any) => (
        <span className="font-bold text-[#D62828]">
          ৳{r.raised?.toLocaleString("bn-BD")}
        </span>
      ),
    },
    { header: "দাতা", accessorKey: "donors", align: "center" as const },
    { header: "শেষ সময়", accessorKey: "deadlineBn" },
    {
      header: "অবস্থা",
      accessorKey: "status",
      align: "center" as const,
      cell: (r: any) => (
        <Badge
          variant="outline"
          className={
            r.status === "চলমান"
              ? "border-[#D62828] text-[#D62828] bg-red-50"
              : "border-stone-300 text-stone-600 bg-stone-50"
          }
        >
          {r.status}
        </Badge>
      ),
    },
  ]

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
      <DataTable
        title="ক্যাম্পেইন ব্যবস্থাপনা"
        description="ওয়েবসাইটে চলমান ও সমাপ্ত ক্যাম্পেইনসমূহ (API: /api/campaigns)"
        columns={columns}
        data={campaignsList}
        searchable
        pageSize={5}
        actions={
          <Button size="xs" className="gap-1 bg-[#D62828] hover:bg-[#B91C1C] text-white cursor-pointer font-bold">
            <Plus className="size-3.5" />
            <span>নতুন ক্যাম্পেইন তৈরি</span>
          </Button>
        }
      />
    </div>
  )
}
export default CampaignsTab
