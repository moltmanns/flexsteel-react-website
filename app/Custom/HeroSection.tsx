'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function HeroSection() {
  const [videoError, setVideoError] = useState(false)

  return (
    <section className="relative w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-[calc(100vh-64px)] overflow-hidden">
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
          className="absolute top-0 left-0 w-full h-full object-cover object-center z-0"
          width="1920"
          height="1080"
        />
      )}

      <div className="absolute inset-0 z-20 flex items-end pb-12 sm:pb-16 md:pb-20 lg:pb-32">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[96px] font-semibold leading-[1.1] sm:leading-[1.1] md:leading-[1.05] lg:leading-[1] drop-shadow-md">
            Designer Furniture<br className="hidden sm:block" />
            <span className="block sm:inline">for Luxurious Spaces</span>
          </h1>
          <Link href="/shop-now">
            <button className="mt-4 sm:mt-6 px-4 sm:px-6 py-3 sm:py-4 bg-flexsteel-primary text-white text-sm sm:text-base font-base rounded-full shadow hover:bg-black transition cursor-pointer">
              Explore Our Latest Collections
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
