"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Mail,
  Trash2,
  Loader2,
  Calendar,
  Phone,
  User,
  Eye,
  CheckCircle2,
} from "lucide-react"
import {
  useGetAdminContactMessagesQuery,
  useDeleteAdminContactMessageMutation,
  ContactMessageItem,
} from "@/store/api/adminApi"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { SkeletonList } from "@/components/ui/skeleton"

export function CmsMessagesTab() {
  const { data: messagesRes, isLoading, refetch } = useGetAdminContactMessagesQuery()
  const messages: ContactMessageItem[] = Array.isArray(messagesRes)
    ? messagesRes
    : (messagesRes as any)?.items || []

  const [deleteMessage] = useDeleteAdminContactMessageMutation()
  const [selectedMessage, setSelectedMessage] = useState<ContactMessageItem | null>(null)

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`আপনি কি নিশ্চিতভাবে '${name}' এর বার্তাটি মুছে ফেলতে চান?`)) return
    try {
      await deleteMessage(id).unwrap()
      toast.success("বার্তাটি মুছে ফেলা হয়েছে")
      if (selectedMessage?.id === id) setSelectedMessage(null)
      refetch()
    } catch (err: any) {
      toast.error(err?.message || "মুছতে ব্যর্থ হয়েছে")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#D62828] uppercase tracking-wider mb-1">
            <Mail className="size-4" />
            <span>ওয়েবসাইট যোগাযোগ অনুসন্ধান (Contact Inquiries)</span>
          </div>
          <h2 className="text-xl font-black text-stone-900">পাবলিক অনুসন্ধানের বার্তাসমূহ</h2>
          <p className="text-xs text-stone-500 mt-0.5">
            মূল ওয়েবসাইটের যোগাযোগ ফর্ম থেকে সাধারণ নাগরিক ও শুভাকাঙ্ক্ষীদের পাঠানো বার্তাসমূহ
          </p>
        </div>

        <div className="text-xs font-medium text-stone-500">
          মোট বার্তা: <strong className="text-stone-900">{messages.length}</strong> টি
        </div>
      </div>

      {/* Messages List / Details */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
        {isLoading ? (
          <div className="p-4">
            <SkeletonList items={5} hasAvatar={true} />
          </div>
        ) : messages.length === 0 ? (
          <div className="p-12 text-center text-stone-500 space-y-2">
            <Mail className="size-10 text-stone-300 mx-auto" />
            <p className="text-sm font-semibold">কোনো যোগাযোগ বার্তা নেই</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="p-4 sm:p-5 hover:bg-stone-50/70 transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-stone-900 text-sm hover:text-[#D62828] transition">
                      <Link href={`/dashboard/messages/${msg.id}`}>{msg.name}</Link>
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {new Date(msg.createdAt).toLocaleString("bn-BD")}
                    </span>
                  </div>
                  <div className="text-xs text-red-800 font-medium font-mono">
                    যোগাযোগ: {msg.contactInfo}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed pt-1 whitespace-pre-wrap">
                    {msg.message}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/dashboard/messages/${msg.id}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border border-stone-200 text-stone-700 hover:border-[#D62828] hover:text-[#D62828] transition"
                  >
                    <Eye className="size-3.5" />
                    <span>পূর্ণ বার্তা</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(msg.id, msg.name)}
                    className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition cursor-pointer"
                    title="মুছে ফেলুন"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-4 animate-in fade-in-50 zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-base font-black text-stone-900">বার্তার বিস্তারিত</h3>
              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="font-bold text-stone-500">প্রেরক:</span>{" "}
                <strong className="text-stone-900 text-sm">{selectedMessage.name}</strong>
              </div>
              <div>
                <span className="font-bold text-stone-500">ফোন / ইমেইল:</span>{" "}
                <span className="font-mono text-red-800 font-semibold">{selectedMessage.contactInfo}</span>
              </div>
              <div>
                <span className="font-bold text-stone-500">তারিখ:</span>{" "}
                <span>{new Date(selectedMessage.createdAt).toLocaleString("bn-BD")}</span>
              </div>
              <div className="pt-2 border-t border-stone-100">
                <span className="font-bold text-stone-500 block mb-1">বার্তা:</span>
                <div className="p-3.5 bg-stone-50 rounded-xl text-stone-800 leading-relaxed whitespace-pre-wrap font-sans">
                  {selectedMessage.message}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={() => setSelectedMessage(null)} size="sm" className="text-xs cursor-pointer">
                বন্ধ করুন
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default CmsMessagesTab
