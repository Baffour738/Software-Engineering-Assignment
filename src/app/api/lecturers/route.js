import { getLecturerData } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const lecturers = await getLecturerData();
    return NextResponse.json(lecturers);
  } catch (error) {
    console.error('Error in lecturers API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lecturer data' },
      { status: 500 }
    );
  }
} 