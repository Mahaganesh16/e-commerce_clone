import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  const hash = await bcrypt.hash(password, 10);

  await db.query(
    "INSERT INTO users(name,email,password) VALUES(?,?,?)",
    [name, email, hash]
  );

  return NextResponse.json({
    success: true,
  });
}