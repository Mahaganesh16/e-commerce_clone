import mysql from 'mysql2/promise';

async function updateShoeDetails() {
  const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Shreetech@123',
    database: 'amazon_clone',
    port: 3306
  });

  try {
    const details = {
      brand: 'Generic Official',
      model: 'Sports-2026 Edition',
      colour: 'Multicolor/Black',
      item_weight: '350 Grams',
      warranty: '6 Months Manufacturer Warranty',
      about_item: '<li>Breathable Mesh Upper: Keeps your feet cool and dry during intense workouts or casual walks.</li><li>Shock Absorption Sole: Provides excellent cushioning to protect your knees and ankles from impact.</li><li>Anti-Slip Outsole: Features advanced traction patterns for superior grip on both indoor and outdoor surfaces.</li><li>Lightweight Design: Engineered for maximum comfort without weighing you down.</li>'
    };

    await pool.execute(
      `UPDATE section_items 
       SET brand = ?, 
           model = ?, 
           colour = ?, 
           item_weight = ?, 
           warranty = ?, 
           about_item = ?
       WHERE LOWER(title) LIKE '%running shoes%'`,
      [details.brand, details.model, details.colour, details.item_weight, details.warranty, details.about_item]
    );

    console.log("Successfully updated product details for all running shoes!");
  } catch (err) {
    console.error("Error updating shoe details:", err);
  } finally {
    pool.end();
  }
}

updateShoeDetails();
