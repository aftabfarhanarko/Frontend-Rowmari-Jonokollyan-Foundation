import React from 'react';
import { Phone, Shield, Flame, Building2, MapPin } from 'lucide-react';
import { RoumariDirectoryItem } from '@/store/api/roumariApi';

interface Props {
  contacts: RoumariDirectoryItem[];
}

export function RoumariEmergencyBar({ contacts }: Props) {
  if (!contacts || contacts.length === 0) return null;

  const getIcon = (cat: string) => {
    switch (cat) {
      case 'POLICE': return <Shield className="w-4 h-4 text-[#D62828]" />;
      case 'FIRE_SERVICE': return <Flame className="w-4 h-4 text-orange-600" />;
      case 'HOSPITAL': return <Phone className="w-4 h-4 text-red-600" />;
      default: return <Building2 className="w-4 h-4 text-stone-700" />;
    }
  };

  return (
    <div className="bg-red-50/80 border border-red-200/80 rounded-2xl p-4 sm:p-5 shadow-xs">
      <div className="flex items-center gap-2 mb-3">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D62828]" />
        </span>
        <h3 className="text-xs sm:text-sm font-black text-red-950 uppercase tracking-wide">
          রৌমারী জরুরি সেবা হটলাইন (২৪ ঘণ্টা চালু)
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {contacts.slice(0, 4).map((c) => (
          <div key={c.id} className="bg-white p-3 rounded-xl border border-red-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-2 rounded-lg bg-stone-50 shrink-0">
                {getIcon(c.category)}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-stone-900 truncate">{c.name}</p>
                <p className="text-[11px] text-stone-500 font-mono">{c.phoneNumber}</p>
              </div>
            </div>
            <a
              href={`tel:${c.phoneNumber}`}
              className="p-2 rounded-lg bg-[#D62828] text-white hover:bg-[#B91C1C] transition shrink-0 ml-2 shadow-xs cursor-pointer"
              title="কল করুন"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
