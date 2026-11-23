import { NextRequest, NextResponse } from 'next/server';
import { getCachedActivities } from '@/lib/server-cache';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const activities = await getCachedActivities();
  const activity = activities.find((a) => a.id === id);

  if (!activity) {
    return NextResponse.json({ message: 'Activity not found' }, { status: 404 });
  }

  return NextResponse.json(activity);
}
