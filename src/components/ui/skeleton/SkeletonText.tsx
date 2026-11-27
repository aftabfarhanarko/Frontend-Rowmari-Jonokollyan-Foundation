import * as React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./Skeleton";

export interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "heading";
  gap?: "sm" | "md" | "lg";
  lastLineWidth?: string; // e.g. "w-3/5" or "w-1/2"
}

const sizeMap = {
  xs: "h-2.5",
  sm: "h-3.5",
  md: "h-4",
  lg: "h-5",
  xl: "h-6",
  heading: "h-7 sm:h-8",
};

const gapMap = {
  sm: "space-y-1.5",
  md: "space-y-2.5",
  lg: "space-y-3.5",
};

export function SkeletonText({
  lines = 3,
  size = "sm",
  gap = "md",
  lastLineWidth = "w-3/5",
  className,
  ...props
}: SkeletonTextProps) {
  const lineHeights = sizeMap[size];

  return (
    <div
      data-slot="skeleton-text"
      aria-hidden="true"
      className={cn("w-full", gapMap[gap], className)}
      {...props}
    >
      {Array.from({ length: lines }).map((_, index) => {
        const isLast = index === lines - 1;
        const widthClass = isLast && lines > 1 ? lastLineWidth : "w-full";

        return (
          <Skeleton
            key={index}
            className={cn(
              lineHeights,
              widthClass,
              size === "heading" ? "rounded-lg" : "rounded-md"
            )}
          />
        );
      })}
    </div>
  );
}

export default SkeletonText;
