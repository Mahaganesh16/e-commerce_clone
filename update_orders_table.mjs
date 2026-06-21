import mysql from 'mysql2/promise';

async function updateTable() {
  const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Shreetech@123', 
    database: 'amazon_clone',
  });

  try {
    await db.query(`
      ALTER TABLE orders ADD COLUMN address TEXT NOT NULL;
    `);
    console.log("Orders table updated successfully with address column");
  } catch (err) {
    if (err.code === 'ER_DUP_FIELDNAME') {
      console.log("Address column already exists.");
    } else {
      console.error("Error updating orders table:", err);
    }
  } finally {
    await db.end();
  }
}

updateTable();
