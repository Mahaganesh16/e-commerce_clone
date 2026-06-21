import mysql from 'mysql2/promise';

async function createTable() {
  const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Shreetech@123', 
    database: 'amazon_clone',
  });

  try {
    await db.query(`DROP TABLE IF EXISTS orders;`);
    await db.query(`
      CREATE TABLE orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT DEFAULT 1,
        total_amount DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'Success',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        address_name VARCHAR(255) NOT NULL,
        address_mobile VARCHAR(50) NOT NULL,
        address_pincode VARCHAR(20) NOT NULL,
        address_full TEXT NOT NULL,
        payment_method VARCHAR(50) NOT NULL,
        product_summary TEXT NOT NULL
      );
    `);
    console.log("Orders table created successfully");
  } catch (err) {
    console.error("Error creating orders table:", err);
  } finally {
    await db.end();
  }
}

createTable();
