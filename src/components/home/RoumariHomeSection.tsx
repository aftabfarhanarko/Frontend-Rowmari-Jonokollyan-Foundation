import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Newspaper, ArrowRight, Shield, Flame } from 'lucide-react';
import { useGetRoumariOverviewQuery } from '@/store/api/roumariApi';

export function RoumariHomeSection() {
  const { data: overview } = useGetRoumariOverviewQuery();
  const emergency = overview?.emergencyContacts?.slice(0, 3) || [];
  const latestNews = overview?.latestNews?.slice(0, 2) || [];
  const tourist = overview?.touristPlaces?.[0];

  return (
    <section className="py-12 bg-stone-50/70 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#D62828] text-xs font-bold mb-1.5 border border-red-200">
              <MapPin className="w-3.5 h-3.5" />
              <span>আমাদের প্রিয় রৌমারী</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              রৌমারী ডিজিটাল তথ্য বাতায়ন ও সংবাদ
            </h2>
            <p className="text-xs text-stone-500">জরুরি যোগাযোগ, স্থানীয় সেবা ও সর্বশেষ খবর এক ক্লিকে</p>
          </div>
          <Link
            href="/roumari"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D62828] hover:bg-[#B91C1C] text-white text-xs font-bold shadow-xs transition"
          >
            <span>সম্পূর্ণ রৌমারী পোর্টাল দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* 1. Emergency Hotlines Card */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
            <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#D62828]" />
              <span>জরুরি হটলাইন নম্বর</span>
            </h3>
            <div className="space-y-2">
              {emergency.map((c) => (
                <div key={c.id} className="p-2.5 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between text-xs">
                  <div className="min-w-0 pr-2">
                    <p className="font-bold text-stone-800 truncate">{c.name}</p>
                    <p className="text-[11px] font-mono text-stone-500">{c.phoneNumber}</p>
                  </div>
                  <a href={`tel:${c.phoneNumber}`} className="p-1.5 rounded-lg bg-red-100 text-[#D62828] hover:bg-red-200 transition shrink-0">
                    <Phone className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
            <Link href="/roumari" className="text-[11px] font-bold text-[#D62828] hover:underline block pt-1 text-center">
              সকল ডিরেক্টরি দেখুন →
            </Link>
          </div>

          {/* 2. Latest News Snapshot */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
            <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
              <Newspaper className="w-4 h-4 text-[#D62828]" />
              <span>রৌমারী তাজা সংবাদ</span>
            </h3>
            <div className="space-y-3">
              {latestNews.map((n) => (
                <Link key={n.id} href={`/roumari/news/${n.slug}`} className="group block space-y-1">
                  <p className="text-xs font-bold text-stone-800 group-hover:text-[#D62828] transition line-clamp-2 leading-snug">
                    {n.headline}
                  </p>
                  <p className="text-[10px] text-stone-400 font-medium">
                    {new Date(n.publishedAt).toLocaleDateString('bn-BD')}
                  </p>
                </Link>
              ))}
            </div>
            <Link href="/roumari" className="text-[11px] font-bold text-[#D62828] hover:underline block pt-1 text-center">
              আরও সংবাদ পড়ুন →
            </Link>
          </div>

          {/* 3. Featured Place of Roumari */}
          {tourist && (
            <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden group flex flex-col justify-between">
              <div>
                <div className="relative h-32 w-full bg-stone-100">
                  <Image src={tourist.featuredImage} alt={tourist.name} fill className="object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="p-4 space-y-1">
                  <span className="text-[10px] font-bold text-[#D62828]">রৌমারীর দর্শনীয় স্থান</span>
                  <h4 className="font-bold text-xs text-stone-900 leading-snug">{tourist.name}</h4>
                  <p className="text-[11px] text-stone-500 line-clamp-2">{tourist.description}</p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <Link href="/roumari" className="text-[11px] font-bold text-[#D62828] hover:underline block text-center">
                  রৌমারী ঘুরে দেখুন →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
