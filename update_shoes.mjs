import mysql from 'mysql2/promise';

async function updateShoes() {
  const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Shreetech@123',
    database: 'amazon_clone',
    port: 3306
  });

  try {
    const queries = [
      { id: 1, url: 'https://m.media-amazon.com/images/I/812vmmHIwvL._AC_SY200_.jpg' },
      { id: 2, url: 'https://m.media-amazon.com/images/I/71VFqT7ZwZL._AC_SY200_.jpg' },
      { id: 3, url: 'https://m.media-amazon.com/images/I/812vmmHIwvL._AC_SY200_.jpg' },
      { id: 4, url: 'https://m.media-amazon.com/images/I/71VFqT7ZwZL._AC_SY200_.jpg' },
      { id: 5, url: 'https://m.media-amazon.com/images/I/81FRqCRuySL._AC_SY200_.jpg' }
    ];

    for (let i = 0; i < queries.length; i++) {
      // Create slight variations in title so they are not exactly the same, but all match "shoes"
      const titles = [
        "Casual Sneakers Running Shoes",
        "Men's Athletic Running Shoes",
        "Sport Lightweight Running Shoes",
        "Breathable Fitness Running Shoes",
        "Premium Comfort Running Shoes"
      ];
      const prices = [1999, 1499, 1799, 2199, 2499];
      const mrps = [2699, 2499, 2999, 3499, 3999];

      await pool.execute(
        `UPDATE section_items 
         SET image_url = ?, 
             title = ?, 
             price = ?, 
             mrp = ?, 
             star_rating = '4.4' 
         WHERE id = ?`,
        [queries[i].url, titles[i], prices[i], mrps[i], queries[i].id]
      );
    }
    console.log("Successfully updated the running shoes in the database!");
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

updateShoes();
