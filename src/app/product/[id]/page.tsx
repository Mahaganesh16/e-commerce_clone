'use client';

import React, { useEffect, useState, use } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer'; // 🌟 Added the new Footer component

type Product = {
  id: number;
  title: string;
  image_url: string;
  price: number;
  section_id: number;
};

type Props = {
  params: Promise<{ id: string }>;
};

// Generate fake star rating based on product id (deterministic)
function getRating(id: number) {
  const ratings = [4.1, 4.2, 4.3, 4.4, 4.5, 3.9, 4.0, 3.8];
  return ratings[id % ratings.length];
}

function getReviewCount(id: number) {
  const counts = [1247, 3891, 581, 2104, 728, 4512, 1893, 347];
  return counts[id % counts.length];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        return (
          <span key={star} className="text-lg leading-none">
            {filled ? (
              <span className="text-[#FFA41C]">★</span>
            ) : half ? (
              <span className="text-[#FFA41C]">⯨</span>
            ) : (
              <span className="text-gray-300">★</span>
            )}
          </span>
        );
      })}
    </div>
  );
}

export default function ProductPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
        setSelectedImage(res.data.image_url);
      } catch (e) {
        console.error("Error loading product data from API context route:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex flex-col justify-between text-black">
        <div>
          <Header />
          <div className="max-w-[1400px] mx-auto p-6 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-100 animate-pulse h-96 rounded" />
              <div className="space-y-4">
                <div className="h-6 bg-gray-100 animate-pulse rounded w-3/4" />
                <div className="h-4 bg-gray-100 animate-pulse rounded w-1/2" />
                <div className="h-8 bg-gray-100 animate-pulse rounded w-1/3" />
              </div>
              <div className="bg-gray-100 animate-pulse h-64 rounded" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-white min-h-screen flex flex-col justify-between text-black">
        <div>
          <Header />
          <div className="max-w-[1400px] mx-auto p-6 text-center mt-20">
            <h2 className="text-2xl font-bold text-gray-700">Product not found</h2>
            <button
              onClick={() => router.back()}
              className="mt-4 text-blue-600 hover:underline cursor-pointer"
            >
              ← Go back
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const rating = getRating(product.id);
  const reviewCount = getReviewCount(product.id);
  const mrp = Math.round(product.price * 1.3);
  const discount = Math.round(((mrp - product.price) / mrp) * 100);
  const savings = mrp - product.price;

  // Populates clean dynamic thumbnails arrays matching the active database source image link
  const thumbnails = [
    product.image_url,
    product.image_url,
    product.image_url,
    product.image_url,
  ];

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="bg-white min-h-screen text-black font-sans flex flex-col justify-between">
      <div>
        <Header />

        {/* Amazon-style Breadcrumbs navigation */}
        <div className="bg-white border-b border-gray-200 py-2 px-4">
          <div className="max-w-[1400px] mx-auto text-xs text-gray-500 flex items-center gap-1">
            <button onClick={() => router.push('/')} className="hover:text-orange-600 hover:underline cursor-pointer">Home</button>
            <span>›</span>
            <button onClick={() => router.back()} className="hover:text-orange-600 hover:underline cursor-pointer">Search Results</button>
            <span>›</span>
            <span className="text-gray-800 line-clamp-1 max-w-[300px]">{product.title}</span>
          </div>
        </div>

        <main className="max-w-[1400px] mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-[340px_1fr_280px] gap-6">

            {/* LEFT: Dynamic Image Selection Gallery */}
            <div>
              {/* Thumbnails Collection list */}
              <div className="flex gap-2 mb-3">
                {thumbnails.map((thumb, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage(thumb)}
                    className={`border-2 rounded cursor-pointer w-14 h-14 flex items-center justify-center p-1 bg-white ${
                      /* 🌟 FIX: Highlight matching border accurately using full image URL equivalency evaluation rule instead of checking array index */
                      selectedImage === thumb
                        ? 'border-orange-500 shadow-xs'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img src={thumb} alt="" className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>

              {/* Main Image Frame Canvas */}
              <div className="border border-gray-200 rounded p-6 flex items-center justify-center bg-white h-80 shadow-xs">
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Action buttons sitting right below the slider image */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-2 rounded-full text-sm font-bold border transition-all cursor-pointer shadow-xs ${
                    addedToCart
                      ? 'bg-green-500 text-white border-green-500'
                      : 'bg-[#FFD814] border-[#FCD200] hover:bg-[#F7CA00] text-black'
                  }`}
                >
                  {addedToCart ? '✓ Added!' : 'Add to Cart'}
                </button>
                <button className="flex-1 py-2 rounded-full text-sm font-bold bg-[#FF9900] text-white border border-[#e88a00] hover:bg-[#e88a00] transition-all cursor-pointer shadow-xs">
                  Buy Now
                </button>
              </div>
            </div>

            {/* CENTER: Core Content Product Details Description specifications */}
            <div className="space-y-3 text-left">
              <h1 className="text-xl font-medium text-gray-900 leading-snug">
                {product.title}
              </h1>

              <p className="text-sm text-blue-600 hover:text-orange-600 cursor-pointer hover:underline inline-block">
                Visit the Brand Store
              </p>

              {/* Interactive Reviews metrics cluster display */}
              <div className="flex items-center gap-2">
                <StarRating rating={rating} />
                <span className="text-sm text-blue-600 hover:text-orange-600 cursor-pointer hover:underline">
                  {rating.toFixed(1)}
                </span>
                <span className="text-sm text-blue-600 hover:text-orange-600 cursor-pointer hover:underline">
                  {reviewCount.toLocaleString()} ratings
                </span>
              </div>

              <div className="text-sm text-gray-500">
                <span className="text-green-700 font-semibold">200+ bought</span> in past month
              </div>

              <hr className="border-gray-200" />

              {/* Pricing breakdown and discount configurations */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-red-600 text-sm font-medium">-{discount}%</span>
                  <span className="text-3xl font-medium">
                    <span className="text-sm align-top font-normal mr-0.5">₹</span>
                    {product.price?.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  M.R.P.: <span className="line-through">₹{mrp.toLocaleString('en-IN')}</span>
                </div>
                <div className="text-sm text-gray-600">
                  You save: <span className="text-red-600 font-medium">₹{savings.toLocaleString('en-IN')} ({discount}%)</span>
                </div>
                <div className="text-xs text-gray-500">Inclusive of all taxes</div>
              </div>

              {/* Promotional Bank offer module component frame */}
              <div className="bg-blue-50 border border-blue-100 rounded p-3 text-sm">
                <span className="font-semibold text-blue-800">Bank Offer:</span>
                <span className="text-gray-700"> Flat INR 1500 with HDFC Bank Credit Card. </span>
                <span className="text-blue-600 hover:underline cursor-pointer">1 offer</span>
              </div>

              <hr className="border-gray-200" />

              {/* Dynamic Technical Specifications table properties mapping row lines */}
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ['Brand', product.title.split(' ')[0]],
                    ['Model', product.title.split(' ').slice(0, 3).join(' ')],
                    ['Colour', 'Silver'],
                    ['Star Rating', '3 Star'],
                    ['Item Weight', '52 kg'],
                    ['Warranty', '1 Year Comprehensive + 5 Years on Compressor'],
                  ].map(([key, val]) => (
                    <tr key={key} className="border-b border-gray-100">
                      <td className="py-2 pr-4 text-gray-500 w-40 align-top">{key}</td>
                      <td className="py-2 text-gray-800 font-medium">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <hr className="border-gray-200" />

              {/* About this item point descriptions layouts */}
              <div>
                <h3 className="font-bold text-gray-900 mb-2">About this item</h3>
                <ul className="text-sm text-gray-700 space-y-1.5 list-disc list-inside pl-1">
                  <li>Energy efficient with 3-star BEE premium framework metrics rating configuration.</li>
                  <li>Frost-free operation engine modules for seamless operational maintenance cycles.</li>
                  <li>Digital inverter compressor architecture built for silent running noise levels.</li>
                  <li>Stabilizer free operation safety protections envelope (100V–300V).</li>
                  <li>Hygienic fresh multi-channel layout keeps interior climate environments pristine.</li>
                </ul>
              </div>
            </div>

            {/* RIGHT: Classic E-Commerce Transactional Buy Box Layer column */}
            <div>
              <div className="border border-gray-300 rounded-lg p-4 space-y-3 sticky top-4 bg-white shadow-xs text-left">
                <div>
                  <span className="text-2xl font-medium">₹{product.price?.toLocaleString('en-IN')}</span>
                  <div className="text-xs text-gray-500 mt-0.5">FREE Delivery</div>
                </div>

                {/* Delivery Date Computations string operations layer */}
                <div className="text-sm text-gray-900">
                  <span className="font-bold text-green-700">FREE delivery </span>
                  <span className="font-medium">
                    {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
                      weekday: 'long', month: 'short', day: 'numeric'
                    })}
                  </span>
                </div>

                <div className="text-sm text-gray-600">
                  Delivering to Madurai 625009.{' '}
                  <button className="text-blue-600 hover:text-orange-600 hover:underline cursor-pointer">
                    Update location
                  </button>
                </div>

                <div className="text-green-700 font-medium text-sm">In Stock</div>

                {/* Dropdown Menu Item Quantities triggers selection mapping */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-600">Qty:</span>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border border-gray-300 rounded bg-gray-50 px-2 py-1 text-sm outline-none cursor-pointer focus:border-orange-500"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>

                {/* Direct Action Buy triggers component configurations */}
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-2 rounded-full text-sm font-bold transition-all cursor-pointer border shadow-sm ${
                    addedToCart
                      ? 'bg-green-500 text-white border-green-500'
                      : 'bg-[#FFD814] border-[#FCD200] hover:bg-[#F7CA00] text-black'
                  }`}
                >
                  {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
                </button>

                <button className="w-full py-2 rounded-full text-sm font-bold bg-[#FF9900] text-white border border-[#e88a00] hover:bg-[#e88a00] transition-all cursor-pointer shadow-sm">
                  Buy Now
                </button>

                <div className="text-xs text-gray-500 text-center flex items-center justify-center gap-1 py-1">
                  <span>🔒</span>
                  <span>Secure transaction</span>
                </div>

                <hr className="border-gray-200" />

                {/* Fulfillment Details parameters row elements listing */}
                <div className="text-xs space-y-1.5 text-gray-600">
                  <div><span className="text-gray-500">Ships from:</span> Amazon</div>
                  <div><span className="text-gray-500">Sold by:</span> {product.title.split(' ')[0]} Official</div>
                  <div><span className="text-gray-500">Returns:</span> Eligible for Return, Refund or Replacement</div>
                </div>

                <button className="w-full py-2 mt-1 rounded-full text-sm border border-gray-300 hover:border-gray-400 text-gray-700 transition-all cursor-pointer bg-white">
                  ♡ Add to Wish List
                </button>
              </div>
            </div>

          </div>

          {/* Customer Reviews Rating distribution grid section frame */}
          <div className="mt-12 border-t border-gray-200 pt-6 text-left">
            <h2 className="text-xl font-bold mb-4">Customer reviews</h2>
            <div className="flex items-start gap-8 mb-6 flex-wrap md:flex-nowrap">
              <div className="text-center md:border-r md:pr-8 border-gray-200">
                <div className="text-5xl font-light text-gray-900">{rating.toFixed(1)}</div>
                <div className="flex justify-center my-1.5">
                  <StarRating rating={rating} />
                </div>
                <div className="text-xs text-gray-500">out of 5 stars</div>
              </div>
              <div className="flex-1 space-y-1.5 max-w-xs w-full">
                {[5, 4, 3, 2, 1].map((star) => {
                  const pct = star === 5 ? 45 : star === 4 ? 32 : star === 3 ? 13 : star === 2 ? 6 : 4;
                  return (
                    <div key={star} className="flex items-center gap-2 text-sm">
                      <span className="text-blue-600 w-12 text-right hover:text-orange-600 cursor-pointer hover:underline">{star} star</span>
                      <div className="flex-1 bg-gray-200 rounded h-3 overflow-hidden">
                        <div className="bg-[#FFA41C] h-3 rounded" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-blue-600 w-8 hover:text-orange-600 cursor-pointer hover:underline">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sample review item lists blocks */}
            <div className="space-y-6 max-w-2xl mt-8">
              {[
                { name: 'Raj Kumar', rating: 5, date: '15 May 2025', text: 'Excellent product! Very energy efficient and functions cleanly. Installation was completely smooth. Highly recommend for the price bracket values.' },
                { name: 'Priya S.', rating: 4, date: '2 April 2025', text: 'Good product build quality overall. Delivery parameters arrived right on time and framework packaging configurations were solid. Works cleanly as expected.' },
                { name: 'Arun M.', rating: 4, date: '10 March 2025', text: 'Complete value for money metrics. Compressor motor array runs extremely quietly and the control interface is very clean to use.' },
              ].map((review, idx) => (
                <div key={idx} className="border-b border-gray-100 pb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600 uppercase select-none">
                      {review.name[0]}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{review.name}</span>
                  </div>
                  <div className="flex mb-1">
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Reviewed in India on {review.date}</p>
                  <p className="text-sm text-gray-700 mt-2 leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>

      {/* 🌟 Mounted the full global Amazon application footer safely at the bottom row container boundary */}
      <Footer />
    </div>
  );
}