import React from "react";
import { PublicPageSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return <PublicPageSkeleton variant="news" cardCount={6} />;
}
