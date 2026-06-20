const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', 'search', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add states
content = content.replace(
  'const [cartItems, setCartItems] = useState<any[]>([]);',
  `const [cartItems, setCartItems] = useState<any[]>([]);
  const [furnishingTrends, setFurnishingTrends] = useState<any[]>([]);
  const [furnishingBrands, setFurnishingBrands] = useState<any[]>([]);`
);

// 2. Add API Call
content = content.replace(
  "axios.get('/api/cart').catch(() => ({ data: [] }))",
  `axios.get('/api/cart').catch(() => ({ data: [] })),
      axios.get('/api/home-furnishing').catch(() => ({ data: { trends: [], brands: [] } }))`
);

content = content.replace(
  "then(([resProducts, resBrands, resDecor, resStorage, resCart]) => {",
  `then(([resProducts, resBrands, resDecor, resStorage, resCart, resFurnishing]) => {`
);

content = content.replace(
  "if (Array.isArray(resCart.data)) setCartItems(resCart.data);",
  `if (Array.isArray(resCart.data)) setCartItems(resCart.data);
      if (resFurnishing.data?.trends) setFurnishingTrends(resFurnishing.data.trends);
      if (resFurnishing.data?.brands) setFurnishingBrands(resFurnishing.data.brands);`
);

// 3. Update Booleans
content = content.replace(
  "categoryLower.includes('cushion') ||",
  ""
);

content = content.replace(
  "const isDecorCategory =",
  `const isFurnishingCategory = 
    categoryLower.includes('cushion') ||
    categoryLower.includes('furnishing') ||
    categoryLower.includes('linen') ||
    categoryLower.includes('bedding');

  const isDecorCategory =`
);

// 4. Update Sidebar
content = content.replace(
  ") : isDecorCategory ? (",
  `) : isFurnishingCategory ? (
          <div className="space-y-4 text-[13px] text-gray-800">
            <div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">&lsaquo; Home & Kitchen</h3>
              <h4 className="font-bold text-gray-900 pl-2 mb-2">Home Furnishing</h4>
              <ul className="pl-4 space-y-1.5 text-xs text-gray-600">
                <li className="hover:text-orange-600 cursor-pointer">Bathroom Linen</li>
                <li className="hover:text-orange-600 cursor-pointer">Bedding & Linen</li>
                <li className="hover:text-orange-600 cursor-pointer">Carpets & Rugs</li>
                <li className="hover:text-orange-600 cursor-pointer">Curtains & Accessories</li>
                <li className="font-bold text-orange-600 cursor-pointer">Cushions & Cushion Covers</li>
                <li className="hover:text-orange-600 cursor-pointer">Diwan Cover Sets</li>
                <li className="hover:text-orange-600 cursor-pointer">Fabric</li>
                <li className="hover:text-orange-600 cursor-pointer">Inflatable Beds, Pillows & Accessories</li>
                <li className="hover:text-orange-600 cursor-pointer">Kitchen Linens</li>
                <li className="hover:text-orange-600 cursor-pointer">Slipcovers</li>
              </ul>
            </div>
            <hr className="border-gray-200" />
            <div>
              <h3 className="font-bold text-gray-900 mb-1.5 text-sm">Amazon Prime</h3>
              <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
                <input type="checkbox" className="rounded-sm border-gray-300 accent-orange-500 w-3.5 h-3.5" defaultChecked />
                <span className="text-[#007185] font-bold text-xs">✓prime</span>
              </label>
            </div>
            <hr className="border-gray-200" />
            <div className="space-y-2">
               <h3 className="font-bold text-gray-900 mb-1.5 text-sm">Delivery Day</h3>
               <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
                <input type="checkbox" className="rounded-sm border-gray-300 w-3.5 h-3.5" />
                <span className="text-gray-900 text-xs">Get It Today</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
                <input type="checkbox" className="rounded-sm border-gray-300 w-3.5 h-3.5" />
                <span className="text-gray-900 text-xs">Get It by Tomorrow</span>
              </label>
            </div>
          </div>
        ) : isDecorCategory ? (`
);

// 5. Build Layout
const newLayout = `) : isFurnishingCategory ? (
          <div className="w-full">
            <div className="mb-5 text-left">
              <h1 className="text-[28px] font-medium text-[#E47911] font-sans tracking-tight">
                Buy Home Furnishing Products Online at Amazon India
              </h1>
              <p className="text-[13px] text-gray-600 mt-1.5 leading-relaxed max-w-5xl">
                Looking to purchase home furnishing products? Amazon India offers a wide collection of <span className="text-[#007185] hover:underline cursor-pointer">bedroom, bathroom, and kitchen linen, bedding, carpets, cushions, curtains</span> and much more from popular brands at attractive prices online
              </p>
            </div>

            <div className="bg-[#F7F7F7] p-5 border border-gray-200 rounded-none w-full mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">Trends of the season</h2>
              <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
                {furnishingTrends.map((item: any) => (
                  <div key={item.id} className="flex-shrink-0 w-[180px] flex flex-col bg-white border border-gray-200 shadow-sm overflow-hidden p-2">
                    <div className="w-full h-[180px] flex items-center justify-center overflow-hidden">
                      <img src={item.image_url} alt={item.title} className="max-h-full max-w-full object-cover" />
                    </div>
                    <div className="text-center mt-3 mb-1">
                      <a href="#" className="text-sm font-medium text-[#007185] hover:text-orange-600 hover:underline">{item.link_text || 'Shop now'}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F7F7F7] p-5 border border-gray-200 rounded-none w-full mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">Best of furnishing brands</h2>
              <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
                {furnishingBrands.map((brand: any) => (
                  <div key={brand.id} className="flex-shrink-0 w-[180px] flex flex-col bg-white border border-gray-200 shadow-sm overflow-hidden p-2">
                    <div className="w-full h-[180px] flex items-center justify-center overflow-hidden">
                      <img src={brand.image_url} alt={brand.name} className="max-h-full max-w-full object-cover" />
                    </div>
                    <div className="text-center mt-3 mb-1">
                      <a href="#" className="text-sm font-medium text-[#007185] hover:text-orange-600 hover:underline">Shop now</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : isDecorCategory ? (`

content = content.replace(
  ") : isDecorCategory ? (",
  newLayout
);

fs.writeFileSync(filePath, content, 'utf8');
console.log("File updated");
