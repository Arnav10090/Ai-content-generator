"use client"
import { UserButton } from '@clerk/nextjs'
import { Search } from 'lucide-react'
import React, { useState, useEffect } from 'react'

function Navbar() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className='p-5 shadow-sm border-b-2 flex justify-between items-center bg-white'>
      <div className="flex gap-2 items-center p-2 border rounded-md max-w-lg">
        <Search />
        <input type="text" placeholder="Search..." 
        className='outline-none'/>
      </div>
      <div className="flex gap-4 items-center">
        <h2 className='bg-blue-700 p-2 rounded-full text-sm text-white px-3'>🔥 Join Membership Plan at just $5.76/month</h2>
        <div className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer">
          <UserButton/>
        </div>
      </div>
    </div>
  )
}

export default Navbar
