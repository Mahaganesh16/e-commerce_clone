// src/components/Header.tsx
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Header() {
  const [userName, setUserName] = useState('sign in');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem('amazon_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.name) {
          setUserName(parsedUser.name);
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.error("Error parsing user data from localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const res = await axios.get('/api/cart');
        const count = res.data.reduce((acc: number, item: any) => acc + item.quantity, 0);
        setCartCount(count);
      } catch (err) {
        console.error("Error fetching cart count:", err);
      }
    };
    fetchCartCount();

    window.addEventListener('cart_updated', fetchCartCount);
    return () => window.removeEventListener('cart_updated', fetchCartCount);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('amazon_user');
    window.location.reload();
  };

  const languages = [
    { code: 'EN', name: 'English - EN' },
    { code: 'HI', name: 'हिन्दी - HI' },
    { code: 'TA', name: 'தமிழ் - TA' },
    { code: 'TE', name: 'తెలుగు - TE' },
    { code: 'KN', name: 'ಕನ್ನಡ - KN' },
    { code: 'ML', name: 'മലയാളം - ML' },
    { code: 'BN', name: 'বাংলা - BN' },
    { code: 'MR', name: 'मराठी - MR' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full select-none text-black">
      {/* Top Navigation Row */}
      <div className="bg-[#131921] text-white flex items-center p-2 pl-4 pr-4 gap-3 h-14 relative">

        {/* 1. Amazon Logo Wrapper */}
        <a href="/">
          <div className="flex items-center border border-transparent hover:border-white p-1 pr-2 cursor-pointer h-[45px]">
            <span className="text-xl font-bold tracking-tight text-white flex items-center">
              amazon<span className="text-[#febd69] text-sm mt-2 font-medium">.in</span>
            </span>
          </div>
        </a>

        {/* 2. Madurai Delivery Geo Location Tracker */}
        <div className="flex items-center border border-transparent hover:border-white p-1 cursor-pointer h-[45px] gap-1 pl-2 pr-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 mt-1 text-white">
            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
          </svg>
          <div className="flex flex-col text-xs text-gray-300 leading-none justify-center">
            <span>Delivering to Madurai 625009</span>
            <span className="text-sm font-bold text-white mt-0.5">Update location</span>
          </div>
        </div>

        {/* 3. Central Search Bar */}
        <div className="flex flex-grow items-center h-10 rounded-md bg-amber-500 hover:bg-amber-600 cursor-pointer overflow-hidden group focus-within:ring-2 focus-within:ring-amber-500">
          <div className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs px-3 h-full flex items-center rounded-l-md border-r border-gray-300 font-normal">
            All <span className="ml-1 text-[10px]">▼</span>
          </div>

          {/* 🌟 FIXED HYDRATION WARNING PATCH INJECTED HERE */}
          <input
            type="text"
            placeholder="Search Amazon.in"
            suppressHydrationWarning={true}
            className="h-full p-2 px-3 flex-grow focus:outline-none text-black text-sm font-normal bg-white"
          />

          <div className="p-2.5 bg-[#febd69] hover:bg-[#f3a847] h-full w-12 flex items-center justify-center rounded-r-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-gray-800">
              <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* 4. Language Selector */}
        <div
          onMouseEnter={() => setShowLangDropdown(true)}
          onMouseLeave={() => setShowLangDropdown(false)}
          className="flex items-center border border-transparent hover:border-white p-2 cursor-pointer h-[45px] gap-1 font-bold text-sm relative group"
        >
          <span className="text-base">🇮🇳</span>
          <span className="text-white text-xs tracking-wide mt-1">{selectedLang}</span>
          <span className="text-gray-400 text-[8px] mt-2">▼</span>

          {showLangDropdown && (
            <div className="absolute top-[43px] left-[-20px] w-[240px] bg-white text-black p-4 shadow-2xl rounded-sm border border-gray-200 z-50 flex flex-col cursor-default font-sans font-normal text-left">
              <div className="absolute top-[-6px] left-[45px] w-3 h-3 bg-white transform rotate-45 border-t border-l border-gray-200"></div>
              <div className="text-xs text-gray-500 mb-3 font-medium">Change Language</div>
              <div className="flex flex-col gap-2.5 border-b border-gray-100 pb-3 mb-3">
                {languages.map((lang) => (
                  <label key={lang.code} className="flex items-center gap-2 text-xs text-gray-800 hover:text-orange-600 hover:underline cursor-pointer">
                    <input
                      type="radio"
                      name="language"
                      checked={selectedLang === lang.code}
                      onChange={() => setSelectedLang(lang.code)}
                      className="accent-orange-500 cursor-pointer w-3.5 h-3.5"
                    />
                    <span>{lang.name}</span>
                  </label>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-700 mb-3">
                <span>🇮🇳</span>
                <span className="text-[11px]">You are shopping on Amazon.in</span>
              </div>
              <a href="#" className="text-[11px] text-blue-600 hover:text-orange-600 hover:underline">Change country/region</a>
            </div>
          )}
        </div>

        {/* 5. Account & Lists Block */}
        <div
          onMouseEnter={() => setShowAccountDropdown(true)}
          onMouseLeave={() => setShowAccountDropdown(false)}
          onClick={() => !isLoggedIn && (window.location.href = '/login')}
          className="flex flex-col text-xs text-white border border-transparent hover:border-white p-1 pl-2 pr-2 cursor-pointer h-[45px] justify-center leading-tight select-none relative group"
        >
          <span className="text-gray-300 font-normal capitalize">Hello, {userName}</span>
          <span className="text-sm font-bold flex items-center">
            Account & Lists <span className="text-gray-400 text-[8px] ml-1 mt-0.5">▼</span>
          </span>

          {showAccountDropdown && (
            <div className="absolute top-[43px] right-0 w-[520px] bg-white text-black p-5 shadow-2xl rounded-sm border border-gray-200 z-50 flex flex-col cursor-default font-sans">
              <div className="absolute top-[-6px] right-[45px] w-3 h-3 bg-white transform rotate-45 border-t border-l border-gray-200"></div>

              {!isLoggedIn ? (
                <div className="flex flex-col items-center pb-4 border-b border-gray-100 w-full mb-4">
                  <button
                    onClick={() => window.location.href = '/login'}
                    className="w-[220px] bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] border border-gray-400 hover:from-[#f5d78e] hover:to-[#eeb933] py-2 rounded text-sm font-medium text-black text-center shadow-sm cursor-pointer"
                  >
                    Sign in
                  </button>
                  <p className="text-[11px] text-gray-700 mt-2">
                    New customer? <a href="#" className="text-blue-600 hover:text-orange-600 hover:underline">Start here.</a>
                  </p>
                </div>
              ) : (
                <div className="flex justify-between items-center pb-4 border-b border-gray-100 w-full mb-4 px-2">
                  <span className="text-xs font-semibold text-gray-600">Current User: <span className="text-amber-600 capitalize font-bold">{userName}</span></span>
                  <button onClick={handleSignOut} className="text-xs text-red-600 hover:underline font-bold cursor-pointer">
                    Sign Out
                  </button>
                </div>
              )}

              <div className="flex w-full text-left">
                <div className="w-1/2 pr-4 border-r border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">Your Lists</h3>
                  <ul className="flex flex-col gap-1.5 text-xs text-gray-700 font-normal">
                    <li className="hover:text-orange-600 hover:underline cursor-pointer">Create a Wish List</li>
                    <li className="hover:text-orange-600 hover:underline cursor-pointer">Wish from Any Website</li>
                    <li className="hover:text-orange-600 hover:underline cursor-pointer">Baby Wishlist</li>
                    <li className="hover:text-orange-600 hover:underline cursor-pointer">Discover Your Style</li>
                    <li className="hover:text-orange-600 hover:underline cursor-pointer">Explore Showroom</li>
                  </ul>
                </div>

                <div className="w-1/2 pl-5">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">Your Account</h3>
                  <ul className="flex flex-col gap-1.5 text-xs text-gray-700 font-normal">
                    <li className="hover:text-orange-600 hover:underline cursor-pointer">Your Account</li>
                    <li className="hover:text-orange-600 hover:underline cursor-pointer">Your Orders</li>
                    <li className="hover:text-orange-600 hover:underline cursor-pointer">Your Wish List</li>
                    <li className="hover:text-orange-600 hover:underline cursor-pointer">Keep shopping for</li>
                    <li className="hover:text-orange-600 hover:underline cursor-pointer">Your Recommendations</li>
                    <li className="hover:text-orange-600 hover:underline cursor-pointer">Your Prime Membership</li>
                    <li className="hover:text-orange-600 hover:underline cursor-pointer">Your Prime Video</li>
                    <li className="hover:text-orange-600 hover:underline cursor-pointer">Your Subscribe & Save Items</li>
                    <li className="hover:text-orange-600 hover:underline cursor-pointer">Memberships & Subscriptions</li>
                    <li className="hover:text-orange-600 hover:underline cursor-pointer">Your Seller Account</li>
                    <li className="hover:text-orange-600 hover:underline cursor-pointer">Manage Your Content and Devices</li>
                    <li className="hover:text-orange-600 hover:underline cursor-pointer">Your Music Library</li>
                    <li className="hover:text-orange-600 hover:underline cursor-pointer">Register for a free Business Account</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 6. Returns & Orders */}
        <div className="flex flex-col text-xs text-white border border-transparent hover:border-white p-1 pl-2 pr-2 cursor-pointer h-[45px] justify-center leading-tight">
          <span className="text-gray-300 font-normal">Returns</span>
          <span className="text-sm font-bold">& Orders</span>
        </div>

        {/* 7. Shopping Cart */}
        <div onClick={() => window.location.href = '/cart'} className="flex items-center border border-transparent hover:border-white p-1 pl-2 pr-2 cursor-pointer h-[45px] relative gap-1">
          <div className="relative flex items-center">
            <span className="absolute -top-1.5 left-[13px] bg-[#131921] text-[#f08804] text-base font-bold px-1 rounded-full leading-none">
              {cartCount}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-white">
              <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421l2.83-5.661a.75.75 0 00-.674-1.079H5.16l-.152-.567a.75.75 0 00-.733-.583H2.25z" />
              <path d="M7.5 18.75a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM18.75 18.75a.75.75 0 111.5 0 .75.75 0 01-1.5 0z" />
            </svg>
          </div>
          <span className="text-sm font-bold mt-3 text-white">Cart</span>
        </div>

      </div>

      {/* Bottom Sub-Navigation Menu Ribbon */}
      <div className="bg-[#232f3e] text-white flex items-center p-1.5 pl-4 gap-3 text-sm font-medium overflow-x-auto whitespace-nowrap scrollbar-none h-10">
        <div
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center gap-1 border border-transparent hover:border-white p-1 pl-1.5 pr-1.5 cursor-pointer font-bold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
          </svg>
          All
        </div>

        <p className="border border-transparent hover:border-white p-1 pl-1.5 pr-1.5 cursor-pointer">Sell</p>
        <p onClick={() => window.location.href = '/search?category=bestsellers'} className="border border-transparent hover:border-white p-1 pl-1.5 pr-1.5 cursor-pointer">Bestsellers</p>
        <p onClick={() => window.location.href = '/search?category=todays%20deals'} className="border border-transparent hover:border-white p-1 pl-1.5 pr-1.5 cursor-pointer text-[#febd69]">Today's Deals</p>
        <p onClick={() => window.location.href = '/search?category=mobiles'} className="border border-transparent hover:border-white p-1 pl-1.5 pr-1.5 cursor-pointer">Mobiles</p>
        <p onClick={() => window.location.href = '/search?category=electronics'} className="border border-transparent hover:border-white p-1 pl-1.5 pr-1.5 cursor-pointer">Electronics</p>
        <p onClick={() => window.location.href = '/search?category=fashion'} className="border border-transparent hover:border-white p-1 pl-1.5 pr-1.5 cursor-pointer">Fashion</p>
        <p onClick={() => window.location.href = '/search?category=home%20%26%20kitchen'} className="border border-transparent hover:border-white p-1 pl-1.5 pr-1.5 cursor-pointer">Home & Kitchen</p>
        <p onClick={() => window.location.href = '/search?category=computers'} className="border border-transparent hover:border-white p-1 pl-1.5 pr-1.5 cursor-pointer">Computers</p>
        <p onClick={() => window.location.href = '/search?category=toys%20%26%20games'} className="border border-transparent hover:border-white p-1 pl-1.5 pr-1.5 cursor-pointer">Toys & Games</p>
        <p onClick={() => window.location.href = '/search?category=car%20%26%20motorbike'} className="border border-transparent hover:border-white p-1 pl-1.5 pr-1.5 cursor-pointer">Car & Motorbike</p>
      </div>

      {/* Sidebar Menu Component */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex font-sans">
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 transition-opacity duration-300"
          ></div>

          <div className="relative w-[365px] h-full bg-white flex flex-col z-50 animate-slide-in overflow-y-auto shadow-2xl text-left scrollbar-thin">
            <div className="bg-[#232f3e] text-white p-3 pl-9 flex items-center gap-3 h-[50px] shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12c0 2.76.135 5.253 1.257 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.28A7.747 7.747 0 0112 15.75a7.747 7.747 0 015.855 2.066A7.962 7.962 0 0112 19.75a7.962 7.962 0 01-5.855-1.933zM12 7.125a3.375 3.375 0 100 6.75 3.375 3.375 0 000-6.75z" clipRule="evenodd" />
              </svg>
              <span className="text-lg font-bold tracking-wide capitalize">Hello, {userName}</span>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="py-4 border-b border-gray-200">
                <h3 className="text-sm font-bold text-gray-900 px-9 mb-3 tracking-wide">Trending</h3>
                <ul className="text-xs text-gray-700 font-medium flex flex-col">
                  <li className="px-9 py-3 hover:bg-gray-100 cursor-pointer">Bestsellers</li>
                  <li className="px-9 py-3 hover:bg-gray-100 cursor-pointer">New Releases</li>
                  <li className="px-9 py-3 hover:bg-gray-100 cursor-pointer">Movers and Shakers</li>
                </ul>
              </div>

              <div className="py-4 border-b border-gray-200">
                <h3 className="text-sm font-bold text-gray-900 px-9 mb-3 tracking-wide">Digital Content and Devices</h3>
                <ul className="text-xs text-gray-700 font-medium flex flex-col">
                  <li className="px-9 py-3 bg-gray-100/80 hover:bg-gray-100 cursor-pointer flex justify-between items-center pr-6">
                    <span className="font-semibold text-gray-900">Echo & Alexa</span>
                    <span className="text-gray-400 text-sm">▶</span>
                  </li>
                  <li className="px-9 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center pr-6">
                    <span>Fire TV</span>
                    <span className="text-gray-400 text-sm">▶</span>
                  </li>
                  <li className="px-9 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center pr-6">
                    <span>Kindle E-Readers & eBooks</span>
                    <span className="text-gray-400 text-sm">▶</span>
                  </li>
                  <li className="px-9 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center pr-6">
                    <span>Audible Audiobooks</span>
                    <span className="text-gray-400 text-sm">▶</span>
                  </li>
                  <li className="px-9 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center pr-6">
                    <span>Amazon Prime Video</span>
                    <span className="text-gray-400 text-sm">▶</span>
                  </li>
                  <li className="px-9 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center pr-6">
                    <span>Amazon Music</span>
                    <span className="text-gray-400 text-sm">▶</span>
                  </li>
                </ul>
              </div>

              <div className="py-4 pb-6">
                <h3 className="text-sm font-bold text-gray-900 px-9 mb-3 tracking-wide">Shop by Category</h3>
                <ul className="text-xs text-gray-700 font-medium flex flex-col">
                  <li className="px-9 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center pr-6">
                    <span>Mobiles, Computers</span>
                    <span className="text-gray-400 text-sm">▶</span>
                  </li>
                  <li className="px-9 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center pr-6">
                    <span>TV, Appliances, Electronics</span>
                    <span className="text-gray-400 text-sm">▶</span>
                  </li>
                  <li className="px-9 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center pr-6">
                    <span>Men's Fashion</span>
                    <span className="text-gray-400 text-sm">▶</span>
                  </li>
                  <li className="px-9 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center pr-6">
                    <span>Women's Fashion</span>
                    <span className="text-gray-400 text-sm">▶</span>
                  </li>
                  <li className="px-9 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-1 text-gray-900 font-semibold">
                    <span>See all</span>
                    <span className="text-[10px] mt-0.5">▼</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-3 left-[375px] z-50 text-white font-light hover:text-gray-200 focus:outline-none cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-9 h-9">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </header>
  );
}