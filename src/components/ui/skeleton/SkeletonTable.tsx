import * as React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./Skeleton";

export interface SkeletonTableProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number;
  rows?: number;
  showHeader?: boolean;
  showToolbar?: boolean;
  showPagination?: boolean;
}

export function SkeletonTable({
  columns = 5,
  rows = 5,
  showHeader = true,
  showToolbar = true,
  showPagination = true,
  className,
  ...props
}: SkeletonTableProps) {
  // Diverse realistic cell widths for each column
  const cellWidths = ["w-32", "w-24", "w-28", "w-20", "w-16", "w-24"];

  return (
    <div
      data-slot="skeleton-table"
      aria-hidden="true"
      className={cn("w-full space-y-4", className)}
      {...props}
    >
      {/* Optional Top Search & Filter Bar */}
      {showToolbar && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 max-w-sm">
            <Skeleton className="h-9 w-full rounded-xl" />
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Skeleton className="h-9 w-24 rounded-xl" />
            <Skeleton className="h-9 w-28 rounded-xl" />
          </div>
        </div>
      )}

      {/* Main Table Container */}
      <div className="rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            {/* Header */}
            {showHeader && (
              <thead className="bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800">
                <tr>
                  {Array.from({ length: columns }).map((_, c) => (
                    <th key={c} className="px-4 py-3.5">
                      <Skeleton className="h-4 w-20 rounded-md" />
                    </th>
                  ))}
                </tr>
              </thead>
            )}

            {/* Rows */}
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {Array.from({ length: rows }).map((_, r) => (
                <tr key={r} className="hover:bg-stone-50/50">
                  {Array.from({ length: columns }).map((_, c) => {
                    const width = cellWidths[c % cellWidths.length];
                    return (
                      <td key={c} className="px-4 py-3.5">
                        <Skeleton className={cn("h-4 rounded-md", width)} />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Pagination Bar */}
        {showPagination && (
          <div className="px-4 py-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
            <Skeleton className="h-4 w-32 rounded-md" />
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-8 w-16 rounded-lg" />
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-8 w-16 rounded-lg" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SkeletonTable;
