import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'Shreetech@123',
  database: 'amazon_clone',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 5
});

export async function GET() {
  try {
    const [rows] = await pool.execute('SELECT * FROM home_storage');
    // The frontend expects { products: [...] } or an array?
    // Let's return both just in case, or just match what the frontend expects:
    // "if (res.data?.products) setStorageItems(res.data.products);"
    return NextResponse.json({ products: Array.isArray(rows) ? rows : [] });
  } catch (error: any) {
    console.error("Storage API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
