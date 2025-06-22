"use client";

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/db';
import { UserSubscription } from '@/utils/schema';
import { eq, desc } from 'drizzle-orm';
import moment from 'moment';
import axios from 'axios';
import { Loader2Icon, Check } from 'lucide-react';

const plans = [
    {
        name: 'Free',
        price: '0$',
        period: '/month',
        features: [
            '10,000 Words/Month',
            '50+ Content Templates',
            'Unlimited Download & Copy',
            '1 Month of History',
        ],
    },
    {
        name: 'Monthly',
        price: '5.76$',
        period: '/month',
        features: [
            '1,00,000 Words/Month',
            '50+ Template Access',
            'Unlimited Download & Copy',
            '1 Year of History',
        ],
        planId: process.env.NEXT_PUBLIC_RAZORPAY_MONTHLY_PLAN_ID,
    },
    {
        name: 'Yearly',
        price: '63.53$',
        period: '/year',
        features: [
            '12,00,000 Words/Year',
            '50+ Template Access',
            'Unlimited Download & Copy',
            '2 Years of History',
        ],
        planId: process.env.NEXT_PUBLIC_RAZORPAY_YEARLY_PLAN_ID,
    },
];

const BillingPage = () => {
    const [userSubscription, setUserSubscription] = useState<any>(null);
    const [loading, setLoading] = useState<string | null>(null);
    const { user } = useUser();

    useEffect(() => {
        const checkUserSubscription = async () => {
            if (user?.primaryEmailAddress?.emailAddress) {
                const result = await db
                    .select()
                    .from(UserSubscription)
                    .where(eq(UserSubscription.email, user.primaryEmailAddress.emailAddress))
                    .orderBy(desc(UserSubscription.id))
                    .limit(1);

                if (result.length > 0) {
                    setUserSubscription(result[0]);
                }
            }
        };
        checkUserSubscription();
    }, [user]);

    const createSubscription = async (planId: string) => {
        setLoading(planId);
        try {
            const response = await axios.post('/api/create-subscription', { planId });
            return response.data;
        } catch (error) {
            console.error('Error creating subscription:', error);
            setLoading(null);
            return null;
        }
    };

    const saveSubscription = async (paymentId: string, subscriptionId: string, planId: string) => {
        if (!user?.primaryEmailAddress?.emailAddress || !user.fullName) return null;
        try {
            const result = await db.insert(UserSubscription).values({
                email: user.primaryEmailAddress.emailAddress,
                userName: user.fullName,
                active: true,
                paymentId: paymentId,
                joinDate: moment().toISOString(),
                planType: planId === process.env.NEXT_PUBLIC_RAZORPAY_YEARLY_PLAN_ID ? 'Yearly' : 'Monthly',
            });
            return result;
        } catch (error) {
            console.error('Error saving subscription:', error);
            return null;
        }
    };

    const onPayment = async (planName: 'monthly' | 'yearly') => {
        const planId = planName === 'monthly'
            ? process.env.NEXT_PUBLIC_RAZORPAY_MONTHLY_PLAN_ID
            : process.env.NEXT_PUBLIC_RAZORPAY_YEARLY_PLAN_ID;

        if (!planId) {
            console.error('Razorpay plan ID is not defined.');
            return;
        }

        const sub = await createSubscription(planId);

        if (sub) {
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                subscription_id: sub.id,
                name: 'AI Content Generator',
                description: `${planName.charAt(0).toUpperCase() + planName.slice(1)} Subscription`,
                handler: async (response: any) => {
                    await saveSubscription(response.razorpay_payment_id, sub.id, planId);
                    window.location.reload();
                },
                modal: {
                    ondismiss: () => {
                        setLoading(null);
                    },
                },
            };
            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        }
    };

    const activePlanName = userSubscription ? userSubscription.planType : 'Free';

    return (
        <div className="h-full bg-slate-100 flex flex-col items-center justify-center p-4">
            <Script id="razorpay-checkout-js" src="https://checkout.razorpay.com/v1/checkout.js" />
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Upgrade Your Plan</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan) => {
                    const isCurrent = activePlanName === plan.name;
                    return (
                        <div key={plan.name} className="bg-white rounded-2xl shadow-lg p-8 w-[350px] flex flex-col group hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-blue-700">
                            <h3 className="text-xl font-semibold text-center text-gray-700">{plan.name}</h3>
                            <div className="mt-4 text-center">
                                <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                                <span className="text-lg font-medium text-gray-500">{plan.period}</span>
                            </div>
                            <ul className="mt-6 space-y-4">
                                {plan.features.map(feature => (
                                    <li key={feature} className="flex items-center gap-3">
                                        <Check className="text-blue-600 w-5 h-5" />
                                        <span className="text-gray-600">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-auto pt-6">
                                {isCurrent ? (
                                    <Button className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 rounded-lg text-base" disabled>
                                        Currently Active Plan
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => onPayment(plan.name.toLowerCase() as 'monthly' | 'yearly')}
                                        className="w-full bg-white text-blue-700 border-2 border-blue-700 hover:bg-blue-700 hover:text-white font-bold py-3 rounded-lg text-base transition-all duration-300 cursor-pointer"
                                        disabled={!!loading}
                                    >
                                        {loading === plan.planId ? <Loader2Icon className="animate-spin" /> : `Go ${plan.name}`}
                                    </Button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BillingPage;
