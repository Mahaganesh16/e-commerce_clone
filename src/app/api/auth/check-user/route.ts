import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const [users]: any = await db.query('SELECT id, name FROM users WHERE email = ?', [email]);

    if (users.length > 0) {
      return NextResponse.json({ exists: true, name: users[0].name });
    } else {
      return NextResponse.json({ exists: false });
    }
  } catch (error: any) {
    console.error("check-user Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
