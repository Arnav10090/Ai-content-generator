import { NextResponse } from 'next/server';
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { desc, eq } from 'drizzle-orm';

export async function POST(req) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const history = await db.select()
            .from(AIOutput)
            .where(eq(AIOutput.createdBy, email))
            .orderBy(desc(AIOutput.id));

        return NextResponse.json({ history }, {
            headers: {
                'Cache-Control': 'private, max-age=30', // Cache for 30 seconds
            }
        });
    } catch (error) {
        console.error('Error getting history:', error);
        return NextResponse.json({ 
            error: 'Failed to get history',
            details: error.message,
            history: []
        }, { status: 500 });
    }
}
