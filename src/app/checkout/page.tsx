'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const productId = searchParams.get('productId');
  const title = searchParams.get('title');
  const amount = searchParams.get('amount');
  const image = searchParams.get('image');

  const [paymentMethod, setPaymentMethod] = useState('Credit/Debit Card');
  const [addressName, setAddressName] = useState('');
  const [addressMobile, setAddressMobile] = useState('');
  const [addressPincode, setAddressPincode] = useState('');
  const [addressFull, setAddressFull] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!productId || !title || !amount) {
      router.push('/');
    }
  }, [productId, title, amount, router]);

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const storedUser = localStorage.getItem('amazon_user');
      let email = 'anonymous';
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          if (parsed.email) email = parsed.email;
        } catch (e) {}
      }

      await axios.post('/api/orders', {
        product_summary: title,
        total_amount: parseFloat(amount as string),
        payment_method: paymentMethod,
        address_name: addressName,
        address_mobile: addressMobile,
        address_pincode: addressPincode,
        address_full: addressFull,
        email: email,
        product_image: image
      });
      setSuccess(true);
    } catch (err) {
      console.error("Failed to place order:", err);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!productId || !title || !amount) {
    return null;
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto mt-16 p-8 border border-green-500 rounded-lg shadow-sm text-center">
        <div className="text-green-500 text-6xl mb-4">✓</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-6">Your order for "{title}" has been placed successfully.</p>
        <div className="flex gap-4 justify-center">
          <button 
            onClick={() => router.push('/')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition-all cursor-pointer"
          >
            Continue Shopping
          </button>
          <button 
            onClick={() => router.push('/orders')}
            className="bg-gray-100 border border-gray-300 hover:bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-full transition-all cursor-pointer"
          >
            Check Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Order Summary Box */}
          <div className="border border-gray-300 rounded p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">1. Review item and delivery</h2>
            <div className="flex justify-between items-start border-t border-gray-200 pt-4">
              <div className="flex gap-4">
                {image && (
                  <img src={image} alt={title || 'Product Image'} className="w-20 h-20 object-contain mix-blend-multiply" />
                )}
                <div>
                  <h3 className="font-medium text-gray-900">{title}</h3>
                  <p className="text-sm text-gray-600 mt-1">Delivery: Standard Delivery</p>
                </div>
              </div>
              <div className="font-bold text-lg">
                ₹{Number(amount).toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          {/* Delivery Address Box */}
          <div className="border border-gray-300 rounded p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">2. Delivery address</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={addressName}
                onChange={(e) => setAddressName(e.target.value)}
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded p-3 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="tel"
                  value={addressMobile}
                  onChange={(e) => setAddressMobile(e.target.value)}
                  placeholder="Mobile Number"
                  className="w-full border border-gray-300 rounded p-3 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                  required
                />
                <input
                  type="text"
                  value={addressPincode}
                  onChange={(e) => setAddressPincode(e.target.value)}
                  placeholder="Pincode"
                  className="w-full border border-gray-300 rounded p-3 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                  required
                />
              </div>
              <textarea
                value={addressFull}
                onChange={(e) => setAddressFull(e.target.value)}
                placeholder="Enter your full delivery address here (House no, Building, Street, City, State)..."
                className="w-full border border-gray-300 rounded p-3 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none resize-y min-h-[100px]"
                required
              />
            </div>
          </div>

          {/* Payment Method Box */}
          <div className="border border-gray-300 rounded p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">3. Payment method</h2>
            <div className="space-y-4">
              {[
                'Credit/Debit Card',
                'Net Banking',
                'UPI Apps',
                'Cash on Delivery/Pay on Delivery'
              ].map((method) => (
                <label key={method} className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                  />
                  <span className="text-gray-900 font-medium">{method}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="border border-gray-300 rounded p-6 shadow-sm h-fit">
          <button 
            onClick={handlePlaceOrder}
            disabled={loading || !addressName.trim() || !addressMobile.trim() || !addressPincode.trim() || !addressFull.trim()}
            className={`w-full py-2 rounded-full text-sm font-bold shadow-sm mb-4 transition-all cursor-pointer ${
              loading || !addressName.trim() || !addressMobile.trim() || !addressPincode.trim() || !addressFull.trim() ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-black'
            }`}
          >
            {loading ? 'Processing...' : 'Place Your Order and Pay'}
          </button>
          
          <h3 className="font-bold text-gray-900 mb-3">Order Summary</h3>
          <div className="space-y-2 text-sm text-gray-600 border-b border-gray-200 pb-3 mb-3">
            <div className="flex justify-between">
              <span>Items:</span>
              <span>₹{Number(amount).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery:</span>
              <span>₹0.00</span>
            </div>
          </div>
          <div className="flex justify-between font-bold text-gray-900 text-lg">
            <span>Order Total:</span>
            <span>₹{Number(amount).toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col justify-between text-black font-sans">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="text-center mt-10">Loading checkout...</div>}>
          <CheckoutContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
