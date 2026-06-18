'use client';

import React, { useState, useEffect } from 'react';

export default function HeroBanner() {
  // Official Amazon promo banner image links
  const bannerImages = [
    "https://images-eu.ssl-images-amazon.com/images/G/31/Img26/Sports/June/IYDS/GW/Legacy_PC/Yoga_day_GW_Desktop_3000x1200._CB760845812_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/rabhinak/gw/pc/Gw-Hero-PC-Budget-store._CB759385279_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/2025/GW/UNREC/PC/78270._CB785061629_.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. AUTOMATIC SLIDING LOGIC (Cycles every 4 seconds)
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // 4000ms = 4 seconds

    // Clear the interval when the component unmounts to prevent memory leaks
    return () => clearInterval(slideInterval);
  }, [bannerImages.length]);

  // 2. MANUAL CLICK HANDLERS
  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => 
      prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden select-none bg-gray-100">
      
      {/* The Amazon Gradient Mask Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-100 via-transparent to-transparent z-10 pointer-events-none h-full w-full" />

      {/* Main Image Banner Container Layer */}
      <div className="w-full h-[240px] sm:h-[320px] md:h-[420px] lg:h-[520px] xl:h-[600px] relative">
        <img 
          src={bannerImages[currentIndex]} 
          alt={`Amazon Banner Slide ${currentIndex + 1}`} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top transition-all duration-500 ease-in-out"
          onError={(e) => {
            console.error("Image asset failed to load via network:", e.currentTarget.src);
          }}
        />
      </div>

      {/* Left Arrow Button Controls (Clickable) */}
      <button 
        onClick={handlePrevSlide}
        type="button"
        aria-label="Previous Slide"
        className="absolute left-0 top-0 bottom-0 bg-transparent hover:bg-black/5 text-gray-800 hover:text-black transition-colors w-14 flex items-center justify-center z-20 cursor-pointer group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 transform group-hover:scale-105 transition-transform">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Right Arrow Button Controls (Clickable) */}
      <button 
        onClick={handleNextSlide}
        type="button"
        aria-label="Next Slide"
        className="absolute right-0 top-0 bottom-0 bg-transparent hover:bg-black/5 text-gray-800 hover:text-black transition-colors w-14 flex items-center justify-center z-20 cursor-pointer group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 transform group-hover:scale-105 transition-transform">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

    </div>
  );
}