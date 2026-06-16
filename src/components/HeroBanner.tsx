// src/components/HeroBanner.tsx
'use client';

import React, { useState, useEffect } from 'react';

export default function HeroBanner() {
  // Carousel-க்கான ஹை-குவாலிட்டி அமேசான் ஸ்டைல் பேனர் இமேஜ் லிஸ்ட்டுகள்
  const bannerImages = [
    "https://images-eu.ssl-images-amazon.com/images/G/31/img24/Media/BAU/PC_Hero_2x._CB583321151_.jpg", // Clean Blue Mega Home Sale Banner
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80", // Kitchen & Home Essentials Sale
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&q=80", // Cosmetics & Beauty Deals
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&q=80"  // Electronics & Headphones Offers
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // இடது பக்க அம்பு குறி கிளிக் லாஜிக்
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? bannerImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // வலது பக்க அம்பு குறி கிளிக் லாஜிக்
  const nextSlide = () => {
    const isLastSlide = currentIndex === bannerImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // தானாகவே 5 வினாடிக்கு ஒருமுறை ஸ்லைடர் மாற வைக்கும் Auto-play லாஜிக்
  useEffect(() => {
    const autoSlider = setInterval(() => {
      nextSlide();
    }, 5000); // 5000ms = 5 Seconds

    return () => clearInterval(autoSlider);
  }, [currentIndex]);

  return (
    <div className="relative max-w-[1500px] h-[600px] mx-auto overflow-hidden group select-none">
      
      {/* 1. Main Slider Container with Smooth Ease Animation */}
      <div 
        className="w-full h-full bg-center bg-cover duration-500 transition-all ease-out"
        style={{ backgroundImage: `url(${bannerImages[currentIndex]})` }}
      >
        {/* image_a23cfc.png-ல இருக்குற மாதிரி ஒரு மெகா டெக்ஸ்ட் கார்டை மேலேயே கொண்டு வரோம் */}
        {currentIndex === 0 && (
          <div className="absolute top-12 left-1/3 transform -translate-x-1/4 text-black hidden md:block max-w-md bg-transparent p-4 z-20">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Mega home sale</h1>
            <p className="text-xl font-semibold text-gray-800 mt-2">Drying racks & home decor</p>
            <p className="text-3xl font-bold mt-1 text-slate-900">Starting ₹999</p>
            <div className="mt-4 flex gap-2 items-center bg-white/80 p-2 rounded-sm inline-block backdrop-blur-xs border border-gray-200 shadow-xs">
              <span className="text-xs font-bold text-orange-600">Up to 10% Instant Discount*</span>
            </div>
          </div>
        )}
      </div>

      {/* 2. Left Arrow Button Control (உங்க ஸ்கிரீன்ஷாட்ல இருக்குற அதே மெலிதான அமேசான் ஸ்டைல் அம்பு குறி) */}
      <button 
        onClick={prevSlide}
        className="absolute top-0 left-0 h-[250px] md:h-[350px] flex items-center justify-center px-4 bg-transparent text-black/70 hover:text-black focus:outline-none z-30 group-hover:bg-black/5 transition-all cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-14 h-14">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* 3. Right Arrow Button Control (உங்க ஸ்கிரீன்ஷாட்ல இருக்குற அதே மெலிதான அமேசான் ஸ்டைல் அம்பு குறி) */}
      <button 
        onClick={nextSlide}
        className="absolute top-0 right-0 h-[250px] md:h-[350px] flex items-center justify-center px-4 bg-transparent text-black/70 hover:text-black focus:outline-none z-30 group-hover:bg-black/5 transition-all cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-14 h-14">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* 4. Bottom Gradient Mask (இமேஜ் கீழே போகப்போக அப்படியே சாம்பல் நிற பேக்கிரவுண்டோடு கலக்கும் அமேசான் ஃபேட் எஃபெக்ட்) */}
      <div className="absolute bottom-0 left-0 right-0 h-[320px] bg-gradient-to-t from-gray-100 to-transparent z-10 pointer-events-none" />
      
    </div>
  );
}