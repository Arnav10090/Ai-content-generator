import React from 'react'
import { Search } from 'lucide-react'

function SearchSection({onSearchInput}:{onSearchInput:any}) {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[350px] py-24 px-2 mx-0 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 rounded-none">
      <div className="flex flex-col items-center justify-center w-full">
        <h2 className="text-4xl font-extrabold text-white text-center mb-2">Browse All Templates</h2>
        <p className="text-lg text-white text-center mb-8">What would you like to create today?</p>
        <div className="flex items-center w-full max-w-xl bg-white rounded-lg shadow-md px-4 py-3">
          <Search className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 outline-none bg-transparent text-lg text-gray-700"
            onChange={(event) => onSearchInput(event.target.value)}
            suppressHydrationWarning
          />
        </div>
      </div>
    </div>
  )
}

export default SearchSection
