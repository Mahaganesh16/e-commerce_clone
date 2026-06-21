'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

type CartItem = {
  id: number;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
};

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCartItems = async () => {
    try {
      const res = await axios.get('/api/cart');
      setCartItems(res.data);
    } catch (err) {
      console.error('Error fetching cart items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleQuantityChange = async (id: number, newQuantity: number) => {
    try {
      await axios.put(`/api/cart/${id}`, { quantity: newQuantity });
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
      );
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen text-black">
        <Header />
        <div className="max-w-[1500px] mx-auto p-4 mt-4 animate-pulse">
          <div className="h-64 bg-white rounded shadow-sm"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#EAEDED] min-h-screen text-black font-sans flex flex-col justify-between">
      <div>
        <Header />

        <main className="max-w-[1500px] mx-auto p-4 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start mt-4">
          
          {/* Left Column: Cart Items List */}
          <div className="bg-white p-6 pt-4 pb-2">
            <div className="flex justify-between items-end border-b border-gray-200 pb-2 mb-4">
              <h1 className="text-3xl font-normal text-gray-900">Shopping Cart</h1>
              <span className="text-sm text-gray-500 font-medium">Price</span>
            </div>

            {cartItems.length === 0 ? (
              <div className="py-8 text-center">
                <h2 className="text-xl font-medium mb-4">Your Amazon Cart is empty.</h2>
                <button 
                  onClick={() => router.push('/')}
                  className="text-blue-600 hover:text-orange-600 hover:underline cursor-pointer"
                >
                  Continue shopping
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-gray-200 pb-4">
                    {/* Item Image */}
                    <div className="w-[180px] shrink-0 flex items-center justify-center">
                      <img 
                        src={item.image_url} 
                        alt={item.title} 
                        className="max-h-[180px] max-w-[180px] object-contain cursor-pointer" 
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="flex justify-between">
                        <h2 className="text-lg font-medium text-gray-900 line-clamp-2 leading-snug cursor-pointer hover:text-orange-600">
                          {item.title}
                        </h2>
                        <div className="text-lg font-bold text-gray-900">
                          ₹{Number(item.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </div>
                      </div>

                      <div className="text-sm text-green-700 font-medium">In stock</div>
                      <div className="text-xs text-gray-500">Eligible for FREE Shipping</div>
                      
                      <div className="flex items-center gap-1 mt-1 text-sm">
                        <input type="checkbox" className="w-3.5 h-3.5" />
                        <span>This will be a gift</span>
                        <a href="#" className="text-blue-600 hover:text-orange-600 hover:underline">Learn more</a>
                      </div>

                      {/* Quantity & Actions */}
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center border border-gray-300 rounded shadow-sm bg-gray-50 overflow-hidden text-sm">
                          <button 
                            onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                            className="px-2 py-0.5 hover:bg-gray-200 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-3 py-0.5 bg-white border-l border-r border-gray-300 font-medium text-center w-10">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="px-2 py-0.5 hover:bg-gray-200 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-gray-300">|</div>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="text-sm text-blue-600 hover:text-orange-600 hover:underline cursor-pointer"
                        >
                          Delete
                        </button>
                        <div className="text-gray-300">|</div>
                        <button className="text-sm text-blue-600 hover:text-orange-600 hover:underline cursor-pointer">
                          Save for later
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {cartItems.length > 0 && (
              <div className="flex justify-end pt-2 text-lg">
                <span>Subtotal ({totalItems} item{totalItems > 1 ? 's' : ''}): </span>
                <span className="font-bold ml-1">
                  ₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
              </div>
            )}
          </div>

          {/* Right Column: Checkout Box */}
          <div className="flex flex-col gap-4">
            <div className="bg-white p-5 pt-4">
              <div className="flex items-center gap-2 text-sm mb-4">
                <div className="bg-green-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">✓</div>
                <span className="text-green-700">Part of your order qualifies for FREE Delivery.</span>
              </div>

              <div className="text-lg mb-4">
                <span>Subtotal ({totalItems} item{totalItems > 1 ? 's' : ''}): </span>
                <span className="font-bold">
                  ₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex items-center gap-1 mb-5 text-sm">
                <input type="checkbox" className="w-3.5 h-3.5" />
                <span>This order contains a gift</span>
              </div>

              <button 
                onClick={() => {
                  const combinedTitle = cartItems.map(item => item.title).join(', ');
                  const finalTitle = combinedTitle.length > 250 ? combinedTitle.substring(0, 247) + '...' : combinedTitle;
                  router.push(`/checkout?productId=0&title=${encodeURIComponent(finalTitle)}&amount=${subtotal}`);
                }}
                className="w-full bg-[#FFD814] border border-[#FCD200] hover:bg-[#F7CA00] py-1.5 rounded-full text-sm font-medium shadow-sm transition-colors mb-3 cursor-pointer"
              >
                Proceed to Buy
              </button>

              <div className="border border-gray-300 rounded p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50">
                <span className="text-sm font-medium">EMI Available</span>
                <span className="text-gray-500 text-xs">▼</span>
              </div>
            </div>
            
            <div className="text-xs text-gray-500 leading-tight px-2">
              The price and availability of items at Amazon.in are subject to change. The shopping cart is a temporary place to store a list of your items and reflects each item's most recent price.
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
