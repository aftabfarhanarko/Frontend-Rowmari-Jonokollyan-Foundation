import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Eye, Newspaper, ArrowRight } from 'lucide-react';
import { RoumariNewsItem } from '@/store/api/roumariApi';

interface Props {
  news: RoumariNewsItem[];
}

export function RoumariNewsSection({ news }: Props) {
  if (!news || news.length === 0) return null;

  const featured = news[0];
  const rest = news.slice(1, 4);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-stone-200 pb-2">
        <div className="flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-[#D62828]" />
          <h2 className="text-lg sm:text-xl font-black text-stone-900">রৌমারীর তাজা খবর ও উন্নয়ন সমাচার</h2>
        </div>
        <Link href="/roumari/news" className="text-xs font-bold text-[#D62828] hover:underline flex items-center gap-1">
          <span>সকল সংবাদ</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Main Lead News */}
        {featured && (
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs group">
            <div className="relative h-56 sm:h-64 w-full bg-stone-100 overflow-hidden">
              <Image
                src={featured.featuredImage}
                alt={featured.headline}
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#D62828] text-white text-[10px] font-black uppercase tracking-wider">
                {featured.category}
              </span>
            </div>
            <div className="p-5 space-y-2.5">
              <div className="flex items-center gap-3 text-[11px] text-stone-500">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-stone-400" />{new Date(featured.publishedAt).toLocaleDateString('bn-BD')}</span>
                <span className="flex items-center gap-1"><User className="w-3 h-3 text-stone-400" />{featured.author}</span>
                <span className="flex items-center gap-1"><Eye className="w-3 h-3 text-stone-400" />{featured.viewCount} বার পঠিত</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-stone-900 leading-snug group-hover:text-[#D62828] transition">
                <Link href={`/roumari/news/${featured.slug}`}>{featured.headline}</Link>
              </h3>
              <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">{featured.excerpt}</p>
            </div>
          </div>
        )}

        {/* Side News List */}
        <div className="lg:col-span-5 space-y-3.5">
          {rest.map((n) => (
            <Link
              key={n.id}
              href={`/roumari/news/${n.slug}`}
              className="flex gap-3 bg-white p-3 rounded-2xl border border-stone-200 hover:border-red-300 transition shadow-2xs group"
            >
              <div className="relative w-24 sm:w-28 h-20 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                <Image src={n.featuredImage} alt={n.headline} fill className="object-cover group-hover:scale-105 transition duration-300" />
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <span className="text-[10px] font-bold text-[#D62828] block">{n.category}</span>
                <h4 className="text-xs font-bold text-stone-900 line-clamp-2 leading-snug group-hover:text-[#D62828] transition">
                  {n.headline}
                </h4>
                <p className="text-[10px] text-stone-400 font-medium">
                  {new Date(n.publishedAt).toLocaleDateString('bn-BD')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
