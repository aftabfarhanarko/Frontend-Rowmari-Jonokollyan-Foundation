'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileBottomBar from '@/components/layout/MobileBottomBar';
import { useGetRoumariNewsBySlugQuery, useGetRoumariNewsQuery } from '@/store/api/roumariApi';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Calendar, User, Eye, ArrowLeft, Share2 } from 'lucide-react';

export default function RoumariNewsDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { data: news, isLoading } = useGetRoumariNewsBySlugQuery(slug, { skip: !slug });
  const { data: moreNews } = useGetRoumariNewsQuery({ limit: 4 });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col">
        <Navbar lang="bn" />
        <div className="flex-1 flex items-center justify-center p-12 text-sm text-stone-500">লোড হচ্ছে...</div>
        <Footer lang="bn" />
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col">
        <Navbar lang="bn" />
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-stone-600 gap-3">
          <p className="text-base font-bold">সংবাদটি খুঁজে পাওয়া যায়নি।</p>
          <Link href="/roumari" className="text-xs font-bold text-[#D62828] hover:underline">← রৌমারী পোর্টালে ফিরুন</Link>
        </div>
        <Footer lang="bn" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Navbar lang="bn" />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6 w-full">
        <Link href="/roumari" className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-[#D62828]">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>আমাদের রৌমারী পোর্টাল</span>
        </Link>

        <article className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-2xs space-y-5">
          <span className="px-3 py-1 rounded-md bg-red-50 text-[#D62828] text-xs font-black uppercase tracking-wider inline-block">
            {news.category}
          </span>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-stone-900 leading-snug">
            {news.headline}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 border-y border-stone-100 py-3">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-stone-400" />{new Date(news.publishedAt).toLocaleDateString('bn-BD', { dateStyle: 'long' })}</span>
            <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-stone-400" />{news.author}</span>
            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-stone-400" />{news.viewCount} বার পঠিত</span>
          </div>

          <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden bg-stone-100">
            <Image src={news.featuredImage} alt={news.headline} fill className="object-cover" priority />
          </div>

          <div className="prose prose-stone max-w-none text-stone-800 text-sm sm:text-base leading-relaxed space-y-4 pt-2">
            <p className="font-semibold text-stone-900 border-l-4 border-[#D62828] pl-3 py-0.5">{news.excerpt}</p>
            <div className="whitespace-pre-line">{news.content}</div>
          </div>
        </article>
      </main>
      <Footer lang="bn" />
      <MobileBottomBar lang="bn" />
    </div>
  );
}
