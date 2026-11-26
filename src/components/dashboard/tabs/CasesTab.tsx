"use client"

import React, { useState } from "react"
import { DataTable, type TableColumn } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Loader2 } from "lucide-react"
import { useUpdateApplicationStatusMutation } from "@/store/api/dashboardApi"
import { toast } from "sonner"

interface CasesTabProps {
  casesData: any[]
}

export function CasesTab({ casesData }: CasesTabProps) {
  const [updateStatus, { isLoading: isUpdating }] = useUpdateApplicationStatusMutation()
  const [selectedCase, setSelectedCase] = useState<any | null>(null)
  const [newStatus, setNewStatus] = useState<string>("APPROVED")
  const [remarks, setRemarks] = useState("")
  const [approvedAmount, setApprovedAmount] = useState("")

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCase?.rawId) {
      toast.error("কেস আইডি পাওয়া যায়নি")
      return
    }
    try {
      await updateStatus({
        id: selectedCase.rawId,
        status: newStatus,
        remarks: remarks.trim() || undefined,
        approvedAmount: approvedAmount ? Number(approvedAmount) : undefined,
      }).unwrap()
      toast.success("আবেদনের স্ট্যাটাস ও তদন্ত রিপোর্ট সফলভাবে আপডেট হয়েছে!")
      setSelectedCase(null)
      setRemarks("")
      setApprovedAmount("")
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "স্ট্যাটাস আপডেট ব্যর্থ হয়েছে")
    }
  }

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
      cell: (r) => (
        <Button
          size="xs"
          variant="outline"
          onClick={() => {
            setSelectedCase(r)
            setNewStatus(r.visitStatus === "সম্পন্ন" ? "APPROVED" : "IN_REVIEW")
            setRemarks(r.recommendation || "")
          }}
          className="h-7 text-xs border-stone-300 hover:border-red-300 hover:text-[#D62828] cursor-pointer"
        >
          রিপোর্ট আপডেট
        </Button>
      ),
    },
  ]

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-2xs space-y-4">
      <DataTable
        title="মাঠপর্যায় তদন্ত (কেস ট্র্যাকিং ও পরিদর্শন)"
        description="আবেদনকারীদের বাড়ি গিয়ে যাচাইকরণ ও প্রতিবেদন জমা (API: /api/admin/assistance-applications)"
        columns={casesColumns}
        data={casesData}
        searchable
        searchPlaceholder="কেস নং, আবেদনকারী বা গ্রাম..."
        pageSize={10}
      />

      {/* Status Update Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-stone-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-stone-900">তদন্ত রিপোর্ট ও অনুমোদন আপডেট</h3>
              <button
                type="button"
                onClick={() => setSelectedCase(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-600"
              >
                <X className="size-5" />
              </button>
            </div>
            <form onSubmit={handleUpdateSubmit} className="space-y-4 text-xs">
              <div>
                <p className="text-stone-500 mb-1">আবেদনকারী: <strong className="text-stone-900">{selectedCase.applicant}</strong> ({selectedCase.id})</p>
              </div>
              <div>
                <label className="block font-bold text-stone-700 mb-1">সিদ্ধান্ত / স্ট্যাটাস *</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full rounded-xl border border-stone-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500 font-semibold"
                >
                  <option value="IN_REVIEW">তদন্ত প্রক্রিয়াধীন (In Review)</option>
                  <option value="APPROVED">অনুমোদিত (Approved)</option>
                  <option value="REJECTED">বাতিল (Rejected)</option>
                  <option value="DISBURSED">অর্থ বিতরণ সম্পন্ন (Disbursed)</option>
                </select>
              </div>
              {newStatus === "APPROVED" && (
                <div>
                  <label className="block font-bold text-stone-700 mb-1">অনুমোদিত আর্থিক পরিমাণ (টাকা)</label>
                  <input
                    type="number"
                    value={approvedAmount}
                    onChange={(e) => setApprovedAmount(e.target.value)}
                    placeholder="যেমন: ১০,০০০"
                    className="w-full rounded-xl border border-stone-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              )}
              <div>
                <label className="block font-bold text-stone-700 mb-1">তদন্ত কর্মকর্তার সুপারিশ / নোট</label>
                <textarea
                  rows={3}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="পরিদর্শন ফলাফল ও চূড়ান্ত সুপারিশ লিখুন..."
                  className="w-full rounded-xl border border-stone-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                <Button type="button" variant="outline" size="sm" onClick={() => setSelectedCase(null)}>
                  বাতিল
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isUpdating}
                  className="bg-[#D62828] hover:bg-[#B91C1C] text-white font-bold"
                >
                  {isUpdating ? <Loader2 className="size-4 animate-spin" /> : "আপডেট সংরক্ষণ করুন"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
export default CasesTab
