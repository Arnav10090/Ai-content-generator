import { NextResponse } from 'next/server';
import { db } from '@/utils/db';
import { UserSubscription } from '@/utils/schema';
import moment from 'moment';

export async function POST(req) {
    try {
        const { email, userName, paymentId, subscriptionId, planType } = await req.json();

        if (!email || !userName || !paymentId || !planType) {
            return NextResponse.json({ 
                error: 'Missing required fields: email, userName, paymentId, planType' 
            }, { status: 400 });
        }

        const result = await db.insert(UserSubscription).values({
            email: email,
            userName: userName,
            active: true,
            paymentId: paymentId,
            joinDate: moment().toISOString(),
            planType: planType === 'yearly' ? 'Yearly' : 'Monthly',
        });

        return NextResponse.json({ 
            success: true,
            message: 'Subscription saved successfully',
            data: result
        });
    } catch (error) {
        console.error('Error saving subscription:', error);
        return NextResponse.json({ 
            error: 'Failed to save subscription',
            details: error.message
        }, { status: 500 });
    }
}
