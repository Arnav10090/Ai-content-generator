import { NextResponse } from 'next/server';
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import moment from 'moment';

export async function POST(req) {
  try {
    const { formData, templateSlug, aiResponse, createdBy } = await req.json();

    await db.insert(AIOutput).values({
      formData,
      templateSlug,
      aiResponse,
      createdBy,
      createdAt: moment().format('DD/MM/YYYY'),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving AI output:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}