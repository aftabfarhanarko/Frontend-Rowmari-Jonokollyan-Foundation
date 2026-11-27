import * as React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./Skeleton";

export interface SkeletonChartProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: string; // default "h-72"
  barsCount?: number;
}

export function SkeletonChart({
  height = "h-72",
  barsCount = 12,
  className,
  ...props
}: SkeletonChartProps) {
  // Varied bar heights to look like realistic chart telemetry
  const barHeights = [40, 65, 30, 85, 55, 95, 70, 45, 80, 60, 90, 75];

  return (
    <div
      data-slot="skeleton-chart"
      aria-hidden="true"
      className={cn(
        "p-6 rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs space-y-5",
        className
      )}
      {...props}
    >
      {/* Chart Header */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
        <div>
          <Skeleton className="h-5 w-44 rounded-md mb-1.5" />
          <Skeleton className="h-3.5 w-60 rounded-md" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-24 rounded-lg" />
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
      </div>

      {/* Main Chart Bars / Plot Area */}
      <div className={cn("w-full flex items-end justify-between gap-2 sm:gap-3 pt-6 px-2", height)}>
        {Array.from({ length: barsCount }).map((_, index) => {
          const heightPercent = barHeights[index % barHeights.length];
          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <Skeleton
                className="w-full max-w-10 rounded-t-lg transition-all"
                style={{ height: `${heightPercent}%` }}
              />
              <Skeleton className="h-3 w-6 rounded-xs" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SkeletonChart;
