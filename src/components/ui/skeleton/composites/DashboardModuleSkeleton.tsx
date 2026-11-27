import React from "react";
import { Skeleton } from "../Skeleton";
import { SkeletonTable } from "../SkeletonTable";
import { SkeletonStats } from "../SkeletonStats";

export interface DashboardModuleSkeletonProps {
  title?: string;
  withStats?: boolean;
  tableRows?: number;
  tableCols?: number;
}

export function DashboardModuleSkeleton({
  withStats = false,
  tableRows = 6,
  tableCols = 5,
}: DashboardModuleSkeletonProps) {
  return (
    <div data-slot="dashboard-module-skeleton" className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/80 dark:border-stone-800">
        <div className="space-y-1.5">
          <Skeleton className="h-7 w-52 rounded-lg" />
          <Skeleton className="h-4 w-80 max-w-full rounded-md" />
        </div>
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-9 w-24 rounded-xl" />
          <Skeleton className="h-9 w-32 rounded-xl bg-[#123D32]/80" />
        </div>
      </div>

      {/* Optional Top Statistics Strip */}
      {withStats && <SkeletonStats count={3} variant="surface" />}

      {/* Main Data Table */}
      <SkeletonTable rows={tableRows} columns={tableCols} />
    </div>
  );
}

export default DashboardModuleSkeleton;
