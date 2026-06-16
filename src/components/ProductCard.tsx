// src/components/ProductCard.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

type SubItem = {
  title: string;
  image_url: string;
};

type Props = {
  title: string;
  items?: SubItem[] | null;       
  single_image?: string | null;    
  link_text: string;        
};

export default function ProductCard({ title, items, single_image, link_text }: Props) {
  const router = useRouter();
  const isAppliancesCard = title.toLowerCase().includes('appliances');

  return (
    <div className="bg-white p-5 z-30 flex flex-col justify-between shadow-sm rounded-none min-h-[420px] text-left select-none">
      <h2 className="text-xl font-bold text-gray-900 mb-3">{title}</h2>
      
      {items && items.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 flex-grow items-center">
          {items.map((item, idx) => {
            // 🌟 இப்போ டேட்டாபேஸ்ல இருந்து வர்ற image_url-ஐயே டைரக்டா எடுக்குறோம்
            const finalImageUrl = item.image_url; 
            const itemTitleClean = (item.title || "").toLowerCase();

            // கேட்டகிரி டிடெக்ஷன்
            let category = 'search';
            if (itemTitleClean.includes('air') || itemTitleClean.includes('ac')) category = 'ac';
            else if (itemTitleClean.includes('refrigerator') || itemTitleClean.includes('fridge')) category = 'refrigerator';
            else if (itemTitleClean.includes('microwave') || itemTitleClean.includes('oven')) category = 'microwave';
            else if (itemTitleClean.includes('washing') || itemTitleClean.includes('machine')) category = 'washing';

            return (
              <div 
                key={idx} 
                onClick={() => router.push(`/search?category=${category}`)}
                className="text-left cursor-pointer group"
              >
                <div className="bg-gray-100 h-28 flex items-center justify-center overflow-hidden p-2 rounded-sm">
                  <img 
                    src={finalImageUrl} 
                    alt={item.title}
                    onError={(e) => { e.currentTarget.src = "/ac/ac1.webp"; }} // ஃபால்பேக் இமேஜ்
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <p className="text-xs text-gray-700 mt-1 font-medium truncate group-hover:text-orange-600">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex-grow bg-gray-50 animate-pulse rounded-sm" />
      )}

      <div 
        onClick={() => router.push('/search?category=refrigerator')}
        className="text-xs text-teal-700 font-semibold hover:text-orange-700 hover:underline mt-4 block cursor-pointer"
      >
        {link_text}
      </div>
    </div>
  );
}