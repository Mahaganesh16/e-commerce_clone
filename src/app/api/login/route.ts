import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: 'Missing parameters error' }, { status: 400 });
    }

    const [users]: any = await db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);

    if (users.length > 0) {
      return NextResponse.json({ success: true, message: 'Welcome back!', name: users[0].name });
    }

    return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
  } catch (error: any) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}