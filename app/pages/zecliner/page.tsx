'use client'

import FlexsteelFooter from '@/app/Custom/Flexsteel-Footer'
import Navbar from '@/app/Custom/Flexsteel-Navbar'
import React from 'react'

function page() {
  return (
    <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      <div className="text-5xl">Zecliner page</div>
    </main>
    <FlexsteelFooter />
  </div>
  )
}

export default page