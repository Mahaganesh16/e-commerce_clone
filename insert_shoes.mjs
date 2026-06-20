import mysql from 'mysql2/promise';

async function insertShoes() {
  const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Shreetech@123',
    database: 'amazon_clone',
    port: 3306
  });

  try {
    // 1. Delete old ones to prevent duplicates
    await pool.execute(`DELETE FROM section_items WHERE LOWER(title) LIKE '%running shoes%';`);

    // 2. Insert the fresh 5 items
    const shoes = [
      { url: 'https://m.media-amazon.com/images/I/812vmmHIwvL._AC_SY200_.jpg', title: "Casual Sneakers Running Shoes", price: 1999, mrp: 2699 },
      { url: 'https://m.media-amazon.com/images/I/71VFqT7ZwZL._AC_SY200_.jpg', title: "Men's Athletic Running Shoes", price: 1599, mrp: 2499 },
      { url: 'https://m.media-amazon.com/images/I/812vmmHIwvL._AC_SY200_.jpg', title: "Sport Lightweight Running Shoes", price: 1799, mrp: 2999 },
      { url: 'https://m.media-amazon.com/images/I/71VFqT7ZwZL._AC_SY200_.jpg', title: "Breathable Fitness Running Shoes", price: 2199, mrp: 3499 },
      { url: 'https://m.media-amazon.com/images/I/81FRqCRuySL._AC_SY200_.jpg', title: "Premium Comfort Running Shoes", price: 2499, mrp: 3999 }
    ];

    for (const shoe of shoes) {
      await pool.execute(
        `INSERT INTO section_items (section_id, title, image_url, price, mrp, star_rating) 
         VALUES (5, ?, ?, ?, ?, '4.4')`,
        [shoe.title, shoe.url, shoe.price, shoe.mrp]
      );
    }
    
    console.log("Successfully inserted 5 running shoes!");
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

insertShoes();
