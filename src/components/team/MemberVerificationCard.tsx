import React from 'react';
import Image from 'next/image';
import { VerifiedMemberProfile } from '@/store/api/committeesApi';
import { ShieldCheck, User, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

interface Props {
  profile: VerifiedMemberProfile;
}

export function MemberVerificationCard({ profile }: Props) {
  return (
    <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm max-w-xl mx-auto">
      {/* Top Verified Header Ribbon */}
      <div className="bg-[#D62828] text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-white" />
          <span className="font-black text-xs sm:text-sm tracking-wide">
            রৌমারী জনকল্যাণ ফাউন্ডেশন — অনুমোদিত সদস্য
          </span>
        </div>
        <span className="bg-white/20 text-white font-mono font-bold text-xs px-2.5 py-1 rounded-md">
          {profile.memberId}
        </span>
      </div>

      <div className="p-6 space-y-5">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="relative size-24 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0 shadow-2xs">
            {profile.photoUrl ? (
              <Image src={profile.photoUrl} alt={profile.nameBn} fill className="object-cover" />
            ) : (
              <div className="size-full flex items-center justify-center text-stone-400">
                <User className="size-10" />
              </div>
            )}
          </div>
          <div className="text-center sm:text-left space-y-1">
            <h3 className="text-lg font-black text-stone-900">{profile.nameBn}</h3>
            <p className="text-xs font-semibold text-stone-500">{profile.nameEn}</p>
            <p className="text-[11px] text-stone-600 flex items-center justify-center sm:justify-start gap-1 pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#D62828]" />
              <span>{profile.village ? `${profile.village}, ` : ''}{profile.unionName || 'রৌমারী'}, {profile.district}</span>
            </p>
          </div>
        </div>

        {/* Bio */}
        {profile.bio && (
          <p className="text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-100 leading-relaxed">
            {profile.bio}
          </p>
        )}

        {/* Committee Affiliations */}
        <div className="space-y-2 pt-2 border-t border-stone-100">
          <h4 className="text-xs font-bold text-stone-700">কমিটি ও পদবীসমূহ:</h4>
          <div className="space-y-2">
            {profile.committees.map((c, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-stone-900">{c.committeeName} ({c.committeeYear})</p>
                  <p className="text-[11px] text-[#D62828] font-bold">{c.designationBn}</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-[#D62828]">
                  {c.status === 'ACTIVE' ? 'সক্রিয়' : c.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
