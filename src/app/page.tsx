// src/app/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import ProductCarousel from '../components/ProductCarousel'; 
import Footer from '../components/Footer';

export default function HomePage() {
  const [cardsData, setCardsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/products')
      .then((response) => {
        const dbProducts = response.data;

        if (Array.isArray(dbProducts) && dbProducts.length > 0) {
          
          // 🌟 FIXED SCANNER: Uses strict word boundaries so appliance keywords never match cushion covers
          const findProductImg = (keywords: string[], defaultFallback: string) => {
            const match = dbProducts.find((p: any) => {
              const titleLower = p.title?.toLowerCase() || '';
              const urlLower = p.image_url?.toLowerCase() || '';

              return keywords.some(k => {
                // If checking short keywords like 'ac' or 'air', enforce a strict whole-word check
                if (k === 'ac' || k === 'air') {
                  const regex = new RegExp(`\\b${k}\\b`);
                  return regex.test(titleLower) || regex.test(urlLower);
                }
                
                // General exclusions to prevent appliance keywords from matching layout categories
                if (k === 'refrigerator' || k === 'fridge') {
                  return titleLower.includes(k) && !titleLower.includes('cushion');
                }

                return titleLower.includes(k) || urlLower.includes(k);
              });
            });
            return match ? match.image_url : defaultFallback;
          };

          const finalAmazonLayout = [
            // ==================== ROW 1 ====================
            {
              id: 4, 
              title: "Up to 75% off | Deals on headphones",
              link_text: "See choices",
              items: null,
              single_image: findProductImg(['headphone', 'earphone'], 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e')
            },
            {
              id: 1, 
              title: "Appliances for your home | Up to 55% off",
              link_text: "See more",
              items: [
                { title: "Air conditioners", image_url: findProductImg(['air', 'ac'], 'https://m.media-amazon.com/images/I/51fM8WqH08L._AC_SY135_.jpg') },
                { title: "Refrigerators", image_url: findProductImg(['refrigerator', 'fridge'], 'https://m.media-amazon.com/images/I/61RMvYIuFwL._AC_SY135_.jpg') },
                { title: "Microwaves", image_url: findProductImg(['microwave', 'oven'], 'https://m.media-amazon.com/images/I/61gHu9NWDmL._AC_UL480_FMwebp_QL65_.jpg') },
                { title: "Washing machines", image_url: findProductImg(['washing', 'washer'], 'https://m.media-amazon.com/images/I/61uEcBobubL._AC_SY135_.jpg') }
              ]
            },
            {
              id: 2, 
              title: "Revamp your home in style",
              link_text: "Explore all",
              items: [
                { title: "Cushion covers", image_url: findProductImg(['cushion'], 'https://m.media-amazon.com/images/I/41r8wX7E-GL._AC_SY135_.jpg') },
                { title: "Figurines & vases", image_url: findProductImg(['figuring', 'vase'], 'https://m.media-amazon.com/images/I/61NcmhH869L._AC_SY135_.jpg') },
                { title: "Home storage", image_url: findProductImg(['storage'], 'https://m.media-amazon.com/images/I/719S1143abL._AC_SY135_.jpg') },
                { title: "Lighting solutions", image_url: findProductImg(['lighting', 'lamp'], 'https://m.media-amazon.com/images/I/61r-7e4a9C7._AC_SY135_.jpg') }
              ]
            },
            {
              id: 3, 
              title: "Starting ₹49 | Deals on home essentials",
              link_text: "Explore all",
              items: [
                { title: "Cleaning supplies", image_url: findProductImg(['cleaning', 'cleaner'], 'https://m.media-amazon.com/images/I/71erHCKJ3WL._AC_SY170_.jpg') },
                { title: "Bathroom accessories", image_url: findProductImg(['bathroom'], 'https://m.media-amazon.com/images/I/71775fRr+gL._AC_SY170_.jpg') },
                { title: "Home tools", image_url: findProductImg(['tool'], 'https://m.media-amazon.com/images/I/71fFKeHHo7L._AC_SY145_.jpg') },
                { title: "Wallpapers", image_url: findProductImg(['wallpaper'], 'https://m.media-amazon.com/images/I/81XlIoVdx2L._AC_SY145_.jpg') }
              ]
            },

            // ==================== ROW 2 ====================
            {
              id: 5,
              title: "Customers' Most-Loved Fashion for you",
              link_text: "Explore more",
              items: [
                { title: "Running Shoes", image_url: findProductImg(['sneakers', 'running'], 'https://images.unsplash.com/photo-1542291026-7eec264c27ff') },
                { title: "Women Apparel", image_url: findProductImg(['irmrn', 't-shirt', 'apparel'], 'https://m.media-amazon.com/images/I/61irmRn+6LL._AC_SY145_.jpg') },
                { title: "Kids Wear", image_url: findProductImg(['ffkeh', 'kids', 'ethnic'], 'https://m.media-amazon.com/images/I/71fFKeHHo7L._AC_SY145_.jpg') },
                { title: "Athletic Footwear", image_url: findProductImg(['xlioV', 'grey', 'athletic'], 'https://m.media-amazon.com/images/I/81XlIoVdx2L._AC_SY145_.jpg') }
              ]
            },
            {
              id: 6,
              title: "Best Sellers in Beauty",
              link_text: "See all offers",
              items: [
                { title: "Soap Pack", image_url: findProductImg(['rgtfl', 'soap', 'bars'], 'https://m.media-amazon.com/images/I/718F+0RgtfL._AC_SY170_.jpg') },
                { title: "Face Wash", image_url: findProductImg(['gel', 'wash'], 'https://images.unsplash.com/photo-1556228720-195a672e8a03') },
                { title: "Skin Cleanser", image_url: findProductImg(['cleanser', 'moisturizing'], 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be') },
                { title: "Facial Serums", image_url: findProductImg(['serums', 'protection'], 'https://images.unsplash.com/photo-1608248597481-496100c80836') }
              ]
            },
            {
              id: 7,
              title: "Best Sellers in Home & Kitchen",
              link_text: "Shop now",
              items: [
                { title: "Garbage Bags", image_url: findProductImg(['erhck', 'garbage', 'disposal'], 'https://m.media-amazon.com/images/I/71erHCKJ3WL._AC_SY170_.jpg') },
                { title: "Kitchen Scales", image_url: findProductImg(['fRr+gL', 'weight', 'scale'], 'https://m.media-amazon.com/images/I/71775fRr+gL._AC_SY170_.jpg') },
                { title: "Water Bottles", image_url: findProductImg(['insulated', 'bottle'], 'https://images.unsplash.com/photo-1602143407151-7111542de6e8') },
                { title: "Utensils Set", image_url: findProductImg(['cioa7', 'utensils', 'silver'], 'https://m.media-amazon.com/images/I/71rCioa7fGL._AC_UL480_FMwebp_QL65_.jpg') }
              ]
            },
            {
              id: 8,
              title: "Min.30% off | Top selections from Small Businesses",
              link_text: "See all details",
              items: null,
              single_image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36"
            }
          ];

          setCardsData(finalAmazonLayout);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Axios database fetch error on home page:", err);
        setLoading(false);
      });
  }, []);

  const layoutSpacingClasses = "-mt-44 md:-mt-60 lg:-mt-68 xl:-mt-72 max-w-[1460px] mx-auto px-4 relative z-30 w-full space-y-6";

  return (
    <div className="bg-gray-100 min-h-screen text-black font-sans flex flex-col justify-between">
      <Header />
      
      <main className="max-w-[1500px] mx-auto pb-10 flex-grow w-full">
        <HeroBanner />

        {loading ? (
          <div className={`${layoutSpacingClasses} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5`}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-5 h-[420px] animate-pulse rounded-none shadow-sm" />
            ))}
          </div>
        ) : (
          <div className={layoutSpacingClasses}>
            
            {/* 1. TOP CARDS ROW GRID (Slice first 4 elements) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {cardsData.slice(0, 4).map((card: any) => (
                <ProductCard 
                  key={card.id}
                  title={card.title}
                  items={card.items}
                  single_image={card.single_image}
                  link_text={card.link_text}
                />
              ))}
            </div>

            {/* 2. MID-PAGE HORIZONTAL PRODUCT SCROLL SLIDER CAROUSEL */}
            <ProductCarousel 
              title="Up to 45% off | Electronics & accessories"
              link_text="See all offers"
              items={[
                { title: "Stainless Steel Garbage Disposal Bags", image_url: "https://m.media-amazon.com/images/I/71erHCKJ3WL._AC_SY170_.jpg" },
                { title: "Microwaves", image_url: "https://m.media-amazon.com/images/I/61gHu9NWDmL._AC_UL480_FMwebp_QL65_.jpg" },
                { title: "Kitchen scales", image_url: "https://m.media-amazon.com/images/I/71775fRr+gL._AC_SY170_.jpg" },
                { title: "Kids wear", image_url: "https://m.media-amazon.com/images/I/71fFKeHHo7L._AC_SY145_.jpg" },
                { title: "Washing machines", image_url: "https://m.media-amazon.com/images/I/71YPrbc018L._AC_UL480_FMwebp_QL65_.jpg" }
              ]}
            />

            {/* 3. BOTTOM CARDS ROW GRID (Slice remaining 4 elements) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pt-2">
              {cardsData.slice(4, 8).map((card: any) => (
                <ProductCard 
                  key={card.id}
                  title={card.title}
                  items={card.items}
                  single_image={card.single_image}
                  link_text={card.link_text}
                />
              ))}
            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}