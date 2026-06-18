// src/components/ProductCarousel.tsx
'use client';

import React, { useRef, useEffect } from 'react';

type CarouselItem = {
  title: string;
  image_url: string;
  price?: number;
};

type ProductCarouselProps = {
  title: string;
  link_text?: string;
  items: CarouselItem[];
};

export default function ProductCarousel({ title, link_text = "See all offers", items }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Clone items to form an infinite layout loop track
  const duplicatedItems = [...items, ...items, ...items];

  useEffect(() => {
    const el = scrollRef.current;
    if (el && items.length > 0) {
      const itemWidth = el.scrollWidth / 3;
      el.scrollLeft = itemWidth;
    }
  }, [items]);

  const handleInfiniteScrollLoop = () => {
    const el = scrollRef.current;
    if (!el) return;

    const itemWidth = el.scrollWidth / 3;

    if (el.scrollLeft <= 5) {
      el.style.scrollBehavior = 'auto';
      el.scrollLeft = itemWidth + el.scrollLeft;
    } else if (el.scrollLeft >= itemWidth * 2 - 5) {
      el.style.scrollBehavior = 'auto';
      el.scrollLeft = el.scrollLeft - itemWidth;
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;

    el.style.scrollBehavior = 'smooth';
    const scrollAmount = el.clientWidth * 0.75;

    if (direction === 'left') {
      el.scrollBy({ left: -scrollAmount });
    } else {
      el.scrollBy({ left: scrollAmount });
    }
  };

  return (
    <div className="bg-white p-5 my-4 max-w-[1460px] mx-auto w-full relative group select-none text-left">
      
      {/* Header Layout Info Header */}
      <div className="flex items-baseline gap-4 mb-2">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <span className="text-xs font-normal text-[#007185] hover:text-orange-600 hover:underline cursor-pointer">
          {link_text}
        </span>
      </div>

      {/* ⬅️ Floating Left Navigation Arrow */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-[55%] -translate-y-1/2 z-40 bg-white/90 hover:bg-white text-gray-800 h-11 w-11 flex items-center justify-center shadow-[0_2px_5px_rgba(0,0,0,0.15)] border border-gray-200 rounded-r-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-xl"
        aria-label="Scroll Left"
      >
        &#10094;
      </button>

      {/* ➡️ Floating Right Navigation Arrow */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-[55%] -translate-y-1/2 z-40 bg-white/90 hover:bg-white text-gray-800 h-11 w-11 flex items-center justify-center shadow-[0_2px_5px_rgba(0,0,0,0.15)] border border-gray-200 rounded-l-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-xl"
        aria-label="Scroll Right"
      >
        &#10095;
      </button>

      {/* 🖼️ Raw Image Infinite Horizontal Track */}
      <div
        ref={scrollRef}
        onScroll={handleInfiniteScrollLoop}
        className="flex items-center gap-4 overflow-x-auto pb-4 pt-2 scrollbar-thin scrollbar-thumb-gray-300"
      >
        {duplicatedItems.map((item, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 h-48 w-48 flex items-center justify-center cursor-pointer"
          >
            <img
              src={item.image_url}
              alt={item.title}
              className="max-h-full max-w-full object-contain pointer-events-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}