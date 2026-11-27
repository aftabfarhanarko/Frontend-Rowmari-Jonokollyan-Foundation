import * as React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./Skeleton";
import { SkeletonText } from "./SkeletonText";

export interface SkeletonProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "admin" | "member";
}

export function SkeletonProfile({
  variant = "admin",
  className,
  ...props
}: SkeletonProfileProps) {
  return (
    <div
      data-slot="skeleton-profile"
      aria-hidden="true"
      className={cn("space-y-6", className)}
      {...props}
    >
      {/* Profile Header Card */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/90 dark:border-stone-800 p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Top Cover Banner */}
        <div className="h-32 sm:h-40 -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 bg-gradient-to-r from-stone-200 to-stone-300 dark:from-stone-800 dark:to-stone-700 animate-skeleton" />

        {/* Profile Avatar + Meta */}
        <div className="relative -mt-16 sm:-mt-20 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
            <Skeleton className="size-28 sm:size-32 rounded-full ring-4 ring-white dark:ring-stone-900 shadow-md shrink-0" />
            <div className="space-y-2 pb-1">
              <Skeleton className="h-6 w-48 rounded-md" />
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Skeleton className="h-5 w-24 rounded-full" />
                <Skeleton className="h-5 w-32 rounded-full" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 pb-1">
            <Skeleton className="h-10 w-28 rounded-xl" />
            <Skeleton className="h-10 w-28 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Profile Content Grid / Form Skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Quick Info */}
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-xs space-y-4">
          <Skeleton className="h-5 w-32 rounded-md mb-2" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center py-1.5 border-b border-stone-100 dark:border-stone-800 last:border-0">
                <Skeleton className="h-4 w-20 rounded-md" />
                <Skeleton className="h-4 w-32 rounded-md" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Detailed Form or Content */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-xs space-y-5">
          <Skeleton className="h-5 w-44 rounded-md pb-2 border-b border-stone-100 dark:border-stone-800" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Skeleton className="h-3.5 w-20 rounded-md" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-3.5 w-24 rounded-md" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Skeleton className="h-3.5 w-28 rounded-md" />
              <Skeleton className="h-20 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonProfile;
