'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState<'email' | 'password'>('email');
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/check-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        if (data.exists) {
          // User exists, move to password step
          setStep('password');
        } else {
          // User does not exist, route to register page with email as query param
          router.push(`/register?email=${encodeURIComponent(email)}`);
        }
      } else {
        setError(data.message || 'Error checking account');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('amazon_user', JSON.stringify({ name: data.name, email }));
        router.push('/');
      } else {
        setError(data.message || 'Invalid password');
      }
    } catch (err) {
      setError('Backend error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center pt-10 select-none text-black">
      <div className="cursor-pointer mb-6" onClick={() => router.push('/')}>
        <span className="text-3xl font-black tracking-tight text-black">
          amazon<span className="text-[#f08804] text-lg font-medium">.in</span>
        </span>
      </div>

      <div className="border border-gray-300 rounded p-6 w-[350px] flex flex-col shadow-sm bg-white">
        {step === 'email' ? (
          <>
            <h1 className="text-[28px] font-normal mb-4 leading-tight">Sign in or create account</h1>
            {error && <p className="text-xs text-red-600 mb-3 font-medium">{error}</p>}
            
            <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-bold">Enter mobile number or email</label>
                <input 
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-400 p-1.5 rounded text-[13px] focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white text-black h-[31px]"
                  required 
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] border border-gray-500 hover:from-[#f5d78e] hover:to-[#eeb933] py-1 rounded text-[13px] text-black mt-2 shadow-sm font-normal transition-all"
              >
                {loading ? 'Please wait...' : 'Continue'}
              </button>
            </form>

            <p className="text-[12px] text-gray-900 mt-5 leading-normal">
              By continuing, you agree to Amazon's <a href="#" className="text-blue-600 hover:text-orange-600 hover:underline">Conditions of Use</a> and <a href="#" className="text-blue-600 hover:text-orange-600 hover:underline">Privacy Notice</a>.
            </p>

            <div className="mt-5 pt-5 border-t border-gray-200">
              <h3 className="text-[13px] font-bold mb-1">Buying for work?</h3>
              <a href="#" className="text-[13px] text-blue-600 hover:text-orange-600 hover:underline">Create a free business account</a>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-[28px] font-normal mb-2 leading-tight">Sign in</h1>
            <div className="flex gap-1 mb-4 text-[13px]">
              <span className="text-gray-600">{email}</span>
              <button onClick={() => setStep('email')} className="text-blue-600 hover:text-orange-600 hover:underline font-medium">Change</button>
            </div>
            {error && <p className="text-xs text-red-600 mb-3 font-medium">{error}</p>}
            
            <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <label className="text-[13px] font-bold">Password</label>
                  <a href="#" className="text-[13px] text-blue-600 hover:text-orange-600 hover:underline">Forgot Password</a>
                </div>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-400 p-1.5 rounded text-[13px] focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white text-black h-[31px]"
                  required 
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] border border-gray-500 hover:from-[#f5d78e] hover:to-[#eeb933] py-1 rounded text-[13px] text-black mt-2 shadow-sm font-normal transition-all"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
              
              <div className="flex items-center gap-2 mt-2">
                <input type="checkbox" className="w-3.5 h-3.5" />
                <span className="text-[13px]">Keep me signed in. <a href="#" className="text-blue-600 hover:text-orange-600 hover:underline">Details</a></span>
              </div>
            </form>
          </>
        )}
      </div>
      
      {step === 'email' && (
        <div className="mt-8 flex items-center justify-center gap-2 w-[350px]">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="text-xs text-gray-500 bg-white px-2">New to Amazon?</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
      )}

      {step === 'email' && (
        <button 
          onClick={() => router.push('/register')}
          className="w-[350px] mt-4 border border-gray-400 bg-gray-50 hover:bg-gray-100 py-1.5 rounded text-[13px] font-normal shadow-sm"
        >
          Create your Amazon account
        </button>
      )}

      <div className="w-full h-[1px] bg-gray-200 mt-12 mb-8"></div>
      
      <div className="flex gap-6 text-[11px] text-blue-600 font-medium">
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