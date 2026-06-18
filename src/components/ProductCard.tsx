// src/components/ProductCard.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

type SubItem = {
  title: string;
  image_url: string;
};

type ProductCardProps = {
  title: string;
  items: SubItem[] | null;
  single_image?: string;
  link_text: string;
};

export default function ProductCard({ title, items, single_image, link_text }: ProductCardProps) {
  const router = useRouter();

  // Dynamic routing logic based on clicked card headers or grid tiles
  const handleNavigation = (searchText: string) => {
    const term = searchText.toLowerCase().trim();
    
    // Explicit clean mapping parameters checks
    if (term.includes('washing') || term.includes('washer')) {
      router.push('/search?category=washing');
    } else if (term.includes('air') || term === 'ac' || term.includes('conditioner')) {
      router.push('/search?category=ac');
    } else if (term.includes('refrigerator') || term.includes('fridge')) {
      router.push('/search?category=refrigerator');
    } else if (term.includes('microwave') || term.includes('oven')) {
      router.push('/search?category=microwave');
    } else if (term.includes('cushion') || term.includes('furnishing')) {
      // 🌟 FORCE ROUTING CAPTURE: Match clean query interceptor for the trend UI
      router.push('/search?category=cushion');
    } else {
      router.push(`/search?category=${encodeURIComponent(term)}`);
    }
  };

  return (
    <div className="bg-white p-5 flex flex-col justify-between h-[420px] rounded-none shadow-xs border border-gray-100 text-left">
      <h2 className="text-[19px] font-bold text-gray-900 line-clamp-2 leading-tight">
        {title}
      </h2>

      {/* CASE 1: Multi-Item 4x4 Grid Layout */}
      {items && items.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-3 gap-y-2 my-3 flex-grow justify-center items-center">
          {items.slice(0, 4).map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => handleNavigation(item.title)}
              className="cursor-pointer group flex flex-col justify-between h-[135px]"
            >
              <div className="bg-gray-50 w-full h-[105px] flex items-center justify-center overflow-hidden p-2 border border-gray-50 group-hover:border-gray-200 transition-colors">
                <img 
                  src={item.image_url} 
                  alt={item.title} 
                  className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <span className="text-[11px] font-normal text-gray-700 line-clamp-1 mt-1 group-hover:text-orange-600">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      ) : (
        /* CASE 2: Single Full-Image Card Layout Banner */
        <div 
          onClick={() => handleNavigation(title)}
          className="cursor-pointer my-3 flex-grow flex items-center justify-center overflow-hidden h-[280px] bg-white group"
        >
          <img 
            src={single_image || '/placeholder.webp'} 
            alt={title} 
            className="max-h-full max-w-full object-contain transform group-hover:scale-102 transition-transform duration-200"
          />
        </div>
      )}

      {/* Footer link handling trigger option button text */}
      <button 
        onClick={() => handleNavigation(title)}
        className="text-[#007185] hover:text-orange-600 hover:underline text-[13px] font-medium block text-left bg-transparent border-none outline-none cursor-pointer pt-2"
      >
        {link_text}
      </button>
    </div>
  );
}