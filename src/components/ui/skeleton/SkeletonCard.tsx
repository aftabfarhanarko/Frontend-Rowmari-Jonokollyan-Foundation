import * as React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./Skeleton";
import { SkeletonText } from "./SkeletonText";

export interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "activity" | "campaign" | "news" | "team" | "gallery" | "default";
  imageAspectRatio?: "video" | "square" | "wide";
}

export function SkeletonCard({
  variant = "default",
  imageAspectRatio = "video",
  className,
  ...props
}: SkeletonCardProps) {
  const aspectClass =
    imageAspectRatio === "square"
      ? "aspect-square"
      : imageAspectRatio === "wide"
      ? "aspect-21/9"
      : "aspect-16/10";

  if (variant === "campaign") {
    return (
      <div
        data-slot="skeleton-card-campaign"
        aria-hidden="true"
        className={cn(
          "bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/90 dark:border-stone-800 p-6 shadow-xs flex flex-col justify-between",
          className
        )}
        {...props}
      >
        <div>
          {/* Category Pill and Deadline */}
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-6 w-32 rounded-lg" />
            <Skeleton className="h-5 w-24 rounded-md" />
          </div>

          {/* Title */}
          <Skeleton className="h-6 w-4/5 rounded-md mb-3" />

          {/* Excerpt */}
          <SkeletonText lines={2} size="sm" className="mb-6" />

          {/* Progress Box */}
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/70 dark:border-stone-700/60 space-y-3">
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-28 rounded-md" />
              <Skeleton className="h-4 w-24 rounded-md" />
            </div>
            <Skeleton className="h-3 w-full rounded-full" />
            <div className="flex justify-between items-center pt-1">
              <Skeleton className="h-3 w-28 rounded-md" />
              <Skeleton className="h-3 w-20 rounded-md" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 mt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
          <Skeleton className="h-4 w-32 rounded-md" />
          <Skeleton className="h-9 w-28 rounded-xl" />
        </div>
      </div>
    );
  }

  if (variant === "team") {
    return (
      <div
        data-slot="skeleton-card-team"
        aria-hidden="true"
        className={cn(
          "bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/90 dark:border-stone-800 p-5 shadow-xs flex flex-col items-center text-center",
          className
        )}
        {...props}
      >
        {/* Avatar */}
        <Skeleton className="size-24 rounded-full mb-3.5 ring-4 ring-stone-100 dark:ring-stone-800" />
        {/* Name */}
        <Skeleton className="h-5 w-36 rounded-md mb-1.5" />
        {/* Designation */}
        <Skeleton className="h-4 w-28 rounded-md mb-2.5" />
        {/* Meta / Member ID */}
        <Skeleton className="h-6 w-24 rounded-full mt-1" />
      </div>
    );
  }

  if (variant === "gallery") {
    return (
      <div
        data-slot="skeleton-card-gallery"
        aria-hidden="true"
        className={cn(
          "bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/90 dark:border-stone-800 overflow-hidden shadow-xs",
          className
        )}
        {...props}
      >
        <Skeleton className={cn("w-full", aspectClass)} rounded="none" />
        <div className="p-4 space-y-2">
          <Skeleton className="h-4 w-3/4 rounded-md" />
          <Skeleton className="h-3 w-1/3 rounded-md" />
        </div>
      </div>
    );
  }

  // Default / Activity / News Card
  return (
    <div
      data-slot="skeleton-card"
      aria-hidden="true"
      className={cn(
        "bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/90 dark:border-stone-800 overflow-hidden shadow-xs flex flex-col justify-between",
        className
      )}
      {...props}
    >
      <div>
        {/* Image Placeholder */}
        <Skeleton className={cn("w-full relative", aspectClass)} rounded="none">
          <div className="absolute bottom-3 left-3">
            <Skeleton className="h-5 w-28 rounded-md bg-stone-300/80 dark:bg-stone-700/80" />
          </div>
        </Skeleton>

        {/* Content */}
        <div className="p-5 space-y-3">
          <Skeleton className="h-5 w-5/6 rounded-md" />
          <SkeletonText lines={2} size="sm" />
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 pb-5 pt-0 flex items-center justify-between border-t border-stone-100 dark:border-stone-800 mt-2">
        <Skeleton className="h-4 w-24 rounded-md" />
        <Skeleton className="h-4 w-16 rounded-md" />
      </div>
    </div>
  );
}

export default SkeletonCard;
