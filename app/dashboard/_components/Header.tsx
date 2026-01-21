"use client"
import { UserButton } from '@clerk/nextjs'
import React, { useState, useEffect } from 'react'
import { ModeToggle } from '@/components/ModeToggle'

function Navbar() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className='p-5 shadow-sm border-b-2 dark:border-gray-800 flex justify-between items-center bg-background'>
      <div></div>
      <div className="flex gap-4 items-center">
        <h2 className='bg-blue-700 dark:bg-blue-500 p-2 rounded-full text-sm text-white px-3'>🔥 Join Membership Plan at just $5.76/month</h2>
        <ModeToggle />
        <div className="p-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all cursor-pointer">
          <UserButton/>
        </div>
      </div>
    </div>
  )
}

export default Navbar
