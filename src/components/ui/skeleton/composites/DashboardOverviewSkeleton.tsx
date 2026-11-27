import React from "react";
import { Skeleton } from "../Skeleton";
import { SkeletonStats } from "../SkeletonStats";
import { SkeletonChart } from "../SkeletonChart";
import { SkeletonTable } from "../SkeletonTable";

export function DashboardOverviewSkeleton() {
  return (
    <div data-slot="dashboard-overview-skeleton" className="space-y-6">
      {/* Welcome Banner Skeleton */}
      <div className="bg-gradient-to-r from-[#123D32] to-[#0D2C24] p-6 sm:p-8 rounded-3xl text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-2">
          <Skeleton className="h-7 w-64 rounded-md bg-white/20" />
          <Skeleton className="h-4 w-96 max-w-full rounded-md bg-white/10" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-32 rounded-xl bg-[#F97316]/70" />
          <Skeleton className="h-10 w-28 rounded-xl bg-white/20" />
        </div>
      </div>

      {/* 4 Stats Cards */}
      <SkeletonStats count={4} variant="surface" />

      {/* Analytics Chart + Quick Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SkeletonChart height="h-80" />
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-xs space-y-4">
          <Skeleton className="h-5 w-40 rounded-md mb-2" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-3.5 rounded-xl border border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-10 rounded-lg" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-28 rounded-md" />
                    <Skeleton className="h-3 w-20 rounded-md" />
                  </div>
                </div>
                <Skeleton className="h-8 w-20 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-44 rounded-md" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
        <SkeletonTable rows={5} columns={5} showToolbar={false} />
      </div>
    </div>
  );
}

export default DashboardOverviewSkeleton;
