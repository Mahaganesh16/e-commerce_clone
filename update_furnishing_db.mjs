import mysql from 'mysql2/promise';

async function updateFurnishingDB() {
  const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Shreetech@123', 
    database: 'amazon_clone',
  });

  try {
    // 1. Create Trends of the Season Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS trends_of_season (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        image_url VARCHAR(500) NOT NULL,
        link_text VARCHAR(100) DEFAULT 'Shop now'
      );
    `);

    // Clean it first in case of re-run
    await db.query('TRUNCATE TABLE trends_of_season');

    await db.query(`
      INSERT INTO trends_of_season (title, image_url) VALUES 
      ('Kids furnishings', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/Kids._SS400_QL85_.jpg'),
      ('Peach Fuzz', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/Peach._SS400_QL85_.jpg'),
      ('India Inspired', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/India_inspired._SS400_QL85_.jpg'),
      ('Cotton edit', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/Cotton_edit._SS400_QL85_.jpg'),
      ('Bohemian styling', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/Bohemian._SS400_QL85_.jpg'),
      ('Evergreen florals', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/Florals._SS400_QL85_.jpg');
    `);

    // 2. Ensure furnishing_brands has the 6 items
    await db.query('TRUNCATE TABLE furnishing_brands');
    await db.query(`
      INSERT INTO furnishing_brands (name, image_url) VALUES 
      ('Story@Home', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/Story_Home._SS400_QL85_.jpg'),
      ('Layers', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/Layers._SS400_QL85_.jpg'),
      ('Solimo', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/Solimo._SS400_QL85_.jpg'),
      ('BSB Home', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/BSB_Home._SS400_QL85_.jpg'),
      ('Cortina', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/Cortina._SS400_QL85_.jpg'),
      ('Wakefit', 'https://m.media-amazon.com/images/G/31/IMG20/Home/2024/HFRevamp/Wakefit._SS400_QL85_.jpg');
    `);

    console.log("Furnishing tables updated successfully!");
  } catch (err) {
    console.error("Error updating furnishing DB:", err);
  } finally {
    await db.end();
  }
}

updateFurnishingDB();
