"use client"

import React, { useState } from "react"
import { DataTable, type TableColumn } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Heart, Plus } from "lucide-react"

export interface DonationRecord {
  id: string
  donorName: string
  campaign: string
  amount: number
  date: string
  paymentMethod: string
  status: "completed" | "pending" | "failed"
}

const SAMPLE_DONATIONS: DonationRecord[] = [
  {
    id: "DON-1001",
    donorName: "তানভীর আহমেদ",
    campaign: "শীতবস্ত্র বিতরণ ২০২৪",
    amount: 2500,
    date: "২৪ নভেম্বর ২০২৪",
    paymentMethod: "bKash",
    status: "completed",
  },
  {
    id: "DON-1002",
    donorName: "ফারহানা ইয়াসমিন",
    campaign: "জরুরি চিকিৎসা সহায়তা",
    amount: 5000,
    date: "২৩ নভেম্বর ২০২৪",
    paymentMethod: "Nagad",
    status: "completed",
  },
  {
    id: "DON-1003",
    donorName: "মো: রফিকুল ইসলাম",
    campaign: "রৌমারী বন্যা পুনর্বাসন",
    amount: 1500,
    date: "২২ নভেম্বর ২০২৪",
    paymentMethod: "Rocket",
    status: "pending",
  },
  {
    id: "DON-1004",
    donorName: "বেনামী অনুদানকারী",
    campaign: "শিক্ষা উপকরণ বিতরণ",
    amount: 1000,
    date: "২১ নভেম্বর ২০২৪",
    paymentMethod: "bKash",
    status: "completed",
  },
  {
    id: "DON-1005",
    donorName: "আরিফ হোসেন",
    campaign: "জরুরি চিকিৎসা সহায়তা",
    amount: 3000,
    date: "২০ নভেম্বর ২০২৪",
    paymentMethod: "Bank Transfer",
    status: "pending",
  },
  {
    id: "DON-1006",
    donorName: "নাজমুল হাসান",
    campaign: "শীতবস্ত্র বিতরণ ২০২৪",
    amount: 2000,
    date: "১৯ নভেম্বর ২০২৪",
    paymentMethod: "bKash",
    status: "completed",
  },
]

export function DataTableDemo() {
  const [data] = useState<DonationRecord[]>(SAMPLE_DONATIONS)

  const columns: TableColumn<DonationRecord>[] = [
    {
      header: "আইডি",
      accessorKey: "id",
      sortable: true,
      className: "font-mono font-medium text-xs text-muted-foreground",
    },
    {
      header: "দাতার নাম",
      accessorKey: "donorName",
      sortable: true,
      className: "font-medium text-foreground",
    },
    {
      header: "ক্যাম্পেইন / খাত",
      accessorKey: "campaign",
      sortable: true,
    },
    {
      header: "পরিমাণ",
      accessorKey: "amount",
      sortable: true,
      align: "right",
      cell: (row) => (
        <span className="font-semibold text-emerald-700">
          ৳{row.amount.toLocaleString("bn-BD")}
        </span>
      ),
    },
    {
      header: "মাধ্যম",
      accessorKey: "paymentMethod",
      align: "center",
      cell: (row) => (
        <Badge variant="outline" className="text-xs">
          {row.paymentMethod}
        </Badge>
      ),
    },
    {
      header: "তারিখ",
      accessorKey: "date",
      sortable: true,
      className: "text-xs text-muted-foreground",
    },
    {
      header: "স্ট্যাটাস",
      accessorKey: "status",
      align: "center",
      cell: (row) => {
        if (row.status === "completed") {
          return (
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
              সফল
            </Badge>
          )
        }
        if (row.status === "pending") {
          return (
            <Badge className="bg-amber-50 text-amber-700 border-amber-200">
              অপেক্ষমাণ
            </Badge>
          )
        }
        return (
          <Badge className="bg-red-50 text-red-700 border-red-200">
            ব্যর্থ
          </Badge>
        )
      },
    },
    {
      header: "অ্যাকশন",
      align: "center",
      cell: (row) => (
        <Button
          variant="ghost"
          size="xs"
          onClick={(e) => {
            e.stopPropagation()
            alert(`বিস্তারিত দেখছেন: ${row.id} - ${row.donorName}`)
          }}
          className="h-7 px-2 text-xs gap-1 hover:text-[#0D5C35]"
        >
          <Eye className="size-3.5" />
          <span>দেখুন</span>
        </Button>
      ),
    },
  ]

  return (
    <div className="p-4 bg-background">
      <DataTable
        title="অনুদানের তালিকা"
        description="রৌমারী জনকল্যাণ ফাউন্ডেশনের সাম্প্রতিক অনুদানের বিবরণ"
        columns={columns}
        data={data}
        searchable
        searchPlaceholder="নাম, ক্যাম্পেইন বা মাধ্যম দিয়ে খুঁজুন..."
        pageSize={5}
        actions={
          <Button size="xs" className="gap-1 bg-[#0D5C35] hover:bg-[#094527] text-white">
            <Plus className="size-3.5" />
            <span>নতুন অনুদান</span>
          </Button>
        }
      />
    </div>
  )
}
