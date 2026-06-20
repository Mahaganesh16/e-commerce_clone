import mysql from 'mysql2/promise';
import axios from 'axios';

async function checkImages() {
  const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Shreetech@123',
    database: 'amazon_clone',
    port: 3306
  });

  try {
    const [rows] = await pool.execute('SELECT id, title, image_url FROM category_images');
    let broken = 0;
    
    for (const row of rows) {
      try {
        await axios.head(row.image_url, { timeout: 3000 });
      } catch (err) {
        console.log(`Broken Image [ID ${row.id}]: ${row.title} -> ${row.image_url}`);
        broken++;
      }
    }
    
    console.log(`Total broken images: ${broken}`);
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

checkImages();
