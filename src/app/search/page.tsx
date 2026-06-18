// src/app/search/page.tsx
'use client';

import React, { useEffect, useState, Suspense, useRef } from 'react';
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
  const [brands, setBrands] = useState<any[]>([]); 
  const [decorCategories, setDecorCategories] = useState<any[]>([]); 
  const [storageItems, setStorageItems] = useState<any[]>([]); 

  const decorSliderRef = useRef<HTMLDivElement>(null);
  const productSliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const categoryLower = category.toLowerCase();
    
    const isStorageSearch = 
      categoryLower.includes('storage') || 
      categoryLower.includes('lighting') || 
      categoryLower.includes('cushion') ||
      categoryLower.includes('fresh') ||
      categoryLower.includes('jd');

    const productQueryTarget = isStorageSearch ? 'figurines & vases' : category;

    Promise.all([
      axios.get(`/api/products?category=${encodeURIComponent(productQueryTarget)}`).catch(() => ({ data: [] })),
      axios.get('/api/brands').catch(() => ({ data: [] })),
      axios.get('/api/home-decor').catch(() => ({ data: [] })),
      axios.get('/api/home-storage').catch(() => ({ data: [] })) 
    ])
    .then(([resProducts, resBrands, resDecor, resStorage]) => {
      if (Array.isArray(resProducts.data)) setProducts(resProducts.data);
      if (Array.isArray(resBrands.data)) setBrands(resBrands.data);
      if (Array.isArray(resDecor.data)) setDecorCategories(resDecor.data);
      if (Array.isArray(resStorage.data)) setStorageItems(resStorage.data);
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
    });
  }, [category]);

  const scrollSlider = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 400; 
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleCategoryChange = (newCategory: string) => {
    router.push(`/search?category=${encodeURIComponent(newCategory)}`);
  };

  const categoryLower = category.toLowerCase();
  
  const isStorageCategory = 
    categoryLower.includes('storage') || 
    categoryLower.includes('lighting') || 
    categoryLower.includes('cushion') ||
    categoryLower.includes('fresh') ||
    categoryLower.includes('jd');

  const isDecorCategory = 
    categoryLower.includes('decor') || 
    categoryLower.includes('clock') || 
    categoryLower.includes('sticker') ||
    categoryLower.includes('vase') ||
    categoryLower.includes('figuring') ||
    categoryLower.includes('showpiece') ||
    categoryLower.includes('art');

  // Exact card deck matching details mapping data row fields
  const realDetailsMock = [
    { title: "JD FRESH 5 Tier Foldable Shelf Organizer With Wheels", rating: 146, stars: "★★★★☆", price: "2,699", oldPrice: "3,999", off: "76% off" },
    { title: "JD FRESH 5-Tier Extra Large Metal Heavy Duty Rack", rating: 336, stars: "★★★★☆", price: "3,999", oldPrice: "14,282", off: "72% off" },
    { title: "JD FRESH Dish Drying Rack Countertop Kitchen Drainer", rating: 262, stars: "★★★★☆", price: "999", oldPrice: "1,999", off: "50% off" },
    { title: "JD Fresh 3 Tier Plastic Corner Storage Stand Rack", rating: 29, stars: "★★★★☆", price: "1,999", oldPrice: "3,000", off: "35% off" },
    { title: "JD FRESH Metal Foldable Wall Mounted Cloth Drying Stand", rating: 636, stars: "★★★★★", price: "549", oldPrice: "1,199", off: "54% off" },
    { title: "JD FRESH 6-Tier Metal Rotating Vegetable Basket Rack", rating: 468, stars: "★★★★☆", price: "2,999", oldPrice: "3,999", off: "25% off" }
  ];

  const fixedStorageProducts = realDetailsMock.map((mockCard, idx) => {
    const dbRow = storageItems[idx % storageItems.length];
    const imageTarget = dbRow ? dbRow.image_url : "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace";

    return {
      id: dbRow ? dbRow.id : `mock-storage-${idx}`,
      image_url: imageTarget, 
      title: mockCard.title,
      stars: mockCard.stars,
      ratingCount: mockCard.rating,
      price: mockCard.price,
      oldPrice: mockCard.oldPrice,
      discount: mockCard.off
    };
  });

  // 🌟 FIX: Pulls your exact database image links across all arch carousel cards cleanly
  const subCategoryArchItems = [
    { title: "Storage boxes", img: storageItems[2]?.image_url || "https://m.media-amazon.com/images/I/618z+9a-M0L._AC_SX250_.jpg" },
    { title: "Home organizers", img: storageItems[4]?.image_url || "https://m.media-amazon.com/images/I/413F0jhPwNL._AC_SX250_.jpg" },
    { title: "Laundry hampers", img: storageItems[0]?.image_url || "https://m.media-amazon.com/images/I/41lgEICZpOL._AC_SX250_.jpg" },
    { title: "Waste & recycling", img: storageItems[1]?.image_url || "https://m.media-amazon.com/images/I/51TzVOdYPJL._AC_SX250_.jpg" },
    { title: "Collapsible wardrobe", img: storageItems[3]?.image_url || "https://m.media-amazon.com/images/I/41X5OvQTN6L._AC_SX250_.jpg" },
    { title: "Drying racks", img: storageItems[2]?.image_url || "https://m.media-amazon.com/images/I/618z+9a-M0L._AC_SX250_.jpg" },
    { title: "Shoe racks", img: storageItems[4]?.image_url || "https://m.media-amazon.com/images/I/413F0jhPwNL._AC_SX250_.jpg" },
    { title: "Bathroom organizers", img: storageItems[1]?.image_url || "https://m.media-amazon.com/images/I/51TzVOdYPJL._AC_SX250_.jpg" }
  ];

  return (
    <div className="flex-grow max-w-[1500px] w-full mx-auto flex gap-8 select-none text-left">
      
      {/* 1. LEFT SIDEBAR COLUMN */}
      <aside className="w-60 hidden md:block flex-shrink-0 text-left border-r border-gray-200 pr-4">
        {isStorageCategory ? (
          <div className="space-y-4 text-[13px] text-gray-800">
            <div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">&lsaquo; Home & Kitchen</h3>
              <h4 className="font-bold text-gray-900 pl-2 mb-2">Home Storage & Organisation</h4>
              <ul className="pl-4 space-y-1.5 text-xs text-gray-600">
                <li className="hover:text-orange-600 cursor-pointer">Bathroom Accessories & Organization</li>
                <li className="hover:text-orange-600 cursor-pointer">Boxes, Baskets & Bins</li>
                <li className="hover:text-orange-600 cursor-pointer">Clothing & Wardrobe Storage</li>
                <li className="hover:text-orange-600 cursor-pointer">Laundry Organization</li>
                <li className="hover:text-orange-600 cursor-pointer">Racks, Shelves & Drawers</li>
                <li className="hover:text-orange-600 cursor-pointer">Shoe Organization</li>
                <li className="font-bold text-orange-600 cursor-pointer">Storage</li>
                <li className="hover:text-orange-600 cursor-pointer">Utility Shelves</li>
              </ul>
            </div>
            <hr className="border-gray-200" />
            <div>
              <h3 className="font-bold text-gray-900 mb-1.5 text-sm">Amazon Prime</h3>
              <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
                <input type="checkbox" className="rounded-sm border-gray-300 accent-orange-500 w-3.5 h-3.5" defaultChecked />
                <span className="text-[#007185] font-bold text-xs">✓prime</span>
              </label>
            </div>
          </div>
        ) : isDecorCategory ? (
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
                  <li className="hover:text-orange-600 cursor-pointer">Cushions & Cushion Covers</li>
                  <li className="text-orange-600 font-bold cursor-pointer">Decorations & Accent Art</li>
                </ul>
              </ul>
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
        
        {isStorageCategory ? (
          <div className="w-full">
            {/* Top Typography Headings */}
            <div className="mb-5 text-left">
              <h1 className="text-3xl font-medium text-[#E47911] font-sans tracking-tight">
                Buy Home Storage and Organisation Products at Amazon India
              </h1>
              <p className="text-[13px] text-gray-600 mt-1.5 leading-relaxed max-w-5xl">
                Unclutter your entire home with the range of home storage and organisation products that are available at Amazon.in. Shop for <span className="text-[#007185] hover:underline cursor-pointer">box storage, bath accessories, laundry aids, shoe storage, apparel storage, racks, shelves, hooks hangers</span>, and much more by top brands.
              </p>
            </div>

            {/* Subcategory Row (Arch Designs mapped correctly to your 5 links!) */}
            <div className="bg-white py-4 border-b border-gray-200 w-full mb-6 relative group/storecat">
              <h3 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">Category</h3>
              <button onClick={() => scrollSlider(decorSliderRef, 'left')} className="absolute left-0 top-[50%] -translate-y-1/2 z-40 bg-white/95 hover:bg-white border border-gray-300 text-gray-800 w-8 h-14 flex items-center justify-center shadow-md text-xl font-light rounded-r-md">&#8249;</button>
              
              <div ref={decorSliderRef} className="flex overflow-x-auto gap-5 pb-2 scrollbar-none scroll-smooth" style={{ scrollbarWidth: 'none' }}>
                {subCategoryArchItems.map((cat, idx) => (
                  <div key={idx} className="flex-shrink-0 w-[120px] flex flex-col items-center cursor-pointer group">
                    <div className="w-full h-[120px] bg-[#F7F7F7] rounded-t-full border border-gray-200 overflow-hidden flex items-end justify-center p-2">
                      <img src={cat.img} alt={cat.title} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                    </div>
                    <span className="text-[12px] text-center font-medium text-gray-800 mt-2 line-clamp-2 leading-tight group-hover:text-orange-600">
                      {cat.title}
                    </span>
                  </div>
                ))}
              </div>
              <button onClick={() => scrollSlider(decorSliderRef, 'right')} className="absolute right-0 top-[50%] -translate-y-1/2 z-40 bg-white/95 hover:bg-white border border-gray-300 text-gray-800 w-8 h-14 flex items-center justify-center shadow-md text-xl font-light rounded-l-md">&#8250;</button>
            </div>

            {/* Replicated Brown Top Deals Carousel Container Block */}
            <div className="bg-[#4D270C] p-6 border border-[#3D1E08] w-full relative group/brownslider">
              <h2 className="text-xl font-bold text-white mb-4 pl-1 font-sans">Top deals for you</h2>
              
              <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-3 scrollbar-none">
                <div className="bg-white rounded-full px-4 py-1.5 flex items-center justify-center border border-white cursor-pointer shadow-xs"><img src="https://m.media-amazon.com/images/G/31/img15/home/brands/JDFresh._CB620297067_.png" className="h-4 object-contain" alt="JD Fresh" /></div>
                <div className="bg-white/10 rounded-full px-4 py-1.5 flex items-center justify-center border border-white/10 cursor-pointer hover:bg-white/15"><img src="https://m.media-amazon.com/images/G/31/img15/home/brands/Homestrap._CB620297067_.png" className="h-4 object-contain invert opacity-80" alt="Homestrap" /></div>
                <div className="bg-white/10 rounded-full px-4 py-1.5 flex items-center justify-center border border-white/10 cursor-pointer hover:bg-white/15"><img src="https://m.media-amazon.com/images/G/31/img15/home/brands/Kuber._CB620297067_.png" className="h-4 object-contain invert opacity-80" alt="Kuber" /></div>
                <div className="bg-white/10 rounded-full px-4 py-1.5 flex items-center justify-center border border-white/10 cursor-pointer hover:bg-white/15 text-stone-200 text-xs font-bold tracking-wider px-5">BOXJOY</div>
                <div className="bg-white/10 rounded-full px-4 py-1.5 flex items-center justify-center border border-white/10 cursor-pointer hover:bg-white/15 text-stone-200 text-xs font-bold tracking-wider px-5">PRETTY KRAFTS</div>
              </div>

              <button onClick={() => scrollSlider(productSliderRef, 'left')} className="absolute left-1.5 top-[56%] -translate-y-1/2 z-40 bg-white/95 hover:bg-white border border-gray-300 text-gray-800 w-10 h-14 flex items-center justify-center shadow-lg text-2xl font-light rounded-md">&#8249;</button>

              <div ref={productSliderRef} className="flex overflow-x-auto gap-4 pb-3 scrollbar-none scroll-smooth items-stretch" style={{ scrollbarWidth: 'none' }}>
                {fixedStorageProducts.map((item: any) => (
                  <div key={item.id} className="flex-shrink-0 w-[215px] bg-white rounded-md flex flex-col p-3 shadow-md text-left justify-between select-none border border-transparent hover:border-stone-300 transition-all">
                    
                    <div className="h-44 w-full flex items-center justify-center overflow-hidden bg-white mb-3 p-1 rounded-sm">
                      <img src={item.image_url} alt={item.title} className="max-h-full max-w-full object-contain pointer-events-none" />
                    </div>

                    <div className="flex flex-col flex-grow justify-end space-y-1.5 font-sans">
                      <div className="text-center">
                        <span className="text-[10px] uppercase font-extrabold text-gray-400 tracking-wider">JD FRESH</span>
                      </div>
                      
                      <div className="text-left min-h-[34px]">
                        <h4 className="text-[12px] font-bold text-gray-900 leading-tight line-clamp-2">
                          {item.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-0.5 text-xs text-orange-500 justify-start">
                        <span className="tracking-wide text-sm">{item.stars}</span>
                        <span className="text-[#007185] text-[11px] ml-1 font-semibold">({item.ratingCount})</span>
                      </div>

                      <div className="pt-0.5 text-left">
                        <span className="bg-[#B12704] text-white font-extrabold text-[9px] px-2 py-0.5 rounded-sm tracking-wide uppercase">
                          Limited time deal
                        </span>
                      </div>

                      <div className="flex flex-wrap items-baseline gap-1 pt-0.5 justify-start">
                        <span className="text-base font-bold text-gray-900">₹{item.price}</span>
                        <span className="text-[11px] text-gray-400 font-normal line-through ml-0.5">₹{item.oldPrice}</span>
                        <span className="text-[11px] text-[#B12704] font-semibold ml-0.5">({item.discount})</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => scrollSlider(productSliderRef, 'right')} className="absolute right-1.5 top-[56%] -translate-y-1/2 z-40 bg-white/95 hover:bg-white border border-gray-300 text-gray-800 w-10 h-14 flex items-center justify-center shadow-lg text-2xl font-light rounded-md">&#8250;</button>
            </div>
          </div>
        ) : isDecorCategory ? (
          /* VIEW B: HOME DÉCOR DEPARTMENT STOREFRONT LAYOUT */
          <div className="w-full">
            <div className="w-full bg-[#FCE3D4] h-64 rounded-none mb-6 p-10 flex justify-between items-center relative overflow-hidden border border-orange-100">
              <div className="flex flex-col space-y-2 z-10">
                <h1 className="text-5xl font-light text-gray-800 tracking-wide font-serif">Home Décor</h1>
                <p className="text-lg text-gray-700 font-medium pt-1">Get trendy home décor products today!</p>
                <button className="bg-black text-white text-xs font-bold px-5 py-2 rounded-full w-28 mt-4">Shop now</button>
              </div>
              <div className="w-44 h-44 rounded-full bg-stone-800 flex flex-col items-center justify-center text-amber-500 absolute right-12 text-xl font-bold font-mono shadow-md">09:20</div>
            </div>

            {/* Category Slider: Large Square Boxes */}
            <div className="bg-white p-5 border border-gray-200 rounded-none w-full mb-6 relative group/carousel1">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Shop by category</h2>
              <button onClick={() => scrollSlider(decorSliderRef, 'left')} className="absolute left-0 top-[45%] -translate-y-1/2 z-40 bg-white/95 hover:bg-white border border-gray-300 text-gray-800 w-10 h-[100px] flex items-center justify-center shadow-md text-2xl font-light rounded-r-md">&#8249;</button>
              <div ref={decorSliderRef} className="flex overflow-x-auto gap-5 pb-2 scrollbar-none scroll-smooth" style={{ scrollbarWidth: 'none' }}>
                {decorCategories.map((item: any) => (
                  <div key={item.id} onClick={() => handleCategoryChange(item.title)} className="flex-shrink-0 w-[260px] flex flex-col cursor-pointer group">
                    <div className="w-full h-[260px] bg-[#F7F7F7] border border-gray-200 p-4 flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-white to-orange-50/20">
                      <img src={item.image_url} alt={item.title} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="text-left mt-2.5 pl-0.5"><span className="text-[14px] font-bold text-gray-900 group-hover:text-orange-600 transition-colors leading-tight line-clamp-1">{item.title}</span></div>
                  </div>
                ))}
              </div>
              <button onClick={() => scrollSlider(decorSliderRef, 'right')} className="absolute right-0 top-[45%] -translate-y-1/2 z-40 bg-white/95 hover:bg-white border border-gray-300 text-gray-800 w-10 h-[100px] flex items-center justify-center shadow-md text-2xl font-light rounded-l-md">&#8250;</button>
            </div>
          </div>
        ) : (
          /* LAYOUT C: STANDARD FALLBACK RESULTS */
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