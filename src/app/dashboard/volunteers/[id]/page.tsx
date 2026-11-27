"use client"

import React from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import {
  Heart,
  UserCheck,
  UserX,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Calendar,
  CheckCircle,
  XCircle,
  Briefcase,
  AlertCircle,
  ShieldAlert,
} from "lucide-react"
import { DetailPageLayout } from "@/components/dashboard/DetailPageLayout"
import {
  useGetVolunteerByIdQuery,
  useApproveVolunteerMutation,
} from "@/store/api/dashboardApi"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function VolunteerDetailPage() {
  const params = useParams()
  const id = params?.id as string

  const { data: volunteer, isLoading, isError, refetch } = useGetVolunteerByIdQuery(id, {
    skip: !id,
  })

  const [approveVolunteer, { isLoading: isUpdating }] = useApproveVolunteerMutation()

  const handleToggleApproval = async () => {
    if (!volunteer) return
    const nextStatus = !volunteer.isApproved
    try {
      await approveVolunteer({
        id,
        isApproved: nextStatus,
      }).unwrap()
      toast.success(
        nextStatus
          ? "স্বেচ্ছাসেবক সফলভাবে অনুমোদিত হয়েছে!"
          : "স্বেচ্ছাসেবকের অনুমোদন স্থগিত করা হয়েছে!"
      )
      refetch()
    } catch (err: any) {
      toast.error(err?.data?.message || "স্ট্যাটাস আপডেট ব্যর্থ হয়েছে।")
    }
  }

  const isApproved = volunteer?.isApproved

  return (
    <DetailPageLayout
      moduleTitle="স্বেচ্ছাসেবক ব্যবস্থাপনা"
      moduleHref="/dashboard/volunteers"
      title={volunteer?.fullName || "স্বেচ্ছাসেবক বিবরণ"}
      subtitle={
        volunteer?.phone
          ? `ফোন: ${volunteer.phone} • এলাকা: ${volunteer.upazila || "রৌমারী"}, ${volunteer.district || "কুড়িগ্রাম"}`
          : undefined
      }
      badge={
        <span
          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
            isApproved
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-amber-50 text-amber-700 border border-amber-200"
          }`}
        >
          {isApproved ? <CheckCircle className="size-3.5" /> : <Clock className="size-3.5" />}
          {isApproved ? "অনুমোদিত স্বেচ্ছাসেবক" : "অনুমোদনের অপেক্ষায়"}
        </span>
      }
      icon={Heart}
      id={volunteer?.id || id}
      createdAt={volunteer?.createdAt}
      isLoading={isLoading}
      isError={isError}
      actions={
        <div className="flex items-center gap-2">
          <Button
            onClick={handleToggleApproval}
            disabled={isUpdating}
            className={`rounded-xl text-xs font-semibold shadow-xs ${
              isApproved
                ? "bg-stone-800 hover:bg-stone-900 text-white"
                : "bg-emerald-600 hover:bg-emerald-700 text-white"
            }`}
          >
            {isApproved ? (
              <>
                <UserX className="size-3.5 mr-1" /> অনুমোদন প্রত্যাহার করুন
              </>
            ) : (
              <>
                <UserCheck className="size-3.5 mr-1" /> অনুমোদন প্রদান করুন
              </>
            )}
          </Button>
          <Link
            href="/dashboard/volunteers"
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
          {/* Volunteer Information Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
            <h3 className="text-sm font-bold text-stone-900 mb-4 pb-3 border-b border-stone-100 flex items-center gap-2">
              <Sparkles className="size-4 text-[#D62828]" />
              স্বেচ্ছাসেবকের ব্যক্তিগত ও পেশাগত তথ্য
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100">
                <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                  পুরো নাম
                </p>
                <p className="text-sm font-bold text-stone-900">{volunteer?.fullName || "—"}</p>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100">
                <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                  মোবাইল নম্বর
                </p>
                <a
                  href={`tel:${volunteer?.phone}`}
                  className="text-sm font-bold text-stone-900 hover:text-[#D62828] transition"
                >
                  {volunteer?.phone || "—"}
                </a>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100">
                <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                  ইমেইল ঠিকানা
                </p>
                <p className="text-sm font-medium text-stone-900">{volunteer?.email || "—"}</p>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100">
                <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Clock className="size-3 text-stone-400" /> সময় দেওয়ার প্রাপ্যতা
                </p>
                <p className="text-sm font-bold text-stone-900">
                  {volunteer?.availabilityHoursPerWeek
                    ? `${volunteer.availabilityHoursPerWeek} ঘণ্টা / সপ্তাহ`
                    : "—"}
                </p>
              </div>
            </div>

            {/* Skills & Experience */}
            <div className="mt-4 p-4 bg-stone-50 rounded-xl border border-stone-100">
              <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Briefcase className="size-3 text-stone-400" /> দক্ষতা ও অভিজ্ঞতার ক্ষেত্র
              </p>
              <p className="text-xs text-stone-800 leading-relaxed whitespace-pre-wrap">
                {volunteer?.skills || "কোনো বিশেষ দক্ষতা উল্লেখ করা হয়নি।"}
              </p>
            </div>
          </div>

          {/* Volunteer Assignments / Activities */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
            <h3 className="text-sm font-bold text-stone-900 mb-4 pb-3 border-b border-stone-100 flex items-center gap-2">
              <Briefcase className="size-4 text-[#D62828]" />
              নিযুক্তিকরণ ও কাজের ইতিহাস
            </h3>

            {volunteer?.assignments && volunteer.assignments.length > 0 ? (
              <div className="space-y-3">
                {volunteer.assignments.map((assignment: any, idx: number) => (
                  <div
                    key={assignment.id || idx}
                    className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-stone-900">
                        {assignment.role || "দায়িত্বপ্রাপ্ত স্বেচ্ছাসেবক"}
                      </p>
                      <p className="text-[11px] text-stone-500">{assignment.campaignTitle || "কার্যক্রম"}</p>
                    </div>
                    <span className="text-[10px] text-stone-400">
                      {assignment.assignedAt ? new Date(assignment.assignedAt).toLocaleDateString("bn-BD") : ""}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-stone-400 border border-dashed border-stone-200 rounded-xl">
                <AlertCircle className="size-8 mx-auto mb-2 text-stone-300" />
                <p className="text-xs">এখনও কোনো নির্দিষ্ট ইভেন্ট বা কার্যক্রমে অ্যাসাইন করা হয়নি।</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Info (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Location & Area Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider pb-3 border-b border-stone-100 flex items-center gap-2">
              <MapPin className="size-4 text-[#D62828]" />
              এলাকা ও ভৌগোলিক তথ্য
            </h4>

            <div className="space-y-3 text-xs">
              <div>
                <p className="text-[10px] text-stone-400">উপজেলা</p>
                <p className="font-bold text-stone-900">{volunteer?.upazila || "রৌমারী"}</p>
              </div>
              <div>
                <p className="text-[10px] text-stone-400">জেলা</p>
                <p className="font-bold text-stone-900">{volunteer?.district || "কুড়িগ্রাম"}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider pb-2 border-b border-stone-100">
              দ্রুত যোগাযোগ
            </h4>

            <a
              href={`tel:${volunteer?.phone}`}
              className="w-full inline-flex items-center justify-center bg-[#D62828] hover:bg-[#B91C1C] text-white rounded-xl text-xs font-semibold py-2 px-3 shadow-xs transition"
            >
              <Phone className="size-3.5 mr-1.5" /> কল করুন ({volunteer?.phone})
            </a>

            {volunteer?.email && (
              <a
                href={`mailto:${volunteer.email}`}
                className="w-full inline-flex items-center justify-center border border-stone-200 text-stone-800 rounded-xl text-xs font-semibold hover:bg-stone-50 py-2 px-3 transition"
              >
                <Mail className="size-3.5 mr-1.5" /> ইমেইল পাঠান
              </a>
            )}
          </div>
        </div>
      </div>
    </DetailPageLayout>
  )
}
