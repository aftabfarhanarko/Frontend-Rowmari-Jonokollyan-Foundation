import * as React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "shimmer" | "pulse" | "none";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
}

const roundedMap = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

export function Skeleton({
  className,
  variant = "shimmer",
  rounded = "md",
  ...props
}: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn(
        "bg-stone-200/80 dark:bg-stone-800/80 select-none",
        variant === "shimmer" && "animate-skeleton",
        variant === "pulse" && "animate-pulse",
        roundedMap[rounded],
        className
      )}
      {...props}
    />
  );
}

export default Skeleton;
