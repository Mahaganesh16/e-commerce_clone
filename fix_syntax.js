const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', 'search', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// The replacement tool duplicated these lines because it fuzzy-matched backwards.
// Let's just find the duplicated block and remove it.

const badBlock = `      if (resFurnishing.data?.brands) setFurnishingBrands(resFurnishing.data.brands);
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
    });
  }, [category]);

  const scrollSlider = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 400; 
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleCategoryChange = (newCategory: string) => {
    router.push(\`/search?category=\${encodeURIComponent(newCategory)}\`);
  };

`;

// We'll replace the first occurrence of this exact bad block + the original block with just the original block.
// Or wait, it's easier to just use regex to remove the duplicate `scrollSlider` definition if it exists twice.

const duplicateScrollSlider = `  const scrollSlider = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 400; 
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleCategoryChange = (newCategory: string) => {
    router.push(\`/search?category=\${encodeURIComponent(newCategory)}\`);
  };`;

// Let's just split by "const scrollSlider ="
let parts = content.split("const scrollSlider =");
if (parts.length > 2) {
  // It's duplicated. Let's fix the file by taking the top part before the first scrollSlider, 
  // then the scrollSlider definition, then the part after the second scrollSlider definition.

  let newContent = parts[0] + "const scrollSlider =" + parts[1];
  
  // parts[1] ends with the start of the next one or something. 
  // Let's do a more robust string replace.
}

// Actually, I'll just restore from git or undo if possible. Nextjs compiler will tell me where the error is.
// Instead of messing with strings, let's just use `replace_file_content` to fix the specific lines.
