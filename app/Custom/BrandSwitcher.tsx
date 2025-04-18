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
    height: 40,
    marginTop: 'mt-0',
    marginBottom: 'mb-3'
  },
  {
    name: 'Homestyles',
    theme: 'homestyles',
    logo: '/assets/logos/homestyles_Primary_Orange_Logo copy.png',
    link: 'https://www.homestylesfurniture.com/',
    width: 170,
    height: 38,
    marginTop: 'mt-2',
    marginBottom: 'mb-2'
  },
  {
    name: 'Charisma',
    theme: 'charisma',
    logo: '/assets/logos/Charisma-Primary-Logo-Color.png',
    link: '/charisma',
    width: 140,
    height: 40,
    marginTop: 'mt-1',
    marginBottom: 'mb-2'
  }
]

const BrandSwitcher = () => {
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
          />
          <ChevronDown className="w-4 h-4 text-[#333333]" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="flex flex-col items-center p-6">
        {brands.map(({ name, theme, logo, link, width, height, marginTop, marginBottom }) => (
          <Link
            key={theme}
            href={link}
            className={`cursor-pointer ${marginTop} ${marginBottom}`}
            onClick={() => handleThemeSwitch(theme)}
          >
            <Image
              src={logo}
              alt={name}
              width={width}
              height={height}
              className="object-contain"
            />
          </Link>
        ))}
      </PopoverContent>
    </Popover>
  )
}

export default BrandSwitcher
