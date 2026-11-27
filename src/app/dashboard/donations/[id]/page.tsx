"use client"

import React, { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Phone,
  Mail,
  Receipt,
  FileText,
  AlertTriangle,
  Download,
  Printer,
  ShieldCheck,
  Check,
  X,
  ExternalLink,
} from "lucide-react"
import { DetailPageLayout } from "@/components/dashboard/DetailPageLayout"
import {
  useGetDonationByIdQuery,
  useReviewDonationStatusMutation,
} from "@/store/api/donationsApi"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function DonationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const { data: donation, isLoading, isError, refetch } = useGetDonationByIdQuery(id, {
    skip: !id,
  })

  const [reviewDonation, { isLoading: isReviewing }] = useReviewDonationStatusMutation()
  const [adminNote, setAdminNote] = useState("")

  const handleStatusUpdate = async (status: "APPROVED" | "REJECTED") => {
    try {
      await reviewDonation({
        id,
        status,
        adminNote: adminNote.trim() || undefined,
      }).unwrap()
      toast.success(
        status === "APPROVED"
          ? "অনুদানটি সফলভাবে অনুমোদিত হয়েছে!"
          : "অনুদানটি বাতিল হিসেবে চিহ্নিত করা হয়েছে!"
      )
      refetch()
    } catch (err: any) {
      toast.error(err?.data?.message || "স্ট্যাটাস পরিবর্তন ব্যর্থ হয়েছে।")
    }
  }

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "APPROVED":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle className="size-3.5" /> অনুমোদিত (Approved)
          </span>
        )
      case "REJECTED":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
            <XCircle className="size-3.5" /> বাতিল (Rejected)
          </span>
        )
      case "PENDING":
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="size-3.5" /> পর্যালোচনায় (Pending)
          </span>
        )
    }
  }

  return (
    <DetailPageLayout
      moduleTitle="অনুদান ও ফান্ড"
      moduleHref="/dashboard/donations"
      title={`অনুদান: ৳${donation?.amount ? Number(donation.amount).toLocaleString("bn-BD") : "০"}`}
      subtitle={
        donation?.donorName
          ? `দাতা: ${donation.donorName} ${donation.isAnonymous ? "(গোপন দাতা)" : ""}`
          : "অজ্ঞাত দাতা"
      }
      badge={getStatusBadge(donation?.status)}
      icon={CreditCard}
      id={donation?.id || id}
      createdAt={donation?.createdAt}
      updatedAt={donation?.updatedAt}
      isLoading={isLoading}
      isError={isError}
      actions={
        <div className="flex items-center gap-2">
          {donation?.status === "PENDING" && (
            <>
              <Button
                onClick={() => handleStatusUpdate("APPROVED")}
                disabled={isReviewing}
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs"
              >
                <Check className="size-3.5 mr-1" /> অনুমোদন করুন
              </Button>
              <Button
                onClick={() => handleStatusUpdate("REJECTED")}
                disabled={isReviewing}
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-xs font-semibold"
              >
                <X className="size-3.5 mr-1" /> বাতিল করুন
              </Button>
            </>
          )}
          <Button
            onClick={() => window.print()}
            variant="outline"
            className="rounded-xl border-stone-200 text-xs font-semibold hover:bg-stone-50"
          >
            <Printer className="size-3.5 mr-1" /> প্রিন্ট / রসিদ
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Donation Financial Overview */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
              <div>
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  অনুদানের পরিমাণ
                </p>
                <p className="text-3xl font-extrabold text-[#D62828] mt-1">
                  ৳ {donation?.amount ? Number(donation.amount).toLocaleString("bn-BD") : "০"}{" "}
                  <span className="text-sm font-normal text-stone-500">{donation?.currency || "BDT"}</span>
                </p>
              </div>

              <div className="text-right sm:text-right">
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  পেমেন্ট মাধ্যম
                </p>
                <span className="inline-block mt-1 px-3 py-1 rounded-xl text-xs font-bold bg-stone-100 text-stone-800 border border-stone-200 uppercase">
                  {donation?.paymentMethod || "CASH"}
                </span>
              </div>
            </div>

            {/* Financial Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100">
                <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                  ট্রানজ্যাকশন আইডি (TrxID)
                </p>
                <p className="text-sm font-mono font-bold text-stone-900 break-all">
                  {donation?.transactionReference || "—"}
                </p>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100">
                <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                  প্রেরক নম্বর (Sender Phone)
                </p>
                <p className="text-sm font-mono font-bold text-stone-900">
                  {donation?.senderPhone || donation?.donorPhone || "—"}
                </p>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100 sm:col-span-2">
                <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                  ক্যাম্পেইন / তহবিল খাত
                </p>
                <p className="text-sm font-bold text-stone-900">
                  {donation?.campaign?.title || "সাধারণ দান তহবিল (General Fund)"}
                </p>
              </div>
            </div>

            {/* Notes / Message */}
            {donation?.notes && (
              <div className="mt-4 p-4 bg-stone-50 rounded-xl border border-stone-100">
                <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                  দাতার মন্তব্য / নোট
                </p>
                <p className="text-xs text-stone-700 leading-relaxed whitespace-pre-wrap">
                  {donation.notes}
                </p>
              </div>
            )}
          </div>

          {/* Payment Proof / Slip */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
            <h3 className="text-sm font-bold text-stone-900 mb-4 pb-3 border-b border-stone-100 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileText className="size-4 text-[#D62828]" />
                পেমেন্ট প্রুফ / স্ক্রিনশট
              </span>
              {donation?.paymentProofUrl && (
                <a
                  href={donation.paymentProofUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#D62828] hover:underline flex items-center gap-1 font-semibold"
                >
                  সম্পূর্ণ দেখুন <ExternalLink className="size-3" />
                </a>
              )}
            </h3>

            {donation?.paymentProofUrl && (donation.paymentProofUrl.startsWith("http://") || donation.paymentProofUrl.startsWith("https://") || donation.paymentProofUrl.startsWith("/")) ? (
              <div className="relative h-72 w-full rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
                <Image
                  src={donation.paymentProofUrl}
                  alt="Payment Proof"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="p-8 text-center text-stone-400 border border-dashed border-stone-200 rounded-xl">
                <AlertTriangle className="size-8 mx-auto mb-2 text-stone-300" />
                <p className="text-xs">কোনো পেমেন্ট স্লিপ বা স্ক্রিনশট আপলোড করা হয়নি।</p>
              </div>
            )}
          </div>

          {/* Admin Review Action Section */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
            <h3 className="text-sm font-bold text-stone-900 mb-4 pb-3 border-b border-stone-100 flex items-center gap-2">
              <ShieldCheck className="size-4 text-[#D62828]" />
              অ্যাডমিন পর্যালোচনা ও সিদ্ধান্ত
            </h3>

            {donation?.adminNote && (
              <div className="mb-4 p-3.5 bg-amber-50/50 rounded-xl border border-amber-200/50">
                <p className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider mb-1">
                  সংরক্ষিত অ্যাডমিন নোট:
                </p>
                <p className="text-xs text-stone-800">{donation.adminNote}</p>
              </div>
            )}

            <div className="space-y-3">
              <label className="text-xs font-semibold text-stone-600 block">
                অ্যাডমিন নোট / মন্তব্য যোগ করুন (ঐচ্ছিক)
              </label>
              <textarea
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder="যেমন: ব্যাংক স্টেটমেন্টের সাথে মেলানো হয়েছে বা ট্রানজ্যাকশন নিশ্চিত করা হয়েছে..."
                rows={3}
                className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:border-[#D62828]"
              />

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  onClick={() => handleStatusUpdate("APPROVED")}
                  disabled={isReviewing || donation?.status === "APPROVED"}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs"
                >
                  <Check className="size-3.5 mr-1.5" /> অনুমোদন করুন
                </Button>
                <Button
                  onClick={() => handleStatusUpdate("REJECTED")}
                  disabled={isReviewing || donation?.status === "REJECTED"}
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-xs font-semibold"
                >
                  <X className="size-3.5 mr-1.5" /> বাতিল করুন
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Donor Information */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider pb-3 border-b border-stone-100 flex items-center gap-2">
              <User className="size-4 text-[#D62828]" />
              দাতার তথ্যাবলি
            </h4>

            <div className="space-y-3">
              <div>
                <p className="text-[10px] text-stone-400">নাম</p>
                <p className="text-xs font-bold text-stone-900">
                  {donation?.donorName || "অজ্ঞাত দাতা"}
                  {donation?.isAnonymous && (
                    <span className="ml-2 text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      গোপন
                    </span>
                  )}
                </p>
              </div>

              <div>
                <p className="text-[10px] text-stone-400">মোবাইল নম্বর</p>
                <a
                  href={`tel:${donation?.donorPhone}`}
                  className="text-xs font-bold text-stone-900 hover:text-[#D62828] transition"
                >
                  {donation?.donorPhone || "—"}
                </a>
              </div>

              <div>
                <p className="text-[10px] text-stone-400">ইমেইল ঠিকানা</p>
                <p className="text-xs font-medium text-stone-700 break-all">
                  {donation?.donorEmail || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Official Receipt Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider pb-3 border-b border-stone-100 flex items-center gap-2">
              <Receipt className="size-4 text-[#D62828]" />
              অফিশিয়াল মানি রসিদ
            </h4>

            {donation?.receipt ? (
              <div className="space-y-3">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                  <p className="text-[10px] text-stone-400 font-semibold uppercase">রসিদ নম্বর</p>
                  <p className="text-xs font-mono font-bold text-[#D62828]">
                    {donation.receipt.receiptNumber || donation.receipt.id}
                  </p>
                </div>

                <Button
                  onClick={() => window.print()}
                  className="w-full bg-[#D62828] hover:bg-[#B91C1C] text-white rounded-xl text-xs font-semibold shadow-xs"
                >
                  <Download className="size-3.5 mr-1.5" /> রসিদ ডাউনলোড / প্রিন্ট
                </Button>
              </div>
            ) : (
              <div className="p-4 bg-stone-50 rounded-xl border border-dashed border-stone-200 text-center">
                <p className="text-xs text-stone-500">
                  অনুদানটি অনুমোদিত হওয়ার পর স্বয়ংক্রিয় রসিদ তৈরি হবে।
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DetailPageLayout>
  )
}
