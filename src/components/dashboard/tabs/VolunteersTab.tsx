"use client"

import React, { useState } from "react"
import Link from "next/link"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Plus, CheckCircle, XCircle, Loader2, Eye } from "lucide-react"
import { useAppStore } from "@/store/useAppStore"
import { useApproveVolunteerMutation } from "@/store/api/dashboardApi"
import { toast } from "sonner"

interface VolunteersTabProps {
  volunteersData: any[]
}

export function VolunteersTab({ volunteersData }: VolunteersTabProps) {
  const { setVolunteerModalOpen } = useAppStore()
  const [approveVolunteer, { isLoading: isApproving }] = useApproveVolunteerMutation()
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleToggleApprove = async (volunteerId: string, currentStatus: boolean) => {
    setLoadingId(volunteerId)
    try {
      await approveVolunteer({ id: volunteerId, isApproved: !currentStatus }).unwrap()
      toast.success(!currentStatus ? "স্বেচ্ছাসেবক সফলভাবে অনুমোদন করা হয়েছে!" : "স্বেচ্ছাসেবক অনুমোদন বাতিল করা হয়েছে")
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "অনুমোদন পরিবর্তন ব্যর্থ হয়েছে")
    } finally {
      setLoadingId(null)
    }
  }

  const columns = [
    {
      header: "আইডি",
      accessorKey: "id",
      className: "font-mono text-xs font-bold text-[#D62828]",
      cell: (r: any) => (
        <Link href={`/dashboard/volunteers/${r.rawId || r.id}`} className="hover:underline">
          {r.id}
        </Link>
      ),
    },
    {
      header: "নাম",
      accessorKey: "name",
      sortable: true,
      className: "font-semibold",
      cell: (r: any) => (
        <Link
          href={`/dashboard/volunteers/${r.rawId || r.id}`}
          className="hover:text-[#D62828] transition font-semibold"
        >
          {r.name}
        </Link>
      ),
    },
    { header: "দক্ষতা ও উইং", accessorKey: "wing" },
    { header: "ইউনিয়ন", accessorKey: "union" },
    { header: "মোবাইল নম্বর", accessorKey: "phone", className: "font-mono text-xs" },
    {
      header: "অবস্থা",
      accessorKey: "status",
      align: "center" as const,
      cell: (r: any) => (
        <span
          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${
            r.isApprovedRaw
              ? "bg-red-50 text-[#D62828] border-red-200"
              : "bg-stone-100 text-stone-600 border-stone-200"
          }`}
        >
          {r.status}
        </span>
      ),
    },
    {
      header: "অ্যাকশন",
      align: "center" as const,
      cell: (r: any) => (
        <div className="flex items-center justify-center gap-1.5">
          <Link
            href={`/dashboard/volunteers/${r.rawId || r.id}`}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold border border-stone-300 text-stone-700 hover:border-[#D62828] hover:text-[#D62828] transition"
          >
            <Eye className="size-3 text-[#D62828]" />
            <span>বিস্তারিত</span>
          </Link>
          <Button
            size="xs"
            variant="outline"
            disabled={loadingId === r.rawId}
            onClick={() => handleToggleApprove(r.rawId, r.isApprovedRaw)}
            className="h-7 text-xs border-stone-300 hover:border-red-300 hover:text-[#D62828] cursor-pointer"
          >
            {loadingId === r.rawId ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : r.isApprovedRaw ? (
              <span className="flex items-center gap-1 text-stone-600"><XCircle className="size-3.5" /> বাতিল</span>
            ) : (
              <span className="flex items-center gap-1 text-[#D62828] font-bold"><CheckCircle className="size-3.5" /> অনুমোদন</span>
            )}
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-2xs space-y-4">
      <DataTable
        title="স্বেচ্ছাসেবক তালিকা ও উইং বণ্টন"
        description="নিবন্ধিত স্বেচ্ছাসেবক ও দায়িত্ব বণ্টন (API: /api/volunteers)"
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
