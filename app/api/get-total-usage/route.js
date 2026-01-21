import { NextResponse } from 'next/server';
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { eq } from 'drizzle-orm';

export async function POST(req) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const result = await db.select().from(AIOutput)
            .where(eq(AIOutput.createdBy, email));
        
        let totalWords = 0;
        result.forEach(element => {
            totalWords += element.aiResponse ? element.aiResponse.split(/\s+/).length : 0;
        });

        return NextResponse.json({ totalUsage: totalWords }, {
            headers: {
                'Cache-Control': 'private, max-age=60', // Cache for 60 seconds
            }
        });
    } catch (error) {
        console.error('Error getting total usage:', error);
        return NextResponse.json({ 
            error: 'Failed to get total usage',
            details: error.message
        }, { status: 500 });
    }
}
