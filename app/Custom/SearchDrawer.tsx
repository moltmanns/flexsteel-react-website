'use client'

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'

export function SearchDrawer() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const popularSearches = [
    'Living Room',
    'Henry',
    'Zecliner',
    'Dining Tables',
    'Sectionals',
    'Recliners',
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button aria-label="Search" className="cursor-pointer">
          <Search className="w-5 h-5 text-[#333]" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[320px] sm:w-[400px] px-6 py-6 flex flex-col"
      >
        {/* ✅ Accessibility Title */}
        <SheetTitle className="sr-only">Search Products</SheetTitle>

        {/* Spacer under close icon */}
        <div className="h-6" />

        {/* Search Input with Icons */}
        <div className="relative mb-4">
          {/* Left Search Icon */}
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />

          <Input
            placeholder="Type your search here..."
            className="text-sm pl-9 pr-10 py-2 rounded-md border border-gray-300"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* Right Clear Icon */}
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {query ? (
            <div className="text-sm text-muted-foreground">
              Searching for "<span className="font-medium">{query}</span>"...
            </div>
          ) : (
            <div className="mt-2">
              <p className="text-sm text-muted-foreground mb-2">
                Popular searches:
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(term)}
                    className="text-sm px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </SheetContent>
    </Sheet>
  )
}
