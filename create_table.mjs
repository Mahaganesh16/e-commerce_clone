import mysql from 'mysql2/promise';

async function createTable() {
  const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Shreetech@123', 
    database: 'amazon_clone',
  });

  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS cart_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        image_url TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        quantity INT DEFAULT 1
      );
    `);
    console.log("Table created successfully");
  } catch (err) {
    console.error("Error creating table:", err);
  } finally {
    await db.end();
  }
}

createTable();
