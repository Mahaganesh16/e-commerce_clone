import axios from 'axios';

async function testLinks() {
  const urls = [
    'https://images.unsplash.com/photo-1602143407151-7111542de6e8', // Bottle
    'https://images.unsplash.com/photo-1523362628745-0c100150b504', // Bottle
    'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d' // Mug
  ];

  for (const url of urls) {
    try {
      await axios.head(url, { timeout: 3000 });
      console.log("VALID: " + url);
    } catch (err) {
      console.log("BROKEN: " + url);
    }
  }
}

testLinks();
