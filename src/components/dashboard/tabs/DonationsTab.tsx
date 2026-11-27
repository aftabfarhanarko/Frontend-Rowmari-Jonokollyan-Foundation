"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  useGetAdminDonationsListQuery,
  useReviewDonationStatusMutation,
  useAdminCreateDonationMutation,
} from "@/store/api/donationsApi"
import { useGetCampaignsQuery } from "@/store/api/campaignsApi"
import { Button } from "@/components/ui/button"
import { ExternalLink, Search, Eye, X, CheckCircle2, XCircle, Plus, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { DashboardModal } from "@/components/dashboard/DashboardModal"

export function DonationsTab() {
  const [statusFilter, setStatusFilter] = useState<string>("ALL")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDonation, setSelectedDonation] = useState<any | null>(null)
  const [adminNote, setAdminNote] = useState("")
  const [reviewDonation, { isLoading: isReviewing }] = useReviewDonationStatusMutation()
  const [adminCreateDonation, { isLoading: isCreating }] = useAdminCreateDonationMutation()

  const { data: donationsRes, refetch } = useGetAdminDonationsListQuery({
    status: statusFilter === "ALL" ? undefined : statusFilter,
    page: 1, limit: 50,
  })
  const { data: campaignsRes } = useGetCampaignsQuery()
  const campaigns: any[] = Array.isArray(campaignsRes) ? campaignsRes : (campaignsRes as any)?.items || []

  const donations = Array.isArray(donationsRes) ? donationsRes : donationsRes?.items || []

  // Add Donation Modal State
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [donorName, setDonorName] = useState("")
  const [donorPhone, setDonorPhone] = useState("")
  const [donorEmail, setDonorEmail] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"CASH" | "BANK_TRANSFER" | "BKASH" | "NAGAD" | "ROCKET" | "OTHER">("CASH")
  const [campaignId, setCampaignId] = useState("")
  const [transactionReference, setTransactionReference] = useState("")
  const [createStatus, setCreateStatus] = useState<"APPROVED" | "PENDING">("APPROVED")
  const [notes, setNotes] = useState("")
  const [createAdminNote, setCreateAdminNote] = useState("")

  const resetAddForm = () => {
    setDonorName("")
    setDonorPhone("")
    setDonorEmail("")
    setIsAnonymous(false)
    setAmount("")
    setPaymentMethod("CASH")
    setCampaignId("")
    setTransactionReference("")
    setCreateStatus("APPROVED")
    setNotes("")
    setCreateAdminNote("")
  }

  const handleCreateDonation = async (e: React.FormEvent) => {
    e.preventDefault()
    const numAmount = Number(amount)
    if (!numAmount || numAmount < 10) {
      toast.error("অনুদানের পরিমাণ সর্বনিম্ন ১০ টাকা হতে হবে")
      return
    }
    if (!isAnonymous && !donorName.trim()) {
      toast.error("দাতার নাম লিখুন অথবা 'বেনামী দাতা' নির্বাচন করুন")
      return
    }

    try {
      await adminCreateDonation({
        donorName: isAnonymous ? undefined : donorName.trim(),
        donorPhone: donorPhone.trim() || undefined,
        donorEmail: donorEmail.trim() || undefined,
        isAnonymous,
        amount: numAmount,
        paymentMethod,
        campaignId: campaignId || undefined,
        transactionReference: transactionReference.trim() || undefined,
        status: createStatus,
        notes: notes.trim() || undefined,
        adminNote: createAdminNote.trim() || undefined,
      }).unwrap()
      toast.success("নতুন অনুদান সফলভাবে তহবিলে যুক্ত করা হয়েছে")
      setAddModalOpen(false)
      resetAddForm()
      refetch()
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "অনুদান যুক্ত করতে ব্যর্থ হয়েছে")
    }
  }

  const handleReview = async (id: string, status: "APPROVED" | "REJECTED") => {
    try {
      await reviewDonation({ id, status, adminNote }).unwrap()
      toast.success(status === "APPROVED" ? "অনুদান অনুমোদন করা হয়েছে" : "অনুদান বাতিল করা হয়েছে")
      setSelectedDonation(null)
      setAdminNote("")
      refetch()
    } catch (err: any) {
      toast.error(err?.data?.message || "হালনাগাদ ব্যর্থ হয়েছে")
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

      {/* Filter, Search and Add Button Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
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
        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="size-4 absolute left-3 top-2.5 text-stone-400" />
            <input
              type="text" placeholder="নাম, ফোন বা TrxID..." value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-[#D62828]"
            />
          </div>
          <Button
            size="sm"
            onClick={() => { resetAddForm(); setAddModalOpen(true) }}
            className="bg-[#D62828] hover:bg-[#B91C1C] text-white text-xs font-bold gap-1.5 cursor-pointer shrink-0"
          >
            <Plus className="size-3.5" />
            <span>নতুন অনুদান যোগ করুন</span>
          </Button>
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
                    <p className="font-bold text-stone-900 hover:text-[#D62828] transition">
                      <Link href={`/dashboard/donations/${d.id}`}>
                        {d.donorName || "বেনামী দাতা"}
                      </Link>
                    </p>
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
                    <Link
                      href={`/dashboard/donations/${d.id}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border border-stone-300 text-stone-700 hover:border-[#D62828] hover:text-[#D62828] transition"
                    >
                      <Eye className="size-3 mr-1 text-[#D62828]" />
                      <span>বিস্তারিত</span>
                    </Link>
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
        <DashboardModal>
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
        </DashboardModal>
      )}

      {/* Admin Add Donation / Fund Modal */}
      {addModalOpen && (
        <DashboardModal>
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-stone-200 max-h-[85vh] overflow-y-auto animate-in fade-in-50 zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3 border-stone-100">
              <div>
                <h3 className="font-black text-base text-stone-900">নতুন অনুদান ও তহবিল যুক্ত করুন</h3>
                <p className="text-[11px] text-stone-500">অফলাইন, নগদ, ব্যাংক বা সরাসরি প্রাপ্ত অনুদান তহবিলে লিপিবদ্ধ করুন</p>
              </div>
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDonation} className="space-y-3.5 text-xs">
              <div className="flex items-center gap-2 bg-stone-50 px-3 py-2 rounded-xl border border-stone-200">
                <input
                  type="checkbox"
                  id="isAnonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded text-[#D62828] focus:ring-[#D62828]"
                />
                <label htmlFor="isAnonymous" className="font-bold text-stone-700 cursor-pointer">
                  বেনামী দাতা (নাম গোপন রাখুন)
                </label>
              </div>

              {!isAnonymous && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      দাতার নাম <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required={!isAnonymous}
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="যেমন: মো. আব্দুল করিম"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">দাতার ফোন (ঐচ্ছিক)</label>
                    <input
                      type="text"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      placeholder="যেমন: 01712345678"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 font-mono"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    অনুদানের পরিমাণ (টাকা) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min={10}
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="যেমন: 5000"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">গ্রহণ মাধ্যম</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 font-semibold"
                  >
                    <option value="CASH">নগদ (Cash)</option>
                    <option value="BANK_TRANSFER">ব্যাংক ট্রান্সফার (Bank)</option>
                    <option value="BKASH">বিকাশ (bKash)</option>
                    <option value="NAGAD">নগদ (Nagad)</option>
                    <option value="ROCKET">রকেট (Rocket)</option>
                    <option value="OTHER">অন্যান্য</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">ক্যাম্পেইন / তহবিল খাত</label>
                  <select
                    value={campaignId}
                    onChange={(e) => setCampaignId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 font-semibold"
                  >
                    <option value="">সাধারণ তহবিল (General Fund)</option>
                    {campaigns.map((c: any) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">স্ট্যাটাস</label>
                  <select
                    value={createStatus}
                    onChange={(e) => setCreateStatus(e.target.value as "APPROVED" | "PENDING")}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 font-semibold"
                  >
                    <option value="APPROVED">সরাসরি অনুমোদিত (Approved)</option>
                    <option value="PENDING">অপেক্ষমান (Pending)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">ট্রানজেকশন আইডি / রসিদ নং (ঐচ্ছিক)</label>
                  <input
                    type="text"
                    value={transactionReference}
                    onChange={(e) => setTransactionReference(e.target.value)}
                    placeholder="যেমন: CASH-001 বা TRX123"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">দাতার ইমেইল (ঐচ্ছিক)</label>
                  <input
                    type="email"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="donor@example.com"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">মন্তব্য / বিবরণ (ঐচ্ছিক)</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="অনুদান সংক্রান্ত নোট বা উদ্দেশ্য..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">অ্যাডমিন নোট (ঐচ্ছিক)</label>
                <input
                  type="text"
                  value={createAdminNote}
                  onChange={(e) => setCreateAdminNote(e.target.value)}
                  placeholder="অভ্যন্তরীণ যাচাই মন্তব্য..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                <Button type="button" variant="outline" onClick={() => setAddModalOpen(false)}>
                  বাতিল
                </Button>
                <Button
                  type="submit"
                  disabled={isCreating}
                  className="bg-[#D62828] hover:bg-[#B91C1C] text-white font-bold gap-1.5 cursor-pointer"
                >
                  {isCreating && <Loader2 className="size-3.5 animate-spin" />}
                  <span>অনুদান সংরক্ষণ করুন</span>
                </Button>
              </div>
            </form>
          </div>
        </DashboardModal>
      )}
    </div>
  )
}
