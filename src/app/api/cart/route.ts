import { NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email') || 'anonymous';
    
    const [rows] = await db.query('SELECT * FROM cart_items WHERE user_email = ?', [email]);
    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, image_url, price, email } = body;
    const userEmail = email || 'anonymous';

    if (!title || !image_url || price === undefined) {
      return NextResponse.json({ message: 'Missing parameters' }, { status: 400 });
    }

    // Check if item already exists
    const [existing]: any = await db.query('SELECT id, quantity FROM cart_items WHERE title = ? AND user_email = ?', [title, userEmail]);
    
    if (existing.length > 0) {
      const newQuantity = existing[0].quantity + 1;
      await db.query('UPDATE cart_items SET quantity = ? WHERE id = ?', [newQuantity, existing[0].id]);
      return NextResponse.json({ message: 'Item quantity updated', id: existing[0].id });
    }

    const [result]: any = await db.query(
      'INSERT INTO cart_items (title, image_url, price, quantity, user_email) VALUES (?, ?, ?, 1, ?)',
      [title, image_url, price, userEmail]
    );

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
