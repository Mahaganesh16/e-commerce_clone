import mysql from 'mysql2/promise';

async function createUsersTable() {
  const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Shreetech@123', 
    database: 'amazon_clone',
  });

  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Users table created successfully");
  } catch (err) {
    console.error("Error creating users table:", err);
  } finally {
    await db.end();
  }
}

createUsersTable();
