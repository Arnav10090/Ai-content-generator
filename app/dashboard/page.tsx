"use client"
import React from 'react'
import SearchSection from './_components/SearchSection'
import TemplateListSection from './_components/TemplateListSection'
import { useState } from 'react'

function dashboard() {
  const [userSearchInput, setUserSearchInput] = useState<string>()
  const [limit, setLimit] = useState<number>(6)

  return (
    <div>
      <SearchSection onSearchInput={(value: string) => setUserSearchInput(value)} />

      <div className="flex justify-end px-10 pt-5">
        <div className="flex items-center gap-2">
          <label className="text-gray-500 font-medium">Show Cards:</label>
          <select
            className="bg-white border rounded-md px-3 py-1 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            onChange={(e) => setLimit(Number(e.target.value))}
            value={limit}
          >
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={-1}>All</option>
          </select>
        </div>
      </div>

      <TemplateListSection userSearchInput={userSearchInput} limit={limit} />
    </div>
  )
}

export default dashboard

