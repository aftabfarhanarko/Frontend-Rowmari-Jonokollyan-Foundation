import React from "react";
import { Skeleton } from "../Skeleton";
import { SkeletonCard } from "../SkeletonCard";

export interface PublicPageSkeletonProps {
  cardCount?: number;
  variant?: "activity" | "campaign" | "news" | "team" | "gallery" | "default";
}

export function PublicPageSkeleton({
  cardCount = 6,
  variant = "activity",
}: PublicPageSkeletonProps) {
  const isCampaign = variant === "campaign";
  const isTeam = variant === "team";

  const gridClass = isCampaign
    ? "grid-cols-1 md:grid-cols-2"
    : isTeam
    ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div data-slot="public-page-skeleton" className="min-h-screen bg-[#FAF9F6] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Banner / Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-block">
            <Skeleton className="h-6 w-32 rounded-full mx-auto" />
          </div>
          <Skeleton className="h-10 sm:h-12 w-3/4 mx-auto rounded-xl" />
          <Skeleton className="h-4 w-4/5 mx-auto rounded-md" />
        </div>

        {/* Filter Pills Bar */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-24 sm:w-28 rounded-full shrink-0" />
          ))}
        </div>

        {/* Card Grid */}
        <div className={`grid gap-6 ${gridClass}`}>
          {Array.from({ length: cardCount }).map((_, i) => (
            <SkeletonCard key={i} variant={variant} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PublicPageSkeleton;
