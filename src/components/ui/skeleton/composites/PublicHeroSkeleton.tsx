import React from "react";
import { Skeleton } from "../Skeleton";

export function PublicHeroSkeleton() {
  return (
    <section aria-label="Hero Loading" className="pt-0 sm:pt-4 pb-8 sm:pb-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Main Split Hero Card Skeleton - Clean White Card */}
        <div className="w-full rounded-2xl md:rounded-3xl border border-stone-200/90 bg-white p-5 sm:p-7 md:p-9 lg:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Left Column: Text Placeholders */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <Skeleton className="h-7 w-56 sm:w-72 rounded-full" />
              <Skeleton className="h-6 w-28 rounded-md" />
              <Skeleton className="h-9 sm:h-12 w-4/5 rounded-xl" />
              <div className="space-y-2 pt-1 max-w-xl">
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-5/6 rounded-md" />
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Skeleton className="h-11 sm:h-12 w-32 sm:w-36 rounded-xl" />
                <Skeleton className="h-11 sm:h-12 w-36 sm:w-40 rounded-xl" />
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-stone-100">
                <Skeleton className="h-2 w-7 rounded-full" />
                <Skeleton className="h-2 w-2 rounded-full" />
                <Skeleton className="h-2 w-2 rounded-full" />
                <Skeleton className="h-2 w-2 rounded-full" />
              </div>
            </div>

            {/* Right Column: Clean Image Skeleton - NO TEXT OVER IMAGE */}
            <div className="lg:col-span-5">
              <Skeleton className="w-full aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 rounded-xl sm:rounded-2xl shadow-xs" />
            </div>
          </div>
        </div>

        {/* 4 Cards Skeleton Grid - NO TEXT OVER IMAGES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white border border-stone-200/90 shadow-xs overflow-hidden flex flex-col justify-between"
            >
              {/* Image box skeleton */}
              <Skeleton className="w-full aspect-16/10 rounded-none" />
              {/* Text lines below image */}
              <div className="p-4 sm:p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-16 rounded-md" />
                  <Skeleton className="h-4 w-20 rounded-md" />
                </div>
                <Skeleton className="h-5 w-4/5 rounded-md" />
                <Skeleton className="h-3 w-full rounded-md" />
                <div className="pt-2 border-t border-stone-100 flex justify-between items-center">
                  <Skeleton className="h-4 w-24 rounded-md" />
                  <Skeleton className="h-4 w-12 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PublicHeroSkeleton;
