"use client"

import React, { useState } from "react"
import { Newspaper, Plus, Loader2, Search, ExternalLink } from "lucide-react"
import { useGetNewsEventsQuery, useCreateNewsEventMutation, NewsEventItem } from "@/store/api/contentApi"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { NewsEditModal } from "./news/NewsEditModal"
import { SkeletonTable } from "@/components/ui/skeleton"

export function CmsNewsTab() {
  const { data: newsRes, isLoading, refetch } = useGetNewsEventsQuery()
  const items: NewsEventItem[] = Array.isArray(newsRes) ? newsRes : (newsRes as any)?.items || []

  const [createNews, { isLoading: isCreating }] = useCreateNewsEventMutation()
  const [modalOpen, setModalOpen] = useState(false)
  const [filterType, setFilterType] = useState<string>("ALL")
  const [search, setSearch] = useState("")

  const [title, setTitle] = useState("")
  const [type, setType] = useState<"NEWS" | "EVENT">("NEWS")
  const [imageUrl, setImageUrl] = useState("")
  const [summary, setSummary] = useState("")
  const [content, setContent] = useState("")

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) { toast.error("শিরোনাম ও বিস্তারিত বিবরণ আবশ্যক"); return }

    try {
      await createNews({ title: title.trim(), type, imageUrl: imageUrl.trim() || undefined, summary: summary.trim() || undefined, content: content.trim() }).unwrap()
      toast.success("সংবাদ সফলভাবে প্রকাশিত হয়েছে")
      setModalOpen(false)
      setTitle(""); setSummary(""); setContent(""); setImageUrl("")
      refetch()
    } catch (err: any) {
      toast.error(err?.message || "সংবাদ প্রকাশ করতে সমস্যা হয়েছে")
    }
  }

  const filteredItems = items.filter((item) => {
    const matchType = filterType === "ALL" || item.type === filterType
    const matchSearch = item.title?.toLowerCase().includes(search.toLowerCase()) || item.summary?.toLowerCase().includes(search.toLowerCase())
    return matchType && matchSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#D62828] uppercase tracking-wider mb-1">
            <Newspaper className="size-4" />
            <span>সংবাদ, প্রেস ও নোটিশ বোর্ড (CMS)</span>
          </div>
          <h2 className="text-xl font-black text-stone-900">প্রেস বিজ্ঞপ্তি ও ইভেন্ট প্রকাশনা</h2>
          <p className="text-xs text-stone-500 mt-0.5">ফাউন্ডেশনের অফিসিয়াল কার্যক্রমের খবর, ছবি ও নোটিশ যোগ করুন</p>
        </div>
        <Button onClick={() => setModalOpen(true)} size="sm" className="bg-[#D62828] hover:bg-[#B91C1C] text-white text-xs font-bold gap-1.5 cursor-pointer shadow-xs">
          <Plus className="size-4" />
          <span>নতুন পোস্ট লিখুন</span>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-stone-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="খবরের শিরোনাম খুঁজুন..." className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#D62828]/30" />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="text-xs px-3 py-2 rounded-xl border border-stone-200 bg-white font-semibold text-stone-700">
            <option value="ALL">সকল পোস্ট</option>
            <option value="NEWS">সংবাদ (News)</option>
            <option value="EVENT">ইভেন্ট (Events)</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
        {isLoading ? (
          <SkeletonTable rows={5} columns={6} showHeader showToolbar={false} showPagination={false} />
        ) : filteredItems.length === 0 ? (
          <div className="p-12 text-center text-stone-500 space-y-2">
            <Newspaper className="size-10 text-stone-300 mx-auto" />
            <p className="text-sm font-semibold">কোনো খবর বা নোটিশ পাওয়া যায়নি</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200/80 text-stone-600 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">ধরন</th>
                  <th className="py-3 px-4">শিরোনাম</th>
                  <th className="py-3 px-4">সারসংক্ষেপ</th>
                  <th className="py-3 px-4">তারিখ</th>
                  <th className="py-3 px-4 text-right">লিংক</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <Badge variant="outline" className={item.type === "EVENT" ? "border-purple-300 bg-red-50 text-red-800 text-[10px]" : "border-red-300 bg-red-50 text-red-800 text-[10px]"}>
                        {item.type === "EVENT" ? "ইভেন্ট" : "সংবাদ"}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-stone-900 text-sm">{item.title}</td>
                    <td className="py-3.5 px-4 text-stone-500 max-w-sm truncate">{item.summary || item.content?.slice(0, 80) || "—"}</td>
                    <td className="py-3.5 px-4 text-stone-400 font-mono text-[11px]">{new Date(item.createdAt).toLocaleDateString("bn-BD")}</td>
                    <td className="py-3.5 px-4 text-right">
                      <a href="/news" target="_blank" className="inline-flex p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100" title="পাবলিক পেজে দেখুন">
                        <ExternalLink className="size-3.5" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <NewsEditModal isOpen={modalOpen} onClose={() => setModalOpen(false)} type={type} setType={setType} title={title} setTitle={setTitle} imageUrl={imageUrl} setImageUrl={setImageUrl} summary={summary} setSummary={setSummary} content={content} setContent={setContent} isCreating={isCreating} onSubmit={handleCreate} />
    </div>
  )
}
export default CmsNewsTab
