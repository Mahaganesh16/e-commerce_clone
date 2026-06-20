import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Missing parameters' }, { status: 400 });
    }

    // Check if email already exists
    const [existing]: any = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 409 });
    }

    // Insert new user
    const [result]: any = await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );

    return NextResponse.json({ success: true, id: result.insertId, name });
  } catch (error: any) {
    console.error("Register Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}