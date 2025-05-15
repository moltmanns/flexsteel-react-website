'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function HeroSection() {
  const [videoError, setVideoError] = useState(false)

  return (
    <section className="relative w-full min-h-[calc(100vh-64px)] overflow-hidden">
      {!videoError ? (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
          width="1920"
          height="1080"
          onError={() => setVideoError(true)}
        >
          <source src="/assets/videos/henry-clip.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          src="/assets/0520.webp"
          alt="Furniture showcase"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          width="1920"
          height="1080"
        />
      )}

      <div className="absolute inset-0 z-20 flex items-end mb-[8rem]">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-2 pb-10 text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[96px] font-semibold leading-tighter drop-shadow-md">
            Designer Furniture<br /> for Luxurious Spaces
          </h1>
          <Link href="/shop-now">
            <button className="mt-6 px-6 py-4 bg-[#333333] text-white font-base rounded-full shadow hover:bg-[#0d0d0d] transition cursor-pointer">
              Explore Our Latest Collections
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
