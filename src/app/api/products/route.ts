// src/app/api/products/route.ts
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// 🌟 CRITICAL FIX: இங்க உங்க ரியல் வொர்க் பெஞ்ச் பாஸ்வேர்ட்டை போடுங்க
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Shreetech@123', // e.g., 'root' அல்லது '1234' அல்லது நீங்க செட் பண்ண பாஸ்வேர்ட்
  database: 'amazon_clone',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function GET() {
  try {
    const [sections]: any = await pool.query('SELECT * FROM homepage_sections');
    const [items]: any = await pool.query('SELECT * FROM section_items');

    const formattedData = sections.map((section: any) => {
      return {
        id: section.id,
        title: section.title,
        link_text: section.link_text,
        single_image: section.single_image,
        items: items.filter((item: any) => item.section_id === section.id)
      };
    });

    return NextResponse.json(formattedData);
  } catch (error: any) {
    // டெர்மினல்ல என்ன எர்ரர் வருதுன்னு பாக்க இந்த கன்சோல் உதவும்
    console.error("Database connection runtime crash:", error.message);
    return NextResponse.json({ error: "MySQL integration layer down." }, { status: 500 });
  }
}