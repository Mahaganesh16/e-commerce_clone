import axios from 'axios';

async function testAmazonLinks() {
  const urls = [
    'https://m.media-amazon.com/images/I/71erHCKJ3WL._AC_SY170_.jpg',
    'https://m.media-amazon.com/images/I/71qK1R-BkhL._AC_SY170_.jpg',
    'https://m.media-amazon.com/images/I/71rCioa7fGL._AC_UL480_FMwebp_QL65_.jpg',
    'https://m.media-amazon.com/images/I/61H+V-O6A-L._AC_SY170_.jpg'
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

testAmazonLinks();
