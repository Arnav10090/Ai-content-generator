"use client"
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';
import { UpdateCreditUsageContext } from '@/app/(context)/UpdateCreditUsageContext';


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
      // Debounce the API calls to prevent excessive requests
      const timeoutId = setTimeout(() => {
        GetData();
        IsUserSubscribed();
      }, 300); // Wait 300ms before makingAPI calls

      return () => clearTimeout(timeoutId);
    }
  }, [user, updateCreditUsage, isMounted]);

  const IsUserSubscribed = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) return;

    try {
      const response = await axios.post('/api/get-user-subscription', { email });
      
      if (response.data.hasSubscription) {
        setUserSubscription(true);
        setPlan(response.data.planType);
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
      try {
        const response = await axios.post('/api/get-total-usage', { email });
        setTotalUsage(response.data.totalUsage || 0);
      } catch (error) {
        console.error("Failed to get usage data:", error);
        setTotalUsage(0);
      }
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
      <div className='bg-primary dark:bg-gray-700 text-white p-3 rounded-lg'>
        <h2 className='font-medium text-white'>Credits</h2>
        <div className='h-2 bg-[#9981f9] dark:bg-gray-600 w-full rounded-full mt-3'>
          <div
            className='h-2 bg-white rounded-full'
            style={{
              width: (totalUsage / creditLimit) * 100 + "%",
            }}
          ></div>
        </div>
        <h2 className='text-sm my-2 text-white'>{totalUsage.toLocaleString('en-IN')}/{creditLimit.toLocaleString('en-IN')} Credits used</h2>
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
