'use client'
import React from 'react'
import { Template } from './TemplateListSection'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function TemplateCard(item: Template) {
  const router = useRouter();
  const href = '/dashboard/content/' + item?.slug;

  return (
    <Link
      href={href}
      prefetch
      onMouseEnter={() => router.prefetch(href)}
      onFocus={() => router.prefetch(href)}
    >
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-300 dark:border-gray-700 p-6 flex flex-col items-center justify-start min-h-[220px] h-full transition-all duration-200 hover:shadow-2xl hover:-translate-y-1 cursor-pointer">
      <img src={item.icon} alt="Template Icon" width={50} height={50} suppressHydrationWarning />
      <h2 className="font-medium text-lg mt-4 text-gray-900 dark:text-white" suppressHydrationWarning>{item.name}</h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 mt-1 text-center" suppressHydrationWarning>
        {item.desc}
      </p>
    </div>
    </Link>
  )
}

export default TemplateCard
