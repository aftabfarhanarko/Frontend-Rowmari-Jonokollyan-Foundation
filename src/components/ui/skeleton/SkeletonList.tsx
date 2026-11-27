import * as React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./Skeleton";

export interface SkeletonListProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: number;
  hasAvatar?: boolean;
}

export function SkeletonList({
  items = 5,
  hasAvatar = true,
  className,
  ...props
}: SkeletonListProps) {
  return (
    <div
      data-slot="skeleton-list"
      aria-hidden="true"
      className={cn("divide-y divide-stone-100 dark:divide-stone-800", className)}
      {...props}
    >
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="py-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {hasAvatar && <Skeleton className="size-10 rounded-full shrink-0" />}
            <div className="space-y-1.5 flex-1 min-w-0">
              <Skeleton className="h-4 w-3/5 rounded-md" />
              <Skeleton className="h-3 w-2/5 rounded-md" />
            </div>
          </div>
          <Skeleton className="h-3.5 w-16 rounded-md shrink-0" />
        </div>
      ))}
    </div>
  );
}

export default SkeletonList;
