import mysql from 'mysql2/promise';

async function seed() {
  const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Shreetech@123',
    database: 'amazon_clone',
    port: 3306
  });

  try {
    const [categories] = await pool.execute('SELECT * FROM categories');
    const catMap = {};
    categories.forEach(c => {
      catMap[c.name] = c.id;
    });

    // Helper to insert 5 items quickly
    const insertItems = async (catName, itemsData) => {
      const cid = catMap[catName];
      if (!cid) return;
      for (const item of itemsData) {
        await pool.execute(
          `INSERT INTO category_images (category_id, title, image_url, price, mrp) VALUES (?, ?, ?, ?, ?)`,
          [cid, item.title, item.url, item.price, item.mrp]
        );
      }
    };

    // Clean first
    await pool.execute('TRUNCATE TABLE category_images');

    // 1. Running Shoes (Migrate from old section_items)
    const [runningShoes] = await pool.execute("SELECT * FROM section_items WHERE LOWER(title) LIKE '%running shoes%'");
    if (runningShoes.length > 0) {
      for (const shoe of runningShoes) {
        await pool.execute(
          `INSERT INTO category_images (category_id, title, image_url, price, mrp, star_rating, brand, model, colour, item_weight, warranty, about_item) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [catMap["Running Shoes"], shoe.title, shoe.image_url, shoe.price, shoe.mrp, shoe.star_rating, shoe.brand, shoe.model, shoe.colour, shoe.item_weight, shoe.warranty, shoe.about_item]
        );
      }
    } else {
      await insertItems("Running Shoes", [
        { title: "Casual Sneakers Running Shoes", url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", price: 1999, mrp: 2699 },
        { title: "Men's Athletic Running Shoes", url: "https://m.media-amazon.com/images/I/71VFqT7ZwZL._AC_SY200_.jpg", price: 1599, mrp: 2499 },
        { title: "Sport Lightweight Running Shoes", url: "https://m.media-amazon.com/images/I/812vmmHIwvL._AC_SY200_.jpg", price: 1799, mrp: 2999 },
        { title: "Breathable Fitness Running Shoes", url: "https://m.media-amazon.com/images/I/71VFqT7ZwZL._AC_SY200_.jpg", price: 2199, mrp: 3499 },
        { title: "Premium Comfort Running Shoes", url: "https://m.media-amazon.com/images/I/81FRqCRuySL._AC_SY200_.jpg", price: 2499, mrp: 3999 }
      ]);
    }

    // 2. Women Apparel
    await insertItems("Women Apparel", [
      { title: "Women White Minimalist T-Shirt", url: "https://m.media-amazon.com/images/I/61irmRn+6LL._AC_SY145_.jpg", price: 599, mrp: 999 },
      { title: "Floral Summer Dress", url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1", price: 1299, mrp: 1999 },
      { title: "Classic Blue Denim Jeans", url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246", price: 1499, mrp: 2499 },
      { title: "Women Casual Blazer", url: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d", price: 1999, mrp: 2999 },
      { title: "Comfort Cotton Nightwear", url: "https://images.unsplash.com/photo-1502716115624-b565e498caa5", price: 899, mrp: 1499 }
    ]);

    // 3. Kids Wear
    await insertItems("Kids Wear", [
      { title: "Kids Traditional Ethnic Wear Set", url: "https://m.media-amazon.com/images/I/71fFKeHHo7L._AC_SY145_.jpg", price: 899, mrp: 1299 },
      { title: "Boys Casual Cotton T-Shirt", url: "https://images.unsplash.com/photo-1519238263530-99abad67b853", price: 399, mrp: 699 },
      { title: "Girls Princess Party Dress", url: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7", price: 1199, mrp: 1999 },
      { title: "Kids Winter Hoodie", url: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8", price: 799, mrp: 1499 },
      { title: "Toddler Comfortable Night Suit", url: "https://images.unsplash.com/photo-1519689680058-324335c77eba", price: 499, mrp: 899 }
    ]);

    // 4. Athletic Footwear
    await insertItems("Athletic Footwear", [
      { title: "Grey Athletic Footwear", url: "https://m.media-amazon.com/images/I/81XlIoVdx2L._AC_SY145_.jpg", price: 1599, mrp: 2499 },
      { title: "Professional Basketball Shoes", url: "https://images.unsplash.com/photo-1549298916-b41d501d3772", price: 2999, mrp: 4999 },
      { title: "Lightweight Tennis Shoes", url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5", price: 1899, mrp: 2999 },
      { title: "Men's Training Gym Shoes", url: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111", price: 1499, mrp: 2299 },
      { title: "Women's Walking Sneakers", url: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2", price: 1699, mrp: 2599 }
    ]);

    // 5. Soap Pack
    await insertItems("Soap Pack", [
      { title: "Premium Natural Soap Bars Pack", url: "https://m.media-amazon.com/images/I/718F+0RgtfL._AC_SY170_.jpg", price: 299, mrp: 499 },
      { title: "Ayurvedic Sandalwood Soap (Set of 4)", url: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec", price: 349, mrp: 599 },
      { title: "Activated Charcoal Detox Soap", url: "https://images.unsplash.com/photo-1611078449945-81d5f190696b", price: 199, mrp: 299 },
      { title: "Lavender Essential Oil Bath Soap", url: "https://images.unsplash.com/photo-1607006411062-0941913101eb", price: 249, mrp: 399 },
      { title: "Organic Turmeric Skin Brightening Soap", url: "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c", price: 279, mrp: 450 }
    ]);

    // 6. Face Wash
    await insertItems("Face Wash", [
      { title: "Refreshing Organic Face Wash Gel", url: "https://images.unsplash.com/photo-1556228720-195a672e8a03", price: 199, mrp: 299 },
      { title: "Tea Tree Anti-Acne Face Wash", url: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e", price: 249, mrp: 349 },
      { title: "Vitamin C Foaming Face Wash", url: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b", price: 299, mrp: 499 },
      { title: "Neem and Tulsi Purifying Face Wash", url: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571", price: 179, mrp: 250 },
      { title: "Deep Cleansing Exfoliating Face Wash", url: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6", price: 349, mrp: 550 }
    ]);

    // 7. Skin Cleanser
    await insertItems("Skin Cleanser", [
      { title: "Gentle Moisturizing Skin Cleanser", url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be", price: 399, mrp: 599 },
      { title: "Hydrating Facial Cleanser for Dry Skin", url: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571", price: 449, mrp: 699 },
      { title: "Oil-Free Acne Wash Cleanser", url: "https://images.unsplash.com/photo-1611078449945-81d5f190696b", price: 349, mrp: 499 },
      { title: "Daily Foaming Skin Cleanser", url: "https://images.unsplash.com/photo-1608248593875-7b5879a9446d", price: 299, mrp: 450 },
      { title: "Micellar Water Makeup Remover Cleanser", url: "https://images.unsplash.com/photo-1556228720-195a672e8a03", price: 499, mrp: 750 }
    ]);

    // 8. Facial Serums
    await insertItems("Facial Serums", [
      { title: "Luxury Facial Protection Serums", url: "https://images.unsplash.com/photo-1608248597481-496100c80836", price: 799, mrp: 1299 },
      { title: "Vitamin C 20% Glow Face Serum", url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be", price: 699, mrp: 999 },
      { title: "Hyaluronic Acid Hydrating Serum", url: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e", price: 599, mrp: 899 },
      { title: "Retinol Anti-Aging Night Serum", url: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b", price: 899, mrp: 1499 },
      { title: "Niacinamide Blemish Control Serum", url: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571", price: 649, mrp: 1099 }
    ]);

    // 9. Garbage Bags
    await insertItems("Garbage Bags", [
      { title: "Stainless Steel Garbage Disposal Bags", url: "https://m.media-amazon.com/images/I/71erHCKJ3WL._AC_SY170_.jpg", price: 199, mrp: 299 },
      { title: "Biodegradable Trash Bags (Pack of 30)", url: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9", price: 249, mrp: 399 },
      { title: "Heavy Duty Black Garbage Bags XXL", url: "https://images.unsplash.com/photo-1550524451-b84ce7e01db1", price: 349, mrp: 499 },
      { title: "Scented Kitchen Trash Bags", url: "https://images.unsplash.com/photo-1605600659873-d808a1d85f26", price: 299, mrp: 450 },
      { title: "Small Dustbin Liners (Pack of 60)", url: "https://images.unsplash.com/photo-1586326162125-90d56e0996dc", price: 149, mrp: 250 }
    ]);

    // 10. Kitchen Scales
    await insertItems("Kitchen Scales", [
      { title: "Digital Electronic Kitchen Weight Scale", url: "https://m.media-amazon.com/images/I/71775fRr+gL._AC_SY170_.jpg", price: 399, mrp: 999 },
      { title: "Stainless Steel Food Weighing Scale", url: "https://images.unsplash.com/photo-1585237905186-b48ff2f59230", price: 599, mrp: 1299 },
      { title: "High Precision Pocket Gram Scale", url: "https://images.unsplash.com/photo-1607567839352-5a2a221f1d1f", price: 299, mrp: 799 },
      { title: "Smart Bluetooth Kitchen Scale", url: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d", price: 899, mrp: 1999 },
      { title: "Mechanical Analog Kitchen Scale", url: "https://images.unsplash.com/photo-1616440347437-b1c73416efc2", price: 499, mrp: 899 }
    ]);

    // 11. Water Bottles
    await insertItems("Water Bottles", [
      { title: "Insulated Sports Gym Water Bottle", url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8", price: 499, mrp: 999 },
      { title: "Stainless Steel Vacuum Flask 1L", url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee", price: 799, mrp: 1499 },
      { title: "Glass Water Bottle with Silicone Sleeve", url: "https://images.unsplash.com/photo-1523362628745-0c100150b504", price: 599, mrp: 1099 },
      { title: "Copper Water Bottle for Ayurveda", url: "https://images.unsplash.com/photo-1544816155-12df9643f363", price: 899, mrp: 1599 },
      { title: "Motivational 2L Water Bottle with Time Marker", url: "https://images.unsplash.com/photo-1596700030155-3211516e86df", price: 399, mrp: 799 }
    ]);

    // 12. Utensils Set
    await insertItems("Utensils Set", [
      { title: "Premium Silver Kitchen Utensils Set", url: "https://m.media-amazon.com/images/I/71rCioa7fGL._AC_UL480_FMwebp_QL65_.jpg", price: 1299, mrp: 2499 },
      { title: "Silicone Non-Stick Cooking Utensils Set", url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d", price: 899, mrp: 1999 },
      { title: "Wooden Spoons and Spatulas Set", url: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1", price: 599, mrp: 1299 },
      { title: "Stainless Steel Cutlery Set (24 Pieces)", url: "https://images.unsplash.com/photo-1603512278453-6ceb61671fc0", price: 1499, mrp: 2999 },
      { title: "Baking Utensils Kit", url: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35", price: 799, mrp: 1599 }
    ]);

    // 13. Small Businesses
    await insertItems("Small Businesses", [
      { title: "Handcrafted Ceramic Coffee Mug", url: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d", price: 399, mrp: 699 },
      { title: "Artisan Scented Soy Candle", url: "https://images.unsplash.com/photo-1603006905003-be475563bc59", price: 499, mrp: 899 },
      { title: "Organic Handmade Bath Soap", url: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec", price: 299, mrp: 499 },
      { title: "Custom Engraved Wooden Coasters", url: "https://images.unsplash.com/photo-1614036417651-1d051dfdb2bc", price: 599, mrp: 999 },
      { title: "Handwoven Cotton Throw Blanket", url: "https://images.unsplash.com/photo-1580828369019-2220d912b7a9", price: 1299, mrp: 2499 }
    ]);

    console.log("Database perfectly seeded with 5 items per category!");
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

seed();
