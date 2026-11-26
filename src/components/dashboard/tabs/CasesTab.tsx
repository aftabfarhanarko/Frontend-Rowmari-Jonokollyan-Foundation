"use client"

import React from "react"
import { DataTable, type TableColumn } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileSpreadsheet } from "lucide-react"

interface CasesTabProps {
  casesData: any[]
}

export function CasesTab({ casesData }: CasesTabProps) {
  const casesColumns: TableColumn<any>[] = [
    { header: "কেস নং", accessorKey: "id", className: "font-mono text-xs font-bold text-[#D62828]" },
    { header: "আবেদনকারী", accessorKey: "applicant", sortable: true, className: "font-semibold" },
    { header: "সহায়তার ধরন", accessorKey: "category", align: "center" },
    { header: "গ্রাম/এলাকা", accessorKey: "village" },
    { header: "দায়িত্বপ্রাপ্ত তদন্তকারী", accessorKey: "officer" },
    {
      header: "পরিদর্শন অবস্থা",
      accessorKey: "visitStatus",
      align: "center",
      cell: (r) => (
        <Badge
          variant="outline"
          className={
            r.visitStatus === "সম্পন্ন"
              ? "border-[#D62828] text-[#D62828] bg-red-50"
              : "border-stone-300 text-stone-700 bg-stone-50"
          }
        >
          {r.visitStatus}
        </Badge>
      ),
    },
    { header: "সুপারিশ", accessorKey: "recommendation", className: "text-xs font-medium" },
    {
      header: "অ্যাকশন",
      align: "center",
      cell: () => (
        <Button size="xs" variant="outline" className="h-7 text-xs border-stone-300 hover:border-red-300 hover:text-[#D62828] cursor-pointer">
          রিপোর্ট আপডেট
        </Button>
      ),
    },
  ]

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
      <DataTable
        title="মাঠপর্যায় তদন্ত (কেস ট্র্যাকিং ও পরিদর্শন)"
        description="আবেদনকারীদের বাড়ি গিয়ে যাচাইকরণ ও প্রতিবেদন জমা (API: /api/assistance & /api/track)"
        columns={casesColumns}
        data={casesData}
        searchable
        searchPlaceholder="কেস নং, আবেদনকারী বা গ্রাম..."
        pageSize={10}
        actions={
          <Button size="xs" variant="outline" className="gap-1 border-stone-300 hover:border-red-300 hover:text-[#D62828] cursor-pointer">
            <FileSpreadsheet className="size-3.5 text-[#D62828]" />
            <span>তদন্ত তালিকা প্রিন্ট</span>
          </Button>
        }
      />
    </div>
  )
}
export default CasesTab
