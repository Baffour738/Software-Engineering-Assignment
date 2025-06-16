import { getStudentData } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const students = await getStudentData();
    return NextResponse.json(students);
  } catch (error) {
    console.error('Error in students API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch student data' },
      { status: 500 }
    );
  }
} 