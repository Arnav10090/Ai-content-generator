"use client"

import { FileClock, Home, Settings, WalletCards, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import UsageTrack from './UsageTrack'

interface SideNavProps {
    isCollapsed: boolean;
    setIsCollapsed: (collapsed: boolean) => void;
}

function SideNav({ isCollapsed, setIsCollapsed }: SideNavProps) {
    const [isMounted, setIsMounted] = useState(false);

    const menuList = [{
        name: 'Home',
        icon: Home,
        path: '/dashboard'
    },
    {
        name: 'History',
        icon: FileClock,
        path: '/dashboard/history'
    },
    {
        name: 'Billing',
        icon: WalletCards,
        path: '/dashboard/billing'
    },
    {
        name: 'Setting',
        icon: Settings,
        path: '/dashboard/setting'
    },
    ]

    const path = usePathname();

    useEffect(() => {
        setIsMounted(true);
    }, [])

    return (
        <div className={`h-screen relative p-5 shadow-sm border bg-white dark:bg-gray-900 dark:border-gray-700 transition-all duration-300 ${
            isCollapsed ? 'w-20' : 'w-64'
        }`}>
            {/* Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-9 bg-blue-700 dark:bg-blue-500 text-white rounded-full p-1.5 shadow-lg hover:bg-blue-800 dark:hover:bg-blue-600 transition-colors z-50 cursor-pointer"
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
                {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>

            {/* Logo */}
            <div className='flex justify-center'>
                {isCollapsed ? (
                    <Image src="/logo.svg" alt="Logo" width={40} height={40} className="transition-all duration-300" />
                ) : (
                    <Image src="/logo.svg" alt="Logo" width={120} height={80} className="transition-all duration-300" />
                )}
            </div>
            
            <hr className='border-gray-500 dark:border-gray-600 w-full my-4' />
            
            {/* Menu Items */}
            <div className='mt-3'>
                {menuList.map((menu, index) => {
                    // Check if this menu item should be active
                    const isActive = menu.path === '/dashboard' 
                        ? (path === '/dashboard' || path.startsWith('/dashboard/content'))
                        : path === menu.path;
                    
                    return (
                        <Link
                            href={menu.path}
                            key={index}
                            className={`flex gap-2 mb-2 p-3 hover:bg-blue-700 dark:hover:bg-blue-500 hover:text-white rounded-lg cursor-pointer items-center transition-all duration-200 ${
                                isActive ? 'bg-blue-700 dark:bg-blue-500 text-white' : 'dark:text-gray-200'
                            } ${isCollapsed ? 'justify-center' : ''}`}
                            title={isCollapsed ? menu.name : ''}
                        >
                            <menu.icon className="flex-shrink-0" />
                            {!isCollapsed && <h2 className="whitespace-nowrap">{menu.name}</h2>}
                        </Link>
                    );
                })}
            </div>
            
            {/* Usage Track */}
            {!isCollapsed && (
                <div className='absolute bottom-10 left-0 w-full transition-opacity duration-300'>
                    {isMounted ? (
                        <UsageTrack />
                    ) : (
                        <div className="p-4">
                            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                            <div className="h-2 bg-gray-200 rounded w-1/2 mt-2 animate-pulse"></div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default SideNav
