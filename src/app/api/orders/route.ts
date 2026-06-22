import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email') || 'anonymous';
    
    const db = await mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'Shreetech@123',
      database: 'amazon_clone',
    });

    const [rows] = await db.query(
      'SELECT * FROM orders WHERE user_email = ? ORDER BY created_at DESC', 
      [email]
    );
    await db.end();

    return NextResponse.json(rows);
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { total_amount, address_name, address_mobile, address_pincode, address_full, payment_method, product_summary, email, product_image } = body;
    const userEmail = email || 'anonymous';

    if (!total_amount || !payment_method || !address_name || !address_mobile || !address_pincode || !address_full || !product_summary) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = await mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'Shreetech@123',
      database: 'amazon_clone',
    });

    const [result] = await db.query(
      'INSERT INTO orders (user_id, user_email, total_amount, address_name, address_mobile, address_pincode, address_full, payment_method, product_summary, status, product_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [1, userEmail, total_amount, address_name, address_mobile, address_pincode, address_full, payment_method, product_summary, 'Success', product_image || null]
    );

    await db.end();

    return NextResponse.json({ success: true, message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error placing order:', error);
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
  }
}
