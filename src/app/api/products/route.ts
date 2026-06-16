// src/app/api/products/route.ts
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

export async function GET() {
  try {
    const [sections]: any = await pool.query('SELECT * FROM homepage_sections');
    const [items]: any = await pool.query('SELECT * FROM section_items');

    if (items.length > 0) {
      console.log('=== section_items COLUMNS ===', Object.keys(items[0]));
      console.log('=== SAMPLE ITEM ===', items[0]);
    }

    // Normalize: make sure every item has an "id" field
    const normalizedItems = items.map((item: any) => ({
      ...item,
      // Support any common id column name
      id: item.id ?? item.item_id ?? item.product_id ?? item.ID ?? null,
    }));

    const formattedData = sections.map((section: any) => ({
      id: section.id,
      title: section.title,
      link_text: section.link_text,
      single_image: section.single_image,
      items: normalizedItems.filter((item: any) => item.section_id === section.id)
    }));

    return NextResponse.json(formattedData);
  } catch (error: any) {
    console.error('DB error:', error.message);
    return NextResponse.json({ error: 'DB error', detail: error.message }, { status: 500 });
  }
}