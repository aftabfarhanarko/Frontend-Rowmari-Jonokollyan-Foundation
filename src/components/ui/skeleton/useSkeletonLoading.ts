'use client';

import { useState, useEffect } from "react";

/**
 * useSkeletonLoading
 * 
 * Ensures a minimum skeleton visibility threshold (default 280ms)
 * to prevent flickering between skeleton and content on fast networks,
 * while seamlessly transitioning to real content once ready.
 */
export function useSkeletonLoading(isDataLoading: boolean = false, minDuration = 280) {
  const [isMounted, setIsMounted] = useState(false);
  const [minTimerPassed, setMinTimerPassed] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setMinTimerPassed(true);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration]);

  // Show skeleton if component hasn't mounted, or minimum initial timer hasn't passed, or data is loading
  const shouldShowSkeleton = !isMounted || !minTimerPassed || isDataLoading;

  return {
    showSkeleton: shouldShowSkeleton,
    isMounted,
  };
}

export default useSkeletonLoading;
