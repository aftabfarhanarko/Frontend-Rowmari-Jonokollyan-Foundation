"use client"

import React, { useState } from "react"
import Link from "next/link"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Plus, X, Loader2, Eye } from "lucide-react"
import { useGetActivitiesQuery, useCreateActivityMutation } from "@/store/api/activitiesApi"
import { toast } from "sonner"
import { DashboardModal } from "@/components/dashboard/DashboardModal"

export default function ActivitiesDashboardPage() {
  const { data: activitiesRes } = useGetActivitiesQuery()
  const [createActivity, { isLoading: isCreating }] = useCreateActivityMutation()
  const activitiesList = activitiesRes || []

  const [modalOpen, setModalOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [content, setContent] = useState("")
  const [location, setLocation] = useState("রৌমারী সদর")
  const [beneficiariesCount, setBeneficiariesCount] = useState("")

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !summary.trim()) {
      toast.error("শিরোনাম ও সারসংক্ষেপ আবশ্যক")
      return
    }
    try {
      await createActivity({
        title: title.trim(),
        summary: summary.trim(),
        content: content.trim() || summary.trim(),
        location: location.trim(),
        activityDate: new Date().toISOString().split("T")[0],
        beneficiariesCount: beneficiariesCount ? Number(beneficiariesCount) : 0,
      }).unwrap()
      toast.success("প্রজেক্ট ও কার্যক্রম সফলভাবে রেকর্ড করা হয়েছে!")
      setModalOpen(false)
      setTitle("")
      setSummary("")
      setContent("")
      setBeneficiariesCount("")
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "কার্যক্রম সংরক্ষণে সমস্যা হয়েছে")
    }
  }

  const columns = [
    {
      header: "আইডি",
      accessorKey: "id",
      className: "font-mono text-xs font-bold text-[#D62828]",
      cell: (r: any) => (
        <Link href={`/dashboard/activities/${r.id}`} className="hover:underline">
          {r.id?.slice(0, 8)}...
        </Link>
      ),
    },
    {
      header: "কার্যক্রমের নাম",
      accessorKey: "titleBn",
      sortable: true,
      className: "font-semibold",
      cell: (r: any) => (
        <Link
          href={`/dashboard/activities/${r.id}`}
          className="hover:text-[#D62828] transition font-semibold"
        >
          {r.titleBn}
        </Link>
      ),
    },
    { header: "ক্যাটাগরি", accessorKey: "categoryBn" },
    { header: "এলাকা", accessorKey: "locationBn" },
    { header: "উপকারভোগী", accessorKey: "beneficiariesCount", align: "center" as const },
    { header: "তারিখ", accessorKey: "dateBn" },
    {
      header: "পদক্ষেপ",
      align: "right" as const,
      cell: (r: any) => (
        <Link
          href={`/dashboard/activities/${r.id}`}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border border-stone-200 text-stone-700 hover:border-[#D62828] hover:text-[#D62828] transition"
        >
          <Eye className="size-3 text-[#D62828]" />
          <span>বিস্তারিত</span>
        </Link>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="প্রজেক্ট ও কার্যক্রম"
        description="বাস্তবায়িত এবং চলমান সামাজিক ও মানবিক উন্নয়নমূলক কার্যক্রম"
        badge="প্রজেক্ট পোর্টফোলিও"
        badgeVariant="default"
      />

      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-2xs space-y-4">
        <DataTable
          title="বাস্তবায়িত কার্যক্রম তালিকা"
          description="ফাউন্ডেশনের সকল উন্নয়নমূলক প্রজেক্ট ও কার্যক্রম (API: /api/activities)"
          columns={columns}
          data={activitiesList}
          searchable
          pageSize={10}
          actions={
            <Button
              size="xs"
              onClick={() => setModalOpen(true)}
              className="gap-1 bg-[#D62828] hover:bg-[#B91C1C] text-white cursor-pointer font-bold"
            >
              <Plus className="size-3.5" />
              <span>নতুন কার্যক্রম যোগ</span>
            </Button>
          }
        />
      </div>

      {modalOpen && (
        <DashboardModal>
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-stone-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-stone-900">নতুন কার্যক্রম / প্রজেক্ট রিপোর্ট</h3>
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
                <label className="block font-bold text-stone-700 mb-1">কার্যক্রমের শিরোনাম *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="যেমন: বিনামূল্যে চক্ষু ও ডায়াবেটিস ক্যাম্প"
                  className="w-full rounded-xl border border-stone-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block font-bold text-stone-700 mb-1">স্থান / ভেন্যু *</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-xl border border-stone-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block font-bold text-stone-700 mb-1">উপকারভোগী সংখ্যা</label>
                <input
                  type="number"
                  value={beneficiariesCount}
                  onChange={(e) => setBeneficiariesCount(e.target.value)}
                  placeholder="যেমন: ৩৫০"
                  className="w-full rounded-xl border border-stone-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block font-bold text-stone-700 mb-1">সারসংক্ষেপ *</label>
                <textarea
                  required
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="কার্যক্রমের মূল ফলাফল ও সংক্ষেপ..."
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
                  {isCreating ? <Loader2 className="size-4 animate-spin" /> : "সংরক্ষণ করুন"}
                </Button>
              </div>
            </form>
          </div>
        </DashboardModal>
      )}
    </div>
  )
}
