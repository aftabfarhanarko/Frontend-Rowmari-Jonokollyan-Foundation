"use client"

import React from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  Users,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Award,
  Heart,
  Briefcase,
  CheckCircle,
  XCircle,
  AlertCircle,
  ShieldCheck,
  Building2,
} from "lucide-react"
import { DetailPageLayout } from "@/components/dashboard/DetailPageLayout"
import { useGetAdminMemberByIdQuery } from "@/store/api/committeesApi"
import { Button } from "@/components/ui/button"

export default function CommitteeMemberDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const { data: member, isLoading, isError } = useGetAdminMemberByIdQuery(id, {
    skip: !id,
  })

  const isActive = member?.status === "ACTIVE"

  return (
    <DetailPageLayout
      moduleTitle="কমিটি ও সদস্য"
      moduleHref="/dashboard/committees"
      title={member ? `${member.nameBn || member.nameEn}` : "সদস্য বিবরণ"}
      subtitle={member?.nameEn ? `${member.nameEn} • সদস্য কোড: ${member.memberId || id}` : undefined}
      badge={
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
            isActive
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-stone-100 text-stone-600 border border-stone-200"
          }`}
        >
          {isActive ? <CheckCircle className="size-3" /> : <XCircle className="size-3" />}
          {isActive ? "সক্রিয় সদস্য" : "নিষ্ক্রিয়"}
        </span>
      }
      icon={Users}
      avatarUrl={member?.photoUrl || undefined}
      id={member?.id || id}
      createdAt={member?.createdAt}
      updatedAt={member?.updatedAt}
      isLoading={isLoading}
      isError={isError}
      actions={
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/committees"
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
          {/* Identity & Basic Info Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
            <h3 className="text-sm font-bold text-stone-900 mb-4 pb-3 border-b border-stone-100 flex items-center gap-2">
              <ShieldCheck className="size-4 text-[#D62828]" />
              ব্যক্তিগত তথ্য ও পরিচিতি
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100">
                <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                  বাংলা নাম
                </p>
                <p className="text-sm font-bold text-stone-900">{member?.nameBn || "—"}</p>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100">
                <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                  ইংরেজি নাম
                </p>
                <p className="text-sm font-bold text-stone-900">{member?.nameEn || "—"}</p>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100">
                <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                  পিতার নাম
                </p>
                <p className="text-sm font-medium text-stone-900">{member?.fatherName || "—"}</p>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100">
                <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                  মাতার নাম
                </p>
                <p className="text-sm font-medium text-stone-900">{member?.motherName || "—"}</p>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100">
                <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Heart className="size-3 text-red-500" /> রক্তের গ্রুপ
                </p>
                <p className="text-sm font-bold text-red-600">{member?.bloodGroup || "—"}</p>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100">
                <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Briefcase className="size-3 text-stone-500" /> পেশা
                </p>
                <p className="text-sm font-medium text-stone-900">{member?.occupation || "—"}</p>
              </div>
            </div>

            {member?.bio && (
              <div className="mt-4 p-4 bg-stone-50 rounded-xl border border-stone-100">
                <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                  সংক্ষিপ্ত বায়ো / বিবরণ
                </p>
                <p className="text-xs text-stone-700 leading-relaxed whitespace-pre-wrap">
                  {member.bio}
                </p>
              </div>
            )}
          </div>

          {/* Committee Memberships Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
            <h3 className="text-sm font-bold text-stone-900 mb-4 pb-3 border-b border-stone-100 flex items-center gap-2">
              <Award className="size-4 text-[#D62828]" />
              কমিটি পদবি ও দায়িত্ব
            </h3>

            {member?.memberships && member.memberships.length > 0 ? (
              <div className="space-y-3">
                {member.memberships.map((membership: any, idx: number) => (
                  <div
                    key={membership.id || idx}
                    className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-stone-900">
                          {membership.designation?.nameBn || membership.designation?.nameEn || "সদস্য"}
                        </span>
                        {membership.isCurrent && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D62828]/10 text-[#D62828]">
                            বর্তমান পদ
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500 flex items-center gap-1.5">
                        <Building2 className="size-3 text-stone-400" />
                        {membership.committee?.nameBn || membership.committee?.nameEn || "কমিটি"}
                      </p>
                    </div>

                    <div className="text-xs text-stone-500">
                      {membership.startDate && (
                        <span>
                          মেয়াদ: {new Date(membership.startDate).toLocaleDateString("bn-BD")}
                          {membership.endDate
                            ? ` - ${new Date(membership.endDate).toLocaleDateString("bn-BD")}`
                            : " - চলমান"}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-stone-400 border border-dashed border-stone-200 rounded-xl">
                <AlertCircle className="size-8 mx-auto mb-2 text-stone-300" />
                <p className="text-xs">এখনও কোনো কমিটিতে পদবি অর্পণ করা হয়নি।</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Info (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Contact Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider pb-3 border-b border-stone-100">
              যোগাযোগের তথ্য
            </h4>

            <div className="space-y-3">
              <div className="flex items-start gap-3 text-xs">
                <div className="size-8 rounded-xl bg-red-50 text-[#D62828] flex items-center justify-center shrink-0">
                  <Phone className="size-4" />
                </div>
                <div>
                  <p className="text-[10px] text-stone-400">মোবাইল নম্বর</p>
                  <a
                    href={`tel:${member?.phoneNumber}`}
                    className="font-bold text-stone-800 hover:text-[#D62828] transition"
                  >
                    {member?.phoneNumber || "—"}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <div className="size-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail className="size-4" />
                </div>
                <div>
                  <p className="text-[10px] text-stone-400">ইমেইল ঠিকানা</p>
                  <a
                    href={`mailto:${member?.email}`}
                    className="font-medium text-stone-800 hover:text-blue-600 transition break-all"
                  >
                    {member?.email || "—"}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <div className="size-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <MapPin className="size-4" />
                </div>
                <div>
                  <p className="text-[10px] text-stone-400">ঠিকানা ও এলাকা</p>
                  <p className="font-medium text-stone-800 leading-relaxed">
                    {[member?.village, member?.unionName, member?.upazila, member?.district]
                      .filter(Boolean)
                      .join(", ") || "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Photo & Member ID Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs text-center">
            <div className="relative size-32 rounded-2xl overflow-hidden border-2 border-stone-200 mx-auto shadow-sm bg-stone-100 flex items-center justify-center">
              {member?.photoUrl && (member.photoUrl.startsWith("http://") || member.photoUrl.startsWith("https://") || member.photoUrl.startsWith("/")) ? (
                <Image
                  src={member.photoUrl}
                  alt={member.nameBn || "Member"}
                  fill
                  unoptimized
                  sizes="128px"
                  className="object-cover"
                />
              ) : (
                <Users className="size-12 text-stone-300" />
              )}
            </div>

            <h4 className="mt-4 text-sm font-bold text-stone-900">{member?.nameBn}</h4>
            <p className="text-xs text-stone-500 font-mono mt-0.5">
              আইডি: {member?.memberId || "RJF-MEMBER"}
            </p>
          </div>
        </div>
      </div>
    </DetailPageLayout>
  )
}
