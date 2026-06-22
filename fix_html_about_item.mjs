import mysql from 'mysql2/promise';

async function fixHtmlTags() {
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

  try {
    let totalUpdated = 0;

    for (const table of tables) {
      // First check if the table exists
      const [tableExists] = await pool.query(
        `SELECT 1 FROM information_schema.tables WHERE table_schema = 'amazon_clone' AND table_name = ?`,
        [table]
      );

      if (tableExists.length > 0) {
        // Fetch all items from the table
        const [rows] = await pool.query(`SELECT id, about_item FROM \`${table}\` WHERE about_item LIKE '%<li>%'`);
        
        if (rows.length > 0) {
          console.log(`Found ${rows.length} rows with HTML tags in ${table}. Fixing...`);
          
          for (const row of rows) {
            // Replace <li> with nothing, and </li> with \n. Then trim extra spaces/newlines.
            let cleanText = row.about_item
              .replace(/<li>/gi, '')
              .replace(/<\/li>/gi, '\n')
              .trim();
              
            // In case there are no closing tags, just split by <li> instead
            if (row.about_item.includes('<li>') && !row.about_item.includes('</li>')) {
                cleanText = row.about_item.split(/<li>/i).filter(Boolean).map(s => s.trim()).join('\n');
            }

            await pool.query(
              `UPDATE \`${table}\` SET about_item = ? WHERE id = ?`,
              [cleanText, row.id]
            );
          }
          totalUpdated += rows.length;
          console.log(`✅ Fixed ${rows.length} rows in ${table}`);
        }
      }
    }
    
    console.log(`\n🎉 Success! Removed HTML <li> tags from ${totalUpdated} total products!`);
  } catch (error) {
    console.error("❌ Error fixing HTML tags:", error);
  } finally {
    await pool.end();
  }
}

fixHtmlTags();
