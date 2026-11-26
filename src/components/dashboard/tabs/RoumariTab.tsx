"use client"

import React, { useState } from "react"
import {
  useGetRoumariDirectoriesQuery,
  useGetRoumariNewsQuery,
  useGetRoumariTouristPlacesQuery,
  useCreateRoumariDirectoryMutation,
  useDeleteRoumariDirectoryMutation,
  useDeleteRoumariNewsMutation,
} from "@/store/api/roumariApi"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Phone, Newspaper, Compass } from "lucide-react"

export function RoumariTab() {
  const [activeSection, setActiveSection] = useState<"directory" | "news" | "places">("directory")
  const { data: directories, refetch: refetchDir } = useGetRoumariDirectoriesQuery()
  const { data: newsRes, refetch: refetchNews } = useGetRoumariNewsQuery({ limit: 50 })
  const { data: places } = useGetRoumariTouristPlacesQuery()

  const [deleteDir] = useDeleteRoumariDirectoryMutation()
  const [deleteNews] = useDeleteRoumariNewsMutation()

  const [showAddDir, setShowAddDir] = useState(false)
  const [dirName, setDirName] = useState("")
  const [dirCat, setDirCat] = useState("BUS_COUNTER")
  const [dirPhone, setDirPhone] = useState("")
  const [dirAddress, setDirAddress] = useState("")
  const [dirEmergency, setDirEmergency] = useState(false)
  const [createDir, { isLoading: isCreatingDir }] = useCreateRoumariDirectoryMutation()

  const handleAddDir = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!dirName || !dirPhone || !dirAddress) return
    await createDir({
      name: dirName, category: dirCat, phoneNumber: dirPhone,
      address: dirAddress, isEmergency: dirEmergency, status: "PUBLISHED",
    }).unwrap()
    setDirName(""); setDirPhone(""); setDirAddress(""); setShowAddDir(false); refetchDir()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
        <button
          onClick={() => setActiveSection("directory")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
            activeSection === "directory" ? "bg-[#D62828] text-white" : "bg-stone-100 text-stone-700"
          }`}
        >
          <Phone className="size-3.5" /><span>ডিরেক্টরি ({directories?.length || 0})</span>
        </button>
        <button
          onClick={() => setActiveSection("news")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
            activeSection === "news" ? "bg-[#D62828] text-white" : "bg-stone-100 text-stone-700"
          }`}
        >
          <Newspaper className="size-3.5" /><span>স্থানীয় সংবাদ ({newsRes?.total || 0})</span>
        </button>
        <button
          onClick={() => setActiveSection("places")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
            activeSection === "places" ? "bg-[#D62828] text-white" : "bg-stone-100 text-stone-700"
          }`}
        >
          <Compass className="size-3.5" /><span>দর্শনীয় স্থান ({places?.length || 0})</span>
        </button>
      </div>

      {activeSection === "directory" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-stone-900">রৌমারী সেবা ও যোগাযোগ ডিরেক্টরি</h3>
            <Button size="sm" onClick={() => setShowAddDir(!showAddDir)} className="bg-[#D62828] text-white text-xs h-8">
              <Plus className="size-3.5 mr-1" /> নতুন সেবা যোগ করুন
            </Button>
          </div>

          {showAddDir && (
            <form onSubmit={handleAddDir} className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input type="text" required value={dirName} onChange={(e) => setDirName(e.target.value)} className="p-2 border rounded-lg bg-white" placeholder="প্রতিষ্ঠানের নাম" />
                <select value={dirCat} onChange={(e) => setDirCat(e.target.value)} className="p-2 border rounded-lg bg-white">
                  <option value="BUS_COUNTER">বাস কাউন্টার ও পরিবহন</option>
                  <option value="HOSPITAL">হাসপাতাল ও ক্লিনিক</option>
                  <option value="POLICE">থানা ও পুলিশ</option>
                  <option value="FIRE_SERVICE">ফায়ার সার্ভিস</option>
                  <option value="UPAZILA_PARISHAD">উপজেলা পরিষদ</option>
                  <option value="BANK">ব্যাংক ও আর্থিক</option>
                  <option value="EDUCATION">শিক্ষা প্রতিষ্ঠান</option>
                </select>
                <input type="text" required value={dirPhone} onChange={(e) => setDirPhone(e.target.value)} className="p-2 border rounded-lg bg-white" placeholder="ফোন নম্বর" />
                <input type="text" required value={dirAddress} onChange={(e) => setDirAddress(e.target.value)} className="p-2 border rounded-lg bg-white" placeholder="ঠিকানা" />
              </div>
              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={dirEmergency} onChange={(e) => setDirEmergency(e.target.checked)} className="rounded" />
                  <span className="font-medium text-stone-700">জরুরি হটলাইনে দেখান</span>
                </label>
                <Button size="sm" type="submit" disabled={isCreatingDir} className="bg-[#D62828] text-white">সংরক্ষণ</Button>
              </div>
            </form>
          )}

          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold">
                <tr>
                  <th className="p-3">নাম</th><th className="p-3">ক্যাটাগরি</th><th className="p-3">ফোন</th><th className="p-3">ঠিকানা</th><th className="p-3 text-right">পদক্ষেপ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {directories?.map((d) => (
                  <tr key={d.id} className="hover:bg-stone-50/60">
                    <td className="p-3 font-bold text-stone-900">{d.name} {d.isEmergency && <span className="ml-1 text-[10px] text-red-600 font-bold">[জরুরি]</span>}</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-stone-100 text-[10px]">{d.category}</span></td>
                    <td className="p-3 font-mono font-bold text-stone-700">{d.phoneNumber}</td>
                    <td className="p-3 text-stone-500">{d.address}</td>
                    <td className="p-3 text-right">
                      <button onClick={async () => { if (confirm("মুছে ফেলতে চান?")) { await deleteDir(d.id); refetchDir() } }} className="text-stone-400 hover:text-red-600 p-1">
                        <Trash2 className="size-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSection === "news" && (
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold">
              <tr>
                <th className="p-3">শিরোনাম</th><th className="p-3">ক্যাটাগরি</th><th className="p-3">তারিখ</th><th className="p-3">পঠিত</th><th className="p-3 text-right">পদক্ষেপ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {newsRes?.items?.map((n) => (
                <tr key={n.id} className="hover:bg-stone-50/60">
                  <td className="p-3 font-bold text-stone-900">{n.headline}</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-red-50 text-red-700 text-[10px] font-bold">{n.category}</span></td>
                  <td className="p-3 text-stone-500">{new Date(n.publishedAt).toLocaleDateString("bn-BD")}</td>
                  <td className="p-3 font-mono">{n.viewCount}</td>
                  <td className="p-3 text-right">
                    <button onClick={async () => { if (confirm("মুছে ফেলতে চান?")) { await deleteNews(n.id); refetchNews() } }} className="text-stone-400 hover:text-red-600 p-1">
                      <Trash2 className="size-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeSection === "places" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {places?.map((p) => (
            <div key={p.id} className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs space-y-2">
              <h4 className="font-bold text-xs text-stone-900">{p.name}</h4>
              <p className="text-[11px] text-stone-500">{p.address}</p>
              <p className="text-[11px] text-stone-600 line-clamp-2">{p.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
