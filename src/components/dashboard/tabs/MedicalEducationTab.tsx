"use client"

import React from "react"
import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useAppStore } from "@/store/useAppStore"

interface MedicalEducationTabProps {
  type: "medical" | "education"
  data: any[]
}

export function MedicalEducationTab({ type, data }: MedicalEducationTabProps) {
  const { setAssistanceModalOpen } = useAppStore()

  if (type === "medical") {
    const medicalColumns = [
      { header: "আইডি", accessorKey: "id", className: "font-mono text-xs font-bold text-[#D62828]" },
      { header: "রোগীর নাম", accessorKey: "patientName", sortable: true, className: "font-semibold" },
      { header: "রোগের বিবরণ", accessorKey: "disease" },
      { header: "হাসপাতাল", accessorKey: "hospital" },
      { header: "প্রয়োজনীয় অর্থ", accessorKey: "requiredAmount", align: "right" as const, cell: (r: any) => <span>৳{r.requiredAmount}</span> },
      { header: "অনুমোদিত", accessorKey: "approvedAmount", align: "right" as const, cell: (r: any) => <span className="font-bold text-[#D62828]">৳{r.approvedAmount}</span> },
      {
        header: "স্ট্যাটাস",
        accessorKey: "status",
        align: "center" as const,
        cell: (r: any) => (
          <Badge variant="outline" className={r.status === "অনুমোদিত" ? "border-[#D62828] text-[#D62828] bg-red-50" : "border-stone-300 text-stone-700 bg-stone-50"}>
            {r.status}
          </Badge>
        ),
      },
    ]

    return (
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
        <DataTable
          title="চিকিৎসা সহায়তা আবেদনসমূহ"
          description="অসহায় ও দরিদ্র রোগীদের চিকিৎসার জন্য তহবিল বিতরণ তালিকা (API: /api/assistance)"
          columns={medicalColumns}
          data={data}
          searchable
          searchPlaceholder="আবেদনকারী বা রোগ দিয়ে খুঁজুন..."
          pageSize={10}
          actions={
            <Button size="xs" onClick={() => setAssistanceModalOpen(true)} className="gap-1 bg-[#D62828] hover:bg-[#B91C1C] text-white cursor-pointer font-bold">
              <Plus className="size-3.5" />
              <span>নতুন আবেদনপত্র</span>
            </Button>
          }
        />
      </div>
    )
  }

  const educationColumns = [
    { header: "আইডি", accessorKey: "id", className: "font-mono text-xs font-bold text-[#D62828]" },
    { header: "শিক্ষার্থীর নাম", accessorKey: "studentName", sortable: true, className: "font-semibold" },
    { header: "শিক্ষা প্রতিষ্ঠান", accessorKey: "institute" },
    { header: "শ্রেণি", accessorKey: "grade" },
    { header: "সহায়তার ধরণ", accessorKey: "supportType" },
    { header: "বরাদ্দকৃত অর্থ", accessorKey: "amount", align: "right" as const, cell: (r: any) => <span className="font-bold text-[#D62828]">৳{r.amount}</span> },
    {
      header: "স্ট্যাটাস",
      accessorKey: "status",
      align: "center" as const,
      cell: (r: any) => (
        <Badge variant="outline" className={r.status === "অনুমোদিত" ? "border-[#D62828] text-[#D62828] bg-red-50" : "border-stone-300 text-stone-700 bg-stone-50"}>
          {r.status}
        </Badge>
      ),
    },
  ]

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
      <DataTable
        title="শিক্ষা সহায়তা ও মেধা বৃত্তি"
        description="দরিদ্র ও মেধাবী শিক্ষার্থীদের উপবৃত্তি ও শিক্ষা সামগ্রী (API: /api/assistance)"
        columns={educationColumns}
        data={data}
        searchable
        searchPlaceholder="শিক্ষার্থীর নাম বা প্রতিষ্ঠান..."
        pageSize={10}
        actions={
          <Button size="xs" onClick={() => setAssistanceModalOpen(true)} className="gap-1 bg-[#D62828] hover:bg-[#B91C1C] text-white cursor-pointer font-bold">
            <Plus className="size-3.5" />
            <span>বৃত্তি আবেদন যোগ</span>
          </Button>
        }
      />
    </div>
  )
}
export default MedicalEducationTab
