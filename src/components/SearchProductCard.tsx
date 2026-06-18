// src/components/SearchProductCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';

type ProductCardProps = {
  id: number;
  title: string;
  image_url: string;
  price: number;
};

// Generate an authentic looking Amazon star rating based on product ID
function getStarRating(id: number) {
  const ratings = [4.2, 4.4, 3.9, 4.5, 4.1, 4.3];
  return ratings[id % ratings.length];
}

function getReviewCount(id: number) {
  const counts = [271, 1084, 95, 2341, 512, 189];
  return counts[id % counts.length];
}

export default function SearchProductCard({ id, title, image_url, price }: ProductCardProps) {
  const rating = getStarRating(id);
  const reviews = getReviewCount(id);
  
  // Calculate a clean mock original MRP to show a realistic discount structure
  const originalMRP = Math.round(price * 1.35);

  return (
    <div className="bg-white border border-gray-200 rounded-none p-4 flex flex-col justify-between h-full hover:shadow-md transition-shadow duration-200 text-left">
      
      {/* 1. Image Container Frame */}
      <Link href={`/product/${id}`} className="cursor-pointer block">
        <div className="relative bg-white h-52 w-full flex items-center justify-center mb-4 overflow-hidden group">
          
          {/* Authentic Amazon Product Badge */}
          {id % 2 === 0 && (
            <span className="absolute top-0 left-0 bg-[#002F36] text-white text-[10px] font-bold px-2 py-0.5 z-10 select-none">
              NEW ARRIVAL
            </span>
          )}

          <img 
            src={image_url} 
            alt={title} 
            className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* 2. Content Info Details Section */}
      <div className="flex-grow flex flex-col justify-between space-y-2">
        <div>
          {/* Dynamic Link Title */}
          <Link href={`/product/${id}`} className="cursor-pointer">
            <h2 className="text-sm md:text-base text-gray-900 font-normal hover:text-orange-600 hover:underline line-clamp-3 leading-snug">
              {title}
            </h2>
          </Link>

          {/* Rating Clusters */}
          <div className="flex items-center gap-1 mt-1 text-sm select-none">
            <span className="text-[#333] font-medium text-xs pt-0.5">{rating.toFixed(1)}</span>
            <div className="flex text-[#F1A417] text-xs">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star}>{rating >= star ? '★' : rating >= star - 0.5 ? '⯨' : '☆'}</span>
              ))}
            </div>
            <span className="text-[#007185] hover:text-orange-600 hover:underline cursor-pointer text-xs">
              ({reviews})
            </span>
          </div>
        </div>

        {/* 3. Transaction Pricing & Actions Row */}
        <div className="pt-2 border-t border-gray-100">
          
          {/* Dynamic Database Pricing */}
          <div className="flex items-baseline flex-wrap gap-x-1.5">
            <span className="text-2xl font-medium text-gray-900">
              <span className="text-xs font-normal align-top mr-0.5">₹</span>
              {Number(price).toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-gray-500 line-through">
              ₹{originalMRP.toLocaleString('en-IN')}
            </span>
          </div>

          <p className="text-xs text-gray-600 mt-1">
            📦 <span className="font-semibold text-green-700">FREE delivery</span> by tomorrow
          </p>
          <p className="text-[11px] text-gray-500 mt-0.5">Service item fulfillment by Amazon</p>

          {/* Interactive Dynamic Details Link Button */}
          <Link href={`/product/${id}`} className="block mt-4">
            <button className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] active:border-[#F0C14B] text-black text-xs font-medium py-2 px-4 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer text-center">
              View Product Details
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}