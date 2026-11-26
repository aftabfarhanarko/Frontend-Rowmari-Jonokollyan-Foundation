import React, { useState } from 'react';
import { Phone, Search, Building2, MapPin } from 'lucide-react';
import { RoumariDirectoryItem } from '@/store/api/roumariApi';

const CATEGORIES = [
  { id: 'ALL', label: 'সকল সেবা' },
  { id: 'BUS_COUNTER', label: 'বাস কাউন্টার ও পরিবহন' },
  { id: 'HOSPITAL', label: 'হাসপাতাল ও ক্লিনিক' },
  { id: 'POLICE', label: 'থানা ও পুলিশ' },
  { id: 'FIRE_SERVICE', label: 'ফায়ার সার্ভিস' },
  { id: 'UPAZILA_PARISHAD', label: 'উপজেলা পরিষদ' },
  { id: 'BANK', label: 'ব্যাংক ও আর্থিক' },
  { id: 'EDUCATION', label: 'শিক্ষা প্রতিষ্ঠান' },
];

interface Props {
  directories: RoumariDirectoryItem[];
}

export function RoumariDirectorySection({ directories }: Props) {
  const [selectedCat, setSelectedCat] = useState('ALL');
  const [search, setSearch] = useState('');

  const filtered = (directories || []).filter((d) => {
    if (selectedCat !== 'ALL' && d.category !== selectedCat) return false;
    if (search.trim()) {
      const s = search.toLowerCase();
      return (
        d.name.toLowerCase().includes(s) ||
        d.phoneNumber.includes(s) ||
        d.address.toLowerCase().includes(s)
      );
    }
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-stone-900">রৌমারী সেবা ও যোগাযোগ ডিরেক্টরি</h2>
          <p className="text-xs text-stone-500">জরুরি প্রয়োজনে হাসপাতাল, বাস কাউন্টার, পুলিশ ও সরকারি কর্মকর্তা</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="size-3.5 absolute left-3 top-2.5 text-stone-400" />
          <input
            type="text"
            placeholder="নাম, ফোন বা স্থান খুঁজুন..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-[#D62828]"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCat(c.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              selectedCat === c.id
                ? 'bg-[#D62828] text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filtered.map((d) => (
          <div key={d.id} className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-2 hover:border-red-300 transition">
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-bold text-xs sm:text-sm text-stone-900">{d.name}</h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-600 shrink-0">
                {d.category}
              </span>
            </div>
            <p className="text-[11px] text-stone-500 flex items-start gap-1">
              <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
              <span>{d.address}</span>
            </p>
            {d.description && <p className="text-[11px] text-stone-600 line-clamp-1">{d.description}</p>}
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
              <div className="font-mono text-xs font-bold text-stone-800">{d.phoneNumber}</div>
              <a
                href={`tel:${d.phoneNumber}`}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#D62828] hover:bg-[#B91C1C] text-white text-[11px] font-bold transition shadow-xs cursor-pointer"
              >
                <Phone className="w-3 h-3" />
                <span>কল দিন</span>
              </a>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-8 text-center text-xs text-stone-400">
            কোনো সেবা তথ্য পাওয়া যায়নি।
          </div>
        )}
      </div>
    </div>
  );
}
