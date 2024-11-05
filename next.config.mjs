/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['img.spoonacular.com'],
  },
  env: {
    SPOONACULAR_API_KEY: process.env.SPOONACULAR_API_KEY,
  },
};

export default nextConfig;
