import { NextRequest, NextResponse } from 'next/server';
import { getCachedApplication } from '@/lib/server-cache';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const application = await getCachedApplication(id);

  if (!application) {
    return NextResponse.json({ message: 'Application not found' }, { status: 404 });
  }

  return NextResponse.json(application);
}
