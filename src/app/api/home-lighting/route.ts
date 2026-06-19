// src/app/api/home-lighting/route.ts
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Establish a database connection pool matching your table workspace parameters
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'Shreetech@123', // 🌟 Replace this with your exact MySQL root password
  database: 'amazon_clone',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 5
});

export async function GET() {
  try {
    // Query your newly created home_lighting table containing your 5 brand rows
    const [rows] = await pool.execute('SELECT * FROM home_lighting ORDER BY id ASC');
    
    // Return the rows as a clean array response to your frontend search page fetch hook
    return NextResponse.json(Array.isArray(rows) ? rows : []);
  } catch (error: any) {
    console.error("❌ SQL Layout execution error inside api/home-lighting:", error.message);
    return NextResponse.json(
      { error: "Database query failed", details: error.message },
      { status: 500 }
    );
  }
}