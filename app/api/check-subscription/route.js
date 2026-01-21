import { NextResponse } from 'next/server';
import { db } from '@/utils/db';
import { UserSubscription } from '@/utils/schema';
import { eq, desc } from 'drizzle-orm';

export async function POST(req) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const result = await db
            .select()
            .from(UserSubscription)
            .where(eq(UserSubscription.email, email))
            .orderBy(desc(UserSubscription.id))
            .limit(1);

        if (result.length > 0) {
            return NextResponse.json({ subscription: result[0] }, {
                headers: {
                    'Cache-Control': 'private, max-age=120', // Cache for 2 minutes
                }
            });
        }

        return NextResponse.json({ subscription: null }, {
            headers: {
                'Cache-Control': 'private, max-age=120',
            }
        });
    } catch (error) {
        console.error('Error checking subscription:', error);
        return NextResponse.json({ 
            error: 'Failed to check subscription',
            details: error.message
        }, { status: 500 });
    }
}
