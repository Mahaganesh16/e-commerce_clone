'use client';

import React from 'react';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#232F3E] text-white font-sans text-[14px]">
      
      {/* 1. Back to Top Button */}
      <button
        onClick={handleScrollToTop}
        className="w-full bg-[#37475A] hover:bg-[#485769] text-center py-[15px] text-[12px] font-normal transition-colors cursor-pointer block"
      >
        Back to top
      </button>

      {/* 2. Main Directory Link Columns */}
      <div className="max-w-[1000px] mx-auto px-4 py-[40px] grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        
        {/* Column 1 */}
        <div>
          <h3 className="font-bold text-[16px] mb-[14px]">Get to Know Us</h3>
          <ul className="space-y-[10px] text-[#DDD] text-[14px]">
            <li><a href="#" className="hover:underline">About Amazon</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Press Releases</a></li>
            <li><a href="#" className="hover:underline">Amazon Science</a></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="font-bold text-[16px] mb-[14px]">Connect with Us</h3>
          <ul className="space-y-[10px] text-[#DDD] text-[14px]">
            <li><a href="#" className="hover:underline">Facebook</a></li>
            <li><a href="#" className="hover:underline">Twitter</a></li>
            <li><a href="#" className="hover:underline">Instagram</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="font-bold text-[16px] mb-[14px]">Make Money with Us</h3>
          <ul className="space-y-[10px] text-[#DDD] text-[14px]">
            <li><a href="#" className="hover:underline">Sell on Amazon</a></li>
            <li><a href="#" className="hover:underline">Sell under Amazon Accelerator</a></li>
            <li><a href="#" className="hover:underline">Protect and Build Your Brand</a></li>
            <li><a href="#" className="hover:underline">Amazon Global Selling</a></li>
            <li><a href="#" className="hover:underline">Supply to Amazon</a></li>
            <li><a href="#" className="hover:underline">Become an Affiliate</a></li>
            <li><a href="#" className="hover:underline">Fulfilment by Amazon</a></li>
            <li><a href="#" className="hover:underline">Advertise Your Products</a></li>
            <li><a href="#" className="hover:underline">Amazon Pay on Merchants</a></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="font-bold text-[16px] mb-[14px]">Let Us Help You</h3>
          <ul className="space-y-[10px] text-[#DDD] text-[14px]">
            <li><a href="#" className="hover:underline">Your Account</a></li>
            <li><a href="#" className="hover:underline">Returns Centre</a></li>
            <li><a href="#" className="hover:underline">Recalls and Product Safety Alerts</a></li>
            <li><a href="#" className="hover:underline">100% Purchase Protection</a></li>
            <li><a href="#" className="hover:underline">Amazon App Download</a></li>
            <li><a href="#" className="hover:underline">Help</a></li>
          </ul>
        </div>

      </div>

      {/* 3. Logo and Settings Bar Accent Layer */}
      <div className="border-t border-[#3a4553] py-[25px] flex flex-wrap items-center justify-center gap-6 bg-[#232F3E]">
        {/* Amazon Logo */}
        <div className="pt-2">
          <img 
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" 
            alt="Amazon Logo" 
            className="h-[24px] w-auto object-contain invert opacity-90"
          />
        </div>
        
        {/* Settings Selectors Dropdowns */}
        <div className="flex gap-2 text-[13px] text-[#CCC]">
          <div className="border border-[#848688] rounded-[3px] px-3 py-1.5 flex items-center gap-2 bg-transparent cursor-pointer hover:border-white">
            <i className="fa-solid fa-globe text-[11px]"></i>
            <span>English</span>
            <span className="text-[9px] text-gray-400">▼</span>
          </div>
          <div className="border border-[#848688] rounded-[3px] px-3 py-1.5 flex items-center gap-2 bg-transparent cursor-pointer hover:border-white">
            <span className="text-[14px]">🇮🇳</span>
            <span>India</span>
          </div>
        </div>
      </div>

      {/* 4. Deep Dark Sub-Footer Services Grid Layout */}
      <div className="w-full bg-[#131A22] text-[#999] text-[12px] py-[30px]">
        <div className="max-w-[1000px] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-4">
          
          <div>
            <a href="#" className="hover:underline text-white block font-medium">AbeBooks</a>
            <span className="text-[#999] text-[11px]">Books, art<br />& collectibles</span>
          </div>

          <div>
            <a href="#" className="hover:underline text-white block font-medium">Amazon Web Services</a>
            <span className="text-[#999] text-[11px]">Scalable Cloud<br />Computing Services</span>
          </div>

          <div>
            <a href="#" className="hover:underline text-white block font-medium">Audible</a>
            <span className="text-[#999] text-[11px]">Download<br />Audio Books</span>
          </div>

          <div>
            <a href="#" className="hover:underline text-white block font-medium">IMDb</a>
            <span className="text-[#999] text-[11px]">Movies, TV<br />& Celebrities</span>
          </div>

          <div className="mt-2">
            <a href="#" className="hover:underline text-white block font-medium">Shopbop</a>
            <span className="text-[#999] text-[11px]">Designer<br />Fashion Brands</span>
          </div>

          <div className="mt-2">
            <a href="#" className="hover:underline text-white block font-medium">Amazon Business</a>
            <span className="text-[#999] text-[11px]">Everything For<br />Your Business</span>
          </div>

          <div className="mt-2">
            <a href="#" className="hover:underline text-white block font-medium">Amazon Music</a>
            <span className="text-[#999] text-[11px]">Stream millions<br />of songs</span>
          </div>

        </div>

        {/* Legal Agreements / Copyright Row */}
        <div className="text-center text-[12px] mt-[30px] space-y-1 px-4">
          <div className="flex justify-center gap-4 text-[#DDD] flex-wrap">
            <a href="#" className="hover:underline">Conditions of Use & Sale</a>
            <a href="#" className="hover:underline">Privacy Notice</a>
            <a href="#" className="hover:underline">Interest-Based Ads</a>
          </div>
          <p className="text-[#999] text-[11px] pt-1">
            © 1996-2026, Amazon.com, Inc. or its affiliates
          </p>
        </div>
      </div>

    </footer>
  );
}