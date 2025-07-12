'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { ChevronDown } from 'lucide-react'

const brands = [
  {
    name: 'Flexsteel',
    theme: 'flexsteel',
    logo: '/assets/logos/Flexsteel_Primary_Logo_Charcoal.png',
    link: '/',
    width: 200,
    height: 40
  },
  {
    name: 'Homestyles',
    theme: 'homestyles',
    logo: '/assets/logos/homestyles_Primary_Orange_Logo copy.png',
    link: 'https://www.homestylesfurniture.com/',
    width: 170,
    height: 38
  },
  {
    name: 'Charisma',
    theme: 'charisma',
    logo: '/assets/logos/Charisma-Primary-Logo-Color.png',
    link: '/charisma',
    width: 140,
    height: 40
  }
]

const BrandSwitcher = () => {
  const currentTheme = typeof window !== 'undefined'
    ? localStorage.getItem('selected-theme') ?? 'flexsteel'
    : 'flexsteel'

  const handleThemeSwitch = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('selected-theme', theme)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1 cursor-pointer mx-auto">
          <Image
            src="/assets/logos/Flexsteel_Primary_Logo_Charcoal.png"
            alt="Brand Switcher"
            width={200}
            height={40}
            priority
            className="h-4 md:h-7 w-auto object-contain"
          />
          <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-[#333333]" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="flex flex-col items-center p-6 space-y-0 w-[280px]">
        {brands.map(({ name, theme, logo, link, width, height }, index) => {
          const isActive = currentTheme === theme
          return (
            <div
              key={theme}
              className={`w-full text-center ${index !== 0 ? 'border-t border-gray-200' : ''}`}
            >
              <Link
                href={link}
                onClick={() => handleThemeSwitch(theme)}
                className={`
                  block w-full py-4 transition-all duration-150
                  hover:bg-gray-100 hover:scale-[1.01]
                  ${isActive ? 'bg-gray-100 font-semibold' : ''}
                `}
              >
                <Image
                  src={logo}
                  alt={name}
                  width={width}
                  height={height}
                  className="object-contain mx-auto"
                />
              </Link>
            </div>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}

export default BrandSwitcher
