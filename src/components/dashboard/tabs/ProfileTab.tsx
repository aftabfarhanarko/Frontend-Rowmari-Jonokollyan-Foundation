"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ROLE_METAS } from "@/config/dashboard-navigation"
import { uploadToImgbb, validateImageFile } from "@/lib/utils/imgbb"
import { toast } from "sonner"
import { UserCheck, Loader2, Camera, Upload, CheckCircle2, Save } from "lucide-react"

interface ProfileTabProps {
  currentUser: any
  currentRole: string
  updateProfileMutation: any
  refetchCurrentUser?: () => void
}

export function ProfileTab({ currentUser, currentRole, updateProfileMutation, refetchCurrentUser }: ProfileTabProps) {
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const avatarInputRef = useRef<HTMLInputElement>(null)

  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [district, setDistrict] = useState("")
  const [upazila, setUpazila] = useState("")
  const [address, setAddress] = useState("")

  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.fullName || "")
      setPhone(currentUser.phone || "")
      setDistrict(currentUser.district || "Kurigram")
      setUpazila(currentUser.upazila || "Roumari")
      setAddress(currentUser.address || "")
    }
  }, [currentUser])

  const handleAvatarSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const validation = validateImageFile(file, 10)
    if (!validation.valid) {
      toast.error(validation.error || "অকার্যকর ছবি ফাইল")
      return
    }
    setAvatarPreview(URL.createObjectURL(file))
    setIsUploadingAvatar(true)
    try {
      toast.info("প্রোফাইল ছবি ImgBB ক্লাউডে আপলোড হচ্ছে...")
      const res = await uploadToImgbb(file)
      if (res?.url) {
        await updateProfileMutation({ avatarUrl: res.url }).unwrap()
        toast.success("প্রোফাইল ছবি সফলভাবে ক্লাউডে আপলোড হয়েছে!")
        refetchCurrentUser?.()
      }
    } catch (err: any) {
      setAvatarPreview(null)
      toast.error(err?.message || "ছবি আপলোড ব্যর্থ হয়েছে")
    } finally {
      setIsUploadingAvatar(false)
    }
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName.trim() || !phone.trim()) {
      toast.error("নাম ও মোবাইল নম্বর আবশ্যক")
      return
    }
    setIsSavingProfile(true)
    try {
      await updateProfileMutation({ fullName: fullName.trim(), phone: phone.trim(), district: district.trim(), upazila: upazila.trim(), address: address.trim() }).unwrap()
      toast.success("প্রোফাইল তথ্য সফলভাবে সংরক্ষণ করা হয়েছে!")
      setIsEditingProfile(false)
      refetchCurrentUser?.()
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "সংরক্ষণ ব্যর্থ হয়েছে")
    } finally {
      setIsSavingProfile(false)
    }
  }

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/90 shadow-2xs space-y-5">
      <div className="pb-4 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#D62828] uppercase tracking-wider mb-1">
            <UserCheck className="size-4" />
            <span>{currentRole === "SUPER_ADMIN" ? "সুপার অ্যাডমিন প্রোফাইল" : "ব্যবহারকারী প্রোফাইল"}</span>
          </div>
          <h2 className="text-xl font-black text-stone-900">{currentRole === "SUPER_ADMIN" ? "সুপার অ্যাডমিন প্রোফাইল ও নিরাপত্তা" : "আমার প্রোফাইল ও অ্যাকাউন্ট তথ্য"}</h2>
          <p className="text-xs text-stone-500 mt-0.5">{currentRole === "SUPER_ADMIN" ? "আপনার অ্যাডমিন প্রোফাইল, ছবি ও তথ্য নিয়ন্ত্রণ করুন" : "আপনার সংরক্ষিত যোগাযোগের তথ্য"}</p>
        </div>
        <Button type="button" variant={isEditingProfile ? "outline" : "default"} onClick={() => setIsEditingProfile(!isEditingProfile)} className={`text-xs font-bold gap-1.5 cursor-pointer ${!isEditingProfile ? "bg-[#D62828] hover:bg-[#B91C1C] text-white" : ""}`}>
          {isEditingProfile ? "বাতিল করুন" : "তথ্য এডিট করুন"}
        </Button>
      </div>

      <div className="p-5 rounded-2xl border border-stone-200 bg-stone-50/70 flex flex-col sm:flex-row items-center gap-5">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#D62828] bg-red-50 flex items-center justify-center shadow-sm">
            {avatarPreview || currentUser?.avatarUrl ? (
              <img src={avatarPreview || currentUser?.avatarUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl font-black text-[#D62828]">{currentUser?.fullName?.charAt(0) || "U"}</span>
            )}
          </div>
          <button type="button" onClick={() => avatarInputRef.current?.click()} disabled={isUploadingAvatar} className="absolute inset-0 rounded-full bg-black/50 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer disabled:cursor-not-allowed">
            {isUploadingAvatar ? <Loader2 className="size-5 animate-spin" /> : <Camera className="size-5" />}
          </button>
        </div>

        <div className="space-y-1.5 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h3 className="text-base font-bold text-stone-900">{currentUser?.fullName || "ব্যবহারকারী"}</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-[#D62828] border border-red-200 font-bold text-[11px]">{ROLE_METAS[currentRole]?.titleBn || "সুপার অ্যাডমিন"}</span>
          </div>
          <p className="text-xs text-stone-500">ImgBB ক্লাউডের মাধ্যমে ছবি আপলোড ও সেভ রাখুন।</p>
          <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <input type="file" ref={avatarInputRef} accept="image/*" className="hidden" onChange={handleAvatarSelect} />
            <Button size="sm" variant="outline" type="button" onClick={() => avatarInputRef.current?.click()} disabled={isUploadingAvatar} className="text-xs h-8 border-stone-300 gap-1.5 cursor-pointer">
              {isUploadingAvatar ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5 text-[#D62828]" />}
              <span>নতুন ছবি আপলোড</span>
            </Button>
            {currentUser?.avatarUrl && (
              <span className="text-[11px] text-[#D62828] font-semibold flex items-center gap-1">
                <CheckCircle2 className="size-3" />
                <span>ক্লাউডে সংরক্ষিত</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {isEditingProfile ? (
        <form onSubmit={handleSaveProfile} className="space-y-4 p-5 rounded-2xl border border-red-200 bg-red-50/20">
          <h3 className="text-sm font-bold text-stone-900 border-b border-stone-200 pb-2">প্রোফাইল তথ্য সম্পাদন করুন</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">পুরো নাম *</label>
              <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#D62828]/20 focus:border-[#D62828]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">মোবাইল নম্বর *</label>
              <input type="text" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#D62828]/20 focus:border-[#D62828]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">জেলা</label>
              <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#D62828]/20 focus:border-[#D62828]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">উপজেলা</label>
              <input type="text" value={upazila} onChange={(e) => setUpazila(e.target.value)} className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#D62828]/20 focus:border-[#D62828]" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-stone-700 mb-1">ঠিকানা</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#D62828]/20 focus:border-[#D62828]" placeholder="গ্রাম/রোড, এলাকা" />
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsEditingProfile(false)} className="text-xs h-9 cursor-pointer">বাতিল</Button>
            <Button type="submit" disabled={isSavingProfile} className="text-xs h-9 bg-[#D62828] hover:bg-[#B91C1C] text-white font-bold gap-1.5 cursor-pointer">
              {isSavingProfile ? <Loader2 className="size-3.5 animate-spin" /> : <Save className="size-3.5" />}
              <span>সংরক্ষণ করুন</span>
            </Button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1"><span className="text-xs text-stone-400 font-medium">পুরো নাম</span><div className="font-bold text-stone-900 text-sm">{currentUser?.fullName || "তথ্য সংরক্ষিত"}</div></div>
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1"><span className="text-xs text-stone-400 font-medium">ইমেইল ঠিকানা</span><div className="font-bold text-stone-900 text-sm">{currentUser?.email || "তথ্য সংরক্ষিত"}</div></div>
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1"><span className="text-xs text-stone-400 font-medium">মোবাইল নম্বর</span><div className="font-bold text-stone-900 text-sm">{currentUser?.phone || "তথ্য সংরক্ষিত"}</div></div>
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1"><span className="text-xs text-stone-400 font-medium">জেলা ও উপজেলা</span><div className="font-bold text-stone-900 text-sm">{currentUser?.district || "কুড়িগ্রাম"}, {currentUser?.upazila || "রৌমারী"}</div></div>
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1"><span className="text-xs text-stone-400 font-medium">ঠিকানা</span><div className="font-bold text-stone-900 text-sm">{currentUser?.address || "রৌমারী, কুড়িগ্রাম"}</div></div>
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1"><span className="text-xs text-stone-400 font-medium">বর্তমান পদমর্যাদা</span><div><span className="inline-block px-2.5 py-0.5 rounded-full bg-red-50 text-[#D62828] border border-red-200 font-bold text-xs">{ROLE_METAS[currentRole]?.titleBn || "সুপার অ্যাডমিন"}</span></div></div>
        </div>
      )}
    </div>
  )
}
export default ProfileTab
