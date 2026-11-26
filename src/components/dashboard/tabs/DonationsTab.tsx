"use client"

import React, { useState } from "react"
import { useGetAdminDonationsListQuery, useReviewDonationStatusMutation } from "@/store/api/donationsApi"
import { Button } from "@/components/ui/button"
import { ExternalLink, Search, Eye, X, CheckCircle2, XCircle } from "lucide-react"

export function DonationsTab() {
  const [statusFilter, setStatusFilter] = useState<string>("ALL")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDonation, setSelectedDonation] = useState<any | null>(null)
  const [adminNote, setAdminNote] = useState("")
  const [reviewDonation, { isLoading: isReviewing }] = useReviewDonationStatusMutation()

  const { data: donationsRes, refetch } = useGetAdminDonationsListQuery({
    status: statusFilter === "ALL" ? undefined : statusFilter,
    page: 1, limit: 50,
  })

  const donations = donationsRes?.items || []

  const handleReview = async (id: string, status: "APPROVED" | "REJECTED") => {
    try {
      await reviewDonation({ id, status, adminNote }).unwrap()
      setSelectedDonation(null)
      setAdminNote("")
      refetch()
    } catch (err: any) {
      alert(err?.data?.message || "হালনাগাদ ব্যর্থ হয়েছে")
    }
  }

  const filtered = donations.filter((d: any) => {
    if (!searchTerm) return true
    const s = searchTerm.toLowerCase()
    return (
      d.donorName?.toLowerCase().includes(s) ||
      d.donorPhone?.includes(s) ||
      d.transactionReference?.toLowerCase().includes(s) ||
      d.senderPhone?.includes(s)
    )
  })

  const approvedSum = donations
    .filter((d: any) => d.status === "APPROVED")
    .reduce((acc: number, d: any) => acc + Number(d.amount), 0)

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200">
          <p className="text-xs text-stone-500 font-medium">মোট অনুদান সংখ্যা</p>
          <p className="text-2xl font-black text-stone-900 mt-1">{donations.length} টি</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200">
          <p className="text-xs text-stone-500 font-medium">অনুমোদিত মোট তহবিল</p>
          <p className="text-2xl font-black text-[#D62828] mt-1">৳{approvedSum.toLocaleString("bn-BD")}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200">
          <p className="text-xs text-stone-500 font-medium">অপেক্ষমান অনুদান</p>
          <p className="text-2xl font-black text-amber-600 mt-1">
            {donations.filter((d: any) => d.status === "PENDING").length} টি
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200">
          <p className="text-xs text-stone-500 font-medium">বাতিলকৃত অনুদান</p>
          <p className="text-2xl font-black text-stone-600 mt-1">
            {donations.filter((d: any) => d.status === "REJECTED").length} টি
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {["ALL", "PENDING", "APPROVED", "REJECTED"].map((st) => (
            <button
              key={st} onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                statusFilter === st ? "bg-[#D62828] text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {st === "ALL" ? "সকল" : st === "PENDING" ? "অপেক্ষমান" : st === "APPROVED" ? "অনুমোদিত" : "বাতিল"}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="size-4 absolute left-3 top-2.5 text-stone-400" />
          <input
            type="text" placeholder="নাম, ফোন বা TrxID..." value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-[#D62828]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 font-bold border-b border-stone-200">
              <tr>
                <th className="p-3">দাতার নাম ও যোগাযোগ</th>
                <th className="p-3">পরিমাণ</th>
                <th className="p-3">মাধ্যম ও TrxID</th>
                <th className="p-3">তারিখ</th>
                <th className="p-3">স্ট্যাটাস</th>
                <th className="p-3 text-right">পদক্ষেপ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((d: any) => (
                <tr key={d.id} className="hover:bg-stone-50/70">
                  <td className="p-3">
                    <p className="font-bold text-stone-900">{d.donorName || "বেনামী দাতা"}</p>
                    <p className="text-[11px] text-stone-500">{d.donorPhone || d.senderPhone || "-"}</p>
                  </td>
                  <td className="p-3 font-black text-stone-900">৳{Number(d.amount).toLocaleString("bn-BD")}</td>
                  <td className="p-3">
                    <span className="font-bold text-[#D62828] uppercase">{d.paymentMethod}</span>
                    <p className="font-mono text-[11px] text-stone-600">{d.transactionReference}</p>
                  </td>
                  <td className="p-3 text-stone-500">{new Date(d.createdAt).toLocaleDateString("bn-BD")}</td>
                  <td className="p-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                      d.status === "APPROVED" ? "bg-red-50 text-red-700 border border-red-200" :
                      d.status === "REJECTED" ? "bg-stone-100 text-stone-600" : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}>
                      {d.status === "APPROVED" ? "অনুমোদিত" : d.status === "REJECTED" ? "বাতিল" : "অপেক্ষমান"}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <Button
                      size="sm" variant="outline"
                      onClick={() => { setSelectedDonation(d); setAdminNote(d.adminNote || "") }}
                      className="text-xs h-7 border-stone-300 hover:border-[#D62828] cursor-pointer"
                    >
                      <Eye className="size-3 mr-1" /> যাচাই
                    </Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="text-center py-8 text-stone-400">কোনো অনুদান রেকর্ড পাওয়া যায়নি</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b pb-3 border-stone-200">
              <h3 className="font-black text-lg text-stone-900">অনুদান বিস্তারিত ও যাচাই</h3>
              <button onClick={() => setSelectedDonation(null)} className="text-stone-400 hover:text-stone-700"><X className="size-5" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs bg-stone-50 p-3 rounded-xl border border-stone-200">
              <div><span className="text-stone-400 block">দাতার নাম:</span><span className="font-bold text-stone-800">{selectedDonation.donorName || "বেনামী দাতা"}</span></div>
              <div><span className="text-stone-400 block">পরিমাণ:</span><span className="font-black text-base text-[#D62828]">৳{Number(selectedDonation.amount).toLocaleString("bn-BD")}</span></div>
              <div><span className="text-stone-400 block">মাধ্যম:</span><span className="font-bold text-stone-800 uppercase">{selectedDonation.paymentMethod}</span></div>
              <div><span className="text-stone-400 block">প্রেরক নম্বর:</span><span className="font-bold text-stone-800">{selectedDonation.senderPhone || "-"}</span></div>
              <div className="col-span-2">
                <span className="text-stone-400 block">ট্রানজ্যাকশন আইডি (TrxID):</span>
                <span className="font-mono font-bold text-stone-900 bg-white px-2 py-0.5 rounded border border-stone-200 inline-block">{selectedDonation.transactionReference}</span>
              </div>
              {selectedDonation.paymentProofUrl && (
                <div className="col-span-2">
                  <span className="text-stone-400 block mb-1">পেমেন্ট স্ক্রিনশট / প্রমাণ:</span>
                  <a href={selectedDonation.paymentProofUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[#D62828] font-bold hover:underline">
                    <ExternalLink className="size-3.5" /> স্ক্রিনশট দেখুন (নতুন ট্যাবে)
                  </a>
                </div>
              )}
            </div>
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">অ্যাডমিন মন্তব্য:</label>
              <textarea value={adminNote} onChange={(e) => setAdminNote(e.target.value)} placeholder="যাচাইয়ের মন্তব্য লিখুন..." className="w-full p-2.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-[#D62828]" rows={2} />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => handleReview(selectedDonation.id, "REJECTED")} disabled={isReviewing} className="text-stone-600 border-stone-300">
                <XCircle className="size-3.5 mr-1" /> বাতিল
              </Button>
              <Button size="sm" onClick={() => handleReview(selectedDonation.id, "APPROVED")} disabled={isReviewing} className="bg-[#D62828] hover:bg-[#B91C1C] text-white font-bold">
                <CheckCircle2 className="size-3.5 mr-1" /> অনুমোদন করুন
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
