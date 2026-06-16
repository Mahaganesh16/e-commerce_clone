// src/app/api/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json(); // Clean parsing handler
    const { email, password } = body;

    // Direct true response to bypass and return home instantly
    if (email && password) {
      return NextResponse.json({ success: true, message: 'Welcome back bro!' });
    }

    return NextResponse.json({ message: 'Missing parameters error' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}