// src/app/login/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Calling your own backend api/login endpoint dynamically
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Saving user reference context values local to client window layout instances
        localStorage.setItem('amazon_user', JSON.stringify({ name: email.split('@')[0] }));
        
        // Immediate redirection back direct to homepage dashboard grid view
        router.push('/');
      } else {
        setError(data.message || 'Invalid login details. Try again bro.');
      }
    } catch (err) {
      setError('Backend engine error. Check table configurations.');
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center pt-10 select-none text-black">
      {/* Amazon Text branding block trigger fallback to dashboard home */}
      <div className="cursor-pointer mb-6" onClick={() => router.push('/')}>
        <span className="text-3xl font-black tracking-tight text-black">
          amazon<span className="text-[#f08804] text-lg font-medium">.in</span>
        </span>
      </div>

      <div className="border border-gray-300 rounded p-6 w-[350px] flex flex-col shadow-sm bg-white">
        <h1 className="text-2xl font-normal mb-4">Sign in</h1>
        
        {error && <p className="text-xs text-red-600 mb-3 font-medium">{error}</p>}

        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold">Email or mobile phone number</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-400 p-1.5 rounded text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white text-black"
              required 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-400 p-1.5 rounded text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white text-black"
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] border border-gray-500 hover:from-[#f5d78e] hover:to-[#eeb933] py-1.5 rounded text-sm text-black mt-2 shadow-sm font-medium transition-all"
          >
            Continue
          </button>
        </form>

        <p className="text-xs text-gray-600 mt-4 leading-normal">
          By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
        </p>
      </div>
    </div>
  );
}