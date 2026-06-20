import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const [trends] = await db.query('SELECT * FROM trends_of_season');
    const [brands] = await db.query('SELECT * FROM furnishing_brands');

    return NextResponse.json({
      trends: Array.isArray(trends) ? trends : [],
      brands: Array.isArray(brands) ? brands : []
    });
  } catch (error: any) {
    console.error("Furnishing API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
