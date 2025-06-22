import React from 'react'
import Templates from '@/app/(data)/Templates'
import TemplateCard from './TemplateCard'
import { useState } from 'react'

export interface Template {
  name:string ,
  desc:string ,
  category:string ,
  icon:string ,
  aiPrompt:string ,
  slug:string ,
  form?:FORM[] ,
}

export interface FORM {
  label:string ,
  field:string ,
  name:string ,
  required?:boolean ,
}

function TemplateListSection({userSearchInput}:any) {

  const filterdata = userSearchInput ? Templates.filter((item:Template) => item.name.toLowerCase().includes(userSearchInput.toLowerCase())) : Templates;

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10'>
      {filterdata.map((item:Template, index:number) => (
        <TemplateCard{...item} key={index} />
      ))}
    </div>
  )
}

export default TemplateListSection
