import mysql from 'mysql2/promise';

async function setup() {
  const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Shreetech@123',
    database: 'amazon_clone',
    port: 3306
  });

  try {
    console.log("Setting up tables...");

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) UNIQUE,
        slug VARCHAR(255) UNIQUE
      );
    `);

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS category_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category_id INT,
        title VARCHAR(255) NOT NULL,
        image_url VARCHAR(500) NOT NULL,
        price DECIMAL(10,2),
        mrp DECIMAL(10,2),
        star_rating VARCHAR(255) DEFAULT '4.3',
        brand VARCHAR(255) DEFAULT 'Generic',
        model VARCHAR(255) DEFAULT 'Standard',
        colour VARCHAR(255) DEFAULT 'Multicolor',
        item_weight VARCHAR(255) DEFAULT '500g',
        warranty VARCHAR(255) DEFAULT '1 Year',
        about_item TEXT,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
      );
    `);

    console.log("Tables created. Seeding categories...");

    const categories = [
      { name: "Running Shoes", slug: "shoes" },
      { name: "Women Apparel", slug: "women apparel" },
      { name: "Kids Wear", slug: "kids wear" },
      { name: "Athletic Footwear", slug: "athletic" },
      { name: "Soap Pack", slug: "soap pack" },
      { name: "Face Wash", slug: "face wash" },
      { name: "Skin Cleanser", slug: "skin cleanser" },
      { name: "Facial Serums", slug: "facial serums" },
      { name: "Garbage Bags", slug: "garbage bags" },
      { name: "Kitchen Scales", slug: "kitchen scales" },
      { name: "Water Bottles", slug: "water bottles" },
      { name: "Utensils Set", slug: "utensils set" },
      { name: "Small Businesses", slug: "small businesses" }
    ];

    for (const cat of categories) {
      await pool.execute(
        `INSERT IGNORE INTO categories (name, slug) VALUES (?, ?)`,
        [cat.name, cat.slug]
      );
    }

    console.log("Categories seeded successfully!");
  } catch (err) {
    console.error("Error setting up DB:", err);
  } finally {
    pool.end();
  }
}

setup();
