import mysql from 'mysql2/promise';

async function replaceAllUnsplash() {
  const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Shreetech@123',
    database: 'amazon_clone',
    port: 3306
  });

  try {
    const replacements = [
      // Shoes / Footwear
      {
        keyword: 'Shoe',
        url: 'https://m.media-amazon.com/images/I/81XlIoVdx2L._AC_SY145_.jpg'
      },
      {
        keyword: 'Sneaker',
        url: 'https://m.media-amazon.com/images/I/81XlIoVdx2L._AC_SY145_.jpg'
      },
      // Apparel / Kids / Dresses
      {
        keyword: 'Dress',
        url: 'https://m.media-amazon.com/images/I/61irmRn+6LL._AC_SY145_.jpg'
      },
      {
        keyword: 'Jeans',
        url: 'https://m.media-amazon.com/images/I/61irmRn+6LL._AC_SY145_.jpg'
      },
      {
        keyword: 'Blazer',
        url: 'https://m.media-amazon.com/images/I/61irmRn+6LL._AC_SY145_.jpg'
      },
      {
        keyword: 'Hoodie',
        url: 'https://m.media-amazon.com/images/I/61irmRn+6LL._AC_SY145_.jpg'
      },
      {
        keyword: 'Suit',
        url: 'https://m.media-amazon.com/images/I/61irmRn+6LL._AC_SY145_.jpg'
      },
      // Beauty (Soap, Wash, Cleanser, Serum)
      {
        keyword: 'Soap',
        url: 'https://m.media-amazon.com/images/I/718F+0RgtfL._AC_SY170_.jpg'
      },
      {
        keyword: 'Wash',
        url: 'https://m.media-amazon.com/images/I/51Hk+Bih7XL._AC_SY170_.jpg'
      },
      {
        keyword: 'Cleanser',
        url: 'https://m.media-amazon.com/images/I/51Hk+Bih7XL._AC_SY170_.jpg'
      },
      {
        keyword: 'Serum',
        url: 'https://m.media-amazon.com/images/I/51Hk+Bih7XL._AC_SY170_.jpg'
      },
      // Home / Kitchen
      {
        keyword: 'Bags',
        url: 'https://m.media-amazon.com/images/I/71erHCKJ3WL._AC_SY170_.jpg'
      },
      {
        keyword: 'Scale',
        url: 'https://m.media-amazon.com/images/I/71775fRr+gL._AC_SY170_.jpg'
      },
      {
        keyword: 'Bottle',
        url: 'https://m.media-amazon.com/images/I/71qK1R-BkhL._AC_SY170_.jpg'
      },
      {
        keyword: 'Flask',
        url: 'https://m.media-amazon.com/images/I/71qK1R-BkhL._AC_SY170_.jpg'
      },
      {
        keyword: 'Utensils',
        url: 'https://m.media-amazon.com/images/I/71rCioa7fGL._AC_UL480_FMwebp_QL65_.jpg'
      },
      {
        keyword: 'Mug',
        url: 'https://m.media-amazon.com/images/I/61H+V-O6A-L._AC_SY170_.jpg'
      },
      {
        keyword: 'Candle',
        url: 'https://m.media-amazon.com/images/I/61H+V-O6A-L._AC_SY170_.jpg'
      }
    ];

    for (const rep of replacements) {
      await pool.execute(
        `UPDATE category_images 
         SET image_url = ? 
         WHERE image_url LIKE '%unsplash%' AND title LIKE ?`,
        [rep.url, `%${rep.keyword}%`]
      );
    }

    console.log("All bad unsplash images safely replaced with category-specific Amazon links.");
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

replaceAllUnsplash();
