import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    try {
      revalidateTag('blood-donors', 'max');
    } catch {}

    return NextResponse.json({
      success: true,
      message: 'Blood donor registered successfully',
      donorName: body.name,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid registration payload' },
      { status: 400 }
    );
  }
}
