import React from "react";
import { Skeleton, SkeletonCard, SkeletonStats } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Banner */}
        <div className="bg-[#123D32]/90 rounded-3xl p-8 text-white space-y-3">
          <Skeleton className="h-6 w-36 rounded-md bg-white/20" />
          <Skeleton className="h-10 w-3/4 rounded-xl bg-white/30" />
          <Skeleton className="h-4 w-1/2 rounded-md bg-white/15" />
        </div>

        {/* Directory Stats */}
        <SkeletonStats count={4} variant="surface" />

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} variant="activity" />
          ))}
        </div>
      </div>
    </div>
  );
}
