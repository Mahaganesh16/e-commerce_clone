import axios from 'axios';

async function testImages() {
  const urls = [
    'https://images.unsplash.com/photo-1556228720-195a672e8a03',
    'https://images.unsplash.com/photo-1629198688000-71f23e745b6e',
    'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b',
    'https://images.unsplash.com/photo-1556228578-0d85b1a4d571',
    'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6',
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be'
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

testImages();
