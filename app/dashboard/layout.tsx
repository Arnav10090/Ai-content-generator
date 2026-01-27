"use client"
// Force rebuild to fix hydration sync
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
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

    return (
        <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
            <UserSubscriptionContext.Provider value={{ userSubscription, setUserSubscription }}>
                <UpdateCreditUsageContext.Provider value={{ updateCreditUsage, setUpdateCreditUsage }}>
                    <div className="flex min-h-screen bg-slate-100 dark:bg-gray-950">
                        {/* Sidebar */}
                        <div className="hidden md:flex flex-col fixed inset-y-0 z-20 bg-slate-100 dark:bg-gray-950 border-r dark:border-gray-800">
                            <SideNav
                                isCollapsed={isSidebarCollapsed}
                                setIsCollapsed={setIsSidebarCollapsed}
                            />
                        </div>
                        {/* Main content - adjusts based on sidebar width */}
                        <div className={`flex-1 flex flex-col h-screen transition-all duration-300 ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
                            }`}>
                            <Header />
                            <BillingWarning />
                            <div className="flex-1 overflow-y-auto bg-slate-100 dark:bg-gray-950">
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
