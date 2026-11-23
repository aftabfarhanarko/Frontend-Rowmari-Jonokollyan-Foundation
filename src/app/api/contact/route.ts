import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      message: 'Contact message received successfully',
      sender: body.name,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid message payload' },
      { status: 400 }
    );
  }
}
