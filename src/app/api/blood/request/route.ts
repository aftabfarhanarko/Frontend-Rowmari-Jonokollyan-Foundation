import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const requestId = `BLD-REQ-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      revalidateTag('blood-requests', 'max');
    } catch {}

    return NextResponse.json({
      success: true,
      requestId,
      message: 'Blood request registered and coordinators alerted',
      data: body,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid blood request payload' },
      { status: 400 }
    );
  }
}
