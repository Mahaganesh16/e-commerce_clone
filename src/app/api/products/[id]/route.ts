// src/app/api/products/[id]/route.ts
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'Shreetech@123',
  database: 'amazon_clone',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Helper function to safely determine which table contains the product ID
async function determineTableName(id: string): Promise<string> {
  const tables = ['air_conditioners', 'refrigerators', 'microwaves', 'washing_machines', 'section_items'];
  
  for (const table of tables) {
    try {
      const [rows]: any = await pool.query(
        `SELECT 1 FROM information_schema.tables WHERE table_schema = 'amazon_clone' AND table_name = ?`,
        [table]
      );
      if (rows.length > 0) {
        const [check]: any = await pool.query(`SELECT id FROM \`${table}\` WHERE id = ? LIMIT 1`, [id]);
        if (check.length > 0) {
          return table;
        }
      }
    } catch {
      continue;
    }
  }
  return 'section_items'; // Safe fallback baseline table
}

// 1. READ (GET Single Product Details)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tableName = await determineTableName(id);

    const [rows]: any = await pool.query(
      `SELECT * FROM \`${tableName}\` WHERE id = ?`,
      [id]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'Product not found', id }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error: any) {
    console.error('❌ Product fetch error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 2. UPDATE (PUT Modified Product Fields)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const tableName = await determineTableName(id);

    // 🌟 FIXED: Changed 'model_number' to 'model' to match the updated MySQL column name structure
    const { 
      title, brand, model, colour, star_rating, 
      item_weight, warranty, price, mrp, about_item 
    } = body;

    await pool.query(
      `UPDATE \`${tableName}\` SET 
        title = ?, 
        brand = ?, 
        model = ?, 
        colour = ?, 
        star_rating = ?, 
        item_weight = ?, 
        warranty = ?, 
        price = ?, 
        mrp = ?, 
        about_item = ? 
       WHERE id = ?`,
      [
        title, brand, model, colour, star_rating, 
        item_weight, warranty, Number(price) || 0, Number(mrp) || 0, about_item, 
        id
      ]
    );

    return NextResponse.json({ message: "Product updated successfully in the database!" });
  } catch (error: any) {
    console.error('❌ Product update error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 3. DELETE (DELETE Product Row Record)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tableName = await determineTableName(id);

    await pool.query(
      `DELETE FROM \`${tableName}\` WHERE id = ?`,
      [id]
    );

    return NextResponse.json({ message: "Product permanently removed from the database" });
  } catch (error: any) {
    console.error('❌ Product deletion error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}