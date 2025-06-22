"use client"
import React, { useState } from 'react'
import SideNav from './_components/SideNav';
import Header from './_components/Header';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';
import BillingWarning from './_components/BillingWarning';
import { UpdateCreditUsageContext } from '@/app/(context)/UpdateCreditUsageContext';

function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [totalUsage, setTotalUsage] = useState<number>(0);
    const [userSubscription, setUserSubscription] = useState<boolean>(false);
    const [updateCreditUsage, setUpdateCreditUsage] = useState<number>(0);

    return (
        <TotalUsageContext.Provider value={{totalUsage,setTotalUsage}}>
            <UserSubscriptionContext.Provider value={{userSubscription, setUserSubscription}}>
                <UpdateCreditUsageContext.Provider value={{updateCreditUsage, setUpdateCreditUsage}}>
                <div className="flex min-h-screen bg-slate-100">
                    {/* Sidebar */}
                    <div className="w-64 hidden md:flex flex-col fixed inset-y-0 z-20 bg-slate-100 border-r">
                        <SideNav />
                    </div>
                    {/* Main content */}
                    <div className="flex-1 md:ml-64 flex flex-col h-screen">
                        <Header />
                        <BillingWarning />
                        <div className="flex-1 overflow-y-auto">
                            {children}
                        </div>
                    </div>
                </div>
                </UpdateCreditUsageContext.Provider>
            </UserSubscriptionContext.Provider>
        </TotalUsageContext.Provider>
    )
}

export default layout
