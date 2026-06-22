'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

type Order = {
  id: number;
  total_amount: number;
  status: string;
  created_at: string;
  address_name: string;
  address_full: string;
  payment_method: string;
  product_summary: string;
  product_image?: string;
};

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const storedUser = localStorage.getItem('amazon_user');
        let email = 'anonymous';
        if (storedUser) {
          try {
            const parsed = JSON.parse(storedUser);
            if (parsed.email) email = parsed.email;
          } catch (e) {}
        }
        
        const res = await axios.get(`/api/orders?email=${email}`);
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen text-black">
        <Header />
        <div className="max-w-[1000px] mx-auto p-4 mt-4 animate-pulse">
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
        <main className="max-w-[1000px] mx-auto p-4 mt-4">
          <h1 className="text-3xl font-normal text-gray-900 mb-6">Your Orders</h1>

          {orders.length === 0 ? (
            <div className="bg-white p-8 text-center rounded shadow-sm border border-gray-200">
              <h2 className="text-xl font-medium mb-4">You have no orders yet.</h2>
              <button 
                onClick={() => router.push('/')}
                className="bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] py-2 px-6 rounded-full text-sm font-medium shadow-sm transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
                  {/* Order Header */}
                  <div className="bg-gray-100 p-4 border-b border-gray-200 text-sm text-gray-600 flex justify-between items-center">
                    <div className="flex gap-8">
                      <div>
                        <p className="uppercase text-xs font-bold text-gray-500 mb-1">Order Placed</p>
                        <p>{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      </div>
                      <div>
                        <p className="uppercase text-xs font-bold text-gray-500 mb-1">Total</p>
                        <p>₹{Number(order.total_amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                      </div>
                      <div>
                        <p className="uppercase text-xs font-bold text-gray-500 mb-1">Dispatch To</p>
                        <p className="text-blue-600 cursor-pointer hover:text-orange-600 hover:underline">{order.address_name}</p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <p className="uppercase text-xs font-bold text-gray-500 mb-1">Order #</p>
                      <p>403-{order.id.toString().padStart(7, '0')}-{Math.floor(Math.random() * 10000000)}</p>
                    </div>
                  </div>

                  {/* Order Body */}
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        {order.product_image && (
                          <div className="w-[90px] h-[90px] shrink-0 flex items-center justify-center">
                            <img src={order.product_image} alt="Product" className="max-h-full max-w-full object-contain mix-blend-multiply" />
                          </div>
                        )}
                        <div>
                          <h2 className="text-lg font-bold text-green-700 mb-2">
                            {order.status === 'Success' ? 'Payment Successful' : order.status}
                          </h2>
                          <p className="text-sm font-medium text-gray-900 mb-4 line-clamp-2 max-w-[500px]">
                            {order.product_summary}
                          </p>
                          <div className="text-xs text-gray-500 space-y-1">
                            <p><strong>Payment Method:</strong> {order.payment_method}</p>
                            <p><strong>Delivery Address:</strong> {order.address_full}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 w-[250px]">
                        <button className="bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] py-1.5 px-4 rounded-full text-sm shadow-sm font-medium w-full transition-colors">
                          Track package
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 py-1.5 px-4 rounded-full text-sm shadow-sm w-full transition-colors">
                          View or edit order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
