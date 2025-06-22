"use client"
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '@/utils/db';
import { AIOutput, UserSubscription } from '@/utils/schema';
import { eq, desc } from 'drizzle-orm';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';
import { UpdateCreditUsageContext } from '@/app/(context)/UpdateCreditUsageContext';

export interface HISTORY {
  id: number;
  formData: string;
  templateSlug: string;
  aiResponse: string | null;
  createdBy: string;
  createdAt: string | null;
}

function UsageTrack() {
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);
  const {updateCreditUsage, setUpdateCreditUsage} = useContext(UpdateCreditUsageContext);
  const [plan, setPlan] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (user && isMounted) {
      GetData();
      IsUserSubscribed();
    }
  }, [user, updateCreditUsage, isMounted]);

  const IsUserSubscribed = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) return;

    try {
      const result = await db.select().from(UserSubscription)
        .where(eq(UserSubscription.email, email))
        .orderBy(desc(UserSubscription.id));
      
      if (result && result.length > 0) {
        setUserSubscription(true);
        const fetchedPlan = result[0].planType || 'Free';
        setPlan(fetchedPlan);
      } else {
        setPlan('Free');
      }
    } catch (error) {
      console.error("Failed to check user subscription:", error);
      setPlan('Free'); // Default to free plan on error
    }
  }

  const GetData = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (email) {
      const result: HISTORY[] = await db.select().from(AIOutput)
        .where(eq(AIOutput.createdBy, email));
      
      let total = 0;
      result.forEach(element => {
        total = total + (element.aiResponse ? element.aiResponse.split(/\s+/).length : 0);
      });

      setTotalUsage(total)
    }
  }

  const getCreditLimit = () => {
    switch (plan) {
      case 'Monthly':
        return 100000;
      case 'Yearly':
        return 1200000;
      default:
        return 10000;
    }
  };

  const creditLimit = getCreditLimit();

  if (!isMounted) {
    return (
      <div className='m-5'>
        <div className='bg-primary text-white p-3 rounded-lg'>
          <h2 className='font-medium'>Credits</h2>
          <div className='h-2 bg-[#9981f9] w-full rounded-full mt-3'>
            <div className='h-2 bg-white rounded-full' style={{ width: "0%" }}></div>
          </div>
          <h2 className='text-sm my-2'>Loading credits...</h2>
        </div>
        <Button variant='outline' className='w-full my-3'>Loading...</Button>
      </div>
    );
  }

  return (
    <div className='m-5'>
      <div className='bg-primary text-white p-3 rounded-lg'>
        <h2 className='font-medium'>Credits</h2>
        <div className='h-2 bg-[#9981f9] w-full rounded-full mt-3'>
          <div
            className='h-2 bg-white rounded-full'
            style={{
              width: (totalUsage / creditLimit) * 100 + "%",
            }}
          ></div>
        </div>
        <h2 className='text-sm my-2'>{totalUsage.toLocaleString('en-IN')}/{creditLimit.toLocaleString('en-IN')} Credits used</h2>
      </div>
      <Button 
        variant='outline' 
        className='w-full my-3 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md'
        onClick={() => window.location.href = '/dashboard/billing'}
      >
        {userSubscription ? 'Manage Subscription' : 'Upgrade'}
      </Button>
    </div>
  )
}

export default UsageTrack;
