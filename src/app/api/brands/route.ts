// src/app/api/brands/route.ts
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Initialize a connection pool once to handle server requests reliably
const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Shreetech@123', // Ensure this matches your MySQL Workbench password
  database: process.env.DB_NAME || 'amazon_clone',
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function GET() {
  try {
    // 🌟 Fetch database entries directly via the pool instance
    const [rows] = await pool.execute('SELECT * FROM furnishing_brands');
    
    // Fallback safe-guard array if rows are returned null or undefined
    const safeData = Array.isArray(rows) ? rows : [];
    
    return NextResponse.json(safeData);
  } catch (error: any) {
    console.error("❌ Database route failure inside api/brands:", error.message);
    
    // Return a structured error response array context back to the client
    return NextResponse.json(
      { error: "Failed to read data structure references", details: error.message }, 
      { status: 500 }
    );
  }
}