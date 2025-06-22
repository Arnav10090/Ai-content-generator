"use client"

import { FileClock, Home, Settings, WalletCards } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import UsageTrack from './UsageTrack'

function SideNav() {
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
        <div className='h-screen relative p-5 shadow-sm border bg-white'>
            <div className='flex justify-center'>
                <Image src="/logo.svg" alt="Logo" width={120} height={80} />
            </div>
            <hr className='border-gray-500 w-full my-4' />
            <div className='mt-3'>
                {menuList.map((menu, index) => (
                    <Link
                        href={menu.path}
                        key={index}
                        className={`flex gap-2 mb-2 p-3 hover:bg-blue-700 hover:text-white rounded-lg cursor-pointer ${path === menu.path ? 'bg-blue-700 text-white' : ''}`}
                    >
                        <menu.icon />
                        <h2>{menu.name}</h2>
                    </Link>
                ))}
            </div>
            <div className='absolute bottom-10 left-0 w-full'>
                {isMounted ? (
                    <UsageTrack />
                ) : (
                    <div className="p-4">
                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/2 mt-2 animate-pulse"></div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SideNav
