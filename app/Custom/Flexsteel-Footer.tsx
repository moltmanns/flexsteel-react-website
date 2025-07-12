'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { ArrowRight } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaPinterestP } from 'react-icons/fa'

const FlexsteelFooter = () => {
  const [currentYear, setCurrentYear] = useState<number | null>(null)

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="bg-[#333333] text-white w-full mt-auto py-8 sm:py-12">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">

        {/* DESIGN DETAILS */}
        <div className="mb-6 sm:mb-0">
          <h3 className="text-sm font-bold mb-3 sm:mb-4">DESIGN DETAILS</h3>
          <ul className="space-y-1.5 sm:space-y-2 text-sm text-gray-300">
            <li><Link href="/design/blue-steel-spring" className="hover:underline">Blue Steel Spring</Link></li>
            <li><Link href="/design/material-wall" className="hover:underline">Material Wall/Swatch Samples</Link></li>
            <li><Link href="/design/new-materials" className="hover:underline">New Materials</Link></li>
            <li><Link href="/design/custom-upholstery" className="hover:underline">Custom Upholstery</Link></li>
            <li><Link href="/design/performance-materials" className="hover:underline">Performance Materials</Link></li>
            <li><Link href="/design/kashmira" className="hover:underline">Kashmira</Link></li>
            <li><Link href="/design/leather" className="hover:underline">Leather</Link></li>
          </ul>
        </div>

        {/* HELPFUL RESOURCES */}
        <div className="mb-6 sm:mb-0">
          <h3 className="text-sm font-bold mb-3 sm:mb-4">HELPFUL RESOURCES</h3>
          <ul className="space-y-1.5 sm:space-y-2 text-sm text-gray-300">
            <li><Link href="/resources/warranty" className="hover:underline">Warranty</Link></li>
            <li><Link href="/resources/investors" className="hover:underline">Investors</Link></li>
            <li><Link href="/resources/certificates" className="hover:underline">General Certificates of Conformity</Link></li>
            <li><Link href="/resources/faqs" className="hover:underline">FAQs</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
            <li><Link href="/resources/retailer-opportunities" className="hover:underline">Retailer Opportunities</Link></li>
            <li><Link href="/backroom-login" className="hover:underline">Backroom Login</Link></li>
            <li><Link href="/privacy/do-not-sell" className="hover:underline">Do not sell or share my personal information</Link></li>
          </ul>
        </div>

        {/* ABOUT FLEXSTEEL */}
        <div className="mb-6 sm:mb-0">
          <h3 className="text-sm font-bold mb-3 sm:mb-4">ABOUT FLEXSTEEL</h3>
          <ul className="space-y-1.5 sm:space-y-2 text-sm text-gray-300">
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
            <li><Link href="/about/corporate-responsibility" className="hover:underline">Corporate Responsibility</Link></li>
            <li><Link href="/news" className="hover:underline">News & Events</Link></li>
            <li><Link href="/careers" className="hover:underline">Careers</Link></li>
            <li><Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* SIGN UP + SOCIAL */}
        <div className="flex flex-col gap-4 sm:gap-6">
          <div>
            <p className="text-sm font-semibold leading-tight text-white mb-3">
              Sign Up For News Releases + Info
              <br className="hidden sm:block" />
              <span className="sm:hidden">& </span>On Sales / New Arrivals
            </p>
            <div className="relative">
              <Input
                placeholder="Enter Email"
                className="pr-10 bg-white text-black placeholder-gray-600 h-10 sm:h-11"
              />
              <ArrowRight className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800" size={18} />
            </div>
          </div>

          <div className="flex gap-4 text-white">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <div className="bg-white rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-black hover:bg-gray-200 transition">
                <FaFacebookF className="text-sm sm:text-base" />
              </div>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <div className="bg-white rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-black hover:bg-gray-200 transition">
                <FaInstagram className="text-sm sm:text-base" />
              </div>
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
              <div className="bg-white rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-black hover:bg-gray-200 transition">
                <FaPinterestP className="text-sm sm:text-base" />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="w-full mt-8 sm:mt-12 border-t border-[#999998] pt-4 sm:pt-6 text-center text-xs sm:text-sm text-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
          <p className="order-2 sm:order-1">
            &copy; <span suppressHydrationWarning>{currentYear ?? '----'}</span> Flexsteel Industries, Inc.
          </p>
          <img src="/assets/logos/Flexsteel_Primary_Logo_White.png" alt="Flexsteel Logo" className="h-4 sm:h-5 order-1 sm:order-2" />
        </div>
      </div>
    </footer>
  )
}

export default FlexsteelFooter
