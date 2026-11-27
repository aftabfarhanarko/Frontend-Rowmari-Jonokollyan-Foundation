"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  useGetRoumariDirectoriesQuery,
  useGetRoumariNewsQuery,
  useGetRoumariTouristPlacesQuery,
  useCreateRoumariDirectoryMutation,
  useUpdateRoumariDirectoryMutation,
  useDeleteRoumariDirectoryMutation,
  useCreateRoumariNewsMutation,
  useUpdateRoumariNewsMutation,
  useDeleteRoumariNewsMutation,
  useCreateRoumariTouristPlaceMutation,
  useUpdateRoumariTouristPlaceMutation,
  useDeleteRoumariTouristPlaceMutation,
  RoumariDirectoryItem,
  RoumariNewsItem,
  RoumariTouristPlaceItem,
} from "@/store/api/roumariApi"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageUploader } from "@/components/ui/ImageUploader"
import {
  Plus,
  Trash2,
  Pencil,
  Phone,
  Newspaper,
  Compass,
  Eye,
  Loader2,
  Search,
  MapPin,
  Calendar,
} from "lucide-react"
import { toast } from "sonner"

export function RoumariTab() {
  const [activeSection, setActiveSection] = useState<"directory" | "news" | "places">("directory")

  // API Queries
  const { data: directories, isLoading: loadingDir, refetch: refetchDir } = useGetRoumariDirectoriesQuery()
  const { data: newsRes, isLoading: loadingNews, refetch: refetchNews } = useGetRoumariNewsQuery({ limit: 50 })
  const { data: places, isLoading: loadingPlaces, refetch: refetchPlaces } = useGetRoumariTouristPlacesQuery()

  // Directory Mutations
  const [createDir, { isLoading: isCreatingDir }] = useCreateRoumariDirectoryMutation()
  const [updateDir, { isLoading: isUpdatingDir }] = useUpdateRoumariDirectoryMutation()
  const [deleteDir, { isLoading: isDeletingDir }] = useDeleteRoumariDirectoryMutation()

  // News Mutations
  const [createNews, { isLoading: isCreatingNews }] = useCreateRoumariNewsMutation()
  const [updateNews, { isLoading: isUpdatingNews }] = useUpdateRoumariNewsMutation()
  const [deleteNews, { isLoading: isDeletingNews }] = useDeleteRoumariNewsMutation()

  // Tourist Places Mutations
  const [createPlace, { isLoading: isCreatingPlace }] = useCreateRoumariTouristPlaceMutation()
  const [updatePlace, { isLoading: isUpdatingPlace }] = useUpdateRoumariTouristPlaceMutation()
  const [deletePlace, { isLoading: isDeletingPlace }] = useDeleteRoumariTouristPlaceMutation()

  // Extract items cleanly
  const directoryList: RoumariDirectoryItem[] = Array.isArray(directories)
    ? directories
    : (directories as any)?.items || (directories as any)?.data || []

  const newsItems: RoumariNewsItem[] = Array.isArray(newsRes)
    ? newsRes
    : (newsRes as any)?.items || (newsRes as any)?.data || []
  const newsTotal: number = Array.isArray(newsRes)
    ? newsRes.length
    : (newsRes as any)?.total || newsItems.length

  const placeList: RoumariTouristPlaceItem[] = Array.isArray(places)
    ? places
    : (places as any)?.items || (places as any)?.data || []

  // ----------------------------------------------------
  // 1. DIRECTORY STATE & HANDLERS
  // ----------------------------------------------------
  const [dirModalOpen, setDirModalOpen] = useState(false)
  const [editingDir, setEditingDir] = useState<RoumariDirectoryItem | null>(null)
  const [dirSearch, setDirSearch] = useState("")
  const [dirCatFilter, setDirCatFilter] = useState("ALL")

  const [dirName, setDirName] = useState("")
  const [dirCat, setDirCat] = useState("BUS_COUNTER")
  const [dirPhone, setDirPhone] = useState("")
  const [dirAltPhone, setDirAltPhone] = useState("")
  const [dirAddress, setDirAddress] = useState("")
  const [dirEmergency, setDirEmergency] = useState(false)
  const [dirDescription, setDirDescription] = useState("")

  const handleOpenAddDir = () => {
    setEditingDir(null)
    setDirName("")
    setDirCat("BUS_COUNTER")
    setDirPhone("")
    setDirAltPhone("")
    setDirAddress("")
    setDirEmergency(false)
    setDirDescription("")
    setDirModalOpen(true)
  }

  const handleOpenEditDir = (d: RoumariDirectoryItem) => {
    setEditingDir(d)
    setDirName(d.name || "")
    setDirCat(d.category || "BUS_COUNTER")
    setDirPhone(d.phoneNumber || "")
    setDirAltPhone(d.altPhoneNumber || "")
    setDirAddress(d.address || "")
    setDirEmergency(!!d.isEmergency)
    setDirDescription(d.description || "")
    setDirModalOpen(true)
  }

  const handleSubmitDir = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!dirName.trim() || !dirPhone.trim() || !dirAddress.trim()) {
      toast.error("নাম, ফোন নম্বর ও ঠিকানা আবশ্যক")
      return
    }

    try {
      if (editingDir) {
        await updateDir({
          id: editingDir.id,
          data: {
            name: dirName.trim(),
            category: dirCat,
            phoneNumber: dirPhone.trim(),
            altPhoneNumber: dirAltPhone.trim() || null,
            address: dirAddress.trim(),
            isEmergency: dirEmergency,
            description: dirDescription.trim() || null,
          },
        }).unwrap()
        toast.success("ডিরেক্টরি তথ্য সফলভাবে আপডেট হয়েছে")
      } else {
        await createDir({
          name: dirName.trim(),
          category: dirCat,
          phoneNumber: dirPhone.trim(),
          altPhoneNumber: dirAltPhone.trim() || null,
          address: dirAddress.trim(),
          isEmergency: dirEmergency,
          status: "PUBLISHED",
          description: dirDescription.trim() || null,
        }).unwrap()
        toast.success("নতুন সেবা সফলভাবে ডিরেক্টরিতে যোগ হয়েছে")
      }
      setDirModalOpen(false)
      setEditingDir(null)
      refetchDir()
    } catch (err: any) {
      toast.error(err?.message || "ডিরেক্টরি সংরক্ষণ করতে ব্যর্থ হয়েছে")
    }
  }

  const handleDeleteDir = async (id: string, name: string) => {
    if (!window.confirm(`আপনি কি নিশ্চিতভাবে '${name}' ডিরেক্টরি থেকে মুছে ফেলতে চান?`)) return
    try {
      await deleteDir(id).unwrap()
      toast.success("ডিরেক্টরি সফলভাবে মুছে ফেলা হয়েছে")
      refetchDir()
    } catch (err: any) {
      toast.error(err?.message || "মুছে ফেলতে সমস্যা হয়েছে")
    }
  }

  const filteredDirs = directoryList.filter((d) => {
    const matchCat = dirCatFilter === "ALL" || d.category === dirCatFilter
    const matchSearch =
      d.name?.toLowerCase().includes(dirSearch.toLowerCase()) ||
      d.phoneNumber?.includes(dirSearch) ||
      d.address?.toLowerCase().includes(dirSearch.toLowerCase())
    return matchCat && matchSearch
  })

  // ----------------------------------------------------
  // 2. LOCAL NEWS STATE & HANDLERS
  // ----------------------------------------------------
  const [newsModalOpen, setNewsModalOpen] = useState(false)
  const [editingNews, setEditingNews] = useState<RoumariNewsItem | null>(null)
  const [newsSearch, setNewsSearch] = useState("")

  const [newsHeadline, setNewsHeadline] = useState("")
  const [newsCategory, setNewsCategory] = useState("COMMUNITY")
  const [newsExcerpt, setNewsExcerpt] = useState("")
  const [newsContent, setNewsContent] = useState("")
  const [newsImage, setNewsImage] = useState("")
  const [newsAuthor, setNewsAuthor] = useState("রৌমারী প্রতিনিধি")
  const [newsBreaking, setNewsBreaking] = useState(false)
  const [newsFeatured, setNewsFeatured] = useState(false)

  const handleOpenAddNews = () => {
    setEditingNews(null)
    setNewsHeadline("")
    setNewsCategory("COMMUNITY")
    setNewsExcerpt("")
    setNewsContent("")
    setNewsImage("")
    setNewsAuthor("রৌমারী প্রতিনিধি")
    setNewsBreaking(false)
    setNewsFeatured(false)
    setNewsModalOpen(true)
  }

  const handleOpenEditNews = (n: RoumariNewsItem) => {
    setEditingNews(n)
    setNewsHeadline(n.headline || "")
    setNewsCategory(n.category || "COMMUNITY")
    setNewsExcerpt(n.excerpt || "")
    setNewsContent(n.content || "")
    setNewsImage(n.featuredImage || "")
    setNewsAuthor(n.author || "রৌমারী প্রতিনিধি")
    setNewsBreaking(!!n.isBreaking)
    setNewsFeatured(!!n.isFeatured)
    setNewsModalOpen(true)
  }

  const handleSubmitNews = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsHeadline.trim() || !newsContent.trim()) {
      toast.error("শিরোনাম ও বিস্তারিত সংবাদ আবশ্যক")
      return
    }

    try {
      if (editingNews) {
        await updateNews({
          id: editingNews.id,
          data: {
            headline: newsHeadline.trim(),
            category: newsCategory,
            excerpt: newsExcerpt.trim() || undefined,
            content: newsContent.trim(),
            featuredImage: newsImage.trim() || undefined,
            author: newsAuthor.trim() || undefined,
            isBreaking: newsBreaking,
            isFeatured: newsFeatured,
          },
        }).unwrap()
        toast.success("সংবাদ সফলভাবে আপডেট হয়েছে")
      } else {
        await createNews({
          headline: newsHeadline.trim(),
          category: newsCategory,
          excerpt: newsExcerpt.trim() || undefined,
          content: newsContent.trim(),
          featuredImage: newsImage.trim() || undefined,
          author: newsAuthor.trim() || undefined,
          isBreaking: newsBreaking,
          isFeatured: newsFeatured,
          status: "PUBLISHED",
        }).unwrap()
        toast.success("স্থানীয় সংবাদ সফলভাবে প্রকাশ করা হয়েছে")
      }
      setNewsModalOpen(false)
      setEditingNews(null)
      refetchNews()
    } catch (err: any) {
      toast.error(err?.message || "সংবাদ প্রকাশ করতে ব্যর্থ হয়েছে")
    }
  }

  const handleDeleteNews = async (id: string, headline: string) => {
    if (!window.confirm(`আপনি কি নিশ্চিতভাবে '${headline}' সংবাদটি মুছে ফেলতে চান?`)) return
    try {
      await deleteNews(id).unwrap()
      toast.success("সংবাদ সফলভাবে মুছে ফেলা হয়েছে")
      refetchNews()
    } catch (err: any) {
      toast.error(err?.message || "মুছে ফেলতে ব্যর্থ হয়েছে")
    }
  }

  const filteredNews = newsItems.filter((n) =>
    n.headline?.toLowerCase().includes(newsSearch.toLowerCase()) ||
    n.excerpt?.toLowerCase().includes(newsSearch.toLowerCase())
  )

  // ----------------------------------------------------
  // 3. TOURIST PLACES STATE & HANDLERS
  // ----------------------------------------------------
  const [placeModalOpen, setPlaceModalOpen] = useState(false)
  const [editingPlace, setEditingPlace] = useState<RoumariTouristPlaceItem | null>(null)
  const [placeSearch, setPlaceSearch] = useState("")

  const [placeName, setPlaceName] = useState("")
  const [placeAddress, setPlaceAddress] = useState("")
  const [placeDescription, setPlaceDescription] = useState("")
  const [placeImage, setPlaceImage] = useState("")
  const [placeGuide, setPlaceGuide] = useState("")
  const [placeBestTime, setPlaceBestTime] = useState("")

  const handleOpenAddPlace = () => {
    setEditingPlace(null)
    setPlaceName("")
    setPlaceAddress("")
    setPlaceDescription("")
    setPlaceImage("")
    setPlaceGuide("")
    setPlaceBestTime("")
    setPlaceModalOpen(true)
  }

  const handleOpenEditPlace = (p: RoumariTouristPlaceItem) => {
    setEditingPlace(p)
    setPlaceName(p.name || "")
    setPlaceAddress(p.address || "")
    setPlaceDescription(p.description || "")
    setPlaceImage(p.featuredImage || "")
    setPlaceGuide(p.travelGuide || "")
    setPlaceBestTime(p.bestTimeToVisit || "")
    setPlaceModalOpen(true)
  }

  const handleSubmitPlace = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!placeName.trim() || !placeAddress.trim() || !placeDescription.trim()) {
      toast.error("স্থানের নাম, ঠিকানা ও বিবরণ আবশ্যক")
      return
    }

    try {
      if (editingPlace) {
        await updatePlace({
          id: editingPlace.id,
          data: {
            name: placeName.trim(),
            address: placeAddress.trim(),
            description: placeDescription.trim(),
            featuredImage: placeImage.trim() || undefined,
            travelGuide: placeGuide.trim() || null,
            bestTimeToVisit: placeBestTime.trim() || null,
          },
        }).unwrap()
        toast.success("দর্শনীয় স্থানের তথ্য সফলভাবে আপডেট হয়েছে")
      } else {
        await createPlace({
          name: placeName.trim(),
          address: placeAddress.trim(),
          description: placeDescription.trim(),
          featuredImage: placeImage.trim() || undefined,
          travelGuide: placeGuide.trim() || null,
          bestTimeToVisit: placeBestTime.trim() || null,
          status: "PUBLISHED",
        }).unwrap()
        toast.success("নতুন দর্শনীয় স্থান সফলভাবে যুক্ত হয়েছে")
      }
      setPlaceModalOpen(false)
      setEditingPlace(null)
      refetchPlaces()
    } catch (err: any) {
      toast.error(err?.message || "স্থান সংরক্ষণ করতে ব্যর্থ হয়েছে")
    }
  }

  const handleDeletePlace = async (id: string, name: string) => {
    if (!window.confirm(`আপনি কি নিশ্চিতভাবে '${name}' স্থানটি মুছে ফেলতে চান?`)) return
    try {
      await deletePlace(id).unwrap()
      toast.success("দর্শনীয় স্থান সফলভাবে মুছে ফেলা হয়েছে")
      refetchPlaces()
    } catch (err: any) {
      toast.error(err?.message || "মুছে ফেলতে ব্যর্থ হয়েছে")
    }
  }

  const filteredPlaces = placeList.filter((p) =>
    p.name?.toLowerCase().includes(placeSearch.toLowerCase()) ||
    p.address?.toLowerCase().includes(placeSearch.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Top Section Nav Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-3">
        <button
          onClick={() => setActiveSection("directory")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-2xs ${
            activeSection === "directory" ? "bg-[#D62828] text-white" : "bg-stone-100 text-stone-700 hover:bg-stone-200"
          }`}
        >
          <Phone className="size-3.5" />
          <span>ডিরেক্টরি ({directoryList.length})</span>
        </button>
        <button
          onClick={() => setActiveSection("news")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-2xs ${
            activeSection === "news" ? "bg-[#D62828] text-white" : "bg-stone-100 text-stone-700 hover:bg-stone-200"
          }`}
        >
          <Newspaper className="size-3.5" />
          <span>স্থানীয় সংবাদ ({newsTotal})</span>
        </button>
        <button
          onClick={() => setActiveSection("places")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-2xs ${
            activeSection === "places" ? "bg-[#D62828] text-white" : "bg-stone-100 text-stone-700 hover:bg-stone-200"
          }`}
        >
          <Compass className="size-3.5" />
          <span>দর্শনীয় স্থান ({placeList.length})</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* SECTION 1: DIRECTORY */}
      {/* ========================================================= */}
      {activeSection === "directory" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#D62828] uppercase tracking-wider mb-1">
                <Phone className="size-4" />
                <span>রৌমারী সেবা ও যোগাযোগ</span>
              </div>
              <h2 className="text-xl font-black text-stone-900">জরুরি সেবা ও যোগাযোগ ডিরেক্টরি</h2>
              <p className="text-xs text-stone-500 mt-0.5">রৌমারীর হাসপাতাল, পুলিশ, ফায়ার সার্ভিস, পরিবহন ও সরকারি প্রতিষ্ঠানের তথ্য</p>
            </div>
            <Button onClick={handleOpenAddDir} size="sm" className="bg-[#D62828] hover:bg-[#B91C1C] text-white text-xs font-bold gap-1.5 cursor-pointer shadow-xs">
              <Plus className="size-4" />
              <span>নতুন সেবা যোগ করুন</span>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-stone-400" />
              <input
                type="text"
                value={dirSearch}
                onChange={(e) => setDirSearch(e.target.value)}
                placeholder="সেবা বা ফোন নম্বর খুঁজুন..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#D62828]/30"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={dirCatFilter}
                onChange={(e) => setDirCatFilter(e.target.value)}
                className="text-xs px-3 py-2 rounded-xl border border-stone-200 bg-white font-semibold text-stone-700"
              >
                <option value="ALL">সকল ক্যাটাগরি ({directoryList.length})</option>
                <option value="BUS_COUNTER">বাস কাউন্টার ও পরিবহন</option>
                <option value="HOSPITAL">হাসপাতাল ও ক্লিনিক</option>
                <option value="POLICE">থানা ও পুলিশ</option>
                <option value="FIRE_SERVICE">ফায়ার সার্ভিস</option>
                <option value="UPAZILA_PARISHAD">উপজেলা পরিষদ</option>
                <option value="BANK">ব্যাংক ও আর্থিক</option>
                <option value="EDUCATION">শিক্ষা প্রতিষ্ঠান</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
            {loadingDir ? (
              <div className="p-8 text-center text-xs text-stone-500">
                <Loader2 className="size-6 animate-spin mx-auto text-[#D62828] mb-2" />
                <span>ডিরেক্টরি লোড হচ্ছে...</span>
              </div>
            ) : filteredDirs.length === 0 ? (
              <div className="p-12 text-center text-stone-500 space-y-2">
                <Phone className="size-10 text-stone-300 mx-auto" />
                <p className="text-sm font-semibold">কোনো সেবা বা ডিরেক্টরি এন্ট্রি পাওয়া যায়নি</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200/80 text-stone-600 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">নাম ও ধরন</th>
                      <th className="py-3 px-4">ক্যাটাগরি</th>
                      <th className="py-3 px-4">ফোন নম্বর</th>
                      <th className="py-3 px-4">ঠিকানা</th>
                      <th className="py-3 px-4 text-right">পদক্ষেপ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-700">
                    {filteredDirs.map((d) => (
                      <tr key={d.id} className="hover:bg-stone-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-stone-900 text-sm hover:text-[#D62828] transition">
                          <Link href={`/dashboard/roumari/${d.id}`} className="flex items-center gap-1.5">
                            <span>{d.name}</span>
                            {d.isEmergency && (
                              <Badge className="bg-red-500 text-white text-[9px] px-1.5 py-0 font-bold">জরুরি</Badge>
                            )}
                          </Link>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[10px] font-semibold">
                            {d.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-stone-800">
                          {d.phoneNumber}
                          {d.altPhoneNumber && <div className="text-[10px] text-stone-400 font-normal">{d.altPhoneNumber}</div>}
                        </td>
                        <td className="py-3.5 px-4 text-stone-500 max-w-xs truncate">{d.address}</td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              href={`/dashboard/roumari/${d.id}`}
                              className="p-1.5 rounded-lg text-stone-500 hover:text-[#D62828] hover:bg-stone-100 transition"
                              title="বিস্তারিত দেখুন"
                            >
                              <Eye className="size-3.5" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleOpenEditDir(d)}
                              className="p-1.5 rounded-lg text-stone-500 hover:text-amber-700 hover:bg-amber-50 transition cursor-pointer"
                              title="সম্পাদনা করুন"
                            >
                              <Pencil className="size-3.5 text-amber-600" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteDir(d.id, d.name)}
                              disabled={isDeletingDir}
                              className="p-1.5 rounded-lg text-stone-500 hover:text-red-700 hover:bg-red-50 transition cursor-pointer"
                              title="মুছে ফেলুন"
                            >
                              <Trash2 className="size-3.5 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 2: LOCAL NEWS */}
      {/* ========================================================= */}
      {activeSection === "news" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#D62828] uppercase tracking-wider mb-1">
                <Newspaper className="size-4" />
                <span>আমাদের রৌমারী পোর্টাল</span>
              </div>
              <h2 className="text-xl font-black text-stone-900">স্থানীয় সংবাদ ও বুলেটিন</h2>
              <p className="text-xs text-stone-500 mt-0.5">রৌমারী উপজেলার সাম্প্রতিক খবর, ঘটনা ও স্থানীয় সংবাদ প্রকাশনা পরিচালনা করুন</p>
            </div>
            <Button onClick={handleOpenAddNews} size="sm" className="bg-[#D62828] hover:bg-[#B91C1C] text-white text-xs font-bold gap-1.5 cursor-pointer shadow-xs">
              <Plus className="size-4" />
              <span>নতুন সংবাদ যুক্ত করুন</span>
            </Button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-stone-400" />
            <input
              type="text"
              value={newsSearch}
              onChange={(e) => setNewsSearch(e.target.value)}
              placeholder="খবরের শিরোনাম খুঁজুন..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#D62828]/30"
            />
          </div>

          <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
            {loadingNews ? (
              <div className="p-8 text-center text-xs text-stone-500">
                <Loader2 className="size-6 animate-spin mx-auto text-[#D62828] mb-2" />
                <span>সংবাদ লোড হচ্ছে...</span>
              </div>
            ) : filteredNews.length === 0 ? (
              <div className="p-12 text-center text-stone-500 space-y-2">
                <Newspaper className="size-10 text-stone-300 mx-auto" />
                <p className="text-sm font-semibold">কোনো স্থানীয় সংবাদ পাওয়া যায়নি</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200/80 text-stone-600 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">শিরোনাম</th>
                      <th className="py-3 px-4">ক্যাটাগরি</th>
                      <th className="py-3 px-4">লেখক ও তারিখ</th>
                      <th className="py-3 px-4">পঠিত সংখ্যা</th>
                      <th className="py-3 px-4 text-right">পদক্ষেপ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-700">
                    {filteredNews.map((n) => (
                      <tr key={n.id} className="hover:bg-stone-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-stone-900 text-sm max-w-md">
                          <div className="line-clamp-1">{n.headline}</div>
                          {n.excerpt && <p className="text-[11px] text-stone-400 font-normal line-clamp-1">{n.excerpt}</p>}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-red-50 text-red-700 text-[10px] font-bold border border-red-200">
                            {n.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-stone-500">
                          <div>{n.author || "রৌমারী প্রতিনিধি"}</div>
                          <div className="text-[10px] text-stone-400 font-mono">
                            {n.publishedAt ? new Date(n.publishedAt).toLocaleDateString("bn-BD") : "—"}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-stone-600">{n.viewCount || 0} বার</td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenEditNews(n)}
                              className="p-1.5 rounded-lg text-stone-500 hover:text-amber-700 hover:bg-amber-50 transition cursor-pointer"
                              title="সম্পাদনা করুন"
                            >
                              <Pencil className="size-3.5 text-amber-600" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteNews(n.id, n.headline)}
                              disabled={isDeletingNews}
                              className="p-1.5 rounded-lg text-stone-500 hover:text-red-700 hover:bg-red-50 transition cursor-pointer"
                              title="মুছে ফেলুন"
                            >
                              <Trash2 className="size-3.5 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 3: TOURIST PLACES */}
      {/* ========================================================= */}
      {activeSection === "places" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#D62828] uppercase tracking-wider mb-1">
                <Compass className="size-4" />
                <span>আমাদের রৌমারী পর্যটন</span>
              </div>
              <h2 className="text-xl font-black text-stone-900">দর্শনীয় স্থান ও ভ্রমণ গাইড</h2>
              <p className="text-xs text-stone-500 mt-0.5">রৌমারীর ঐতিহাসিক ও দর্শনীয় স্থানসমূহ পরিচালনা করুন</p>
            </div>
            <Button onClick={handleOpenAddPlace} size="sm" className="bg-[#D62828] hover:bg-[#B91C1C] text-white text-xs font-bold gap-1.5 cursor-pointer shadow-xs">
              <Plus className="size-4" />
              <span>নতুন দর্শনীয় স্থান যোগ করুন</span>
            </Button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-stone-400" />
            <input
              type="text"
              value={placeSearch}
              onChange={(e) => setPlaceSearch(e.target.value)}
              placeholder="স্থানের নাম খুঁজুন..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#D62828]/30"
            />
          </div>

          {loadingPlaces ? (
            <div className="p-8 text-center text-xs text-stone-500">
              <Loader2 className="size-6 animate-spin mx-auto text-[#D62828] mb-2" />
              <span>স্থানসমূহ লোড হচ্ছে...</span>
            </div>
          ) : filteredPlaces.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-stone-500 space-y-2">
              <Compass className="size-10 text-stone-300 mx-auto" />
              <p className="text-sm font-semibold">কোনো দর্শনীয় স্থান পাওয়া যায়নি</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPlaces.map((p) => (
                <div key={p.id} className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="relative aspect-video w-full bg-stone-100 overflow-hidden">
                    <Image
                      src={p.featuredImage || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80"}
                      alt={p.name}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-stone-900 group-hover:text-[#D62828] transition line-clamp-1">
                        {p.name}
                      </h4>
                      <p className="text-[11px] text-[#D62828] flex items-center gap-1 mt-0.5">
                        <MapPin className="size-3 shrink-0" />
                        <span className="truncate">{p.address}</span>
                      </p>
                      <p className="text-xs text-stone-600 line-clamp-3 mt-2">{p.description}</p>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-[10px] text-stone-400">
                        {p.bestTimeToVisit ? `সেরা সময়: ${p.bestTimeToVisit}` : "রৌমারী পর্যটন"}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEditPlace(p)}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-amber-700 hover:bg-amber-50 transition cursor-pointer"
                          title="সম্পাদনা করুন"
                        >
                          <Pencil className="size-3.5 text-amber-600" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePlace(p.id, p.name)}
                          disabled={isDeletingPlace}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-red-700 hover:bg-red-50 transition cursor-pointer"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="size-3.5 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 1: DIRECTORY ADD/EDIT MODAL */}
      {/* ========================================================= */}
      {dirModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-4 animate-in fade-in-50 zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-base font-black text-stone-900">
                {editingDir ? "ডিরেক্টরি তথ্য সম্পাদনা" : "নতুন সেবা ডিরেক্টরিতে যোগ"}
              </h3>
              <button
                type="button"
                onClick={() => setDirModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitDir} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  প্রতিষ্ঠানের নাম <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={dirName}
                  onChange={(e) => setDirName(e.target.value)}
                  placeholder="যেমন: রৌমারী উপজেলা স্বাস্থ্য কমপ্লেক্স"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">ক্যাটাগরি</label>
                  <select
                    value={dirCat}
                    onChange={(e) => setDirCat(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 font-semibold"
                  >
                    <option value="BUS_COUNTER">বাস কাউন্টার ও পরিবহন</option>
                    <option value="HOSPITAL">হাসপাতাল ও ক্লিনিক</option>
                    <option value="POLICE">থানা ও পুলিশ</option>
                    <option value="FIRE_SERVICE">ফায়ার সার্ভিস</option>
                    <option value="UPAZILA_PARISHAD">উপজেলা পরিষদ</option>
                    <option value="BANK">ব্যাংক ও আর্থিক</option>
                    <option value="EDUCATION">শিক্ষা প্রতিষ্ঠান</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    ফোন নম্বর <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={dirPhone}
                    onChange={(e) => setDirPhone(e.target.value)}
                    placeholder="যেমন: 01712-XXXXXX"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">বিকল্প ফোন (ঐচ্ছিক)</label>
                  <input
                    type="text"
                    value={dirAltPhone}
                    onChange={(e) => setDirAltPhone(e.target.value)}
                    placeholder="জরুরি ফোন..."
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    ঠিকানা <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={dirAddress}
                    onChange={(e) => setDirAddress(e.target.value)}
                    placeholder="যেমন: রৌমারী বাজার, কুড়িগ্রাম"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">বিবরণ (ঐচ্ছিক)</label>
                <textarea
                  rows={2}
                  value={dirDescription}
                  onChange={(e) => setDirDescription(e.target.value)}
                  placeholder="সেবার সংক্ষিপ্ত বিবরণ..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="dirEmergency"
                  checked={dirEmergency}
                  onChange={(e) => setDirEmergency(e.target.checked)}
                  className="rounded text-[#D62828] focus:ring-[#D62828]"
                />
                <label htmlFor="dirEmergency" className="font-bold text-stone-700 cursor-pointer">
                  জরুরি হটলাইন সেবায় প্রদর্শন করুন
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                <Button type="button" variant="outline" onClick={() => setDirModalOpen(false)}>
                  বাতিল
                </Button>
                <Button type="submit" disabled={isCreatingDir || isUpdatingDir} className="bg-[#D62828] hover:bg-[#B91C1C] text-white font-bold gap-1.5">
                  {(isCreatingDir || isUpdatingDir) && <Loader2 className="size-3.5 animate-spin" />}
                  <span>{editingDir ? "আপডেট সংরক্ষণ করুন" : "সংরক্ষণ করুন"}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: LOCAL NEWS ADD/EDIT MODAL */}
      {/* ========================================================= */}
      {newsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 space-y-4 animate-in fade-in-50 zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-base font-black text-stone-900">
                {editingNews ? "সংবাদ সম্পাদনা" : "নতুন স্থানীয় সংবাদ প্রকাশ"}
              </h3>
              <button
                type="button"
                onClick={() => setNewsModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitNews} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  সংবাদের শিরোনাম <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newsHeadline}
                  onChange={(e) => setNewsHeadline(e.target.value)}
                  placeholder="খবরের আকর্ষণীয় শিরোনাম লিখুন..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">ক্যাটাগরি</label>
                  <select
                    value={newsCategory}
                    onChange={(e) => setNewsCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 font-semibold"
                  >
                    <option value="COMMUNITY">জনকল্যাণ ও সমাজ</option>
                    <option value="HEALTHCARE">চিকিৎসা ও স্বাস্থ্য</option>
                    <option value="EDUCATION">শিক্ষা ও সংস্কৃতি</option>
                    <option value="TRANSPORT">যাতায়াত ও যোগাযোগ</option>
                    <option value="WELFARE">ত্রাণ ও পুনর্বাসন</option>
                    <option value="EVENT">ইভেন্ট ও মেলা</option>
                    <option value="NEWS">সাধারণ সংবাদ</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">লেখক / প্রতিবেদকের নাম</label>
                  <input
                    type="text"
                    value={newsAuthor}
                    onChange={(e) => setNewsAuthor(e.target.value)}
                    placeholder="যেমন: রৌমারী প্রতিনিধি"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  />
                </div>
              </div>

              <ImageUploader
                value={newsImage}
                onChange={setNewsImage}
                label="ফিচার্ড ছবি নির্বাচন / আপলোড"
                aspectRatio="video"
                description="JPG, PNG, WEBP"
              />

              <div>
                <label className="block font-bold text-stone-700 mb-1">সংক্ষিপ্ত সারাংশ</label>
                <textarea
                  rows={2}
                  value={newsExcerpt}
                  onChange={(e) => setNewsExcerpt(e.target.value)}
                  placeholder="খবরের সংক্ষিপ্ত সারাংশ..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  বিস্তারিত সংবাদ <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  required
                  value={newsContent}
                  onChange={(e) => setNewsContent(e.target.value)}
                  placeholder="সংবাদের বিস্তারিত বিবরণ..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newsBreaking}
                    onChange={(e) => setNewsBreaking(e.target.checked)}
                    className="rounded text-[#D62828]"
                  />
                  <span className="font-bold text-stone-700">ব্রেকিং নিউজ</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newsFeatured}
                    onChange={(e) => setNewsFeatured(e.target.checked)}
                    className="rounded text-[#D62828]"
                  />
                  <span className="font-bold text-stone-700">ফিচার্ড সংবাদ</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                <Button type="button" variant="outline" onClick={() => setNewsModalOpen(false)}>
                  বাতিল
                </Button>
                <Button type="submit" disabled={isCreatingNews || isUpdatingNews} className="bg-[#D62828] hover:bg-[#B91C1C] text-white font-bold gap-1.5">
                  {(isCreatingNews || isUpdatingNews) && <Loader2 className="size-3.5 animate-spin" />}
                  <span>{editingNews ? "আপডেট সংরক্ষণ করুন" : "সংবাদ প্রকাশ করুন"}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: TOURIST PLACES ADD/EDIT MODAL */}
      {/* ========================================================= */}
      {placeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 space-y-4 animate-in fade-in-50 zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-base font-black text-stone-900">
                {editingPlace ? "দর্শনীয় স্থানের তথ্য সম্পাদনা" : "নতুন দর্শনীয় স্থান যোগ"}
              </h3>
              <button
                type="button"
                onClick={() => setPlaceModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitPlace} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  স্থানের নাম <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={placeName}
                  onChange={(e) => setPlaceName(e.target.value)}
                  placeholder="যেমন: ব্রহ্মপুত্র নদী ও দুর্গম চরাঞ্চল"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  অবস্থান / ঠিকানা <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={placeAddress}
                  onChange={(e) => setPlaceAddress(e.target.value)}
                  placeholder="যেমন: রৌমারী ঘাট, কুড়িগ্রাম"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <ImageUploader
                value={placeImage}
                onChange={setPlaceImage}
                label="দর্শনীয় স্থানের ছবি নির্বাচন / আপলোড"
                aspectRatio="video"
                description="JPG, PNG, WEBP"
              />

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  বিস্তারিত বর্ণনা ও আকর্ষণ <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={placeDescription}
                  onChange={(e) => setPlaceDescription(e.target.value)}
                  placeholder="স্থানটির সৌন্দর্য ও ঐতিহাসিক গুরুত্ব বর্ণনা করুন..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">যাতায়াত নির্দেশিকা (ঐচ্ছিক)</label>
                  <textarea
                    rows={2}
                    value={placeGuide}
                    onChange={(e) => setPlaceGuide(e.target.value)}
                    placeholder="কীভাবে যেতে হবে..."
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">ভ্রমণের সেরা সময় (ঐচ্ছিক)</label>
                  <input
                    type="text"
                    value={placeBestTime}
                    onChange={(e) => setPlaceBestTime(e.target.value)}
                    placeholder="যেমন: শীতকাল বা বর্ষাকাল"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                <Button type="button" variant="outline" onClick={() => setPlaceModalOpen(false)}>
                  বাতিল
                </Button>
                <Button type="submit" disabled={isCreatingPlace || isUpdatingPlace} className="bg-[#D62828] hover:bg-[#B91C1C] text-white font-bold gap-1.5">
                  {(isCreatingPlace || isUpdatingPlace) && <Loader2 className="size-3.5 animate-spin" />}
                  <span>{editingPlace ? "আপডেট সংরক্ষণ করুন" : "স্থান যোগ করুন"}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
export default RoumariTab
