import * as React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./Skeleton";

export interface SkeletonStatsProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number; // default 4
  variant?: "gradient" | "surface" | "minimal";
}

export function SkeletonStats({
  count = 4,
  variant = "surface",
  className,
  ...props
}: SkeletonStatsProps) {
  const gridColsClass =
    count === 1
      ? "grid-cols-1"
      : count === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : count === 3
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div
      data-slot="skeleton-stats"
      aria-hidden="true"
      className={cn("grid gap-4 sm:gap-5", gridColsClass, className)}
      {...props}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "p-6 rounded-2xl border flex flex-col justify-between relative overflow-hidden shadow-xs",
            variant === "gradient"
              ? "bg-[#123D32]/90 border-emerald-900/60 text-white min-h-[170px]"
              : "bg-white dark:bg-stone-900 border-stone-200/90 dark:border-stone-800"
          )}
        >
          <div>
            {/* Top Row: Icon + Badge */}
            <div className="flex items-center justify-between mb-4">
              <Skeleton
                className={cn(
                  "size-11 rounded-xl",
                  variant === "gradient" && "bg-emerald-800/60"
                )}
              />
              <Skeleton
                className={cn(
                  "h-5 w-16 rounded-full",
                  variant === "gradient" && "bg-emerald-800/60"
                )}
              />
            </div>

            {/* Counter number */}
            <Skeleton
              className={cn(
                "h-9 w-28 rounded-md mb-2",
                variant === "gradient" && "bg-emerald-800/80"
              )}
            />

            {/* Label */}
            <Skeleton
              className={cn(
                "h-4 w-36 rounded-md mb-1",
                variant === "gradient" && "bg-emerald-800/60"
              )}
            />
          </div>

          {/* Subtitle / context description */}
          <div className="pt-3 mt-3 border-t border-stone-100 dark:border-stone-800">
            <Skeleton
              className={cn(
                "h-3 w-4/5 rounded-md",
                variant === "gradient" && "bg-emerald-800/40"
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkeletonStats;
