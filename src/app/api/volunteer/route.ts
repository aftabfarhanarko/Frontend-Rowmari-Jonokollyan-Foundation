import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    try {
      revalidateTag('volunteers', 'max');
    } catch {}

    return NextResponse.json({
      success: true,
      message: 'Volunteer application submitted successfully',
      applicantName: body.name,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid volunteer application' },
      { status: 400 }
    );
  }
}
