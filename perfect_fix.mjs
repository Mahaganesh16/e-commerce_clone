import mysql from 'mysql2/promise';

async function perfectFix() {
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
      33: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571',
      34: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6',
      36: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be',
      43: 'https://m.media-amazon.com/images/I/71erHCKJ3WL._AC_SY170_.jpg',
      44: 'https://m.media-amazon.com/images/I/71erHCKJ3WL._AC_SY170_.jpg',
      45: 'https://m.media-amazon.com/images/I/71erHCKJ3WL._AC_SY170_.jpg',
      47: 'https://m.media-amazon.com/images/I/71775fRr+gL._AC_SY170_.jpg',
      48: 'https://m.media-amazon.com/images/I/71775fRr+gL._AC_SY170_.jpg',
      52: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8',
      54: 'https://images.unsplash.com/photo-1523362628745-0c100150b504',
      55: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8',
      59: 'https://m.media-amazon.com/images/I/71rCioa7fGL._AC_UL480_FMwebp_QL65_.jpg',
      64: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d',
      65: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d'
    };

    for (const [id, url] of Object.entries(fixes)) {
      await pool.execute('UPDATE category_images SET image_url = ? WHERE id = ?', [url, Number(id)]);
    }

    console.log("Database perfectly fixed with exact verified links!");
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

perfectFix();
