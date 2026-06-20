import mysql from 'mysql2/promise';

async function fixImages() {
  const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Shreetech@123',
    database: 'amazon_clone',
    port: 3306
  });

  try {
    const fixes = {
      10: 'https://m.media-amazon.com/images/I/61irmRn+6LL._AC_SY145_.jpg',
      12: 'https://m.media-amazon.com/images/I/71fFKeHHo7L._AC_SY145_.jpg',
      23: 'https://m.media-amazon.com/images/I/718F+0RgtfL._AC_SY170_.jpg',
      24: 'https://m.media-amazon.com/images/I/718F+0RgtfL._AC_SY170_.jpg',
      33: 'https://m.media-amazon.com/images/I/718F+0RgtfL._AC_SY170_.jpg',
      34: 'https://m.media-amazon.com/images/I/718F+0RgtfL._AC_SY170_.jpg',
      36: 'https://m.media-amazon.com/images/I/718F+0RgtfL._AC_SY170_.jpg',
      43: 'https://m.media-amazon.com/images/I/71erHCKJ3WL._AC_SY170_.jpg',
      44: 'https://m.media-amazon.com/images/I/71erHCKJ3WL._AC_SY170_.jpg',
      45: 'https://m.media-amazon.com/images/I/71erHCKJ3WL._AC_SY170_.jpg',
      47: 'https://m.media-amazon.com/images/I/71775fRr+gL._AC_SY170_.jpg',
      48: 'https://m.media-amazon.com/images/I/71775fRr+gL._AC_SY170_.jpg',
      55: 'https://m.media-amazon.com/images/I/71qK1R-BkhL._AC_SY170_.jpg',
      59: 'https://m.media-amazon.com/images/I/71rCioa7fGL._AC_UL480_FMwebp_QL65_.jpg',
      64: 'https://m.media-amazon.com/images/I/61H+V-O6A-L._AC_SY170_.jpg',
      65: 'https://m.media-amazon.com/images/I/61H+V-O6A-L._AC_SY170_.jpg'
    };

    for (const [id, url] of Object.entries(fixes)) {
      await pool.execute('UPDATE category_images SET image_url = ? WHERE id = ?', [url, Number(id)]);
    }

    console.log("Broken images replaced successfully!");
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

fixImages();
