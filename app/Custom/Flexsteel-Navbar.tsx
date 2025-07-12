'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import {
  ChevronDown, MapPin, Menu, Package, Search, Zap
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import BrandSwitcher from './BrandSwitcher'
import { AnimatePresence, motion } from 'framer-motion'
import SmartSearchDrawer from './SmartSearchDrawer'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

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

interface MobileMenuProps {
  categories: typeof megaMenu
  onClose: () => void
}

const MobileMenu = ({ categories, onClose }: MobileMenuProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [expandedSubcategory, setExpandedSubcategory] = useState<string | null>(null)

  return (
    <div className="p-6 pt-2">
      <div className="space-y-4">
        {Object.entries(categories).map(([category, subcategories]) => (
          <div key={category} className="border-b pb-4">
            <button
              onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
              className="flex items-center justify-between w-full text-left font-medium text-[#333333] hover:text-black transition-colors cursor-pointer"
            >
              {category}
              <ChevronDown className={`w-4 h-4 transition-transform ${expandedCategory === category ? 'rotate-180' : ''}`} />
            </button>
            {expandedCategory === category && (
              <div className="mt-3 ml-4 space-y-3">
                {Object.entries(subcategories).map(([subcat, items]) => (
                  <div key={subcat}>
                    <button
                      onClick={() => setExpandedSubcategory(expandedSubcategory === subcat ? null : subcat)}
                      className="flex items-center justify-between w-full text-left text-sm text-[#666666] hover:text-black transition-colors cursor-pointer"
                    >
                      {subcat}
                      <ChevronDown className={`w-3 h-3 transition-transform ${expandedSubcategory === subcat ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSubcategory === subcat && (
                      <div className="mt-2 ml-4 space-y-2">
                        {items.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block text-sm text-[#888888] hover:text-black transition-colors cursor-pointer"
                            onClick={onClose}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <Link href="/pages/zecliner" className="block py-2 font-medium text-[#333333] hover:text-black transition-colors cursor-pointer" onClick={onClose}>
          Zecliner
        </Link>
        <Link href="/pages/statements" className="block py-2 font-medium text-[#333333] hover:text-black transition-colors cursor-pointer" onClick={onClose}>
          Statements
        </Link>
        <div className="pt-4 border-t space-y-4">
          <Link href="#" className="flex items-center gap-2 text-[#333333] hover:text-black transition-colors cursor-pointer" onClick={onClose}>
            <MapPin className="w-4 h-4" /> Find Flexsteel
          </Link>
          <Link href="/whats-new" className="flex items-center gap-2 text-[#333333] hover:text-black transition-colors cursor-pointer" onClick={onClose}>
            <Zap className="w-4 h-4" /> What's New
          </Link>
          <Link href="/store" className="flex items-center gap-2 text-[#333333] hover:text-black transition-colors cursor-pointer" onClick={onClose}>
            <Package className="w-4 h-4" /> Store
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Navbar() {
  const [hasMounted, setHasMounted] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [openLabel, setOpenLabel] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const autoCloseTimer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => { setHasMounted(true) }, [])

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setScrolled(offset > 80)
      setOpenLabel(null)
      setMobileMenuOpen(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenLabel(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (openLabel) {
      autoCloseTimer.current = setTimeout(() => setOpenLabel(null), 3000)
      const currentDropdown = dropdownRef.current
      const cancelTimer = () => {
        if (autoCloseTimer.current) {
          clearTimeout(autoCloseTimer.current)
        }
      }
      currentDropdown?.addEventListener('mousemove', cancelTimer)
      return () => {
        if (autoCloseTimer.current) {
          clearTimeout(autoCloseTimer.current)
        }
        currentDropdown?.removeEventListener('mousemove', cancelTimer)
      }
    }
  }, [openLabel])

  if (!hasMounted) return null

  return (
    <div className="w-full sticky top-0 z-50 bg-white border-b text-sm" suppressHydrationWarning>
      <Link href="https://www.alliance4safety.org/new-age-recall" target="_blank" className="block bg-[#333333] text-white text-center py-2 text-xs cursor-pointer">
        New Age Recall Information
      </Link>

      {/* Compact or Default Header */}
      <div className={`w-full transition-all duration-300 ease-in-out ${
        scrolled ? 'h-14 sm:h-16' : 'h-auto'
      }`}>
        <div className="relative w-full max-w-[1600px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4">
        {scrolled ? (
          <>
            <div className="flex items-center space-x-4 z-10">
              <BrandSwitcher />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-[600px] flex justify-center items-center px-4 z-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <input
                  type="text"
                  placeholder="Search Flexsteel..."
                  className="w-full py-1 px-3 rounded-full border border-[#333333]/30 text-sm focus:outline-none focus:ring-1 focus:ring-[#333333]/30 transition-all"
                />
              </motion.div>
            </div>
            <div className="flex items-center space-x-4 z-10">
              <Link href="#" className="hidden md:flex items-center gap-1 text-[#333333] cursor-pointer hover:text-black transition-colors">
                <MapPin className="w-4 h-4" />
              </Link>
              <Link href="/whats-new" className="hidden md:flex items-center gap-1 text-[#333333] cursor-pointer hover:text-black transition-colors">
                <Zap className="w-4 h-4" />
              </Link>
              <Link href="/store" className="hidden md:flex items-center gap-1 text-[#333333] cursor-pointer hover:text-black transition-colors">
                <Package className="w-4 h-4" />
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center space-x-2 sm:space-x-4 z-10">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden cursor-pointer">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
                  <SheetHeader className="p-6 pb-4 border-b">
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <MobileMenu categories={megaMenu} onClose={() => setMobileMenuOpen(false)} />
                </SheetContent>
              </Sheet>
              <button
                onClick={() => setSearchOpen(true)}
                className="px-3 py-1.5 bg-flexsteel-primary text-white text-sm font-medium rounded-full hover:bg-black transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                Flexsteel AI
              </button>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 z-10">
              <BrandSwitcher />
            </div>
            <div className="flex items-center space-x-3 sm:space-x-6 z-10">
              <Link href="#" className="hidden md:flex items-center gap-1 text-[#333333] cursor-pointer hover:text-black transition-colors text-sm lg:text-base">
                <MapPin className="w-4 h-4" /> <span className="hidden lg:inline">Find Flexsteel</span>
              </Link>
              <Link href="/whats-new" className="hidden md:flex items-center gap-1 text-[#333333] cursor-pointer hover:text-black transition-colors text-sm lg:text-base">
                <Zap className="w-4 h-4" /> <span className="hidden lg:inline">What's New</span>
              </Link>
              <Link href="/store" className="hidden md:flex items-center gap-1 text-[#333333] cursor-pointer hover:text-black transition-colors text-sm lg:text-base">
                <Package className="w-4 h-4" /> <span className="hidden lg:inline">Store</span>
              </Link>
            </div>
          </>
        )}
        </div>
      </div>

      {/* Mega Menu */}
      {!scrolled && (
        <div className="w-full border-t border-gray-100">
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: scrolled ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="hidden md:flex max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-2 justify-between items-center flex-wrap"
          >
          <div className="flex items-center gap-6 lg:gap-8">
            {Object.entries(megaMenu).map(([label, categories]) => (
              <div key={label} className="relative">
                <button
                  onClick={() => {
                    if (openLabel === label) {
                      setOpenLabel(null)
                    } else {
                      setOpenLabel(label)
                      setActiveCategory(Object.keys(categories)[0])
                    }
                  }}
                  className={`flex items-center gap-1 px-2 py-1 rounded text-[#333333] hover:text-black transition-colors cursor-pointer ${
                    openLabel === label ? 'font-semibold text-black' : ''
                  }`}
                >
                  {label}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openLabel === label ? 'rotate-180' : ''}`} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-6 lg:gap-8">
            <Link href="/pages/zecliner" className="text-[#333333] hover:text-black font-medium text-sm px-2 py-2 transition-colors cursor-pointer">
              Zecliner
            </Link>
            <Link href="/pages/statements" className="text-[#333333] hover:text-black font-medium text-sm px-2 py-2 transition-colors cursor-pointer">
              Statements
            </Link>
          </div>
          </motion.div>
        </div>
      )}

      {/* Mega Dropdown */}
      <AnimatePresence>
        {openLabel && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 w-full bg-white border-t shadow-xl z-40"
          >
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row">
              <div className="w-full md:w-1/5 pr-0 md:pr-6 md:border-r mb-6 md:mb-0">
                <ul className="space-y-2 flex flex-wrap md:flex-col gap-4 md:gap-0">
                  {Object.keys(megaMenu[openLabel as keyof typeof megaMenu]).map((category) => (
                    <li
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`text-gray-800 font-medium hover:underline cursor-pointer transition-colors ${
                        activeCategory === category ? 'text-black underline' : ''
                      }`}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-4/5 pl-0 md:pl-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {activeCategory &&
                  (megaMenu[openLabel as keyof typeof megaMenu] as Record<string, { name: string; image: string; href: string }[]>)[activeCategory]?.map((product) => (
                    <motion.div
                      key={product.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-center cursor-pointer"
                    >
                      <Link href={product.href} className="hover:opacity-90 transition-opacity cursor-pointer">
                        <Image src={product.image} alt={product.name} width={400} height={260} className="mx-auto object-cover rounded" />
                        <div className="mt-2 text-sm font-medium text-[#333333]">{product.name}</div>
                      </Link>
                    </motion.div>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Smart Search Drawer */}
      <SmartSearchDrawer 
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)} 
      />
    </div>
  )
}