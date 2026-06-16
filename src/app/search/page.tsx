// 'use client';

// import React, { useEffect, useState, use } from 'react';
// import axios from 'axios';
// import Header from '../../components/Header';

// type SearchPageProps = {
//   searchParams: Promise<{ category?: string }>;
// };

// export default function SearchPage({ searchParams }: SearchPageProps) {
//   const params = use(searchParams);
//   const category = params.category || 'all';
//   const [products, setProducts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadProducts();
//   }, [category]);

//   const loadProducts = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get('/api/products');
//       let matched: any[] = [];
      
//       res.data.forEach((section: any) => {
//         if (section.items) {
//           section.items.forEach((item: any) => {
//             const title = (item.title || "").toLowerCase();
            
//             // 🌟 STRICT FILTER: இங்க தான் நாம அந்த 'Bathroom Accessories' போன்ற குப்பையை பில்டர் பண்ணுறோம்
//             const isFridge = category === 'refrigerator' && (title.includes('refrigerator') || title.includes('fridge'));
//             const isAC = category === 'ac' && (title.includes('ac') || title.includes('air'));
//             const isTrash = title.includes('bathroom') || title.includes('figurine') || title.includes('storage') || title.includes('lighting');

//             if ((isFridge || isAC) && !isTrash) {
//               matched.push(item);
//             }
//           });
//         }
//       });
//       setProducts(matched);
//     } catch (e) { console.error(e); }
//     finally { setLoading(false); }
//   };

//   return (
//     <div className="bg-white min-h-screen">
//       <Header />
//       <main className="max-w-[1400px] mx-auto p-4">
//         <h1 className="text-xl font-bold mb-6 capitalize">{category} Results</h1>
//         {loading ? <p>Loading...</p> : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//                 {products.map((p) => (
//                     <div key={p.id} className="border border-gray-200 p-4 hover:shadow-lg transition-all rounded-sm flex flex-col items-center text-center">
//                         <img src={p.image_url} alt={p.title} className="h-48 w-full object-contain mb-4" />
//                         <h2 className="text-sm text-gray-800 line-clamp-3 mb-2 flex-grow">{p.title}</h2>
//                         <div className="text-xl font-medium mt-auto mb-3">₹{p.price?.toLocaleString()}</div>
//                         <button className="bg-[#FFD814] w-full py-2 rounded-full text-xs font-bold border border-orange-300 hover:bg-[#F7CA00]">Add to cart</button>
//                     </div>
//                 ))}
//             </div>
//         )}
//       </main>
//     </div>
//   );
// }


'use client';

import React, { useEffect, useState, use } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';

type Product = {
  id: number;
  title: string;
  image_url: string;
  price?: number;
  mrp?: number;
  rating?: number;
  review_count?: number;
  section_id?: number;
};

type SearchPageProps = {
  searchParams: Promise<{ category?: string }>;
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} className={`w-3.5 h-3.5 ${rating >= s ? 'text-[#FFA41C]' : rating >= s - 0.5 ? 'text-[#FFA41C]' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const params = use(searchParams);
  const category = params.category || 'all';
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => { loadProducts(); }, [category]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/products');
      let matched: Product[] = [];

      res.data.forEach((section: any) => {
        if (section.items) {
          section.items.forEach((item: any) => {
            const title = (item.title || '').toLowerCase();
            const isFridge = category === 'refrigerator' && (title.includes('refrigerator') || title.includes('fridge'));
            const isAC = category === 'ac' && (title.includes('ac') || title.includes('air conditioner') || title.includes('split ac') || title.includes('inverter ac'));
            const isWashing = category === 'washing' && (title.includes('washing') || title.includes('washer'));
            const isMicrowave = category === 'microwave' && (title.includes('microwave') || title.includes('oven'));
            const isAll = category === 'all';
            const isTrash = title.includes('bathroom') || title.includes('figurine') || title.includes('lighting');

            if ((isFridge || isAC || isWashing || isMicrowave || isAll) && !isTrash) {
              matched.push(item);
            }
          });
        }
      });
      setProducts(matched);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Generate deterministic fake data for missing fields
  const getPrice = (p: Product) => {
    if (p.price && p.price > 0) return p.price;
    const prices = [7990, 34990, 64990, 62990, 83990, 45990, 28990, 52990];
    return prices[p.id % prices.length];
  };

  const getMrp = (price: number) => Math.round(price * 1.25);
  const getDiscount = (price: number, mrp: number) => Math.round(((mrp - price) / mrp) * 100);
  const getRating = (p: Product) => {
    if (p.rating && p.rating > 0) return p.rating;
    const r = [4.1, 4.2, 4.3, 4.4, 4.5, 3.9, 4.0, 3.8];
    return r[p.id % r.length];
  };
  const getReviews = (p: Product) => {
    if (p.review_count && p.review_count > 0) return p.review_count;
    const c = [1247, 3891, 581, 2104, 728, 4512, 1893, 347];
    return c[p.id % c.length];
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-low') return getPrice(a) - getPrice(b);
    if (sortBy === 'price-high') return getPrice(b) - getPrice(a);
    if (sortBy === 'rating') return getRating(b) - getRating(a);
    return 0;
  });

  const categoryLabel: Record<string, string> = {
    ac: 'Air Conditioners',
    refrigerator: 'Refrigerators',
    washing: 'Washing Machines',
    microwave: 'Microwave Ovens',
    all: 'All Products',
  };

  return (
    <div className="bg-[#EAEDED] min-h-screen">
      <Header />

      <div className="max-w-[1500px] mx-auto flex gap-4 p-4">

        {/* LEFT SIDEBAR */}
        <aside className="w-60 shrink-0 hidden lg:block">
          <div className="bg-white p-4 rounded shadow-sm mb-3">
            <h3 className="font-bold text-gray-900 text-base mb-3">Department</h3>
            <ul className="text-sm space-y-1">
              {Object.entries(categoryLabel).map(([key, label]) => (
                <li key={key}>
                  <button
                    onClick={() => router.push(`/search?category=${key}`)}
                    className={`text-left w-full hover:text-orange-600 ${category === key ? 'font-bold text-gray-900' : 'text-blue-700'}`}
                  >
                    {category === key && '‹ '}{label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-4 rounded shadow-sm mb-3">
            <h3 className="font-bold text-gray-900 text-sm mb-2 border-b pb-1">Brands</h3>
            <ul className="text-sm space-y-1.5 text-gray-700">
              {['Samsung', 'LG', 'Voltas', 'Haier', 'Godrej', 'Daikin', 'Whirlpool'].map(b => (
                <li key={b} className="flex items-center gap-2 cursor-pointer hover:text-orange-600">
                  <input type="checkbox" className="accent-orange-500" /> {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-4 rounded shadow-sm mb-3">
            <h3 className="font-bold text-gray-900 text-sm mb-2 border-b pb-1">Customer Reviews</h3>
            {[4, 3, 2, 1].map(r => (
              <div key={r} className="flex items-center gap-1 cursor-pointer hover:text-orange-600 mb-1">
                <StarRating rating={r} />
                <span className="text-sm text-blue-700 hover:text-orange-600">& Up</span>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 rounded shadow-sm">
            <h3 className="font-bold text-gray-900 text-sm mb-2 border-b pb-1">Delivery</h3>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="accent-orange-500" />
              <span>Free Delivery</span>
            </label>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1">
          {/* Top bar */}
          <div className="bg-white px-4 py-2.5 rounded shadow-sm mb-3 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {loading ? 'Loading...' : (
                <>
                  <span className="text-gray-500">1-{sortedProducts.length} of </span>
                  <span className="font-medium">{sortedProducts.length} results</span>
                  {' '}for{' '}
                  <span className="font-bold text-gray-900">"{categoryLabel[category] || category}"</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-sm bg-white focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Avg. Customer Review</option>
              </select>
            </div>
          </div>

          {/* Product list */}
          {loading ? (
            <div className="space-y-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="bg-white rounded shadow-sm p-4 flex gap-4 animate-pulse">
                  <div className="w-48 h-48 bg-gray-200 rounded shrink-0" />
                  <div className="flex-1 space-y-3 pt-2">
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                    <div className="h-6 bg-gray-200 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="bg-white rounded shadow-sm p-10 text-center">
              <p className="text-xl font-medium text-gray-700">No results for "{category}"</p>
              <p className="text-sm text-gray-500 mt-2">Try a different category from the sidebar.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedProducts.map((p) => {
                const price = getPrice(p);
                const mrp = getMrp(price);
                const discount = getDiscount(price, mrp);
                const rating = getRating(p);
                const reviews = getReviews(p);

                return (
                  <div
                    key={p.id ?? Math.random()}
                    onClick={() => p.id && router.push(`/product/${p.id}`)}
                    className="bg-white rounded shadow-sm hover:shadow-md transition-shadow cursor-pointer flex gap-5 p-4 group"
                  >
                    {/* Image */}
                    <div className="w-48 h-48 shrink-0 flex items-center justify-center bg-white border border-gray-100 rounded overflow-hidden">
                      <img
                        src={p.image_url}
                        alt={p.title}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/ac/ac1.webp'; }}
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 py-1">
                      <h2 className="text-[#0F1111] text-base font-medium group-hover:text-[#C7511F] line-clamp-2 mb-1">
                        {p.title}
                      </h2>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-2">
                        <StarRating rating={rating} />
                        <span className="text-sm text-[#007185] hover:text-orange-600">
                          {rating.toFixed(1)}
                        </span>
                        <span className="text-sm text-[#007185] hover:text-orange-600">
                          {reviews.toLocaleString()} ratings
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-sm text-red-600 font-medium">-{discount}%</span>
                        <span className="text-2xl font-medium text-[#0F1111]">
                          <span className="text-sm align-top">₹</span>
                          {price.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mb-2">
                        M.R.P.:{' '}
                        <span className="line-through">₹{mrp.toLocaleString()}</span>
                      </div>

                      {/* Badges */}
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-xs bg-red-600 text-white px-1.5 py-0.5 rounded font-medium">Limited time deal</span>
                        <span className="text-xs text-green-700 font-medium">FREE Delivery</span>
                        <span className="text-xs text-gray-600">200+ bought in past month</span>
                      </div>

                      {/* Delivery */}
                      <div className="text-sm text-gray-700 mb-3">
                        Get it by{' '}
                        <span className="font-semibold">
                          {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </span>
                        {' '}if ordered in next{' '}
                        <span className="text-green-700 font-medium">12 hrs</span>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={e => { e.stopPropagation(); }}
                          className="bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-[#0F1111] text-sm font-medium px-5 py-1.5 rounded-full transition-colors"
                        >
                          Add to cart
                        </button>
                        <button
                          onClick={e => { e.stopPropagation(); }}
                          className="bg-[#FF9900] hover:bg-[#FA8900] border border-[#e88a00] text-white text-sm font-medium px-5 py-1.5 rounded-full transition-colors"
                        >
                          Buy now
                        </button>
                      </div>
                    </div>

                    {/* Right side price box (Amazon style) */}
                    <div className="w-52 shrink-0 border border-gray-200 rounded p-3 text-sm space-y-1 self-start hidden xl:block">
                      <div className="text-xl font-medium">₹{price.toLocaleString()}</div>
                      <div className="text-green-700 font-medium text-xs">FREE Delivery</div>
                      <div className="text-xs text-gray-600">
                        Deliver to Madurai - 625009
                      </div>
                      <div className="text-green-700 font-semibold text-sm">In Stock</div>
                      <button
                        onClick={e => { e.stopPropagation(); }}
                        className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-xs font-bold py-1.5 rounded-full mt-1 border border-[#FCD200]"
                      >
                        Add to cart
                      </button>
                      <button
                        onClick={e => { e.stopPropagation(); }}
                        className="w-full bg-[#FF9900] hover:bg-[#FA8900] text-white text-xs font-bold py-1.5 rounded-full border border-[#e88a00]"
                      >
                        Buy now
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}