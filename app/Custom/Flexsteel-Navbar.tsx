'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  ChevronDown, ChevronRight, MapPin, Menu, Package, Search, X, Zap
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import BrandSwitcher from './BrandSwitcher'
import { AnimatePresence, motion } from 'framer-motion'
import { SearchDrawer } from './SearchDrawer'

const megaMenu = {
  'Living Room': {
    Sofas: [
      { name: 'Ludwig', image: '/assets/ludwig.jpg', href: '#' },
      { name: 'Westside', image: '/assets/westside.jpg', href: '#' },
      { name: 'Everly', image: '/assets/everly.jpg', href: '#' }
    ],
    Chairs: [
      { name: 'Accent Chair', image: '/assets/accent-chair.jpg', href: '#' },
      { name: 'Swivel Chair', image: '/assets/swivel-chair.jpg', href: '#' }
    ],
    Sectionals: [
      { name: '3-Piece Sectional', image: '/assets/3-piece-sectional.jpg', href: '#' },
      { name: 'U-Shaped Sectional', image: '/assets/u-shaped-sectional.jpg', href: '#' }
    ]
  },
  'Bedroom': {
    Beds: [
      { name: 'Ludwig', image: '/assets/ludwig-bed.jpg', href: '#' },
      { name: 'Waterfall', image: '/assets/waterfall-bed.jpg', href: '#' },
      { name: 'Normandy', image: '/assets/normandy-bed.jpg', href: '#' }
    ],
    Dressers: [
      { name: 'Double Dresser', image: '/assets/double-dresser.jpg', href: '#' },
      { name: 'Tallboy Dresser', image: '/assets/tallboy-dresser.jpg', href: '#' }
    ],
    Nightstands: [
      { name: 'Modern Stand', image: '/assets/modern-nightstand.jpg', href: '#' },
      { name: 'Classic Nightstand', image: '/assets/classic-nightstand.jpg', href: '#' }
    ]
  },
  'Dining Room': {
    Tables: [
      { name: 'Extendable Table', image: '/assets/extendable-table.jpg', href: '#' },
      { name: 'Round Table', image: '/assets/round-table.jpg', href: '#' }
    ],
    Chairs: [
      { name: 'Upholstered Chair', image: '/assets/upholstered-chair.jpg', href: '#' },
      { name: 'Wood Chair', image: '/assets/wood-chair.jpg', href: '#' }
    ],
    Storage: [
      { name: 'Buffet Storage', image: '/assets/buffet-storage.jpg', href: '#' },
      { name: 'Sideboard', image: '/assets/sideboard.jpg', href: '#' }
    ]
  },
  'Perfect Match': {
    'Design Tools': [
      { name: 'Room Planner', image: '/assets/room-planner.jpg', href: '#' },
      { name: 'Material Picker', image: '/assets/material-picker.jpg', href: '#' }
    ],
    'Style Finder': [
      { name: 'Modern Style', image: '/assets/modern-style.jpg', href: '#' },
      { name: 'Farmhouse Style', image: '/assets/farmhouse-style.jpg', href: '#' }
    ]
  },
  'Best Sellers': {
    'Top Rated': [
      { name: 'Verona Bed', image: '/assets/verona-bed.jpg', href: '#' },
      { name: 'Ludwig Sofa', image: '/assets/ludwig-sofa.jpg', href: '#' }
    ],
    'Customer Favorites': [
      { name: 'Everly Chair', image: '/assets/everly-chair.jpg', href: '#' },
      { name: 'Waterfall Bed', image: '/assets/waterfall-bed.jpg', href: '#' }
    ]
  }
}

export default function Navbar() {
  const [hasMounted, setHasMounted] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [openLabel, setOpenLabel] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: string | null }>({})
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setOpenLabel(null)
      setMobileMenuOpen(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!hasMounted) return null

  return (
    <div className="w-full sticky top-0 z-50 bg-white border-b text-sm" suppressHydrationWarning>
      <Link href="https://www.alliance4safety.org/new-age-recall" target="_blank" className="block bg-[#333333] text-white text-center py-2 text-xs">
        New Age Recall Information
      </Link>

      {/* Top Nav Row */}
      <div className="relative w-full max-w-[1600px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-0 py-4">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <SearchDrawer open={searchOpen} onOpenChange={setSearchOpen} />
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <BrandSwitcher />
        </div>

        <div className="flex items-center space-x-6">
          <Link href="#" className="hidden md:flex items-center gap-1 text-[#333333] cursor-pointer">
            <MapPin className="w-4 h-4" /> Find Flexsteel
          </Link>
          <Link href="/whats-new" className="hidden md:flex items-center gap-1 text-[#333333] cursor-pointer">
            <Zap className="w-4 h-4" /> What's New
          </Link>
          <Link href="/store" className="hidden md:flex items-center gap-1 text-[#333333] cursor-pointer">
            <Package className="w-4 h-4" /> Store
          </Link>
        </div>
      </div>

      {/* Mega Menu Row */}
      <div className="hidden md:flex border-t border-gray-100 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-0 py-2 justify-between items-center">
        {Object.entries(megaMenu).map(([label, categories]) => (
          <div key={label} className="relative">
            <Popover open={openLabel === label} onOpenChange={() => {}}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  onClick={() => {
                    if (openLabel === label) {
                      setOpenLabel(null)
                    } else {
                      setOpenLabel(label)
                      setActiveCategory(Object.keys(categories)[0])
                    }
                  }}
                  className={`flex items-center gap-1 text-[#333333] hover:text-black cursor-pointer ${openLabel === label ? 'font-semibold text-black' : ''}`}
                >
                  {label}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </PopoverTrigger>

              <AnimatePresence>
                {openLabel === label && (
                  <div className="fixed inset-0 top-full z-50 flex justify-center pointer-events-none">
                    <div className="w-full max-w-[1560px] px-4 sm:px-6 lg:px-12 pointer-events-auto">
                      <PopoverContent className="w-full px-6 py-6 bg-white border rounded-md shadow-lg mt-1">
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/5 pr-6 border-r mb-4 md:mb-0">
                              <ul className="space-y-2">
                                {Object.keys(categories).map((category) => (
                                  <li
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`text-gray-800 font-medium hover:underline cursor-pointer ${activeCategory === category ? 'text-black' : ''}`}
                                  >
                                    {category}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="w-full md:w-4/5 pl-0 md:pl-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                              {activeCategory &&
                                categories[activeCategory]?.map((product) => (
                                  <div key={product.name} className="text-center cursor-pointer">
                                    <Link href={product.href} className="hover:opacity-90">
                                      <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={400}
                                        height={260}
                                        className="mx-auto object-cover rounded"
                                      />
                                      <div className="mt-2 text-sm font-medium text-[#333333]">{product.name}</div>
                                    </Link>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </motion.div>
                      </PopoverContent>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </Popover>
          </div>
        ))}

        <Link href="/pages/zecliner" className="text-[#333333] hover:text-black font-medium text-sm px-2 py-2">
          Zecliner
        </Link>
        <Link href="/pages/statements" className="text-[#333333] hover:text-black font-medium text-sm px-2 py-2">
          Statements
        </Link>
      </div>
    </div>
  )
}
