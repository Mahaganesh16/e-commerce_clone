const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', 'search', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add lightingBrands state
content = content.replace(
  'const [furnishingBrands, setFurnishingBrands] = useState<any[]>([]);',
  `const [furnishingBrands, setFurnishingBrands] = useState<any[]>([]);\n  const [lightingBrands, setLightingBrands] = useState<any[]>([]);`
);

// 2. Add lightingBrandsSliderRef
content = content.replace(
  'const decorSliderRef = useRef<HTMLDivElement>(null);',
  `const decorSliderRef = useRef<HTMLDivElement>(null);\n  const lightingSliderRef = useRef<HTMLDivElement>(null);`
);

// 3. Add axios fetch for home-lighting
content = content.replace(
  `    axios.get('/api/home-decor').then(res => {\n      if (Array.isArray(res.data)) setDecorCategories(res.data);\n    }).catch(console.error);`,
  `    axios.get('/api/home-decor').then(res => {\n      if (Array.isArray(res.data)) setDecorCategories(res.data);\n    }).catch(console.error);\n\n    axios.get('/api/home-lighting').then(res => {\n      if (Array.isArray(res.data)) setLightingBrands(res.data);\n    }).catch(console.error);`
);

// 4. Update isStorageCategory
content = content.replace(
  `  const isStorageCategory = \n    categoryLower.includes('storage') || \n    categoryLower.includes('lighting') || \n    categoryLower.includes('fresh') ||`,
  `  const isStorageCategory = \n    categoryLower.includes('storage') || \n    categoryLower.includes('fresh') ||`
);

// 5. Add isLightingCategory
content = content.replace(
  `  const isDecorCategory = \n    categoryLower.includes('decor') || `,
  `  const isLightingCategory = categoryLower.includes('lighting') || categoryLower.includes('light');\n\n  const isDecorCategory = \n    categoryLower.includes('decor') || `
);

// 6. Add left sidebar menu for lighting
const lightingSidebar = `        ) : isLightingCategory ? (
          <div className="space-y-5 text-[13px]">
            <div>
              <h3 className="font-bold text-gray-900 mb-1 text-sm">Category</h3>
              <ul className="space-y-1 text-gray-800">
                <li className="font-medium cursor-pointer hover:text-orange-600">&lsaquo; Home & Kitchen</li>
                <li className="font-semibold pl-2 text-gray-900">Indoor Lighting</li>
                <ul className="pl-4 space-y-1 text-gray-600 text-xs">
                  <li className="hover:text-orange-600 cursor-pointer text-orange-600 font-bold">Ceiling Lighting</li>
                  <li className="hover:text-orange-600 cursor-pointer">Ceiling-mounted lights</li>
                  <li className="hover:text-orange-600 cursor-pointer">Clip Lights</li>
                  <li className="hover:text-orange-600 cursor-pointer">Desk Lights</li>
                  <li className="hover:text-orange-600 cursor-pointer">Fixtures</li>
                </ul>
              </ul>
            </div>
            <hr className="border-gray-200" />
            <div>
              <h3 className="font-bold text-gray-900 mb-1.5 text-sm">Brands</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
                  <input type="checkbox" className="rounded-sm border-gray-300 w-3.5 h-3.5" />
                  <span className="text-gray-900 text-xs">PHILIPS</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
                  <input type="checkbox" className="rounded-sm border-gray-300 w-3.5 h-3.5" />
                  <span className="text-gray-900 text-xs">Halonix</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
                  <input type="checkbox" className="rounded-sm border-gray-300 w-3.5 h-3.5" />
                  <span className="text-gray-900 text-xs">Bajaj</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-700">
                  <input type="checkbox" className="rounded-sm border-gray-300 w-3.5 h-3.5" />
                  <span className="text-gray-900 text-xs">Crompton</span>
                </label>
              </div>
            </div>
          </div>\n`;

content = content.replace(
  `        ) : isDecorCategory ? (`,
  lightingSidebar + `        ) : isDecorCategory ? (`
);

// 7. Add main UI for lighting
const lightingMainUI = `        ) : isLightingCategory ? (
          <div className="w-full">
            <div className="w-full bg-black h-[280px] rounded-none mb-6 flex justify-between items-center relative overflow-hidden border border-gray-800">
              <div className="flex flex-col items-center justify-center space-y-6 z-10 w-[55%]">
                <h1 className="text-5xl font-bold text-white tracking-wide font-sans text-center">Ceiling light<br/>store</h1>
                <p className="text-[22px] text-[#E3A8D2] font-medium text-center tracking-wide">Excellence in overhead lighting</p>
              </div>
              <div className="absolute right-0 top-0 h-full w-[45%] flex justify-end">
                 <img src="https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=600&q=80" alt="Kitchen Lighting" className="h-full w-full object-cover" />
              </div>
              <div className="absolute bottom-0 w-full h-[52px] bg-black/85 flex items-center pl-8">
                 <p className="text-white text-[22px] font-bold">Surface Lights and Battens. Installation available for False Ceilings</p>
              </div>
            </div>

            <div className="bg-white rounded-none w-full mb-6 relative group/carousel1">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Light up your space</h2>
              <button onClick={() => scrollSlider(lightingSliderRef, 'left')} className="absolute left-0 top-[60%] -translate-y-1/2 z-40 bg-white/95 hover:bg-white border border-gray-300 text-gray-800 w-10 h-[100px] flex items-center justify-center shadow-md text-2xl font-light rounded-r-md">&#8249;</button>
              <div ref={lightingSliderRef} className="flex overflow-x-auto gap-4 pb-2 scrollbar-none scroll-smooth" style={{ scrollbarWidth: 'none' }}>
                {lightingBrands.map((item: any, idx: number) => {
                  const prices = [
                    { old: 349, new: 89, off: "74%" },
                    { old: 199, new: 57, off: "71%" },
                    { old: 685, new: 225, off: "67%" },
                    { old: 155, new: 55, off: "65%" },
                    { old: 550, new: 205, off: "63%" },
                    { old: 700, new: 189, off: "73%" }
                  ];
                  const ratings = [2157, 12437, 8611, 4841, 1877, 10785];
                  const p = prices[idx % prices.length];
                  const r = ratings[idx % ratings.length];

                  return (
                  <div key={item.id} className="flex-shrink-0 w-[200px] flex flex-col border border-gray-200 hover:shadow-lg transition-shadow bg-white rounded-sm pb-3">
                    <div className="w-full h-[200px] flex items-center justify-center overflow-hidden mb-2 bg-[#F7F7F7]">
                      <img src={item.image_url} alt={item.title} className="max-h-[90%] max-w-[90%] object-contain mix-blend-multiply" />
                    </div>
                    <div className="text-center px-2">
                      <p className="text-sm font-bold text-gray-900 mb-1">{item.title}</p>
                      <div className="flex items-center justify-center mb-1">
                        <span className="text-[#DE7921] text-sm">★★★★☆</span>
                        <span className="text-xs text-[#007185] ml-1">{r.toLocaleString()}</span>
                      </div>
                      <div className="flex items-baseline justify-center gap-1 mb-1">
                        <span className="text-lg font-bold text-[#B12704]">₹{p.new}</span>
                        <span className="text-xs text-gray-500 line-through">₹{p.old}</span>
                        <span className="text-xs text-gray-500">({p.off} off)</span>
                      </div>
                      <div className="bg-[#CC0C39] text-white text-[11px] font-bold px-2 py-0.5 rounded-sm w-max mx-auto mb-1">Limited time deal</div>
                      <div className="text-[11px] mt-1 text-gray-700">
                        <span className="bg-[#71B214] text-white px-1.5 py-0.5 rounded-sm mr-1">Savings</span>Buy 2 items, get 2% off
                      </div>
                    </div>
                  </div>
                )})}
              </div>
              <button onClick={() => scrollSlider(lightingSliderRef, 'right')} className="absolute right-0 top-[60%] -translate-y-1/2 z-40 bg-white/95 hover:bg-white border border-gray-300 text-gray-800 w-10 h-[100px] flex items-center justify-center shadow-md text-2xl font-light rounded-l-md">&#8250;</button>
            </div>
          </div>\n`;

content = content.replace(
  `        ) : isDecorCategory ? (`,
  lightingMainUI + `        ) : isDecorCategory ? (`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Replaced successfully');
