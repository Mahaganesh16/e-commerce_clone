// src/app/api/products/[id]/route.ts
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Shreetech@123',
  database: 'amazon_clone',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('=== Fetching product id:', id);

    // First, find what the primary key column is called
    const [cols]: any = await pool.query(
      `SELECT COLUMN_NAME FROM information_schema.COLUMNS 
       WHERE TABLE_SCHEMA = 'amazon_clone' 
       AND TABLE_NAME = 'section_items' 
       AND COLUMN_KEY = 'PRI'`
    );

    const pkCol = cols.length > 0 ? cols[0].COLUMN_NAME : 'id';
    console.log('=== Primary key column:', pkCol);

    const [rows]: any = await pool.query(
      `SELECT * FROM section_items WHERE \`${pkCol}\` = ?`,
      [id]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'Product not found', id, pkCol }, { status: 404 });
    }

    // Normalize the id field
    const item = rows[0];
    const normalized = {
      ...item,
      id: item.id ?? item.item_id ?? item.product_id ?? item.ID ?? id,
    };

    return NextResponse.json(normalized);
  } catch (error: any) {
    console.error('Product fetch error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}