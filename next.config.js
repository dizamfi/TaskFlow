/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  
  // Configuración básica para Vercel
  eslint: {
    dirs: ['src'],
  },
  
  typescript: {
    ignoreBuildErrors: false,
  },
  
  images: {
    domains: ['images.unsplash.com'],
  },
};

module.exports = nextConfig;