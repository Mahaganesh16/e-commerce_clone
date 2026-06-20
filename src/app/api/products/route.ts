// src/app/api/products/route.ts
export const dynamic = 'force-dynamic'; // Ensures Next.js breaks the cache on every refresh

import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let rows: any[] = [];

    if (category) {
      const cleanCategory = category.toLowerCase().trim();

      // 0. CHECK IF IT MATCHES A DEDICATED CATEGORY IN category_images
      const [catResults]: any = await db.query(
        `SELECT id, name FROM categories WHERE LOWER(name) = ? OR LOWER(slug) = ?`,
        [cleanCategory, cleanCategory]
      );

      if (catResults.length > 0) {
        const catId = catResults[0].id;
        const [imgResults]: any = await db.query(
          `SELECT id, title, image_url, price, category_id as section_id 
           FROM category_images 
           WHERE category_id = ?`,
          [catId]
        );
        rows = imgResults;
      }
      // 1. STRICT WASHING MACHINE ROUTE
      else if (cleanCategory.includes('washing') || cleanCategory.includes('washer')) {
        const [results]: any = await db.query(
          `SELECT id, title, image_url, price, section_id 
           FROM section_items 
           WHERE LOWER(title) LIKE '%washing%' 
              OR LOWER(title) LIKE '%washer%'`
        );
        rows = results;
      }
      // 2. STRICT REFRIGERATOR ROUTE
      else if (cleanCategory.includes('refrigerator') || cleanCategory.includes('fridge')) {
        const [results]: any = await db.query(
          `SELECT id, title, image_url, price, section_id 
           FROM section_items 
           WHERE LOWER(title) LIKE '%refrigerator%' 
              OR LOWER(title) LIKE '%fridge%'`
        );
        rows = results;
      }
      // 3. STRICT AIR CONDITIONER ROUTE
      else if (cleanCategory === 'ac' || cleanCategory === 'air conditioner' || cleanCategory === 'air conditioners') {
        const [results]: any = await db.query(
          `SELECT id, title, image_url, price, section_id 
           FROM section_items 
           WHERE (LOWER(title) LIKE '%air conditioner%' 
              OR LOWER(title) LIKE '% ac %' 
              OR LOWER(title) LIKE 'ac %' 
              OR LOWER(title) LIKE '% ac')`
        );
        rows = results;
      }
      // 4. GENERAL FALLBACK ROUTE
      else {
        // Fallback to searching section_items and category_images
        const [results]: any = await db.query(
          `SELECT id, title, image_url, price, section_id FROM section_items WHERE LOWER(title) LIKE ?
           UNION
           SELECT id, title, image_url, price, category_id as section_id FROM category_images WHERE LOWER(title) LIKE ?`,
          [`%${cleanCategory}%`, `%${cleanCategory}%`]
        );
        rows = results;
      }
    } else {
      // Load all items if no category search parameter is passed (for homepage layout)
      const [results]: any = await db.query(
        `SELECT id, title, image_url, price, section_id FROM section_items
         UNION
         SELECT id, title, image_url, price, category_id as section_id FROM category_images`
      );
      rows = results;
    }

    // Standardize numeric properties format cleanly for your React components mapping layer
    const formattedRows = rows.map((item: any) => ({
      id: Number(item.id),
      title: item.title,
      image_url: item.image_url,
      price: item.price ? Number(item.price) : 0,
      section_id: item.section_id ? Number(item.section_id) : 1
    }));

    return NextResponse.json(formattedRows, { status: 200 });

  } catch (error) {
    console.error("MySQL Database retrieval error inside /api/products/route.ts:", error);
    return NextResponse.json(
      { error: "Failed to load filtered products from MySQL database" },
      { status: 500 }
    );
  }
}