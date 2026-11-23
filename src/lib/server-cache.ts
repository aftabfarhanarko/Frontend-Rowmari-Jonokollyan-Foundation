import { unstable_cache } from 'next/cache';
import { ACTIVITIES_DATA, CAMPAIGNS_DATA, NEWS_EVENTS, MOCK_APPLICATIONS } from '@/data/mockData';
import { ActivityItem, CampaignItem, NewsItem, ApplicationTrackingStatus } from '@/types';

// Server-side Data Caching using Next.js Cache (unstable_cache)
// 1. Cached Activities fetcher (Revalidates every 1 hour, tag: 'activities')
export const getCachedActivities = unstable_cache(
  async (category?: string): Promise<ActivityItem[]> => {
    // In production, this pulls from database / CMS
    if (!category || category === 'all') {
      return ACTIVITIES_DATA;
    }
    return ACTIVITIES_DATA.filter((act) => act.category === category);
  },
  ['activities-cache-key'],
  {
    revalidate: 3600, // 1 hour
    tags: ['activities'],
  }
);

// 2. Cached Campaigns fetcher (Revalidates every 10 minutes, tag: 'campaigns')
export const getCachedCampaigns = unstable_cache(
  async (): Promise<CampaignItem[]> => {
    return CAMPAIGNS_DATA;
  },
  ['campaigns-cache-key'],
  {
    revalidate: 600, // 10 minutes
    tags: ['campaigns'],
  }
);

// 3. Cached News & Events (Revalidates every 1 hour, tag: 'news')
export const getCachedNews = unstable_cache(
  async (): Promise<NewsItem[]> => {
    return NEWS_EVENTS;
  },
  ['news-cache-key'],
  {
    revalidate: 3600,
    tags: ['news'],
  }
);

// 4. In-memory applications lookup with server caching
export const getCachedApplication = unstable_cache(
  async (id: string): Promise<ApplicationTrackingStatus | null> => {
    const key = id.toUpperCase();
    return MOCK_APPLICATIONS[key] || null;
  },
  ['application-tracking-key'],
  {
    revalidate: 60, // 1 minute
    tags: ['applications'],
  }
);
