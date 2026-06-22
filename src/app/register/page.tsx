'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get('email') || '';

  const [name, setName] = useState('');
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Automatically login the user after successful registration
        localStorage.setItem('amazon_user', JSON.stringify({ name: data.name, email }));
        router.push('/');
      } else {
        setError(data.message || 'Error registering account');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center pt-8 select-none text-black">
      <div className="cursor-pointer mb-5" onClick={() => router.push('/')}>
        <span className="text-3xl font-black tracking-tight text-black">
          amazon<span className="text-[#f08804] text-lg font-medium">.in</span>
        </span>
      </div>

      <div className="border border-gray-300 rounded p-6 w-[350px] flex flex-col shadow-sm bg-white">
        <h1 className="text-[28px] font-normal mb-4 leading-tight">Create Account</h1>
        
        {error && <p className="text-xs text-red-600 mb-3 font-medium">{error}</p>}

        <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-bold">Your name</label>
            <input 
              type="text"
              value={name}
              placeholder="First and last name"
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-400 p-1.5 rounded text-[13px] focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white text-black h-[31px]"
              required 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-bold">Mobile number or email</label>
            <input 
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-400 p-1.5 rounded text-[13px] focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white text-black h-[31px]"
              required 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-bold">Password</label>
            <input 
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-400 p-1.5 rounded text-[13px] focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white text-black h-[31px]"
              required 
              minLength={6}
            />
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[#007185] text-sm">ℹ</span>
              <span className="text-xs text-gray-700 font-medium">Passwords must be at least 6 characters.</span>
            </div>
          </div>

          <p className="text-[12px] text-gray-900 mt-2 leading-normal">
            By enrolling your mobile phone number, you consent to receive automated security notifications via text message from Amazon. Message and data rates may apply.
          </p>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] border border-gray-500 hover:from-[#f5d78e] hover:to-[#eeb933] py-1.5 rounded text-[13px] text-black shadow-sm font-normal transition-all"
          >
            {loading ? 'Creating...' : 'Continue'}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-gray-200">
          <p className="text-[13px]">
            Already have an account? <Link href="/login" className="text-blue-600 hover:text-orange-600 hover:underline">Sign in <span>▶</span></Link>
          </p>
          <p className="text-[13px] mt-2">
            Buying for work? <a href="#" className="text-blue-600 hover:text-orange-600 hover:underline">Create a free business account <span>▶</span></a>
          </p>
        </div>
      </div>

      <div className="w-[350px] mt-6 flex justify-center">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>

      <div className="flex gap-6 text-[11px] text-blue-600 font-medium mt-6">
        <a href="#" className="hover:underline">Conditions of Use</a>
        <a href="#" className="hover:underline">Privacy Notice</a>
        <a href="#" className="hover:underline">Help</a>
      </div>
      <p className="text-[11px] text-gray-500 mt-3">
        © 1996-2026, Amazon.com, Inc. or its affiliates
      </p>
    </div>
  );
}