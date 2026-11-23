import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const applicationId = `RJF-2026-${randomNum}`;

    // Revalidate server data cache
    try {
      revalidateTag('applications', 'max');
    } catch {
      // In standalone or test mode
    }

    return NextResponse.json({
      success: true,
      applicationId,
      message: 'Application submitted successfully',
      data: body,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid payload' },
      { status: 400 }
    );
  }
}
