"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  useGetAdminCommitteesQuery,
  useGetAdminMembersQuery,
  useGetPublicDesignationsQuery,
  useCreateCommitteeMutation,
  useUpdateCommitteeMutation,
  useDeleteCommitteeMutation,
  useCreateDesignationMutation,
  useUpdateDesignationMutation,
  useDeleteDesignationMutation,
  useCreateMemberMutation,
  useUpdateMemberMutation,
  useDeleteMemberMutation,
  CommitteeItem,
  DesignationItem,
  MemberItem,
} from "@/store/api/committeesApi"
import { Button } from "@/components/ui/button"
import { SkeletonTable, SkeletonCard } from "@/components/ui/skeleton"
import {
  Plus,
  Users,
  ShieldCheck,
  Award,
  Trash2,
  Eye,
  Edit2,
  Search,
  Loader2,
  X,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from "lucide-react"
import { toast } from "sonner"

export function CommitteesTab() {
  const [activeTab, setActiveTab] = useState<"committees" | "members" | "designations">("committees")

  // API Queries
  const { data: committees = [], isLoading: isLoadingComm, refetch: refetchComm } = useGetAdminCommitteesQuery()
  const { data: membersRes, isLoading: isLoadingMem, refetch: refetchMem } = useGetAdminMembersQuery({ limit: 100 })
  const { data: designations = [], isLoading: isLoadingDesig, refetch: refetchDesig } = useGetPublicDesignationsQuery()

  // Committee Mutations
  const [createCommittee, { isLoading: isCreatingComm }] = useCreateCommitteeMutation()
  const [updateCommittee, { isLoading: isUpdatingComm }] = useUpdateCommitteeMutation()
  const [deleteCommittee] = useDeleteCommitteeMutation()

  // Designation Mutations
  const [createDesignation, { isLoading: isCreatingDesig }] = useCreateDesignationMutation()
  const [updateDesignation, { isLoading: isUpdatingDesig }] = useUpdateDesignationMutation()
  const [deleteDesignation] = useDeleteDesignationMutation()

  // Member Mutations
  const [createMember, { isLoading: isCreatingMem }] = useCreateMemberMutation()
  const [updateMember, { isLoading: isUpdatingMem }] = useUpdateMemberMutation()
  const [deleteMember] = useDeleteMemberMutation()

  // ----------------------------------------------------------------------
  // Designation Form States
  // ----------------------------------------------------------------------
  const [isDesigModalOpen, setIsDesigModalOpen] = useState(false)
  const [editingDesig, setEditingDesig] = useState<DesignationItem | null>(null)
  const [desigTitleBn, setDesigTitleBn] = useState("")
  const [desigTitleEn, setDesigTitleEn] = useState("")
  const [desigPriority, setDesigPriority] = useState<number>(1)
  const [desigDescription, setDesigDescription] = useState("")
  const [desigIsActive, setDesigIsActive] = useState(true)

  const openCreateDesigModal = () => {
    setEditingDesig(null)
    setDesigTitleBn("")
    setDesigTitleEn("")
    const nextPriority = designations.length > 0 ? Math.max(...designations.map((d) => d.priority || 0)) + 1 : 1
    setDesigPriority(nextPriority)
    setDesigDescription("")
    setDesigIsActive(true)
    setIsDesigModalOpen(true)
  }

  const openEditDesigModal = (item: DesignationItem) => {
    setEditingDesig(item)
    setDesigTitleBn(item.titleBn)
    setDesigTitleEn(item.titleEn)
    setDesigPriority(item.priority || 1)
    setDesigDescription(item.description || "")
    setDesigIsActive(item.isActive !== false)
    setIsDesigModalOpen(true)
  }

  const handleSaveDesignation = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!desigTitleBn.trim() || !desigTitleEn.trim()) {
      toast.error("পদবীর বাংলা ও ইংরেজি নাম আবশ্যক")
      return
    }

    try {
      if (editingDesig) {
        await updateDesignation({
          id: editingDesig.id,
          data: {
            titleBn: desigTitleBn.trim(),
            titleEn: desigTitleEn.trim(),
            priority: Number(desigPriority) || 1,
            description: desigDescription.trim() || null,
            isActive: desigIsActive,
          },
        }).unwrap()
        toast.success("পদবী সফলভাবে আপডেট করা হয়েছে")
      } else {
        await createDesignation({
          titleBn: desigTitleBn.trim(),
          titleEn: desigTitleEn.trim(),
          priority: Number(desigPriority) || 1,
          description: desigDescription.trim() || undefined,
          isActive: desigIsActive,
        }).unwrap()
        toast.success("নতুন পদবী সফলভাবে তৈরি হয়েছে")
      }
      setIsDesigModalOpen(false)
      refetchDesig()
    } catch (err: any) {
      toast.error(err?.data?.message || "পদবী সংরক্ষণ করতে ব্যর্থ হয়েছে")
    }
  }

  const handleDeleteDesignation = async (id: string, name: string) => {
    if (!confirm(`আপনি কি নিশ্চিত যে "${name}" পদবীটি মুছে ফেলতে চান?`)) return
    try {
      await deleteDesignation(id).unwrap()
      toast.success("পদবী মুছে ফেলা হয়েছে")
      refetchDesig()
    } catch (err: any) {
      toast.error(err?.data?.message || "পদবী মুছে ফেলতে ব্যর্থ হয়েছে")
    }
  }

  // ----------------------------------------------------------------------
  // Committee Form States
  // ----------------------------------------------------------------------
  const [isCommModalOpen, setIsCommModalOpen] = useState(false)
  const [editingComm, setEditingComm] = useState<CommitteeItem | null>(null)
  const [commName, setCommName] = useState("")
  const [commYear, setCommYear] = useState("২০২৫-২০২৬")
  const [commType, setCommType] = useState("EXECUTIVE")
  const [commDescription, setCommDescription] = useState("")
  const [commStatus, setCommStatus] = useState("PUBLISHED")

  const openCreateCommModal = () => {
    setEditingComm(null)
    setCommName("")
    setCommYear("২০২৬-২০২৭")
    setCommType("EXECUTIVE")
    setCommDescription("")
    setCommStatus("PUBLISHED")
    setIsCommModalOpen(true)
  }

  const openEditCommModal = (item: CommitteeItem) => {
    setEditingComm(item)
    setCommName(item.name)
    setCommYear(item.year)
    setCommType(item.type || "EXECUTIVE")
    setCommDescription(item.description || "")
    setCommStatus(item.status || "PUBLISHED")
    setIsCommModalOpen(true)
  }

  const handleSaveCommittee = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!commName.trim() || !commYear.trim()) {
      toast.error("কমিটির নাম ও মেয়াদ আবশ্যক")
      return
    }

    try {
      if (editingComm) {
        await updateCommittee({
          id: editingComm.id,
          data: {
            name: commName.trim(),
            year: commYear.trim(),
            type: commType,
            description: commDescription.trim() || null,
            status: commStatus,
          },
        }).unwrap()
        toast.success("কমিটি সফলভাবে আপডেট করা হয়েছে")
      } else {
        await createCommittee({
          name: commName.trim(),
          year: commYear.trim(),
          type: commType,
          description: commDescription.trim() || undefined,
          status: commStatus,
        }).unwrap()
        toast.success("নতুন কমিটি সফলভাবে তৈরি হয়েছে")
      }
      setIsCommModalOpen(false)
      refetchComm()
    } catch (err: any) {
      toast.error(err?.data?.message || "কমিটি সংরক্ষণ করতে ব্যর্থ হয়েছে")
    }
  }

  const handleDeleteCommittee = async (id: string, name: string) => {
    if (!confirm(`আপনি কি "${name}" কমিটিটি মুছে ফেলতে চান? এর সাথে যুক্ত সদস্যপদও মুছে যাবে।`)) return
    try {
      await deleteCommittee(id).unwrap()
      toast.success("কমিটি মুছে ফেলা হয়েছে")
      refetchComm()
    } catch (err: any) {
      toast.error(err?.data?.message || "কমিটি মুছে ফেলতে ব্যর্থ হয়েছে")
    }
  }

  // ----------------------------------------------------------------------
  // Member Form States & Search
  // ----------------------------------------------------------------------
  const [memberSearch, setMemberSearch] = useState("")
  const [isMemModalOpen, setIsMemModalOpen] = useState(false)
  const [editingMem, setEditingMem] = useState<MemberItem | null>(null)
  const [memNameBn, setMemNameBn] = useState("")
  const [memNameEn, setMemNameEn] = useState("")
  const [memPhone, setMemPhone] = useState("")
  const [memEmail, setMemEmail] = useState("")
  const [memBloodGroup, setMemBloodGroup] = useState("")
  const [memVillage, setMemVillage] = useState("")
  const [memUnion, setMemUnion] = useState("")
  const [memUpazila, setMemUpazila] = useState("রৌমারী")
  const [memDistrict, setMemDistrict] = useState("কুড়িগ্রাম")
  const [memOccupation, setMemOccupation] = useState("")
  const [memBio, setMemBio] = useState("")
  const [memPhotoUrl, setMemPhotoUrl] = useState("")
  const [memStatus, setMemStatus] = useState("ACTIVE")
  const [memCommId, setMemCommId] = useState("")
  const [memDesigId, setMemDesigId] = useState("")

  const openCreateMemModal = () => {
    setEditingMem(null)
    setMemNameBn("")
    setMemNameEn("")
    setMemPhone("")
    setMemEmail("")
    setMemBloodGroup("")
    setMemVillage("")
    setMemUnion("")
    setMemUpazila("রৌমারী")
    setMemDistrict("কুড়িগ্রাম")
    setMemOccupation("")
    setMemBio("")
    setMemPhotoUrl("")
    setMemStatus("ACTIVE")
    setMemCommId(committees[0]?.id || "")
    setMemDesigId(designations[0]?.id || "")
    setIsMemModalOpen(true)
  }

  const openEditMemModal = (item: MemberItem) => {
    setEditingMem(item)
    setMemNameBn(item.nameBn)
    setMemNameEn(item.nameEn)
    setMemPhone(item.phoneNumber)
    setMemEmail(item.email || "")
    setMemBloodGroup((item as any).bloodGroup || "")
    setMemVillage(item.village || "")
    setMemUnion(item.unionName || "")
    setMemUpazila(item.upazila || "রৌমারী")
    setMemDistrict(item.district || "কুড়িগ্রাম")
    setMemOccupation(item.occupation || "")
    setMemBio(item.bio || "")
    setMemPhotoUrl(item.photoUrl || "")
    setMemStatus(item.status || "ACTIVE")
    const primaryMembership = item.memberships?.[0]
    setMemCommId(primaryMembership?.committeeId || "")
    setMemDesigId(primaryMembership?.designationId || "")
    setIsMemModalOpen(true)
  }

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!memNameBn.trim() || !memNameEn.trim() || !memPhone.trim()) {
      toast.error("সদস্যের বাংলা নাম, ইংরেজি নাম ও মোবাইল নম্বর আবশ্যক")
      return
    }

    try {
      if (editingMem) {
        await updateMember({
          id: editingMem.id,
          data: {
            nameBn: memNameBn.trim(),
            nameEn: memNameEn.trim(),
            phoneNumber: memPhone.trim(),
            email: memEmail.trim() || null,
            bloodGroup: memBloodGroup.trim() || null,
            village: memVillage.trim() || null,
            unionName: memUnion.trim() || null,
            upazila: memUpazila.trim() || "রৌমারী",
            district: memDistrict.trim() || "কুড়িগ্রাম",
            occupation: memOccupation.trim() || null,
            bio: memBio.trim() || null,
            photoUrl: memPhotoUrl.trim() || null,
            status: memStatus,
            committeeId: memCommId || undefined,
            designationId: memDesigId || undefined,
          },
        }).unwrap()
        toast.success("সদস্যের তথ্য সফলভাবে আপডেট হয়েছে")
      } else {
        const res = await createMember({
          nameBn: memNameBn.trim(),
          nameEn: memNameEn.trim(),
          phoneNumber: memPhone.trim(),
          email: memEmail.trim() || undefined,
          bloodGroup: memBloodGroup.trim() || undefined,
          village: memVillage.trim() || undefined,
          unionName: memUnion.trim() || undefined,
          upazila: memUpazila.trim() || "রৌমারী",
          district: memDistrict.trim() || "কুড়িগ্রাম",
          occupation: memOccupation.trim() || undefined,
          bio: memBio.trim() || undefined,
          photoUrl: memPhotoUrl.trim() || undefined,
          committeeId: memCommId || undefined,
          designationId: memDesigId || undefined,
        }).unwrap()
        toast.success(`নতুন সদস্য নিবন্ধিত হয়েছে! বরাদ্দকৃত আইডি: ${res.memberId}`)
      }
      setIsMemModalOpen(false)
      refetchMem()
    } catch (err: any) {
      toast.error(err?.data?.message || "সদস্য সংরক্ষণ করতে ব্যর্থ হয়েছে")
    }
  }

  const handleDeleteMember = async (id: string, name: string) => {
    if (!confirm(`আপনি কি "${name}" এর সদস্যপদ স্থায়ীভাবে মুছে ফেলতে চান?`)) return
    try {
      await deleteMember(id).unwrap()
      toast.success("সদস্য রেকর্ড মুছে ফেলা হয়েছে")
      refetchMem()
    } catch (err: any) {
      toast.error(err?.data?.message || "সদস্য মুছে ফেলতে ব্যর্থ হয়েছে")
    }
  }

  // Robust extraction of member list regardless of envelope shape
  const memberList: MemberItem[] = useMemo(() => {
    if (!membersRes) return []
    if (Array.isArray(membersRes)) return membersRes
    if (Array.isArray((membersRes as any).items)) return (membersRes as any).items
    if (Array.isArray((membersRes as any).data)) return (membersRes as any).data
    return []
  }, [membersRes])

  const memberTotal: number = useMemo(() => {
    if (!membersRes) return 0
    if (typeof (membersRes as any).total === "number") return (membersRes as any).total
    return memberList.length
  }, [membersRes, memberList])

  // Filtered members by search keyword
  const filteredMembers = useMemo(() => {
    if (!memberSearch.trim()) return memberList
    const q = memberSearch.toLowerCase()
    return memberList.filter(
      (m) =>
        m.nameBn?.toLowerCase().includes(q) ||
        m.nameEn?.toLowerCase().includes(q) ||
        m.memberId?.toLowerCase().includes(q) ||
        m.phoneNumber?.includes(q)
    )
  }, [memberList, memberSearch])

  return (
    <div className="space-y-6">
      {/* Sub Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-3">
        <button
          onClick={() => setActiveTab("committees")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
            activeTab === "committees" ? "bg-[#D62828] text-white shadow-xs" : "bg-stone-100 text-stone-700 hover:bg-stone-200/70"
          }`}
        >
          <Award className="size-4" />
          <span>কমিটি তালিকা ({committees.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("members")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
            activeTab === "members" ? "bg-[#D62828] text-white shadow-xs" : "bg-stone-100 text-stone-700 hover:bg-stone-200/70"
          }`}
        >
          <Users className="size-4" />
          <span>নিবন্ধিত সদস্য ({memberTotal})</span>
        </button>
        <button
          onClick={() => setActiveTab("designations")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
            activeTab === "designations" ? "bg-[#D62828] text-white shadow-xs" : "bg-stone-100 text-stone-700 hover:bg-stone-200/70"
          }`}
        >
          <ShieldCheck className="size-4" />
          <span>পদবী কাঠামো ({designations.length})</span>
        </button>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* Tab 1: Committees (কমিটি তালিকা) */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === "committees" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
            <div>
              <h3 className="font-bold text-base text-stone-900">কার্যনির্বাহী ও উপদেষ্টা কমিটিসমূহ</h3>
              <p className="text-xs text-stone-500 mt-0.5">নতুন পরিষদ গঠন করুন, মেয়াদকাল নির্ধারণ করুন এবং পরিচালনা করুন</p>
            </div>
            <Button
              onClick={openCreateCommModal}
              className="bg-[#D62828] hover:bg-[#B91C1C] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs shrink-0"
            >
              <Plus className="size-4 mr-1.5" /> নতুন কমিটি গঠন
            </Button>
          </div>

          {isLoadingComm ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : committees.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-stone-300 p-12 text-center text-stone-500">
              <Award className="size-10 mx-auto text-stone-300 mb-2" />
              <p className="font-bold text-sm">কোনো কমিটি পাওয়া যায়নি</p>
              <p className="text-xs text-stone-400 mt-1">উপরে &quot;নতুন কমিটি গঠন&quot; বাটনে ক্লিক করে পরিষদ তৈরি করুন।</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {committees.map((c) => (
                <div
                  key={c.id}
                  className="bg-white rounded-2xl border border-stone-200 shadow-2xs hover:shadow-md transition p-5 flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-red-50 text-[#D62828] border border-red-200">
                        {c.type === "EXECUTIVE"
                          ? "কার্যনির্বাহী পরিষদ"
                          : c.type === "ADVISORY"
                          ? "উপদেষ্টা পরিষদ"
                          : c.type === "WORKING"
                          ? "ওয়ার্কিং কমিটি"
                          : c.type}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          c.status === "PUBLISHED" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {c.status === "PUBLISHED" ? "প্রকাশিত" : "ড্রাফট"}
                      </span>
                    </div>

                    <h4 className="font-bold text-base text-stone-900 group-hover:text-[#D62828] transition">{c.name}</h4>
                    <p className="text-xs text-stone-600 font-mono flex items-center gap-1.5">
                      <span className="text-stone-400 font-sans">মেয়াদকাল:</span> {c.year}
                    </p>
                    {c.description && <p className="text-xs text-stone-500 line-clamp-2">{c.description}</p>}
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-stone-600 font-semibold">
                      <Users className="size-3.5 text-[#D62828]" />
                      <span>{c.memberships?.length || 0} জন সদস্য</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openEditCommModal(c)}
                        className="p-1.5 rounded-lg text-stone-500 hover:text-[#D62828] hover:bg-stone-50 border border-stone-200 transition"
                        title="কমিটি সম্পাদনা"
                      >
                        <Edit2 className="size-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCommittee(c.id, c.name)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 border border-stone-200 transition"
                        title="কমিটি মুছে ফেলুন"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* Tab 2: Registered Members (নিবন্ধিত সদস্য) */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === "members" && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
            <div className="flex-1 max-w-md relative">
              <Search className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                placeholder="RJF আইডি, নাম বা ফোন নম্বর দিয়ে খুঁজুন..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:border-[#D62828] transition"
              />
            </div>
            <Button
              onClick={openCreateMemModal}
              className="bg-[#D62828] hover:bg-[#B91C1C] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs shrink-0"
            >
              <Plus className="size-4 mr-1.5" /> নতুন সদস্য নিবন্ধন
            </Button>
          </div>

          {isLoadingMem ? (
            <SkeletonTable rows={6} />
          ) : filteredMembers.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-stone-300 p-12 text-center text-stone-500">
              <Users className="size-10 mx-auto text-stone-300 mb-2" />
              <p className="font-bold text-sm">কোনো সদস্য পাওয়া যায়নি</p>
              <p className="text-xs text-stone-400 mt-1">
                {memberSearch ? "আপনার সার্চ কিওয়ার্ডের সাথে কোনো সদস্য মেলেনি।" : 'উপরে "নতুন সদস্য নিবন্ধন" বাটনে ক্লিক করুন।'}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="p-3.5">RJF মেম্বার আইডি</th>
                      <th className="p-3.5">নাম ও পরিচয়</th>
                      <th className="p-3.5">মোবাইল নম্বর</th>
                      <th className="p-3.5">কমিটি ও পদবী</th>
                      <th className="p-3.5">রক্তের গ্রুপ</th>
                      <th className="p-3.5">স্ট্যাটাস</th>
                      <th className="p-3.5 text-right">পদক্ষেপ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredMembers.map((m) => {
                      const primaryMembership = m.memberships?.[0]
                      return (
                        <tr key={m.id} className="hover:bg-stone-50/70 transition">
                          <td className="p-3.5 font-mono font-bold text-[#D62828] whitespace-nowrap">
                            <Link href={`/dashboard/committees/${m.id}`} className="hover:underline">
                              {m.memberId}
                            </Link>
                          </td>
                          <td className="p-3.5">
                            <div className="flex items-center gap-2.5">
                              <div className="relative size-9 rounded-full overflow-hidden bg-stone-100 border border-stone-200 shrink-0 flex items-center justify-center">
                                {m.photoUrl && (m.photoUrl.startsWith("http://") || m.photoUrl.startsWith("https://") || m.photoUrl.startsWith("/")) ? (
                                  <Image src={m.photoUrl} alt={m.nameBn} fill unoptimized sizes="36px" className="object-cover" />
                                ) : (
                                  <Users className="size-4 text-stone-400" />
                                )}
                              </div>
                              <div>
                                <Link
                                  href={`/dashboard/committees/${m.id}`}
                                  className="font-bold text-stone-900 hover:text-[#D62828] transition block"
                                >
                                  {m.nameBn}
                                </Link>
                                <span className="text-[11px] text-stone-500 font-normal block">{m.nameEn}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-3.5 font-mono text-stone-700 whitespace-nowrap">{m.phoneNumber}</td>
                          <td className="p-3.5 whitespace-nowrap">
                            {primaryMembership ? (
                              <div>
                                <span className="font-bold text-stone-800 block">
                                  {primaryMembership.designation?.titleBn || "পদবীবিহীন"}
                                </span>
                                <span className="text-[11px] text-stone-500 block">
                                  {primaryMembership.committee?.name || "কমিটি বরাদ্দ নেই"}
                                </span>
                              </div>
                            ) : (
                              <span className="text-stone-400 text-xs">অ্যাসাইন করা হয়নি</span>
                            )}
                          </td>
                          <td className="p-3.5 whitespace-nowrap">
                            {(m as any).bloodGroup ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                                {(m as any).bloodGroup}
                              </span>
                            ) : (
                              <span className="text-stone-400">—</span>
                            )}
                          </td>
                          <td className="p-3.5 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                m.status === "ACTIVE" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-stone-100 text-stone-600"
                              }`}
                            >
                              {m.status === "ACTIVE" ? "সক্রিয়" : m.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              <Link
                                href={`/dashboard/committees/${m.id}`}
                                className="p-1.5 rounded-lg text-stone-600 hover:text-[#D62828] hover:bg-red-50 border border-stone-200 transition"
                                title="সম্পূর্ণ প্রোফাইল দেখুন"
                              >
                                <Eye className="size-3.5" />
                              </Link>
                              <button
                                onClick={() => openEditMemModal(m)}
                                className="p-1.5 rounded-lg text-stone-600 hover:text-[#D62828] hover:bg-stone-50 border border-stone-200 transition"
                                title="সদস্য তথ্য এডিট করুন"
                              >
                                <Edit2 className="size-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteMember(m.id, m.nameBn)}
                                className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 border border-stone-200 transition"
                                title="সদস্য মুছে ফেলুন"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* Tab 3: Designations (পদবী কাঠামো - Super Admin Full CRUD) */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === "designations" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
            <div>
              <h3 className="font-bold text-base text-stone-900">ফাউন্ডেশন পদবী কাঠামো ও ক্রমবিন্যাস</h3>
              <p className="text-xs text-stone-500 mt-0.5">
                সুপার অ্যাডমিন প্যানেল থেকে যেকোনো নতুন পদবী তৈরি করুন, নাম পরিবর্তন বা অগ্রাধিকার ক্রম নির্ধারণ করুন
              </p>
            </div>
            <Button
              onClick={openCreateDesigModal}
              className="bg-[#D62828] hover:bg-[#B91C1C] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs shrink-0"
            >
              <Plus className="size-4 mr-1.5" /> নতুন পদবী তৈরি করুন
            </Button>
          </div>

          {isLoadingDesig ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : designations.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-stone-300 p-12 text-center text-stone-500">
              <ShieldCheck className="size-10 mx-auto text-stone-300 mb-2" />
              <p className="font-bold text-sm">কোনো পদবী পাওয়া যায়নি</p>
              <p className="text-xs text-stone-400 mt-1">উপরে &quot;নতুন পদবী তৈরি করুন&quot; বাটনে ক্লিক করে পদবী যুক্ত করুন।</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
              {designations.map((d) => (
                <div
                  key={d.id}
                  className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:shadow-md transition flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-stone-500 font-mono bg-stone-100 px-2 py-0.5 rounded-md">
                        অগ্রাধিকার: #{d.priority}
                      </span>
                      {d.isActive ? (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          সক্রিয়
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">নিষ্ক্রিয়</span>
                      )}
                    </div>
                    <h4 className="font-bold text-sm text-stone-900 group-hover:text-[#D62828] transition">{d.titleBn}</h4>
                    <p className="text-xs text-stone-500 font-medium">{d.titleEn}</p>
                    {d.description && <p className="text-[11px] text-stone-400 line-clamp-2 mt-1">{d.description}</p>}
                  </div>

                  <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[10px] text-stone-400 font-mono">{d.slug}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openEditDesigModal(d)}
                        className="p-1.5 rounded-lg text-stone-500 hover:text-[#D62828] hover:bg-stone-50 border border-stone-200 transition"
                        title="পদবী সম্পাদনা করুন"
                      >
                        <Edit2 className="size-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteDesignation(d.id, d.titleBn)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 border border-stone-200 transition"
                        title="পদবী মুছে ফেলুন"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* Modal 1: Create / Edit Designation */}
      {/* ---------------------------------------------------------------------- */}
      {isDesigModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setIsDesigModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                <ShieldCheck className="size-4 text-[#D62828]" />
                <span>{editingDesig ? "পদবী সম্পাদনা করুন" : "নতুন পদবী তৈরি করুন"}</span>
              </h3>
              <button
                onClick={() => setIsDesigModalOpen(false)}
                className="w-7 h-7 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center hover:bg-stone-200 transition"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleSaveDesignation} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">পদবীর নাম (বাংলায়) *</label>
                <input
                  type="text"
                  required
                  value={desigTitleBn}
                  onChange={(e) => setDesigTitleBn(e.target.value)}
                  placeholder="যেমন: সভাপতি / সাধারণ সম্পাদক / সমন্বয়ক"
                  className="w-full p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#D62828] bg-stone-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Designation Name (English) *</label>
                <input
                  type="text"
                  required
                  value={desigTitleEn}
                  onChange={(e) => setDesigTitleEn(e.target.value)}
                  placeholder="e.g. President / General Secretary / Coordinator"
                  className="w-full p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#D62828] bg-stone-50 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">অগ্রাধিকার ক্রম (Priority) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={desigPriority}
                    onChange={(e) => setDesigPriority(Number(e.target.value))}
                    placeholder="1, 2, 3..."
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#D62828] bg-stone-50 focus:bg-white"
                  />
                  <span className="text-[10px] text-stone-400 block mt-0.5">ছোট সংখ্যা শীর্ষে দেখাবে (যেমন: ১=সভাপতি)</span>
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">স্ট্যাটাস</label>
                  <select
                    value={desigIsActive ? "true" : "false"}
                    onChange={(e) => setDesigIsActive(e.target.value === "true")}
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#D62828] bg-stone-50 focus:bg-white"
                  >
                    <option value="true">সক্রিয় (Active)</option>
                    <option value="false">নিষ্ক্রিয় (Inactive)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">দায়িত্ব বা বিবরণ (ঐচ্ছিক)</label>
                <textarea
                  rows={2}
                  value={desigDescription}
                  onChange={(e) => setDesigDescription(e.target.value)}
                  placeholder="পদবীর দায়িত্ব বা বিবরণ..."
                  className="w-full p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#D62828] bg-stone-50 focus:bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsDesigModalOpen(false)}>
                  বাতিল
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isCreatingDesig || isUpdatingDesig}
                  className="bg-[#D62828] hover:bg-[#B91C1C] text-white"
                >
                  {isCreatingDesig || isUpdatingDesig ? <Loader2 className="size-3.5 animate-spin mr-1" /> : null}
                  {editingDesig ? "আপডেট করুন" : "সংরক্ষণ করুন"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* Modal 2: Create / Edit Committee */}
      {/* ---------------------------------------------------------------------- */}
      {isCommModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setIsCommModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                <Award className="size-4 text-[#D62828]" />
                <span>{editingComm ? "কমিটি সম্পাদনা করুন" : "নতুন কমিটি গঠন করুন"}</span>
              </h3>
              <button
                onClick={() => setIsCommModalOpen(false)}
                className="w-7 h-7 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center hover:bg-stone-200 transition"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCommittee} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">কমিটির নাম *</label>
                <input
                  type="text"
                  required
                  value={commName}
                  onChange={(e) => setCommName(e.target.value)}
                  placeholder="যেমন: ৯ম কার্যনির্বাহী পরিষদ"
                  className="w-full p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#D62828] bg-stone-50 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">মেয়াদকাল / সাল *</label>
                  <input
                    type="text"
                    required
                    value={commYear}
                    onChange={(e) => setCommYear(e.target.value)}
                    placeholder="যেমন: ২০২৬-২০২৭"
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#D62828] bg-stone-50 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">কমিটির টাইপ</label>
                  <select
                    value={commType}
                    onChange={(e) => setCommType(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#D62828] bg-stone-50 focus:bg-white"
                  >
                    <option value="EXECUTIVE">কার্যনির্বাহী পরিষদ</option>
                    <option value="ADVISORY">উপদেষ্টা পরিষদ</option>
                    <option value="WORKING">ওয়ার্কিং কমিটি</option>
                    <option value="SPECIAL">বিশেষ টাস্কফোর্স</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">স্ট্যাটাস</label>
                <select
                  value={commStatus}
                  onChange={(e) => setCommStatus(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#D62828] bg-stone-50 focus:bg-white"
                >
                  <option value="PUBLISHED">প্রকাশিত (Published)</option>
                  <option value="DRAFT">ড্রাফট (Draft)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">কমিটির বিবরণ (ঐচ্ছিক)</label>
                <textarea
                  rows={2}
                  value={commDescription}
                  onChange={(e) => setCommDescription(e.target.value)}
                  placeholder="কমিটির ভূমিকা বা লক্ষ্য..."
                  className="w-full p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#D62828] bg-stone-50 focus:bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsCommModalOpen(false)}>
                  বাতিল
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isCreatingComm || isUpdatingComm}
                  className="bg-[#D62828] hover:bg-[#B91C1C] text-white"
                >
                  {isCreatingComm || isUpdatingComm ? <Loader2 className="size-3.5 animate-spin mr-1" /> : null}
                  {editingComm ? "আপডেট করুন" : "সংরক্ষণ করুন"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* Modal 3: Create / Edit Member */}
      {/* ---------------------------------------------------------------------- */}
      {isMemModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
          onClick={() => setIsMemModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 space-y-4 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                <Users className="size-4 text-[#D62828]" />
                <span>{editingMem ? `সদস্য তথ্য সম্পাদনা (${editingMem.memberId})` : "নতুন সদস্য নিবন্ধন ও আইডি বরাদ্দ"}</span>
              </h3>
              <button
                onClick={() => setIsMemModalOpen(false)}
                className="w-7 h-7 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center hover:bg-stone-200 transition"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">নাম (বাংলায়) *</label>
                  <input
                    type="text"
                    required
                    value={memNameBn}
                    onChange={(e) => setMemNameBn(e.target.value)}
                    placeholder="যেমন: মোঃ আফতাব উদ্দিন"
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#D62828] bg-stone-50 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Name (English) *</label>
                  <input
                    type="text"
                    required
                    value={memNameEn}
                    onChange={(e) => setMemNameEn(e.target.value)}
                    placeholder="e.g. Md. Aftab Uddin"
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#D62828] bg-stone-50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">মোবাইল নম্বর *</label>
                  <input
                    type="text"
                    required
                    value={memPhone}
                    onChange={(e) => setMemPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#D62828] bg-stone-50 focus:bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">রক্তের গ্রুপ (ঐচ্ছিক)</label>
                  <select
                    value={memBloodGroup}
                    onChange={(e) => setMemBloodGroup(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#D62828] bg-stone-50 focus:bg-white"
                  >
                    <option value="">নির্বাচন করুন</option>
                    <option value="A+">A+ (A Positive)</option>
                    <option value="A-">A- (A Negative)</option>
                    <option value="B+">B+ (B Positive)</option>
                    <option value="B-">B- (B Negative)</option>
                    <option value="O+">O+ (O Positive)</option>
                    <option value="O-">O- (O Negative)</option>
                    <option value="AB+">AB+ (AB Positive)</option>
                    <option value="AB-">AB- (AB Negative)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">ইমেইল (ঐচ্ছিক)</label>
                  <input
                    type="email"
                    value={memEmail}
                    onChange={(e) => setMemEmail(e.target.value)}
                    placeholder="member@email.com"
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#D62828] bg-stone-50 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">পেশা (ঐচ্ছিক)</label>
                  <input
                    type="text"
                    value={memOccupation}
                    onChange={(e) => setMemOccupation(e.target.value)}
                    placeholder="যেমন: শিক্ষক / ব্যবসায়ী / সমাজসেবক"
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#D62828] bg-stone-50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">কমিটি নির্বাচন (ঐচ্ছিক)</label>
                  <select
                    value={memCommId}
                    onChange={(e) => setMemCommId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#D62828] bg-stone-50 focus:bg-white"
                  >
                    <option value="">কমিটি নির্বাচন করুন</option>
                    {committees.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.year})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">পদবী নির্বাচন (ঐচ্ছিক)</label>
                  <select
                    value={memDesigId}
                    onChange={(e) => setMemDesigId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#D62828] bg-stone-50 focus:bg-white"
                  >
                    <option value="">পদবী নির্বাচন করুন</option>
                    {designations.map((d) => (
                      <option key={d.id} value={d.id}>
                        #{d.priority} - {d.titleBn} ({d.titleEn})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">গ্রাম / এলাকা</label>
                  <input
                    type="text"
                    value={memVillage}
                    onChange={(e) => setMemVillage(e.target.value)}
                    placeholder="গ্রামের নাম"
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#D62828] bg-stone-50 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">ইউনিয়ন</label>
                  <input
                    type="text"
                    value={memUnion}
                    onChange={(e) => setMemUnion(e.target.value)}
                    placeholder="ইউনিয়নের নাম"
                    className="w-full p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#D62828] bg-stone-50 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">ছবি বা প্রোফাইল ইমেজ লিংক (URL)</label>
                <input
                  type="url"
                  value={memPhotoUrl}
                  onChange={(e) => setMemPhotoUrl(e.target.value)}
                  placeholder="https://... (ইমেজ লিংক)"
                  className="w-full p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#D62828] bg-stone-50 focus:bg-white font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">সংক্ষিপ্ত পরিচিতি / বায়ো (ঐচ্ছিক)</label>
                <textarea
                  rows={2}
                  value={memBio}
                  onChange={(e) => setMemBio(e.target.value)}
                  placeholder="সদস্যের অবদান বা তথ্য..."
                  className="w-full p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#D62828] bg-stone-50 focus:bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsMemModalOpen(false)}>
                  বাতিল
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isCreatingMem || isUpdatingMem}
                  className="bg-[#D62828] hover:bg-[#B91C1C] text-white"
                >
                  {isCreatingMem || isUpdatingMem ? <Loader2 className="size-3.5 animate-spin mr-1" /> : null}
                  {editingMem ? "তথ্য আপডেট করুন" : "নিবন্ধন ও মেম্বার আইডি বরাদ্দ করুন"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
