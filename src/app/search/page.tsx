// src/app/search/page.tsx
'use client';

import React, { useEffect, useState, Suspense, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation'; // 🌟 FIXED: Changed 'navigation' to 'next/navigation'
import axios from 'axios';
import Header from '../../components/Header'; 
import Footer from '../../components/Footer';
import SearchProductCard from '../../components/SearchProductCard';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || '';
  const router = useRouter();
  
  const [products, setProducts] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]); 
  const [decorCategories, setDecorCategories] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);

  const decorSliderRef = useRef<HTMLDivElement>(null);
  const productSliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    
    const categoryLower = category.toLowerCase();
    const isDecorSearch = 
      categoryLower.includes('decor') || 
      categoryLower.includes('clock') || 
      categoryLower.includes('sticker') ||
      categoryLower.includes('vase') ||
      categoryLower.includes('figuring') ||
      categoryLower.includes('showpiece') ||
      categoryLower.includes('art');

    const productQueryTarget = isDecorSearch ? 'figurines & vases' : category;

    Promise.all([
      axios.get(`/api/products?category=${encodeURIComponent(productQueryTarget)}`).catch(() => ({ data: [] })),
      axios.get('/api/brands').catch(() => ({ data: [] })),
      axios.get('/api/home-decor').catch(() => ({ data: [] })) 
    ])
    .then(([resProducts, resBrands, resDecor]) => {
      if (Array.isArray(resProducts.data)) setProducts(resProducts.data);
      if (Array.isArray(resBrands.data)) setBrands(resBrands.data);
      if (Array.isArray(resDecor.data)) setDecorCategories(resDecor.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
      setLoading(false);
    });
  }, [category]);

  const scrollSlider = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 360; 
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleCategoryChange = (newCategory: string) => {
    router.push(`/search?category=${encodeURIComponent(newCategory)}`);
  };

  if (loading) {
    return (
      <div className="w-full p-6 text-left">
        <p className="text-gray-600 animate-pulse text-base">Loading matching search results...</p>
      </div>
    );
  }

  const categoryLower = category.toLowerCase();
  const isCushionCategory = categoryLower.includes('cushion') || categoryLower.includes('furnishing');
  
  const isDecorCategory = 
    categoryLower.includes('decor') || 
    categoryLower.includes('clock') || 
    categoryLower.includes('sticker') ||
    categoryLower.includes('vase') ||
    categoryLower.includes('figuring') ||
    categoryLower.includes('showpiece') ||
    categoryLower.includes('art');

  // Takes the shop by category images and adds them as cards for the showpiece carousel below
  const combinedShowpieceProducts = [
    ...products,
    ...decorCategories.map((cat, index) => ({
      id: `cat-card-showpiece-${index}-${cat.id}`,
      title: cat.title,
      image_url: cat.image_url,
      price: 699 + index * 100 
    }))
  ];

  return (
    <div className="flex-grow max-w-[1500px] w-full mx-auto flex gap-8 select-none text-left">
      
      {/* 1. LEFT SIDEBAR COLUMN */}
      <aside className="w-52 hidden md:block flex-shrink-0 text-left border-r border-gray-200 pr-4">
        {isCushionCategory || isDecorCategory ? (
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
                  <li className={`cursor-pointer ${isCushionCategory ? 'text-orange-600 font-bold' : 'hover:text-orange-600'}`}>Cushions & Cushion Covers</li>
                  <li className={`cursor-pointer ${isDecorCategory ? 'text-orange-600 font-bold' : 'hover:text-orange-600'}`}>Decorations & Accent Art</li>
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

      {/* 2. RIGHT DISPLAY PANEL COLUMN */}
      <div className="flex-grow overflow-hidden">
        {isDecorCategory ? (
          <div className="w-full">
            
            {/* Top Pink Banner */}
            <div className="w-full bg-[#FCE3D4] h-64 rounded-none mb-6 p-10 flex justify-between items-center relative overflow-hidden border border-orange-100">
              <div className="flex flex-col space-y-2 z-10">
                <h1 className="text-5xl font-light text-gray-800 tracking-wide font-serif">Home Décor</h1>
                <p className="text-lg text-gray-700 font-medium pt-1">Get trendy home décor products today!</p>
                <button className="bg-black text-white text-xs font-bold px-5 py-2 rounded-full w-28 mt-4">
                  Shop now
                </button>
              </div>
              <div className="w-44 h-44 rounded-full bg-stone-800 flex flex-col items-center justify-center text-amber-500 absolute right-12 text-xl font-bold font-mono shadow-md">
                09:20
              </div>
            </div>

            {/* CAROUSEL 1: Shop by category */}
            <div className="bg-white p-5 border border-gray-200 rounded-none w-full mb-6 relative group/carousel1">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Shop by category</h2>
              
              <button onClick={() => scrollSlider(decorSliderRef, 'left')} className="absolute left-0 top-[45%] -translate-y-1/2 z-40 bg-white/95 hover:bg-white border border-gray-300 text-gray-800 w-10 h-[100px] flex items-center justify-center shadow-md text-2xl font-light rounded-r-md">&#8249;</button>

              <div ref={decorSliderRef} className="flex overflow-x-auto gap-5 pb-2 scrollbar-none scroll-smooth" style={{ scrollbarWidth: 'none' }}>
                {decorCategories.map((item: any) => (
                  <div key={item.id} onClick={() => handleCategoryChange(item.title)} className="flex-shrink-0 w-[260px] flex flex-col cursor-pointer group">
                    <div className="w-full h-[260px] bg-[#F7F7F7] border border-gray-200 p-4 flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-white to-orange-50/20">
                      <img src={item.image_url} alt={item.title} className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-200 group-hover:scale-102" />
                    </div>
                    <div className="text-left mt-2.5 pl-0.5">
                      <span className="text-[14px] font-bold text-gray-900 group-hover:text-orange-600 transition-colors leading-tight line-clamp-1">
                        {item.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => scrollSlider(decorSliderRef, 'right')} className="absolute right-0 top-[45%] -translate-y-1/2 z-40 bg-white/95 hover:bg-white border border-gray-300 text-gray-800 w-10 h-[100px] flex items-center justify-center shadow-md text-2xl font-light rounded-l-md">&#8250;</button>
            </div>

            {/* CAROUSEL 2: Modern Showpieces for Home décor */}
            <div className="bg-white p-5 border border-gray-200 rounded-none w-full relative group/carousel2">
              <h2 className="text-xl font-bold text-gray-900 mb-5 pl-1">
                Modern Showpieces for Home décor
              </h2>
              
              <button onClick={() => scrollSlider(productSliderRef, 'left')} className="absolute left-0 top-[45%] -translate-y-1/2 z-40 bg-white/95 hover:bg-white border border-gray-300 text-gray-800 w-10 h-[80px] flex items-center justify-center shadow-md text-2xl font-light rounded-r-md">&#8249;</button>

              <div ref={productSliderRef} className="flex overflow-x-auto gap-4 pb-4 scrollbar-none scroll-smooth items-stretch" style={{ scrollbarWidth: 'none' }}>
                {combinedShowpieceProducts.map((item: any, idx: number) => {
                  const brandsMock = ["The Artment", "TIED RIBBONS", "Xtore", "Webelkart", "Xtore"];
                  const ratingCountMock = [42, 21, 823, 10143, 636, 970];
                  
                  return (
                    <div key={item.id} className="flex-shrink-0 w-[220px] bg-white border border-gray-200 flex flex-col p-3 shadow-xs font-sans text-left justify-between">
                      <div className="h-48 w-full flex items-center justify-center overflow-hidden bg-white mb-3">
                        <img src={item.image_url} alt={item.title} className="max-h-full max-w-full object-contain" />
                      </div>

                      <div className="flex flex-col flex-grow justify-end space-y-1.5">
                        <div className="text-left">
                          <h4 className="text-[13px] font-bold text-gray-900 leading-tight line-clamp-2 min-h-[34px]">
                            {item.id.toString().includes('cat-card') ? item.title : `${brandsMock[idx % brandsMock.length]} ${item.title}`}
                          </h4>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-orange-500">
                          <span>★★★★★</span>
                          <span className="text-[#007185] hover:underline text-[11px] cursor-pointer ml-1">({ratingCountMock[idx % ratingCountMock.length]})</span>
                        </div>

                        <div className="pt-0.5">
                          <span className="bg-[#B12704] text-white font-bold text-[10px] px-2 py-0.5 rounded-xs tracking-wide uppercase">
                            Limited time deal
                          </span>
                        </div>

                        <div className="flex items-baseline gap-1.5 pt-0.5">
                          <span className="text-lg font-medium text-gray-900">
                            <span className="text-xs align-top font-normal pr-0.5">₹</span>
                            {item.price ? Math.floor(Number(item.price)) : 499}
                          </span>
                          <span className="text-xs text-gray-500 line-through">
                            ₹{item.price ? Math.floor(Number(item.price) * 2) : 999}
                          </span>
                          <span className="text-xs text-[#B12704] font-medium">(50% off)</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button onClick={() => scrollSlider(productSliderRef, 'right')} className="absolute right-0 top-[45%] -translate-y-1/2 z-40 bg-white/95 hover:bg-white border border-gray-300 text-gray-800 w-10 h-[80px] flex items-center justify-center shadow-md text-2xl font-light rounded-l-md">&#8250;</button>
            </div>

          </div>
        ) : isCushionCategory ? (
          /* LAYOUT B: ORIGINAL HOME FURNISHING SUB-LAYOUTS */
          <div className="w-full">
            <h1 className="text-2xl font-extrabold text-[#E47911] font-sans mb-1 tracking-tight">
              Buy Home Furnishing Products Online at Amazon India
            </h1>
            <p className="text-[13px] text-gray-600 leading-relaxed mb-6 border-b border-gray-100 pb-4">
              Looking to purchase home furnishing products? Amazon India offers you a wide collection of <span className="text-[#007185] hover:underline cursor-pointer">bedroom, bathroom, and kitchen linen, bedding, carpets, cushions, curtains</span> and much more online.
            </p>

            {/* Trends of the season Grid Layout */}
            <div className="w-full mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Trends of the season</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-6">
                {products.map((item: any) => (
                  <div key={item.id} className="flex flex-col items-center justify-between min-h-[220px] group cursor-pointer">
                    <div className="h-44 w-full flex items-center justify-center overflow-hidden bg-transparent">
                      <img src={item.image_url} alt={item.title} className="max-h-full max-w-full object-contain pointer-events-none" />
                    </div>
                    <div className="text-center mt-2">
                      <span className="text-[13px] font-normal text-[#007185] group-hover:text-orange-600 group-hover:underline">Shop now</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-gray-200 my-6" />

            {/* Best of furnishing brands Grid Layout */}
            <div className="w-full mb-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Best of furnishing brands</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-6">
                {brands.map((brand: any) => (
                  <div key={brand.id} className="flex flex-col items-center justify-between min-h-[160px] group cursor-pointer">
                    <div className="h-28 w-full flex items-center justify-center overflow-hidden bg-transparent">
                      <img src={brand.image_url} alt={brand.name} className="max-h-full max-w-full object-contain pointer-events-none" />
                    </div>
                    <div className="text-center mt-2">
                      <span className="text-[13px] font-normal text-[#007185] group-hover:text-orange-600 group-hover:underline">Shop now</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* LAYOUT C: STANDARD FALLBACK SEARCH RESULT LIST CARDS */
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