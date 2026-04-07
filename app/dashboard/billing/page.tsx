"use client";

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { Loader2Icon, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

const getPlans = () => [
    {
        name: 'Free',
        price: '0$',
        period: '/month',
        features: [
            '10,000 Credits/Month',
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
            '1,00,000 Credits/Month',
            '50+ Template Access',
            'Unlimited Download & Copy',
            '1 Year of History',
        ],
        planId: typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_MONTHLY_SUBSCRIPTION_PLAN_ID : '',
    },
    {
        name: 'Yearly',
        price: '63.53$',
        period: '/year',
        features: [
            '12,00,000 Credits/Year',
            '50+ Template Access',
            'Unlimited Download & Copy',
            '2 Years of History',
        ],
        planId: typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_YEARLY_SUBSCRIPTION_PLAN_ID : '',
    },
];

const BillingPage = () => {
    const [userSubscription, setUserSubscription] = useState<any>(null);
    const [loading, setLoading] = useState<string | null>(null);
    const { user } = useUser();
    const router = useRouter();
    const plans = getPlans();

    useEffect(() => {
        const checkUserSubscription = async () => {
            const email = user?.primaryEmailAddress?.emailAddress;
            if (email) {
                const cacheKey = `subscription:${email}`;

                try {
                    const cachedSubscription = sessionStorage.getItem(cacheKey);
                    if (cachedSubscription) {
                        setUserSubscription(JSON.parse(cachedSubscription));
                    }
                } catch (error) {
                    console.error('Error reading cached subscription:', error);
                }

                try {
                    const response = await axios.post('/api/check-subscription', {
                        email
                    });
                    
                    if (response.data.subscription) {
                        setUserSubscription(response.data.subscription);
                        sessionStorage.setItem(cacheKey, JSON.stringify(response.data.subscription));
                    } else {
                        sessionStorage.removeItem(cacheKey);
                        setUserSubscription(null);
                    }
                } catch (error) {
                    console.error('Error checking subscription:', error);
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

    const saveSubscription = async (paymentId: string, subscriptionId: string, planName: 'monthly' | 'yearly') => {
        if (!user?.primaryEmailAddress?.emailAddress || !user.fullName) return null;
        try {
            const response = await axios.post('/api/save-subscription', {
                email: user.primaryEmailAddress.emailAddress,
                userName: user.fullName,
                paymentId: paymentId,
                subscriptionId: subscriptionId,
                planType: planName
            });
            return response.data;
        } catch (error) {
            console.error('Error saving subscription:', error);
            return null;
        }
    };

    const onPayment = async (planName: 'monthly' | 'yearly') => {
        const planId = planName === 'monthly'
            ? process.env.NEXT_PUBLIC_MONTHLY_SUBSCRIPTION_PLAN_ID
            : process.env.NEXT_PUBLIC_YEARLY_SUBSCRIPTION_PLAN_ID;

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
                    const saved = await saveSubscription(response.razorpay_payment_id, sub.id, planName);
                    if (saved) {
                        const nextSubscription = {
                            ...saved,
                            planType: planName === 'monthly' ? 'Monthly' : 'Yearly',
                        };

                        setUserSubscription(nextSubscription);
                        if (user?.primaryEmailAddress?.emailAddress) {
                            sessionStorage.setItem(
                                `subscription:${user.primaryEmailAddress.emailAddress}`,
                                JSON.stringify(nextSubscription)
                            );
                        }
                    }
                    setLoading(null);
                    router.refresh();
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
        <div className="flex min-h-[calc(100vh-5.5rem)] w-full items-center justify-center bg-slate-100 px-6 py-10 dark:bg-gray-950">
            <Script id="razorpay-checkout-js" src="https://checkout.razorpay.com/v1/checkout.js" />
            <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center">
                <h1 className="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-white">Upgrade Your Plan</h1>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {plans.map((plan) => {
                        const isCurrent = activePlanName === plan.name;
                        return (
                            <div key={plan.name} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-[350px] flex flex-col group hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-blue-700 dark:hover:border-blue-500">
                                <h3 className="text-xl font-semibold text-center text-gray-700 dark:text-gray-200">{plan.name}</h3>
                                <div className="mt-4 text-center">
                                    <span className="text-5xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                                    <span className="text-lg font-medium text-gray-500 dark:text-gray-400">{plan.period}</span>
                                </div>
                                <ul className="mt-6 space-y-4">
                                    {plan.features.map(feature => (
                                        <li key={feature} className="flex items-center gap-3">
                                            <Check className="text-blue-600 w-5 h-5" />
                                            <span className="text-gray-600 dark:text-gray-300">{feature}</span>
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
                                            className="w-full bg-white dark:bg-gray-900 text-blue-700 dark:text-blue-400 border-2 border-blue-700 dark:border-blue-500 hover:bg-blue-700 hover:text-white dark:hover:bg-blue-600 font-bold py-3 rounded-lg text-base transition-all duration-300 cursor-pointer"
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
        </div>
    );
};

export default BillingPage;
