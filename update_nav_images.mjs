import mysql from 'mysql2/promise';

async function updateCategoryImages() {
  const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Shreetech@123',
    database: 'amazon_clone',
    port: 3306
  });

  try {
    const categoriesData = {
      "Bestsellers": [
        "https://m.media-amazon.com/images/I/71xb2xkN5qL._AC_SY200_.jpg",
        "https://m.media-amazon.com/images/I/61EXU8BuGZL._AC_SY200_.jpg",
        "https://m.media-amazon.com/images/I/81QpkIctqPL._AC_SY200_.jpg",
        "https://m.media-amazon.com/images/I/71jG+e7roXL._AC_SY200_.jpg",
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
      ],
      "Today's Deals": [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400"
      ],
      "Mobiles": [
        "https://m.media-amazon.com/images/I/71d1ytcCntL._AC_SY200_.jpg",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
        "https://m.media-amazon.com/images/I/71v2jVh6nIL._AC_SY200_.jpg",
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400",
        "https://images.unsplash.com/photo-1565630916779-e303be97b6f5?w=400"
      ],
      "Electronics": [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
        "https://images.unsplash.com/photo-1527698266440-12104e498b76?w=400"
      ],
      "Fashion": [
        "https://m.media-amazon.com/images/I/61irmRn+6LL._AC_SY200_.jpg",
        "https://m.media-amazon.com/images/I/71fFKeHHo7L._AC_SY200_.jpg",
        "https://m.media-amazon.com/images/I/81XlIoVdx2L._AC_SY200_.jpg",
        "https://m.media-amazon.com/images/I/718F+0RgtfL._AC_SY200_.jpg",
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400"
      ],
      "Home & Kitchen": [
        "https://m.media-amazon.com/images/I/71rCioa7fGL._AC_SY200_.jpg",
        "https://m.media-amazon.com/images/I/61gHu9NWDmL._AC_SY200_.jpg",
        "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=400",
        "https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?w=400",
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400"
      ],
      "Computers": [
        "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_SY200_.jpg",
        "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400",
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
        "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=400"
      ],
      "Toys & Games": [
        "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400",
        "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=400",
        "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400",
        "https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=400",
        "https://images.unsplash.com/photo-1608889175123-8ec330b86f84?w=400"
      ],
      "Car & Motorbike": [
        "https://images.unsplash.com/photo-1618083707368-b3823daa2726?w=400",
        "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=400",
        "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400",
        "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400",
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400"
      ]
    };

    for (const [catName, imageUrls] of Object.entries(categoriesData)) {
      const [existingCat] = await pool.query('SELECT id FROM categories WHERE name = ?', [catName]);
      if (existingCat.length > 0) {
        const catId = existingCat[0].id;
        
        const [items] = await pool.query('SELECT id FROM category_images WHERE category_id = ? ORDER BY id ASC LIMIT 5', [catId]);
        
        for (let i = 0; i < items.length; i++) {
          await pool.query('UPDATE category_images SET image_url = ? WHERE id = ?', [imageUrls[i], items[i].id]);
        }
        console.log(`Updated images for: ${catName}`);
      }
    }
    
    console.log("Successfully updated all navbar category images with accurate Amazon URLs!");
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

updateCategoryImages();
