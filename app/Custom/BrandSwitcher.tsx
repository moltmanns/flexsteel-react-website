'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { ChevronDown } from 'lucide-react';

const brands = [
  {
    name: 'Flexsteel',
    theme: 'flexsteel',
    logo: '/assets/logos/Flexsteel_Primary_Logo_Charcoal.png',
    link: '/flexsteel'
  },
  {
    name: 'Homestyles',
    theme: 'homestyles',
    logo: '/assets/logos/homestyles_Primary_Orange_Logo copy.png',
    link: '/homestyles'
  },
  {
    name: 'Charisma',
    theme: 'charisma',
    logo: '/assets/logos/Charisma-Primary-Logo-Color.png',
    link: '/charisma'
  }
];

const BrandSwitcher = () => {
  const handleThemeSwitch = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('selected-theme', theme);
  };

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
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="flex flex-col items-center space-y-4 p-6">
        {brands.map(({ name, theme, logo, link }) => (
          <Link
            key={theme}
            href={link}
            className="cursor-pointer"
            onClick={() => handleThemeSwitch(theme)}
          >
            <Image
              src={logo}
              alt={name}
              width={180}
              height={40}
              className="object-contain"
            />
          </Link>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default BrandSwitcher;
