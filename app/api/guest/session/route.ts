import { NextResponse } from 'next/server';
import { db } from '../../../../lib/db';
// import prisma from '@/lib/prisma';

export async function POST() {
  try {
    const session = await db.guestSession.create({
      data: {
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      }
    });

    return NextResponse.json(
      { sessionId: session.id },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      // { error: 'Failed to create guest session' },
      console.log('Failed to create guest session', error ),
      { status: 500 }
    );
  }
}