// src/app/api/home-decor/route.ts
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'Shreetech@123', // 🌟 Put your exact password here
  database: 'amazon_clone',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 5
});

export async function GET() {
  try {
    // 🌟 Queries exactly from your table as seen in your sidebar screenshot
    const [rows] = await pool.execute('SELECT * FROM home_decor_categories');
    return NextResponse.json(Array.isArray(rows) ? rows : []);
  } catch (error: any) {
    console.error("❌ SQL Layout execution error inside api/home-decor:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}