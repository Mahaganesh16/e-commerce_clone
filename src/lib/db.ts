// src/lib/db.ts
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Shreetech@123', 
  database: 'amazon_clone',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default db;