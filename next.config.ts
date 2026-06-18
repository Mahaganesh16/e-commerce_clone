/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
      },
      /* 🌟 ADDED: Allow Pexels images to fetch safely */
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      /* 🌟 ADDED: Allow Amazon CDN images to fetch safely */
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
    ],
  },
};

export default nextConfig;