'use client'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useState } from 'react'

export function SearchDrawer() {
  const [query, setQuery] = useState('')

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button>
          <Search className="w-4 h-4 text-[#333333]" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <h2 className="text-lg font-semibold mb-4">Search Products</h2>
        <Input
          placeholder="Search by name or style..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {/* Placeholder for search results */}
        <div className="mt-4 text-sm text-gray-500">
          {query ? `Searching for "${query}"...` : 'Start typing to search...'}
        </div>
      </SheetContent>
    </Sheet>
  )
}
