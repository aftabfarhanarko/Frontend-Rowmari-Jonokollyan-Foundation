import { NextRequest, NextResponse } from 'next/server';
import { getCachedActivities } from '@/lib/server-cache';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || undefined;

  const data = await getCachedActivities(category);
  return NextResponse.json(data);
}
