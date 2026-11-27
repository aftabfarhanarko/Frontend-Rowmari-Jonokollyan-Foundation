"use client"

import React, { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import {
  Mail,
  Phone,
  User,
  Clock,
  Calendar,
  Trash2,
  Reply,
  CheckCircle,
  FileText,
  AlertTriangle,
} from "lucide-react"
import { DetailPageLayout } from "@/components/dashboard/DetailPageLayout"
import {
  useGetAdminContactMessageByIdQuery,
  useDeleteAdminContactMessageMutation,
} from "@/store/api/adminApi"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function MessageDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const { data: message, isLoading, isError } = useGetAdminContactMessageByIdQuery(id, {
    skip: !id,
  })

  const [deleteMessage, { isLoading: isDeleting }] = useDeleteAdminContactMessageMutation()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleDelete = async () => {
    try {
      await deleteMessage(id).unwrap()
      toast.success("বার্তাটি সফলভাবে মুছে ফেলা হয়েছে!")
      router.push("/dashboard/messages")
    } catch (err: any) {
      toast.error(err?.data?.message || "বার্তা মুছতে ব্যর্থ হয়েছে।")
    }
  }

  const email = message?.email || (message?.contactInfo?.includes("@") ? message.contactInfo : undefined)
  const phone = message?.phone || (!message?.contactInfo?.includes("@") ? message?.contactInfo : undefined)

  return (
    <DetailPageLayout
      moduleTitle="যোগাযোগের বার্তা ও জিজ্ঞাসা"
      moduleHref="/dashboard/messages"
      title={message?.subject || "যোগাযোগের বার্তা"}
      subtitle={message?.name ? `প্রেরক: ${message.name}` : undefined}
      badge={
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
          <Mail className="size-3.5" /> প্রাপ্ত বার্তা
        </span>
      }
      icon={Mail}
      id={message?.id || id}
      createdAt={message?.createdAt}
      isLoading={isLoading}
      isError={isError}
      actions={
        <div className="flex items-center gap-2">
          {email && (
            <a
              href={`mailto:${email}?subject=Re: ${encodeURIComponent(message?.subject || "RJF Feedback")}`}
              className="inline-flex items-center bg-[#D62828] hover:bg-[#B91C1C] text-white rounded-xl text-xs font-semibold shadow-xs px-3 py-1.5 transition"
            >
              <Reply className="size-3.5 mr-1" /> ইমেইলে উত্তর দিন
            </a>
          )}

          <Button
            onClick={() => setShowDeleteConfirm(true)}
            disabled={isDeleting}
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-xs font-semibold"
          >
            <Trash2 className="size-3.5 mr-1" /> মুছে ফেলুন
          </Button>

          <Link
            href="/dashboard/messages"
            className="inline-flex items-center px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition"
          >
            তালিকায় ফিরুন
          </Link>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Details (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Message Content */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-stone-900 pb-3 border-b border-stone-100 flex items-center gap-2">
              <FileText className="size-4 text-[#D62828]" />
              বার্তার মূল বিবরণ
            </h3>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-100 text-stone-800 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap min-h-[140px]">
              {message?.message || "কোনো বার্তা পাওয়া যায়নি।"}
            </div>
          </div>

          {/* Delete Confirmation Alert */}
          {showDeleteConfirm && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-red-800 font-bold text-xs">
                <AlertTriangle className="size-4 text-red-600" />
                আপনি কি নিশ্চিত যে এই বার্তাটি স্থায়ীভাবে মুছে ফেলতে চান?
              </div>
              <p className="text-xs text-red-600">
                মুছে ফেলার পর এই বার্তাটি আর পুনরুদ্ধার করা যাবে না।
              </p>
              <div className="flex items-center gap-2 pt-1">
                <Button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold h-8 px-4"
                >
                  হ্যাঁ, নিশ্চিত মুছে ফেলুন
                </Button>
                <Button
                  onClick={() => setShowDeleteConfirm(false)}
                  variant="outline"
                  className="border-stone-200 text-stone-700 rounded-xl text-xs font-semibold h-8 px-3"
                >
                  বাতিল
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Sender Info (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider pb-3 border-b border-stone-100 flex items-center gap-2">
              <User className="size-4 text-[#D62828]" />
              প্রেরকের তথ্যাবলি
            </h4>

            <div className="space-y-4 text-xs">
              <div>
                <p className="text-[10px] text-stone-400">নাম</p>
                <p className="font-bold text-stone-900 text-sm">{message?.name || "—"}</p>
              </div>

              <div>
                <p className="text-[10px] text-stone-400">যোগাযোগের ঠিকানা (ইমেইল / ফোন)</p>
                {email ? (
                  <a
                    href={`mailto:${email}`}
                    className="font-medium text-stone-800 hover:text-[#D62828] transition break-all"
                  >
                    {email}
                  </a>
                ) : phone ? (
                  <a
                    href={`tel:${phone}`}
                    className="font-bold text-stone-800 hover:text-[#D62828] transition"
                  >
                    {phone}
                  </a>
                ) : (
                  <span className="font-medium text-stone-800">{message?.contactInfo || "—"}</span>
                )}
              </div>

              <div>
                <p className="text-[10px] text-stone-400">প্রাপ্তির সময়</p>
                <p className="font-medium text-stone-600">
                  {message?.createdAt ? new Date(message.createdAt).toLocaleString("bn-BD") : "—"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DetailPageLayout>
  )
}
