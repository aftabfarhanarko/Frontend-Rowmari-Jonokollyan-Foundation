"use client"

import React, { useState } from "react"
import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, X, Loader2 } from "lucide-react"
import { useCreateCampaignMutation } from "@/store/api/campaignsApi"
import { toast } from "sonner"

interface CampaignsTabProps {
  campaignsList: any[]
}

export function CampaignsTab({ campaignsList }: CampaignsTabProps) {
  const [createCampaign, { isLoading: isCreating }] = useCreateCampaignMutation()
  const [modalOpen, setModalOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [targetAmount, setTargetAmount] = useState("")
  const [category, setCategory] = useState("ত্রাণ ও পুনর্বাসন")

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !description.trim() || !targetAmount) {
      toast.error("সকল আবশ্যক ঘর পূরণ করুন")
      return
    }
    try {
      await createCampaign({
        title: title.trim(),
        description: description.trim(),
        targetAmount: Number(targetAmount),
        category,
      }).unwrap()
      toast.success("ক্যাম্পেইন সফলভাবে তৈরি হয়েছে!")
      setModalOpen(false)
      setTitle("")
      setDescription("")
      setTargetAmount("")
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "ক্যাম্পেইন তৈরিতে সমস্যা হয়েছে")
    }
  }

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
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-2xs space-y-4">
      <DataTable
        title="ক্যাম্পেইন ব্যবস্থাপনা"
        description="ওয়েবসাইটে চলমান ও সমাপ্ত ক্যাম্পেইনসমূহ (API: /api/campaigns)"
        columns={columns}
        data={campaignsList}
        searchable
        pageSize={5}
        actions={
          <Button
            size="xs"
            onClick={() => setModalOpen(true)}
            className="gap-1 bg-[#D62828] hover:bg-[#B91C1C] text-white cursor-pointer font-bold"
          >
            <Plus className="size-3.5" />
            <span>নতুন ক্যাম্পেইন তৈরি</span>
          </Button>
        }
      />

      {/* Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-stone-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-stone-900">নতুন তহবিল সংগ্রহ ক্যাম্পেইন তৈরি</h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-600"
              >
                <X className="size-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">ক্যাম্পেইনের নাম *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="যেমন: শীতবস্ত্র বিতরণ ২০২৬"
                  className="w-full rounded-xl border border-stone-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block font-bold text-stone-700 mb-1">লক্ষ্যমাত্রা (টাকা) *</label>
                <input
                  type="number"
                  required
                  min="1000"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  placeholder="যেমন: ৫০,০০০"
                  className="w-full rounded-xl border border-stone-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block font-bold text-stone-700 mb-1">ক্যাটাগরি</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-stone-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="ত্রাণ ও পুনর্বাসন">ত্রাণ ও পুনর্বাসন</option>
                  <option value="চিকিৎসা সহায়তা">চিকিৎসা সহায়তা</option>
                  <option value="শিক্ষা বৃত্তি">শিক্ষা বৃত্তি</option>
                  <option value="সাধারণ উন্নয়ন">সাধারণ উন্নয়ন</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-stone-700 mb-1">বিবরণ ও উদ্দেশ্য *</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="ক্যাম্পেইনের পটভূমি ও তহবিল ব্যবহারের বিবরণ..."
                  className="w-full rounded-xl border border-stone-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                <Button type="button" variant="outline" size="sm" onClick={() => setModalOpen(false)}>
                  বাতিল
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isCreating}
                  className="bg-[#D62828] hover:bg-[#B91C1C] text-white font-bold"
                >
                  {isCreating ? <Loader2 className="size-4 animate-spin" /> : "প্রকাশ করুন"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
export default CampaignsTab
