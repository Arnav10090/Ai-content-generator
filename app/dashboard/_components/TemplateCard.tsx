import React from 'react'
import { Template } from './TemplateListSection'
import Image from 'next/image'
import Link from 'next/link'

function TemplateCard(item: Template) {
  return (
    <Link href={'/dashboard/content/'+item?.slug}>
    <div className="bg-white rounded-xl shadow-md border border-gray-300 p-6 flex flex-col items-center justify-start min-h-[220px] h-full transition-all duration-200 hover:shadow-2xl hover:-translate-y-1 cursor-pointer">
      <Image src={item.icon} alt="Template Icon" width={50} height={50} className="mb-4" />
      <h2 className="font-bold text-lg text-gray-900 text-center mb-2">{item.name}</h2>
      <p className="text-gray-600 text-center text-sm line-clamp-3">{item.desc}</p>
    </div>
    </Link>
  )
}

export default TemplateCard
