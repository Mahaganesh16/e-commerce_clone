import mysql from 'mysql2/promise';

async function fixAboutItem() {
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Shreetech@123',
    database: 'amazon_clone',
  });

  const tables = [
    'air_conditioners', 
    'refrigerators', 
    'microwaves', 
    'washing_machines', 
    'section_items', 
    'category_images'
  ];

  const defaultDescription = "Premium quality material and build\nHigh performance and durable design\nEasy to use and maintain\nEligible for return and replacement\nCheck manual for detailed instructions";

  try {
    for (const table of tables) {
      // First check if the table exists
      const [tableExists] = await pool.query(
        `SELECT 1 FROM information_schema.tables WHERE table_schema = 'amazon_clone' AND table_name = ?`,
        [table]
      );

      if (tableExists.length > 0) {
        // Update where about_item is NULL or empty
        const [result] = await pool.query(
          `UPDATE \`${table}\` 
           SET about_item = ? 
           WHERE about_item IS NULL OR about_item = ''`,
          [defaultDescription]
        );
        console.log(`✅ Updated ${result.affectedRows} rows in table: ${table}`);
      }
    }
    console.log("\n🎉 All NULL about_item columns have been fixed successfully!");
  } catch (error) {
    console.error("❌ Error fixing about_item:", error);
  } finally {
    await pool.end();
  }
}

fixAboutItem();
