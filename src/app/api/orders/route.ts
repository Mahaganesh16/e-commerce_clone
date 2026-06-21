import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { total_amount, address_name, address_mobile, address_pincode, address_full, payment_method, product_summary } = body;

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
      'INSERT INTO orders (user_id, total_amount, address_name, address_mobile, address_pincode, address_full, payment_method, product_summary, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [1, total_amount, address_name, address_mobile, address_pincode, address_full, payment_method, product_summary, 'Success']
    );

    await db.end();

    return NextResponse.json({ success: true, message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error placing order:', error);
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
  }
}
