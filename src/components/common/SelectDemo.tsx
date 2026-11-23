"use client"

import React, { useState } from "react"
import { ReusableSelect } from "@/components/ui/select"

const fruitItems = [
  { label: "Select a fruit", value: null },
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
]

export function SelectDemo() {
  const [selectedFruit, setSelectedFruit] = useState<string | null>("apple")

  return (
    <div className="p-4 max-w-sm space-y-4">
      {/* Reusable Select using the user's fruit items */}
      <ReusableSelect
        label="পছন্দের ফল নির্বাচন করুন"
        groupLabel="Fruits"
        placeholder="ফল নির্বাচন করুন..."
        items={fruitItems}
        value={selectedFruit}
        onValueChange={(val) => setSelectedFruit(val)}
        triggerClassName="w-full max-w-48"
      />

      <p className="text-xs text-muted-foreground">
        নির্বাচিত মান: <span className="font-semibold text-foreground">{selectedFruit || "কিছুই সিলেক্ট করা হয়নি"}</span>
      </p>
    </div>
  )
}

export default SelectDemo
