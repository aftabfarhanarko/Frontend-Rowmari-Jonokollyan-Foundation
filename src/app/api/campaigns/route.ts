import { NextResponse } from 'next/server';
import { getCachedCampaigns } from '@/lib/server-cache';

export async function GET() {
  const data = await getCachedCampaigns();
  return NextResponse.json(data);
}
