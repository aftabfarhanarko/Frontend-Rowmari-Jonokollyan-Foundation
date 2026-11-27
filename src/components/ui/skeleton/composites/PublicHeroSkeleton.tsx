import React from "react";
import { Skeleton } from "../Skeleton";
import { SkeletonText } from "../SkeletonText";

export function PublicHeroSkeleton() {
  return (
    <section aria-label="Hero Loading" className="pt-0 sm:pt-4 pb-8 sm:pb-12 bg-[#FAF9F6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 space-y-8">
        {/* Panoramic Banner Card Skeleton */}
        <div className="relative w-full rounded-none sm:rounded-2xl md:rounded-3xl overflow-hidden min-h-[340px] sm:min-h-[400px] md:min-h-[460px] lg:min-h-[500px] bg-[#123D32]/90 p-5 sm:p-8 md:p-12 lg:p-14 flex flex-col justify-between shadow-xl">
          {/* Top Tagline Badge */}
          <Skeleton className="h-7 w-64 sm:w-80 rounded-full bg-emerald-800/60" />

          {/* Main Title & Subtitle & CTAs */}
          <div className="max-w-2xl space-y-4 my-auto py-4">
            <Skeleton className="h-6 w-36 rounded-md bg-[#F97316]/50" />
            <Skeleton className="h-10 sm:h-14 w-full rounded-xl bg-white/20" />
            <Skeleton className="h-5 sm:h-6 w-4/5 rounded-lg bg-white/15" />
            <SkeletonText lines={2} size="md" className="max-w-xl opacity-75" />

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Skeleton className="h-12 w-36 rounded-xl bg-[#F97316]/70" />
              <Skeleton className="h-12 w-44 rounded-xl bg-white/20" />
            </div>
          </div>

          {/* Slide Indicator Dots */}
          <div className="mx-auto flex items-center gap-2 pt-2">
            <Skeleton className="h-2 w-7 rounded-full bg-[#F97316]/80" />
            <Skeleton className="h-2 w-2 rounded-full bg-white/30" />
            <Skeleton className="h-2 w-2 rounded-full bg-white/30" />
            <Skeleton className="h-2 w-2 rounded-full bg-white/30" />
          </div>
        </div>

        {/* 4 Cards Quick Actions Skeleton Strip */}
        <div className="-mt-6 sm:-mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 px-4 sm:px-0">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs space-y-4"
            >
              <div className="flex justify-between items-center">
                <Skeleton className="size-12 rounded-xl" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
              <Skeleton className="h-6 w-32 rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
              <div className="pt-3 border-t border-stone-100 flex justify-between items-center">
                <Skeleton className="h-4 w-20 rounded-md" />
                <Skeleton className="size-7 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PublicHeroSkeleton;
