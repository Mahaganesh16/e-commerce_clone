// src/app/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const [cardsData, setCardsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/products')
      .then((response) => {
        setCardsData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Axios product retrieval error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen text-black font-sans">
      <Header />
      
      {/* Main Container Wrapper */}
      <main className="max-w-[1500px] mx-auto pl-4 pr-4 pb-10">
        
        {/* 1. Hero Banner Slider Component */}
        <HeroBanner />

        {/* 2. Overlapping Product Cards Grid Section */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-24 bg-white -mt-56 relative z-30 rounded-xs shadow-sm max-w-[1460px] mx-auto">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500"></div>
          </div>
        ) : (
          /* MAXIMUM OVERLAP FIX: -mt-48, md:-mt-64, lg:-mt-72, xl:-mt-80 coding adhaan cards-ah innum nalla mela thೂக்கி வைக்கும் */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 -mt-44 md:-mt-60 lg:-mt-68 xl:-mt-72 relative z-30 max-w-[1460px] mx-auto pl-1 pr-1">
            {cardsData.map((card) => (
              <ProductCard 
                key={card.id}
                title={card.title}
                items={card.items}
                single_image={card.single_image}
                link_text={card.link_text}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}