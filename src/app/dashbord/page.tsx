'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Home, 
  BarChart3, 
  Users, 
  Bell, 
  Settings,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';

interface NotificationItem {
  id: string;
  titleBn: string;
  descBn: string;
  timeBn: string;
  type: 'urgent' | 'info' | 'success';
  isUnread: boolean;
}

export default function AdminNotificationPage() {
  const [filter, setFilter] = useState<'all' | 'unread' | 'urgent'>('all');
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      titleBn: 'নতুন রক্তের অনুরোধ',
      descBn: 'ও-পজিটিভ (O+) ২ ব্যাগ • রৌমারী উপজেলা স্বাস্থ্য কমপ্লেক্স',
      timeBn: '১০ মিনিট আগে',
      type: 'urgent',
      isUnread: true,
    },
    {
      id: '2',
      titleBn: 'আবেদন RJF-MED-8492 হালনাগাদ',
      descBn: 'চিকিৎসা সহায়তা • যাচাইকারী কর্মকর্তা পরিদর্শন সম্পন্ন করেছেন',
      timeBn: '২৫ মিনিট আগে',
      type: 'info',
      isUnread: true,
    },
    {
      id: '3',
      titleBn: 'ক্যাম্পেইনের লক্ষ্যমাত্রা পূর্ণ',
      descBn: 'শীতবস্ত্র বিতরণ ২০২৪ • ৫০,০০০ টাকা সফলভাবে সংগৃহীত হয়েছে',
      timeBn: '২ ঘণ্টা আগে',
      type: 'success',
      isUnread: false,
    },
    {
      id: '4',
      titleBn: 'SMS পাঠানো হয়েছে',
      descBn: 'জরুরি রক্তের প্রয়োজনের প্রেক্ষিতে ১৫ জন রক্তদাতাকে বার্তা প্রেরিত',
      timeBn: '৫ ঘণ্টা আগে',
      type: 'info',
      isUnread: false,
    },
    {
      id: '5',
      titleBn: 'নতুন স্বেচ্ছাসেবক আবেদন',
      descBn: 'তানভীর আহমেদ • শিক্ষা সহায়তা উইংয়ে যুক্ত হতে আবেদন করেছেন',
      timeBn: '১ দিন আগে',
      type: 'info',
      isUnread: false,
    },
  ]);

  const filteredList = notifications.filter(item => {
    if (filter === 'unread') return item.isUnread;
    if (filter === 'urgent') return item.type === 'urgent';
    return true;
  });

  const toggleReadStatus = (id: string) => {
    setNotifications(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isUnread: !item.isUnread } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-[#1E293B] flex flex-col justify-between">
      {/* Admin Top Header matching wireframe */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-30 px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Link href="/" className="relative w-9 h-9 shrink-0">
              <Image
                src="/logo.png"
                alt="RJF Logo"
                fill
                sizes="36px"
                className="object-contain"
                priority
              />
            </Link>
            <div>
              <div className="text-xs font-medium text-stone-600 leading-tight">
                রৌমারী জনকল্যাণ
              </div>
              <div className="text-sm font-bold text-[#0D5C35] leading-tight">
                অ্যাডমিন
              </div>
            </div>
          </div>

          {/* Admin Avatar Circle "স" */}
          <div className="w-9 h-9 rounded-full bg-[#0D5C35] text-white font-bold flex items-center justify-center text-sm shadow-sm select-none">
            স
          </div>
        </div>
      </header>

      {/* Main Notification Content */}
      <main className="flex-1 max-w-md w-full mx-auto px-4 py-5 pb-24">
        {/* Title */}
        <h1 className="text-2xl font-black text-[#0D5C35] tracking-tight mb-4">
          নোটিফিকেশন
        </h1>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filter === 'all'
                ? 'bg-[#0D5C35] text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-50'
            }`}
          >
            সব
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filter === 'unread'
                ? 'bg-[#0D5C35] text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-50'
            }`}
          >
            অপঠিত
          </button>
          <button
            onClick={() => setFilter('urgent')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filter === 'urgent'
                ? 'bg-[#0D5C35] text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-50'
            }`}
          >
            জরুরি
          </button>
        </div>

        {/* Notifications Container Card */}
        <div className="bg-white rounded-2xl border border-stone-200/90 shadow-xs overflow-hidden">
          {filteredList.length === 0 ? (
            <div className="p-8 text-center text-stone-400 text-sm">
              কোনো নোটিফিকেশন নেই
            </div>
          ) : (
            filteredList.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => toggleReadStatus(item.id)}
                className={`p-4 flex items-start gap-3.5 cursor-pointer transition-colors hover:bg-stone-50/70 ${
                  idx !== filteredList.length - 1 ? 'border-b border-stone-100' : ''
                }`}
              >
                {/* Red Unread Indicator Dot */}
                <div className="pt-1.5 shrink-0 w-3 flex justify-center">
                  {item.isUnread ? (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#E53935] shadow-xs animate-pulse" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-transparent" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-stone-900 leading-snug">
                    {item.titleBn}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                    {item.descBn}
                  </p>
                  <span className="inline-block text-[11px] text-stone-400 font-medium mt-1">
                    {item.timeBn}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Admin Bottom Navigation Bar matching wireframe */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 z-30 py-2">
        <div className="max-w-md mx-auto grid grid-cols-5 items-center justify-items-center">
          <Link
            href="/"
            className="flex flex-col items-center gap-1 text-stone-500 hover:text-[#0D5C35] text-[11px] font-medium transition-colors"
          >
            <Home className="w-5 h-5 stroke-[1.8]" />
            <span>হোম</span>
          </Link>

          <button
            onClick={() => {}}
            className="flex flex-col items-center gap-1 text-stone-500 hover:text-[#0D5C35] text-[11px] font-medium transition-colors"
          >
            <BarChart3 className="w-5 h-5 stroke-[1.8]" />
            <span>বিশ্লেষণ</span>
          </button>

          <button
            onClick={() => {}}
            className="flex flex-col items-center gap-1 text-stone-500 hover:text-[#0D5C35] text-[11px] font-medium transition-colors"
          >
            <Users className="w-5 h-5 stroke-[1.8]" />
            <span>ব্যবহারকারী</span>
          </button>

          {/* Active Notifications Tab with Green Container */}
          <div className="flex flex-col items-center">
            <div className="w-11 h-9 rounded-xl bg-[#0D5C35] text-white flex items-center justify-center shadow-xs">
              <Bell className="w-5 h-5 stroke-[2]" />
            </div>
          </div>

          <button
            onClick={() => {}}
            className="flex flex-col items-center gap-1 text-stone-500 hover:text-[#0D5C35] text-[11px] font-medium transition-colors"
          >
            <Settings className="w-5 h-5 stroke-[1.8]" />
            <span>সেটিংস</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
