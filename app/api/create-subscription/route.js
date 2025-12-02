import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
    try {
        const { planId } = await req.json();

        if (!planId) {
            return NextResponse.json({ error: 'Plan ID is required' }, { status: 400 });
        }
        
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET_KEY
        });

        const result = await instance.subscriptions.create({
            plan_id: planId,
            customer_notify: 1,
            quantity: 1,
            total_count: 1,
            addons: [],
            notes: {
                key1: 'Note'
            }
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error('Razorpay API error:', error.response?.data || error.message || error);
        return NextResponse.json({ 
            error: error.response?.data?.error?.description || error.message || 'An internal server error occurred',
            details: error.response?.data || error.message
        }, { status: 500 });
    }
}