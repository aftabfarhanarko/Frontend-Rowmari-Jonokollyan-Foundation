"use client"

import React from "react"
import { Users, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardModal } from "@/components/dashboard/DashboardModal"

export interface SystemRoleItem {
  key: string
  label: string
  color: string
  desc: string
}

interface CreateUserModalProps {
  isOpen: boolean
  onClose: () => void
  form: { fullName: string; email: string; phone: string; password: string; role: string; district: string; upazila: string; address: string }
  setForm: React.Dispatch<React.SetStateAction<any>>
  isCreating: boolean
  onSubmit: (e: React.FormEvent) => void
  roles: SystemRoleItem[]
}

export function CreateUserModal({
  isOpen, onClose, form, setForm, isCreating, onSubmit, roles,
}: CreateUserModalProps) {
  if (!isOpen) return null

  return (
    <DashboardModal>
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden space-y-4 animate-in fade-in duration-200">
        <div className="flex items-center justify-between p-5 border-b border-stone-100 bg-stone-50/70">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-red-100 text-[#D62828]"><Users className="size-5" /></div>
            <div>
              <h3 className="text-base font-bold text-stone-900">নতুন ইউজার / সুপার অ্যাডমিন তৈরি করুন</h3>
              <p className="text-xs text-stone-500">নতুন অ্যাকাউন্ট তৈরি ও সরাসরি ভূমিকা নির্ধারণ</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200 cursor-pointer">
            <X className="size-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">পূর্ণ নাম <span className="text-red-500">*</span></label>
              <input type="text" required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="মোহাম্মদ রফিকুল ইসলাম" className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#D62828]/30" />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">ইমেইল ঠিকানা <span className="text-red-500">*</span></label>
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="user@rjf.org" className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#D62828]/30" />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">ফোন নম্বর <span className="text-red-500">*</span></label>
              <input type="text" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="01712345678" className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#D62828]/30" />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">পাসওয়ার্ড <span className="text-red-500">*</span></label>
              <input type="password" required minLength={8} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="কমপক্ষে ৮ অক্ষর" className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#D62828]/30" />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">জেলা</label>
              <input type="text" value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} placeholder="Kurigram" className="w-full text-xs p-2.5 rounded-xl border border-stone-300" />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">উপজেলা</label>
              <input type="text" value={form.upazila} onChange={(e) => setForm({ ...form, upazila: e.target.value })} placeholder="Roumari" className="w-full text-xs p-2.5 rounded-xl border border-stone-300" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">ঠিকানা / গ্রাম (ঐচ্ছিক)</label>
            <input type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="গ্রাম বা এলাকা" className="w-full text-xs p-2.5 rounded-xl border border-stone-300" />
          </div>

          <div className="pt-2 border-t border-stone-100">
            <label className="block text-xs font-bold text-stone-800 mb-2">ইউজারের ভূমিকা / রোল নির্ধারণ করুন:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-stone-50 p-3 rounded-xl border border-stone-200/80 max-h-56 overflow-y-auto">
              {roles.map((r) => {
                const isSelected = form.role === r.key
                return (
                  <label key={r.key} onClick={() => setForm({ ...form, role: r.key })} className={`flex items-center gap-2.5 p-2.5 rounded-xl cursor-pointer text-xs border ${isSelected ? "bg-white border-[#D62828] text-[#D62828] font-bold ring-1 ring-[#D62828]/20" : "bg-white/60 border-stone-200 text-stone-700 hover:bg-white"}`}>
                    <input type="radio" name="create_user_role" value={r.key} checked={isSelected} onChange={() => setForm({ ...form, role: r.key })} className="size-3.5 text-[#D62828]" />
                    <span className="truncate">{r.label}</span>
                  </label>
                )
              })}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-stone-100">
            <Button type="button" variant="outline" onClick={onClose} className="text-xs">বাতিল</Button>
            <Button type="submit" disabled={isCreating} className="bg-[#D62828] hover:bg-[#B91C1C] text-white text-xs font-bold gap-1.5 cursor-pointer">
              {isCreating ? <><Loader2 className="size-3.5 animate-spin" /><span>তৈরি হচ্ছে...</span></> : <span>অ্যাকাউন্ট তৈরি করুন</span>}
            </Button>
          </div>
        </form>
      </div>
    </DashboardModal>
  )
}
