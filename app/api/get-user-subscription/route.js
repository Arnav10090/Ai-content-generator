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

        const result = await db.select().from(UserSubscription)
            .where(eq(UserSubscription.email, email))
            .orderBy(desc(UserSubscription.id));
        
        if (result && result.length > 0) {
            const subscription = result[0];
            return NextResponse.json({ 
                hasSubscription: true,
                planType: subscription.planType || 'Free'
            }, {
                headers: {
                    'Cache-Control': 'private, max-age=120', // Cache for 2 minutes
                }
            });
        }

        return NextResponse.json({ 
            hasSubscription: false,
            planType: 'Free'
        }, {
            headers: {
                'Cache-Control': 'private, max-age=120',
            }
        });
    } catch (error) {
        console.error('Error getting user subscription:', error);
        return NextResponse.json({ 
            error: 'Failed to get user subscription',
            details: error.message,
            hasSubscription: false,
            planType: 'Free'
        }, { status: 500 });
    }
}
