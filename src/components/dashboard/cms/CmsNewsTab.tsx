"use client"

import React, { useState } from "react"
import { Newspaper, Plus, Trash2, Calendar, Loader2, Search, ExternalLink } from "lucide-react"
import {
  useGetNewsEventsQuery,
  useCreateNewsEventMutation,
  NewsEventItem,
} from "@/store/api/contentApi"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ImageUploader } from "@/components/ui/ImageUploader"
import { toast } from "sonner"

export function CmsNewsTab() {
  const { data: newsRes, isLoading, refetch } = useGetNewsEventsQuery()
  const items: NewsEventItem[] = Array.isArray(newsRes) ? newsRes : (newsRes as any)?.items || []

  const [createNews, { isLoading: isCreating }] = useCreateNewsEventMutation()
  const [modalOpen, setModalOpen] = useState(false)
  const [search, setSearch] = useState("")

  // Form
  const [title, setTitle] = useState("")
  const [type, setType] = useState<"NEWS" | "EVENT">("NEWS")
  const [summary, setSummary] = useState("")
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [eventDate, setEventDate] = useState("")

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      toast.error("শিরোনাম ও বিস্তারিত কন্টেন্ট প্রদান করুন")
      return
    }

    try {
      await createNews({
        title: title.trim(),
        type,
        summary: summary.trim() || undefined,
        content: content.trim(),
        imageUrl: imageUrl.trim() || undefined,
        startDate: eventDate ? new Date(eventDate).toISOString() : undefined,
      }).unwrap()

      toast.success("খবর বা ইভেন্ট সফলভাবে প্রকাশিত হয়েছে!")
      setModalOpen(false)
      setTitle("")
      setSummary("")
      setContent("")
      setImageUrl("")
      setEventDate("")
      refetch()
    } catch (err: any) {
      toast.error(err?.message || "পোস্ট করতে সমস্যা হয়েছে")
    }
  }

  const filteredItems = items.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#0D5C35] uppercase tracking-wider mb-1">
            <Newspaper className="size-4" />
            <span>নিউজ ও প্রেস রিলিজ (News & Events CMS)</span>
          </div>
          <h2 className="text-xl font-black text-stone-900">সংবাদ, জরুরি নোটিশ ও ইভেন্ট</h2>
          <p className="text-xs text-stone-500 mt-0.5">
            ফাউন্ডেশনের সাম্প্রতিক সেবামূলক কর্মকাণ্ডের প্রেস বিজ্ঞপ্তি ও জনসাধারণের জন্য নোটিশ প্রকাশ
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          className="gap-1.5 bg-[#0D5C35] hover:bg-[#094527] text-white font-bold text-xs shadow-xs cursor-pointer"
        >
          <Plus className="size-4" />
          <span>নতুন পোস্ট লিখুন</span>
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-stone-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="খবরের শিরোনাম দিয়ে খুঁজুন..."
          className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#0D5C35]/30 focus:border-[#0D5C35]"
        />
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex flex-col items-center justify-center gap-2 text-stone-500">
            <Loader2 className="size-6 animate-spin text-[#0D5C35]" />
            <span className="text-xs">সংবাদ লোড হচ্ছে...</span>
          </div>
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
                      <Badge
                        variant="outline"
                        className={
                          item.type === "EVENT"
                            ? "border-purple-300 bg-purple-50 text-purple-800 text-[10px]"
                            : "border-emerald-300 bg-emerald-50 text-emerald-800 text-[10px]"
                        }
                      >
                        {item.type === "EVENT" ? "ইভেন্ট" : "সংবাদ"}
                      </Badge>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-stone-900 text-sm">
                      {item.title}
                    </td>

                    <td className="py-3.5 px-4 text-stone-500 max-w-sm truncate">
                      {item.summary || item.content?.slice(0, 80) || "—"}
                    </td>

                    <td className="py-3.5 px-4 text-stone-400 font-mono text-[11px]">
                      {new Date(item.createdAt).toLocaleDateString("bn-BD")}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <a
                        href="/news"
                        target="_blank"
                        className="inline-flex p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                        title="পাবলিক পেজে দেখুন"
                      >
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

      {/* Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-4 animate-in fade-in-50 zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-lg font-black text-stone-900">নতুন খবর বা নোটিশ প্রকাশ</h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  পোস্টের ধরন <span className="text-red-500">*</span>
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 font-semibold"
                >
                  <option value="NEWS">সংবাদ ও প্রেস বিজ্ঞপ্তি (News)</option>
                  <option value="EVENT">আসন্ন সেবামূলক ইভেন্ট (Event)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  শিরোনাম <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="খবরের আকর্ষণীয় শিরোনাম লিখুন..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#0D5C35]/30 focus:border-[#0D5C35]"
                />
              </div>

              <ImageUploader
                value={imageUrl}
                onChange={setImageUrl}
                label="সংবাদ বা ইভেন্টের ব্যানার ছবি"
                aspectRatio="video"
                description="JPG, PNG, WEBP (ImgBB ক্লাউডে হোস্ট হবে)"
              />

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">সংক্ষিপ্ত সারসংক্ষেপ</label>
                <textarea
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="১-২ লাইনে মূল সারসংক্ষেপ..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  সম্পূর্ণ বিবরণ ও কন্টেন্ট <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="খবরের বিস্তারিত বিবরণ লিখুন..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 font-sans"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="text-xs">
                  বাতিল
                </Button>
                <Button
                  type="submit"
                  disabled={isCreating}
                  className="bg-[#0D5C35] hover:bg-[#094527] text-white font-bold text-xs gap-1.5 cursor-pointer"
                >
                  {isCreating && <Loader2 className="size-3.5 animate-spin" />}
                  <span>প্রকাশ করুন</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
export default CmsNewsTab
