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
          <label className="font-medium text-gray-600 dark:text-gray-300">Show Cards:</label>
          <select
            className="cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-1 text-gray-900 shadow-sm outline-none transition-colors hover:border-gray-400 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:border-gray-500"
            style={{ colorScheme: 'light dark' }}
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

