"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  useGetAdminCommitteesQuery,
  useGetAdminMembersQuery,
  useGetPublicDesignationsQuery,
  useCreateCommitteeMutation,
  useCreateMemberMutation,
  useDeleteCommitteeMutation,
} from "@/store/api/committeesApi"
import { Button } from "@/components/ui/button"
import { Plus, Users, ShieldCheck, Award, Trash2, Eye } from "lucide-react"

export function CommitteesTab() {
  const [activeTab, setActiveTab] = useState<"committees" | "members" | "designations">("committees")
  const { data: committees, refetch: refetchComm } = useGetAdminCommitteesQuery()
  const { data: membersRes, refetch: refetchMem } = useGetAdminMembersQuery({ limit: 50 })
  const { data: designations } = useGetPublicDesignationsQuery()

  const [createCommittee, { isLoading: isCreatingComm }] = useCreateCommitteeMutation()
  const [createMember, { isLoading: isCreatingMem }] = useCreateMemberMutation()
  const [deleteCommittee] = useDeleteCommitteeMutation()

  // New Committee form state
  const [showAddComm, setShowAddComm] = useState(false)
  const [commName, setCommName] = useState("")
  const [commYear, setCommYear] = useState("২০২৫-২০২৬")
  const [commType, setCommType] = useState("EXECUTIVE")

  // New Member form state
  const [showAddMem, setShowAddMem] = useState(false)
  const [memNameBn, setMemNameBn] = useState("")
  const [memNameEn, setMemNameEn] = useState("")
  const [memPhone, setMemPhone] = useState("")
  const [memCommId, setMemCommId] = useState("")
  const [memDesigId, setMemDesigId] = useState("")

  const handleAddCommittee = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!commName || !commYear) return
    await createCommittee({ name: commName, year: commYear, type: commType, status: "PUBLISHED" }).unwrap()
    setCommName(""); setShowAddComm(false); refetchComm()
  }

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!memNameBn || !memNameEn || !memPhone) return
    const res = await createMember({
      nameBn: memNameBn, nameEn: memNameEn, phoneNumber: memPhone,
      committeeId: memCommId || undefined, designationId: memDesigId || undefined,
    }).unwrap()
    alert(`সদস্য সফলভাবে তৈরি হয়েছে! বরাদ্দকৃত আইডি: ${res.memberId}`)
    setMemNameBn(""); setMemNameEn(""); setMemPhone(""); setShowAddMem(false); refetchMem()
  }

  return (
    <div className="space-y-6">
      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
        <button
          onClick={() => setActiveTab("committees")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === "committees" ? "bg-[#D62828] text-white" : "bg-stone-100 text-stone-700"
          }`}
        >
          <Award className="size-3.5" /><span>কমিটি তালিকা ({committees?.length || 0})</span>
        </button>
        <button
          onClick={() => setActiveTab("members")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === "members" ? "bg-[#D62828] text-white" : "bg-stone-100 text-stone-700"
          }`}
        >
          <Users className="size-3.5" /><span>নিবন্ধিত সদস্য ({membersRes?.total || 0})</span>
        </button>
        <button
          onClick={() => setActiveTab("designations")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === "designations" ? "bg-[#D62828] text-white" : "bg-stone-100 text-stone-700"
          }`}
        >
          <ShieldCheck className="size-3.5" /><span>পদবী কাঠামো ({designations?.length || 0})</span>
        </button>
      </div>

      {/* Committees View */}
      {activeTab === "committees" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-stone-900">সকল কমিটি ও পরিষদ</h3>
            <Button size="sm" onClick={() => setShowAddComm(!showAddComm)} className="bg-[#D62828] text-white text-xs h-8">
              <Plus className="size-3.5 mr-1" /> নতুন কমিটি গঠন
            </Button>
          </div>

          {showAddComm && (
            <form onSubmit={handleAddCommittee} className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input type="text" required value={commName} onChange={(e) => setCommName(e.target.value)} placeholder="কমিটির নাম (যেমন: ৮ম কার্যনির্বাহী পরিষদ)" className="p-2 border rounded-lg bg-white" />
                <input type="text" required value={commYear} onChange={(e) => setCommYear(e.target.value)} placeholder="মেয়াদ / সাল (যেমন: ২০২৬-২০২৭)" className="p-2 border rounded-lg bg-white" />
                <select value={commType} onChange={(e) => setCommType(e.target.value)} className="p-2 border rounded-lg bg-white">
                  <option value="EXECUTIVE">কার্যনির্বাহী পরিষদ</option>
                  <option value="ADVISORY">উপদেষ্টা পরিষদ</option>
                  <option value="WORKING">ওয়ার্কিং কমিটি</option>
                  <option value="SPECIAL">বিশেষ টাস্কফোর্স</option>
                </select>
              </div>
              <div className="flex justify-end pt-1">
                <Button size="sm" type="submit" disabled={isCreatingComm} className="bg-[#D62828] text-white">সংরক্ষণ করুন</Button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {committees?.map((c) => (
              <div key={c.id} className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-50 text-[#D62828]">{c.type}</span>
                  <button onClick={async () => { if (confirm("মুছে ফেলতে চান?")) { await deleteCommittee(c.id); refetchComm() } }} className="text-stone-400 hover:text-red-600">
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
                <h4 className="font-bold text-sm text-stone-900">{c.name}</h4>
                <p className="text-xs text-stone-500 font-mono">মেয়াদ: {c.year}</p>
                <p className="text-[11px] text-stone-600">মোট সদস্য: {c.memberships?.length || 0} জন</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Members View */}
      {activeTab === "members" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-stone-900">সদস্য তালিকা ও মেম্বার আইডি</h3>
            <Button size="sm" onClick={() => setShowAddMem(!showAddMem)} className="bg-[#D62828] text-white text-xs h-8">
              <Plus className="size-3.5 mr-1" /> নতুন সদস্য নিবন্ধন
            </Button>
          </div>

          {showAddMem && (
            <form onSubmit={handleAddMember} className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input type="text" required value={memNameBn} onChange={(e) => setMemNameBn(e.target.value)} placeholder="নাম (বাংলায়)" className="p-2 border rounded-lg bg-white" />
                <input type="text" required value={memNameEn} onChange={(e) => setMemNameEn(e.target.value)} placeholder="Name (English)" className="p-2 border rounded-lg bg-white" />
                <input type="text" required value={memPhone} onChange={(e) => setMemPhone(e.target.value)} placeholder="মোবাইল নম্বর" className="p-2 border rounded-lg bg-white" />
                <select value={memCommId} onChange={(e) => setMemCommId(e.target.value)} className="p-2 border rounded-lg bg-white">
                  <option value="">কমিটি নির্বাচন করুন (ঐচ্ছিক)</option>
                  {committees?.map((c) => (<option key={c.id} value={c.id}>{c.name} ({c.year})</option>))}
                </select>
                <select value={memDesigId} onChange={(e) => setMemDesigId(e.target.value)} className="p-2 border rounded-lg bg-white">
                  <option value="">পদবী নির্বাচন করুন (ঐচ্ছিক)</option>
                  {designations?.map((d) => (<option key={d.id} value={d.id}>{d.titleBn}</option>))}
                </select>
              </div>
              <div className="flex justify-end pt-1">
                <Button size="sm" type="submit" disabled={isCreatingMem} className="bg-[#D62828] text-white">মেম্বার আইডি বরাদ্দ করুন</Button>
              </div>
            </form>
          )}

          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold">
                <tr>
                  <th className="p-3">RJF মেম্বার আইডি</th><th className="p-3">নাম</th><th className="p-3">মোবাইল</th><th className="p-3">স্ট্যাটাস</th><th className="p-3 text-right">পদক্ষেপ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {membersRes?.items?.map((m) => (
                  <tr key={m.id} className="hover:bg-stone-50/60">
                    <td className="p-3 font-mono font-bold text-[#D62828]">
                      <Link href={`/dashboard/committees/${m.id}`} className="hover:underline">
                        {m.memberId}
                      </Link>
                    </td>
                    <td className="p-3 font-bold text-stone-900">
                      <Link href={`/dashboard/committees/${m.id}`} className="hover:text-[#D62828] transition">
                        {m.nameBn} <span className="block text-[11px] text-stone-500 font-normal">{m.nameEn}</span>
                      </Link>
                    </td>
                    <td className="p-3 font-mono">{m.phoneNumber}</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-red-50 text-red-700 font-bold">সক্রিয়</span></td>
                    <td className="p-3 text-right">
                      <Link
                        href={`/dashboard/committees/${m.id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-stone-700 hover:text-[#D62828] hover:bg-red-50 border border-stone-200"
                        title="সদস্যের সম্পূর্ণ প্রোফাইল দেখুন"
                      >
                        <Eye className="size-3 text-[#D62828]" />
                        <span>বিস্তারিত</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Designations View */}
      {activeTab === "designations" && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {designations?.map((d) => (
            <div key={d.id} className="p-3 rounded-xl bg-white border border-stone-200 shadow-2xs text-xs">
              <span className="text-[10px] font-bold text-stone-400 block font-mono">অগ্রাধিকার: #{d.priority}</span>
              <p className="font-bold text-stone-900">{d.titleBn}</p>
              <p className="text-[11px] text-stone-500">{d.titleEn}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
