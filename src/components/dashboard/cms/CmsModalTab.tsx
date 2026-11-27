"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { DashboardModal } from "@/components/dashboard/DashboardModal"
import {
  Megaphone,
  Plus,
  Calendar,
  Clock,
  Phone,
  MapPin,
  Heart,
  CheckCircle2,
  XCircle,
  Edit2,
  Trash2,
  Eye,
  Loader2,
  AlertTriangle,
  X,
  ExternalLink,
} from "lucide-react"
import {
  useGetAdminNoticeModalsQuery,
  useCreateAdminNoticeModalMutation,
  useUpdateAdminNoticeModalMutation,
  useToggleAdminNoticeModalStatusMutation,
  useDeleteAdminNoticeModalMutation,
} from "@/store/api/adminApi"
import { NoticeModalItem } from "@/store/api/contentApi"
import { Button } from "@/components/ui/button"
import { SkeletonTable } from "@/components/ui/skeleton"
import { toast } from "sonner"

export function CmsModalTab() {
  const { data: modals = [], isLoading, refetch } = useGetAdminNoticeModalsQuery()
  const [createModal, { isLoading: isCreating }] = useCreateAdminNoticeModalMutation()
  const [updateModal, { isLoading: isUpdating }] = useUpdateAdminNoticeModalMutation()
  const [toggleStatus] = useToggleAdminNoticeModalStatusMutation()
  const [deleteModal, { isLoading: isDeleting }] = useDeleteAdminNoticeModalMutation()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingModal, setEditingModal] = useState<NoticeModalItem | null>(null)
  const [previewModal, setPreviewModal] = useState<NoticeModalItem | null>(null)

  // Form states
  const [headerTitle, setHeaderTitle] = useState("জরুরি জনকল্যাণ নোটিশ ও ঘোষণা")
  const [badge, setBadge] = useState("শীতবস্ত্র ও জরুরি মানবিক ত্রাণ ঘোষণা")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [hotline, setHotline] = useState("+880 1712-345678")
  const [address, setAddress] = useState("ভোলামোড়, রৌমারী উপজেলা, রংপুর, বাংলাদেশ (৫৬৪০)")
  const [primaryBtnText, setPrimaryBtnText] = useState("অনুদান দিন")
  const [primaryBtnLink, setPrimaryBtnLink] = useState("/donate")
  const [secondaryBtnText, setSecondaryBtnText] = useState("স্বেচ্ছাসেবক হন")
  const [secondaryBtnLink, setSecondaryBtnLink] = useState("/volunteer")
  const [imageUrl, setImageUrl] = useState("")
  const [isActive, setIsActive] = useState(true)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [displayFrequency, setDisplayFrequency] = useState("ONCE_PER_DAY")

  const openCreateDialog = () => {
    setEditingModal(null)
    setHeaderTitle("জরুরি জনকল্যাণ নোটিশ ও ঘোষণা")
    setBadge("শীতবস্ত্র ও জরুরি মানবিক ত্রাণ ঘোষণা")
    setTitle("")
    setDescription("")
    setHotline("+880 1712-345678")
    setAddress("ভোলামোড়, রৌমারী উপজেলা, রংপুর, বাংলাদেশ (৫৬৪০)")
    setPrimaryBtnText("অনুদান দিন")
    setPrimaryBtnLink("/donate")
    setSecondaryBtnText("স্বেচ্ছাসেবক হন")
    setSecondaryBtnLink("/volunteer")
    setImageUrl("")
    setIsActive(true)
    setStartDate("")
    setEndDate("")
    setDisplayFrequency("ONCE_PER_DAY")
    setIsDialogOpen(true)
  }

  const openEditDialog = (item: NoticeModalItem) => {
    setEditingModal(item)
    setHeaderTitle(item.headerTitle || "জরুরি জনকল্যাণ নোটিশ ও ঘোষণা")
    setBadge(item.badge || "")
    setTitle(item.title)
    setDescription(item.description)
    setHotline(item.hotline || "+880 1712-345678")
    setAddress(item.address || "")
    setPrimaryBtnText(item.primaryBtnText || "অনুদান দিন")
    setPrimaryBtnLink(item.primaryBtnLink || "/donate")
    setSecondaryBtnText(item.secondaryBtnText || "স্বেচ্ছাসেবক হন")
    setSecondaryBtnLink(item.secondaryBtnLink || "/volunteer")
    setImageUrl(item.imageUrl || "")
    setIsActive(item.isActive)
    setStartDate(item.startDate ? new Date(item.startDate).toISOString().slice(0, 16) : "")
    setEndDate(item.endDate ? new Date(item.endDate).toISOString().slice(0, 16) : "")
    setDisplayFrequency(item.displayFrequency || "ONCE_PER_DAY")
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !description.trim()) {
      toast.error("শিরোনাম ও বিস্তারিত বিবরণ আবশ্যক")
      return
    }

    const payload = {
      headerTitle: headerTitle.trim(),
      badge: badge.trim(),
      title: title.trim(),
      description: description.trim(),
      hotline: hotline.trim(),
      address: address.trim(),
      primaryBtnText: primaryBtnText.trim(),
      primaryBtnLink: primaryBtnLink.trim(),
      secondaryBtnText: secondaryBtnText.trim(),
      secondaryBtnLink: secondaryBtnLink.trim(),
      imageUrl: imageUrl.trim() || null,
      isActive,
      startDate: startDate ? new Date(startDate).toISOString() : null,
      endDate: endDate ? new Date(endDate).toISOString() : null,
      displayFrequency,
    }

    try {
      if (editingModal) {
        await updateModal({ id: editingModal.id, data: payload }).unwrap()
        toast.success("পপআপ নোটিশ সফলভাবে আপডেট হয়েছে")
      } else {
        await createModal(payload).unwrap()
        toast.success("নতুন পপআপ নোটিশ সফলভাবে যুক্ত হয়েছে")
      }
      setIsDialogOpen(false)
      refetch()
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "সংরক্ষণ ব্যর্থ হয়েছে")
    }
  }

  const handleToggle = async (id: string) => {
    try {
      await toggleStatus(id).unwrap()
      toast.success("স্ট্যাটাস পরিবর্তন হয়েছে")
      refetch()
    } catch {
      toast.error("স্ট্যাটাস পরিবর্তন ব্যর্থ হয়েছে")
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`আপনি কি নিশ্চিত যে '${name}' নোটিশটি মুছে ফেলতে চান?`)) return
    try {
      await deleteModal(id).unwrap()
      toast.success("নোটিশ মুছে ফেলা হয়েছে")
      refetch()
    } catch {
      toast.error("মুছে ফেলা ব্যর্থ হয়েছে")
    }
  }

  const isExpired = (endDate?: string | null) => {
    if (!endDate) return false
    return new Date(endDate).getTime() < Date.now()
  }

  const isScheduled = (startDate?: string | null) => {
    if (!startDate) return false
    return new Date(startDate).getTime() > Date.now()
  }

  return (
    <div className="space-y-6">
      {/* Top Banner & Action */}
      <div className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#D62828] text-xs font-bold mb-1.5 border border-red-200">
            <Megaphone className="w-3.5 h-3.5" />
            <span>হোমপেজ পপআপ মডাল ও জরুরি নোটিশ</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
            জরুরি নোটিশ পপআপ (Modal Management)
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
            হোমপেজে দর্শনার্থীদের প্রদর্শিত জরুরি নোটিশ তৈরি, সময়সীমা (Time Limit) নির্ধারণ ও সক্রিয়/নিষ্ক্রিয় করুন।
          </p>
        </div>

        <Button
          onClick={openCreateDialog}
          className="bg-[#D62828] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন নোটিশ তৈরি</span>
        </Button>
      </div>

      {/* Notice List Table */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
        {isLoading ? (
          <div className="p-4">
            <SkeletonTable rows={4} columns={6} showToolbar={false} showPagination={false} />
          </div>
        ) : modals.length === 0 ? (
          <div className="p-12 text-center text-stone-500 space-y-3">
            <Megaphone className="w-10 h-10 mx-auto text-stone-300" />
            <p className="font-semibold text-stone-800">কোনো পপআপ নোটিশ তৈরি করা হয়নি</p>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              নতুন নোটিশ তৈরি করতে ওপরের &ldquo;নতুন নোটিশ তৈরি&rdquo; বাটনে ক্লিক করুন।
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-50 text-stone-600 border-b border-stone-200 font-bold uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">শিরোনাম ও ব্যাজ</th>
                  <th className="py-3 px-4">সময়সীমা (Time Limit)</th>
                  <th className="py-3 px-4">হটলাইন ও লিঙ্ক</th>
                  <th className="py-3 px-4 text-center">স্ট্যাটাস</th>
                  <th className="py-3 px-4 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {modals.map((item) => {
                  const expired = isExpired(item.endDate)
                  const scheduled = isScheduled(item.startDate)

                  return (
                    <tr key={item.id} className="hover:bg-stone-50/60 transition">
                      <td className="py-3.5 px-4 max-w-xs sm:max-w-md">
                        <div className="space-y-1">
                          <span className="inline-block px-2 py-0.5 rounded-md bg-red-50 text-[#D62828] border border-red-200 text-[10px] font-bold">
                            {item.badge || "সাধারণ ঘোষণা"}
                          </span>
                          <h4 className="font-bold text-stone-900 leading-snug line-clamp-2 hover:text-[#D62828] transition">
                            <Link href={`/dashboard/modal/${item.id}`}>
                              {item.title}
                            </Link>
                          </h4>
                          <p className="text-xs text-stone-500 line-clamp-1">{item.description}</p>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-xs whitespace-nowrap">
                        <div className="space-y-1">
                          {item.startDate && (
                            <div className="flex items-center gap-1 text-stone-600">
                              <Calendar className="w-3 h-3 text-stone-400" />
                              <span>শুরু: {new Date(item.startDate).toLocaleDateString("bn-BD")}</span>
                            </div>
                          )}
                          {item.endDate && (
                            <div className="flex items-center gap-1 text-stone-600">
                              <Clock className="w-3 h-3 text-stone-400" />
                              <span>শেষ: {new Date(item.endDate).toLocaleDateString("bn-BD")}</span>
                            </div>
                          )}
                          {!item.startDate && !item.endDate && (
                            <span className="text-stone-400 italic">সার্বক্ষণিক সক্রিয়</span>
                          )}

                          {expired && (
                            <span className="inline-block text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                              মেয়াদোত্তীর্ণ (Expired)
                            </span>
                          )}
                          {scheduled && (
                            <span className="inline-block text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                              আসন্ন (Scheduled)
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-xs whitespace-nowrap">
                        <div className="space-y-1 text-stone-600">
                          <div className="flex items-center gap-1 font-mono font-semibold">
                            <Phone className="w-3 h-3 text-[#D62828]" />
                            <span>{item.hotline}</span>
                          </div>
                          <span className="text-[11px] text-stone-500 block truncate max-w-[160px]">
                            {item.primaryBtnText} → {item.primaryBtnLink}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => handleToggle(item.id)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                            item.isActive && !expired
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                              : "bg-stone-100 text-stone-500 border border-stone-200 hover:bg-stone-200"
                          }`}
                          title="স্ট্যাটাস পরিবর্তন করতে ক্লিক করুন"
                        >
                          {item.isActive && !expired ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>সক্রিয় (Active)</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5 text-stone-400" />
                              <span>নিষ্ক্রিয় (Inactive)</span>
                            </>
                          )}
                        </button>
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <Link
                            href={`/dashboard/modal/${item.id}`}
                            className="p-1.5 rounded-lg text-stone-600 hover:text-[#D62828] hover:bg-stone-100 transition cursor-pointer"
                            title="বিস্তারিত পেজ দেখুন"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => openEditDialog(item)}
                            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                            title="সম্পাদনা করুন"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id, item.title)}
                            disabled={isDeleting}
                            className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition cursor-pointer"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Modal Dialog */}
      {isDialogOpen && (
        <DashboardModal>
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-2xl w-full my-4 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-[#D62828]" />
                <h3 className="font-bold text-lg text-stone-900">
                  {editingModal ? "পপআপ নোটিশ সম্পাদনা" : "নতুন পপআপ নোটিশ তৈরি"}
                </h3>
              </div>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Header Title & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    ব্যানার শিরোনাম (Header Title)
                  </label>
                  <input
                    type="text"
                    value={headerTitle}
                    onChange={(e) => setHeaderTitle(e.target.value)}
                    placeholder="যেমন: জরুরি জনকল্যাণ নোটিশ ও ঘোষণা"
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-[#D62828]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    ক্যাটাগরি ব্যাজ (Badge Text)
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="যেমন: শীতবস্ত্র ও জরুরি মানবিক ত্রাণ ঘোষণা"
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-[#D62828]"
                  />
                </div>
              </div>

              {/* Main Title */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  মূল শিরোনাম (Main Title) *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="যেমন: রৌমারী ও দুর্গম চরাঞ্চলের শীতার্ত পরিবারের পাশে দাঁড়ান"
                  className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-[#D62828] font-bold"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  বিস্তারিত বিবরণ (Description) *
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="নোটিশের বিস্তারিত বক্তব্য..."
                  className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-[#D62828]"
                />
              </div>

              {/* Hotline & Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    হটলাইন নম্বর (Hotline Phone)
                  </label>
                  <input
                    type="text"
                    value={hotline}
                    onChange={(e) => setHotline(e.target.value)}
                    placeholder="+880 1712-345678"
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-[#D62828] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    ঠিকানা (Address)
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="ভোলামোড়, রৌমারী উপজেলা, রংপুর, বাংলাদেশ (৫৬৪০)"
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-[#D62828]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    প্রাথমিক বাটন লেখা ও লিংক
                  </label>
                  <div className="space-y-1.5">
                    <input
                      type="text"
                      value={primaryBtnText}
                      onChange={(e) => setPrimaryBtnText(e.target.value)}
                      placeholder="বাটন টেক্সট (যেমন: অনুদান দিন)"
                      className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white"
                    />
                    <input
                      type="text"
                      value={primaryBtnLink}
                      onChange={(e) => setPrimaryBtnLink(e.target.value)}
                      placeholder="লিঙ্ক (যেমন: /donate)"
                      className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    দ্বিতীয় বাটন লেখা ও লিংক
                  </label>
                  <div className="space-y-1.5">
                    <input
                      type="text"
                      value={secondaryBtnText}
                      onChange={(e) => setSecondaryBtnText(e.target.value)}
                      placeholder="বাটন টেক্সট (যেমন: স্বেচ্ছাসেবক হন)"
                      className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white"
                    />
                    <input
                      type="text"
                      value={secondaryBtnLink}
                      onChange={(e) => setSecondaryBtnLink(e.target.value)}
                      placeholder="লিঙ্ক (যেমন: /volunteer)"
                      className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Time Limits (Start Date & End Date) */}
              <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-200/80 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                  <Clock className="w-4 h-4 text-amber-700" />
                  <span>সময়সীমা নির্ধারণ (Time Limit & Scheduling)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">
                      শুরুর তারিখ ও সময় (Start Date)
                    </label>
                    <input
                      type="datetime-local"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white"
                    />
                    <span className="text-[10px] text-stone-500">ফাঁকা রাখলে সাথে সাথে শুরু হবে</span>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">
                      শেষের তারিখ ও সময় (End Date / Expiry)
                    </label>
                    <input
                      type="datetime-local"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white"
                    />
                    <span className="text-[10px] text-stone-500">মেয়াদ উত্তীর্ণ হলে স্বয়ংক্রিয়ভাবে বন্ধ হবে</span>
                  </div>
                </div>
              </div>

              {/* Active Toggle & Frequency */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 text-[#D62828] rounded border-stone-300 focus:ring-[#D62828]"
                  />
                  <span className="text-xs font-bold text-stone-800">
                    নোটিশটি সরাসরি সক্রিয় থাকবে (Active Status)
                  </span>
                </label>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-stone-600 font-semibold">প্রদর্শন পুনরাবৃত্তি:</span>
                  <select
                    value={displayFrequency}
                    onChange={(e) => setDisplayFrequency(e.target.value)}
                    className="px-2.5 py-1 rounded-lg border border-stone-300 bg-white text-xs font-bold"
                  >
                    <option value="ONCE_PER_DAY">দিনে একবার (Once per Day)</option>
                    <option value="EVERY_SESSION">প্রতি সেশনে (Every Session)</option>
                    <option value="ALWAYS">সবসময় (Always)</option>
                  </select>
                </div>
              </div>

              {/* Dialog Actions */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="text-xs border-stone-300"
                >
                  বাতিল
                </Button>
                <Button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="bg-[#D62828] hover:bg-[#B91C1C] text-white font-bold text-xs px-5 flex items-center gap-1.5"
                >
                  {isCreating || isUpdating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : editingModal ? (
                    "আপডেট করুন"
                  ) : (
                    "তৈরি করুন"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </DashboardModal>
      )}

      {/* Live Preview Modal Popup */}
      {previewModal && (
        <DashboardModal onBackdropClick={() => setPreviewModal(null)}>
          <div
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border-2 border-red-500 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Banner Top */}
            <div className="bg-red-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm md:text-base">
                <span className="animate-ping inline-flex h-2.5 w-2.5 rounded-full bg-white opacity-75 mr-1" />
                <Megaphone className="w-4 h-4 text-white shrink-0" />
                <span>{previewModal.headerTitle || "জরুরি জনকল্যাণ নোটিশ ও ঘোষণা"}</span>
              </div>
              <button
                onClick={() => setPreviewModal(null)}
                className="w-8 h-8 rounded-full bg-red-800 text-red-100 flex items-center justify-center hover:bg-red-900 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Optional Modal Image Preview */}
            {previewModal.imageUrl && (previewModal.imageUrl.startsWith("http://") || previewModal.imageUrl.startsWith("https://") || previewModal.imageUrl.startsWith("/")) && (
              <div className="relative w-full h-36 sm:h-44 bg-stone-100 border-b border-stone-200 overflow-hidden">
                <Image
                  src={previewModal.imageUrl}
                  alt={previewModal.title}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 500px"
                />
              </div>
            )}

            <div className="p-6">
              <div className="mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
                  {previewModal.badge || "শীতবস্ত্র ও জরুরি মানবিক ত্রাণ ঘোষণা"}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-stone-900 mt-2">
                  {previewModal.title}
                </h3>
                <p className="text-xs md:text-sm text-stone-600 mt-2 leading-relaxed">
                  {previewModal.description}
                </p>
              </div>

              <div className="p-3.5 bg-red-50 rounded-xl border border-red-200 text-xs text-red-950 mb-5 flex items-center justify-between">
                <div>
                  <span className="font-bold block">২৪/৭ কেন্দ্রীয় জরুরি হটলাইন ও ঠিকানা:</span>
                  <span className="font-mono font-bold text-sm text-red-800">
                    {previewModal.hotline || "+880 1712-345678"}
                  </span>
                  <span className="text-[11px] text-stone-600 block mt-0.5">
                    {previewModal.address || "ভোলামোড়, রৌমারী উপজেলা, রংপুর, বাংলাদেশ (৫৬৪০)"}
                  </span>
                </div>
                <span className="px-3 py-1.5 bg-[#D62828] text-white rounded-lg text-xs font-semibold flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>{previewModal.primaryBtnText || "অনুদান দিন"}</span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <span className="py-2.5 px-3 rounded-xl bg-[#D62828] text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-sm">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>{previewModal.primaryBtnText || "অনুদান দিন"}</span>
                </span>
                <span className="py-2.5 px-3 rounded-xl border border-stone-300 text-stone-800 text-xs font-semibold text-center flex items-center justify-center gap-1.5">
                  <span>{previewModal.secondaryBtnText || "স্বেচ্ছাসেবক হন"}</span>
                </span>
              </div>

              <div className="text-center pt-2 border-t border-stone-100">
                <span className="text-xs text-stone-400 underline">
                  আজকের জন্য আর দেখাবেন না
                </span>
              </div>
            </div>
          </div>
        </DashboardModal>
      )}
    </div>
  )
}
