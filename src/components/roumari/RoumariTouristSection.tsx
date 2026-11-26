import React from 'react';
import Image from 'next/image';
import { MapPin, Navigation, Compass } from 'lucide-react';
import { RoumariTouristPlaceItem } from '@/store/api/roumariApi';

interface Props {
  places: RoumariTouristPlaceItem[];
}

export function RoumariTouristSection({ places }: Props) {
  if (!places || places.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-stone-200 pb-2">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-[#D62828]" />
          <div>
            <h2 className="text-lg sm:text-xl font-black text-stone-900">রৌমারীর দর্শনীয় ও ঐতিহাসিক স্থানসমূহ</h2>
            <p className="text-xs text-stone-500">প্রাকৃতিক সৌন্দর্য, ব্রহ্মপুত্র ও মুক্তিযুদ্ধের স্মৃতিবিজড়িত মুক্তাঞ্চল</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {places.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:border-red-300 transition group flex flex-col justify-between">
            <div>
              <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
                <Image src={p.featuredImage} alt={p.name} fill className="object-cover group-hover:scale-105 transition duration-500" />
                {p.bestTimeToVisit && (
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-white text-[10px] font-bold">
                    {p.bestTimeToVisit}
                  </span>
                )}
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-black text-sm text-stone-900 leading-snug group-hover:text-[#D62828] transition">{p.name}</h3>
                <p className="text-[11px] text-stone-500 flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#D62828] shrink-0" /><span>{p.address}</span></p>
                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">{p.description}</p>
              </div>
            </div>
            {p.travelGuide && (
              <div className="p-4 pt-0">
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100 text-[11px] text-stone-600 flex items-start gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                  <span><strong>যাতায়াত:</strong> {p.travelGuide}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
