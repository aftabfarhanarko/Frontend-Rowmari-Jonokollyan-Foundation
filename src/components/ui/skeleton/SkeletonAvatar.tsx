import * as React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./Skeleton";

export interface SkeletonAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  shape?: "circle" | "rounded" | "square";
}

const sizeMap = {
  xs: "size-6",
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
  xl: "size-16",
  "2xl": "size-20",
  "3xl": "size-24",
};

const shapeMap = {
  circle: "rounded-full",
  rounded: "rounded-2xl",
  square: "rounded-lg",
};

export function SkeletonAvatar({
  size = "md",
  shape = "circle",
  className,
  ...props
}: SkeletonAvatarProps) {
  return (
    <Skeleton
      data-slot="skeleton-avatar"
      className={cn("shrink-0", sizeMap[size], shapeMap[shape], className)}
      {...props}
    />
  );
}

export default SkeletonAvatar;
