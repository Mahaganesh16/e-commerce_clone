// src/app/search/page.tsx
'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SearchProductCard from '../../components/SearchProductCard';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || '';
  const router = useRouter();
  
  const [products, setProducts] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]); // 🌟 Dynamic state for database brands
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // Concurrently fetch both products and brand logos from the database
    Promise.all([
      axios.get(`/api/products?category=${category}`).catch(() => ({ data: [] })),
      axios.get('/api/brands').catch(() => ({ data: [] }))
    ])
    .then(([resProducts, resBrands]) => {
      if (Array.isArray(resProducts.data)) setProducts(resProducts.data);
      if (Array.isArray(resBrands.data)) setBrands(resBrands.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
      setLoading(false);
    });
  }, [category]);

  const handleCategoryChange = (newCategory: string) => {
    router.push(`/search?category=${newCategory}`);
  };

  if (loading) {
    return (
      <div className="w-full p-6 text-left">
        <p className="text-gray-600 animate-pulse text-base">Loading matching search results...</p>
      </div>
    );
  }

  const isCushionCategory = category.toLowerCase().includes('cushion') || category.toLowerCase().includes('furnishing');

  return (
    <div className="flex-grow max-w-[1500px] w-full mx-auto flex gap-8 select-none text-left">
      
      {/* 1. LEFT SIDEBAR COLUMN (Kept completely original without modifications) */}
      <aside className="w-52 hidden md:block flex-shrink-0 text-left border-r border-gray-200 pr-4">
        {isCushionCategory ? (
          <div className="space-y-5 text-[13px]">
            <div>
              <h3 className="font-bold text-gray-900 mb-1 text-sm">Category</h3>
              <ul className="space-y-1 text-gray-800">
                <li className="font-medium cursor-pointer hover:text-orange-600">&lsaquo; Home & Kitchen</li>
                <li className="font-semibold pl-2 text-gray-900">Home Furnishing</li>
                <ul className="pl-4 space-y-1 text-gray-600 text-xs">
                  <li className="hover:text-orange-600 cursor-pointer">Bathroom Linen</li>
                  <li className="hover:text-orange-600 cursor-pointer">Bedding & Linen</li>
                  <li className="hover:text-orange-600 cursor-pointer">Carpets & Rugs</li>
                  <li className="hover:text-orange-600 cursor-pointer">Curtains & Accessories</li>
                  <li className="text-orange-600 font-bold cursor-pointer">Cushions & Cushion Covers</li>
                  <li className="hover:text-orange-600 cursor-pointer">Diwan Cover Sets</li>
                  <li className="hover:text-orange-600 cursor-pointer">Fabric</li>
                  <li className="hover:text-orange-600 cursor-pointer">Inflatable Beds, Pillows & Accessories</li>
                  <li className="hover:text-orange-600 cursor-pointer">Kitchen Linens</li>
                  <li className="hover:text-orange-600 cursor-pointer">Slipcovers</li>
                </ul>
              </ul>
            </div>
            <hr className="border-gray-200" />
            <div>
              <h3 className="font-bold text-gray-900 mb-1.5 text-sm">Amazon Prime</h3>
              <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700 hover:text-orange-600">
                <input type="checkbox" className="rounded-sm border-gray-300 accent-orange-500 w-3.5 h-3.5" defaultChecked />
                <span className="text-[#007185] font-bold text-xs">✓prime</span>
              </label>
            </div>
            <hr className="border-gray-200" />
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-sm">Delivery Day</h3>
              <div className="space-y-2 text-xs font-medium text-gray-700">
                <label className="flex items-center gap-2 cursor-pointer hover:text-orange-600">
                  <input type="checkbox" className="rounded-sm border-gray-300 accent-orange-500 w-3.5 h-3.5" />
                  <span>Get It Today</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-orange-600">
                  <input type="checkbox" className="rounded-sm border-gray-300 accent-orange-500 w-3.5 h-3.5" />
                  <span>Get It by Tomorrow</span>
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-[13px]">
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-900 mb-2">Department</h3>
              <ul className="space-y-1.5 text-xs text-gray-700">
                <li onClick={() => handleCategoryChange('ac')} className="hover:text-orange-600 cursor-pointer transition-colors">&lsaquo; Air Conditioners</li>
                <li onClick={() => handleCategoryChange('washing')} className="hover:text-orange-600 cursor-pointer transition-colors">&lsaquo; Washing Machines</li>
                <li onClick={() => handleCategoryChange('refrigerator')} className="hover:text-orange-600 cursor-pointer transition-colors">&lsaquo; Refrigerators</li>
              </ul>
            </div>
          </div>
        )}
      </aside>

      {/* 2. RIGHT DISPLAY COLUMN (Refined to minimal raw display) */}
      <div className="flex-grow">
        {isCushionCategory ? (
          <div className="w-full">
            <h1 className="text-2xl font-extrabold text-[#E47911] font-sans mb-1 tracking-tight">
              Buy Home Furnishing Products Online at Amazon India
            </h1>
            <p className="text-[13px] text-gray-600 leading-relaxed mb-6 border-b border-gray-100 pb-4">
              Looking to purchase home furnishing products? Amazon India offers you a wide collection of <span className="text-[#007185] hover:underline cursor-pointer">bedroom, bathroom, and kitchen linen, bedding, carpets, cushions, curtains</span> and much more online.
            </p>

            {/* 🖼️ Seasonal Trends Minimal Grid Layout */}
            <div className="w-full mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Trends of the season
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-6">
                {products.map((item: any) => (
                  <div key={item.id} className="flex flex-col items-center justify-between min-h-[220px] group cursor-pointer">
                    {/* Raw Clean Image Viewer */}
                    <div className="h-44 w-full flex items-center justify-center overflow-hidden bg-transparent">
                      <img src={item.image_url} alt={item.title} className="max-h-full max-w-full object-contain pointer-events-none" />
                    </div>
                    {/* Action Text */}
                    <div className="text-center mt-2">
                      <span className="text-[13px] font-normal text-[#007185] group-hover:text-orange-600 group-hover:underline">
                        Shop now
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-gray-200 my-6" />

            {/* 🖼️ Best of Furnishing Brands Minimal Grid Layout */}
            <div className="w-full mb-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Best of furnishing brands
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-6">
                {brands.map((brand: any) => (
                  <div key={brand.id} className="flex flex-col items-center justify-between min-h-[160px] group cursor-pointer">
                    {/* Raw Clean Brand Logo Image Viewer */}
                    <div className="h-28 w-full flex items-center justify-center overflow-hidden bg-transparent">
                      <img src={brand.image_url} alt={brand.name} className="max-h-full max-w-full object-contain pointer-events-none" />
                    </div>
                    {/* Action Text */}
                    <div className="text-center mt-2">
                      <span className="text-[13px] font-normal text-[#007185] group-hover:text-orange-600 group-hover:underline">
                        Shop now
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* Default category template fallback layout */
          <div className="w-full">
            <h1 className="text-xl font-bold text-gray-900 mb-1">Results</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((item: any) => (
                <SearchProductCard key={item.id} id={item.id} title={item.title} image_url={item.image_url} price={item.price ? Number(item.price) : 0} />
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="bg-white min-h-screen text-black font-sans flex flex-col justify-between">
      <Header />
      <div className="flex-grow max-w-[1500px] w-full mx-auto px-4 py-4 flex flex-col justify-between" suppressHydrationWarning>
        <Suspense fallback={<div className="w-full p-6 text-left"><p className="text-gray-600 animate-pulse">Loading search results track...</p></div>}>
          <SearchResultsContent />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}