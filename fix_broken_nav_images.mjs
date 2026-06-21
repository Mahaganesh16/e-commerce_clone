import mysql from 'mysql2/promise';
import axios from 'axios';

async function fixBrokenNavImages() {
  const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Shreetech@123',
    database: 'amazon_clone',
    port: 3306
  });

  const categories = [
    "Bestsellers", "Today's Deals", "Mobiles", "Electronics", 
    "Fashion", "Home & Kitchen", "Computers", "Toys & Games", "Car & Motorbike"
  ];

  try {
    for (const catName of categories) {
      const [existingCat] = await pool.query('SELECT id FROM categories WHERE name = ?', [catName]);
      if (existingCat.length === 0) continue;
      const catId = existingCat[0].id;
      
      const [items] = await pool.query('SELECT id, image_url FROM category_images WHERE category_id = ? ORDER BY id ASC LIMIT 5', [catId]);
      
      let workingImage = null;

      // 1. Find at least one working image
      for (const item of items) {
        if (item.image_url.includes('media-amazon.com')) {
          workingImage = item.image_url;
          console.log(`[TRUSTED] ${item.image_url}`);
          break;
        }
        try {
          // Use a GET request with stream to avoid downloading full file, or just head. Some servers block HEAD.
          const response = await axios.get(item.image_url, { 
            responseType: 'stream',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            },
            timeout: 5000 
          });
          if (response.status === 200) {
            workingImage = item.image_url;
            console.log(`[WORKING] ${item.image_url}`);
            break; // Found a working image
          }
        } catch (e) {
          console.log(`[BROKEN] ${item.image_url}`);
        }
      }

      // Fallback if absolutely none work in this category
      if (!workingImage) {
        workingImage = "https://m.media-amazon.com/images/I/71rCioa7fGL._AC_UL480_FMwebp_QL65_.jpg";
      }

      // 2. Test all images and replace broken ones with workingImage
      for (const item of items) {
        if (item.image_url.includes('media-amazon.com')) {
          continue;
        }
        try {
          const response = await axios.get(item.image_url, { 
            responseType: 'stream',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            },
            timeout: 5000 
          });
          if (response.status !== 200) throw new Error("Not 200");
        } catch (e) {
          // It's broken, replace it!
          console.log(`Replacing broken image ID ${item.id} with ${workingImage}`);
          await pool.query('UPDATE category_images SET image_url = ? WHERE id = ?', [workingImage, item.id]);
        }
      }
    }
    
    console.log("Successfully validated and fixed all broken images!");
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

fixBrokenNavImages();
