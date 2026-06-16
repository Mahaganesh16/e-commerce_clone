'use client';

import React, { useEffect, useState, use } from 'react';
import axios from 'axios';
import Header from '../../components/Header';

type SearchPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  const params = use(searchParams);
  const category = params.category || 'all';
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [category]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/products');
      let matched: any[] = [];
      
      res.data.forEach((section: any) => {
        if (section.items) {
          section.items.forEach((item: any) => {
            const title = (item.title || "").toLowerCase();
            
            // 🌟 STRICT FILTER: இங்க தான் நாம அந்த 'Bathroom Accessories' போன்ற குப்பையை பில்டர் பண்ணுறோம்
            const isFridge = category === 'refrigerator' && (title.includes('refrigerator') || title.includes('fridge'));
            const isAC = category === 'ac' && (title.includes('ac') || title.includes('air'));
            const isTrash = title.includes('bathroom') || title.includes('figurine') || title.includes('storage') || title.includes('lighting');

            if ((isFridge || isAC) && !isTrash) {
              matched.push(item);
            }
          });
        }
      });
      setProducts(matched);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main className="max-w-[1400px] mx-auto p-4">
        <h1 className="text-xl font-bold mb-6 capitalize">{category} Results</h1>
        {loading ? <p>Loading...</p> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {products.map((p) => (
                    <div key={p.id} className="border border-gray-200 p-4 hover:shadow-lg transition-all rounded-sm flex flex-col items-center text-center">
                        <img src={p.image_url} alt={p.title} className="h-48 w-full object-contain mb-4" />
                        <h2 className="text-sm text-gray-800 line-clamp-3 mb-2 flex-grow">{p.title}</h2>
                        <div className="text-xl font-medium mt-auto mb-3">₹{p.price?.toLocaleString()}</div>
                        <button className="bg-[#FFD814] w-full py-2 rounded-full text-xs font-bold border border-orange-300 hover:bg-[#F7CA00]">Add to cart</button>
                    </div>
                ))}
            </div>
        )}
      </main>
    </div>
  );
}