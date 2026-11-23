import { NextResponse } from 'next/server';
import { getCachedNews } from '@/lib/server-cache';

export async function GET() {
  const data = await getCachedNews();
  return NextResponse.json(data);
}
