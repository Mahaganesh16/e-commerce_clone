import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.query('DELETE FROM cart_items WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Item removed from cart' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { quantity } = body;

    if (quantity === undefined || quantity < 1) {
      return NextResponse.json({ message: 'Invalid quantity' }, { status: 400 });
    }

    await db.query('UPDATE cart_items SET quantity = ? WHERE id = ?', [quantity, id]);
    return NextResponse.json({ success: true, message: 'Item quantity updated' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
