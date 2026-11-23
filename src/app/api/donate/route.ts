import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const receiptNo = `RJF-REC-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date().toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    try {
      revalidateTag('campaigns', 'max');
    } catch {
      // Standalone
    }

    return NextResponse.json({
      success: true,
      receiptNo,
      amount: body.amount,
      date: now,
      campaign: body.campaign || 'general',
      message: 'Donation received successfully and receipt generated',
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid donation payload' },
      { status: 400 }
    );
  }
}
