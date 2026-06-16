'use client';

import React, { useEffect, useState, use } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Header from '../../../components/Header';

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
  const [pincode, setPincode] = useState('625009');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
        setSelectedImage(res.data.image_url);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
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
    );
  }

  if (!product) {
    return (
      <div className="bg-white min-h-screen">
        <Header />
        <div className="max-w-[1400px] mx-auto p-6 text-center mt-20">
          <h2 className="text-2xl font-bold text-gray-700">Product not found</h2>
          <button
            onClick={() => router.back()}
            className="mt-4 text-blue-600 hover:underline"
          >
            ← Go back
          </button>
        </div>
      </div>
    );
  }

  const rating = getRating(product.id);
  const reviewCount = getReviewCount(product.id);
  const mrp = Math.round(product.price * 1.3);
  const discount = Math.round(((mrp - product.price) / mrp) * 100);
  const savings = mrp - product.price;

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
    <div className="bg-white min-h-screen">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-2 px-4">
        <div className="max-w-[1400px] mx-auto text-xs text-gray-500 flex items-center gap-1">
          <button onClick={() => router.push('/')} className="hover:text-orange-600 hover:underline">Home</button>
          <span>›</span>
          <button onClick={() => router.back()} className="hover:text-orange-600 hover:underline">Search Results</button>
          <span>›</span>
          <span className="text-gray-800 line-clamp-1 max-w-[300px]">{product.title}</span>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[340px_1fr_280px] gap-6">

          {/* LEFT: Image Gallery */}
          <div>
            {/* Thumbnails */}
            <div className="flex gap-2 mb-3">
              {thumbnails.map((thumb, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(thumb)}
                  className={`border-2 rounded cursor-pointer w-14 h-14 flex items-center justify-center p-1 ${
                    selectedImage === thumb && idx === 0
                      ? 'border-orange-400'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img src={thumb} alt="" className="w-full h-full object-contain" />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="border border-gray-200 rounded p-6 flex items-center justify-center bg-white h-80">
              <img
                src={selectedImage}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Action buttons below image */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-2 rounded-full text-sm font-bold border transition-all ${
                  addedToCart
                    ? 'bg-green-500 text-white border-green-500'
                    : 'bg-[#FFD814] border-[#FCD200] hover:bg-[#F7CA00]'
                }`}
              >
                {addedToCart ? '✓ Added!' : 'Add to Cart'}
              </button>
              <button className="flex-1 py-2 rounded-full text-sm font-bold bg-[#FF9900] text-white border border-[#e88a00] hover:bg-[#e88a00] transition-all">
                Buy Now
              </button>
            </div>
          </div>

          {/* CENTER: Product Details */}
          <div className="space-y-3">
            <h1 className="text-xl font-medium text-gray-900 leading-snug">
              {product.title}
            </h1>

            {/* Brand */}
            <p className="text-sm text-blue-600 hover:text-orange-600 cursor-pointer hover:underline">
              Visit the Brand Store
            </p>

            {/* Rating */}
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

            {/* Pricing */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-red-600 text-sm font-medium">-{discount}%</span>
                <span className="text-3xl font-medium">
                  <span className="text-sm align-top">₹</span>
                  {product.price?.toLocaleString()}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                M.R.P.: <span className="line-through">₹{mrp.toLocaleString()}</span>
              </div>
              <div className="text-sm text-gray-600">
                You save: <span className="text-red-600 font-medium">₹{savings.toLocaleString()} ({discount}%)</span>
              </div>
              <div className="text-xs text-gray-500">Inclusive of all taxes</div>
            </div>

            {/* Bank offer */}
            <div className="bg-blue-50 border border-blue-100 rounded p-3 text-sm">
              <span className="font-semibold text-blue-800">Bank Offer:</span>
              <span className="text-gray-700"> Flat INR 1500 with HDFC Bank Credit Card. </span>
              <span className="text-blue-600 hover:underline cursor-pointer">1 offer</span>
            </div>

            <hr className="border-gray-200" />

            {/* Specifications table */}
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
                    <td className="py-2 text-gray-800">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <hr className="border-gray-200" />

            {/* About this item */}
            <div>
              <h3 className="font-bold text-gray-900 mb-2">About this item</h3>
              <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li>Energy efficient with 3-star BEE rating</li>
                <li>Frost-free operation for easy maintenance</li>
                <li>Digital inverter compressor for quiet & efficient performance</li>
                <li>Stabilizer free operation (100V–300V)</li>
                <li>Hygienic fresh air feature circulates clean air</li>
              </ul>
            </div>
          </div>

          {/* RIGHT: Buy Box */}
          <div>
            <div className="border border-gray-300 rounded-lg p-4 space-y-3 sticky top-4">
              {/* Price */}
              <div>
                <span className="text-2xl font-medium">₹{product.price?.toLocaleString()}</span>
                <div className="text-xs text-gray-500 mt-0.5">FREE Delivery</div>
              </div>

              {/* Delivery */}
              <div className="text-sm">
                <span className="font-bold text-gray-900">FREE delivery </span>
                <span className="text-gray-600">
                  {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
                    weekday: 'long', month: 'short', day: 'numeric'
                  })}
                </span>
              </div>

              {/* Pincode */}
              <div className="text-sm text-gray-600">
                Delivering to Madurai 625009.{' '}
                <button className="text-blue-600 hover:text-orange-600 hover:underline">
                  Update location
                </button>
              </div>

              {/* In Stock */}
              <div className="text-green-700 font-medium text-sm">In Stock</div>

              {/* Quantity */}
              <div className="flex items-center gap-2 text-sm">
                <label className="text-gray-600">Qty:</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border border-gray-300 rounded bg-gray-50 px-2 py-1 text-sm"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className={`w-full py-2 rounded-full text-sm font-bold transition-all ${
                  addedToCart
                    ? 'bg-green-500 text-white'
                    : 'bg-[#FFD814] hover:bg-[#F7CA00]'
                }`}
              >
                {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
              </button>

              {/* Buy Now */}
              <button className="w-full py-2 rounded-full text-sm font-bold bg-[#FF9900] text-white hover:bg-[#e88a00] transition-all">
                Buy Now
              </button>

              {/* Secure transaction */}
              <div className="text-xs text-gray-500 text-center flex items-center justify-center gap-1">
                <span>🔒</span>
                <span>Secure transaction</span>
              </div>

              <hr className="border-gray-200" />

              <div className="text-xs space-y-1 text-gray-600">
                <div><span className="font-medium">Ships from</span>: Amazon</div>
                <div><span className="font-medium">Sold by</span>: {product.title.split(' ')[0]} Official</div>
                <div><span className="font-medium">Returns</span>: Eligible for Return, Refund or Replacement</div>
              </div>

              {/* Wishlist */}
              <button className="w-full py-2 rounded-full text-sm border border-gray-300 hover:border-gray-400 transition-all text-gray-700">
                ♡ Add to Wish List
              </button>
            </div>
          </div>

        </div>

        {/* Customer Reviews Section */}
        <div className="mt-10 border-t pt-6">
          <h2 className="text-xl font-bold mb-4">Customer reviews</h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="text-center">
              <div className="text-5xl font-light">{rating.toFixed(1)}</div>
              <StarRating rating={rating} />
              <div className="text-sm text-gray-500 mt-1">out of 5</div>
            </div>
            <div className="flex-1 space-y-1 max-w-xs">
              {[5, 4, 3, 2, 1].map((star) => {
                const pct = star === 5 ? 45 : star === 4 ? 32 : star === 3 ? 13 : star === 2 ? 6 : 4;
                return (
                  <div key={star} className="flex items-center gap-2 text-sm">
                    <span className="text-blue-600 w-8 text-right hover:underline cursor-pointer">{star} star</span>
                    <div className="flex-1 bg-gray-200 rounded h-3">
                      <div className="bg-[#FFA41C] h-3 rounded" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-blue-600 w-8 hover:underline cursor-pointer">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sample reviews */}
          <div className="space-y-6 max-w-2xl">
            {[
              { name: 'Raj Kumar', rating: 5, date: '15 May 2025', text: 'Excellent product! Very energy efficient and cools well. Installation was smooth. Highly recommend for the price.' },
              { name: 'Priya S.', rating: 4, date: '2 April 2025', text: 'Good product overall. Delivery was on time and packaging was solid. Works as expected.' },
              { name: 'Arun M.', rating: 4, date: '10 March 2025', text: 'Value for money. Runs quietly and the digital display is easy to use.' },
            ].map((review, idx) => (
              <div key={idx} className="border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold text-gray-600">
                    {review.name[0]}
                  </div>
                  <span className="text-sm font-medium">{review.name}</span>
                </div>
                <StarRating rating={review.rating} />
                <p className="text-xs text-gray-500 mt-1">Reviewed in India on {review.date}</p>
                <p className="text-sm text-gray-700 mt-2">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}