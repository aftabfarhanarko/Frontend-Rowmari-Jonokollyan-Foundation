import React from "react";
import { Skeleton } from "../Skeleton";
import { DashboardOverviewSkeleton } from "./DashboardOverviewSkeleton";

export function DashboardShellSkeleton() {
  return (
    <div data-slot="dashboard-shell-skeleton" className="min-h-screen bg-[#FAF9F6] flex flex-col">
      {/* Top Navbar Skeleton */}
      <header className="h-16 border-b border-stone-200/80 bg-white px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
        <div className="flex items-center gap-3">
          <Skeleton className="size-9 rounded-xl" />
          <div className="space-y-1 hidden sm:block">
            <Skeleton className="h-4 w-36 rounded-md" />
            <Skeleton className="h-3 w-24 rounded-md" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-48 rounded-xl hidden md:block" />
          <Skeleton className="size-9 rounded-full" />
          <Skeleton className="size-9 rounded-full" />
          <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
            <Skeleton className="size-9 rounded-full" />
            <div className="space-y-1 hidden lg:block">
              <Skeleton className="h-3.5 w-20 rounded-md" />
              <Skeleton className="h-2.5 w-14 rounded-md" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Body: Sidebar + Content */}
      <div className="flex-1 flex w-full">
        {/* Left Sidebar Skeleton (Desktop) */}
        <aside className="w-64 border-r border-stone-200/80 bg-white p-4 space-y-6 hidden lg:block shrink-0">
          <div className="space-y-2">
            <Skeleton className="h-3 w-20 rounded-md" />
            <div className="space-y-1.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl">
                  <Skeleton className="size-5 rounded-md shrink-0" />
                  <Skeleton className="h-4 w-28 rounded-md" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-stone-100">
            <Skeleton className="h-3 w-16 rounded-md" />
            <div className="space-y-1.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl">
                  <Skeleton className="size-5 rounded-md shrink-0" />
                  <Skeleton className="h-4 w-24 rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Content Area Skeleton */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <DashboardOverviewSkeleton />
        </main>
      </div>
    </div>
  );
}

export default DashboardShellSkeleton;
