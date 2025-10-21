/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com"],
  },
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    STRIPE_SECRET: process.env.STRIPE_SECRET,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  },
  output: "standalone",
};

export default nextConfig;
