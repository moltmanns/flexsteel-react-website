'use client'

import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { ArrowRight } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaPinterestP } from 'react-icons/fa'

const FlexsteelFooter = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#1e1e1e] text-white px-4 sm:px-6 lg:px-12 py-12">
      <div className="max-w-[1560px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* DESIGN DETAILS */}
        <div>
          <h3 className="text-sm font-bold mb-4">DESIGN DETAILS</h3>
          <ul className="space-y-2 text-sm text-gray-300">
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
        <div>
          <h3 className="text-sm font-bold mb-4">HELPFUL RESOURCES</h3>
          <ul className="space-y-2 text-sm text-gray-300">
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
        <div>
          <h3 className="text-sm font-bold mb-4">ABOUT FLEXSTEEL</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
            <li><Link href="/about/corporate-responsibility" className="hover:underline">Corporate Responsibility</Link></li>
            <li><Link href="/news" className="hover:underline">News & Events</Link></li>
            <li><Link href="/careers" className="hover:underline">Careers</Link></li>
            <li><Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* SIGN UP + SOCIAL */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm font-semibold leading-tight text-white mb-2">
              Sign Up For News Releases + Info
              <br />
              On Sales / New Arrivals
            </p>
            <div className="relative">
              <Input
                placeholder="Enter Email"
                className="pr-10 bg-white text-black placeholder-gray-600"
              />
              <ArrowRight className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800" size={20} />
            </div>
          </div>

          <div className="flex gap-4 text-white">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-black hover:bg-gray-200 transition">
                <FaFacebookF />
              </div>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-black hover:bg-gray-200 transition">
                <FaInstagram />
              </div>
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
              <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-black hover:bg-gray-200 transition">
                <FaPinterestP />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">&copy; {currentYear} Flexsteel Industries, Inc.</p>
          <img src="/logo-flexsteel-light.svg" alt="Flexsteel Logo" className="h-5" />
        </div>
      </div>
    </footer>
  )
}

export default FlexsteelFooter
